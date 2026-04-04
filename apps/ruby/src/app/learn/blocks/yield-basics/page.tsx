import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "blocks")!;
const lessonId = "yield-basics";

export default function YieldBasicsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-pink-400 text-sm font-medium mb-2">ブロック・Proc・Lambda</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">yield</h1>
          <p className="text-gray-400">
            yield はメソッド内でブロックを呼び出すキーワードです。
            block_given? でブロックの有無を確認でき、引数を渡すこともできます。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">yield の基本</h2>
          <p className="text-gray-400 text-sm mb-4">
            メソッド定義内で <code className="text-pink-400 bg-gray-800 px-1 rounded">yield</code> を書くと、
            そのメソッドを呼び出したときに渡されたブロックを実行します。
            ブロックが渡されていない状態で yield を呼ぶと LocalJumpError が発生します。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>yield でブロックを実行する</li>
            <li>block_given? でブロックの存在を確認する</li>
            <li>yield(引数) でブロックに値を渡す</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`# 基本的なyield
def say_hello
  puts "メソッド開始"
  yield
  puts "メソッド終了"
end

say_hello { puts "ブロック実行！" }

# block_given?で安全に呼び出す
def optional_block
  if block_given?
    yield
  else
    puts "ブロックなしで呼ばれました"
  end
end

optional_block { puts "ブロックあり" }
optional_block`}
          expectedOutput={`メソッド開始
ブロック実行！
メソッド終了
ブロックあり
ブロックなしで呼ばれました`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">yield に引数を渡す</h2>
          <p className="text-gray-400 text-sm">
            <code className="text-pink-400 bg-gray-800 px-1 rounded">yield(値)</code> と書くと
            ブロックのパラメータに値が渡されます。複数の値もカンマで渡せます。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# yieldで引数を渡す
def twice
  yield(1)
  yield(2)
end

twice { |n| puts "回目: #{n}" }

# 独自のeachメソッドを実装する
def my_times(n)
  i = 0
  while i < n
    yield(i)
    i += 1
  end
end

my_times(3) { |i| puts "i = #{i}" }

# yieldの戻り値を使う
def transform(value)
  result = yield(value)
  puts "変換結果: #{result}"
end

transform(5) { |x| x * x }`}
          expectedOutput={`回目: 1
回目: 2
i = 0
i = 1
i = 2
変換結果: 25`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="blocks" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/blocks" />
      </div>
    </div>
  );
}
