import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "extensions")!.lessons;

export default function ProtocolConformanceExtPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">エクステンション レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロトコル準拠の追加</h1>
        <p className="text-gray-400">extensionを使って既存の型に後からプロトコル準拠を追加します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">後付けプロトコル準拠</h2>
        <p className="text-gray-300 mb-3">
          extensionを使うと既存の型（自分で定義した型でも標準ライブラリの型でも）に
          後からプロトコル準拠を追加できます。
          これを後付けプロトコル準拠（Retroactive Conformance）と呼びます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">extension MyType: MyProtocol {"{ }"}</code> で後付け準拠</li>
          <li>標準ライブラリの型にも独自プロトコルを採用させられる</li>
          <li>コードの整理にも有効（型定義と準拠を分離）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 既存型にプロトコルを採用させる</h2>
        <SwiftEditor
          defaultCode={`protocol Describable {
    func describe() -> String
}

struct Point {
    var x: Double
    var y: Double
}

// extensionでプロトコル準拠を追加
extension Point: Describable {
    func describe() -> String {
        "Point(\\(x), \\(y))"
    }
}

extension Point: CustomStringConvertible {
    var description: String { describe() }
}

let p = Point(x: 3, y: 4)
print(p.describe())
print(p)  // CustomStringConvertible が使われる

let points: [any Describable] = [
    Point(x: 0, y: 0),
    Point(x: 1, y: 2),
]
points.forEach { print($0.describe()) }`}
          expectedOutput={`Point(3.0, 4.0)
Point(3.0, 4.0)
Point(0.0, 0.0)
Point(1.0, 2.0)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 標準型に独自プロトコルを採用</h2>
        <SwiftEditor
          defaultCode={`protocol Grading {
    var grade: String { get }
}

extension Int: Grading {
    var grade: String {
        switch self {
        case 90...100: return "A"
        case 80..<90: return "B"
        case 70..<80: return "C"
        case 60..<70: return "D"
        default: return "F"
        }
    }
}

let scores = [95, 82, 73, 61, 45]
for score in scores {
    print("\\(score)点 → \\(score.grade)")
}`}
          expectedOutput={`95点 → A
82点 → B
73点 → C
61点 → D
45点 → F`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="protocol-conformance" />
      </div>
      <LessonNav lessons={lessons} currentId="protocol-conformance" basePath="/learn/extensions" />
    </div>
  );
}
