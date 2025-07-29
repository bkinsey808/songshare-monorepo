// ...existing imports and asset serving helper...

const htmlTemplate = (html: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React SSR Cloudflare</title>
    <script type="module" src="/src/entry-client.tsx"></script>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>`;
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

// Helper to serve static assets from dist/client/assets
async function serveAsset(path: string): Promise<Response> {
  // @ts-ignore - import.meta.glob is Vite-specific
  const assets: Record<string, () => Promise<{ default: ArrayBuffer }>> =
    import.meta.glob("../dist/client/assets/*", { as: "arrayBuffer" });
  const assetKey = `../dist/client${path}`;
  if (assets[assetKey]) {
    const assetModule = await assets[assetKey]();
    const ext = path.split(".").pop();
    let contentType = "application/octet-stream";
    if (ext === "svg") contentType = "image/svg+xml";
    if (ext === "css") contentType = "text/css";
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext || ""))
      contentType = `image/${ext}`;
    return new Response(assetModule.default, {
      headers: { "content-type": contentType },
    });
  }
  return new Response("Not found", { status: 404 });
}

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/assets/")) {
      return await serveAsset(url.pathname);
    }
    const html = renderToString(<App />);
    return new Response(htmlTemplate(html), {
      headers: { "content-type": "text/html" },
    });
  },
};
