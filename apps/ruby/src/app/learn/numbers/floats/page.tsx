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
        <span className="text-green-400 text-sm font-semibold">数値と演算 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">浮動小数点数</h1>
        <p className="text-gray-400">Float の精度・注意点・よく使うメソッドを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Float の特徴と注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Ruby の Float は IEEE 754 倍精度浮動小数点数です。精度の限界があるため、金融計算には Rational や BigDecimal を使うべきです。特殊値として Infinity と NaN があります。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>精度: 約15〜17桁の有効数字</li>
          <li><code className="text-green-400">Float::INFINITY</code>: 無限大</li>
          <li><code className="text-green-400">Float::NAN</code>: Not a Number</li>
          <li><code className="text-green-400">round(n)</code>: 小数点以下 n 桁に丸める</li>
          <li><code className="text-green-400">ceil</code> / <code className="text-green-400">floor</code>: 切り上げ・切り捨て</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">精度の問題と丸め</h2>
        <RubyEditor
          defaultCode={`# 浮動小数点の精度の問題
puts 0.1 + 0.2
puts 0.1 + 0.2 == 0.3

# round で丸める
puts (0.1 + 0.2).round(1)
puts (0.1 + 0.2).round(1) == 0.3

# ceil, floor, truncate
puts 3.7.ceil
puts 3.7.floor
puts 3.7.truncate
puts (-3.7).ceil`}
          expectedOutput={`0.30000000000000004
false
0.3
true
4
3
3
-3`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">特殊値と変換</h2>
        <RubyEditor
          defaultCode={`# 特殊値
puts Float::INFINITY
puts -Float::INFINITY
puts Float::NAN

# 特殊値の判定
puts Float::INFINITY.infinite?
puts Float::NAN.nan?
puts 3.14.finite?

# 型変換
puts 42.to_f
puts 3.99.to_i
puts "3.14".to_f`}
          expectedOutput={`Infinity
-Infinity
NaN
1
true
true
42.0
3
3.14`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="numbers" lessonId="floats" />
      </div>
      <LessonNav lessons={lessons} currentId="floats" basePath="/learn/numbers" />
    </div>
  );
}
