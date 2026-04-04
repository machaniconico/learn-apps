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
        <span className="text-green-400 text-sm font-semibold">配列 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">イテレーション</h1>
        <p className="text-gray-400">each・map・select で配列を走査・変換する方法を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">イテレーションメソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Rubyの配列はブロックを受け取るイテレーションメソッドを豊富に持ちます。each は副作用のある処理に、map は変換に、select/reject はフィルタリングに使います。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">each</code>: 各要素に対してブロックを実行</li>
          <li><code className="text-green-400">map</code> / <code className="text-green-400">collect</code>: 変換した新しい配列を返す</li>
          <li><code className="text-green-400">select</code> / <code className="text-green-400">filter</code>: 条件に一致する要素を返す</li>
          <li><code className="text-green-400">reject</code>: 条件に一致しない要素を返す</li>
          <li><code className="text-green-400">each_with_index</code>: インデックス付きで走査</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">each と map</h2>
        <RubyEditor
          defaultCode={`numbers = [1, 2, 3, 4, 5]

# each: 副作用
numbers.each { |n| print "#{n} " }
puts

# map: 変換
doubled = numbers.map { |n| n * 2 }
puts doubled.inspect

# each_with_index
numbers.each_with_index do |n, i|
  puts "#{i}: #{n}"
end`}
          expectedOutput={`1 2 3 4 5
[2, 4, 6, 8, 10]
0: 1
1: 2
2: 3
3: 4
4: 5`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">select と reject</h2>
        <RubyEditor
          defaultCode={`numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# select: 偶数のみ
evens = numbers.select { |n| n.even? }
puts evens.inspect

# reject: 奇数を除く（evenと同じ結果）
no_odds = numbers.reject { |n| n.odd? }
puts no_odds.inspect

# 組み合わせ
result = numbers.select { |n| n > 3 }.map { |n| n ** 2 }
puts result.inspect`}
          expectedOutput={`[2, 4, 6, 8, 10]
[2, 4, 6, 8, 10]
[16, 25, 36, 49, 64, 81, 100]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="iteration" />
      </div>
      <LessonNav lessons={lessons} currentId="iteration" basePath="/learn/arrays" />
    </div>
  );
}
