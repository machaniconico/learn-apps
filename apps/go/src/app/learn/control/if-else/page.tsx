import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function IfElsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if-else文</h1>
        <p className="text-gray-400">条件分岐の基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if文の構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goの <code className="text-cyan-300">if</code> 文は括弧が不要です。
          条件式の前に短い文を書くこともできます（初期化文付きif）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>条件式に括弧 <code className="text-cyan-300">()</code> は不要</li>
          <li>波括弧 <code className="text-cyan-300">{`{}`}</code> は必須</li>
          <li>初期化文付きifが使える</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なif-else</h2>
        <p className="text-gray-400 mb-4">
          条件が <code className="text-cyan-300">true</code> ならifブロック、
          <code className="text-cyan-300">false</code> ならelseブロックが実行されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    age := 20

    if age >= 18 {
        fmt.Println("成人です")
    } else {
        fmt.Println("未成年です")
    }

    temperature := 35
    if temperature > 30 {
        fmt.Println("暑い日です")
    } else {
        fmt.Println("過ごしやすい日です")
    }
}`}
          expectedOutput={`成人です
暑い日です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">初期化文付きif</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">if</code> の条件の前にセミコロンで区切って初期化文を書けます。
          変数のスコープはifブロック内に限定されます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "math"
)

func main() {
    // 初期化文付きif
    if v := math.Abs(-7.5); v > 5 {
        fmt.Printf("絶対値 %.1f は 5 より大きい\\n", v)
    }

    // エラーチェックでよく使うパターン
    if n := 42 * 2; n > 50 {
        fmt.Printf("%d は 50 より大きい\\n", n)
    }
}`}
          expectedOutput={`絶対値 7.5 は 5 より大きい
84 は 50 より大きい`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}
