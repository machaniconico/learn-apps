import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "modules")!;
const lessonId = "enumerable";

export default function EnumerablePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-medium mb-2">モジュール</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">Enumerable</h1>
          <p className="text-gray-400">
            Enumerable モジュールは each メソッドさえ実装すれば
            map、select、reject、reduce、sort など多数のコレクション操作メソッドを自動的に提供します。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">Enumerable の使い方</h2>
          <p className="text-gray-400 text-sm mb-4">
            <code className="text-cyan-400 bg-gray-800 px-1 rounded">include Enumerable</code> して
            <code className="text-cyan-400 bg-gray-800 px-1 rounded mx-1">each</code> を定義するだけで
            50以上のメソッドが使えるようになります。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>each を定義することが唯一の要件</li>
            <li>sort_by、min_by、max_by には {"<=>"} も実装する</li>
            <li>Array や Hash も Enumerable を include している</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`class NumberRange
  include Enumerable

  def initialize(from, to, step = 1)
    @from = from
    @to   = to
    @step = step
  end

  def each
    current = @from
    while current <= @to
      yield current
      current += @step
    end
  end
end

r = NumberRange.new(1, 10)

puts r.to_a.inspect
puts r.select(&:even?).inspect
puts r.map { |n| n ** 2 }.inspect
puts r.sum
puts r.min
puts r.max
puts r.count
puts r.include?(7)`}
          expectedOutput={`[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[2, 4, 6, 8, 10]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
55
1
10
10
true`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">カスタムコレクションの実装</h2>
          <p className="text-gray-400 text-sm">
            Enumerable を使って実用的なカスタムコレクションクラスを作れます。
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
    count <=> other.count
  end
end

wc = WordCollection.new("Ruby", "is", "awesome", "and", "fun")

puts wc.count
puts wc.sort.inspect
puts wc.select { |w| w.length > 3 }.inspect
puts wc.map(&:upcase).inspect
puts wc.min_by(&:length)
puts wc.max_by(&:length)
puts wc.group_by(&:length).inspect`}
          expectedOutput={`5
["Ruby", "and", "awesome", "fun", "is"]
["Ruby", "awesome"]
["RUBY", "IS", "AWESOME", "AND", "FUN"]
is
awesome
{4=>["Ruby"], 2=>["is"], 7=>["awesome"], 3=>["and", "fun"]}`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="modules" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/modules" />
      </div>
    </div>
  );
}
