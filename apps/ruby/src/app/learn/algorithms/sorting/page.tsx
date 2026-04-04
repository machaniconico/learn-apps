import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソートアルゴリズム</h1>
        <p className="text-gray-400">バブルソート、クイックソート、マージソートをRubyで実装して学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ソートアルゴリズムの比較</h2>
        <p className="text-gray-300 mb-3">
          各ソートアルゴリズムは計算量と実装の複雑さが異なります。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">バブルソート</code> — O(n²) 単純だが低効率</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">クイックソート</code> — 平均O(n log n) 実用的</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">マージソート</code> — O(n log n) 安定・安全</li>
          <li>Rubyの<code className="bg-gray-800 px-1 rounded text-indigo-300">Array#sort</code>はTimsortを使用</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: バブルソートとクイックソート</h2>
        <RubyEditor
          defaultCode={`# バブルソート O(n²)
def bubble_sort(arr)
  a = arr.dup
  n = a.length
  loop do
    swapped = false
    (n - 1).times do |i|
      if a[i] > a[i + 1]
        a[i], a[i + 1] = a[i + 1], a[i]
        swapped = true
      end
    end
    break unless swapped
  end
  a
end

# クイックソート O(n log n) 平均
def quick_sort(arr)
  return arr if arr.length <= 1
  pivot = arr[arr.length / 2]
  left  = arr.select { |x| x < pivot }
  mid   = arr.select { |x| x == pivot }
  right = arr.select { |x| x > pivot }
  quick_sort(left) + mid + quick_sort(right)
end

data = [64, 34, 25, 12, 22, 11, 90]
puts "元の配列: #{data.inspect}"
puts "バブルソート: #{bubble_sort(data).inspect}"
puts "クイックソート: #{quick_sort(data).inspect}"
puts "Ruby sort: #{data.sort.inspect}"`}
          expectedOutput={`元の配列: [64, 34, 25, 12, 22, 11, 90]
バブルソート: [11, 12, 22, 25, 34, 64, 90]
クイックソート: [11, 12, 22, 25, 34, 64, 90]
Ruby sort: [11, 12, 22, 25, 34, 64, 90]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: マージソート</h2>
        <RubyEditor
          defaultCode={`# マージソート O(n log n) - 安定ソート
def merge_sort(arr)
  return arr if arr.length <= 1

  mid = arr.length / 2
  left  = merge_sort(arr[0...mid])
  right = merge_sort(arr[mid..])

  merge(left, right)
end

def merge(left, right)
  result = []
  until left.empty? || right.empty?
    if left.first <= right.first
      result << left.shift
    else
      result << right.shift
    end
  end
  result + left + right
end

data = [38, 27, 43, 3, 9, 82, 10]
puts "元の配列: #{data.inspect}"
puts "マージソート: #{merge_sort(data).inspect}"

# 文字列のソート
words = ["banana", "apple", "cherry", "date", "elderberry"]
puts "\n文字列ソート:"
puts "元: #{words.inspect}"
puts "ソート後: #{words.sort.inspect}"
puts "長さ順: #{words.sort_by(&:length).inspect}"`}
          expectedOutput={`元の配列: [38, 27, 43, 3, 9, 82, 10]
マージソート: [3, 9, 10, 27, 38, 43, 82]

文字列ソート:
元: ["banana", "apple", "cherry", "date", "elderberry"]
ソート後: ["apple", "banana", "cherry", "date", "elderberry"]
長さ順: ["date", "apple", "banana", "cherry", "elderberry"]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/algorithms" />
    </div>
  );
}
