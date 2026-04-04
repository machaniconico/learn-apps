import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function StringsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">stringの作成・操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの <code className="text-cyan-300">string</code> 型はイミュータブル（変更不可）なバイト列です。
          ダブルクォートで囲んで作成します。バッククォートで生文字列リテラルを作れます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">&quot;hello&quot;</code> — 通常の文字列リテラル</li>
          <li><code className="text-cyan-300">`hello`</code> — 生文字列リテラル（エスケープ不要）</li>
          <li><code className="text-cyan-300">len(s)</code> — バイト数を返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の作成と連結</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">+</code> 演算子で文字列を連結できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    greeting := "こんにちは"
    name := "Go"
    message := greeting + "、" + name + "！"

    fmt.Println(message)
    fmt.Println("長さ（バイト数）:", len(message))
}`}
          expectedOutput={`こんにちは、Go！
長さ（バイト数）: 22`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">生文字列リテラル</h2>
        <p className="text-gray-400 mb-4">
          バッククォートで囲むと、改行やエスケープシーケンスがそのまま含まれます。
        </p>
        <GoEditor
          defaultCode={"package main\n\nimport \"fmt\"\n\nfunc main() {\n    raw := `改行も\nそのまま\n含まれます`\n    fmt.Println(raw)\n\n    // 通常の文字列ではエスケープが必要\n    normal := \"パス: C:\\\\Users\\\\Go\"\n    fmt.Println(normal)\n}"}
          expectedOutput={"改行も\nそのまま\n含まれます\nパス: C:\\Users\\Go"}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列のインデックスアクセス</h2>
        <p className="text-gray-400 mb-4">
          文字列はバイト単位でインデックスアクセスできます。日本語などのマルチバイト文字には
          <code className="text-cyan-300">[]rune</code> に変換して使います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    s := "Hello"
    fmt.Printf("最初のバイト: %c\\n", s[0])
    fmt.Printf("最後のバイト: %c\\n", s[len(s)-1])

    // 日本語はruneスライスで扱う
    jp := "Go言語"
    runes := []rune(jp)
    fmt.Printf("文字数: %d\\n", len(runes))
    fmt.Printf("3番目の文字: %c\\n", runes[2])
}`}
          expectedOutput={`最初のバイト: H
最後のバイト: o
文字数: 4
3番目の文字: 語`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="strings-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-basics" basePath="/learn/basics" />
    </div>
  );
}
