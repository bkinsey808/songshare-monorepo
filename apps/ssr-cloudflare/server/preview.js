import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

// Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8787;

// 1. Read the built HTML template from dist/
const template = fs.readFileSync(
  path.resolve(__dirname, "../dist/index.html"),
  "utf-8"
);

// 2. Load the server entry (SSR handler) from dist/server/assets/entry-server.js
const { render } = await import(
  path.resolve(__dirname, "../dist/server/assets/entry-server.js") + "?import"
);

// Serve static assets from public (for react.svg, etc.)
app.use(express.static(path.resolve(__dirname, "../public")));

// 3. Serve static assets from dist (client build)
app.use("/assets", express.static(path.resolve(__dirname, "../dist/assets")));
app.use(
  "/vite.svg",
  express.static(path.resolve(__dirname, "../dist/vite.svg"))
);

// 4. SSR handler for all routes
app.get("*", (req, res) => {
  try {
    const { appHtml } = render(req.url);

    // Load HTML template into JSDOM
    const dom = new JSDOM(template);
    const document = dom.window.document;

    // Inject SSR-rendered HTML into the #root div
    const rootDiv = document.getElementById("root");
    if (rootDiv) {
      rootDiv.innerHTML = appHtml;
    }

    // Replace <script data-script="main" ...> with the final client bundle script tag
    const oldScript = document.querySelector('script[data-script="main"]');
    if (oldScript) {
      const newScript = document.createElement("script");
      newScript.type = "module";
      newScript.src = "/assets/index.js";
      oldScript.replaceWith(newScript);
    }

    res.setHeader("Content-Type", "text/html");
    res.send(dom.serialize());
  } catch (error) {
    console.error("SSR error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 5. Start server
app.listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}`);
});
