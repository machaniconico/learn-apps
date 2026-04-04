import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NumericTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値型</h1>
        <p className="text-gray-400">int・float64・complexなどの数値型を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">数値型の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goには多くの数値型があります。<code className="text-cyan-300">int</code> はプラットフォーム依存（32bitまたは64bit）で、
          固定サイズの <code className="text-cyan-300">int8</code>〜<code className="text-cyan-300">int64</code> も使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">int8, int16, int32, int64</code> — 符号付き整数</li>
          <li><code className="text-cyan-300">uint8, uint16, uint32, uint64</code> — 符号なし整数</li>
          <li><code className="text-cyan-300">float32, float64</code> — 浮動小数点数</li>
          <li><code className="text-cyan-300">complex64, complex128</code> — 複素数</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数型</h2>
        <p className="text-gray-400 mb-4">
          通常は <code className="text-cyan-300">int</code> を使いますが、メモリやサイズを意識する場面では固定サイズ型を選びます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "math"
)

func main() {
    var a int8 = 127          // -128 ~ 127
    var b int16 = 32767       // -32768 ~ 32767
    var c int32 = 2147483647
    var d int64 = math.MaxInt64

    fmt.Printf("int8:  %d\\n", a)
    fmt.Printf("int16: %d\\n", b)
    fmt.Printf("int32: %d\\n", c)
    fmt.Printf("int64: %d\\n", d)
}`}
          expectedOutput={`int8:  127
int16: 32767
int32: 2147483647
int64: 9223372036854775807`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">浮動小数点数と複素数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">float64</code> が標準的な浮動小数点数型です。
          <code className="text-cyan-300">complex128</code> で複素数も扱えます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "math"
)

func main() {
    var f32 float32 = 3.14
    var f64 float64 = math.Pi

    fmt.Printf("float32: %f\\n", f32)
    fmt.Printf("float64: %.15f\\n", f64)

    // 複素数
    c := complex(3, 4)
    fmt.Printf("複素数: %v\\n", c)
    fmt.Printf("実部: %f, 虚部: %f\\n", real(c), imag(c))
}`}
          expectedOutput={`float32: 3.140000
float64: 3.141592653589793
複素数: (3+4i)
実部: 3.000000, 虚部: 4.000000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="numeric-types" />
      </div>
      <LessonNav lessons={lessons} currentId="numeric-types" basePath="/learn/basics" />
    </div>
  );
}
