import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "advanced")!.lessons;

export default function OpaqueTypesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">上級機能</span>
        <h1 className="text-3xl font-bold text-gray-100">Opaque型</h1>
        <p className="text-gray-400">some Protocol による opaque 戻り値型を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">some Protocol</code> は
          Opaque型（不透明型）と呼ばれ、Swift 5.1で導入されました。
          戻り値の具体的な型を隠しつつ、コンパイラは型を把握しているためパフォーマンスが高いです。
          SwiftUIの <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">var body: some View</code> がその典型例です。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`protocol Shape {
    func area() -> Double
    func describe() -> String
}

struct Circle: Shape {
    let radius: Double
    func area() -> Double { .pi * radius * radius }
    func describe() -> String { "Circle(r=\\(radius))" }
}

struct Rectangle: Shape {
    let width: Double
    let height: Double
    func area() -> Double { width * height }
    func describe() -> String { "Rect(\\(width)x\\(height))" }
}

// some Shape: 戻り値型は常に同じ具体型（コンパイル時確定）
func makeDefaultShape() -> some Shape {
    Circle(radius: 5.0)  // 常にCircleを返す
}

let shape = makeDefaultShape()
print(shape.area())      // 78.53981633974483
print(shape.describe())  // Circle(r=5.0)

// コンパイラは具体型を知っているので型安全
// let shape2: Circle = makeDefaultShape()  // OK（型推論で Circle）`}
        height="300px"
        expectedOutput="78.53981633974483\nCircle(r=5.0)"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">some と any の違い</h2>
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">some</code> はコンパイル時に1つの型に固定、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">any</code> は実行時に異なる型を保持できます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`protocol Drawable {
    func draw() -> String
}

struct Star: Drawable {
    func draw() -> String { "★" }
}

struct Heart: Drawable {
    func draw() -> String { "♥" }
}

// some Drawable: 同じ関数は常に同じ型を返す必要がある
func makeStar() -> some Drawable { Star() }

// any Drawable: 異なる型を返せる（実行時コスト）
func makeShape(isStar: Bool) -> any Drawable {
    isStar ? Star() : Heart()
}

let s1 = makeStar()
print(s1.draw())  // ★

let s2 = makeShape(isStar: true)
let s3 = makeShape(isStar: false)
print(s2.draw())  // ★
print(s3.draw())  // ♥

// 配列に混在させるには any が必要
let shapes: [any Drawable] = [Star(), Heart(), Star()]
print(shapes.map { $0.draw() }.joined())  // ★♥★`}
        height="300px"
        expectedOutput="★\n★\n♥\n★♥★"
      />

      <SwiftEditor
        defaultCode={`// SwiftUI の body は some View の典型例
// SwiftUI が使う仕組みを模倣

protocol View {
    associatedtype Body: View
    var body: Body { get }
}

struct Text: View {
    typealias Body = Never
    let content: String
    var body: Never { fatalError() }
    func render() -> String { content }
}

// some View を使う例
// struct MyView: View {
//     var body: some View {  // 具体型は Text（コンパイラが推論）
//         Text("Hello")
//     }
// }

// opaque 型は「型の逆転」とも呼ばれる
// any：呼び出し側が型を知らない（existential）
// some：実装側が型を選ぶが呼び出し側には隠れる（opaque）

protocol Animal {
    associatedtype Sound  // associated type を持つプロトコル
    func makeSound() -> Sound
}

struct Dog: Animal {
    func makeSound() -> String { "Woof" }
}

// associated type があると any Animal は使えないが
// some Animal なら OK（Swift 5.7+では any も使える）
func getDog() -> some Animal {
    Dog()
}

let dog = getDog()
print(dog.makeSound())  // Woof`}
        height="360px"
        expectedOutput="Woof"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="advanced" lessonId="opaque-types" />
      </div>
      <LessonNav lessons={lessons} currentId="opaque-types" basePath="/learn/advanced" />
    </div>
  );
}
