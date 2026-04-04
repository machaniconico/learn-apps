import { GoEditor } from "@/components/go-editor";

const DEFAULT_CODE = `// Go FizzBuzz & データ構造操作
package main

import (
    "fmt"
    "sort"
    "strings"
)

func main() {
    // FizzBuzz
    fmt.Println("=== FizzBuzz (1-20) ===")
    for i := 1; i <= 20; i++ {
        switch {
        case i%15 == 0:
            fmt.Print("FizzBuzz ")
        case i%3 == 0:
            fmt.Print("Fizz ")
        case i%5 == 0:
            fmt.Print("Buzz ")
        default:
            fmt.Printf("%d ", i)
        }
    }
    fmt.Println()

    // スライス操作
    fmt.Println("\\n=== スライス操作 ===")
    numbers := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    var evens []int
    for _, n := range numbers {
        if n%2 == 0 {
            evens = append(evens, n)
        }
    }
    fmt.Println("偶数とその二乗:")
    for _, n := range evens {
        fmt.Printf("  %d -> %d\\n", n, n*n)
    }

    // マップ
    fmt.Println("\\n=== マップ ===")
    scores := map[string]int{
        "太郎": 85,
        "花子": 92,
        "次郎": 78,
    }

    topName, topScore := "", 0
    for name, score := range scores {
        if score > topScore {
            topName, topScore = name, score
        }
    }
    fmt.Printf("最高得点: %s (%d点)\\n", topName, topScore)

    total := 0
    for _, s := range scores {
        total += s
    }
    fmt.Printf("平均点: %.1f\\n", float64(total)/float64(len(scores)))

    // 文字列操作
    fmt.Println("\\n=== 文字列操作 ===")
    words := []string{"Go", "is", "simple", "and", "powerful"}
    sort.Strings(words)
    fmt.Println(strings.Join(words, " "))
}
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🚀</span>
            <h1 className="text-3xl font-bold text-gray-100">Goフリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Goコードを自由に書いて実行できるフリースペースです
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ブラウザ上で動作（インストール不要）
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ctrl+Enter で実行
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tabキーでインデント
            </div>
          </div>
        </div>

        {/* Editor */}
        <GoEditor defaultCode={DEFAULT_CODE} height="480px" />

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">基本構文</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              変数宣言、制御構文、関数定義、構造体などGoの基本的な構文を自由に試せます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">データ構造・並行処理</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              スライス、マップ、チャネル、goroutineなどGoならではの機能をブラウザ上で確認できます。
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
