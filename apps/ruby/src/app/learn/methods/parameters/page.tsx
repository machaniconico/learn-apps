import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "methods")!.lessons;

export default function ParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">引数</h1>
        <p className="text-gray-400">メソッドに値を渡す引数の種類と使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">引数の種類</h2>
        <p className="text-gray-300 mb-4">
          Rubyのメソッドには複数種類の引数があります。これらを組み合わせることで
          柔軟なAPIを設計できます。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(a, b)</code> — 通常引数（位置引数）</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(a, b=10)</code> — デフォルト引数</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(*args)</code> — 可変長引数</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(name:)</code> — キーワード引数</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(**opts)</code> — キーワード可変長引数</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 通常引数</h2>
        <RubyEditor
          defaultCode={`# 位置引数（順序が重要）
def introduce(name, age, city)
  puts "名前: #{name}, 年齢: #{age}歳, 都市: #{city}"
end

introduce("Alice", 30, "東京")
introduce("Bob", 25, "大阪")

# 引数の順序でデータが変わる
def ratio(numerator, denominator)
  numerator.to_f / denominator
end

puts ratio(1, 4)   # 0.25
puts ratio(4, 1)   # 4.0

# 複数の戻り値（配列として返す）
def min_max(arr)
  [arr.min, arr.max]
end

min, max = min_max([3, 1, 4, 1, 5, 9])
puts "最小: #{min}, 最大: #{max}"`}
          expectedOutput={`名前: Alice, 年齢: 30歳, 都市: 東京
名前: Bob, 年齢: 25歳, 都市: 大阪
0.25
4.0
最小: 1, 最大: 9`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 引数の展開</h2>
        <RubyEditor
          defaultCode={`# スプラット演算子で配列を展開
def add(a, b, c)
  a + b + c
end

args = [1, 2, 3]
puts add(*args)  # 6

# ハッシュをキーワード引数として展開
def greet(name:, greeting: "こんにちは")
  "#{greeting}、#{name}！"
end

opts = { name: "Alice", greeting: "おはよう" }
puts greet(**opts)

# 引数の分割代入
def first_and_rest(first, *rest)
  puts "先頭: #{first}"
  puts "残り: #{rest.inspect}"
end

first_and_rest(1, 2, 3, 4, 5)`}
          expectedOutput={`6
おはよう、Alice！
先頭: 1
残り: [2, 3, 4, 5]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ブロック引数</h2>
        <RubyEditor
          defaultCode={`# &block で明示的にブロックを受け取る
def repeat(n, &block)
  n.times { block.call }
end

repeat(3) { print "Hello! " }
puts ""

# block_given? でブロックの有無を確認
def optional_block
  if block_given?
    yield
  else
    puts "ブロックなし"
  end
end

optional_block { puts "ブロックあり" }
optional_block`}
          expectedOutput={`Hello! Hello! Hello!
ブロックあり
ブロックなし`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/methods" />
    </div>
  );
}
