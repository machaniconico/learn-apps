import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数</h1>
        <p className="text-gray-400">var・:=による変数宣言を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数宣言の方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goでは <code className="text-cyan-300">var</code> キーワードまたは
          <code className="text-cyan-300">:=</code> 短縮宣言で変数を宣言します。
          <code className="text-cyan-300">:=</code> は関数内でのみ使用可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">var x int</code> — 型指定のみ（ゼロ値で初期化）</li>
          <li><code className="text-cyan-300">var x int = 10</code> — 型指定+初期値</li>
          <li><code className="text-cyan-300">var x = 10</code> — 型推論</li>
          <li><code className="text-cyan-300">x := 10</code> — 短縮宣言（関数内のみ）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">var宣言と短縮宣言</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">var</code> は明示的な宣言、
          <code className="text-cyan-300">:=</code> は型推論による短縮宣言です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // var宣言
    var name string = "Gopher"
    var age int = 25

    // 短縮宣言（:=）
    city := "Tokyo"
    score := 98.5

    fmt.Println("名前:", name)
    fmt.Println("年齢:", age)
    fmt.Println("都市:", city)
    fmt.Println("スコア:", score)
}`}
          expectedOutput={`名前: Gopher
年齢: 25
都市: Tokyo
スコア: 98.5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数変数の宣言</h2>
        <p className="text-gray-400 mb-4">
          複数の変数を一度に宣言できます。<code className="text-cyan-300">var()</code> ブロックやカンマ区切りが使えます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 複数変数の同時宣言
    var (
        x int    = 10
        y int    = 20
        z string = "hello"
    )

    // カンマ区切りの短縮宣言
    a, b, c := 1, 2, "Go"

    fmt.Println(x, y, z)
    fmt.Println(a, b, c)
}`}
          expectedOutput={`10 20 hello
1 2 Go`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の再代入</h2>
        <p className="text-gray-400 mb-4">
          宣言済みの変数には <code className="text-cyan-300">=</code> で新しい値を代入できます。
          ただし型は変更できません。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    count := 0
    fmt.Println("初期値:", count)

    count = 10
    fmt.Println("変更後:", count)

    count = count + 5
    fmt.Println("加算後:", count)
}`}
          expectedOutput={`初期値: 0
変更後: 10
加算後: 15`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
