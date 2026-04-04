import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function StructBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">構造体 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造体の基本</h1>
        <p className="text-gray-400">typeとstructで定義する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体は関連するデータをグループ化するための型です。
          <code className="text-cyan-300">type 名前 struct</code> で定義します。
          Goにはクラスがないため、構造体がデータの主要な構造化手段です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体の定義と初期化</h2>
        <p className="text-gray-400 mb-4">
          複数の方法で構造体を初期化できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Person struct {
    Name string
    Age  int
    City string
}

func main() {
    // フィールド名指定
    p1 := Person{Name: "太郎", Age: 25, City: "東京"}
    fmt.Println(p1)

    // 順番指定（非推奨）
    p2 := Person{"花子", 30, "大阪"}
    fmt.Println(p2)

    // 一部だけ指定（残りはゼロ値）
    p3 := Person{Name: "次郎"}
    fmt.Printf("%+v\\n", p3)
}`}
          expectedOutput={`{太郎 25 東京}
{花子 30 大阪}
{Name:次郎 Age:0 City:}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">var宣言とポインタ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">var</code> で宣言するとゼロ値で初期化されます。
          <code className="text-cyan-300">&amp;</code> でポインタを取得できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Point struct {
    X, Y int
}

func main() {
    // var宣言（ゼロ値）
    var p1 Point
    fmt.Printf("ゼロ値: %+v\\n", p1)

    // ポインタとして作成
    p2 := &Point{X: 10, Y: 20}
    fmt.Printf("ポインタ: %+v\\n", *p2)
    fmt.Printf("型: %T\\n", p2)
}`}
          expectedOutput={`ゼロ値: {X:0 Y:0}
ポインタ: {X:10 Y:20}
型: *main.Point`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/structs" />
    </div>
  );
}
