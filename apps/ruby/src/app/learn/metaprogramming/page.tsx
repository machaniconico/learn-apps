import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "metaprogramming")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "method_missingが呼ばれるのはどのタイミングですか？",
    options: [
      "メソッドが正常に実行されたとき",
      "定義されていないメソッドが呼び出されたとき",
      "メソッドが引数エラーを起こしたとき",
      "クラスが初期化されたとき",
    ],
    answer: 1,
    explanation: "method_missingは存在しないメソッドが呼ばれたときにRubyが自動的に呼び出すフックメソッドです。",
  },
  {
    question: "define_methodの用途として正しいものはどれですか？",
    options: [
      "既存メソッドを削除する",
      "メソッドを動的に定義する",
      "メソッドの引数を検証する",
      "クラスメソッドを呼び出す",
    ],
    answer: 1,
    explanation: "define_methodはブロックを受け取り、実行時に動的にメソッドを定義できます。",
  },
  {
    question: "オープンクラスとは何ですか？",
    options: [
      "abstractとして宣言されたクラス",
      "publicメソッドのみを持つクラス",
      "既存クラスを再オープンしてメソッドを追加・変更すること",
      "継承元のないクラス",
    ],
    answer: 2,
    explanation: "Rubyではいつでも既存クラスを再オープンしてメソッドを追加したり変更したりできます（モンキーパッチ）。",
  },
  {
    question: "respond_to?メソッドは何を返しますか？",
    options: [
      "メソッドのソースコード",
      "メソッドの引数リスト",
      "オブジェクトがそのメソッドに応答できるかどうかのbool値",
      "メソッドの実行結果",
    ],
    answer: 2,
    explanation: "respond_to?はオブジェクトが指定したメソッドを持つかどうかをtrueまたはfalseで返します。",
  },
];

export default function MetaprogrammingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">メタプログラミング</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyのメタプログラミング機能を学びましょう。method_missing・define_method・オープンクラス・リフレクションなど、
          コードを動的に生成・変更する強力なテクニックを習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="metaprogramming" totalLessons={6} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/metaprogramming" color="violet" categoryId="metaprogramming" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: method_missingとdefine_method</h2>
        <RubyEditor
          defaultCode={`# method_missing: 存在しないメソッドをキャッチ
class DynamicClass
  def method_missing(name, *args)
    if name.to_s.start_with?("say_")
      word = name.to_s.sub("say_", "")
      puts "#{word}!"
    else
      super
    end
  end

  def respond_to_missing?(name, include_private = false)
    name.to_s.start_with?("say_") || super
  end
end

obj = DynamicClass.new
obj.say_hello
obj.say_ruby
puts obj.respond_to?(:say_world)

# define_method: 動的にメソッドを定義
class Animal
  ["cat", "dog", "bird"].each do |animal|
    define_method("is_#{animal}?") do
      self.class.name.downcase == animal
    end
  end
end

puts Animal.new.is_cat?`}
          expectedOutput={`hello!
ruby!
true
false`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: オープンクラスとリフレクション</h2>
        <RubyEditor
          defaultCode={`# オープンクラス: 既存クラスを拡張
class String
  def palindrome?
    self == self.reverse
  end
end

puts "racecar".palindrome?
puts "hello".palindrome?

# リフレクション
class Person
  attr_accessor :name, :age
  def initialize(name, age)
    @name = name
    @age = age
  end
  def greet
    "Hi, I'm #{@name}"
  end
end

p = Person.new("Alice", 30)
puts p.respond_to?(:greet)
puts p.instance_variables.inspect
puts p.public_methods(false).sort.inspect`}
          expectedOutput={`true
false
true
[:@age, :@name]
[:age, :age=, :greet, :name, :name=]`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
