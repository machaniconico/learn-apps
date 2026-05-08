"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { placeholder as cmPlaceholder } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { ProblemsPanel } from "@learn-apps/shared/components/problems-panel";
import type { LintMessage } from "@learn-apps/shared/lib/lint";
import { lintPython } from "../lib/linter";

interface PythonPlaygroundProps {
  defaultCode?: string;
  height?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPyodide: (config: { indexURL: string }) => Promise<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _pyodideInstance: any;
  }
}

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/";

const DEFAULT_CODE = `# Pythonコードを書いて実行してみよう！
print("Hello, Python!")

# 計算もできます
result = 2 ** 10
print(f"2の10乗 = {result}")

# リスト操作
fruits = ["りんご", "バナナ", "みかん"]
for fruit in fruits:
    print(f"フルーツ: {fruit}")
`;

export function PythonPlayground({ defaultCode = DEFAULT_CODE, height = "300px" }: PythonPlaygroundProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideError, setPyodideError] = useState(false);
  const [problems, setProblems] = useState<LintMessage[]>([]);
  const [runtimeErrors, setRuntimeErrors] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(true);
  const pyodideRef = useRef<unknown>(null);

  const placeholderExtension = useMemo(
    () => cmPlaceholder(defaultCode),
    [defaultCode],
  );

  const loadPyodideInstance = useCallback(async () => {
    if (pyodideRef.current) return pyodideRef.current;
    if (window._pyodideInstance) {
      pyodideRef.current = window._pyodideInstance;
      return pyodideRef.current;
    }

    // Load the Pyodide script if not already loaded
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `${PYODIDE_CDN}pyodide.js`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Pyodideスクリプトの読み込みに失敗しました"));
        document.head.appendChild(script);
      });
    }

    const pyodide = await window.loadPyodide({ indexURL: PYODIDE_CDN });
    window._pyodideInstance = pyodide;
    pyodideRef.current = pyodide;
    return pyodide;
  }, []);

  const runCode = useCallback(async () => {
    setLoading(true);
    setOutput("");
    setRuntimeErrors([]);
    setPyodideError(false);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pyodide: any = await loadPyodideInstance();
      setPyodideReady(true);

      const captured: string[] = [];

      // Redirect stdout/stderr
      pyodide.runPython(`
import sys
import io
_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
`);

      try {
        pyodide.runPython(code);
      } catch (err: unknown) {
        // Execution error - capture it
        const errMsg = err instanceof Error ? err.message : String(err);
        captured.push(`[エラー] ${errMsg}`);
        setRuntimeErrors(prev => [...prev.slice(-4), errMsg]);
      }

      const stdout: string = pyodide.runPython("_stdout_capture.getvalue()");
      const stderr: string = pyodide.runPython("_stderr_capture.getvalue()");

      // Reset stdout/stderr
      pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

      const parts: string[] = [];
      if (stdout) parts.push(stdout);
      if (stderr) parts.push(`[stderr]\n${stderr}`);
      if (captured.length > 0) parts.push(captured.join("\n"));

      setOutput(parts.join("") || "(出力なし)");
    } catch (err: unknown) {
      setPyodideError(true);
      const msg = err instanceof Error ? err.message : String(err);
      setOutput(`Pyodideの読み込みに失敗しました:\n${msg}`);
    } finally {
      setLoading(false);
    }
  }, [code, loadPyodideInstance]);

  return (
    <div className="rounded-xl border border-gray-700 overflow-hidden bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-mono text-sm font-semibold">Python</span>
          <span className="text-gray-500 text-xs">プレイグラウンド</span>
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
              onClick={() => setOutput("")}
              className="text-xs text-gray-400 hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
            >
              クリア
            </button>
          )}
          <button
            onClick={runCode}
            disabled={loading}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {pyodideReady ? "実行中..." : "Pythonを読み込み中..."}
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

      {/* Editor */}
      <CodeMirror
        value={code}
        height={height}
        extensions={[python(), basicSetup, ...(showHint ? [placeholderExtension] : [])]}
        theme={oneDark}
        onChange={(val) => { setCode(val); setProblems(lintPython(val)); }}
        className="text-sm"
      />

      <ProblemsPanel problems={problems} runtimeErrors={runtimeErrors} />

      {/* Output */}
      {(output || loading) && (
        <div className="border-t border-gray-700">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border-b border-gray-700">
            <span className="text-xs font-medium text-gray-400">出力</span>
            {pyodideError && (
              <span className="text-xs text-red-400">読み込みエラー</span>
            )}
          </div>
          <pre className="px-4 py-3 text-sm font-mono text-gray-200 bg-gray-950 min-h-[60px] max-h-64 overflow-auto whitespace-pre-wrap">
            {loading && !output ? (
              <span className="text-gray-500">
                {pyodideReady ? "実行中..." : "Pythonを読み込み中..."}
              </span>
            ) : (
              output
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
