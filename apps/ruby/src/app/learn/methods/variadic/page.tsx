import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "methods")!.lessons;

export default function VariadicPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可変長引数</h1>
        <p className="text-gray-400">*argsで任意個の引数を受け取る可変長引数を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">可変長引数とは</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 px-1 rounded text-teal-300">*args</code>（スプラット演算子）を使うと、
          任意個の引数をまとめて配列として受け取れます。
          引数の個数が事前にわからない場合に便利です。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(*args)</code> — 全引数を配列で受け取る</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(first, *rest)</code> — 先頭と残りを分ける</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">def f(*args, last)</code> — 残りと末尾を分ける</li>
          <li>*argsは必ず1つだけ、任意の位置に置ける</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的な可変長引数</h2>
        <RubyEditor
          defaultCode={`# すべての引数を配列で受け取る
def sum(*numbers)
  numbers.reduce(0, :+)
end

puts sum(1, 2, 3)          # 6
puts sum(10, 20, 30, 40)   # 100
puts sum                    # 0 (引数なし)

# 先頭引数と残りを分ける
def introduce(greeting, *names)
  names.each { |name| puts "#{greeting}、#{name}！" }
end

introduce("こんにちは", "Alice", "Bob", "Carol")

# 末尾引数と残りを分ける
def log(*messages, level)
  messages.each { |msg| puts "[#{level}] #{msg}" }
end

log("起動", "DB接続", "準備完了", "INFO")`}
          expectedOutput={`6
100
0
こんにちは、Alice！
こんにちは、Bob！
こんにちは、Carol！
[INFO] 起動
[INFO] DB接続
[INFO] 準備完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: スプラット演算子の展開</h2>
        <RubyEditor
          defaultCode={`# 配列を展開して渡す
def add(a, b, c)
  a + b + c
end

args = [1, 2, 3]
puts add(*args)  # 6

# 配列の結合
def merge(*arrays)
  arrays.flatten
end

puts merge([1, 2], [3, 4], [5, 6]).inspect

# 多重代入での使用
first, *middle, last = [1, 2, 3, 4, 5]
puts "先頭: #{first}"
puts "中間: #{middle.inspect}"
puts "末尾: #{last}"`}
          expectedOutput={`6
[1, 2, 3, 4, 5, 6]
先頭: 1
中間: [2, 3, 4]
末尾: 5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 実践的な可変長引数</h2>
        <RubyEditor
          defaultCode={`# printf風のフォーマット
def format_msg(template, *values)
  result = template.dup
  values.each { |v| result.sub!("%s", v.to_s) }
  result
end

puts format_msg("こんにちは、%sさん！", "Alice")
puts format_msg("%sは%s歳です", "Bob", "25")

# 統計計算
def statistics(*numbers)
  n = numbers.length
  return "データなし" if n.zero?

  avg = numbers.sum.to_f / n
  sorted = numbers.sort
  median = n.odd? ? sorted[n / 2] : (sorted[n/2 - 1] + sorted[n/2]) / 2.0

  { count: n, sum: numbers.sum, avg: avg.round(2), median: median }
end

result = statistics(4, 7, 2, 9, 1, 5, 8)
result.each { |k, v| puts "#{k}: #{v}" }`}
          expectedOutput={`こんにちは、Aliceさん！
Bobは25歳です
count: 7
sum: 36
avg: 5.14
median: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="variadic" />
      </div>
      <LessonNav lessons={lessons} currentId="variadic" basePath="/learn/methods" />
    </div>
  );
}
