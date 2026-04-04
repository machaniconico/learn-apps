import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "enumerable")!;

export default function EachWithPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-teal-400">Enumerable</p>
        <h1 className="text-3xl font-bold text-gray-100">each_with_object・index</h1>
        <p className="text-gray-400">
          each_with_object、each_with_index、each_sliceなど「eachの拡張版」メソッドを学びます。インデックスや蓄積オブジェクトを伴う走査パターンを習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">each_with_index</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">each_with_index</code> は要素とそのインデックスをブロックに渡します。
          map.with_indexと組み合わせると変換時にインデックスも使えます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`fruits = ["apple", "banana", "cherry", "date"]

# 基本的なeach_with_index
fruits.each_with_index do |fruit, i|
  puts "#{i + 1}. #{fruit}"
end

puts "---"

# map.with_index でインデックス付き変換
numbered = fruits.map.with_index(1) { |f, i| "#{i}. #{f.capitalize}" }
puts numbered.inspect

# 奇数インデックスのみ選択
odd_indexed = fruits.each_with_index.select { |_, i| i.odd? }.map(&:first)
puts odd_indexed.inspect`}
        expectedOutput={`1. apple
2. banana
3. cherry
4. date
---
["1. Apple", "2. Banana", "3. Cherry", "4. Date"]
["banana", "date"]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">each_with_object</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">each_with_object(obj)</code> は要素と蓄積オブジェクトをブロックに渡し、
          最終的にそのオブジェクトを返します。reduceと違いブロックの最後でobjを返す必要がありません。
        </p>
      </div>

      <RubyEditor
        defaultCode={`words = ["apple", "banana", "cherry", "avocado", "blueberry"]

# ハッシュを構築
length_map = words.each_with_object({}) do |word, hash|
  hash[word] = word.length
end
puts length_map.inspect

# 配列を構築
long_upcase = words.each_with_object([]) do |word, arr|
  arr << word.upcase if word.length > 6
end
puts long_upcase.inspect

# カウンター
char_count = "hello world".chars.each_with_object(Hash.new(0)) do |c, h|
  h[c] += 1
end
puts char_count.sort.inspect`}
        expectedOutput={`{"apple"=>5, "banana"=>6, "cherry"=>6, "avocado"=>7, "blueberry"=>9}
["AVOCADO", "BLUEBERRY"]
[[" ", 1], ["d", 1], ["e", 1], ["h", 1], ["l", 3], ["o", 2], ["r", 1], ["w", 1]]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">each_slice と each_cons</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">each_slice(n)</code> はn個ずつのグループに分けます。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">each_cons(n)</code> はn個の連続する要素を順にスライドします。
        </p>
      </div>

      <RubyEditor
        defaultCode={`numbers = (1..10).to_a

# each_slice: 3個ずつのグループ
puts "=== each_slice(3) ==="
numbers.each_slice(3) { |slice| puts slice.inspect }

# each_cons: 3個の連続する窓
puts "=== each_cons(3) ==="
numbers.each_cons(3) { |cons| puts cons.inspect }

# 移動平均の計算
puts "=== 移動平均 ==="
averages = numbers.each_cons(3).map { |a, b, c| ((a + b + c) / 3.0).round(2) }
puts averages.inspect`}
        expectedOutput={`=== each_slice(3) ===
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]
[10]
=== each_cons(3) ===
[1, 2, 3]
[2, 3, 4]
[3, 4, 5]
[4, 5, 6]
[5, 6, 7]
[6, 7, 8]
[7, 8, 9]
[8, 9, 10]
=== 移動平均 ===
[2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="enumerable" lessonId="each-with" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="each-with"
        basePath="/learn/enumerable"
      />
    </div>
  );
}
