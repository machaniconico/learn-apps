import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForRangePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">for range</h1>
        <p className="text-gray-400">スライス・マップの走査を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">rangeキーワード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">range</code> はスライス、マップ、文字列、チャネルなどを走査します。
          インデックスと値の両方を取得できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>スライス: <code className="text-cyan-300">for i, v := range slice</code></li>
          <li>マップ: <code className="text-cyan-300">for k, v := range m</code></li>
          <li>文字列: <code className="text-cyan-300">for i, r := range str</code>（rune単位）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スライスのrange</h2>
        <p className="text-gray-400 mb-4">
          スライスをrangeで走査すると、インデックスと値が返されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fruits := []string{"りんご", "バナナ", "みかん"}

    // インデックスと値
    for i, fruit := range fruits {
        fmt.Printf("%d: %s\\n", i, fruit)
    }

    // インデックスを無視（_）
    fmt.Println("---")
    for _, fruit := range fruits {
        fmt.Println(fruit)
    }
}`}
          expectedOutput={`0: りんご
1: バナナ
2: みかん
---
りんご
バナナ
みかん`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マップと文字列のrange</h2>
        <p className="text-gray-400 mb-4">
          マップではキーと値、文字列ではバイト位置とrune（文字）が返されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // マップのrange
    scores := map[string]int{
        "数学": 90,
        "英語": 85,
        "国語": 78,
    }
    for subject, score := range scores {
        fmt.Printf("%s: %d点\\n", subject, score)
    }

    // 文字列のrange（rune単位）
    fmt.Println("---")
    for i, r := range "Go言語" {
        fmt.Printf("位置%d: %c\\n", i, r)
    }
}`}
          expectedOutput={`数学: 90点
英語: 85点
国語: 78点
---
位置0: G
位置1: o
位置2: 言
位置5: 語`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-range" />
      </div>
      <LessonNav lessons={lessons} currentId="for-range" basePath="/learn/control" />
    </div>
  );
}
