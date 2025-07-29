// src/preview.ts
import express from "express";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { getHello } from "./routes/sharedApi.js";
import { injectAppHtmlIntoTemplate } from "./routes/sharedSsr.js";

(async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const app = express();
    const port = 8787;

    const template = fs.readFileSync(
      path.resolve(__dirname, "../../dist/index.html"),
      "utf-8"
    );

    const { render } = await import(
      path.resolve(__dirname, "../../dist/server/assets/entry-server.js") +
        "?import"
    );

    app.use(express.static(path.resolve(__dirname, "../../public")));

    app.use(
      "/assets",
      express.static(path.resolve(__dirname, "../../dist/assets"))
    );

    app.use(
      "/vite.svg",
      express.static(path.resolve(__dirname, "../../dist/vite.svg"))
    );

    app.get("/api/hello", async (_req: Request, res: Response) => {
      const data = await getHello();
      res.json(data);
    });

    app.get("*", async (req: Request, res: Response) => {
      try {
        const { appHtml } = await render(req.url);
        const html = injectAppHtmlIntoTemplate(template, appHtml);

        res.setHeader("Content-Type", "text/html");
        res.send(html);
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
