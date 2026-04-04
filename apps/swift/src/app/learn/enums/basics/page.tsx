import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "enums")!.lessons;

export default function EnumBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">列挙型 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">列挙型の基本</h1>
        <p className="text-gray-400">enumキーワードを使って関連する値のグループを型安全に表現します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">列挙型とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          列挙型（enum）は、関連する値の有限集合を定義するための型です。
          Swiftの列挙型は単なる定数の集まりではなく、<strong className="text-white">メソッドやプロパティを持てる強力な型</strong>です。
          <code className="text-indigo-300">enum</code>キーワードで定義し、各選択肢を<code className="text-indigo-300">case</code>で表します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">enum 型名 &#123; &#125;</code> — 列挙型の定義</li>
          <li><code className="text-indigo-300">case ケース名</code> — 各ケースの定義</li>
          <li><code className="text-indigo-300">型名.ケース名</code> または <code className="text-indigo-300">.ケース名</code> — ケースの参照</li>
          <li>switchと組み合わせて網羅的なパターンマッチングが可能</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ケースの定義と利用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数のケースは1行にまとめることも、1ケースずつ書くこともできます。
          変数に型が推論されている場合は<code className="text-indigo-300">.ケース名</code>と省略して書けます。
          switchで列挙型を扱う際にすべてのケースを網羅していないとコンパイルエラーになるため、バグを防ぎやすくなります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">case north, south, east, west</code> — 1行での複数定義</li>
          <li>型推論が効く文脈では <code className="text-indigo-300">.north</code> と省略可能</li>
          <li><code className="text-indigo-300">default</code> — switchで未列挙のケースを一括処理</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CaseIterableによる全ケース列挙</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">CaseIterable</code>プロトコルに準拠すると、
          <code className="text-indigo-300">allCases</code>プロパティですべてのケースを配列として取得できます。
          UIのリスト表示やテストで全ケースを回したいときに便利です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 基本的な列挙型の定義</h2>
        <SwiftEditor
          defaultCode={`enum Direction {
    case north
    case south
    case east
    case west
}

var heading = Direction.north
print("現在の方向: \\(heading)")

heading = .south
print("変更後の方向: \\(heading)")

switch heading {
case .north:
    print("北へ進む")
case .south:
    print("南へ進む")
case .east:
    print("東へ進む")
case .west:
    print("西へ進む")
}`}
          expectedOutput={`現在の方向: north
変更後の方向: south
南へ進む`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数ケースを1行で定義</h2>
        <SwiftEditor
          defaultCode={`enum Season {
    case spring, summer, autumn, winter
}

let current = Season.autumn

switch current {
case .spring:
    print("春：桜が咲く季節")
case .summer:
    print("夏：暑い季節")
case .autumn:
    print("秋：紅葉の季節")
case .winter:
    print("冬：雪の季節")
}

// 比較演算子で等値確認
if current == .autumn {
    print("今は秋です")
}`}
          expectedOutput={`秋：紅葉の季節
今は秋です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: CaseIterableで全ケースを取得</h2>
        <SwiftEditor
          defaultCode={`enum Planet: CaseIterable {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}

print("太陽系の惑星: \\(Planet.allCases.count)個")

for planet in Planet.allCases {
    print("  - \\(planet)")
}

// 特定ケースのインデックスを取得
if let index = Planet.allCases.firstIndex(of: .earth) {
    print("地球は\\(index + 1)番目の惑星")
}`}
          expectedOutput={`太陽系の惑星: 8個
  - mercury
  - venus
  - earth
  - mars
  - jupiter
  - saturn
  - uranus
  - neptune
地球は3番目の惑星`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/enums" />
    </div>
  );
}
