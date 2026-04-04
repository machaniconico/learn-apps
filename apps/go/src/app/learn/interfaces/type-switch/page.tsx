import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("interfaces");

export default function TypeSwitchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">インターフェース レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型switch</h1>
        <p className="text-gray-400">複数の型をチェックする方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型switch</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">switch v := i.(type)</code> で型による分岐ができます。
          各caseで型に応じた処理を書けます。変数 <code className="text-cyan-300">v</code> はその型の値として使えます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な型switch</h2>
        <p className="text-gray-400 mb-4">
          型に応じて異なる処理を行います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func classify(i any) {
    switch v := i.(type) {
    case int:
        fmt.Printf("整数: %d (2乗: %d)\\n", v, v*v)
    case string:
        fmt.Printf("文字列: %q (長さ: %d)\\n", v, len(v))
    case bool:
        fmt.Printf("真偽値: %t\\n", v)
    case float64:
        fmt.Printf("小数: %.2f\\n", v)
    default:
        fmt.Printf("不明な型: %T\\n", v)
    }
}

func main() {
    classify(42)
    classify("Go言語")
    classify(true)
    classify(3.14)
    classify([]int{1, 2})
}`}
          expectedOutput={`整数: 42 (2乗: 1764)
文字列: "Go言語" (長さ: 8)
真偽値: true
小数: 3.14
不明な型: []int`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の型をまとめるcase</h2>
        <p className="text-gray-400 mb-4">
          カンマ区切りで複数の型を1つのcaseにまとめられます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func isNumeric(i any) {
    switch i.(type) {
    case int, int8, int16, int32, int64:
        fmt.Printf("%v は整数型です\\n", i)
    case float32, float64:
        fmt.Printf("%v は浮動小数点型です\\n", i)
    case string:
        fmt.Printf("%v は文字列です\\n", i)
    default:
        fmt.Printf("%v はその他の型です\\n", i)
    }
}

func main() {
    isNumeric(42)
    isNumeric(3.14)
    isNumeric("hello")
    isNumeric(true)
}`}
          expectedOutput={`42 は整数型です
3.14 は浮動小数点型です
hello は文字列です
true はその他の型です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="interfaces" lessonId="type-switch" />
      </div>
      <LessonNav lessons={lessons} currentId="type-switch" basePath="/learn/interfaces" />
    </div>
  );
}
