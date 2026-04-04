import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "blocks")!;
const lessonId = "closures";

export default function ClosuresPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-pink-400 text-sm font-medium mb-2">ブロック・Proc・Lambda</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">クロージャ</h1>
          <p className="text-gray-400">
            クロージャとは、定義されたスコープの変数を「閉じ込めて」参照し続けられる関数オブジェクトです。
            Rubyではブロック・Proc・Lambda がすべてクロージャです。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">変数のキャプチャ</h2>
          <p className="text-gray-400 text-sm mb-4">
            クロージャは定義時のスコープにある変数を参照します。
            変数の値ではなく変数自体（参照）をキャプチャするため、
            変数が後から変わっても最新の値が使われます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# 変数のキャプチャ
x = 10
add_x = ->(n) { n + x }
puts add_x.call(5)   # => 15

x = 20               # xを変更
puts add_x.call(5)   # => 25（最新のxを参照）

# カウンターの実装
def make_counter
  count = 0
  increment = -> { count += 1; count }
  decrement = -> { count -= 1; count }
  get       = -> { count }
  [increment, decrement, get]
end

inc, dec, get = make_counter
puts inc.call   # => 1
puts inc.call   # => 2
puts inc.call   # => 3
puts dec.call   # => 2
puts get.call   # => 2`}
          expectedOutput={`15
25
1
2
3
2
2`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">クロージャのスコープ</h2>
          <p className="text-gray-400 text-sm">
            各クロージャは独立した環境を持ちます。同じファクトリから作られた複数のクロージャでも、
            それぞれが独立した変数を持ちます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# 独立したクロージャの環境
def make_accumulator(initial)
  total = initial
  ->(n) { total += n; total }
end

acc1 = make_accumulator(0)
acc2 = make_accumulator(100)

puts acc1.call(10)   # => 10
puts acc1.call(20)   # => 30
puts acc2.call(5)    # => 105
puts acc1.call(5)    # => 35（acc2とは独立）

# ブロックもクロージャ
results = []
[1, 2, 3].each do |n|
  results << -> { n * n }  # nをキャプチャ
end
puts results.map(&:call).inspect`}
          expectedOutput={`10
30
105
35
[1, 4, 9]`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="blocks" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/blocks" />
      </div>
    </div>
  );
}
