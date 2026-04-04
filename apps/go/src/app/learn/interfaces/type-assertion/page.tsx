import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("interfaces");

export default function TypeAssertionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">インターフェース レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型アサーション</h1>
        <p className="text-gray-400">型の確認と変換を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型アサーションとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インターフェース値から具体的な型の値を取り出す操作です。
          <code className="text-cyan-300">値.(型)</code> の形式で行います。
          2つ目の戻り値で成功/失敗を確認できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">v := i.(Type)</code> — 失敗するとpanicする</li>
          <li><code className="text-cyan-300">v, ok := i.(Type)</code> — 安全な型アサーション</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な型アサーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">ok</code> パターンで安全に型を確認します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func describe(i any) {
    // 安全な型アサーション
    if s, ok := i.(string); ok {
        fmt.Printf("文字列: %q (長さ: %d)\\n", s, len(s))
        return
    }
    if n, ok := i.(int); ok {
        fmt.Printf("整数: %d (2倍: %d)\\n", n, n*2)
        return
    }
    fmt.Printf("その他: %v (%T)\\n", i, i)
}

func main() {
    describe("hello")
    describe(42)
    describe(3.14)
    describe(true)
}`}
          expectedOutput={`文字列: "hello" (長さ: 5)
整数: 42 (2倍: 84)
その他: 3.14 (float64)
その他: true (bool)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースへの型アサーション</h2>
        <p className="text-gray-400 mb-4">
          具体的な型だけでなく、別のインターフェースを満たすかもチェックできます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Stringer interface {
    String() string
}

type Named struct {
    Name string
}

func (n Named) String() string {
    return n.Name
}

func tryString(v any) {
    if s, ok := v.(Stringer); ok {
        fmt.Println("Stringer:", s.String())
    } else {
        fmt.Printf("Stringerではない: %v\\n", v)
    }
}

func main() {
    tryString(Named{Name: "Go太郎"})
    tryString(42)
    tryString("普通の文字列")
}`}
          expectedOutput={`Stringer: Go太郎
Stringerではない: 42
Stringerではない: 普通の文字列`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="interfaces" lessonId="type-assertion" />
      </div>
      <LessonNav lessons={lessons} currentId="type-assertion" basePath="/learn/interfaces" />
    </div>
  );
}
