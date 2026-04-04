import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "classes")!;
const lessonId = "class-methods";

export default function ClassMethodsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">クラスとオブジェクト</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">クラスメソッド</h1>
          <p className="text-gray-400">
            クラスメソッドはインスタンスではなくクラス自体に対して呼び出すメソッドです。
            def self.メソッド名 または class &lt;&lt; self ブロックで定義します。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">クラスメソッドの定義方法</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <div>
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded">def self.method_name</code>
              <span className="ml-2">— 個別に定義する方法（最も一般的）</span>
            </div>
            <div>
              <code className="text-violet-400 bg-gray-800 px-2 py-0.5 rounded">class &lt;&lt; self</code>
              <span className="ml-2">— まとめて定義する方法（特異クラス）</span>
            </div>
          </div>
        </div>

        <RubyEditor
          defaultCode={`class Counter
  @@count = 0   # クラス変数

  def initialize
    @@count += 1
    @id = @@count
  end

  # クラスメソッド
  def self.count
    @@count
  end

  def self.reset
    @@count = 0
  end

  def id
    @id
  end
end

a = Counter.new
b = Counter.new
c = Counter.new
puts Counter.count  # => 3
puts a.id           # => 1
puts c.id           # => 3

Counter.reset
puts Counter.count  # => 0`}
          expectedOutput={`3
1
3
0`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">class &lt;&lt; self による定義</h2>
          <p className="text-gray-400 text-sm">
            複数のクラスメソッドをまとめて定義するときは
            <code className="text-violet-400 bg-gray-800 px-1 rounded mx-1">class &lt;&lt; self</code> ブロックが読みやすいです。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class MathHelper
  class << self
    def square(x) = x ** 2
    def cube(x)   = x ** 3
    def clamp(val, min, max)
      [[val, min].max, max].min
    end
  end
end

puts MathHelper.square(5)        # => 25
puts MathHelper.cube(3)          # => 27
puts MathHelper.clamp(15, 0, 10) # => 10
puts MathHelper.clamp(-5, 0, 10) # => 0

# クラスメソッドの確認
puts MathHelper.methods(false).sort.inspect`}
          expectedOutput={`25
27
10
0
[:clamp, :cube, :square]`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="classes" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/classes" />
      </div>
    </div>
  );
}
