import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "extensions")!.lessons;

export default function ExtensionBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">エクステンション レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">拡張の基本</h1>
        <p className="text-gray-400">extensionキーワードを使って既存の型に機能を追加します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">extension とは</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-cyan-300">extension</code> は既存の型（struct・class・enum・protocol）に
          新しい機能を追加する仕組みです。元の型のソースコードがなくても拡張できます。
          標準ライブラリの型（Int・String・Array等）も拡張できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">extension TypeName {"{ }"}</code> で既存型を拡張</li>
          <li>ストアドプロパティは追加不可（算出プロパティは追加可）</li>
          <li>既存の実装を変更することはできない</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Double を拡張する</h2>
        <SwiftEditor
          defaultCode={`extension Double {
    var km: Double { self * 1_000 }
    var m: Double { self }
    var cm: Double { self / 100 }
    var mm: Double { self / 1_000 }

    func rounded(to places: Int) -> Double {
        let factor = pow(10.0, Double(places))
        return (self * factor).rounded() / factor
    }
}

let distance = 2.5.km
print("\\(distance) m")

let value = 3.14159.rounded(to: 2)
print(value)`}
          expectedOutput={`2500.0 m
3.14`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カスタム型を拡張する</h2>
        <SwiftEditor
          defaultCode={`struct Rectangle {
    var width: Double
    var height: Double
}

// 基本の面積計算
extension Rectangle {
    var area: Double { width * height }
    var perimeter: Double { 2 * (width + height) }
    var isSquare: Bool { width == height }
}

// 変換機能を別の extension に
extension Rectangle {
    func scaled(by factor: Double) -> Rectangle {
        Rectangle(width: width * factor, height: height * factor)
    }
}

let rect = Rectangle(width: 4, height: 3)
print("面積: \\(rect.area)")
print("周囲: \\(rect.perimeter)")
print("正方形？: \\(rect.isSquare)")

let doubled = rect.scaled(by: 2)
print("2倍: \\(doubled.width) x \\(doubled.height)")`}
          expectedOutput={`面積: 12.0
周囲: 14.0
正方形？: false
2倍: 8.0 x 6.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/extensions" />
    </div>
  );
}
