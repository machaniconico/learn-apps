"use client";

import { useState, useCallback, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { clike } from "@codemirror/legacy-modes/mode/clike";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";
import { ProblemsPanel, executeCode, createEditorLinter } from "@learn-apps/shared";
import type { LintMessage } from "@learn-apps/shared";
import { lintCsharp } from "../lib/linter";

interface CSharpEditorProps {
  defaultCode?: string;
  height?: string;
  expectedOutput?: string;
}

const csharpLanguage = StreamLanguage.define(clike({
  name: "csharp",
  keywords: new Set([
    "abstract", "as", "base", "bool", "break", "byte", "case", "catch",
    "char", "checked", "class", "const", "continue", "decimal", "default",
    "delegate", "do", "double", "else", "enum", "event", "explicit",
    "extern", "false", "finally", "fixed", "float", "for", "foreach",
    "goto", "if", "implicit", "in", "int", "interface", "internal",
    "is", "lock", "long", "namespace", "new", "null", "object",
    "operator", "out", "override", "params", "private", "protected",
    "public", "readonly", "ref", "return", "sbyte", "sealed", "short",
    "sizeof", "stackalloc", "static", "string", "struct", "switch",
    "this", "throw", "true", "try", "typeof", "uint", "ulong",
    "unchecked", "unsafe", "ushort", "using", "var", "virtual", "void",
    "volatile", "while", "async", "await", "yield", "get", "set",
    "add", "remove", "value", "partial", "where", "record", "init",
    "required", "global", "with", "when", "and", "or", "not",
  ]),
  types: new Set([
    "Boolean", "Byte", "Char", "DateTime", "DateTimeOffset", "Decimal",
    "Double", "Guid", "Int16", "Int32", "Int64", "Object", "SByte",
    "Single", "String", "TimeSpan", "UInt16", "UInt32", "UInt64",
    "List", "Dictionary", "HashSet", "Queue", "Stack", "Task",
    "Action", "Func", "IEnumerable", "IList", "IDictionary",
    "Console", "Math", "Convert", "Array", "Enumerable",
  ]),
  blockKeywords: new Set(["catch", "class", "do", "else", "finally", "for", "foreach", "if", "struct", "switch", "try", "while", "namespace", "interface", "enum", "record"]),
  atoms: new Set(["true", "false", "null"]),
  number: /^(?:0x[\da-f]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f|m)?/i,
  hooks: {
    "@": (stream: { eatWhile: (re: RegExp) => void }) => {
      stream.eatWhile(/[\w$]/);
      return "meta";
    },
  },
}));

const DEFAULT_CODE = `// C#コードを確認してみましょう！
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, C#!");

        // 変数の宣言
        string name = "World";
        int number = 42;

        Console.WriteLine($"Hello, {name}!");
        Console.WriteLine($"The answer is {number}");
    }
}
`;

export function CSharpEditor({ defaultCode = DEFAULT_CODE, height = "300px" }: CSharpEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState<LintMessage[]>([]);
  const [runtimeErrors, setRuntimeErrors] = useState<string[]>([]);

  const lintExtension = useMemo(
    () => createEditorLinter(lintCsharp, setProblems),
    [],
  );

  const runCode = useCallback(async () => {
    setLoading(true);
    setOutput("");
    setRuntimeErrors([]);

    try {
      const result = await executeCode("csharp", code);
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
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-purple-400 font-mono text-sm font-semibold">C#</span>
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
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
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

      {/* Editor */}
      <CodeMirror
        value={code}
        height={height}
        extensions={[csharpLanguage, basicSetup, lintExtension]}
        theme={oneDark}
        onChange={(val) => { setCode(val); }}
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
