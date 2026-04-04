import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringsPackagePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">stringsパッケージ</h1>
        <p className="text-gray-400">Contains、Split、Join、Replace、TrimSpaceなどの文字列操作関数を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">stringsパッケージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">strings</code> パッケージは文字列操作のための豊富な関数を提供します。
          検索、分割、結合、置換、トリムなど、日常的に必要な操作がすべて揃っています。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検索系の関数</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, Go World!"

    // 含むかチェック
    fmt.Println("Contains Go:", strings.Contains(s, "Go"))
    fmt.Println("Contains Java:", strings.Contains(s, "Java"))

    // 前方・後方一致
    fmt.Println("HasPrefix Hello:", strings.HasPrefix(s, "Hello"))
    fmt.Println("HasSuffix !:", strings.HasSuffix(s, "!"))

    // 出現位置
    fmt.Println("Index Go:", strings.Index(s, "Go"))
    fmt.Println("Index Java:", strings.Index(s, "Java"))

    // 出現回数
    fmt.Println("Count l:", strings.Count(s, "l"))
}`}
          expectedOutput={`Contains Go: true
Contains Java: false
HasPrefix Hello: true
HasSuffix !: true
Index Go: 7
Index Java: -1
Count l: 3`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">分割と結合</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func main() {
    // Split: 文字列を分割
    csv := "apple,banana,cherry,date"
    parts := strings.Split(csv, ",")
    fmt.Println("Split:", parts)

    // Join: スライスを結合
    joined := strings.Join(parts, " | ")
    fmt.Println("Join:", joined)

    // Fields: 空白で分割
    text := "  Hello   Go   World  "
    words := strings.Fields(text)
    fmt.Println("Fields:", words)

    // SplitN: 最大N個に分割
    kv := "key=value=extra"
    pair := strings.SplitN(kv, "=", 2)
    fmt.Println("SplitN:", pair)
}`}
          expectedOutput={`Split: [apple banana cherry date]
Join: apple | banana | cherry | date
Fields: [Hello Go World]
SplitN: [key value=extra]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">置換とトリム</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func main() {
    // Replace: 置換
    s := "Go is good. Go is great."
    fmt.Println(strings.Replace(s, "Go", "Rust", 1))   // 最初の1つ
    fmt.Println(strings.ReplaceAll(s, "Go", "Rust"))    // 全て

    // 大文字・小文字変換
    fmt.Println(strings.ToUpper("hello"))
    fmt.Println(strings.ToLower("HELLO"))
    fmt.Println(strings.Title("hello world"))

    // トリム
    fmt.Printf("[%s]\\n", strings.TrimSpace("  hello  "))
    fmt.Println(strings.Trim("***hello***", "*"))
    fmt.Println(strings.TrimLeft(">>>hello", ">"))
    fmt.Println(strings.TrimRight("hello<<<", "<"))

    // Repeat
    fmt.Println(strings.Repeat("Go! ", 3))
}`}
          expectedOutput={`Rust is good. Go is great.
Rust is good. Rust is great.
HELLO
hello
Hello World
[hello]
hello
hello
hello
Go! Go! Go! `}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="strings-package" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-package" basePath="/learn/strings" />
    </div>
  );
}
