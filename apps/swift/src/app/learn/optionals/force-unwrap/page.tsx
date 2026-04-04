import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "optionals")!.lessons;

export default function ForceUnwrapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Optional型 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">強制アンラップ</h1>
        <p className="text-gray-400">!演算子とリスク</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">強制アンラップ（!）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          強制アンラップとは<code className="text-pink-300">!</code>演算子を使ってOptional型の値を強制的に取り出す方法です。
          値が存在することが確実にわかっている場合に使いますが、もし値がnil（nilに対して<code className="text-pink-300">!</code>を使う）の場合、
          実行時に<strong className="text-white">クラッシュ（Fatal error）</strong>が発生します。
          安全なアンラップ方法（<code className="text-pink-300">if let</code>・<code className="text-pink-300">guard let</code>・<code className="text-pink-300">??</code>）が使えない場面のみ、慎重に使用してください。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">optional!</code> — 強制アンラップの構文</li>
          <li>値が存在する場合は非Optional型として取り出せる</li>
          <li>nilに対して使うと実行時クラッシュ（Fatal error）</li>
          <li>使用は最小限に。代わりにif let・guard let・??を推奨</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">強制アンラップが許容される場面</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          強制アンラップは「nilになり得ないことが論理的に保証されている場合」に限り使うことが許容されます。
          例えば、直前でnil確認済み、リテラルから生成した値、テストコード、プロトタイプなどです。
          本番コードでは極力避け、もし使う場合は必ずコメントで理由を説明することが推奨されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>直前のnil確認後（ただしif letを使えるなら不要）</li>
          <li>型変換で絶対成功すると確信できるとき（テストデータなど）</li>
          <li>プロトタイプ・デモコードで速度優先の場合</li>
          <li>iOSのInterface Builder接続（IBOutlet）などフレームワークの慣習</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">強制アンラップの危険性と代替手段</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          強制アンラップは「時限爆弾」とも呼ばれます。コードが変更されてnilになった際に初めてクラッシュが発覚し、
          デバッグが困難になります。可能な限り<code className="text-pink-300">if let</code>・<code className="text-pink-300">guard let</code>・<code className="text-pink-300">??</code>で代替してください。
          nilになった際の適切なエラー処理も重要な設計要素です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 強制アンラップの基本（安全な使用）</h2>
        <SwiftEditor
          defaultCode={`var definitelyHasValue: String? = "確実に値があります"

// !で強制アンラップ
let value = definitelyHasValue!
print(value)
print(value.uppercased())

// nilチェック後の強制アンラップ（より安全だがif letを推奨）
var optionalNumber: Int? = 42
if optionalNumber != nil {
    let number = optionalNumber!
    print("数値: \\(number)")
    print("2倍: \\(number * 2)")
}

// より良い書き方（推奨）
if let number = optionalNumber {
    print("if letで: \\(number)")
}`}
          expectedOutput={`確実に値があります
確実に値があります
数値: 42
2倍: 84
if letで: 42`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 強制アンラップ vs 安全なアンラップの比較</h2>
        <SwiftEditor
          defaultCode={`let numberStrings = ["42", "100", "255"]
let invalidStrings = ["42", "abc", "255"]

// 強制アンラップ（数値に変換できる保証がある場合のみ）
let numbers = numberStrings.map { Int($0)! }
print("強制アンラップ結果: \\(numbers)")

// 安全なアンラップ（変換失敗の可能性がある場合）
let safeNumbers = invalidStrings.compactMap { Int($0) }
print("compactMap結果: \\(safeNumbers)")

// ??でデフォルト値を使う（推奨）
let withDefault = invalidStrings.map { Int($0) ?? 0 }
print("??でデフォルト値: \\(withDefault)")

// 辞書の強制アンラップ（確実にキーが存在する場合）
let config = ["version": "1.0", "name": "MyApp"]
let version = config["version"]!  // 確実に存在するキー
print("バージョン: \\(version)")`}
          expectedOutput={`強制アンラップ結果: [42, 100, 255]
compactMap結果: [42, 255]
??でデフォルト値: [42, 0, 255]
バージョン: 1.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 強制アンラップの悪い例と良い例</h2>
        <SwiftEditor
          defaultCode={`// --- 良い例: 安全なアンラップ ---
func safeDivide(_ a: Int, _ b: Int) -> Int? {
    guard b != 0 else { return nil }
    return a / b
}

if let result = safeDivide(10, 2) {
    print("良い例: 10 / 2 = \\(result)")
}

let result2 = safeDivide(10, 0) ?? 0
print("良い例: 10 / 0 = \\(result2)（デフォルト0）")

// --- 強制アンラップが許容される例: リテラルからの変換 ---
// 開発者がリテラルを書いているので変換失敗はあり得ない
let url = URL(string: "https://example.com")!
print("URL: \\(url)")

// --- まとめ ---
print("\\n推奨順:")
print("1位: if let / guard let")
print("2位: ??（デフォルト値）")
print("3位: 強制アンラップ（確信がある場合のみ）")`}
          expectedOutput={`良い例: 10 / 2 = 5
良い例: 10 / 0 = 0（デフォルト0）
URL: https://example.com

推奨順:
1位: if let / guard let
2位: ??（デフォルト値）
3位: 強制アンラップ（確信がある場合のみ）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optionals" lessonId="force-unwrap" />
      </div>
      <LessonNav lessons={lessons} currentId="force-unwrap" basePath="/learn/optionals" />
    </div>
  );
}
