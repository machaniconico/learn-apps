import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ProgressBar } from "@/components/progress-bar";
import { LessonList } from "@/components/lesson-list";
import { RubyEditor } from "@/components/ruby-editor";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const category = CATEGORIES.find((c) => c.id === "classes")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyでクラスを定義するキーワードはどれですか？",
    options: ["def", "class", "module", "struct"],
    answer: 1,
    explanation: "class キーワードを使ってクラスを定義します。",
  },
  {
    question: "インスタンス変数のプレフィックスはどれですか？",
    options: ["$", "@@", "@", "#"],
    answer: 2,
    explanation: "インスタンス変数は @ で始まります（例: @name）。",
  },
  {
    question: "attr_accessor が生成するメソッドはどれですか？",
    options: [
      "読み取りメソッドのみ",
      "書き込みメソッドのみ",
      "読み取りと書き込みの両方",
      "クラスメソッド",
    ],
    answer: 2,
    explanation: "attr_accessor はゲッター（読み取り）とセッター（書き込み）の両方を自動生成します。",
  },
  {
    question: "クラスメソッドを定義する正しい方法はどれですか？",
    options: [
      "def method_name",
      "def self.method_name",
      "def class.method_name",
      "class_def method_name",
    ],
    answer: 1,
    explanation: "クラスメソッドは def self.メソッド名 で定義します。",
  },
];

export default function ClassesPage() {
  const allLessons = getAllLessons();
  void allLessons;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-violet-400">
              クラスとオブジェクト
            </h1>
            <DifficultyBadge difficulty={category.difficulty} />
          </div>
          <p className="text-gray-400 text-lg mb-6">
            Rubyのオブジェクト指向プログラミングの中核となるクラスの定義・インスタンス変数・
            アクセサ・クラスメソッドなどを学習します。
          </p>
          <ProgressBar
            categoryId="classes"
            totalLessons={category.lessons.length}
            color="violet"
          />
        </div>

        {/* Lesson List */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">レッスン一覧</h2>
          <LessonList
            lessons={category.lessons}
            basePath="/learn/classes"
            color="violet"
            categoryId="classes"
          />
        </div>

        {/* Code Examples */}
        <div className="mb-12 space-y-6">
          <h2 className="text-xl font-semibold text-gray-100">コード例</h2>

          <div>
            <p className="text-gray-400 text-sm mb-2">クラスの基本定義とインスタンス化</p>
            <RubyEditor
              defaultCode={`class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age  = age
  end

  def greet
    "こんにちは、#{@name}（#{@age}歳）です。"
  end

  def self.species
    "Homo sapiens"
  end
end

alice = Person.new("Alice", 30)
puts alice.greet
puts Person.species
alice.age = 31
puts alice.age`}
              expectedOutput={`こんにちは、Alice（30歳）です。
Homo sapiens
31`}
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">オブジェクトの比較と複製</p>
            <RubyEditor
              defaultCode={`class Point
  attr_reader :x, :y

  def initialize(x, y)
    @x = x
    @y = y
  end

  def ==(other)
    x == other.x && y == other.y
  end
end

p1 = Point.new(1, 2)
p2 = Point.new(1, 2)
p3 = p1

puts p1 == p2   # => true (値が等しい)
puts p1.equal?(p2) # => false (別オブジェクト)
puts p1.equal?(p3) # => true (同じオブジェクト)

p4 = p1.dup
puts p1.equal?(p4) # => false (dupで複製)`}
              expectedOutput={`true
false
true
false`}
            />
          </div>
        </div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} color="violet" />
      </div>
    </div>
  );
}
