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
        <span className="text-indigo-400 text-sm font-semibold">シンボル レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Symbol#to_proc</h1>
        <p className="text-gray-400">&:method_name パターンの仕組みと活用を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">to_proc とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Symbol#to_proc は <code className="text-indigo-400">&:method_name</code> として使うと、各要素にそのメソッドを呼び出すブロックを自動生成します。<code className="text-indigo-400">{"map { |x| x.upcase }"}</code> を <code className="text-indigo-400">map(&:upcase)</code> と短く書けます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-indigo-400">:method_name.to_proc</code>: Proc オブジェクトを返す</li>
          <li><code className="text-indigo-400">&:upcase</code>: <code className="text-indigo-400">{"{ |x| x.upcase }"}</code> と同じ</li>
          <li>引数なしメソッドのみ直接使用可能</li>
          <li>Enumerable メソッド全般で使える</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">&:method_name の基本</h2>
        <RubyEditor
          defaultCode={`words = ["hello", "world", "ruby", "programming"]

# ブロックを明示する書き方
long_way = words.map { |w| w.upcase }
puts long_way.inspect

# &:to_proc を使った短い書き方
short_way = words.map(&:upcase)
puts short_way.inspect

# 他のメソッドでも
puts words.map(&:length).inspect
puts words.select(&:frozen?).inspect
puts words.map(&:chars).map(&:first).inspect`}
          expectedOutput={`["HELLO", "WORLD", "RUBY", "PROGRAMMING"]
["HELLO", "WORLD", "RUBY", "PROGRAMMING"]
[5, 5, 4, 11]
[]
["h", "w", "r", "p"]`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">to_proc の仕組み</h2>
        <RubyEditor
          defaultCode={`# to_proc の動作を理解する
upcase_proc = :upcase.to_proc
puts upcase_proc.call("hello")
puts upcase_proc.class

# method メソッドでも同様
puts "hello".method(:upcase).call

# 実践的な使用例
numbers = [1, -2, 3, -4, 5]
puts numbers.map(&:abs).inspect
puts numbers.select(&:positive?).inspect

# chaining
puts ["  hello  ", " world ", "ruby"].map(&:strip).map(&:upcase).inspect`}
          expectedOutput={`HELLO
Proc
HELLO
[1, 2, 3, 4, 5]
[1, 3, 5]
["HELLO", "WORLD", "RUBY"]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="symbols" lessonId="to-proc" />
      </div>
      <LessonNav lessons={lessons} currentId="to-proc" basePath="/learn/symbols" />
    </div>
  );
}
