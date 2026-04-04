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
        <span className="text-green-400 text-sm font-semibold">配列 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">多次元配列</h1>
        <p className="text-gray-400">配列の中に配列を持つ多次元構造の扱いを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">多次元配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Rubyでは配列の要素として配列を持つことができ、行列や表形式のデータを表現できます。2次元配列へのアクセスは arr[row][col] の形式を使います。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>アクセス: <code className="text-green-400">matrix[0][1]</code></li>
          <li>行の走査: <code className="text-green-400">matrix.each</code></li>
          <li>要素の走査: <code className="text-green-400">{"matrix.each { |row| row.each }"}</code></li>
          <li>平坦化: <code className="text-green-400">matrix.flatten</code></li>
          <li>転置: <code className="text-green-400">matrix.transpose</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">行列の操作</h2>
        <RubyEditor
          defaultCode={`# 3x3 行列
matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

puts matrix[1][2]
puts matrix[0].inspect

# 全要素の走査
matrix.each_with_index do |row, i|
  puts "Row #{i}: #{row.inspect}"
end`}
          expectedOutput={`6
[1, 2, 3]
Row 0: [1, 2, 3]
Row 1: [4, 5, 6]
Row 2: [7, 8, 9]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">transpose と flatten</h2>
        <RubyEditor
          defaultCode={`matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# 転置（行と列を入れ替え）
transposed = matrix.transpose
transposed.each { |row| puts row.inspect }

puts "---"

# 全要素の合計
total = matrix.flatten.sum
puts "Sum: #{total}"

# 各行の合計
row_sums = matrix.map { |row| row.sum }
puts row_sums.inspect`}
          expectedOutput={`[1, 4, 7]
[2, 5, 8]
[3, 6, 9]
---
Sum: 45
[6, 15, 24]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="multidimensional" />
      </div>
      <LessonNav lessons={lessons} currentId="multidimensional" basePath="/learn/arrays" />
    </div>
  );
}
