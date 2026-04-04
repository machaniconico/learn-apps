import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "blocks")!;
const lessonId = "proc-vs-lambda";

export default function ProcVsLambdaPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-pink-400 text-sm font-medium mb-2">ブロック・Proc・Lambda</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">ProcとLambdaの違い</h1>
          <p className="text-gray-400">
            Proc と Lambda はどちらも Proc クラスのインスタンスですが、
            引数チェックと return の動作に重要な違いがあります。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">2つの主な違い</h2>
          <div className="space-y-4 text-sm text-gray-400">
            <div>
              <p className="text-gray-200 font-medium mb-1">1. 引数チェック</p>
              <p>Lambda は引数の数を厳密にチェックします。Proc は余分な引数を無視し、不足分は nil になります。</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium mb-1">2. return の動作</p>
              <p>Lambda の return は Lambda のスコープのみを抜けます。Proc の return はメソッド全体を抜けます。</p>
            </div>
          </div>
        </div>

        <RubyEditor
          defaultCode={`# 引数チェックの違い
lam = lambda { |x, y| puts "#{x}, #{y}" }
prc = proc   { |x, y| puts "#{x}, #{y}" }

lam.call(1, 2)    # OK
prc.call(1, 2)    # OK
prc.call(1)       # OK: y は nil
prc.call(1, 2, 3) # OK: 3は無視

# lambda は引数不足でエラー
begin
  lam.call(1)
rescue ArgumentError => e
  puts "Lambda エラー: #{e.message}"
end`}
          expectedOutput={`1, 2
1,
1, 2
Lambda エラー: wrong number of arguments (given 1, expected 2)`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">returnの動作の違い</h2>
          <p className="text-gray-400 text-sm">
            この違いはメソッド内でProcやLambdaを呼ぶときに重要になります。
            通常は Lambda を使う方が安全です。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# LambdaのreturnはLambda内のみ
def test_lambda
  lam = -> { return 10 }
  result = lam.call
  puts "Lambda return後も続く: #{result}"
  "メソッドの戻り値"
end

puts test_lambda

# Procのreturnはメソッドごとreturnする
def test_proc
  prc = proc { return 10 }
  prc.call
  puts "この行は実行されない"
  "メソッドの戻り値"
end

puts test_proc  # => 10 (procのreturnが返る)`}
          expectedOutput={`Lambda return後も続く: 10
メソッドの戻り値
10`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="blocks" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/blocks" />
      </div>
    </div>
  );
}
