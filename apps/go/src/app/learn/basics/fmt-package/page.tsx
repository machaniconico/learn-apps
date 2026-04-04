import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function FmtPackagePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">fmtパッケージ</h1>
        <p className="text-gray-400">Printf・Sprintf等の出力を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">fmtパッケージの主な関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">fmt</code> パッケージはGoの標準出力・フォーマットを担当します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">Println</code> — 改行付き出力</li>
          <li><code className="text-cyan-300">Printf</code> — フォーマット付き出力</li>
          <li><code className="text-cyan-300">Sprintf</code> — フォーマットして文字列を返す</li>
          <li><code className="text-cyan-300">%d</code> 整数, <code className="text-cyan-300">%s</code> 文字列, <code className="text-cyan-300">%v</code> デフォルト, <code className="text-cyan-300">%T</code> 型名</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Println と Printf</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">Println</code> はスペース区切りで出力、
          <code className="text-cyan-300">Printf</code> はフォーマット動詞を使います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    name := "Go"
    version := 1.21
    count := 42

    // Println
    fmt.Println("言語:", name, "バージョン:", version)

    // Printf フォーマット動詞
    fmt.Printf("言語: %s\\n", name)
    fmt.Printf("バージョン: %.2f\\n", version)
    fmt.Printf("カウント: %d\\n", count)
    fmt.Printf("型: %T\\n", version)
    fmt.Printf("値: %v\\n", count)
}`}
          expectedOutput={`言語: Go バージョン: 1.21
言語: Go
バージョン: 1.21
カウント: 42
型: float64
値: 42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Sprintf と各種フォーマット</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">Sprintf</code> はフォーマットした結果を文字列として返します。出力はしません。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // Sprintfで文字列生成
    msg := fmt.Sprintf("Hello, %s! あなたは%d歳です。", "太郎", 25)
    fmt.Println(msg)

    // 各種フォーマット動詞
    n := 255
    fmt.Printf("10進数: %d\\n", n)
    fmt.Printf("2進数:  %b\\n", n)
    fmt.Printf("8進数:  %o\\n", n)
    fmt.Printf("16進数: %x\\n", n)
    fmt.Printf("文字:   %c\\n", 65)

    // パディング
    fmt.Printf("[%10d]\\n", 42)
    fmt.Printf("[%-10d]\\n", 42)
}`}
          expectedOutput={`Hello, 太郎! あなたは25歳です。
10進数: 255
2進数:  11111111
8進数:  377
16進数: ff
文字:   A
[        42]
[42        ]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="fmt-package" />
      </div>
      <LessonNav lessons={lessons} currentId="fmt-package" basePath="/learn/basics" />
    </div>
  );
}
