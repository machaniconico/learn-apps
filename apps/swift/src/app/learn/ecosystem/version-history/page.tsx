import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function VersionHistoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Swiftエコシステム レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Swiftバージョン履歴</h1>
        <p className="text-gray-400">Swift 1.0〜6.0の主要な変更点と進化の歴史を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Swiftの歴史</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">Swift</code>は2014年にAppleが発表した現代的なプログラミング言語です。
          Objective-Cの後継として設計され、安全性・パフォーマンス・表現力を重視しています。
          2015年にオープンソース化され、Linux・Windowsでも動作します。
          毎年のmajorリリースで新機能が追加され、Swift 5.5以降はSwift Concurrencyが導入されました。
        </p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <p className="text-orange-400 font-semibold mb-1">Swift 1.x〜2.x (2014〜2015)</p>
            <p className="text-gray-400 text-xs">初期リリース、Optionals・エラー処理・プロトコル指向の基盤確立</p>
          </div>
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 font-semibold mb-1">Swift 3.x〜4.x (2016〜2017)</p>
            <p className="text-gray-400 text-xs">API設計ガイドライン、Codable、SE-0166など大規模な安定化</p>
          </div>
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 font-semibold mb-1">Swift 5.x (2019〜2022)</p>
            <p className="text-gray-400 text-xs">ABI安定化、async/await、Actors、Result Buildersなど</p>
          </div>
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 font-semibold mb-1">Swift 6.x (2024〜)</p>
            <p className="text-gray-400 text-xs">厳格な並行処理チェック、Swift Testing、typed throws</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: Swiftの主要マイルストーン</h2>
        <SwiftEditor
          defaultCode={`// Swiftバージョン履歴の主要マイルストーン

struct SwiftRelease {
    let version: String
    let year: Int
    let highlights: [String]
}

let releases: [SwiftRelease] = [
    SwiftRelease(version: "1.0", year: 2014, highlights: [
        "Appleが発表・Xcode 6に同梱",
        "Optionals・クロージャ・ジェネリクス",
        "構造体と値型の重視",
    ]),
    SwiftRelease(version: "2.0", year: 2015, highlights: [
        "オープンソース化（Apache 2.0）",
        "guard文・defer文の導入",
        "プロトコル拡張（POP）",
        "エラーハンドリング（do-catch）",
    ]),
    SwiftRelease(version: "3.0", year: 2016, highlights: [
        "APIデザインガイドライン適用",
        "Objective-Cとの大規模な名称変更",
        "Linux対応の強化",
    ]),
    SwiftRelease(version: "4.0", year: 2017, highlights: [
        "Codable（Encodable + Decodable）",
        "KeyPath式",
        "String.SubSequenceの改善",
    ]),
    SwiftRelease(version: "5.0", year: 2019, highlights: [
        "ABI安定化（バイナリ互換性）",
        "Result型の標準化",
        "@dynamicCallable・@dynamicMemberLookup",
    ]),
]

for release in releases {
    print("Swift \\(release.version) (\\(release.year)):")
    for highlight in release.highlights {
        print("  • \\(highlight)")
    }
    print("")
}`}
          expectedOutput={`Swift 1.0 (2014):
  • Appleが発表・Xcode 6に同梱
  • Optionals・クロージャ・ジェネリクス
  • 構造体と値型の重視

Swift 2.0 (2015):
  • オープンソース化（Apache 2.0）
  • guard文・defer文の導入
  • プロトコル拡張（POP）
  • エラーハンドリング（do-catch）

Swift 3.0 (2016):
  • APIデザインガイドライン適用
  • Objective-Cとの大規模な名称変更
  • Linux対応の強化

Swift 4.0 (2017):
  • Codable（Encodable + Decodable）
  • KeyPath式
  • String.SubSequenceの改善

Swift 5.0 (2019):
  • ABI安定化（バイナリ互換性）
  • Result型の標準化
  • @dynamicCallable・@dynamicMemberLookup`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Swift 5.5〜5.9: 現代Swiftの確立</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.5（2021）で導入された<code className="text-green-300">async/await・Actor・TaskGroup</code>は
          Swiftの並行処理モデルを一変させました。
          Swift 5.7の<code className="text-green-300">some/any キーワード</code>でOpaque型とExistential型が明確化され、
          Swift 5.9の<code className="text-green-300">Macros</code>はコード生成の新パラダイムをもたらしました。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: Swift 5.5〜6.0の新機能</h2>
        <SwiftEditor
          defaultCode={`// Swift 5.5以降の主要新機能デモ

// Swift 5.5: async/await (2021)
func fetchUserName() async -> String {
    return "田中太郎"  // 実際はURLSessionで取得
}

// Swift 5.5: Actor（データ競合の防止）
actor Counter {
    private var count = 0
    func increment() { count += 1 }
    func value() -> Int { count }
}

// Swift 5.7: some/any の明確化 (2022)
protocol Drawable {
    func draw() -> String
}

struct Circle: Drawable {
    let radius: Double
    func draw() -> String { "円(半径: \\(radius))" }
}

struct Square: Drawable {
    let side: Double
    func draw() -> String { "正方形(辺: \\(side))" }
}

// some: opaque type（コンパイル時に型が確定）
func makeShape() -> some Drawable {
    return Circle(radius: 5.0)
}

// any: existential type（実行時に型が決まる）
func describeShape(_ shape: any Drawable) -> String {
    return shape.draw()
}

// Swift 5.9: if/switch 式 (2023)
let score = 85
let grade = if score >= 90 { "A" }
             else if score >= 80 { "B" }
             else if score >= 70 { "C" }
             else { "D" }

// Swift 6.0: 厳格な並行処理チェック (2024)
// Swift 6モードでは送信可能性の違反をエラーとして検出

print("makeShape():", makeShape().draw())
print("describeShape(Circle):", describeShape(Circle(radius: 3.0)))
print("describeShape(Square):", describeShape(Square(side: 4.0)))
print("grade for \\(score):", grade)

Task {
    let name = await fetchUserName()
    print("ユーザー名:", name)

    let counter = Counter()
    await counter.increment()
    await counter.increment()
    print("カウント:", await counter.value())
}`}
          expectedOutput={`makeShape(): 円(半径: 5.0)
describeShape(Circle): 円(半径: 3.0)
describeShape(Square): 正方形(辺: 4.0)
grade for 85: B
ユーザー名: 田中太郎
カウント: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: Swift 6の新機能まとめ</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// Swift 6 (2024) の主要な新機能

// 1. 型付きthrows (typed throws)
enum ParseError: Error {
    case invalidFormat
    case outOfRange(value: Int)
}

// throws(ParseError) で具体的なエラー型を指定
func parseAge(_ s: String) throws(ParseError) -> Int {
    guard let age = Int(s) else { throw ParseError.invalidFormat }
    guard age >= 0 && age <= 150 else { throw ParseError.outOfRange(value: age) }
    return age
}

// 2. Swift Testing (@Test, #expect)
// import Testing
// @Test func testParseAge() {
//     #expect(throws: ParseError.invalidFormat) { try parseAge("abc") }
// }

// 3. 非コピー型 (Noncopyable) - ~Copyable
struct UniqueResource: ~Copyable {
    let id: Int
    init(id: Int) { self.id = id; print("リソース\\(id)を作成") }
    deinit { print("リソース\\(id)を解放") }
}

// 4. グローバルアクター (@MainActor)
// @MainActor class ViewController: ... {}

// 実際に動作するコード
print("Swift 6 の typed throws:")
let inputs = ["25", "abc", "200"]
for input in inputs {
    do {
        let age = try parseAge(input)
        print("  \\(input) → 年齢: \\(age)")
    } catch ParseError.invalidFormat {
        print("  \\(input) → 無効なフォーマット")
    } catch ParseError.outOfRange(let v) {
        print("  \\(input) → 範囲外: \\(v)")
    }
}

print("\\nSwift 6 の Noncopyable:")
do {
    let resource = UniqueResource(id: 42)
    print("  使用中: リソース\\(resource.id)")
    // resourceはスコープを抜けると自動解放（コピー不可）
}
print("  スコープ終了")`}
          expectedOutput={`Swift 6 の typed throws:
  25 → 年齢: 25
  abc → 無効なフォーマット
  200 → 範囲外: 200

Swift 6 の Noncopyable:
リソース42を作成
  使用中: リソース42
リソース42を解放
  スコープ終了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="version-history" />
      </div>
      <LessonNav lessons={lessons} currentId="version-history" basePath="/learn/ecosystem" />
    </div>
  );
}
