import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "protocols")!.lessons;

export default function CompositionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロトコル レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロトコル合成</h1>
        <p className="text-gray-400">複数のプロトコルを&amp;で合成し、型制約として活用します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロトコル合成とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-300">Protocol1 &amp; Protocol2</code> の構文を使うことで、複数のプロトコルに同時に準拠した型を要求できます。
          新しい型を定義せずに一時的な型制約として機能するため、コードを簡潔に保てます。
          関数引数・変数型・ジェネリクス制約など、型が現れる場所ならどこでも使用可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">Protocol1 &amp; Protocol2</code> — 両方に準拠した型を要求</li>
          <li><code className="text-teal-300">some P1 &amp; P2</code> — Opaque typeでも合成可能</li>
          <li><code className="text-teal-300">any P1 &amp; P2</code> — Existential typeでも合成可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的なプロトコル合成</h2>
        <SwiftEditor
          defaultCode={`protocol Named {
    var name: String { get }
}

protocol Aged {
    var age: Int { get }
}

struct Person: Named, Aged {
    var name: String
    var age: Int
}

// Protocol1 & Protocol2 で合成型を引数に使う
func introduce(_ subject: Named & Aged) {
    print("名前: \\(subject.name)、年齢: \\(subject.age)歳")
}

let alice = Person(name: "Alice", age: 28)
let bob = Person(name: "Bob", age: 34)
introduce(alice)
introduce(bob)`}
          expectedOutput={`名前: Alice、年齢: 28歳
名前: Bob、年齢: 34歳`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 3つ以上のプロトコルを合成</h2>
        <SwiftEditor
          defaultCode={`protocol Drawable {
    func draw() -> String
}

protocol Resizable {
    func resize(to scale: Double) -> Self
}

protocol Colorable {
    var color: String { get }
}

struct Circle: Drawable, Resizable, Colorable {
    var radius: Double
    var color: String

    func draw() -> String { "円 (半径: \\(radius), 色: \\(color))" }
    func resize(to scale: Double) -> Circle {
        Circle(radius: radius * scale, color: color)
    }
}

// 3つのプロトコルを合成
func renderShape(_ shape: Drawable & Resizable & Colorable) {
    print(shape.draw())
}

let c = Circle(radius: 5.0, color: "赤")
renderShape(c)
let scaled = c.resize(to: 2.0)
renderShape(scaled)`}
          expectedOutput={`円 (半径: 5.0, 色: 赤)
円 (半径: 10.0, 色: 赤)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ジェネリクスとの組み合わせ</h2>
        <SwiftEditor
          defaultCode={`protocol Identifiable {
    var id: String { get }
}

protocol Describable {
    var description: String { get }
}

struct Product: Identifiable, Describable {
    var id: String
    var description: String
}

// ジェネリクス制約でプロトコル合成を使う
func printItem<T: Identifiable & Describable>(_ item: T) {
    print("ID: \\(item.id) | \\(item.description)")
}

// 配列のフィルタにも使える
func filterById<T: Identifiable & Describable>(_ items: [T], prefix: String) -> [T] {
    items.filter { $0.id.hasPrefix(prefix) }
}

let products = [
    Product(id: "A001", description: "りんご"),
    Product(id: "A002", description: "みかん"),
    Product(id: "B001", description: "バナナ"),
]

for p in filterById(products, prefix: "A") {
    printItem(p)
}`}
          expectedOutput={`ID: A001 | りんご
ID: A002 | みかん`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="protocols" lessonId="composition" />
      </div>
      <LessonNav lessons={lessons} currentId="composition" basePath="/learn/protocols" />
    </div>
  );
}
