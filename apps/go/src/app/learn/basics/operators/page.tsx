import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function OperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術・比較・論理・ビット演算子を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演算子の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goには算術、比較、論理、ビット演算子があります。
          C言語と似ていますが、<code className="text-cyan-300">++</code> と <code className="text-cyan-300">--</code> は文（式ではない）です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>算術: <code className="text-cyan-300">+ - * / %</code></li>
          <li>比較: <code className="text-cyan-300">== != &lt; &gt; &lt;= &gt;=</code></li>
          <li>論理: <code className="text-cyan-300">&& || !</code></li>
          <li>ビット: <code className="text-cyan-300">& | ^ &lt;&lt; &gt;&gt;</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子</h2>
        <p className="text-gray-400 mb-4">
          基本的な四則演算と剰余演算を行います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    a, b := 17, 5

    fmt.Println("加算:", a + b)
    fmt.Println("減算:", a - b)
    fmt.Println("乗算:", a * b)
    fmt.Println("除算:", a / b)
    fmt.Println("剰余:", a % b)

    // インクリメント・デクリメント
    c := 10
    c++
    fmt.Println("インクリメント:", c)
    c--
    fmt.Println("デクリメント:", c)
}`}
          expectedOutput={`加算: 22
減算: 12
乗算: 85
除算: 3
剰余: 2
インクリメント: 11
デクリメント: 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較・ビット演算子</h2>
        <p className="text-gray-400 mb-4">
          比較演算子は <code className="text-cyan-300">bool</code> を返します。
          ビット演算子は整数のビット単位の操作を行います。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // 比較演算子
    x, y := 10, 20
    fmt.Println("x == y:", x == y)
    fmt.Println("x < y:", x < y)
    fmt.Println("x >= 10:", x >= 10)

    // ビット演算子
    a, b := 0b1010, 0b1100
    fmt.Printf("AND:  %04b\\n", a & b)
    fmt.Printf("OR:   %04b\\n", a | b)
    fmt.Printf("XOR:  %04b\\n", a ^ b)
    fmt.Printf("左シフト: %04b\\n", a << 1)
}`}
          expectedOutput={`x == y: false
x < y: true
x >= 10: true
AND:  1000
OR:   1110
XOR:  0110
左シフト: 10100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}
