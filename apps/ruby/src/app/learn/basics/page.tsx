import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "basics")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyで文字列を出力し改行を付けるメソッドはどれですか？",
    options: ["print", "puts", "p", "pp"],
    answer: 1,
    explanation: "putsは出力後に改行を追加します。printは改行を付けません。",
  },
  {
    question: "Rubyのローカル変数の命名規則として正しいものはどれですか？",
    options: ["MyVar", "@myVar", "$myVar", "my_var"],
    answer: 3,
    explanation: "ローカル変数は小文字またはアンダースコアで始まります。スネークケースが慣例です。",
  },
  {
    question: "Rubyで変数に値が代入されていない状態を表すのはどれですか？",
    options: ["null", "undefined", "nil", "void"],
    answer: 2,
    explanation: "Rubyではnilが「値なし」を表します。JavaScriptのnull/undefinedに相当します。",
  },
  {
    question: "Rubyで定数を定義するときの命名規則はどれですか？",
    options: ["const MY_VALUE", "MY_VALUE = 42", "let MY_VALUE", "final MY_VALUE"],
    answer: 1,
    explanation: "Rubyの定数は大文字で始めます。慣例として全て大文字のスネークケースを使います。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">Ruby基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyプログラミングの基礎を学びましょう。変数・データ型・演算子・出力メソッドなど、
          すべてのRubyプログラムの土台となる概念を丁寧に解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="blue" categoryId="basics" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: 最初のRubyプログラム</h2>
        <RubyEditor
          defaultCode={`# Hello, World!
puts "Hello, World!"

# 変数を使った出力
name = "Ruby"
version = 3.2
puts "#{name} #{version} へようこそ！"

# 複数の出力
["apple", "banana", "cherry"].each do |fruit|
  puts fruit
end`}
          expectedOutput={`Hello, World!
Ruby 3.2 へようこそ！
apple
banana
cherry`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: 基本的なデータ型</h2>
        <RubyEditor
          defaultCode={`# 整数と浮動小数点数
age = 25
height = 1.75
puts age.class    # Integer
puts height.class # Float

# 文字列
greeting = "こんにちは"
puts greeting.length  # 5
puts greeting.upcase  # こんにちは (ASCII文字の場合)

# 配列とハッシュ
colors = ["red", "green", "blue"]
person = { name: "Alice", age: 30 }
puts colors[0]       # red
puts person[:name]   # Alice`}
          expectedOutput={`Integer
Float
5
こんにちは
red
Alice`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
