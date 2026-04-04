import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function ZeroValuesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ゼロ値</h1>
        <p className="text-gray-400">各型のゼロ値の仕組みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ゼロ値とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goでは変数を初期化しなくても、型に応じた「ゼロ値」が自動的に設定されます。
          これにより未初期化変数の問題を防ぎます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">int</code> → <code className="text-cyan-300">0</code></li>
          <li><code className="text-cyan-300">float64</code> → <code className="text-cyan-300">0</code></li>
          <li><code className="text-cyan-300">string</code> → <code className="text-cyan-300">&quot;&quot;</code>（空文字列）</li>
          <li><code className="text-cyan-300">bool</code> → <code className="text-cyan-300">false</code></li>
          <li>ポインタ・スライス・マップ → <code className="text-cyan-300">nil</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各型のゼロ値</h2>
        <p className="text-gray-400 mb-4">
          初期化なしで宣言した変数には、自動的にゼロ値が設定されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    var i int
    var f float64
    var s string
    var b bool

    fmt.Printf("int:     %d\\n", i)
    fmt.Printf("float64: %f\\n", f)
    fmt.Printf("string:  %q\\n", s)
    fmt.Printf("bool:    %t\\n", b)
}`}
          expectedOutput={`int:     0
float64: 0.000000
string:  ""
bool:    false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照型のゼロ値</h2>
        <p className="text-gray-400 mb-4">
          ポインタ、スライス、マップのゼロ値は <code className="text-cyan-300">nil</code> です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    var p *int
    var sl []int
    var m map[string]int

    fmt.Println("ポインタ:", p)
    fmt.Println("スライス:", sl)
    fmt.Println("マップ:", m)

    fmt.Println("ポインタ == nil:", p == nil)
    fmt.Println("スライス == nil:", sl == nil)
    fmt.Println("マップ == nil:", m == nil)
}`}
          expectedOutput={`ポインタ: <nil>
スライス: []
マップ: map[]
ポインタ == nil: true
スライス == nil: true
マップ == nil: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="zero-values" />
      </div>
      <LessonNav lessons={lessons} currentId="zero-values" basePath="/learn/basics" />
    </div>
  );
}
