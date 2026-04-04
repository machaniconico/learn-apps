import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ProgressBar } from "@/components/progress-bar";
import { LessonList } from "@/components/lesson-list";
import { RubyEditor } from "@/components/ruby-editor";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const category = CATEGORIES.find((c) => c.id === "blocks")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyでブロックを定義する方法として正しいものはどれですか？",
    options: [
      "do...end または { }",
      "function() { }",
      "proc do...end",
      "block do...end",
    ],
    answer: 0,
    explanation: "Rubyのブロックは do...end または { } の2つの記法で書けます。",
  },
  {
    question: "メソッド内でブロックを呼び出すキーワードはどれですか？",
    options: ["call", "invoke", "yield", "execute"],
    answer: 2,
    explanation: "yield キーワードを使うとメソッドに渡されたブロックを呼び出せます。",
  },
  {
    question: "Proc と Lambda の違いとして正しいものはどれですか？",
    options: [
      "Procはオブジェクトだが、Lambdaはオブジェクトではない",
      "Lambdaは引数の数を厳密にチェックするが、Procはしない",
      "Procは->記法で作り、Lambdaはlambdaメソッドで作る",
      "違いはなく、同じものである",
    ],
    answer: 1,
    explanation: "Lambdaは引数の数を厳密にチェックし、returnはLambdaのスコープのみ抜けます。Procは引数の数をチェックせず、returnはメソッド全体を抜けます。",
  },
  {
    question: "クロージャとは何ですか？",
    options: [
      "メソッドを閉じるキーワード",
      "定義されたスコープの変数をキャプチャする関数オブジェクト",
      "クラスを閉じる構文",
      "ループを終了する命令",
    ],
    answer: 1,
    explanation: "クロージャは定義時のスコープにある変数を参照し続けることができる関数オブジェクトです。",
  },
];

export default function BlocksPage() {
  const allLessons = getAllLessons();
  void allLessons;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-pink-400">
              ブロック・Proc・Lambda
            </h1>
            <DifficultyBadge difficulty={category.difficulty} />
          </div>
          <p className="text-gray-400 text-lg mb-6">
            Rubyの強力な機能であるブロック、Proc、Lambdaを学習します。
            クロージャの概念とメソッドオブジェクトまで幅広くカバーします。
          </p>
          <ProgressBar
            categoryId="blocks"
            totalLessons={category.lessons.length}
            color="pink"
          />
        </div>

        {/* Lesson List */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">レッスン一覧</h2>
          <LessonList
            lessons={category.lessons}
            basePath="/learn/blocks"
            color="pink"
            categoryId="blocks"
          />
        </div>

        {/* Code Examples */}
        <div className="mb-12 space-y-6">
          <h2 className="text-xl font-semibold text-gray-100">コード例</h2>

          <div>
            <p className="text-gray-400 text-sm mb-2">ブロック・yield・Proc・Lambdaの基本</p>
            <RubyEditor
              defaultCode={`# ブロックの基本
[1, 2, 3].each do |n|
  puts n * 2
end

# yieldでブロックを呼び出す
def greet
  puts "Before"
  yield("World") if block_given?
  puts "After"
end
greet { |name| puts "Hello, #{name}!" }

# Proc
double = Proc.new { |x| x * 2 }
puts double.call(5)

# Lambda
square = ->(x) { x ** 2 }
puts square.call(4)`}
              expectedOutput={`2
4
6
Before
Hello, World!
After
10
16`}
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">クロージャとMethodオブジェクト</p>
            <RubyEditor
              defaultCode={`# クロージャ：変数をキャプチャ
count = 0
increment = -> { count += 1 }
increment.call
increment.call
puts count  # => 2

# method(:name)でMethodオブジェクトを取得
def add_one(x)
  x + 1
end

m = method(:add_one)
puts m.call(9)          # => 10
puts [1, 2, 3].map(&m)  # => [2, 3, 4]`}
              expectedOutput={`2
10
[2, 3, 4]`}
            />
          </div>
        </div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} color="pink" />
      </div>
    </div>
  );
}
