"use client";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { php } from "@codemirror/lang-php";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";

interface PhpEditorProps {
  defaultCode?: string;
  height?: string;
  expectedOutput?: string;
}

const DEFAULT_CODE = `<?php
// PHPコードを確認してみましょう！
$name = "PHP";
echo "Hello, $name!\\n";

$numbers = [1, 2, 3, 4, 5];
$squares = array_map(fn($n) => $n * $n, $numbers);
print_r($squares);
`;

export function PhpEditor({ defaultCode = DEFAULT_CODE, height = "300px", expectedOutput }: PhpEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [showOutput, setShowOutput] = useState(false);

  return (
    <div className="rounded-xl border border-gray-700 overflow-hidden bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 font-mono text-sm font-semibold">PHP</span>
          <span className="text-gray-500 text-xs">エディタ</span>
        </div>
        <div className="flex items-center gap-2">
          {showOutput && (
            <button onClick={() => setShowOutput(false)} className="text-xs text-gray-400 hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-700 transition-colors">クリア</button>
          )}
          <button onClick={() => setShowOutput(true)} className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none" /></svg>
            実行
          </button>
        </div>
      </div>
      <CodeMirror value={code} height={height} extensions={[php(), basicSetup]} theme={oneDark} onChange={(val) => setCode(val)} className="text-sm" />
      {showOutput && expectedOutput && (
        <div className="border-t border-gray-700">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border-b border-gray-700">
            <span className="text-xs font-medium text-gray-400">実行結果（期待される出力）</span>
          </div>
          <pre className="px-4 py-3 text-sm font-mono text-gray-200 bg-gray-950 min-h-[60px] max-h-64 overflow-auto whitespace-pre-wrap">{expectedOutput}</pre>
        </div>
      )}
      {showOutput && !expectedOutput && (
        <div className="border-t border-gray-700">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 border-b border-gray-700">
            <span className="text-xs font-medium text-gray-400">情報</span>
          </div>
          <div className="px-4 py-3 text-sm text-gray-400 bg-gray-950">
            <p>PHPはブラウザ上では直接実行できません。ローカル環境またはオンラインのPHP実行環境で実行してください。</p>
            <p className="mt-1 text-xs text-gray-500"><code className="bg-gray-800 px-1.5 py-0.5 rounded">php filename.php</code> で実行できます。</p>
          </div>
        </div>
      )}
    </div>
  );
}
