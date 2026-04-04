import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数の基本</h1>
        <p className="text-gray-400">funcキーワードで関数を定義する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数の定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">func</code> キーワードで関数を定義します。
          関数名、引数、戻り値の型を指定します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">func 関数名(引数) 戻り値型 {`{}`}</code></li>
          <li>大文字で始まる関数はエクスポートされる</li>
          <li>小文字で始まる関数はパッケージ内のみ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な関数</h2>
        <p className="text-gray-400 mb-4">
          シンプルな関数の定義と呼び出しです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 挨拶を出力する関数
func greet() {
    fmt.Println("こんにちは！")
}

// メッセージを出力する関数
func sayHello(name string) {
    fmt.Printf("Hello, %s!\\n", name)
}

func main() {
    greet()
    sayHello("Go")
    sayHello("World")
}`}
          expectedOutput={`こんにちは！
Hello, Go!
Hello, World!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">戻り値のある関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">return</code> で値を返す関数を定義します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func square(n int) int {
    return n * n
}

func greeting(name string) string {
    return fmt.Sprintf("こんにちは、%sさん！", name)
}

func main() {
    result := square(5)
    fmt.Println("5の二乗:", result)
    fmt.Println(square(12))
    fmt.Println(greeting("太郎"))
}`}
          expectedOutput={`5の二乗: 25
144
こんにちは、太郎さん！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/functions" />
    </div>
  );
}
