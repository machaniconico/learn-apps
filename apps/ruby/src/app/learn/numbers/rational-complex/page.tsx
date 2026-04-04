import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "numbers")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">数値と演算 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Rational・Complex</h1>
        <p className="text-gray-400">有理数と複素数を正確に扱う Rational・Complex クラスを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Rational（有理数）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Rational は分数を正確に表現するクラスです。Float の精度問題を避けられます。<code className="text-green-400">Rational(1, 3)</code> で 1/3 を完全に表現でき、演算結果も分数のまま保持されます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>作成: <code className="text-green-400">Rational(1, 3)</code> または <code className="text-green-400">1/3r</code></li>
          <li><code className="text-green-400">numerator</code>: 分子</li>
          <li><code className="text-green-400">denominator</code>: 分母</li>
          <li>自動的に約分される</li>
          <li><code className="text-green-400">to_f</code>: Float に変換</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Rational の演算</h2>
        <RubyEditor
          defaultCode={`# Rational の作成
r1 = Rational(1, 3)
r2 = Rational(1, 6)

puts r1
puts r1.numerator
puts r1.denominator

# 演算（正確な結果）
puts r1 + r2
puts r1 * 3
puts r1 - r2

# Float との比較
puts (1.0 / 3) + (1.0 / 6)
puts Rational(1, 3) + Rational(1, 6)`}
          expectedOutput={`1/3
1
3
1/2
1/1
1/6
0.5
1/2`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Complex（複素数）</h2>
        <RubyEditor
          defaultCode={`# Complex の作成
c1 = Complex(3, 4)
c2 = Complex(1, -2)

puts c1
puts c1.real
puts c1.imaginary

# 演算
puts c1 + c2
puts c1 * c2

# 絶対値（モジュラス）
puts c1.abs
puts c1.abs2

# 極座標表示
puts c1.rectangular.inspect`}
          expectedOutput={`3+4i
3
4
4+2i
11-2i
5.0
25
[3, 4]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="numbers" lessonId="rational-complex" />
      </div>
      <LessonNav lessons={lessons} currentId="rational-complex" basePath="/learn/numbers" />
    </div>
  );
}
