import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "symbols")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">シンボル レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Frozen String Literal</h1>
        <p className="text-gray-400">マジックコメントとシンボルの関係・パフォーマンス最適化を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">frozen_string_literal マジックコメント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファイル先頭に <code className="text-indigo-400"># frozen_string_literal: true</code> を記述すると、そのファイル内の全文字列リテラルが自動的に freeze されます。Ruby 3 では将来のデフォルトになる予定で、パフォーマンス改善とバグ防止に役立ちます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>全文字列リテラルが自動 freeze</li>
          <li>同内容の文字列リテラルはオブジェクトを共有</li>
          <li>変更が必要なら <code className="text-indigo-400">str.dup</code> か <code className="text-indigo-400">+str</code></li>
          <li>シンボルへの移行を促進する設計思想</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">freeze とメモリ効率</h2>
        <RubyEditor
          defaultCode={`# シンボルは常に同一オブジェクト（メモリ効率が良い）
puts :hello.frozen?
puts :hello.object_id == :hello.object_id

# frozen な文字列も同一オブジェクトを共有できる
str1 = "hello".freeze
str2 = "hello".freeze
puts str1.frozen?

# 変更可能なコピーが必要な場合
frozen = "immutable".freeze
mutable = frozen.dup
mutable << " copy"
puts mutable
puts frozen`}
          expectedOutput={`true
true
true
immutable copy
immutable`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">シンボルとメモリ管理</h2>
        <RubyEditor
          defaultCode={`# シンボルのパフォーマンス優位性を確認
# （object_id が同じ = 同一オブジェクト）
sym_ids = 3.times.map { :benchmark.object_id }
puts sym_ids.uniq.length

# 文字列は毎回新オブジェクト（通常）
str_ids = 3.times.map { "benchmark".object_id }
puts str_ids.uniq.length

# frozen 文字列定数はシンボルに近い動作
GREET = "Hello".freeze
ids = 3.times.map { GREET.object_id }
puts ids.uniq.length

# 実践: 定数的な文字列はシンボルか freeze を使う
VALID_ROLES = %i[admin user moderator guest].freeze
puts VALID_ROLES.include?(:admin)
puts VALID_ROLES.frozen?`}
          expectedOutput={`1
3
1
true
true`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="symbols" lessonId="frozen-symbols" />
      </div>
      <LessonNav lessons={lessons} currentId="frozen-symbols" basePath="/learn/symbols" />
    </div>
  );
}
