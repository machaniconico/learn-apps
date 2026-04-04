import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "basics")!.lessons;

export default function NumericTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">Ruby基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値型</h1>
        <p className="text-gray-400">Integer・Float・Rational・Complexなど、Rubyの数値型を詳しく学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Rubyの数値型</h2>
        <p className="text-gray-300 mb-4">
          RubyのIntegerは任意精度整数です。桁数の制限がなく、どんなに大きな数でも扱えます。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Integer</code> — 整数。桁数制限なし。</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Float</code> — IEEE 754倍精度浮動小数点数。</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Rational</code> — 有理数。1/3などを正確に表現。</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">Complex</code> — 複素数。1+2iなど。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 整数の演算</h2>
        <RubyEditor
          defaultCode={`# 基本演算
puts 10 + 3   # 13
puts 10 - 3   # 7
puts 10 * 3   # 30
puts 10 / 3   # 3 (整数除算)
puts 10 % 3   # 1 (剰余)
puts 10 ** 3  # 1000 (べき乗)

# 整数の便利なメソッド
puts 42.even?   # true
puts 43.odd?    # true
puts -5.abs     # 5
puts 255.to_s(16)  # ff (16進数文字列)

# アンダースコアで数値を読みやすく
big_num = 1_000_000
puts big_num  # 1000000`}
          expectedOutput={`13
7
30
3
1
1000
true
true
5
ff
1000000`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 浮動小数点数</h2>
        <RubyEditor
          defaultCode={`# Float演算
puts 10.0 / 3   # 3.3333333333333335
puts 3.14.round(1)  # 3.1
puts 3.14.ceil      # 4
puts 3.14.floor     # 3

# 浮動小数点の精度問題
puts 0.1 + 0.2           # 0.30000000000000004
puts (0.1 + 0.2).round(1) # 0.3

# 無限大とNaN
puts 1.0 / 0    # Infinity
puts -1.0 / 0   # -Infinity
puts 0.0 / 0    # NaN`}
          expectedOutput={`3.3333333333333335
3.1
4
3
0.30000000000000004
0.3
Infinity
-Infinity
NaN`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Rational（有理数）</h2>
        <RubyEditor
          defaultCode={`# 有理数で正確な計算
r1 = Rational(1, 3)  # 1/3
r2 = Rational(1, 6)  # 1/6

puts r1        # 1/3
puts r1 + r2   # 1/2
puts r1 * 3    # 1/1

# rサフィックスで有理数リテラル
puts (1/3r)    # 1/3
puts (0.1r + 0.2r)  # 3/10 (正確!)`}
          expectedOutput={`1/3
1/2
1/1
1/3
3/10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="numeric-types" />
      </div>
      <LessonNav lessons={lessons} currentId="numeric-types" basePath="/learn/basics" />
    </div>
  );
}
