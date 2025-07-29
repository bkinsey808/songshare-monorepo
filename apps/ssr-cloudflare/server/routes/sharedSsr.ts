// src/routes/sharedSsr.ts
import { JSDOM } from "jsdom";

export function injectAppHtmlIntoTemplate(
  template: string,
  appHtml: string
): string {
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

  return dom.serialize();
}
