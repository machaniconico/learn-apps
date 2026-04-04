import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "control")!.lessons;

export default function ForEachPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">for・eachループ</h1>
        <p className="text-gray-400">コレクションを走査するfor文とeachメソッドを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">for vs each</h2>
        <p className="text-gray-300 mb-4">
          Rubyには<code className="bg-gray-800 px-1 rounded text-cyan-300">for</code>文もありますが、
          実際のRubyコードでは<code className="bg-gray-800 px-1 rounded text-cyan-300">each</code>メソッドが
          圧倒的に好まれます。forはeachを使って実装されており、スコープの扱いが異なります。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">for x in collection</code> — for文（変数がスコープ外に漏れる）</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">collection.each {"{ |x| ... }"}</code> — eachメソッド（Rubyらしい）</li>
          <li>eachのブロック変数はブロックスコープに閉じる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: for文とeachの比較</h2>
        <RubyEditor
          defaultCode={`# for文
for fruit in ["apple", "banana", "cherry"]
  puts fruit
end

puts "---"

# eachメソッド（推奨）
["apple", "banana", "cherry"].each do |fruit|
  puts fruit
end

puts "---"

# 範囲でのfor
for i in 1..5
  print "#{i} "
end
puts ""

# 範囲でのeach（推奨）
(1..5).each do |i|
  print "#{i} "
end
puts ""`}
          expectedOutput={`apple
banana
cherry
---
apple
banana
cherry
---
1 2 3 4 5
1 2 3 4 5 `}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: each_with_index・each_with_object</h2>
        <RubyEditor
          defaultCode={`# each_with_index: インデックス付き
fruits = ["apple", "banana", "cherry"]
fruits.each_with_index do |fruit, i|
  puts "#{i + 1}. #{fruit}"
end

puts "---"

# each_with_object: 結果オブジェクトを引き回す
result = (1..5).each_with_object([]) do |n, arr|
  arr << n ** 2
end
puts result.inspect

# ハッシュのeach
scores = { Alice: 95, Bob: 82, Carol: 78 }
scores.each do |name, score|
  puts "#{name}: #{score}点"
end`}
          expectedOutput={`1. apple
2. banana
3. cherry
---
[1, 4, 9, 16, 25]
Alice: 95点
Bob: 82点
Carol: 78点`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: map・select・reject</h2>
        <RubyEditor
          defaultCode={`numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map: 各要素を変換
squares = numbers.map { |n| n ** 2 }
puts squares.inspect

# select: 条件を満たすものを選択
evens = numbers.select { |n| n.even? }
puts evens.inspect

# reject: 条件を満たすものを除外
odds = numbers.reject { |n| n.even? }
puts odds.inspect

# チェーン
result = numbers
  .select { |n| n > 3 }
  .map { |n| n * 10 }
  .reject { |n| n > 70 }
puts result.inspect`}
          expectedOutput={`[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
[2, 4, 6, 8, 10]
[1, 3, 5, 7, 9]
[40, 50, 60, 70]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-each" />
      </div>
      <LessonNav lessons={lessons} currentId="for-each" basePath="/learn/control" />
    </div>
  );
}
