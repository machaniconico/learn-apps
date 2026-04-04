import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "arrays")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソート</h1>
        <p className="text-gray-400">sort と sort_by を使って配列を並び替える方法を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ソートの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          sort は宇宙船演算子 &lt;=&gt; を使って比較します。sort_by はブロックで変換した値を比較キーとして使い、複雑なソートを簡潔に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">sort</code>: デフォルト順でソート（新しい配列を返す）</li>
          <li><code className="text-green-400">sort!</code>: 元の配列を破壊的にソート</li>
          <li><code className="text-green-400">sort_by</code>: キーを指定してソート</li>
          <li><code className="text-green-400">reverse</code>: 逆順にする</li>
          <li>宇宙船演算子 <code className="text-green-400">&lt;=&gt;</code>: -1, 0, 1 を返す比較</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">sort の使い方</h2>
        <RubyEditor
          defaultCode={`numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# 昇順ソート
puts numbers.sort.inspect

# 降順ソート
puts numbers.sort.reverse.inspect

# ブロックで降順
puts numbers.sort { |a, b| b <=> a }.inspect

# 文字列のソート
words = %w[banana apple cherry date]
puts words.sort.inspect`}
          expectedOutput={`[1, 1, 2, 3, 4, 5, 6, 9]
[9, 6, 5, 4, 3, 2, 1, 1]
[9, 6, 5, 4, 3, 2, 1, 1]
["apple", "banana", "cherry", "date"]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">sort_by で複雑なソート</h2>
        <RubyEditor
          defaultCode={`people = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
]

# 年齢順にソート
by_age = people.sort_by { |p| p[:age] }
by_age.each { |p| puts "#{p[:name]}: #{p[:age]}" }

puts "---"

# 名前順にソート
by_name = people.sort_by { |p| p[:name] }
by_name.each { |p| puts p[:name] }`}
          expectedOutput={`Alice: 25
Charlie: 30
Bob: 35
---
Alice
Bob
Charlie`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/arrays" />
    </div>
  );
}
