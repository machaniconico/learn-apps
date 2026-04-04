import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "protocols")!.lessons;

export default function ExistentialPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロトコル レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">存在型</h1>
        <p className="text-gray-400">anyキーワードと存在型を使ってプロトコルを動的に扱う方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">存在型（Existential Type）とは</h2>
        <p className="text-gray-300 mb-3">
          Swift 5.7以降、プロトコルを型として使う際は <code className="text-teal-300">any</code> キーワードが必要です。
          これを存在型と呼びます。対して <code className="text-teal-300">some</code> キーワードは不透明型（Opaque Type）を表し、
          コンパイル時に具体的な型が決まります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">any Protocol</code> — 実行時に異なる型を格納できる（存在型）</li>
          <li><code className="text-teal-300">some Protocol</code> — コンパイル時に型が固定される（不透明型）</li>
          <li>存在型はボックス化によるオーバーヘッドがある</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: any キーワードの使い方</h2>
        <SwiftEditor
          defaultCode={`protocol Shape {
    func area() -> Double
    func name() -> String
}

struct Circle: Shape {
    var radius: Double
    func area() -> Double { Double.pi * radius * radius }
    func name() -> String { "円" }
}

struct Square: Shape {
    var side: Double
    func area() -> Double { side * side }
    func name() -> String { "正方形" }
}

// any Shape: 実行時に異なる型を保持
let shapes: [any Shape] = [
    Circle(radius: 3),
    Square(side: 4),
    Circle(radius: 1.5),
]

for shape in shapes {
    print("\\(shape.name()): 面積 = \\(String(format: "%.2f", shape.area()))")
}

let total = shapes.reduce(0) { $0 + $1.area() }
print("合計面積: \\(String(format: "%.2f", total))")`}
          expectedOutput={`円: 面積 = 28.27
正方形: 面積 = 16.00
円: 面積 = 7.07
合計面積: 51.34`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: some vs any の違い</h2>
        <SwiftEditor
          defaultCode={`protocol Printable {
    func printMe()
}

struct Dog: Printable {
    func printMe() { print("🐶 Dog") }
}

struct Cat: Printable {
    func printMe() { print("🐱 Cat") }
}

// some: 戻り値は常に同じ具体的な型
func makeDog() -> some Printable {
    return Dog()
}

// any: 実行時に異なる型を返せる
func makeAnimal(isDog: Bool) -> any Printable {
    if isDog { return Dog() }
    return Cat()
}

makeDog().printMe()
makeAnimal(isDog: true).printMe()
makeAnimal(isDog: false).printMe()`}
          expectedOutput={`🐶 Dog
🐶 Dog
🐱 Cat`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="protocols" lessonId="existential" />
      </div>
      <LessonNav lessons={lessons} currentId="existential" basePath="/learn/protocols" />
    </div>
  );
}
