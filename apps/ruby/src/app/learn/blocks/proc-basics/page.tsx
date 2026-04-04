import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "blocks")!;
const lessonId = "proc-basics";

export default function ProcBasicsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-pink-400 text-sm font-medium mb-2">ブロック・Proc・Lambda</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">Procの基本</h1>
          <p className="text-gray-400">
            Proc はブロックをオブジェクト化したものです。変数に代入したり、
            後から呼び出したり、メソッドに渡したりできます。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">Procの作り方</h2>
          <p className="text-gray-400 text-sm mb-4">
            Proc を作る方法は主に2つあります。
            <code className="text-pink-400 bg-gray-800 px-1 rounded mx-1">Proc.new {"{ }"}</code> と
            <code className="text-pink-400 bg-gray-800 px-1 rounded mx-1">proc {"{ }"}</code> はほぼ同じです。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>Proc.new {"{ }"} で作成</li>
            <li>proc {"{ }"} で作成（Proc.new と同等）</li>
            <li>.call(引数) または .(引数) または [引数] で呼び出し</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`# Proc.newで作成
greet = Proc.new { |name| puts "Hello, #{name}!" }
greet.call("Alice")

# procメソッドで作成
double = proc { |x| x * 2 }
puts double.call(5)

# 呼び出し方の違い
add = Proc.new { |a, b| a + b }
puts add.call(3, 4)   # .call
puts add.(3, 4)        # .()
puts add[3, 4]         # []`}
          expectedOutput={`Hello, Alice!
10
7
7
7`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">Procをメソッドに渡す</h2>
          <p className="text-gray-400 text-sm">
            <code className="text-pink-400 bg-gray-800 px-1 rounded">&amp;proc</code> と書くことで
            Proc をブロックとしてメソッドに渡せます。
            引数名に <code className="text-pink-400 bg-gray-800 px-1 rounded">&amp;</code> をつけると
            ブロックをProcとして受け取れます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# &でProcをブロックとして渡す
square = proc { |x| x ** 2 }
result = [1, 2, 3, 4, 5].map(&square)
puts result.inspect

# &引数でブロックをProcとして受け取る
def capture(&block)
  puts block.class
  block.call(10)
end

capture { |x| puts x * 3 }

# Procを返すメソッド（ファクトリパターン）
def multiplier(factor)
  proc { |x| x * factor }
end

triple = multiplier(3)
puts triple.call(7)
puts [1, 2, 3].map(&triple).inspect`}
          expectedOutput={`[1, 4, 9, 16, 25]
Proc
30
21
[3, 6, 9]`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="blocks" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/blocks" />
      </div>
    </div>
  );
}
