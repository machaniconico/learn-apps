import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function HelloWorldPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Hello World</h1>
        <p className="text-gray-400">最初のGoプログラムを作成しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Goプログラムの基本構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goプログラムは必ず <code className="text-cyan-300">package main</code> から始まります。
          実行可能なプログラムには <code className="text-cyan-300">func main()</code> が必要です。
          外部パッケージは <code className="text-cyan-300">import</code> で読み込みます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">package main</code> — 実行可能プログラムの宣言</li>
          <li><code className="text-cyan-300">import &quot;fmt&quot;</code> — 標準出力パッケージの読み込み</li>
          <li><code className="text-cyan-300">func main()</code> — プログラムのエントリーポイント</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Hello Worldプログラム</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">fmt.Println</code> で文字列を出力します。自動的に改行が追加されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`}
          expectedOutput={`Hello, World!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">fmt.Println</code> を複数回呼ぶことで、複数行を出力できます。
          <code className="text-cyan-300">fmt.Printf</code> ではフォーマット付き出力が可能です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
    fmt.Println("Go言語を学ぼう！")
    fmt.Printf("バージョン: %s\\n", "1.21")
}`}
          expectedOutput={`Hello, Go!
Go言語を学ぼう！
バージョン: 1.21`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数パッケージのインポート</h2>
        <p className="text-gray-400 mb-4">
          複数のパッケージをインポートするには、括弧でまとめて記述します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "math"
)

func main() {
    fmt.Println("円周率:", math.Pi)
    fmt.Println("平方根:", math.Sqrt(16))
}`}
          expectedOutput={`円周率: 3.141592653589793
平方根: 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="hello-world" />
      </div>
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
