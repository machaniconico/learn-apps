import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "enumerable")!;

export default function CustomEnumerablePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-teal-400">Enumerable</p>
        <h1 className="text-3xl font-bold text-gray-100">カスタムEnumerable</h1>
        <p className="text-gray-400">
          独自のクラスにEnumerableモジュールをincludeして、map・select・reduceなどを使えるようにする方法を学びます。eachメソッドを定義するだけで全Enumerableメソッドが使えます。
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">Enumerable のinclude</h2>
        <p className="text-gray-400 text-sm">
          クラスに <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">include Enumerable</code> して
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">each</code> メソッドを定義するだけで、
          map・select・reduce・sort・min・maxなど50以上のメソッドが自動的に使えるようになります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`class NumberRange
  include Enumerable

  def initialize(start, finish)
    @start = start
    @finish = finish
  end

  def each
    current = @start
    while current <= @finish
      yield current
      current += 1
    end
  end
end

range = NumberRange.new(1, 10)

puts range.map { |n| n * 2 }.inspect
puts range.select(&:odd?).inspect
puts range.reduce(:+)
puts range.min
puts range.max
puts range.sort_by { |n| -n }.first(3).inspect`}
        expectedOutput={`[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
[1, 3, 5, 7, 9]
55
1
10
[10, 9, 8]`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">実用的なカスタムコレクション</h2>
        <p className="text-gray-400 text-sm">
          ツリー構造やグラフなど独自のデータ構造にEnumerableを実装する例です。
          eachが走査順を定義するため、Enumerableメソッドの動作が決まります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`class WordCollection
  include Enumerable
  include Comparable

  def initialize(*words)
    @words = words
  end

  def each(&block)
    @words.each(&block)
  end

  def <=>(other)
    to_a.length <=> other.to_a.length
  end

  def to_s
    "WordCollection(#{@words.join(', ')})"
  end
end

wc = WordCollection.new("apple", "banana", "cherry", "date", "elderberry")

puts "単語数: #{wc.count}"
puts "最長: #{wc.max_by(&:length)}"
puts "ソート済み: #{wc.sort.inspect}"
puts "5文字以上: #{wc.select { |w| w.length >= 5 }.inspect}"
puts "文字数マップ: #{wc.map { |w| [w, w.length] }.to_h.inspect}"
puts "全文字数: #{wc.sum(&:length)}"`}
        expectedOutput={`単語数: 5
最長: elderberry
ソート済み: ["apple", "banana", "cherry", "date", "elderberry"]
5文字以上: ["apple", "banana", "cherry", "elderberry"]
文字数マップ: {"apple"=>5, "banana"=>6, "cherry"=>6, "date"=>4, "elderberry"=>10}
全文字数: 31`}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-100">Comparable との組み合わせ</h2>
        <p className="text-gray-400 text-sm">
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">include Comparable</code> と <code className="bg-gray-800 px-1.5 py-0.5 rounded text-teal-300">&lt;=&gt;</code> を定義すると、
          比較演算子（&lt;、&gt;、&lt;=、&gt;=）やclamp・between?が使えるようになります。
        </p>
      </div>

      <RubyEditor
        defaultCode={`class Temperature
  include Comparable

  attr_reader :value

  def initialize(value)
    @value = value
  end

  def <=>(other)
    @value <=> other.value
  end

  def to_s
    "#{@value}°C"
  end
end

temps = [
  Temperature.new(25),
  Temperature.new(10),
  Temperature.new(35),
  Temperature.new(18),
  Temperature.new(30),
]

puts "最高気温: #{temps.max}"
puts "最低気温: #{temps.min}"
puts "ソート: #{temps.sort.map(&:to_s).inspect}"
puts "20度以上: #{temps.select { |t| t.value >= 20 }.map(&:to_s).inspect}"

t = Temperature.new(25)
puts t.between?(Temperature.new(20), Temperature.new(30))`}
        expectedOutput={`最高気温: 35°C
最低気温: 10°C
ソート: ["10°C", "18°C", "25°C", "30°C", "35°C"]
20度以上: ["25°C", "35°C", "30°C"]
true`}
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="enumerable" lessonId="custom-enumerable" />
      </div>

      <LessonNav
        lessons={category.lessons}
        currentId="custom-enumerable"
        basePath="/learn/enumerable"
      />
    </div>
  );
}
