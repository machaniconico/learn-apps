import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメント</h1>
        <p className="text-gray-400">単一行・複数行コメントを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントの書き方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goでは <code className="text-cyan-300">//</code> で単一行コメント、
          <code className="text-cyan-300">/* */</code> で複数行コメントを書きます。
          コメントはドキュメント生成にも使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">//</code> — 単一行コメント</li>
          <li><code className="text-cyan-300">/* ... */</code> — 複数行コメント</li>
          <li>エクスポートされた関数には必ずコメントを付ける慣習</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単一行・複数行コメント</h2>
        <p className="text-gray-400 mb-4">
          コメントはコンパイラに無視され、コードの説明に使います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// main関数はプログラムのエントリーポイント
func main() {
    // 単一行コメント
    name := "Gopher" // 行末コメント

    /*
       複数行コメント
       複数の行にわたって
       説明を書けます
    */
    fmt.Println("Hello,", name)
}`}
          expectedOutput={`Hello, Gopher`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ドキュメンテーションコメント</h2>
        <p className="text-gray-400 mb-4">
          Goではエクスポートされた識別子（大文字で始まる関数や型）の直前にコメントを書く慣習があります。
          <code className="text-cyan-300">go doc</code> コマンドでドキュメントを生成できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// Add は2つの整数の合計を返します。
// ドキュメンテーションコメントは関数名で始めます。
func Add(a, b int) int {
    return a + b
}

// Greet は名前を受け取り挨拶文を返します。
func Greet(name string) string {
    return fmt.Sprintf("こんにちは、%sさん！", name)
}

func main() {
    fmt.Println(Add(3, 5))
    fmt.Println(Greet("太郎"))
}`}
          expectedOutput={`8
こんにちは、太郎さん！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}
