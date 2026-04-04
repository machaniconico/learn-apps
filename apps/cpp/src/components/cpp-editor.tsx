"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { clike } from "@codemirror/legacy-modes/mode/clike";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";

interface CppEditorProps {
  defaultCode?: string;
  height?: string;
  expectedOutput?: string;
}

const cppLanguage = StreamLanguage.define(clike({
  name: "cpp",
  keywords: new Set([
    "alignas", "alignof", "and", "and_eq", "asm", "auto", "bitand",
    "bitor", "bool", "break", "case", "catch", "char", "char8_t",
    "char16_t", "char32_t", "class", "compl", "concept", "const",
    "consteval", "constexpr", "constinit", "const_cast", "continue",
    "co_await", "co_return", "co_yield", "decltype", "default",
    "delete", "do", "double", "dynamic_cast", "else", "enum",
    "explicit", "export", "extern", "false", "float", "for",
    "friend", "goto", "if", "inline", "int", "long", "mutable",
    "namespace", "new", "noexcept", "not", "not_eq", "nullptr",
    "operator", "or", "or_eq", "private", "protected", "public",
    "register", "reinterpret_cast", "requires", "return", "short",
    "signed", "sizeof", "static", "static_assert", "static_cast",
    "struct", "switch", "template", "this", "thread_local", "throw",
    "true", "try", "typedef", "typeid", "typename", "union",
    "unsigned", "using", "virtual", "void", "volatile", "wchar_t",
    "while", "xor", "xor_eq", "override", "final",
  ]),
  types: new Set([
    "string", "vector", "map", "set", "unordered_map", "unordered_set",
    "array", "deque", "list", "queue", "stack", "priority_queue",
    "pair", "tuple", "optional", "variant", "any", "shared_ptr",
    "unique_ptr", "weak_ptr", "function", "thread", "mutex",
    "future", "promise", "atomic", "condition_variable",
    "iostream", "fstream", "sstream", "istream", "ostream",
    "size_t", "ptrdiff_t", "int8_t", "int16_t", "int32_t", "int64_t",
    "uint8_t", "uint16_t", "uint32_t", "uint64_t",
    "cin", "cout", "cerr", "endl", "std",
  ]),
  blockKeywords: new Set(["catch", "class", "do", "else", "finally", "for", "if", "struct", "switch", "try", "while", "namespace", "enum"]),
  atoms: new Set(["true", "false", "nullptr", "NULL"]),
  number: /^(?:0x[\da-f]+|0b[01]+|0[0-7]*|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,
  hooks: {
    "#": (stream: { skipToEnd: () => void }) => {
      stream.skipToEnd();
      return "meta";
    },
  },
}));

const DEFAULT_CODE = `// C++コードを確認してみましょう！
#include <iostream>
#include <string>

int main() {
    std::cout << "Hello, C++!" << std::endl;

    // 変数の宣言
    std::string name = "World";
    int number = 42;

    std::cout << "Hello, " << name << "!" << std::endl;
    std::cout << "The answer is " << number << std::endl;

    return 0;
}
`;

export function CppEditor({ defaultCode = DEFAULT_CODE, height = "300px", expectedOutput }: CppEditorProps) {
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
          <span className="text-blue-400 font-mono text-sm font-semibold">C++</span>
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
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
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
        extensions={[cppLanguage, basicSetup]}
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
            <p>C++はブラウザ上では実行できません。コードの動作を確認するには、C++コンパイラをインストールしてローカル環境で実行してください。</p>
            <p className="mt-1 text-xs text-gray-500">
              <code className="bg-gray-800 px-1.5 py-0.5 rounded">g++ main.cpp -o main && ./main</code> コマンドで実行できます。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
