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
        <span className="text-green-400 text-sm font-semibold">数値と演算 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Math モジュール</h1>
        <p className="text-gray-400">数学定数・関数を提供する Math モジュールの活用を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Math モジュールとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Math モジュールは三角関数・対数・平方根など数学的な関数を提供します。全メソッドは Float を返します。include せずに <code className="text-green-400">Math.sqrt()</code> のように使います。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">Math::PI</code>: 円周率 π</li>
          <li><code className="text-green-400">Math::E</code>: 自然対数の底 e</li>
          <li><code className="text-green-400">Math.sqrt(n)</code>: 平方根</li>
          <li><code className="text-green-400">Math.log(n)</code>: 自然対数</li>
          <li><code className="text-green-400">Math.sin / cos / tan</code>: 三角関数（ラジアン）</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">定数と基本関数</h2>
        <RubyEditor
          defaultCode={`# 数学定数
puts Math::PI
puts Math::E

# 平方根・累乗根
puts Math.sqrt(144)
puts Math.cbrt(27)

# 対数
puts Math.log(Math::E)
puts Math.log10(1000)
puts Math.log2(8)

# 絶対値（Numeric）
puts -42.abs
puts (-3.14).abs`}
          expectedOutput={`3.141592653589793
2.718281828459045
12.0
3.0
1.0
3.0
3.0
42
3.14`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">三角関数と実践例</h2>
        <RubyEditor
          defaultCode={`# 三角関数（ラジアン単位）
puts Math.sin(Math::PI / 2).round(10)
puts Math.cos(0).round(10)
puts Math.tan(Math::PI / 4).round(10)

# 度からラジアンへの変換
def to_rad(deg)
  deg * Math::PI / 180
end

puts Math.sin(to_rad(30)).round(4)
puts Math.cos(to_rad(60)).round(4)

# 直角三角形の斜辺
a, b = 3, 4
hypotenuse = Math.sqrt(a**2 + b**2)
puts hypotenuse`}
          expectedOutput={`1.0
1.0
1.0
0.5
0.5
5.0`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="numbers" lessonId="math-module" />
      </div>
      <LessonNav lessons={lessons} currentId="math-module" basePath="/learn/numbers" />
    </div>
  );
}
