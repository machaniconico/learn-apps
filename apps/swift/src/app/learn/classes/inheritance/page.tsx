import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "classes")!.lessons;

export default function InheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">継承</h1>
        <p className="text-gray-400">親クラスのプロパティとメソッドを子クラスに引き継ぐ継承の仕組みを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">継承とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          継承とは、既存のクラス（親クラス・スーパークラス）のプロパティやメソッドを新しいクラス（子クラス・サブクラス）に引き継ぐ機能です。
          Swiftでは<code className="text-red-300">class 子クラス: 親クラス</code>のように<code className="text-red-300">:</code>を使って継承を指定します。
          子クラスは親クラスの機能をすべて持ちつつ、独自の機能を追加したり既存の機能を変更したりできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">class 子: 親</code> — 継承の宣言</li>
          <li><code className="text-red-300">super</code> — 親クラスのプロパティ・メソッドへのアクセス</li>
          <li><code className="text-red-300">super.init()</code> — 親クラスのイニシャライザの呼び出し</li>
          <li>Swiftは単一継承のみサポート（親クラスは1つだけ）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">superキーワード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          子クラス内で<code className="text-red-300">super</code>キーワードを使うと、親クラスのメソッドやプロパティにアクセスできます。
          特にイニシャライザでは、子クラス独自のプロパティを初期化した後に<code className="text-red-300">super.init()</code>を呼び出す必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">super.methodName()</code> — 親クラスのメソッド呼び出し</li>
          <li><code className="text-red-300">super.propertyName</code> — 親クラスのプロパティアクセス</li>
          <li>指定イニシャライザは必ず<code className="text-red-300">super.init()</code>を呼ぶ必要がある</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">継承チェーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラスは複数のレベルで継承できます。AがBを継承し、BがCを継承するような継承チェーンを作ることができます。
          下位のクラスは上位クラスのすべてのプロパティとメソッドにアクセスできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>継承チェーンは何段階でも作れる</li>
          <li>子クラスのインスタンスは親クラスの型としても扱える</li>
          <li>深い継承チェーンは複雑さを増すので適度に設計する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的な継承</h2>
        <SwiftEditor
          defaultCode={`// 親クラス
class Animal {
    var name: String
    var sound: String

    init(name: String, sound: String) {
        self.name = name
        self.sound = sound
    }

    func speak() {
        print("\\(name): \\(sound)!")
    }

    func describe() {
        print("動物の名前: \\(name)")
    }
}

// 子クラス（Animalを継承）
class Dog: Animal {
    var breed: String

    init(name: String, breed: String) {
        self.breed = breed
        super.init(name: name, sound: "ワン")
    }

    func fetch() {
        print("\\(name)がボールを取ってきました！")
    }
}

class Cat: Animal {
    var isIndoor: Bool

    init(name: String, isIndoor: Bool) {
        self.isIndoor = isIndoor
        super.init(name: name, sound: "ニャー")
    }
}

let dog = Dog(name: "ポチ", breed: "柴犬")
dog.speak()      // 親クラスのメソッド
dog.describe()   // 親クラスのメソッド
dog.fetch()      // 子クラス独自のメソッド
print("犬種: \\(dog.breed)")

let cat = Cat(name: "タマ", isIndoor: true)
cat.speak()`}
          expectedOutput={`ポチ: ワン!
動物の名前: ポチ
ポチがボールを取ってきました！
犬種: 柴犬
タマ: ニャー!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 継承チェーン（複数段階）</h2>
        <SwiftEditor
          defaultCode={`class Vehicle {
    var brand: String
    var speed: Double

    init(brand: String, speed: Double) {
        self.brand = brand
        self.speed = speed
    }

    func describe() {
        print("ブランド: \\(brand), 最高速度: \\(speed)km/h")
    }
}

class Car: Vehicle {
    var doors: Int

    init(brand: String, speed: Double, doors: Int) {
        self.doors = doors
        super.init(brand: brand, speed: speed)
    }

    func honk() {
        print("\\(brand): プップー！")
    }
}

// CarはVehicleも継承している
class ElectricCar: Car {
    var batteryCapacity: Double

    init(brand: String, speed: Double, doors: Int, battery: Double) {
        self.batteryCapacity = battery
        super.init(brand: brand, speed: speed, doors: doors)
    }

    func charge() {
        print("\\(brand)を充電中... バッテリー: \\(batteryCapacity)kWh")
    }
}

let tesla = ElectricCar(brand: "Tesla", speed: 250, doors: 4, battery: 100)
tesla.describe()   // Vehicleのメソッド
tesla.honk()       // Carのメソッド
tesla.charge()     // ElectricCarのメソッド
print("ドア数: \\(tesla.doors)")`}
          expectedOutput={`ブランド: Tesla, 最高速度: 250.0km/h
Tesla: プップー！
Teslaを充電中... バッテリー: 100.0kWh
ドア数: 4`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 親クラスのメソッドを拡張する</h2>
        <SwiftEditor
          defaultCode={`class Shape {
    var color: String

    init(color: String) {
        self.color = color
    }

    func area() -> Double {
        return 0.0
    }

    func describe() {
        print("色: \\(color), 面積: \\(area())")
    }
}

class Circle: Shape {
    var radius: Double

    init(color: String, radius: Double) {
        self.radius = radius
        super.init(color: color)
    }

    override func area() -> Double {
        return Double.pi * radius * radius
    }
}

class Square: Shape {
    var side: Double

    init(color: String, side: Double) {
        self.side = side
        super.init(color: color)
    }

    override func area() -> Double {
        return side * side
    }
}

let shapes: [Shape] = [
    Circle(color: "赤", radius: 5.0),
    Square(color: "青", side: 4.0),
    Circle(color: "緑", radius: 3.0),
]

for shape in shapes {
    shape.describe()
}`}
          expectedOutput={`色: 赤, 面積: 78.53981633974483
色: 青, 面積: 16.0
色: 緑, 面積: 28.274333882308138`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="inheritance" />
      </div>
      <LessonNav lessons={lessons} currentId="inheritance" basePath="/learn/classes" />
    </div>
  );
}
