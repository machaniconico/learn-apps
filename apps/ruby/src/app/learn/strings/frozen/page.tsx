import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "strings")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">freeze・frozen?</h1>
        <p className="text-gray-400">イミュータブル文字列と freeze メソッドの使い方を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">freeze とイミュータブル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          freeze メソッドを呼ぶと文字列はイミュータブル（変更不可）になります。変更しようとすると FrozenError が発生します。同じ内容の frozen な文字列は同一オブジェクトになりメモリ効率が向上します。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-purple-400">str.freeze</code>: 文字列を凍結</li>
          <li><code className="text-purple-400">str.frozen?</code>: 凍結確認</li>
          <li>シンボルは常に frozen</li>
          <li>マジックコメント: <code className="text-purple-400"># frozen_string_literal: true</code></li>
          <li>dup で凍結解除コピー: <code className="text-purple-400">str.dup</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">freeze の動作</h2>
        <RubyEditor
          defaultCode={`str = "hello"
puts str.frozen?

str.freeze
puts str.frozen?

# シンボルは常に frozen
puts :hello.frozen?

# dup で変更可能なコピーを取得
frozen_str = "world".freeze
mutable = frozen_str.dup
puts mutable.frozen?
mutable << "!"
puts mutable`}
          expectedOutput={`false
true
true
false
world!`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">frozen_string_literal マジックコメント</h2>
        <RubyEditor
          defaultCode={`# frozen_string_literal: true が有効な場合の動作をシミュレート

# 通常のfreezeの効果
CONSTANT = "immutable".freeze
puts CONSTANT.frozen?

# +str で mutable なコピー
mutable = +CONSTANT
puts mutable.frozen?
mutable.upcase!
puts mutable

# 文字列リテラルのオブジェクトID比較
a = "test".freeze
b = "test".freeze
puts a.equal?(b)
puts a == b`}
          expectedOutput={`true
false
IMMUTABLE
false
true`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="frozen" />
      </div>
      <LessonNav lessons={lessons} currentId="frozen" basePath="/learn/strings" />
    </div>
  );
}
