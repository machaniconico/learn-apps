import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "enums")!.lessons;

export default function EnumMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">列挙型 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッド</h1>
        <p className="text-gray-400">列挙型にメソッドやプロパティを追加して、振る舞いを持つ型として活用します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">列挙型にメソッドを追加する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの列挙型はクラスや構造体と同様に<strong className="text-white">メソッドと算出プロパティ</strong>を持てます。
          ケースに応じた振る舞いをメソッド内でswitchして実装するのが典型的なパターンです。
          これにより、列挙型を単なる定数の集まりではなく、責務を持つ型として設計できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">func メソッド名() -&gt; 戻り値型</code> — インスタンスメソッド</li>
          <li><code className="text-indigo-300">var プロパティ名: 型 &#123; ... &#125;</code> — 算出プロパティ</li>
          <li><code className="text-indigo-300">static func</code> / <code className="text-indigo-300">static var</code> — 型メソッド・型プロパティ</li>
          <li>格納プロパティは持てない（定数プロパティも不可）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">mutatingメソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          列挙型は値型のため、<code className="text-indigo-300">self</code>自体を変更するメソッドには<code className="text-indigo-300">mutating</code>キーワードが必要です。
          <code className="text-indigo-300">mutating</code>メソッド内では<code className="text-indigo-300">self = .別のケース</code>のように自分自身を別のケースに書き換えられます。
          これを使うと状態遷移を列挙型自体に持たせることができます。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型メソッドと型プロパティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">static</code>を付けることで、インスタンスではなく型自体に属するメソッドやプロパティを定義できます。
          ファクトリメソッドやデフォルト値の提供などに活用します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 算出プロパティとインスタンスメソッド</h2>
        <SwiftEditor
          defaultCode={`enum Suit {
    case spades, hearts, diamonds, clubs

    // 算出プロパティ
    var symbol: String {
        switch self {
        case .spades: return "♠"
        case .hearts: return "♥"
        case .diamonds: return "♦"
        case .clubs: return "♣"
        }
    }

    var isRed: Bool {
        return self == .hearts || self == .diamonds
    }

    func description() -> String {
        let color = isRed ? "赤" : "黒"
        return "\\(symbol) (\\(color))"
    }
}

for suit in [Suit.spades, .hearts, .diamonds, .clubs] {
    print(suit.description())
}`}
          expectedOutput={`♠ (黒)
♥ (赤)
♦ (赤)
♣ (黒)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: mutatingメソッドで状態遷移</h2>
        <SwiftEditor
          defaultCode={`enum TrafficLight {
    case red, yellow, green

    var displayName: String {
        switch self {
        case .red: return "赤（停止）"
        case .yellow: return "黄（注意）"
        case .green: return "青（進行）"
        }
    }

    mutating func next() {
        switch self {
        case .red:    self = .green
        case .green:  self = .yellow
        case .yellow: self = .red
        }
    }
}

var light = TrafficLight.red
print("現在: \\(light.displayName)")

for _ in 1...5 {
    light.next()
    print("現在: \\(light.displayName)")
}`}
          expectedOutput={`現在: 赤（停止）
現在: 青（進行）
現在: 黄（注意）
現在: 赤（停止）
現在: 青（進行）
現在: 黄（注意）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 型メソッドとファクトリパターン</h2>
        <SwiftEditor
          defaultCode={`enum Difficulty {
    case easy, normal, hard, expert

    var lives: Int {
        switch self {
        case .easy:   return 5
        case .normal: return 3
        case .hard:   return 2
        case .expert: return 1
        }
    }

    var enemySpeed: Double {
        switch self {
        case .easy:   return 1.0
        case .normal: return 1.5
        case .hard:   return 2.0
        case .expert: return 3.0
        }
    }

    static func forBeginners() -> Difficulty { return .easy }
    static func forVeterans() -> Difficulty { return .hard }

    func summary() -> String {
        return "残機: \\(lives)、敵スピード: \\(enemySpeed)倍"
    }
}

let beginner = Difficulty.forBeginners()
let veteran = Difficulty.forVeterans()

print("初心者設定 → \\(beginner.summary())")
print("上級者設定 → \\(veteran.summary())")
print("エキスパート → \\(Difficulty.expert.summary())")`}
          expectedOutput={`初心者設定 → 残機: 5、敵スピード: 1.0倍
上級者設定 → 残機: 2、敵スピード: 2.0倍
エキスパート → 残機: 1、敵スピード: 3.0倍`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/enums" />
    </div>
  );
}
