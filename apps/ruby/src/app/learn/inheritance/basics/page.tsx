import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "inheritance")!;
const lessonId = "basics";

export default function InheritanceBasicsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-orange-400 text-sm font-medium mb-2">継承</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">継承の基本</h1>
          <p className="text-gray-400">
            継承を使うと既存クラスの機能を引き継いで新しいクラスを作れます。
            Ruby は単一継承のみサポートし、&lt; 演算子で親クラスを指定します。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">継承の基本構文</h2>
          <p className="text-gray-400 text-sm mb-4">
            <code className="text-orange-400 bg-gray-800 px-1 rounded">class Child &lt; Parent</code> で
            Parent クラスを継承した Child クラスを定義します。
            子クラスは親クラスのすべてのメソッドとインスタンス変数にアクセスできます。
          </p>
          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
            <li>is_a? でインスタンスの型を確認できる</li>
            <li>ancestors でクラスの継承チェーンを確認できる</li>
            <li>superclass で直接の親クラスを取得できる</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`class Vehicle
  attr_reader :make, :model, :year

  def initialize(make, model, year)
    @make  = make
    @model = model
    @year  = year
  end

  def info
    "#{year} #{make} #{model}"
  end

  def start
    "エンジン始動"
  end
end

class Car < Vehicle
  attr_reader :doors

  def initialize(make, model, year, doors = 4)
    super(make, model, year)
    @doors = doors
  end

  def info
    super + " (#{doors}ドア)"
  end
end

car = Car.new("Toyota", "Corolla", 2023)
puts car.info
puts car.start        # 親クラスのメソッドを継承
puts car.is_a?(Car)       # => true
puts car.is_a?(Vehicle)   # => true
puts Car.superclass       # => Vehicle
puts Car.ancestors.inspect`}
          expectedOutput={`2023 Toyota Corolla (4ドア)
エンジン始動
true
true
Vehicle
[Car, Vehicle, Object, Kernel, BasicObject]`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">継承の階層</h2>
          <p className="text-gray-400 text-sm">
            Ruby のすべてのクラスは Object を継承します。
            継承チェーンの頂点は BasicObject です。
          </p>
        </div>

        <RubyEditor
          defaultCode={`class Animal
  def breathe = "呼吸する"
end

class Mammal < Animal
  def warm_blooded? = true
end

class Dog < Mammal
  def bark = "ワン！"
end

dog = Dog.new
puts dog.bark
puts dog.breathe           # Animal のメソッド
puts dog.warm_blooded?     # Mammal のメソッド

puts Dog.ancestors.inspect`}
          expectedOutput={`ワン！
呼吸する
true
[Dog, Mammal, Animal, Object, Kernel, BasicObject]`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="inheritance" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/inheritance" />
      </div>
    </div>
  );
}
