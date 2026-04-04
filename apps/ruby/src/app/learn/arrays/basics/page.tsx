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
        <span className="text-green-400 text-sm font-semibold">配列 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列の基本</h1>
        <p className="text-gray-400">配列の作成方法とアクセスを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列は複数の値を順序付きで格納するデータ構造です。Rubyの配列は異なる型の要素を混在させることができ、動的にサイズが変わります。インデックスは0から始まります。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">[]</code> リテラル: 最も一般的な作成方法</li>
          <li><code className="text-green-400">%w[]</code>: 文字列の配列を簡潔に記述</li>
          <li><code className="text-green-400">Array.new(n, val)</code>: サイズとデフォルト値で初期化</li>
          <li>負のインデックス: <code className="text-green-400">arr[-1]</code> で末尾要素にアクセス</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">配列の作成</h2>
        <RubyEditor
          defaultCode={`# リテラルで作成
numbers = [1, 2, 3, 4, 5]
puts numbers[0]
puts numbers[-1]
puts numbers.length

# %w[] で文字列配列
fruits = %w[apple banana cherry]
puts fruits[1]
puts fruits.inspect`}
          expectedOutput={`1
5
5
banana
["apple", "banana", "cherry"]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">Array.new と範囲アクセス</h2>
        <RubyEditor
          defaultCode={`# Array.new でデフォルト値
zeros = Array.new(4, 0)
puts zeros.inspect

# ブロックで初期化
squares = Array.new(5) { |i| i ** 2 }
puts squares.inspect

# 範囲アクセス
arr = [10, 20, 30, 40, 50]
puts arr[1..3].inspect
puts arr[0, 2].inspect`}
          expectedOutput={`[0, 0, 0, 0]
[0, 1, 4, 9, 16]
[20, 30, 40]
[10, 20]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/arrays" />
    </div>
  );
}
