import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "enumerable")!;

export default function ReducePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-teal-400">Enumerable</p>
        <h1 className="text-3xl font-bold text-gray-100">reduce・inject</h1>
        <p className="text-gray-400">
          reduce（inject）を使ったコレクションの集約処理を学びます。合計・積・最大値など、要素を一つの値にまとめる強力なメソッドです。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">reduce の基本</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">reduce</code> はアキュムレータ（蓄積値）と現在の要素を受け取るブロックで集約します。
          最初の引数が初期値です。省略すると最初の要素が初期値になります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`numbers = [1, 2, 3, 4, 5]

# 合計（初期値なし）
sum = numbers.reduce { |acc, n| acc + n }
puts "合計: #{sum}"

# 合計（初期値あり）
sum_with_init = numbers.reduce(0) { |acc, n| acc + n }
puts "合計(初期値0): #{sum_with_init}"

# シンボルを使ったショートカット
puts numbers.reduce(:+)
puts numbers.reduce(:*)

# 最大値を求める（max を使わずに）
max = numbers.reduce { |a, b| a > b ? a : b }
puts "最大値: #{max}"`}
        expectedOutput={`合計: 15
合計(初期値0): 15
15
120
最大値: 5`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">複雑な集約処理</h2>
        <p className="text-gray-400 text-sm">
          初期値にハッシュや配列を使うことで、複雑な集約も表現できます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`words = ["apple", "banana", "cherry", "apricot", "blueberry", "avocado"]

# 文字ごとに単語をグループ化（group_by を使わずに）
grouped = words.reduce({}) do |acc, word|
  key = word[0]
  acc[key] ||= []
  acc[key] << word
  acc
end

grouped.sort.each do |letter, ws|
  puts "#{letter}: #{ws.inspect}"
end

puts "---"

# 単語の統計情報を集約
stats = words.reduce({ count: 0, total_length: 0, longest: "" }) do |acc, w|
  acc[:count] += 1
  acc[:total_length] += w.length
  acc[:longest] = w if w.length > acc[:longest].length
  acc
end

puts "単語数: #{stats[:count]}"
puts "平均文字数: #{(stats[:total_length].to_f / stats[:count]).round(1)}"
puts "最長: #{stats[:longest]}"`}
        expectedOutput={`a: ["apple", "apricot", "avocado"]
b: ["banana", "blueberry"]
c: ["cherry"]
---
単語数: 6
平均文字数: 7.0
最長: blueberry`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">inject と sum</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">inject</code> はreduceの別名です。
          Ruby 2.4以降は <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">sum</code> メソッドも使えます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`items = [
  { name: "Apple", qty: 3, price: 150 },
  { name: "Banana", qty: 5, price: 80 },
  { name: "Cherry", qty: 2, price: 300 },
]

# inject でも同じ結果
total = items.inject(0) { |sum, item| sum + item[:qty] * item[:price] }
puts "合計金額: #{total}円"

# sum メソッド（Ruby 2.4+）
total2 = items.sum { |item| item[:qty] * item[:price] }
puts "合計金額(sum): #{total2}円"

# 文字列の連結
parts = ["Hello", ", ", "World", "!"]
sentence = parts.inject(:+)
puts sentence

# 配列の配列をフラット化
nested = [[1, 2], [3, 4], [5, 6]]
flat = nested.inject(:+)
puts flat.inspect`}
        expectedOutput={`合計金額: 1650円
合計金額(sum): 1650円
Hello, World!
[1, 2, 3, 4, 5, 6]`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="enumerable" lessonId="reduce" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="reduce"
        basePath="/learn/enumerable"
      />
    </div>
  );
}
