import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "protocols")!.lessons;

export default function ProtocolConformancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロトコル レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロトコル準拠</h1>
        <p className="text-gray-400">型がプロトコルを採用し、要件をすべて実装することでプロトコルに準拠します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロトコル準拠のルール</h2>
        <p className="text-gray-300 mb-3">
          プロトコルへの準拠は型定義時に <code className="text-teal-300">struct MyType: Protocol1, Protocol2</code> のように宣言します。
          プロトコルのすべての要件を実装しなければコンパイルエラーになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>複数のプロトコルをカンマ区切りで採用できる</li>
          <li>クラスの場合、スーパークラスをプロトコルより先に書く</li>
          <li>プロトコル要件をすべて満たさないとコンパイルエラー</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 複数プロトコルへの準拠</h2>
        <SwiftEditor
          defaultCode={`protocol Nameable {
    var name: String { get }
}

protocol Ageable {
    var age: Int { get }
}

protocol Describable {
    func describe() -> String
}

struct Person: Nameable, Ageable, Describable {
    var name: String
    var age: Int
    func describe() -> String {
        return "\\(name)(\\(age)歳)"
    }
}

let p = Person(name: "Alice", age: 30)
print(p.describe())
print(p.name)
print(p.age)`}
          expectedOutput={`Alice(30歳)
Alice
30`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Equatable・Hashable・Codableへの準拠</h2>
        <SwiftEditor
          defaultCode={`// Equatable に準拠
struct Point: Equatable {
    var x: Double
    var y: Double
}

let a = Point(x: 1, y: 2)
let b = Point(x: 1, y: 2)
let c = Point(x: 3, y: 4)
print(a == b)
print(a == c)

// Hashable に準拠（Equatable も自動準拠）
struct Color: Hashable {
    var red: Int
    var green: Int
    var blue: Int
}

let colors: Set<Color> = [
    Color(red: 255, green: 0, blue: 0),
    Color(red: 0, green: 255, blue: 0),
]
print(colors.count)`}
          expectedOutput={`true
false
2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="protocols" lessonId="conformance" />
      </div>
      <LessonNav lessons={lessons} currentId="conformance" basePath="/learn/protocols" />
    </div>
  );
}
