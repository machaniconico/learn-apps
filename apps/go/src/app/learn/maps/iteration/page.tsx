import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("maps");

export default function MapsIterationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">マップ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">走査</h1>
        <p className="text-gray-400">for k, v := range m でマップを走査する方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マップの走査</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">for key, value := range m</code> でマップの全要素を走査できます。
          注意点として、マップの走査順序は<strong>保証されません</strong>。毎回異なる順序で走査される可能性があります。
          順序が必要な場合は、キーをスライスに取り出してソートしてからアクセスします。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な走査</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    capitals := map[string]string{
        "日本": "東京",
        "フランス": "パリ",
        "アメリカ": "ワシントンD.C.",
    }

    // キーと値の両方
    for country, capital := range capitals {
        fmt.Printf("%s の首都は %s\\n", country, capital)
    }

    fmt.Println("---")

    // キーのみ
    for country := range capitals {
        fmt.Println("国:", country)
    }
}`}
          expectedOutput={`日本 の首都は 東京
フランス の首都は パリ
アメリカ の首都は ワシントンD.C.
---
国: 日本
国: フランス
国: アメリカ`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソート済みの走査</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sort"
)

func main() {
    scores := map[string]int{
        "Carol": 88,
        "Alice": 95,
        "Dave":  72,
        "Bob":   91,
    }

    // キーをスライスに取り出してソート
    keys := make([]string, 0, len(scores))
    for k := range scores {
        keys = append(keys, k)
    }
    sort.Strings(keys)

    // ソート済みの順序で走査
    fmt.Println("名前順:")
    for _, k := range keys {
        fmt.Printf("  %s: %d点\\n", k, scores[k])
    }
}`}
          expectedOutput={`名前順:
  Alice: 95点
  Bob: 91点
  Carol: 88点
  Dave: 72点`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">走査中の操作</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 走査中に要素を削除するのは安全
    m := map[string]int{
        "a": 1,
        "b": 2,
        "c": 3,
        "d": 4,
        "e": 5,
    }

    // 値が3以上の要素を削除
    for k, v := range m {
        if v >= 3 {
            delete(m, k)
        }
    }
    fmt.Println("フィルタ後:", m)

    // 全キーと全値を個別に収集
    data := map[string]int{"x": 10, "y": 20, "z": 30}
    values := make([]int, 0, len(data))
    for _, v := range data {
        values = append(values, v)
    }
    fmt.Println("全値:", values)
}`}
          expectedOutput={`フィルタ後: map[a:1 b:2]
全値: [10 20 30]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="maps" lessonId="iteration" />
      </div>
      <LessonNav lessons={lessons} currentId="iteration" basePath="/learn/maps" />
    </div>
  );
}
