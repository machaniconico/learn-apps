import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰</h1>
        <p className="text-gray-400">階乗・フィボナッチ・ツリー走査など再帰関数の設計パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰の基本</h2>
        <p className="text-gray-300 mb-3">
          再帰は関数が自分自身を呼び出す手法です。ベースケースと再帰ケースが必要です。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>ベースケース — 再帰を終了する条件</li>
          <li>再帰ケース — 問題を小さくして自分を呼ぶ</li>
          <li>メモ化 — 計算済み結果をキャッシュして高速化</li>
          <li>末尾再帰 — スタックオーバーフローを防ぐ最適化</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 階乗とフィボナッチ</h2>
        <RubyEditor
          defaultCode={`# 階乗（再帰）
def factorial(n)
  return 1 if n <= 1
  n * factorial(n - 1)
end

# フィボナッチ（メモ化あり）
def fib(n, memo = {})
  return n if n <= 1
  memo[n] ||= fib(n - 1, memo) + fib(n - 2, memo)
end

puts "階乗:"
[0, 1, 5, 10, 12].each do |n|
  puts "  #{n}! = #{factorial(n)}"
end

puts "\nフィボナッチ数列:"
puts (0..10).map { |n| fib(n) }.inspect

puts "\nメモ化の効果:"
require 'benchmark'
t1 = Benchmark.measure { fib(35) }.real
puts "  fib(35) = #{fib(35)} (#{t1.round(6)}秒)"`}
          expectedOutput={`階乗:
  0! = 1
  1! = 1
  5! = 120
  10! = 3628800
  12! = 479001600

フィボナッチ数列:
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

メモ化の効果:
  fib(35) = 9227465 (0.000023秒)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ツリー走査と再帰的データ処理</h2>
        <RubyEditor
          defaultCode={`# 二分木の再帰的走査
Node = Struct.new(:value, :left, :right)

def insert(node, value)
  return Node.new(value) if node.nil?
  if value < node.value
    Node.new(node.value, insert(node.left, value), node.right)
  else
    Node.new(node.value, node.left, insert(node.right, value))
  end
end

# 中順走査（左→根→右）
def inorder(node, result = [])
  return result if node.nil?
  inorder(node.left, result)
  result << node.value
  inorder(node.right, result)
  result
end

# 木の深さ
def depth(node)
  return 0 if node.nil?
  1 + [depth(node.left), depth(node.right)].max
end

# 木を構築
root = nil
[5, 3, 7, 1, 4, 6, 8].each { |v| root = insert(root, v) }

puts "中順走査（ソート済み）: #{inorder(root).inspect}"
puts "木の深さ: #{depth(root)}"

# 再帰的なフラット化
nested = [1, [2, [3, 4], 5], [6, 7]]
def flatten_r(arr)
  arr.each_with_object([]) do |el, result|
    el.is_a?(Array) ? result.concat(flatten_r(el)) : result << el
  end
end
puts "\nネスト配列: #{nested.inspect}"
puts "フラット化: #{flatten_r(nested).inspect}"`}
          expectedOutput={`中順走査（ソート済み）: [1, 3, 4, 5, 6, 7, 8]
木の深さ: 3

ネスト配列: [1, [2, [3, 4], 5], [6, 7]]
フラット化: [1, 2, 3, 4, 5, 6, 7]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="recursion" />
      </div>
      <LessonNav lessons={lessons} currentId="recursion" basePath="/learn/algorithms" />
    </div>
  );
}
