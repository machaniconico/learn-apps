import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "classes")!;
const lessonId = "self-keyword";

export default function SelfKeywordPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">クラスとオブジェクト</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">self</h1>
          <p className="text-gray-400">
            self はコードが実行されているコンテキストの現在のオブジェクトを参照します。
            どのスコープにいるかによって self が指すオブジェクトが変わります。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">self の参照先</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>トップレベル</span>
              <code className="text-violet-400">main (Object のインスタンス)</code>
            </div>
            <div className="flex justify-between">
              <span>クラス定義内</span>
              <code className="text-violet-400">クラス自身</code>
            </div>
            <div className="flex justify-between">
              <span>インスタンスメソッド内</span>
              <code className="text-violet-400">レシーバのインスタンス</code>
            </div>
            <div className="flex justify-between">
              <span>クラスメソッド内</span>
              <code className="text-violet-400">クラス自身</code>
            </div>
          </div>
        </div>

        <RubyEditor
          defaultCode={`puts self        # => main
puts self.class  # => Object

class MyClass
  puts self      # => MyClass (クラス定義内)

  def instance_method
    puts self        # => #<MyClass:0x...>
    puts self.class  # => MyClass
  end

  def self.class_method
    puts self        # => MyClass
  end
end

obj = MyClass.new
obj.instance_method
MyClass.class_method`}
          expectedOutput={`main
Object
MyClass
#<MyClass:0x...>
MyClass
MyClass`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">self を使う場面</h2>
          <p className="text-gray-400 text-sm">
            セッターメソッドを呼ぶとき、メソッドチェーンでselfを返すとき、
            クラスメソッド定義でよく使います。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Builder
  def initialize
    @items = []
  end

  def add(item)
    @items << item
    self  # selfを返してメソッドチェーンを可能にする
  end

  def build
    @items.join(", ")
  end
end

# メソッドチェーン
result = Builder.new
  .add("Ruby")
  .add("Python")
  .add("Go")
  .build

puts result

# セッターでのself利用
class Person
  attr_writer :name

  def initialize(name)
    self.name = name  # selfなしだとローカル変数の代入になる
  end

  def name = @name
end

puts Person.new("Alice").name`}
          expectedOutput={`Ruby, Python, Go
Alice`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="classes" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/classes" />
      </div>
    </div>
  );
}
