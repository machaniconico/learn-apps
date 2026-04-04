import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "methods")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyでメソッドを定義するキーワードはどれですか？",
    options: ["function", "func", "def", "method"],
    answer: 2,
    explanation: "Rubyではdefキーワードでメソッドを定義し、endで終了します。",
  },
  {
    question: "Rubyのメソッドの戻り値について正しいのはどれですか？",
    options: [
      "必ずreturnを書く必要がある",
      "最後に評価された式が暗黙的に返される",
      "戻り値は必ずnilになる",
      "return文がないとエラーになる",
    ],
    answer: 1,
    explanation: "Rubyでは最後に評価された式が暗黙の戻り値になります。returnは明示的な早期リターンに使います。",
  },
  {
    question: "可変長引数を受け取るにはどう書きますか？",
    options: ["def greet(name...)", "def greet(*names)", "def greet([names])", "def greet(names[])"],
    answer: 1,
    explanation: "*を付けた引数は配列として全ての引数を受け取ります。",
  },
  {
    question: "キーワード引数の定義として正しいのはどれですか？",
    options: [
      "def greet(name: )",
      "def greet(:name)",
      "def greet(name =>)",
      "def greet(keyword name)",
    ],
    answer: 0,
    explanation: "キーワード引数はname:の形式で定義します。デフォルト値を付けてname: 'Alice'とも書けます。",
  },
];

export default function MethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">メソッド</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyのメソッド定義と使い方を学びましょう。引数・戻り値・デフォルト引数・キーワード引数・
          可変長引数・ブロックなど、Rubyメソッドの豊富な機能を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="methods" totalLessons={8} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/methods" color="teal" categoryId="methods" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: メソッドの基本</h2>
        <RubyEditor
          defaultCode={`# 基本的なメソッド定義
def greet(name)
  "こんにちは、#{name}さん！"
end

puts greet("Alice")
puts greet("Bob")

# デフォルト引数
def power(base, exp = 2)
  base ** exp
end

puts power(3)     # 9 (3の2乗)
puts power(2, 10) # 1024 (2の10乗)`}
          expectedOutput={`こんにちは、Aliceさん！
こんにちは、Bobさん！
9
1024`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: 高度なメソッド</h2>
        <RubyEditor
          defaultCode={`# キーワード引数
def create_user(name:, age:, role: "user")
  "#{name}(#{age}歳) - #{role}"
end

puts create_user(name: "Alice", age: 30)
puts create_user(name: "Bob", age: 25, role: "admin")

# 可変長引数
def sum(*numbers)
  numbers.reduce(0, :+)
end

puts sum(1, 2, 3)       # 6
puts sum(10, 20, 30, 40) # 100`}
          expectedOutput={`Alice(30歳) - user
Bob(25歳) - admin
6
100`}
        />
      </section>

      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
