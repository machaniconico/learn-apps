import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "blocks")!;
const lessonId = "lambda-basics";

export default function LambdaBasicsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-pink-400 text-sm font-medium mb-2">ブロック・Proc・Lambda</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">Lambdaの基本</h1>
          <p className="text-gray-400">
            Lambda は Proc の特殊な形式で、引数チェックが厳密で return の動作が異なります。
            &#x2192; 記法（スタブ演算子）または lambda メソッドで作成します。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">Lambdaの作り方</h2>
          <p className="text-gray-400 text-sm mb-4">
            Lambda は2種類の記法で作れます。どちらも同じ Lambda オブジェクトを生成します。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>
              <code className="text-pink-400 bg-gray-800 px-1 rounded">-&gt;(引数) {"{ 処理 }"}</code> —— スタブ演算子（推奨）
            </li>
            <li>
              <code className="text-pink-400 bg-gray-800 px-1 rounded">lambda {"{ |引数| 処理 }"}</code> —— lambda メソッド
            </li>
            <li>lambda? メソッドで Lambda かどうか確認できる</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`# -> 記法（スタブ演算子）
greet = ->(name) { "Hello, #{name}!" }
puts greet.call("Ruby")
puts greet.("Lambda")   # .() 記法
puts greet["World"]     # [] 記法

# lambdaメソッド
square = lambda { |x| x ** 2 }
puts square.call(7)

# lambda?で確認
puts greet.lambda?   # => true
p = proc { |x| x }
puts p.lambda?       # => false

# 複数行Lambda
calculate = ->(a, b, op) do
  case op
  when :add then a + b
  when :mul then a * b
  else 0
  end
end
puts calculate.(3, 4, :add)
puts calculate.(3, 4, :mul)`}
          expectedOutput={`Hello, Ruby!
Hello, Lambda!
Hello, World!
49
true
false
7
12`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">Lambdaを活用する</h2>
          <p className="text-gray-400 text-sm">
            Lambda は関数型プログラミングスタイルで活用できます。
            高階関数（関数を返す関数）を作るときに特に有用です。
          </p>
        </div>

        <RubyEditor
          defaultCode={`# Lambdaを返すメソッド（カリー化風）
def adder(n)
  ->(x) { x + n }
end

add5  = adder(5)
add10 = adder(10)
puts add5.call(3)   # => 8
puts add10.call(3)  # => 13

# Lambdaを配列に格納
operations = {
  double: ->(x) { x * 2 },
  negate: ->(x) { -x },
  square: ->(x) { x ** 2 },
}

value = 4
operations.each do |name, op|
  puts "#{name}(#{value}) = #{op.call(value)}"
end`}
          expectedOutput={`8
13
double(4) = 8
negate(4) = -4
square(4) = 16`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="blocks" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/blocks" />
      </div>
    </div>
  );
}
