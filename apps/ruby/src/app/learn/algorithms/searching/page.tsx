import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">探索アルゴリズム</h1>
        <p className="text-gray-400">線形探索と二分探索をRubyで実装し、bsearchメソッドの活用を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">探索アルゴリズムの比較</h2>
        <p className="text-gray-300 mb-3">
          データ構造と事前条件によって最適な探索アルゴリズムが異なります。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">線形探索</code> — O(n) ソート不要</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">二分探索</code> — O(log n) ソート済み配列が必要</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">Array#bsearch</code> — Rubyの組み込み二分探索</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">Hash#[]</code> — O(1) ハッシュによる検索</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 線形探索と二分探索</h2>
        <RubyEditor
          defaultCode={`# 線形探索 O(n)
def linear_search(arr, target)
  arr.each_with_index do |val, i|
    return i if val == target
  end
  -1
end

# 二分探索 O(log n)
def binary_search(arr, target)
  low, high = 0, arr.length - 1
  steps = 0

  while low <= high
    steps += 1
    mid = (low + high) / 2
    if arr[mid] == target
      puts "  #{steps}ステップで発見（インデックス#{mid}）"
      return mid
    elsif arr[mid] < target
      low = mid + 1
    else
      high = mid - 1
    end
  end
  -1
end

arr = (1..100).to_a
target = 73

puts "線形探索:"
idx = linear_search(arr, target)
puts "  #{target}はインデックス#{idx}にあります"

puts "\n二分探索:"
idx = binary_search(arr, target)
puts "  #{target}はインデックス#{idx}にあります"

puts "\nRubyのbsearch:"
result = arr.bsearch { |x| x >= target }
puts "  bsearch結果: #{result}"`}
          expectedOutput={`線形探索:
  73はインデックス72にあります

二分探索:
  7ステップで発見（インデックス72）
  73はインデックス72にあります

Rubyのbsearch:
  bsearch結果: 73`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: bsearchの応用</h2>
        <RubyEditor
          defaultCode={`# Array#bsearchの2つのモード
arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

# find-minimum モード: 条件を満たす最小値
min = arr.bsearch { |x| x >= 8 }
puts "8以上の最小値: #{min}"

# find-any モード: 条件を満たす任意の値
any = arr.bsearch { |x| x <=> 11 }
puts "11の検索: #{any}"

# 範囲での二分探索
puts "\n範囲オブジェクトのbsearch:"
range = (1..1_000_000)
target = 500_000
result = range.bsearch { |x| x >= target }
puts "#{target}を発見: #{result}"

# 実用例: 価格リストから予算内の最高品質を探す
products = [
  { name: "Basic", price: 100 },
  { name: "Standard", price: 500 },
  { name: "Premium", price: 1000 },
  { name: "Enterprise", price: 5000 },
]

budget = 600
affordable = products.select { |p| p[:price] <= budget }.last
puts "\n予算#{budget}円で買える最高グレード: #{affordable[:name]}"`}
          expectedOutput={`8以上の最小値: 9
11の検索: 11

範囲オブジェクトのbsearch:
500000を発見: 500000

予算600円で買える最高グレード: Standard`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="searching" />
      </div>
      <LessonNav lessons={lessons} currentId="searching" basePath="/learn/algorithms" />
    </div>
  );
}
