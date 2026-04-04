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
        <span className="text-indigo-400 text-sm font-semibold">シンボル レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シンボルと文字列の違い</h1>
        <p className="text-gray-400">シンボルと文字列の使い分けとパフォーマンスの違いを学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">主な違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          シンボルと文字列は見た目が似ていますが、根本的に異なります。シンボルはイミュータブルで同一性を持ち、識別子として最適です。文字列はミュータブルで操作メソッドが豊富で、テキスト処理に適しています。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300 border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 pr-4 text-white">特性</th>
                <th className="text-left py-2 pr-4 text-indigo-400">シンボル</th>
                <th className="text-left py-2 text-purple-400">文字列</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800"><td className="py-1 pr-4">ミュータブル</td><td className="pr-4">不可</td><td>可能</td></tr>
              <tr className="border-b border-gray-800"><td className="py-1 pr-4">同一性</td><td className="pr-4">同名=同一</td><td>同内容≠同一</td></tr>
              <tr className="border-b border-gray-800"><td className="py-1 pr-4">メモリ</td><td className="pr-4">効率的</td><td>毎回生成</td></tr>
              <tr><td className="py-1 pr-4">用途</td><td className="pr-4">識別子・キー</td><td>テキスト処理</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">同一性の違い</h2>
        <RubyEditor
          defaultCode={`# シンボル: 同名は同一オブジェクト
sym1 = :hello
sym2 = :hello
puts sym1.equal?(sym2)
puts sym1.object_id == sym2.object_id

# 文字列: 同内容でも別オブジェクト
str1 = "hello"
str2 = "hello"
puts str1.equal?(str2)
puts str1 == str2
puts str1.object_id == str2.object_id`}
          expectedOutput={`true
true
false
true
false`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">使い分けの指針</h2>
        <RubyEditor
          defaultCode={`# シンボルが適切: 識別子・定数的な名前
status = :active
direction = :north
http_method = :get

# ハッシュキーはシンボルが推奨
config = { host: "localhost", port: 3000 }

# 文字列が適切: ユーザー入力・操作が必要なテキスト
user_input = "Hello, World!"
processed = user_input.downcase.gsub(/[^a-z]/, "")
puts processed

# シンボルは変更不可
puts :hello.frozen?
sym = :test
# sym << "x"  # => FrozenError
puts sym`}
          expectedOutput={`helloworld
true
test`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="symbols" lessonId="vs-strings" />
      </div>
      <LessonNav lessons={lessons} currentId="vs-strings" basePath="/learn/symbols" />
    </div>
  );
}
