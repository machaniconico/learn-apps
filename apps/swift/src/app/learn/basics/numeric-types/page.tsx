import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function NumericTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Swift基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値型</h1>
        <p className="text-gray-400">Int・Double・Floatの違いと特徴、数値リテラルの書き方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">整数型と浮動小数点型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftには複数の数値型があります。一般的には <code className="text-blue-300">Int</code>（整数）と <code className="text-blue-300">Double</code>（浮動小数点数）を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">Int</code> — プラットフォームのネイティブサイズの整数（64bit環境では64bit）</li>
          <li><code className="text-blue-300">Int8/16/32/64</code> — サイズを指定した整数型</li>
          <li><code className="text-blue-300">Double</code> — 64bit浮動小数点数（精度: 小数点以下15桁）</li>
          <li><code className="text-blue-300">Float</code> — 32bit浮動小数点数（精度: 小数点以下6桁）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 数値型の宣言と範囲</h2>
        <SwiftEditor
          defaultCode={`// 整数型
let maxInt = Int.max
let minInt = Int.min
print("Int最大値: \\(maxInt)")
print("Int最小値: \\(minInt)")

// 浮動小数点型
let pi: Double = 3.14159265358979
let piFloat: Float = 3.14159265358979

print("Double: \\(pi)")
print("Float: \\(piFloat)")

// 数値リテラル（アンダースコアで読みやすく）
let million = 1_000_000
let hex = 0xFF
let binary = 0b1010
print("百万: \\(million), 16進数: \\(hex), 2進数: \\(binary)")`}
          expectedOutput={`Int最大値: 9223372036854775807
Int最小値: -9223372036854775808
Double: 3.14159265358979
Float: 3.1415927
百万: 1000000, 16進数: 255, 2進数: 10`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">数値の演算</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの数値演算は型安全です。異なる型同士を演算するには明示的な型変換が必要です。
          オーバーフロー演算子（<code className="text-blue-300">&amp;+</code>、<code className="text-blue-300">&amp;-</code>）を使うとオーバーフローを許可できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 数値演算と数学関数</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// 基本演算
let x: Double = 16.0
print(sqrt(x))        // 平方根
print(pow(2.0, 10.0)) // べき乗
print(abs(-42))       // 絶対値

// 四捨五入・切り捨て・切り上げ
let value = 3.7
print(value.rounded())       // 4.0
print(value.rounded(.down))  // 3.0
print(value.rounded(.up))    // 4.0

// 最大・最小
print(max(10, 20, 5))
print(min(10, 20, 5))`}
          expectedOutput={`4.0
1024.0
42
4.0
3.0
4.0
20
5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="numeric-types" />
      </div>
      <LessonNav lessons={lessons} currentId="numeric-types" basePath="/learn/basics" />
    </div>
  );
}
