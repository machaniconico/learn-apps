import { CSharpEditor } from "@/components/csharp-editor";

const DEFAULT_CODE = `// C# FizzBuzz & コレクション操作
using System;
using System.Collections.Generic;
using System.Linq;

// FizzBuzz
Console.WriteLine("=== FizzBuzz (1-20) ===");
for (int i = 1; i <= 20; i++)
{
    string result = (i % 3, i % 5) switch
    {
        (0, 0) => "FizzBuzz",
        (0, _) => "Fizz",
        (_, 0) => "Buzz",
        _ => i.ToString()
    };
    Console.Write($"{result} ");
}
Console.WriteLine();

// LINQ
Console.WriteLine("\\n=== LINQ操作 ===");
var numbers = Enumerable.Range(1, 10).ToList();
var evenSquares = numbers
    .Where(n => n % 2 == 0)
    .Select(n => new { Value = n, Square = n * n });

Console.WriteLine("偶数とその二乗:");
foreach (var item in evenSquares)
{
    Console.WriteLine($"  {item.Value} -> {item.Square}");
}

// Dictionary
Console.WriteLine("\\n=== Dictionary ===");
var scores = new Dictionary<string, int>
{
    ["太郎"] = 85,
    ["花子"] = 92,
    ["次郎"] = 78
};

var topStudent = scores.MaxBy(x => x.Value);
Console.WriteLine($"最高得点: {topStudent.Key} ({topStudent.Value}点)");
Console.WriteLine($"平均点: {scores.Values.Average():F1}");
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🚀</span>
            <h1 className="text-3xl font-bold text-gray-100">C#フリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">
            C#コードを自由に書いて実行できるフリースペースです
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ブラウザ上で動作（インストール不要）
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ctrl+Enter で実行
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tabキーでインデント
            </div>
          </div>
        </div>

        {/* Editor */}
        <CSharpEditor defaultCode={DEFAULT_CODE} height="480px" />

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">基本構文</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              変数宣言、制御構文、メソッド定義、クラスなどC#の基本的な構文を自由に試せます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">LINQ・コレクション</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              List, Dictionary, LINQクエリなどのコレクション操作をブラウザ上で確認できます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">注意事項</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              ファイルシステムへのアクセスやネットワーク通信はブラウザのセキュリティ制限により一部制限があります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
