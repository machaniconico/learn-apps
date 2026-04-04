import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function PlaygroundsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Swiftエコシステム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Swift Playgrounds</h1>
        <p className="text-gray-400">Playgroundsによるインタラクティブな学習・プロトタイプ開発と検証を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Swift Playgroundsとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">Swift Playgrounds</code>はコードを書きながらすぐに結果を確認できるインタラクティブな開発環境です。
          XcodeのPlaygroundタブ、またはiPad/Mac向けの専用アプリとして利用できます。
          アルゴリズムの検証、APIの探索、UIのプロトタイプ作成、チュートリアル作成など幅広い用途に使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">インラインプレビュー</code> — 各行の右側に結果が即時表示</li>
          <li><code className="text-blue-300">PlaygroundPage.current</code> — 非同期処理・継続実行の制御</li>
          <li><code className="text-blue-300">PlaygroundSupport</code> — ライブビューの表示</li>
          <li><code className="text-blue-300">Xcode Playground</code> vs <code className="text-blue-300">Swift Playgrounds App</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: Playgroundでのアルゴリズム検証</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// Playgroundはアルゴリズムの素早い検証に最適

// フィボナッチ数列の複数実装を比較
func fibRecursive(_ n: Int) -> Int {
    guard n > 1 else { return n }
    return fibRecursive(n - 1) + fibRecursive(n - 2)
}

func fibIterative(_ n: Int) -> Int {
    guard n > 1 else { return n }
    var a = 0, b = 1
    for _ in 2...n {
        (a, b) = (b, a + b)
    }
    return b
}

func fibMemo(_ n: Int, memo: inout [Int: Int]) -> Int {
    if let cached = memo[n] { return cached }
    guard n > 1 else { return n }
    let result = fibMemo(n - 1, memo: &memo) + fibMemo(n - 2, memo: &memo)
    memo[n] = result
    return result
}

// Playgroundで各実装の結果を確認
print("フィボナッチ数列（n=0〜10）:")
for n in 0...10 {
    print("  fib(\\(n)) =", fibIterative(n))
}

// 実行時間の比較
var memo: [Int: Int] = [:]
let n = 30

let start1 = Date()
_ = fibIterative(n)
print("\\n反復法 fib(\\(n)):", fibIterative(n), "- 時間:", String(format: "%.4f", Date().timeIntervalSince(start1) * 1000), "ms")

let start2 = Date()
_ = fibMemo(n, memo: &memo)
print("メモ化 fib(\\(n)):", fibMemo(n, memo: &memo), "- 時間:", String(format: "%.4f", Date().timeIntervalSince(start2) * 1000), "ms")`}
          expectedOutput={`フィボナッチ数列（n=0〜10）:
  fib(0) = 0
  fib(1) = 1
  fib(2) = 1
  fib(3) = 2
  fib(4) = 3
  fib(5) = 5
  fib(6) = 8
  fib(7) = 13
  fib(8) = 21
  fib(9) = 34
  fib(10) = 55

反復法 fib(30): 832040 - 時間: 0.0010 ms
メモ化 fib(30): 832040 - 時間: 0.0020 ms`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PlaygroundページとPlaygroundSupport</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Playgroundで非同期処理を使う場合は<code className="text-green-300">PlaygroundPage.current.needsIndefiniteExecution = true</code>
          で実行を継続させる必要があります。
          SwiftUIビューをライブプレビューで表示するには<code className="text-green-300">PlaygroundPage.current.setLiveView()</code>を使います。
          これにより、UIのプロトタイプをアプリを起動せずにすばやく確認できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: Playgroundでのデータ探索</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// Playgroundはデータ変換・探索に最適

// CSVデータのパースと分析
let csvData = """
名前,スコア,カテゴリ
Alice,95,A
Bob,72,B
Carol,88,A
Dave,65,C
Eve,91,A
Frank,78,B
"""

struct Student {
    let name: String
    let score: Int
    let category: String
}

func parseCSV(_ csv: String) -> [Student] {
    let lines = csv.components(separatedBy: "\\n").dropFirst().filter { !$0.isEmpty }
    return lines.compactMap { line in
        let parts = line.components(separatedBy: ",")
        guard parts.count == 3, let score = Int(parts[1]) else { return nil }
        return Student(name: parts[0], score: score, category: parts[2])
    }
}

let students = parseCSV(csvData)

// Playgroundでインタラクティブに分析
print("総人数:", students.count)
print("平均スコア:", students.map(\.score).reduce(0, +) / students.count)
print("最高スコア:", students.max(by: { $0.score < $1.score })?.name ?? "", students.max(by: { $0.score < $1.score })?.score ?? 0)
print("最低スコア:", students.min(by: { $0.score < $1.score })?.name ?? "", students.min(by: { $0.score < $1.score })?.score ?? 0)

print("\\nカテゴリ別集計:")
let grouped = Dictionary(grouping: students, by: \.category)
for category in grouped.keys.sorted() {
    let group = grouped[category]!
    let avg = group.map(\.score).reduce(0, +) / group.count
    print("  \\(category): \\(group.count)人, 平均\\(avg)点")
}

print("\\nスコア順:")
students.sorted { $0.score > $1.score }.forEach {
    print("  \\($0.name): \\($0.score)点 (\\($0.category))")
}`}
          expectedOutput={`総人数: 6
平均スコア: 81
最高スコア: Alice 95
最低スコア: Dave 65

カテゴリ別集計:
  A: 3人, 平均91点
  B: 2人, 平均75点
  C: 1人, 平均65点

スコア順:
  Alice: 95点 (A)
  Eve: 91点 (A)
  Carol: 88点 (A)
  Frank: 78点 (B)
  Bob: 72点 (B)
  Dave: 65点 (C)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: Playgroundでのプロトタイプ実装</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// Playgroundでライブラリのプロトタイプを素早く検証

// 状態マシンのプロトタイプ
enum TrafficLight: String, CaseIterable {
    case red = "赤"
    case yellow = "黄"
    case green = "青"

    var next: TrafficLight {
        switch self {
        case .red: return .green
        case .green: return .yellow
        case .yellow: return .red
        }
    }

    var duration: Int {
        switch self {
        case .red: return 60
        case .yellow: return 5
        case .green: return 45
        }
    }

    var canProceed: Bool { self == .green }
}

// Playgroundで動作確認
var light = TrafficLight.red
print("信号シミュレーション:")
for _ in 0..<6 {
    print("  \\(light.rawValue)（\\(light.duration)秒）\\(light.canProceed ? " → 進め" : "")")
    light = light.next
}

// プロトタイプ: シンプルなキャッシュ
struct SimpleCache<K: Hashable, V> {
    private var storage: [K: (value: V, expiry: Date)] = [:]
    let ttl: TimeInterval

    init(ttl: TimeInterval = 60) { self.ttl = ttl }

    mutating func set(_ key: K, value: V) {
        storage[key] = (value: value, expiry: Date().addingTimeInterval(ttl))
    }

    func get(_ key: K) -> V? {
        guard let entry = storage[key], entry.expiry > Date() else { return nil }
        return entry.value
    }

    var size: Int { storage.count }
}

// Playgroundでプロトタイプをすばやく検証
var cache = SimpleCache<String, Int>(ttl: 3600)
cache.set("userCount", value: 42)
cache.set("postCount", value: 100)

print("\\nキャッシュ検証:")
print("  userCount:", cache.get("userCount") ?? "なし")
print("  postCount:", cache.get("postCount") ?? "なし")
print("  unknown:", cache.get("unknown") ?? "なし")
print("  キャッシュサイズ:", cache.size)`}
          expectedOutput={`信号シミュレーション:
  赤（60秒）
  青（45秒） → 進め
  黄（5秒）
  赤（60秒）
  青（45秒） → 進め
  黄（5秒）

キャッシュ検証:
  userCount: 42
  postCount: 100
  unknown: なし
  キャッシュサイズ: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="playgrounds" />
      </div>
      <LessonNav lessons={lessons} currentId="playgrounds" basePath="/learn/ecosystem" />
    </div>
  );
}
