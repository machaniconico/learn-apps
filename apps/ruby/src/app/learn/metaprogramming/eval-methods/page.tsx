import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "metaprogramming")!.lessons;

export default function EvalMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">メタプログラミング レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">eval系メソッド</h1>
        <p className="text-gray-400">class_eval・instance_eval・module_evalを使ったコードの動的評価を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">evalメソッドの種類</h2>
        <p className="text-gray-300 mb-3">
          Rubyにはコンテキストを変えてブロックを評価するeval系メソッドがあります。
          selfが変わることで、そのスコープでしか書けない操作が可能になります。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">class_eval / module_eval</code> — クラス・モジュールのコンテキストで評価</li>
          <li><code className="bg-gray-800 px-1 rounded text-violet-300">instance_eval</code> — 特定インスタンスのコンテキストで評価</li>
          <li>文字列evalは危険なので原則ブロック形式を使う</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: class_evalでメソッドを追加</h2>
        <RubyEditor
          defaultCode={`class Dog; end

# class_evalでクラスにメソッドを動的追加
Dog.class_eval do
  def initialize(name)
    @name = name
  end

  def speak
    puts "#{@name}がワンワン！"
  end

  def self.species
    puts "イヌ科"
  end
end

dog = Dog.new("ポチ")
dog.speak
Dog.species

# 外部からクラスを拡張するユーティリティ
def add_greeting(klass, greeting)
  klass.class_eval do
    define_method(:greet) { puts greeting }
  end
end

add_greeting(Dog, "はじめまして！")
dog.greet`}
          expectedOutput={`ポチがワンワン！
イヌ科
はじめまして！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: instance_evalでオブジェクトを設定</h2>
        <RubyEditor
          defaultCode={`class Configuration
  attr_reader :host, :port, :debug

  def initialize(&block)
    @host  = "localhost"
    @port  = 3000
    @debug = false
    instance_eval(&block) if block_given?
  end

  def host=(val)  = @host  = val
  def port=(val)  = @port  = val
  def debug=(val) = @debug = val
end

config = Configuration.new do
  self.host  = "example.com"
  self.port  = 8080
  self.debug = true
end

puts config.host
puts config.port
puts config.debug`}
          expectedOutput={`example.com
8080
true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: module_evalで動的にmixin</h2>
        <RubyEditor
          defaultCode={`module Serializable
  def to_hash
    instance_variables.each_with_object({}) do |var, hash|
      key = var.to_s.delete("@").to_sym
      hash[key] = instance_variable_get(var)
    end
  end
end

class User
  attr_accessor :name, :email, :age

  def initialize(name, email, age)
    @name = name
    @email = email
    @age = age
  end
end

# module_evalでモジュールのコンテキストからinclude
User.module_eval { include Serializable }

user = User.new("Bob", "bob@example.com", 25)
puts user.to_hash.inspect`}
          expectedOutput={`{:name=>"Bob", :email=>"bob@example.com", :age=>25}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="metaprogramming" lessonId="eval-methods" />
      </div>
      <LessonNav lessons={lessons} currentId="eval-methods" basePath="/learn/metaprogramming" />
    </div>
  );
}
