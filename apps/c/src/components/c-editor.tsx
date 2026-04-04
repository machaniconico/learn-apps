"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
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

export function CEditor({ defaultCode = DEFAULT_CODE, height = "300px", expectedOutput }: CEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [showOutput, setShowOutput] = useState(false);

  const handleRun = () => {
    setShowOutput(true);
  };

  return (
    <div className="rounded-xl border border-gray-700 overflow-hidden bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-teal-400 font-mono text-sm font-semibold">C</span>
          <span className="text-gray-500 text-xs">エディタ</span>
        </div>
        <div className="flex items-center gap-2">
          {showOutput && (
            <button
              onClick={() => setShowOutput(false)}
              className="text-xs text-gray-400 hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
            >
              クリア
            </button>
          )}
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none" />
            </svg>
            実行
          </button>
        </div>
      </div>

      {/* Editor */}
      <CodeMirror
        value={code}
        height={height}
        extensions={[cLanguage, basicSetup]}
        theme={oneDark}
        onChange={(val) => setCode(val)}
        className="text-sm"
      />

      {/* Expected Output */}
      {showOutput && expectedOutput && (
        <div className="border-t border-gray-700">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border-b border-gray-700">
            <span className="text-xs font-medium text-gray-400">実行結果（期待される出力）</span>
          </div>
          <pre className="px-4 py-3 text-sm font-mono text-gray-200 bg-gray-950 min-h-[60px] max-h-64 overflow-auto whitespace-pre-wrap">
            {expectedOutput}
          </pre>
        </div>
      )}

      {showOutput && !expectedOutput && (
        <div className="border-t border-gray-700">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border-b border-gray-700">
            <span className="text-xs font-medium text-gray-400">情報</span>
          </div>
          <div className="px-4 py-3 text-sm text-gray-400 bg-gray-950">
            <p>Cはブラウザ上では実行できません。コードの動作を確認するには、Cコンパイラをインストールしてローカル環境で実行してください。</p>
            <p className="mt-1 text-xs text-gray-500">
              <code className="bg-gray-800 px-1.5 py-0.5 rounded">gcc main.c -o main && ./main</code> コマンドで実行できます。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
