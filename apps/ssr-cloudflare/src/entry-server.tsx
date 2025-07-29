// src/entry-server.tsx
import { App } from "./App";
import { renderToString } from "react-dom/server";

export function render() {
  const appHtml = renderToString(<App />);
  return { appHtml };
}
