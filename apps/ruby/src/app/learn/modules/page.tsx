import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ProgressBar } from "@/components/progress-bar";
import { LessonList } from "@/components/lesson-list";
import { RubyEditor } from "@/components/ruby-editor";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const category = CATEGORIES.find((c) => c.id === "modules")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "モジュールとクラスの違いとして正しいものはどれですか？",
    options: [
      "モジュールはインスタンス化できない",
      "モジュールは継承できる",
      "モジュールは変数を持てない",
      "モジュールはメソッドを定義できない",
    ],
    answer: 0,
    explanation: "モジュールはインスタンス化できません。また単一継承しかできないクラスと異なり、複数のモジュールをインクルードできます。",
  },
  {
    question: "モジュールのメソッドをインスタンスメソッドとして追加するには？",
    options: ["extend", "include", "prepend", "require"],
    answer: 1,
    explanation: "include を使うとモジュールのメソッドがインスタンスメソッドとして追加されます。",
  },
  {
    question: "Comparable モジュールを使うために必ず実装するメソッドはどれですか？",
    options: ["compare", "<=>", "==", "to_s"],
    answer: 1,
    explanation: "Comparable は <=> (UFO演算子)さえ実装すれば >, <, >= などが自動的に使えます。",
  },
  {
    question: "モジュールを名前空間として使う場合の正しいアクセス方法はどれですか？",
    options: [
      "Module.Class",
      "Module#Class",
      "Module::Class",
      "Module/Class",
    ],
    answer: 2,
    explanation: "名前空間内のクラスや定数には :: (スコープ解決演算子) でアクセスします。",
  },
];

export default function ModulesPage() {
  const allLessons = getAllLessons();
  void allLessons;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-cyan-400">
              モジュール
            </h1>
            <DifficultyBadge difficulty={category.difficulty} />
          </div>
          <p className="text-gray-400 text-lg mb-6">
            Rubyのモジュール機能を学習します。ミックスイン・名前空間・
            Comparable・Enumerableなど実践的なモジュールの使い方をマスターしましょう。
          </p>
          <ProgressBar
            categoryId="modules"
            totalLessons={category.lessons.length}
            color="cyan"
          />
        </div>

        {/* Lesson List */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">レッスン一覧</h2>
          <LessonList
            lessons={category.lessons}
            basePath="/learn/modules"
            color="cyan"
            categoryId="modules"
          />
        </div>

        {/* Code Examples */}
        <div className="mb-12 space-y-6">
          <h2 className="text-xl font-semibold text-gray-100">コード例</h2>

          <div>
            <p className="text-gray-400 text-sm mb-2">ミックスインとinclude・extend・prepend</p>
            <RubyEditor
              defaultCode={`module Greetable
  def greet
    "こんにちは、#{name}です！"
  end
end

module Farewell
  def bye
    "さようなら！"
  end
end

class Person
  include Greetable
  extend  Farewell

  attr_reader :name

  def initialize(name)
    @name = name
  end
end

p = Person.new("太郎")
puts p.greet          # インスタンスメソッド
puts Person.bye       # クラスメソッド（extend）`}
              expectedOutput={`こんにちは、太郎です！
さようなら！`}
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">Comparableモジュールの活用</p>
            <RubyEditor
              defaultCode={`class Temperature
  include Comparable

  attr_reader :degrees

  def initialize(degrees)
    @degrees = degrees
  end

  def <=>(other)
    degrees <=> other.degrees
  end

  def to_s
    "#{degrees}°C"
  end
end

temps = [Temperature.new(30), Temperature.new(15), Temperature.new(22)]
puts temps.min
puts temps.max
puts temps.sort.map(&:to_s).inspect
puts Temperature.new(25).between?(Temperature.new(20), Temperature.new(30))`}
              expectedOutput={`15°C
30°C
["15°C", "22°C", "30°C"]
true`}
            />
          </div>
        </div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} color="cyan" />
      </div>
    </div>
  );
}
