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
        <span className="text-green-400 text-sm font-semibold">配列 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変換メソッド</h1>
        <p className="text-gray-400">map・flatten・compact など配列を変換するメソッドを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">主な変換メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列の変換メソッドは元の配列を変えずに新しい配列を返します。flatten はネストを解除し、compact は nil を除去します。これらをチェーンして複雑な処理を簡潔に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-green-400">map</code>: 各要素を変換した新配列</li>
          <li><code className="text-green-400">flatten</code>: ネストした配列を平坦化</li>
          <li><code className="text-green-400">flatten(n)</code>: n レベルだけ平坦化</li>
          <li><code className="text-green-400">compact</code>: nil を除去した新配列</li>
          <li><code className="text-green-400">uniq</code>: 重複を除去した新配列</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">flatten と compact</h2>
        <RubyEditor
          defaultCode={`# flatten: ネスト解除
nested = [1, [2, 3], [4, [5, 6]]]
puts nested.flatten.inspect
puts nested.flatten(1).inspect

# compact: nil除去
with_nils = [1, nil, 2, nil, 3, nil]
puts with_nils.compact.inspect

# uniq: 重複除去
dupes = [1, 2, 2, 3, 3, 3, 4]
puts dupes.uniq.inspect`}
          expectedOutput={`[1, 2, 3, 4, 5, 6]
[1, 2, 3, 4, [5, 6]]
[1, 2, 3]
[1, 2, 3, 4]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">メソッドチェーン</h2>
        <RubyEditor
          defaultCode={`data = [3, nil, 1, nil, 4, 1, 5, 9, 2, nil]

# compact → uniq → sort
result = data.compact.uniq.sort
puts result.inspect

# map → flatten
sentences = ["hello world", "foo bar"]
words = sentences.map { |s| s.split(" ") }.flatten
puts words.inspect

# select → map
numbers = (1..10).to_a
result2 = numbers.select { |n| n.odd? }.map { |n| n * n }
puts result2.inspect`}
          expectedOutput={`[1, 2, 3, 4, 5, 9]
["hello", "world", "foo", "bar"]
[1, 9, 25, 49, 81]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="transformations" />
      </div>
      <LessonNav lessons={lessons} currentId="transformations" basePath="/learn/arrays" />
    </div>
  );
}
