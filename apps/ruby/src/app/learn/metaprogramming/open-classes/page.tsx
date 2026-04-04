import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "metaprogramming")!.lessons;

export default function OpenClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">メタプログラミング レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オープンクラス</h1>
        <p className="text-gray-400">既存のクラスを再オープンしてメソッドを追加・変更するモンキーパッチングを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オープンクラスとモンキーパッチ</h2>
        <p className="text-gray-300 mb-3">
          Rubyでは組み込みクラス（String・Array・Integerなど）を含む既存クラスをいつでも再オープンできます。
          これにより既存クラスに新しいメソッドを追加できます（モンキーパッチ）。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>強力な機能だが、既存メソッドの上書きは危険</li>
          <li>RefinementsでスコープをモジュールやFileに限定できる</li>
          <li>Railsの<code className="bg-gray-800 px-1 rounded text-violet-300">ActiveSupport</code>はこれを多用している</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Stringクラスの拡張</h2>
        <RubyEditor
          defaultCode={`class String
  def palindrome?
    cleaned = downcase.gsub(/[^a-z0-9]/, '')
    cleaned == cleaned.reverse
  end

  def word_count
    split.length
  end

  def shout
    upcase + "!!!"
  end
end

puts "racecar".palindrome?
puts "A man a plan a canal Panama".palindrome?
puts "hello".palindrome?

puts "Hello World Ruby".word_count
puts "hello".shout`}
          expectedOutput={`true
true
false
3
HELLO!!!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: IntegerとArrayの拡張</h2>
        <RubyEditor
          defaultCode={`class Integer
  def factorial
    return 1 if self <= 1
    self * (self - 1).factorial
  end

  def times_do
    i = 0
    while i < self
      yield i
      i += 1
    end
  end
end

class Array
  def second
    self[1]
  end

  def average
    return 0.0 if empty?
    sum.to_f / length
  end
end

puts 5.factorial
puts 0.factorial

arr = [10, 20, 30, 40]
puts arr.second
puts arr.average`}
          expectedOutput={`120
1
20
25.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: Refinementsで安全にオープンクラス</h2>
        <RubyEditor
          defaultCode={`# Refinementsはスコープを限定したモンキーパッチ
module StringExtensions
  refine String do
    def to_bool
      case downcase
      when 'true', 'yes', '1' then true
      when 'false', 'no', '0' then false
      else raise ArgumentError, "Cannot convert '#{self}' to bool"
      end
    end
  end
end

# Refinementsはusingしたスコープ内でのみ有効
module MyApp
  using StringExtensions

  def self.run
    puts "true".to_bool
    puts "false".to_bool
    puts "yes".to_bool
  end
end

MyApp.run`}
          expectedOutput={`true
false
true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="metaprogramming" lessonId="open-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="open-classes" basePath="/learn/metaprogramming" />
    </div>
  );
}
