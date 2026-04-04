import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "metaprogramming")!.lessons;

export default function DefineMethodPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">メタプログラミング レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">define_method</h1>
        <p className="text-gray-400">define_methodを使って動的にメソッドを定義する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">define_methodとは</h2>
        <p className="text-gray-300 mb-3">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-violet-300">define_method</code>はModule/Classのメソッドで、
          実行時にメソッドを動的に定義できます。ブロックがメソッドの本体になります。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>繰り返しの似たメソッドをDRYに書ける</li>
          <li>変数をクロージャとしてキャプチャできる</li>
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">class_eval</code>内でも使用可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なdefine_method</h2>
        <RubyEditor
          defaultCode={`class Greeter
  ["english", "japanese", "french"].each_with_index do |lang, i|
    messages = ["Hello!", "こんにちは！", "Bonjour!"]
    define_method("greet_in_#{lang}") do
      puts messages[i]
    end
  end
end

g = Greeter.new
g.greet_in_english
g.greet_in_japanese
g.greet_in_french`}
          expectedOutput={`Hello!
こんにちは！
Bonjour!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: アクセサを動的に生成</h2>
        <RubyEditor
          defaultCode={`class Person
  ATTRIBUTES = [:name, :age, :email]

  ATTRIBUTES.each do |attr|
    # ゲッター
    define_method(attr) do
      instance_variable_get("@#{attr}")
    end

    # セッター
    define_method("#{attr}=") do |value|
      instance_variable_set("@#{attr}", value)
    end
  end
end

person = Person.new
person.name = "Alice"
person.age = 30
person.email = "alice@example.com"

puts person.name
puts person.age
puts person.email`}
          expectedOutput={`Alice
30
alice@example.com`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 状態チェックメソッドの自動生成</h2>
        <RubyEditor
          defaultCode={`class TrafficLight
  STATES = [:red, :yellow, :green]

  attr_reader :state

  def initialize(state = :red)
    @state = state
  end

  STATES.each do |s|
    define_method("#{s}?") do
      @state == s
    end
  end

  def change_to(new_state)
    raise ArgumentError unless STATES.include?(new_state)
    @state = new_state
  end
end

light = TrafficLight.new(:red)
puts light.red?
puts light.green?

light.change_to(:green)
puts light.red?
puts light.green?`}
          expectedOutput={`true
false
false
true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="metaprogramming" lessonId="define-method" />
      </div>
      <LessonNav lessons={lessons} currentId="define-method" basePath="/learn/metaprogramming" />
    </div>
  );
}
