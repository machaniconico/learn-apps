"use client";

import { useState, useCallback, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import { placeholder as cmPlaceholder } from "@codemirror/view";
import { ProblemsPanel, executeCode, createEditorLinter } from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";
import { lintSql } from "../lib/linter";

interface SqlEditorProps {
  defaultCode: string;
  expectedOutput?: string;
  setupSql?: string;
}

export function SqlEditor({ defaultCode, setupSql }: SqlEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState<LintMessage[]>([]);
  const [runtimeErrors, setRuntimeErrors] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(true);

  const placeholderExtension = useMemo(
    () => cmPlaceholder(defaultCode),
    [defaultCode],
  );

  const lintExtension = useMemo(
    () => createEditorLinter(lintSql, setProblems),
    [],
  );

  const runCode = useCallback(async () => {
    setLoading(true);
    setOutput("");
    setRuntimeErrors([]);

    try {
      const fullCode = setupSql ? `${setupSql}\n${code}` : code;
      const result = await executeCode("sql", fullCode);
      const parts: string[] = [];
      if (result.compilationError) {
        parts.push(result.compilationError);
        setRuntimeErrors((prev) => [...prev.slice(-4), result.compilationError!]);
      } else {
        if (result.stdout) parts.push(result.stdout);
        if (result.stderr) {
          parts.push(result.stderr);
          setRuntimeErrors((prev) => [...prev.slice(-4), result.stderr]);
        }
      }
      setOutput(parts.join("") || "(出力なし)");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setOutput(`実行エラー: ${msg}`);
      setRuntimeErrors((prev) => [...prev.slice(-4), msg]);
    } finally {
      setLoading(false);
    }
  }, [code, setupSql]);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-950">
      {setupSql && (
        <div className="border-b border-gray-800 p-3 bg-gray-900/50">
          <span className="text-xs text-gray-500 font-semibold">テーブル定義</span>
          <pre className="text-xs text-gray-400 mt-1 whitespace-pre-wrap">{setupSql}</pre>
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-mono text-sm font-semibold">SQL</span>
          <span className="text-gray-500 text-xs">エディタ</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint((v) => !v)}
            className="text-xs text-gray-400 hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
            title={`ヒント: ${showHint ? "ON" : "OFF"}`}
          >
            💡 {showHint ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => setCode(defaultCode)}
            className="text-xs text-gray-400 hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            リセット
          </button>
          <button
            onClick={() => setCode("")}
            className="text-xs text-gray-400 hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            全消去
          </button>
          {output && (
            <button
              onClick={() => { setOutput(""); setRuntimeErrors([]); }}
              className="text-xs text-gray-400 hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
            >
              クリア
            </button>
          )}
          <button
            onClick={runCode}
            disabled={loading}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                実行中...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none" />
                </svg>
                実行
              </>
            )}
          </button>
        </div>
      </div>
      <CodeMirror
        value={code}
        height="auto"
        minHeight="80px"
        theme={oneDark}
        extensions={[sql(), lintExtension, ...(showHint ? [placeholderExtension] : [])]}
        onChange={setCode}
        className="text-sm"
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          autocompletion: true,
        }}
      />
      <ProblemsPanel problems={problems} runtimeErrors={runtimeErrors} />
      {(output || loading) && (
        <div className="border-t border-gray-800">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border-b border-gray-800">
            <span className="text-xs font-medium text-gray-400">出力</span>
          </div>
          <pre className="px-4 py-3 text-sm font-mono text-gray-200 bg-gray-950 min-h-[60px] max-h-64 overflow-auto whitespace-pre-wrap">
            {loading && !output ? (
              <span className="text-gray-500">実行中...</span>
            ) : (
              output
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
