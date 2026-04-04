import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基礎</h1>
        <p className="text-gray-400">イミュータブルなstring型とバイトスライスの関係を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Goの文字列</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの <code className="text-cyan-300">string</code> 型はイミュータブル（変更不可）なバイト列です。
          内部的にはUTF-8エンコードされたバイトの並びで、<code className="text-cyan-300">len()</code>はバイト数を返します。
          文字列はダブルクォート <code className="text-cyan-300">&quot;...&quot;</code> またはバッククォート <code className="text-cyan-300">`...`</code> で作成します。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // ダブルクォート（エスケープシーケンスが有効）
    s1 := "Hello, Go!\\n改行"
    fmt.Print(s1)

    // バッククォート（raw文字列リテラル）
    s2 := \` これは
    raw文字列です
    \\nもそのまま表示\`
    fmt.Println(s2)

    // 文字列の長さ（バイト数）
    s3 := "Hello"
    fmt.Println("バイト数:", len(s3))

    s4 := "こんにちは"
    fmt.Println("日本語バイト数:", len(s4))
}`}
          expectedOutput={`Hello, Go!
改行 これは
    raw文字列です
    \nもそのまま表示
バイト数: 5
日本語バイト数: 15`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列とバイトスライス</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    s := "Hello"

    // stringからバイトスライスへ
    b := []byte(s)
    fmt.Println("バイト:", b)

    // バイトスライスからstringへ
    s2 := string(b)
    fmt.Println("文字列:", s2)

    // バイトスライスは変更可能
    b[0] = 'J'
    fmt.Println("変更後:", string(b))
    fmt.Println("元の文字列:", s)  // 変わらない
}`}
          expectedOutput={`バイト: [72 101 108 108 111]
文字列: Hello
変更後: Jello
元の文字列: Hello`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の結合と比較</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 結合
    first := "Hello"
    second := "World"
    combined := first + ", " + second + "!"
    fmt.Println(combined)

    // 比較
    a := "abc"
    b := "abc"
    c := "xyz"
    fmt.Println("a == b:", a == b)
    fmt.Println("a == c:", a == c)
    fmt.Println("a < c:", a < c)

    // 文字列のインデックスアクセス（バイト）
    s := "Go言語"
    fmt.Printf("s[0] = %c (byte)\\n", s[0])
    fmt.Printf("s[1] = %c (byte)\\n", s[1])
}`}
          expectedOutput={`Hello, World!
a == b: true
a == c: false
a < c: true
s[0] = G (byte)
s[1] = o (byte)`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/strings" />
    </div>
  );
}
