import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function BuilderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">strings.Builder</h1>
        <p className="text-gray-400">strings.Builderを使った効率的な文字列結合を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜBuilderが必要か</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの文字列はイミュータブルなので、<code className="text-cyan-300">+</code> で結合するたびに新しい文字列が作成されます。
          大量の結合を行うと多くのメモリ割り当てが発生します。
          <code className="text-cyan-300">strings.Builder</code> は内部バッファを使って効率的に文字列を構築します。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な使い方</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func main() {
    var b strings.Builder

    // WriteString: 文字列を追加
    b.WriteString("Hello")
    b.WriteString(", ")
    b.WriteString("Go")
    b.WriteString("!")

    // String: 結果を取得
    result := b.String()
    fmt.Println(result)
    fmt.Println("長さ:", b.Len())

    // WriteByte: 1バイト追加
    var b2 strings.Builder
    for i := 0; i < 5; i++ {
        b2.WriteByte('A' + byte(i))
    }
    fmt.Println(b2.String())

    // WriteRune: ルーン追加
    var b3 strings.Builder
    for _, r := range "あいうえお" {
        b3.WriteRune(r)
        b3.WriteString(" ")
    }
    fmt.Println(b3.String())
}`}
          expectedOutput={`Hello, Go!
長さ: 10
ABCDE
あ い う え お `}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用例：CSV生成</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

type Product struct {
    Name  string
    Price int
    Stock int
}

func toCSV(products []Product) string {
    var b strings.Builder
    b.WriteString("名前,価格,在庫\\n")

    for _, p := range products {
        line := fmt.Sprintf("%s,%d,%d\\n", p.Name, p.Price, p.Stock)
        b.WriteString(line)
    }

    return b.String()
}

func main() {
    products := []Product{
        {"りんご", 150, 100},
        {"バナナ", 200, 50},
        {"みかん", 100, 200},
    }

    csv := toCSV(products)
    fmt.Print(csv)
}`}
          expectedOutput={`名前,価格,在庫
りんご,150,100
バナナ,200,50
みかん,100,200`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Growで事前にメモリ確保</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func joinWithSeparator(items []string, sep string) string {
    if len(items) == 0 {
        return ""
    }

    // 必要な容量を計算して事前確保
    total := 0
    for _, s := range items {
        total += len(s)
    }
    total += len(sep) * (len(items) - 1)

    var b strings.Builder
    b.Grow(total)  // メモリを事前確保

    b.WriteString(items[0])
    for _, s := range items[1:] {
        b.WriteString(sep)
        b.WriteString(s)
    }

    return b.String()
}

func main() {
    words := []string{"Go", "is", "awesome"}
    result := joinWithSeparator(words, " ")
    fmt.Println(result)

    langs := []string{"Go", "Rust", "Python", "Java"}
    result2 := joinWithSeparator(langs, " -> ")
    fmt.Println(result2)
}`}
          expectedOutput={`Go is awesome
Go -> Rust -> Python -> Java`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="builder" />
      </div>
      <LessonNav lessons={lessons} currentId="builder" basePath="/learn/strings" />
    </div>
  );
}
