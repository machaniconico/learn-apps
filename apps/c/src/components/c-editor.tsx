"use client";

import { useState, useCallback, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { ProblemsPanel, executeCode, createEditorLinter } from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";
import { lintC } from "../lib/linter";
import { StreamLanguage } from "@codemirror/language";
import { clike } from "@codemirror/legacy-modes/mode/clike";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";

interface CEditorProps {
  defaultCode?: string;
  height?: string;
  expectedOutput?: string;
}

const cLanguage = StreamLanguage.define(clike({
  name: "c",
  keywords: new Set([
    "auto", "break", "case", "char", "const", "continue", "default",
    "do", "double", "else", "enum", "extern", "float", "for", "goto",
    "if", "inline", "int", "long", "register", "restrict", "return",
    "short", "signed", "sizeof", "static", "struct", "switch", "typedef",
    "union", "unsigned", "void", "volatile", "while",
    "_Bool", "_Complex", "_Imaginary", "_Alignas", "_Alignof", "_Atomic",
    "_Generic", "_Noreturn", "_Static_assert", "_Thread_local",
  ]),
  types: new Set([
    "FILE", "size_t", "ptrdiff_t",
    "int8_t", "int16_t", "int32_t", "int64_t",
    "uint8_t", "uint16_t", "uint32_t", "uint64_t",
    "printf", "scanf", "fprintf", "fscanf", "sprintf", "sscanf",
    "malloc", "calloc", "realloc", "free",
    "NULL", "stdin", "stdout", "stderr", "EOF",
  ]),
  blockKeywords: new Set(["do", "else", "for", "if", "struct", "switch", "while", "enum"]),
  atoms: new Set(["true", "false", "NULL"]),
  number: /^(?:0x[\da-f]+|0b[01]+|0[0-7]*|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,
  hooks: {
    "#": (stream: { skipToEnd: () => void }) => {
      stream.skipToEnd();
      return "meta";
    },
  },
}));

const DEFAULT_CODE = `// Cコードを確認してみましょう！
#include <stdio.h>

int main() {
    printf("Hello, C!\\n");

    // 変数の宣言
    char name[] = "World";
    int number = 42;

    printf("Hello, %s!\\n", name);
    printf("The answer is %d\\n", number);

    return 0;
}
`;

export function CEditor({ defaultCode = DEFAULT_CODE, height = "300px" }: CEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState<LintMessage[]>([]);
  const [runtimeErrors, setRuntimeErrors] = useState<string[]>([]);

  const lintExtension = useMemo(
    () => createEditorLinter(lintC, setProblems),
    [],
  );

  const runCode = useCallback(async () => {
    setLoading(true);
    setOutput("");
    setRuntimeErrors([]);

    try {
      const result = await executeCode("c", code);
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
  }, [code]);

  return (
    <div className="rounded-xl border border-gray-700 overflow-hidden bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm font-semibold">C</span>
          <span className="text-gray-500 text-xs">エディタ</span>
        </div>
        <div className="flex items-center gap-2">
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
            className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 disabled:cursor-not-allowed text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
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
        height={height}
        extensions={[lintExtension, cLanguage, basicSetup]}
        theme={oneDark}
        onChange={setCode}
        className="text-sm"
      />
      <ProblemsPanel problems={problems} runtimeErrors={runtimeErrors} />
      {(output || loading) && (
        <div className="border-t border-gray-700">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border-b border-gray-700">
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
