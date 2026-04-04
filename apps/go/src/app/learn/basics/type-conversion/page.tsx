import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function TypeConversionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型変換</h1>
        <p className="text-gray-400">明示的な型変換を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Goの型変換</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goでは暗黙的な型変換はありません。型変換は
          <code className="text-cyan-300">型名(値)</code> の形で明示的に行います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">int(x)</code> — 整数型へ変換</li>
          <li><code className="text-cyan-300">float64(x)</code> — 浮動小数点数へ変換</li>
          <li><code className="text-cyan-300">string(x)</code> — バイトから文字列へ変換</li>
          <li><code className="text-cyan-300">strconv</code> パッケージ — 文字列と数値の変換</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数値型の変換</h2>
        <p className="text-gray-400 mb-4">
          異なる数値型間の変換は、<code className="text-cyan-300">型名(値)</code> で行います。
          精度の損失に注意してください。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // int → float64
    i := 42
    f := float64(i)
    fmt.Printf("int %d → float64 %f\\n", i, f)

    // float64 → int（小数部分は切り捨て）
    pi := 3.99
    n := int(pi)
    fmt.Printf("float64 %f → int %d\\n", pi, n)

    // int → int32
    big := 1000
    small := int32(big)
    fmt.Printf("int %d → int32 %d\\n", big, small)
}`}
          expectedOutput={`int 42 → float64 42.000000
float64 3.990000 → int 3
int 1000 → int32 1000`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strconvパッケージ</h2>
        <p className="text-gray-400 mb-4">
          文字列と数値の相互変換には <code className="text-cyan-300">strconv</code> パッケージを使います。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strconv"
)

func main() {
    // 文字列 → 整数
    s := "123"
    n, _ := strconv.Atoi(s)
    fmt.Printf("文字列 %q → int %d\\n", s, n)

    // 整数 → 文字列
    num := 456
    str := strconv.Itoa(num)
    fmt.Printf("int %d → 文字列 %q\\n", num, str)

    // 文字列 → float64
    fs := "3.14"
    f, _ := strconv.ParseFloat(fs, 64)
    fmt.Printf("文字列 %q → float64 %f\\n", fs, f)
}`}
          expectedOutput={`文字列 "123" → int 123
int 456 → 文字列 "456"
文字列 "3.14" → float64 3.140000`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="type-conversion" basePath="/learn/basics" />
    </div>
  );
}
