import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "enumerable")!;

export default function LazyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-teal-400">Enumerable</p>
        <h1 className="text-3xl font-bold text-gray-100">Lazy Enumerator</h1>
        <p className="text-gray-400">
          Rubyの遅延評価（Lazy Enumerator）を学びます。無限シーケンスや大規模データセットを効率的に処理する手法を習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">lazy の基本</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">Enumerable#lazy</code> は遅延評価のEnumeratorを返します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">first(n)</code> や <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">take(n).to_a</code> で評価を確定させます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# 通常のmapは全要素を処理する（大きな配列では非効率）
# lazy を使うと必要な分だけ処理する

# 自然数の無限シーケンス
natural = (1..Float::INFINITY)

# 最初の5つの偶数の2乗
result = natural
  .lazy
  .select { |n| n.even? }
  .map { |n| n ** 2 }
  .first(5)

puts result.inspect

# 最初の3つの、3の倍数で100未満の数
multiples_of_3 = natural
  .lazy
  .select { |n| n % 3 == 0 }
  .reject { |n| n >= 100 }
  .first(5)

puts multiples_of_3.inspect`}
        expectedOutput={`[4, 16, 36, 64, 100]
[3, 6, 9, 12, 15]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">lazy と無限シーケンス</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">Enumerator::Lazy</code> を使うと無限シーケンスを定義できます。
          フィボナッチ数列など数学的シーケンスの表現に適しています。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# フィボナッチ数列（遅延評価）
fib = Enumerator.new do |y|
  a, b = 0, 1
  loop do
    y << a
    a, b = b, a + b
  end
end

# 最初の10個
puts fib.first(10).inspect

# 100以下のフィボナッチ数
under_100 = fib.lazy.select { |n| n <= 100 }.first(20)
puts under_100.inspect

# 偶数のフィボナッチ数（最初の5個）
even_fibs = fib.lazy.select(&:even?).first(5)
puts even_fibs.inspect`}
        expectedOutput={`[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
[0, 2, 8, 34, 144]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">lazy の実用例</h2>
        <p className="text-gray-400 text-sm">
          大きなデータセットを処理する際にlazyを使うと中間配列を生成せずメモリを節約できます。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">take_while</code> で条件が偽になるまで取得できます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`# take_while: 条件が真の間だけ取得
numbers = (1..Float::INFINITY).lazy

# 2乗が1000未満の数
small_squares = numbers
  .map { |n| n ** 2 }
  .take_while { |n| n < 1000 }
  .to_a

puts small_squares.inspect
puts "個数: #{small_squares.length}"

# drop_while: 条件が真の間スキップ
data = [2, 4, 6, 1, 3, 8, 10]
after_odd = data.lazy.drop_while(&:even?).to_a
puts after_odd.inspect

# zip と lazy の組み合わせ
letters = ("a".."z").lazy
numbers2 = (1..Float::INFINITY).lazy
pairs = letters.zip(numbers2).first(5)
puts pairs.inspect`}
        expectedOutput={`[1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961]
個数: 31
[1, 3, 8, 10]
[["a", 1], ["b", 2], ["c", 3], ["d", 4], ["e", 5]]`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="enumerable" lessonId="lazy" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="lazy"
        basePath="/learn/enumerable"
      />
    </div>
  );
}
