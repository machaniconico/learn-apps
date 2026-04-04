import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "methods")!.lessons;

export default function MethodBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドの基本</h1>
        <p className="text-gray-400">defキーワードを使ったメソッド定義の基本を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドとは</h2>
        <p className="text-gray-300 mb-4">
          メソッドは再利用可能な処理のまとまりです。
          <code className="bg-gray-800 px-1 rounded text-teal-300">def</code>で定義し、
          <code className="bg-gray-800 px-1 rounded text-teal-300">end</code>で終了します。
          Rubyのメソッド名はスネークケース（snake_case）が慣例です。
        </p>
        <ul className="space-y-2 text-gray-400">
          <li>メソッド名は小文字またはアンダースコアで始まる</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">?</code>で終わる名前: 真偽値を返すメソッド（述語メソッド）</li>
          <li><code className="bg-gray-800 px-1.5 py-0.5 rounded">!</code>で終わる名前: 破壊的メソッド（レシーバを変更する）</li>
          <li>最後に評価された式が暗黙の戻り値になる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なメソッド定義</h2>
        <RubyEditor
          defaultCode={`# 引数なしメソッド
def say_hello
  puts "こんにちは！"
end

say_hello

# 引数ありメソッド
def greet(name)
  puts "こんにちは、#{name}さん！"
end

greet("Alice")
greet("Bob")

# 戻り値を使う
def add(a, b)
  a + b  # 暗黙の戻り値
end

result = add(3, 4)
puts "3 + 4 = #{result}"`}
          expectedOutput={`こんにちは！
こんにちは、Aliceさん！
こんにちは、Bobさん！
3 + 4 = 7`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 述語メソッドと破壊的メソッド</h2>
        <RubyEditor
          defaultCode={`# ? で終わる述語メソッド
def even?(n)
  n % 2 == 0
end

puts even?(4)   # true
puts even?(7)   # false

# 組み込みの述語メソッド
puts "hello".empty?   # false
puts [].empty?        # true
puts 5.zero?          # false
puts nil.nil?         # true

# ! で終わる破壊的メソッド
arr = [3, 1, 4, 1, 5, 9]
arr.sort!  # 元の配列を変更
puts arr.inspect  # [1, 1, 3, 4, 5, 9]`}
          expectedOutput={`true
false
false
true
false
true
[1, 1, 3, 4, 5, 9]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: メソッドの高度な特性</h2>
        <RubyEditor
          defaultCode={`# メソッドはオブジェクト
def double(x)
  x * 2
end

m = method(:double)
puts m.call(5)    # 10
puts m.class      # Method

# メソッドをmapに渡す
numbers = [1, 2, 3, 4, 5]
puts numbers.map(&method(:double)).inspect

# aliasでメソッドに別名をつける
def calculate_area(radius)
  Math::PI * radius ** 2
end

alias area calculate_area
puts area(5).round(2)  # 78.54`}
          expectedOutput={`10
Method
[2, 4, 6, 8, 10]
78.54`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/methods" />
    </div>
  );
}
