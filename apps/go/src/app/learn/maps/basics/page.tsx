import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("maps");

export default function MapsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">マップ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">マップの基本</h1>
        <p className="text-gray-400">map[K]Vの作成と基本的な使い方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マップとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マップは<code className="text-cyan-300">map[K]V</code>の形式で宣言するキーと値のペアを格納するデータ構造です。
          他の言語のハッシュマップ、辞書（Dictionary）に相当します。
          キーの型Kは比較可能な型（<code className="text-cyan-300">==</code>で比較できる型）でなければなりません。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マップの作成方法</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // リテラルで作成
    colors := map[string]string{
        "red":   "#FF0000",
        "green": "#00FF00",
        "blue":  "#0000FF",
    }
    fmt.Println("colors:", colors)

    // makeで作成
    scores := make(map[string]int)
    scores["Alice"] = 95
    scores["Bob"] = 82
    fmt.Println("scores:", scores)

    // var宣言（nilマップ）
    var m map[string]int
    fmt.Println("nil map:", m)
    fmt.Println("nil?:", m == nil)
}`}
          expectedOutput={`colors: map[blue:#0000FF green:#00FF00 red:#FF0000]
scores: map[Alice:95 Bob:82]
nil map: map[]
nil?: true`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値の取得とゼロ値</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    ages := map[string]int{
        "Alice": 25,
        "Bob":   30,
    }

    // 存在するキー
    fmt.Println("Alice:", ages["Alice"])

    // 存在しないキーはゼロ値が返る
    fmt.Println("Carol:", ages["Carol"])

    // 長さ
    fmt.Println("要素数:", len(ages))
}`}
          expectedOutput={`Alice: 25
Carol: 0
要素数: 2`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">様々なキーと値の型</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // int -> string
    months := map[int]string{
        1: "January",
        2: "February",
        3: "March",
    }
    fmt.Println("月:", months[1])

    // string -> bool（セットとして使用）
    visited := map[string]bool{
        "Tokyo":  true,
        "Osaka":  true,
        "Kyoto":  false,
    }
    fmt.Println("東京訪問済み:", visited["Tokyo"])
    fmt.Println("札幌訪問済み:", visited["Sapporo"])

    // string -> []string
    hobbies := map[string][]string{
        "Alice": {"読書", "プログラミング"},
        "Bob":   {"サッカー", "料理", "旅行"},
    }
    fmt.Println("Aliceの趣味:", hobbies["Alice"])
}`}
          expectedOutput={`月: January
東京訪問済み: true
札幌訪問済み: false
Aliceの趣味: [読書 プログラミング]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="maps" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/maps" />
    </div>
  );
}
