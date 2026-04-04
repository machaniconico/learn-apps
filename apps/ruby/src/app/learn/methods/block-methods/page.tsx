import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "methods")!.lessons;

export default function BlockMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ブロック付きメソッド</h1>
        <p className="text-gray-400">yieldとブロック引数を使ってブロックを受け取るメソッドを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ブロックとyield</h2>
        <p className="text-gray-300 mb-4">
          Rubyのメソッドはブロックを受け取れます。
          <code className="bg-gray-800 px-1 rounded text-teal-300">yield</code>キーワードで
          渡されたブロックを呼び出します。ブロックはメソッドの動作をカスタマイズする強力な仕組みです。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">yield</code> — ブロックを呼び出す</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">yield(value)</code> — ブロックに値を渡す</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">block_given?</code> — ブロックが渡されたか確認</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">&amp;block</code> — ブロックをProcとして受け取る</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: yieldの基本</h2>
        <RubyEditor
          defaultCode={`# 基本的なyield
def greet
  puts "前処理"
  yield  # ブロックを呼び出す
  puts "後処理"
end

greet { puts "ブロックの中身" }

puts "---"

# yieldで値を渡す
def transform(value)
  result = yield(value)
  puts "変換結果: #{result}"
end

transform(5) { |n| n * n }
transform("hello") { |s| s.upcase }

puts "---"

# block_given? でオプショナルブロック
def maybe_yield(x)
  if block_given?
    yield(x)
  else
    x
  end
end

puts maybe_yield(10)            # 10
puts maybe_yield(10) { |n| n * 3 }  # 30`}
          expectedOutput={`前処理
ブロックの中身
後処理
---
変換結果: 25
変換結果: HELLO
---
10
30`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ブロックをProcとして受け取る</h2>
        <RubyEditor
          defaultCode={`# &block でProcとして受け取る
def apply_twice(value, &block)
  block.call(block.call(value))
end

puts apply_twice(2) { |n| n * 3 }   # 18 (2*3=6, 6*3=18)
puts apply_twice("hi") { |s| s + "!" }  # "hi!!"

# ブロックを保存して後で呼び出す
def make_adder(n, &block)
  # blockをインスタンス変数に保存できる
  lambda { |x| block ? block.call(x) + n : x + n }
end

adder = make_adder(10) { |x| x * 2 }
puts adder.call(5)  # 5*2+10 = 20
puts adder.call(3)  # 3*2+10 = 16`}
          expectedOutput={`18
hi!!
20
16`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: カスタムイテレータを作る</h2>
        <RubyEditor
          defaultCode={`# カスタムイテレータ
def each_pair(arr)
  i = 0
  while i < arr.length - 1
    yield arr[i], arr[i + 1]
    i += 2
  end
end

each_pair([1, 2, 3, 4, 5, 6]) do |a, b|
  puts "#{a} + #{b} = #{a + b}"
end

puts "---"

# テンプレートメソッドパターン
def measure
  start = Time.now
  result = yield
  elapsed = Time.now - start
  puts "実行時間: #{elapsed.round(6)}秒"
  result
end

total = measure do
  (1..1000).reduce(:+)
end
puts "合計: #{total}"`}
          expectedOutput={`1 + 2 = 3
3 + 4 = 7
5 + 6 = 11
---
実行時間: 0.000xxx秒
合計: 500500`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="block-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="block-methods" basePath="/learn/methods" />
    </div>
  );
}
