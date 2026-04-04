import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ProgressBar } from "@/components/progress-bar";
import { LessonList } from "@/components/lesson-list";
import { RubyEditor } from "@/components/ruby-editor";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const category = CATEGORIES.find((c) => c.id === "inheritance")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Rubyで継承を表すのに使う記号はどれですか？",
    options: [">>", "extends", "<", ":"],
    answer: 2,
    explanation: "class Child < Parent のように < 演算子で親クラスを指定します。",
  },
  {
    question: "親クラスのメソッドを呼び出すキーワードはどれですか？",
    options: ["parent", "base", "super", "ancestor"],
    answer: 2,
    explanation: "super キーワードで親クラスの同名メソッドを呼び出せます。",
  },
  {
    question: "ダックタイピングの説明として正しいものはどれですか？",
    options: [
      "型を明示的に宣言する手法",
      "オブジェクトが必要なメソッドを持っていれば型は問わない",
      "Duckというクラスを継承する手法",
      "型変換を自動で行う仕組み",
    ],
    answer: 1,
    explanation: "ダックタイピングは「アヒルのように歩き、鳴くならアヒル」という考えで、型より振る舞いを重視します。",
  },
  {
    question: "抽象メソッドパターンで使う例外はどれですか？",
    options: [
      "AbstractError",
      "NotImplementedError",
      "AbstractMethodError",
      "MethodMissingError",
    ],
    answer: 1,
    explanation: "サブクラスで実装すべきメソッドに raise NotImplementedError を書くパターンが一般的です。",
  },
];

export default function InheritancePage() {
  const allLessons = getAllLessons();
  void allLessons;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-orange-400">
              継承
            </h1>
            <DifficultyBadge difficulty={category.difficulty} />
          </div>
          <p className="text-gray-400 text-lg mb-6">
            Rubyの継承機能を使って既存クラスを拡張する方法を学びます。
            superキーワード、メソッドオーバーライド、ダックタイピングまで幅広くカバーします。
          </p>
          <ProgressBar
            categoryId="inheritance"
            totalLessons={category.lessons.length}
            color="orange"
          />
        </div>

        {/* Lesson List */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">レッスン一覧</h2>
          <LessonList
            lessons={category.lessons}
            basePath="/learn/inheritance"
            color="orange"
            categoryId="inheritance"
          />
        </div>

        {/* Code Examples */}
        <div className="mb-12 space-y-6">
          <h2 className="text-xl font-semibold text-gray-100">コード例</h2>

          <div>
            <p className="text-gray-400 text-sm mb-2">継承とsuperの基本</p>
            <RubyEditor
              defaultCode={`class Animal
  def initialize(name)
    @name = name
  end

  def speak
    "..."
  end

  def to_s
    "#{self.class.name}(#{@name})"
  end
end

class Dog < Animal
  def speak
    "ワン！"
  end
end

class Cat < Animal
  def speak
    super + " (ニャー)"
  end
end

puts Dog.new("ポチ").speak
puts Cat.new("タマ").speak
puts Dog.ancestors.inspect`}
              expectedOutput={`ワン！
... (ニャー)
[Dog, Animal, Object, Kernel, BasicObject]`}
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">ダックタイピングとrespond_to?</p>
            <RubyEditor
              defaultCode={`class Duck
  def quack = "クワッ！"
  def walk  = "よちよち歩く"
end

class Person
  def quack = "クワッ！（まね）"
  def walk  = "二足歩行"
end

def make_it_quack(duck_like)
  if duck_like.respond_to?(:quack)
    puts duck_like.quack
  else
    puts "これはアヒルではありません"
  end
end

make_it_quack(Duck.new)
make_it_quack(Person.new)
make_it_quack("文字列")`}
              expectedOutput={`クワッ！
クワッ！（まね）
これはアヒルではありません`}
            />
          </div>
        </div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} color="orange" />
      </div>
    </div>
  );
}
