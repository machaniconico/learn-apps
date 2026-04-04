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
        <span className="text-green-400 text-sm font-semibold">配列 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">便利なメソッド</h1>
        <p className="text-gray-400">zip・product・combination など高度な配列メソッドを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">結合・組み合わせ系メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Rubyの配列は zip・product・combination・permutation など組み合わせ論的な操作をサポートしています。これらを使うと複雑な処理を簡潔に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">zip</code>: 複数配列を要素ごとにまとめる</li>
          <li><code className="text-green-400">product</code>: デカルト積（全ての組み合わせ）</li>
          <li><code className="text-green-400">combination(n)</code>: n個の組み合わせ</li>
          <li><code className="text-green-400">permutation(n)</code>: n個の順列</li>
          <li><code className="text-green-400">rotate(n)</code>: n要素ずらして回転</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">zip と product</h2>
        <RubyEditor
          defaultCode={`names = ["Alice", "Bob", "Charlie"]
scores = [90, 85, 92]

# zip: 対応する要素をまとめる
zipped = names.zip(scores)
zipped.each { |name, score| puts "#{name}: #{score}" }

puts "---"

# product: デカルト積
colors = ["red", "blue"]
sizes = ["S", "M", "L"]
variants = colors.product(sizes)
puts variants.length
puts variants.first.inspect`}
          expectedOutput={`Alice: 90
Bob: 85
Charlie: 92
---
6
["red", "S"]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">combination と rotate</h2>
        <RubyEditor
          defaultCode={`cards = [1, 2, 3, 4]

# combination: 順序なし組み合わせ
combos = cards.combination(2).to_a
puts combos.inspect

# permutation: 順序あり順列
perms = [1, 2, 3].permutation(2).to_a
puts perms.length

# rotate
arr = [1, 2, 3, 4, 5]
puts arr.rotate(2).inspect
puts arr.rotate(-1).inspect`}
          expectedOutput={`[[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
6
[3, 4, 5, 1, 2]
[5, 1, 2, 3, 4]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="array-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="array-methods" basePath="/learn/arrays" />
    </div>
  );
}
