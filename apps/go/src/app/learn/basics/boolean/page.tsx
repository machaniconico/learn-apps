import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function BooleanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">真偽値</h1>
        <p className="text-gray-400">bool型とtrue/falseを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">bool型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">bool</code> 型は <code className="text-cyan-300">true</code> か
          <code className="text-cyan-300">false</code> のいずれかの値を持ちます。
          条件分岐や論理演算で使われます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">&&</code> — AND（論理積）</li>
          <li><code className="text-cyan-300">||</code> — OR（論理和）</li>
          <li><code className="text-cyan-300">!</code> — NOT（否定）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">真偽値の基本</h2>
        <p className="text-gray-400 mb-4">
          比較演算子は <code className="text-cyan-300">bool</code> 値を返します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    isActive := true
    isAdmin := false

    fmt.Println("有効:", isActive)
    fmt.Println("管理者:", isAdmin)

    // 比較演算
    x := 10
    fmt.Println("x > 5:", x > 5)
    fmt.Println("x == 10:", x == 10)
    fmt.Println("x != 10:", x != 10)
}`}
          expectedOutput={`有効: true
管理者: false
x > 5: true
x == 10: true
x != 10: false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">論理演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">&&</code>、<code className="text-cyan-300">||</code>、
          <code className="text-cyan-300">!</code> で論理演算を行います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    a := true
    b := false

    fmt.Println("a && b:", a && b)   // AND
    fmt.Println("a || b:", a || b)   // OR
    fmt.Println("!a:", !a)           // NOT
    fmt.Println("!b:", !b)           // NOT

    // 実用例
    age := 20
    hasLicense := true
    canDrive := age >= 18 && hasLicense
    fmt.Println("運転可能:", canDrive)
}`}
          expectedOutput={`a && b: false
a || b: true
!a: false
!b: true
運転可能: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="boolean" />
      </div>
      <LessonNav lessons={lessons} currentId="boolean" basePath="/learn/basics" />
    </div>
  );
}
