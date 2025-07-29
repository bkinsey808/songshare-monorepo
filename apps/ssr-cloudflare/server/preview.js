// server/preview.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
    const { appHtml } = render();

    // Replace the <script data-script="main"> tag's src with built client script path
    let html = template.replace(
      /<script\s+data-script="main"[^>]*src="[^"]*"[^>]*><\/script>/,
      `<script type="module" src="/assets/index.js"></script>`
    );

    // Inject SSR rendered HTML inside #root div
    html = html.replace(
      /<div\s+id="root"[^>]*><\/div>/,
      `<div id="root">${appHtml}</div>`
    );

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    console.error("SSR error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 5. Start server
app.listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}`);
});
