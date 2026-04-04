"use client";

import { useState, useRef, useEffect } from "react";

interface ExportMenuProps {
  html: string;
  css: string;
  js: string;
}

function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function buildFullHtml(html: string, css: string, js: string): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${js}
  </script>
</body>
</html>`;
}

export function ExportMenu({ html, css, js }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const exportHtml = () => {
    downloadFile("index.html", buildFullHtml(html, css, js), "text/html");
    setIsOpen(false);
  };

  const exportJs = () => {
    downloadFile("script.js", js, "text/javascript");
    setIsOpen(false);
  };

  const exportCss = () => {
    downloadFile("style.css", css, "text/css");
    setIsOpen(false);
  };

  const exportZip = async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    zip.file("index.html", buildFullHtml(html, css, js));
    zip.file("style.css", css);
    zip.file("script.js", js);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-project.zip";
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const exportToCodePen = () => {
    const data = JSON.stringify({
      html,
      css,
      js,
      title: "CodeLearn Export",
    });
    const form = document.createElement("form");
    form.action = "https://codepen.io/pen/define";
    form.method = "POST";
    form.target = "_blank";
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "data";
    input.value = data;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md border border-gray-700 px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-800 inline-flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        エクスポート
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-gray-900 border border-gray-700 shadow-2xl z-50 overflow-hidden">
          <div className="p-1">
            <button onClick={exportHtml} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-3">
              <span className="text-orange-400 text-xs font-mono w-10">HTML</span>
              <span>HTMLファイル（全部入り）</span>
            </button>
            <button onClick={exportCss} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-3">
              <span className="text-blue-400 text-xs font-mono w-10">CSS</span>
              <span>CSSファイル</span>
            </button>
            <button onClick={exportJs} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-3">
              <span className="text-yellow-400 text-xs font-mono w-10">JS</span>
              <span>JavaScriptファイル</span>
            </button>
            <div className="border-t border-gray-800 my-1" />
            <button onClick={exportZip} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-3">
              <span className="text-emerald-400 text-xs font-mono w-10">ZIP</span>
              <span>3ファイルセット（ZIP）</span>
            </button>
            <div className="border-t border-gray-800 my-1" />
            <button onClick={exportToCodePen} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-3">
              <span className="text-purple-400 text-xs font-mono w-10">&#9998;</span>
              <span>CodePenで開く</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
