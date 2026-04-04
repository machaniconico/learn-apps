"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";

interface SqlEditorProps {
  defaultCode: string;
  expectedOutput?: string;
  setupSql?: string;
}

export function SqlEditor({ defaultCode, expectedOutput, setupSql }: SqlEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [showOutput, setShowOutput] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-950">
      {setupSql && (
        <div className="border-b border-gray-800 p-3 bg-gray-900/50">
          <span className="text-xs text-gray-500 font-semibold">テーブル定義</span>
          <pre className="text-xs text-gray-400 mt-1 whitespace-pre-wrap">{setupSql}</pre>
        </div>
      )}
      <CodeMirror
        value={code}
        height="auto"
        minHeight="80px"
        theme={oneDark}
        extensions={[sql()]}
        onChange={(value) => setCode(value)}
        className="text-sm"
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          autocompletion: true,
        }}
      />
      {expectedOutput && (
        <div className="border-t border-gray-800">
          <button
            onClick={() => setShowOutput(!showOutput)}
            className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-900/50 transition-colors flex items-center gap-2"
          >
            <span className={`transition-transform ${showOutput ? "rotate-90" : ""}`}>▶</span>
            実行結果を{showOutput ? "隠す" : "見る"}
          </button>
          {showOutput && (
            <pre className="px-4 py-3 text-sm text-green-400 bg-gray-900/30 whitespace-pre-wrap font-mono">
              {expectedOutput}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
