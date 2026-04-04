import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "blocks")!;
const lessonId = "method-objects";

export default function MethodObjectsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-pink-400 text-sm font-medium mb-2">ブロック・Proc・Lambda</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">Methodオブジェクト</h1>
          <p className="text-gray-400">
            Ruby ではメソッドもオブジェクトとして扱えます。
            method(:name) で Method オブジェクトを取得し、
            ブロックの代わりに渡すことができます。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">Method クラス</h2>
          <p className="text-gray-400 text-sm mb-4">
            <code className="text-pink-400 bg-gray-800 px-1 rounded">method(:メソッド名)</code> で
            そのメソッドを表す Method オブジェクトを取得できます。
            <code className="text-pink-400 bg-gray-800 px-1 rounded">&amp;method(:名前)</code> で
            ブロックとしてメソッドに渡せます。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>method(:name) — バインドされた Method オブジェクト</li>
            <li>unbound_method / UnboundMethod — レシーバなしのメソッド</li>
            <li>&amp;method(:name) — ブロックとして利用</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`# method(:name)でMethodオブジェクトを取得
def double(x)
  x * 2
end

m = method(:double)
puts m.class       # => Method
puts m.call(5)     # => 10

# &でブロックとして渡す
puts [1, 2, 3, 4].map(&method(:double)).inspect

# 組み込みメソッドも同様に使える
puts ["1", "2", "3"].map(&method(:Integer)).inspect`}
          expectedOutput={`Method
10
[2, 4, 6, 8]
[1, 2, 3]`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">UnboundMethod</h2>
          <p className="text-gray-400 text-sm">
            UnboundMethod はレシーバにバインドされていないメソッドです。
            instance_method で取得し、bind でレシーバを紐付けて呼び出します。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# インスタンスメソッドをMethodオブジェクトとして使う
class Calculator
  def add(a, b) = a + b
  def mul(a, b) = a * b
end

calc = Calculator.new
add_m = calc.method(:add)
puts add_m.call(3, 4)    # => 7
puts add_m.arity         # => 2 (引数の数)

# UnboundMethod
unbound = Calculator.instance_method(:mul)
puts unbound.class       # => UnboundMethod

bound = unbound.bind(calc)
puts bound.call(3, 4)    # => 12

# Symbolのto_procと同様のパターン
words = ["hello", "world", "ruby"]
puts words.map(&:upcase).inspect
puts words.map(&:length).inspect`}
          expectedOutput={`7
2
UnboundMethod
12
["HELLO", "WORLD", "RUBY"]
[5, 5, 4]`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="blocks" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/blocks" />
      </div>
    </div>
  );
}
