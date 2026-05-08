"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { linter, type Diagnostic } from "@codemirror/lint";
import { ExportMenu } from "./export-menu";

interface CodePlaygroundProps {
  defaultHtml?: string;
  defaultCss?: string;
  defaultJs?: string;
  mode?: "html" | "css" | "javascript" | "all";
}

type TabKey = "html" | "css" | "js";

interface LintMessage {
  line: number;
  col: number;
  message: string;
  type: "error" | "warning";
}

function createPreviewDocument({
  html: htmlCode,
  css: cssCode,
  js: jsCode,
  playgroundId,
}: {
  html: string;
  css: string;
  js: string;
  playgroundId: string;
}) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  padding: 16px;
  margin: 0;
  background: #ffffff;
  color: #111827;
}
${cssCode}
</style>
</head>
<body>
${htmlCode}
<script>
(() => {
  const source = "playground";
  const id = ${JSON.stringify(playgroundId)};
  window.addEventListener("error", (e) => {
    window.parent.postMessage({ source, id, type: "error", message: e.message, line: e.lineno }, "*");
  });
  try {
${jsCode}
  } catch(e) {
    window.parent.postMessage({ source, id, type: "error", message: e.name + ": " + e.message }, "*");
  }
})();
</script>
</body>
</html>`;
}

function getTabInfo(tab: TabKey) {
  if (tab === "html") return { label: "HTML", accent: "bg-orange-400", filename: "index.html" };
  if (tab === "css") return { label: "CSS", accent: "bg-sky-400", filename: "style.css" };
  return { label: "JavaScript", accent: "bg-amber-300", filename: "script.js" };
}

function getLanguageExtension(tab: TabKey) {
  if (tab === "html") return html({ autoCloseTags: true, matchClosingTags: true });
  if (tab === "css") return css();
  return javascript();
}

// Valid HTML elements
const VALID_HTML_ELEMENTS = new Set([
  "a", "abbr", "address", "area", "article", "aside", "audio",
  "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button",
  "canvas", "caption", "cite", "code", "col", "colgroup",
  "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt",
  "em", "embed",
  "fieldset", "figcaption", "figure", "footer", "form",
  "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html",
  "i", "iframe", "img", "input", "ins",
  "kbd",
  "label", "legend", "li", "link",
  "main", "map", "mark", "menu", "meta", "meter",
  "nav", "noscript",
  "object", "ol", "optgroup", "option", "output",
  "p", "param", "picture", "pre", "progress",
  "q",
  "rp", "rt", "ruby",
  "s", "samp", "script", "search", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup",
  "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track",
  "u", "ul",
  "var", "video",
  "wbr",
]);

const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

// Find closest valid tag name for suggestions
function findClosestTag(invalid: string): string | null {
  let bestMatch: string | null = null;
  let bestScore = Infinity;

  for (const valid of VALID_HTML_ELEMENTS) {
    const dist = levenshtein(invalid, valid);
    if (dist < bestScore && dist <= 2) {
      bestScore = dist;
      bestMatch = valid;
    }
  }

  return bestMatch;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}

// Global HTML attributes (valid on any element)
const GLOBAL_ATTRIBUTES = new Set([
  "accesskey", "autocapitalize", "autofocus", "class", "contenteditable",
  "data-", "dir", "draggable", "enterkeyhint", "hidden", "id", "inert",
  "inputmode", "is", "itemid", "itemprop", "itemref", "itemscope", "itemtype",
  "lang", "nonce", "part", "popover", "role", "slot", "spellcheck", "style",
  "tabindex", "title", "translate", "writingsuggestions",
]);

// Event handler attributes
const EVENT_ATTRIBUTES = new Set([
  "onclick", "ondblclick", "onmousedown", "onmouseup", "onmouseover",
  "onmousemove", "onmouseout", "onkeypress", "onkeydown", "onkeyup",
  "onfocus", "onblur", "onsubmit", "onreset", "onselect", "onchange",
  "oninput", "onload", "onunload", "onresize", "onscroll", "onerror",
]);

// Element-specific attributes
const ELEMENT_ATTRIBUTES: Record<string, Set<string>> = {
  a: new Set(["href", "target", "rel", "download", "hreflang", "type", "referrerpolicy", "ping"]),
  img: new Set(["src", "alt", "width", "height", "loading", "decoding", "srcset", "sizes", "crossorigin", "usemap", "ismap", "referrerpolicy"]),
  input: new Set(["type", "name", "value", "placeholder", "required", "disabled", "readonly", "checked", "maxlength", "minlength", "min", "max", "step", "pattern", "size", "autocomplete", "autofocus", "form", "list", "multiple", "accept"]),
  meta: new Set(["charset", "content", "name", "http-equiv", "property"]),
  link: new Set(["href", "rel", "type", "media", "crossorigin", "sizes", "as", "integrity", "referrerpolicy"]),
  script: new Set(["src", "type", "async", "defer", "crossorigin", "integrity", "nomodule", "referrerpolicy"]),
  form: new Set(["action", "method", "enctype", "target", "novalidate", "autocomplete", "name", "rel"]),
  button: new Set(["type", "name", "value", "disabled", "form", "formaction", "formmethod", "formenctype", "formnovalidate", "formtarget", "popovertarget", "popovertargetaction"]),
  textarea: new Set(["name", "rows", "cols", "placeholder", "required", "disabled", "readonly", "maxlength", "minlength", "wrap", "autocomplete", "autofocus", "form"]),
  select: new Set(["name", "required", "disabled", "multiple", "size", "autocomplete", "autofocus", "form"]),
  option: new Set(["value", "selected", "disabled", "label"]),
  label: new Set(["for"]),
  table: new Set(["border"]),
  td: new Set(["colspan", "rowspan", "headers"]),
  th: new Set(["colspan", "rowspan", "headers", "scope", "abbr"]),
  iframe: new Set(["src", "srcdoc", "name", "sandbox", "allow", "allowfullscreen", "width", "height", "loading", "referrerpolicy"]),
  video: new Set(["src", "controls", "autoplay", "loop", "muted", "poster", "preload", "width", "height", "crossorigin", "playsinline"]),
  audio: new Set(["src", "controls", "autoplay", "loop", "muted", "preload", "crossorigin"]),
  source: new Set(["src", "type", "srcset", "sizes", "media"]),
  ol: new Set(["reversed", "start", "type"]),
  li: new Set(["value"]),
  html: new Set(["lang", "xmlns"]),
  body: new Set(["onload", "onunload"]),
  style: new Set(["media", "type"]),
  p: new Set([]),
  div: new Set([]),
  span: new Set([]),
  h1: new Set([]), h2: new Set([]), h3: new Set([]), h4: new Set([]), h5: new Set([]), h6: new Set([]),
  head: new Set([]),
  header: new Set([]), footer: new Set([]), main: new Set([]), nav: new Set([]), section: new Set([]), article: new Set([]), aside: new Set([]),
  ul: new Set([]),
  br: new Set([]),
  hr: new Set([]),
  pre: new Set([]),
  code: new Set([]),
  em: new Set([]),
  strong: new Set([]),
  blockquote: new Set(["cite"]),
  details: new Set(["open"]),
  summary: new Set([]),
  dialog: new Set(["open"]),
  canvas: new Set(["width", "height"]),
  col: new Set(["span"]),
  colgroup: new Set(["span"]),
};

function isValidAttribute(tagName: string, attrName: string): boolean {
  // Global attributes
  if (GLOBAL_ATTRIBUTES.has(attrName)) return true;
  // data-* attributes
  if (attrName.startsWith("data-")) return true;
  // aria-* attributes
  if (attrName.startsWith("aria-")) return true;
  // Event handlers
  if (EVENT_ATTRIBUTES.has(attrName)) return true;
  // Element-specific
  const elemAttrs = ELEMENT_ATTRIBUTES[tagName];
  if (elemAttrs && elemAttrs.has(attrName)) return true;
  // If element not in our map, be lenient
  if (!ELEMENT_ATTRIBUTES[tagName]) return true;
  return false;
}

function findClosestAttribute(invalid: string, tagName: string): string | null {
  const candidates = new Set<string>();
  for (const attr of GLOBAL_ATTRIBUTES) candidates.add(attr);
  const elemAttrs = ELEMENT_ATTRIBUTES[tagName];
  if (elemAttrs) {
    for (const attr of elemAttrs) candidates.add(attr);
  }

  let bestMatch: string | null = null;
  let bestScore = Infinity;
  for (const valid of candidates) {
    const dist = levenshtein(invalid, valid);
    if (dist < bestScore && dist <= 2) {
      bestScore = dist;
      bestMatch = valid;
    }
  }
  return bestMatch;
}

// HTML lint
function lintHtml(code: string): LintMessage[] {
  const messages: LintMessage[] = [];
  const lines = code.split("\n");

  const openTags: Array<{ tag: string; line: number }> = [];
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)([^>]*?)\/?>/g;
  const attrRegex = /([a-zA-Z][a-zA-Z0-9-]*)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*))?/g;

  lines.forEach((line, lineIndex) => {
    let match;
    tagRegex.lastIndex = 0;
    while ((match = tagRegex.exec(line)) !== null) {
      const fullMatch = match[0];
      const tagName = match[1].toLowerCase();
      const attrsString = match[2] || "";

      // Check for invalid tag names
      if (!fullMatch.startsWith("<!") && !VALID_HTML_ELEMENTS.has(tagName)) {
        const suggestion = findClosestTag(tagName);
        const suggestionText = suggestion ? ` <${suggestion}> の間違いですか？` : "";
        messages.push({
          line: lineIndex + 1,
          col: match.index + 1,
          message: `<${tagName}> は有効なHTML要素ではありません。${suggestionText}`,
          type: "error",
        });
        continue;
      }

      // Check attributes on opening tags
      if (!fullMatch.startsWith("</") && attrsString.trim()) {
        let attrMatch;
        attrRegex.lastIndex = 0;
        while ((attrMatch = attrRegex.exec(attrsString)) !== null) {
          const attrName = attrMatch[1].toLowerCase();
          if (!isValidAttribute(tagName, attrName)) {
            const suggestion = findClosestAttribute(attrName, tagName);
            const suggestionText = suggestion ? ` ${suggestion} の間違いですか？` : "";
            messages.push({
              line: lineIndex + 1,
              col: match.index + fullMatch.indexOf(attrMatch[1]) + 1,
              message: `<${tagName}> の属性 "${attrName}" は無効です。${suggestionText}`,
              type: "warning",
            });
          }
        }
      }

      if (fullMatch.startsWith("</")) {
        // Closing tag
        const lastOpen = openTags.findLast((t) => t.tag === tagName);
        if (lastOpen) {
          openTags.splice(openTags.indexOf(lastOpen), 1);
        } else {
          messages.push({
            line: lineIndex + 1,
            col: match.index + 1,
            message: `対応する開始タグがない </${tagName}> があります`,
            type: "error",
          });
        }
      } else if (!fullMatch.endsWith("/>") && !VOID_ELEMENTS.has(tagName)) {
        // Opening tag (not self-closing and not void)
        openTags.push({ tag: tagName, line: lineIndex + 1 });
      }
    }
  });

  // Report unclosed tags
  for (const unclosed of openTags) {
    messages.push({
      line: unclosed.line,
      col: 1,
      message: `<${unclosed.tag}> の閉じタグがありません`,
      type: "warning",
    });
  }

  return messages;
}

// Common CSS properties
const VALID_CSS_PROPERTIES = new Set([
  "align-content", "align-items", "align-self", "all", "animation", "animation-delay",
  "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count",
  "animation-name", "animation-play-state", "animation-timing-function", "aspect-ratio",
  "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode",
  "background-clip", "background-color", "background-image", "background-origin", "background-position",
  "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color",
  "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width",
  "border-collapse", "border-color", "border-image", "border-left", "border-left-color",
  "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color",
  "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top",
  "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style",
  "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing",
  "caption-side", "caret-color", "clear", "clip", "clip-path", "color", "column-count",
  "column-fill", "column-gap", "column-rule", "column-span", "column-width", "columns", "container",
  "container-name", "container-type", "content", "counter-increment", "counter-reset", "cursor",
  "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction",
  "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-family",
  "font-feature-settings", "font-kerning", "font-size", "font-size-adjust", "font-stretch",
  "font-style", "font-variant", "font-weight", "gap", "grid", "grid-area", "grid-auto-columns",
  "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start",
  "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas",
  "grid-template-columns", "grid-template-rows", "height", "hyphens", "image-rendering",
  "inset", "inset-block", "inset-inline", "isolation", "justify-content", "justify-items",
  "justify-self", "left", "letter-spacing", "line-height", "list-style", "list-style-image",
  "list-style-position", "list-style-type", "margin", "margin-block", "margin-bottom",
  "margin-inline", "margin-left", "margin-right", "margin-top", "max-height", "max-width",
  "min-height", "min-width", "mix-blend-mode", "object-fit", "object-position", "opacity",
  "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width",
  "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-block",
  "padding-bottom", "padding-inline", "padding-left", "padding-right", "padding-top",
  "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin",
  "place-content", "place-items", "place-self", "pointer-events", "position", "quotes",
  "resize", "right", "rotate", "row-gap", "scale", "scroll-behavior", "scroll-margin",
  "scroll-padding", "scroll-snap-align", "scroll-snap-type", "tab-size", "table-layout",
  "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line",
  "text-decoration-style", "text-decoration-thickness", "text-indent", "text-overflow",
  "text-shadow", "text-transform", "text-underline-offset", "text-wrap", "top", "touch-action",
  "transform", "transform-origin", "transform-style", "transition", "transition-delay",
  "transition-duration", "transition-property", "transition-timing-function", "translate",
  "unicode-bidi", "user-select", "vertical-align", "visibility", "white-space", "widows",
  "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index",
]);

// Common CSS values for key properties
const CSS_PROPERTY_VALUES: Record<string, Set<string>> = {
  display: new Set(["none", "block", "inline", "inline-block", "flex", "inline-flex", "grid", "inline-grid", "table", "table-row", "table-cell", "contents", "list-item", "flow-root"]),
  position: new Set(["static", "relative", "absolute", "fixed", "sticky"]),
  "flex-direction": new Set(["row", "row-reverse", "column", "column-reverse"]),
  "flex-wrap": new Set(["nowrap", "wrap", "wrap-reverse"]),
  "justify-content": new Set(["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "start", "end"]),
  "align-items": new Set(["flex-start", "flex-end", "center", "baseline", "stretch", "start", "end"]),
  "align-content": new Set(["flex-start", "flex-end", "center", "space-between", "space-around", "stretch", "start", "end"]),
  "text-align": new Set(["left", "right", "center", "justify", "start", "end"]),
  "text-decoration": new Set(["none", "underline", "overline", "line-through"]),
  "text-transform": new Set(["none", "capitalize", "uppercase", "lowercase"]),
  float: new Set(["none", "left", "right", "inline-start", "inline-end"]),
  clear: new Set(["none", "left", "right", "both", "inline-start", "inline-end"]),
  overflow: new Set(["visible", "hidden", "scroll", "auto", "clip"]),
  "overflow-x": new Set(["visible", "hidden", "scroll", "auto", "clip"]),
  "overflow-y": new Set(["visible", "hidden", "scroll", "auto", "clip"]),
  visibility: new Set(["visible", "hidden", "collapse"]),
  "box-sizing": new Set(["content-box", "border-box"]),
  cursor: new Set(["auto", "default", "none", "pointer", "crosshair", "move", "text", "wait", "help", "not-allowed", "grab", "grabbing"]),
  "white-space": new Set(["normal", "nowrap", "pre", "pre-wrap", "pre-line", "break-spaces"]),
  "word-break": new Set(["normal", "break-all", "keep-all", "break-word"]),
  "font-style": new Set(["normal", "italic", "oblique"]),
  "font-weight": new Set(["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]),
  "list-style-type": new Set(["none", "disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"]),
};

function findClosestCssProperty(invalid: string): string | null {
  let bestMatch: string | null = null;
  let bestScore = Infinity;
  for (const valid of VALID_CSS_PROPERTIES) {
    const dist = levenshtein(invalid, valid);
    if (dist < bestScore && dist <= 2) {
      bestScore = dist;
      bestMatch = valid;
    }
  }
  return bestMatch;
}

function findClosestCssValue(invalid: string, property: string): string | null {
  const validValues = CSS_PROPERTY_VALUES[property];
  if (!validValues) return null;
  let bestMatch: string | null = null;
  let bestScore = Infinity;
  for (const valid of validValues) {
    const dist = levenshtein(invalid, valid);
    if (dist < bestScore && dist <= 2) {
      bestScore = dist;
      bestMatch = valid;
    }
  }
  return bestMatch;
}

// CSS lint
function lintCss(code: string): LintMessage[] {
  const messages: LintMessage[] = [];
  const lines = code.split("\n");
  let braceDepth = 0;
  let inComment = false;

  lines.forEach((line, lineIndex) => {
    const trimmed = line.trim();

    // Track multi-line comments
    if (inComment) {
      if (trimmed.includes("*/")) inComment = false;
      return;
    }
    if (trimmed.startsWith("/*") && !trimmed.includes("*/")) {
      inComment = true;
      return;
    }
    if (!trimmed || trimmed.startsWith("/*") || trimmed.startsWith("//")) return;

    for (const ch of trimmed) {
      if (ch === "{") braceDepth++;
      if (ch === "}") braceDepth--;
    }

    // Check property declarations inside rules
    if (braceDepth > 0 && trimmed.includes(":") && !trimmed.startsWith("@") && !trimmed.endsWith("{")) {
      const colonIndex = trimmed.indexOf(":");
      const propName = trimmed.substring(0, colonIndex).trim().toLowerCase();
      const rawValue = trimmed.substring(colonIndex + 1).replace(/;$/, "").trim().toLowerCase();

      // Skip CSS custom properties (--var-name)
      if (!propName.startsWith("--")) {
        // Check property name
        if (propName && !VALID_CSS_PROPERTIES.has(propName)) {
          const suggestion = findClosestCssProperty(propName);
          const suggestionText = suggestion ? ` ${suggestion} の間違いですか？` : "";
          messages.push({
            line: lineIndex + 1,
            col: 1,
            message: `CSS プロパティ "${propName}" は無効です。${suggestionText}`,
            type: "error",
          });
        }

        // Check property values for known properties
        if (rawValue && CSS_PROPERTY_VALUES[propName]) {
          // Only check simple single-word values (not functions, numbers with units, etc.)
          const simpleValue = rawValue.split(/\s/)[0];
          if (simpleValue && !simpleValue.match(/^[0-9]/) && !simpleValue.includes("(") && !simpleValue.startsWith("#") && !simpleValue.startsWith("var")) {
            if (!CSS_PROPERTY_VALUES[propName].has(simpleValue) && simpleValue !== "inherit" && simpleValue !== "initial" && simpleValue !== "unset" && simpleValue !== "revert") {
              const suggestion = findClosestCssValue(simpleValue, propName);
              const suggestionText = suggestion ? ` ${suggestion} の間違いですか？` : "";
              messages.push({
                line: lineIndex + 1,
                col: colonIndex + 2,
                message: `"${propName}" の値 "${simpleValue}" は無効な可能性があります。${suggestionText}`,
                type: "warning",
              });
            }
          }
        }
      }

      // Check for missing semicolons
      if (!trimmed.endsWith(";") && !trimmed.endsWith("{") && !trimmed.endsWith("}") && !trimmed.endsWith(",")) {
        messages.push({
          line: lineIndex + 1,
          col: trimmed.length,
          message: "セミコロン (;) が抜けている可能性があります",
          type: "warning",
        });
      }
    }
  });

  if (braceDepth > 0) {
    messages.push({
      line: lines.length,
      col: 1,
      message: `閉じ括弧 } が ${braceDepth} 個足りません`,
      type: "error",
    });
  } else if (braceDepth < 0) {
    messages.push({
      line: lines.length,
      col: 1,
      message: `開き括弧 { が ${Math.abs(braceDepth)} 個足りません`,
      type: "error",
    });
  }

  return messages;
}

// JS built-in objects and their methods/properties
const JS_GLOBALS: Record<string, Set<string>> = {
  console: new Set(["log", "info", "warn", "error", "debug", "table", "clear", "time", "timeEnd", "timeLog", "group", "groupEnd", "count", "countReset", "assert", "dir", "trace"]),
  document: new Set(["getElementById", "getElementsByClassName", "getElementsByTagName", "querySelector", "querySelectorAll", "createElement", "createTextNode", "createDocumentFragment", "body", "head", "title", "URL", "cookie", "readyState", "addEventListener", "removeEventListener", "write", "writeln", "open", "close", "forms", "images", "links", "scripts"]),
  Math: new Set(["abs", "ceil", "floor", "round", "max", "min", "pow", "sqrt", "random", "sign", "trunc", "PI", "E", "log", "log2", "log10", "sin", "cos", "tan", "atan", "atan2"]),
  JSON: new Set(["parse", "stringify"]),
  Array: new Set(["isArray", "from", "of"]),
  Object: new Set(["keys", "values", "entries", "assign", "freeze", "create", "defineProperty", "getPrototypeOf", "hasOwn"]),
  Promise: new Set(["all", "allSettled", "any", "race", "resolve", "reject"]),
  Number: new Set(["isFinite", "isInteger", "isNaN", "parseFloat", "parseInt", "MAX_SAFE_INTEGER", "MIN_SAFE_INTEGER"]),
  String: new Set(["fromCharCode", "fromCodePoint", "raw"]),
  Date: new Set(["now", "parse", "UTC"]),
  window: new Set(["alert", "confirm", "prompt", "setTimeout", "setInterval", "clearTimeout", "clearInterval", "requestAnimationFrame", "cancelAnimationFrame", "fetch", "localStorage", "sessionStorage", "location", "history", "navigator", "innerWidth", "innerHeight", "scrollTo", "scrollBy", "addEventListener", "removeEventListener", "open", "close", "print", "getComputedStyle"]),
  localStorage: new Set(["getItem", "setItem", "removeItem", "clear", "key", "length"]),
  sessionStorage: new Set(["getItem", "setItem", "removeItem", "clear", "key", "length"]),
};

// Common array instance methods
const ARRAY_METHODS = new Set([
  "push", "pop", "shift", "unshift", "splice", "slice", "concat",
  "indexOf", "lastIndexOf", "includes", "find", "findIndex", "findLast", "findLastIndex",
  "filter", "map", "reduce", "reduceRight", "forEach", "every", "some", "flat", "flatMap",
  "sort", "reverse", "join", "fill", "copyWithin", "at", "entries", "keys", "values",
  "length", "toString",
]);

// Common string instance methods
const STRING_METHODS = new Set([
  "charAt", "charCodeAt", "codePointAt", "concat", "includes", "endsWith", "startsWith",
  "indexOf", "lastIndexOf", "match", "matchAll", "normalize", "padEnd", "padStart",
  "repeat", "replace", "replaceAll", "search", "slice", "split", "substring",
  "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase", "trim",
  "trimEnd", "trimStart", "at", "length", "toString", "valueOf",
]);

// Common element methods (for DOM)
const ELEMENT_METHODS = new Set([
  "addEventListener", "removeEventListener", "getAttribute", "setAttribute", "removeAttribute",
  "hasAttribute", "classList", "className", "id", "innerHTML", "innerText", "textContent",
  "outerHTML", "style", "tagName", "children", "childNodes", "parentElement", "parentNode",
  "firstChild", "lastChild", "firstElementChild", "lastElementChild",
  "nextSibling", "previousSibling", "nextElementSibling", "previousElementSibling",
  "appendChild", "removeChild", "insertBefore", "replaceChild", "cloneNode",
  "contains", "closest", "matches", "querySelector", "querySelectorAll",
  "getBoundingClientRect", "scrollIntoView", "focus", "blur", "click",
  "remove", "before", "after", "prepend", "append", "replaceWith",
  "dataset", "value", "checked", "disabled", "href", "src", "alt",
]);

// classList methods
const CLASSLIST_METHODS = new Set(["add", "remove", "toggle", "contains", "replace", "item", "length"]);

function findClosestInSet(invalid: string, validSet: Set<string>): string | null {
  let bestMatch: string | null = null;
  let bestScore = Infinity;
  for (const valid of validSet) {
    const dist = levenshtein(invalid, valid);
    if (dist < bestScore && dist <= 3) {
      bestScore = dist;
      bestMatch = valid;
    }
  }
  return bestMatch;
}

// JS lint
function lintJs(code: string): LintMessage[] {
  const messages: LintMessage[] = [];

  // 1. Syntax check
  try {
    new Function(code);
  } catch (e) {
    if (e instanceof SyntaxError) {
      const lineMatch = e.message.match(/line (\d+)/i);
      const line = lineMatch ? parseInt(lineMatch[1], 10) : 1;
      messages.push({
        line,
        col: 1,
        message: `構文エラー: ${e.message}`,
        type: "error",
      });
    }
  }

  // 2. Method/property typo detection
  const lines = code.split("\n");
  const dotAccessRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

  // Track declared variables
  const declaredVars = new Set<string>(["undefined", "null", "true", "false", "NaN", "Infinity"]);
  const declRegex = /\b(?:const|let|var|function)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

  lines.forEach((line) => {
    let declMatch;
    declRegex.lastIndex = 0;
    while ((declMatch = declRegex.exec(line)) !== null) {
      declaredVars.add(declMatch[1]);
    }
    // Also track for...of/in and parameters
    const paramRegex = /\b(?:for\s*\(\s*(?:const|let|var)\s+)([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    let paramMatch;
    while ((paramMatch = paramRegex.exec(line)) !== null) {
      declaredVars.add(paramMatch[1]);
    }
  });

  lines.forEach((line, lineIndex) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*")) return;

    let match;
    dotAccessRegex.lastIndex = 0;
    while ((match = dotAccessRegex.exec(line)) !== null) {
      const obj = match[1];
      const prop = match[2];

      // Check global object methods
      if (JS_GLOBALS[obj]) {
        if (!JS_GLOBALS[obj].has(prop)) {
          const suggestion = findClosestInSet(prop, JS_GLOBALS[obj]);
          if (suggestion) {
            messages.push({
              line: lineIndex + 1,
              col: match.index + obj.length + 2,
              message: `${obj}.${prop} は存在しません。${obj}.${suggestion} の間違いですか？`,
              type: "error",
            });
          }
        }
      }

      // Check common array/string/element method typos on any object
      if (!JS_GLOBALS[obj] && obj !== "classList") {
        // Check if it looks like an array method typo
        const arraySuggestion = findClosestInSet(prop, ARRAY_METHODS);
        const stringSuggestion = findClosestInSet(prop, STRING_METHODS);
        const elementSuggestion = findClosestInSet(prop, ELEMENT_METHODS);

        // Only suggest if the prop doesn't exist in any common set and there's a close match
        if (!ARRAY_METHODS.has(prop) && !STRING_METHODS.has(prop) && !ELEMENT_METHODS.has(prop)) {
          const bestSuggestion = arraySuggestion || stringSuggestion || elementSuggestion;
          if (bestSuggestion && levenshtein(prop, bestSuggestion) <= 2) {
            messages.push({
              line: lineIndex + 1,
              col: match.index + obj.length + 2,
              message: `.${prop} は存在しない可能性があります。.${bestSuggestion} の間違いですか？`,
              type: "warning",
            });
          }
        }
      }

      // Check classList methods
      if (obj === "classList") {
        if (!CLASSLIST_METHODS.has(prop)) {
          const suggestion = findClosestInSet(prop, CLASSLIST_METHODS);
          const suggestionText = suggestion ? ` classList.${suggestion} の間違いですか？` : "";
          messages.push({
            line: lineIndex + 1,
            col: match.index + obj.length + 2,
            message: `classList.${prop} は存在しません。${suggestionText}`,
            type: "error",
          });
        }
      }
    }

    // Check for common typos in standalone identifiers (not after dot)
    const identRegex = /\b(consle|docuemnt|doucment|widnow|matH|aelrt|promtp|localSotrage|seTimeout|setInteval)\b/g;
    const typoMap: Record<string, string> = {
      consle: "console", docuemnt: "document", doucment: "document",
      widnow: "window", matH: "Math", aelrt: "alert",
      promtp: "prompt", localSotrage: "localStorage",
      seTimeout: "setTimeout", setInteval: "setInterval",
    };

    let identMatch;
    while ((identMatch = identRegex.exec(line)) !== null) {
      const typo = identMatch[1];
      const correct = typoMap[typo];
      if (correct) {
        messages.push({
          line: lineIndex + 1,
          col: identMatch.index + 1,
          message: `"${typo}" は未定義です。${correct} の間違いですか？`,
          type: "error",
        });
      }
    }
  });

  return messages;
}

function createLinter(tab: TabKey, onProblems: (msgs: LintMessage[]) => void) {
  return linter((view) => {
    const code = view.state.doc.toString();
    let messages: LintMessage[] = [];

    if (tab === "html") {
      messages = lintHtml(code);
    } else if (tab === "css") {
      messages = lintCss(code);
    } else if (tab === "js") {
      messages = lintJs(code);
    }

    onProblems(messages);

    const diagnostics: Diagnostic[] = [];
    for (const msg of messages) {
      const lineNum = Math.max(1, Math.min(msg.line, view.state.doc.lines));
      const line = view.state.doc.line(lineNum);
      const from = line.from + Math.min(msg.col - 1, line.length);
      diagnostics.push({
        from,
        to: Math.min(from + 1, line.to),
        severity: msg.type === "error" ? "error" : "warning",
        message: msg.message,
      });
    }

    return diagnostics;
  });
}

export function CodePlayground({
  defaultHtml = "<h1>Hello World</h1>",
  defaultCss = "",
  defaultJs = "",
  mode = "all",
}: CodePlaygroundProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [playgroundId] = useState(() => `pg-${Math.random().toString(36).slice(2, 8)}`);

  const [htmlCode, setHtmlCode] = useState(defaultHtml);
  const [cssCode, setCssCode] = useState(defaultCss);
  const [jsCode, setJsCode] = useState(defaultJs);
  const [activeTab, setActiveTab] = useState<TabKey>(
    mode === "css" ? "css" : mode === "javascript" ? "js" : "html"
  );
  const [previewKey, setPreviewKey] = useState(0);
  const [copyStatus, setCopyStatus] = useState<"idle" | "done">("idle");
  const [jsErrors, setJsErrors] = useState<string[]>([]);
  const [problems, setProblems] = useState<LintMessage[]>([]);

  const codeRef = useRef({ html: defaultHtml, css: defaultCss, js: defaultJs });

  useEffect(() => {
    codeRef.current = { html: htmlCode, css: cssCode, js: jsCode };
  }, [htmlCode, cssCode, jsCode]);

  // Listen for JS runtime errors from iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.source === "playground" && e.data?.id === playgroundId && e.data?.type === "error") {
        setJsErrors((prev) => [...prev.slice(-4), e.data.message]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [playgroundId]);

  const tabs: TabKey[] = [];
  if (mode === "all" || mode === "html") tabs.push("html");
  if (mode === "all" || mode === "css") tabs.push("css");
  if (mode === "all" || mode === "javascript") tabs.push("js");

  const activeCode = activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode;
  const tabInfo = getTabInfo(activeTab);

  const previewDocument = createPreviewDocument({
    html: htmlCode,
    css: cssCode,
    js: jsCode,
    playgroundId: playgroundId,
  });

  const runCode = useCallback(() => {
    setJsErrors([]);
    setPreviewKey((k) => k + 1);
  }, []);

  const resetCode = useCallback(() => {
    setHtmlCode(defaultHtml);
    setCssCode(defaultCss);
    setJsCode(defaultJs);
    setJsErrors([]);
    setPreviewKey((k) => k + 1);
  }, [defaultHtml, defaultCss, defaultJs]);

  const clearCode = useCallback(() => {
    if (activeTab === "html") setHtmlCode("");
    else if (activeTab === "css") setCssCode("");
    else setJsCode("");
  }, [activeTab]);

  const copyCode = useCallback(async () => {
    const code = activeTab === "html" ? codeRef.current.html : activeTab === "css" ? codeRef.current.css : codeRef.current.js;
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("done");
      setTimeout(() => setCopyStatus("idle"), 1500);
    } catch {
      // silent fail
    }
  }, [activeTab]);

  // Create/recreate editor when tab changes
  useEffect(() => {
    const container = editorContainerRef.current;
    if (!container) return;

    if (editorViewRef.current) {
      editorViewRef.current.destroy();
      editorViewRef.current = null;
    }

    const setCode = activeTab === "html" ? setHtmlCode : activeTab === "css" ? setCssCode : setJsCode;
    const initialCode = activeTab === "html" ? codeRef.current.html : activeTab === "css" ? codeRef.current.css : codeRef.current.js;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        setCode(update.state.doc.toString());
      }
    });

    const runKeymap = keymap.of([
      {
        key: "Mod-Enter",
        run: () => {
          setJsErrors([]);
          setPreviewKey((k) => k + 1);
          return true;
        },
      },
    ]);

    const editorTheme = EditorView.theme({
      "&": {
        fontSize: "14px",
        minHeight: "300px",
      },
      ".cm-content": {
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        lineHeight: "1.6",
        padding: "8px 0",
      },
      ".cm-gutters": {
        backgroundColor: "#0d1117",
        borderRight: "1px solid #21262d",
      },
      ".cm-lineNumbers .cm-gutterElement": {
        padding: "0 8px 0 16px",
      },
      "&.cm-focused": {
        outline: "none",
      },
      ".cm-scroller": {
        overflow: "auto",
      },
      ".cm-diagnostic-error": {
        borderLeft: "3px solid #f85149",
        backgroundColor: "rgba(248, 81, 73, 0.1)",
        padding: "2px 8px",
      },
      ".cm-diagnostic-warning": {
        borderLeft: "3px solid #d29922",
        backgroundColor: "rgba(210, 153, 34, 0.1)",
        padding: "2px 8px",
      },
      ".cm-lint-marker-error": {
        content: "'●'",
      },
    });

    const state = EditorState.create({
      doc: initialCode,
      extensions: [
        basicSetup,
        getLanguageExtension(activeTab),
        createLinter(activeTab, setProblems),
        oneDark,
        editorTheme,
        updateListener,
        runKeymap,
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({
      state,
      parent: container,
    });

    editorViewRef.current = view;

    return () => {
      view.destroy();
      editorViewRef.current = null;
    };
  }, [activeTab]);

  // Sync editor content when reset
  useEffect(() => {
    const view = editorViewRef.current;
    if (!view) return;

    const currentDoc = view.state.doc.toString();
    if (currentDoc !== activeCode) {
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: activeCode },
      });
    }
  }, [activeCode]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-950 shadow-lg">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-700 bg-gray-900/90 px-3 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {tabs.map((tab) => {
            const info = getTabInfo(tab);
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-gray-600 bg-gray-800 text-gray-100"
                    : "border-transparent text-gray-400 hover:border-gray-700 hover:bg-gray-900 hover:text-gray-200"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${info.accent}`} />
                {info.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden text-xs text-gray-500 md:inline">
            Tab でインデント / Ctrl(Cmd)+Enter で再実行
          </span>
          <button
            type="button"
            onClick={copyCode}
            className="rounded-md border border-gray-700 px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-800"
          >
            {copyStatus === "done" ? "コピー済み" : "コピー"}
          </button>
          <button
            type="button"
            onClick={resetCode}
            className="rounded-md border border-gray-700 px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-800"
          >
            リセット
          </button>
          <button
            type="button"
            onClick={clearCode}
            className="rounded-md border border-gray-700 px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-800"
          >
            全消去
          </button>
          <button
            type="button"
            onClick={runCode}
            className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
          >
            実行
          </button>
          <ExportMenu html={htmlCode} css={cssCode} js={jsCode} />
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="grid md:grid-cols-2">
        {/* Editor + Problems */}
        <div className="bg-[#0d1117] border-r border-gray-700 flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
            <span className="text-xs font-mono text-slate-400">{tabInfo.filename}</span>
            {problems.length > 0 && (
              <span className="text-xs font-mono text-red-400">
                {problems.filter((p) => p.type === "error").length} errors, {problems.filter((p) => p.type === "warning").length} warnings
              </span>
            )}
          </div>
          <div ref={editorContainerRef} className="min-h-[300px] overflow-auto flex-1" />

          {/* Problems Panel (VS Code style) */}
          {(problems.length > 0 || jsErrors.length > 0) && (
            <div className="border-t border-gray-800 bg-[#0d1117]">
              <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Problems</span>
                <span className="text-[11px] rounded-full bg-red-500/20 text-red-400 px-1.5 py-0.5 font-mono">
                  {problems.length + jsErrors.length}
                </span>
              </div>
              <div className="max-h-[140px] overflow-auto px-2 py-1.5 font-mono text-xs">
                {problems.map((p, i) => (
                  <div key={`lint-${i}`} className="flex items-start gap-2 py-1 px-2 rounded hover:bg-slate-800/50">
                    <span className={`shrink-0 mt-0.5 ${p.type === "error" ? "text-red-400" : "text-amber-400"}`}>
                      {p.type === "error" ? "●" : "▲"}
                    </span>
                    <span className="text-slate-300 flex-1">{p.message}</span>
                    <span className="text-slate-600 shrink-0">[Ln {p.line}, Col {p.col}]</span>
                  </div>
                ))}
                {jsErrors.map((err, i) => (
                  <div key={`js-${i}`} className="flex items-start gap-2 py-1 px-2 rounded hover:bg-slate-800/50">
                    <span className="shrink-0 mt-0.5 text-red-400">●</span>
                    <span className="text-slate-300 flex-1">{err}</span>
                    <span className="text-slate-600 shrink-0">[Runtime]</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="flex min-h-[300px] flex-col bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-medium text-gray-500">preview.local</span>
            </div>
            <span className="text-xs text-gray-400">Live Preview</span>
          </div>
          <iframe
            key={previewKey}
            srcDoc={previewDocument}
            className="min-h-[260px] w-full flex-1 border-0 bg-white"
            sandbox="allow-scripts"
            title="プレビュー"
          />

        </div>
      </div>
    </div>
  );
}
