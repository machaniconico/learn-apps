import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "enumerable")!;

export default function MapSelectPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-teal-400">Enumerable</p>
        <h1 className="text-3xl font-bold text-gray-100">map・select・reject</h1>
        <p className="text-gray-400">
          Enumerableの核となる変換・フィルタリングメソッドを学びます。map（collect）で変換し、select（filter）で絞り込み、rejectで除外する基本パターンを習得しましょう。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">map / collect</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">map</code> は各要素にブロックを適用した新しい配列を返します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">collect</code> はmapの別名です。
        </p>
      </div>

      <RubyEditor
        defaultCode={`numbers = [1, 2, 3, 4, 5]

# 基本的なmap
doubled = numbers.map { |n| n * 2 }
puts doubled.inspect

# メソッド参照
words = ["hello", "world", "ruby"]
upcase_words = words.map(&:upcase)
puts upcase_words.inspect

# 複合変換
users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Carol", age: 35 },
]

names = users.map { |u| u[:name] }
puts names.inspect

# map! で元の配列を変更
nums = [1, 2, 3]
nums.map! { |n| n ** 2 }
puts nums.inspect`}
        expectedOutput={`[2, 4, 6, 8, 10]
["HELLO", "WORLD", "RUBY"]
["Alice", "Bob", "Carol"]
[1, 4, 9]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">select / filter</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">select</code> はブロックがtrueを返す要素だけを集めた新しい配列を返します。
          Ruby 2.6から <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">filter</code> という別名も使えます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`numbers = (1..10).to_a

# 偶数のみ選択
evens = numbers.select(&:even?)
puts evens.inspect

# 条件付き選択
big_nums = numbers.select { |n| n > 6 }
puts big_nums.inspect

# 文字列のフィルタリング
words = ["apple", "ant", "banana", "avocado", "blueberry", "cherry"]
a_words = words.select { |w| w.start_with?("a") }
puts a_words.inspect

# 長い単語のみ
long_words = words.select { |w| w.length > 6 }
puts long_words.inspect`}
        expectedOutput={`[2, 4, 6, 8, 10]
[7, 8, 9, 10]
["apple", "ant", "avocado"]
["avocado", "blueberry", "cherry"]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">reject とチェーン</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">reject</code> はselectの逆で、ブロックがtrueを返す要素を除外します。
          これらのメソッドはチェーンして組み合わせられます。
        </p>
      </div>

      <RubyEditor
        defaultCode={`products = [
  { name: "Ruby Book", price: 3500, in_stock: true },
  { name: "Rails Guide", price: 4200, in_stock: false },
  { name: "Gem Tutorial", price: 2800, in_stock: true },
  { name: "Metaprogramming", price: 5000, in_stock: true },
  { name: "TDD with Ruby", price: 3800, in_stock: false },
]

# 在庫ありの商品のみ
in_stock = products.reject { |p| !p[:in_stock] }
puts "在庫あり: #{in_stock.map { |p| p[:name] }.inspect}"

# チェーン: 在庫あり かつ 4000円以下の商品名
affordable = products
  .select { |p| p[:in_stock] }
  .reject { |p| p[:price] > 4000 }
  .map { |p| "#{p[:name]} (¥#{p[:price]})" }

puts "おすすめ: #{affordable.inspect}"`}
        expectedOutput={`在庫あり: ["Ruby Book", "Gem Tutorial", "Metaprogramming"]
おすすめ: ["Ruby Book (¥3500)", "Gem Tutorial (¥2800)"]`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="enumerable" lessonId="map-select" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="map-select"
        basePath="/learn/enumerable"
      />
    </div>
  );
}
