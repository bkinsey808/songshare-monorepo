//src/preview.ts
import express from "express";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

(async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const app = express();
    const port = 8787;

    const template = fs.readFileSync(
      path.resolve(__dirname, "../dist/index.html"),
      "utf-8"
    );

    const { render } = await import(
      path.resolve(__dirname, "../dist/server/assets/entry-server.js") +
        "?import"
    );

    app.use(express.static(path.resolve(__dirname, "../public")));
    app.use(
      "/assets",
      express.static(path.resolve(__dirname, "../dist/assets"))
    );
    app.use(
      "/vite.svg",
      express.static(path.resolve(__dirname, "../dist/vite.svg"))
    );

    app.get("/api/hello", (_req: Request, res: Response) => {
      res.json({ message: "Hello from custom API endpoint!" });
    });

    app.get("*", (req: Request, res: Response) => {
      try {
        const { appHtml } = render(req.url);
        const dom = new JSDOM(template);
        const document = dom.window.document;
        const rootDiv = document.getElementById("root");
        if (rootDiv) rootDiv.innerHTML = appHtml;
        else console.warn("Warning: #root element not found in template");

        const oldScript = document.querySelector('script[data-script="main"]');
        if (oldScript) {
          const newScript = document.createElement("script");
          newScript.type = "module";
          newScript.src = "/assets/index.js";
          oldScript.replaceWith(newScript);
        }

        res.setHeader("Content-Type", "text/html");
        res.send(dom.serialize());
      } catch (err) {
        console.error("SSR error:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.listen(port, () => {
      console.log(`Preview server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Fatal error during startup:", error);
    process.exit(1);
  }
})();
