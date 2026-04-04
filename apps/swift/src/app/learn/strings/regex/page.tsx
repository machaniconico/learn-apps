import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "strings")!.lessons;

export default function RegexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">正規表現</h1>
        <p className="text-gray-400">Swift 5.7で導入されたRegex型とRegexBuilderを使ったパターンマッチングを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Regex リテラル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.7以降では <code className="text-blue-300">/pattern/</code> というリテラル構文でRegexを直接書けます。
          コンパイル時に構文チェックが行われるため安全です。
          <code className="text-blue-300">wholeMatch</code> で文字列全体のマッチ、
          <code className="text-blue-300">firstMatch</code> で最初のマッチを検索します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">/pattern/</code> — Regexリテラル（コンパイル時検証）</li>
          <li><code className="text-blue-300">str.wholeMatch(of: regex)</code> — 文字列全体がパターンに一致するか</li>
          <li><code className="text-blue-300">str.firstMatch(of: regex)</code> — 最初のマッチを返す</li>
          <li><code className="text-blue-300">str.contains(regex)</code> — パターンが含まれるか判定</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Regexリテラルでマッチング</h2>
        <SwiftEditor
          defaultCode={`import Foundation

let email = "user@example.com"
let phoneJP = "090-1234-5678"
let invalid = "not-an-email"

// メールアドレスのパターン
let emailRegex = /[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}/

if let match = email.wholeMatch(of: emailRegex) {
    print("メール一致: \\(match.output)")
}

if invalid.wholeMatch(of: emailRegex) == nil {
    print("無効なメール")
}

// 電話番号パターン
let phoneRegex = /\\d{3}-\\d{4}-\\d{4}/
if phoneJP.contains(phoneRegex) {
    print("電話番号を検出")
}`}
          expectedOutput={`メール一致: user@example.com
無効なメール
電話番号を検出`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">キャプチャグループ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Regexリテラル内の <code className="text-blue-300">(pattern)</code> でキャプチャグループを作成できます。
          マッチ結果の <code className="text-blue-300">.output</code> はタプルになり、各グループに型安全にアクセスできます。
          名前付きキャプチャ <code className="text-blue-300">(?&lt;name&gt;pattern)</code> を使うと可読性が向上します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">(pattern)</code> — キャプチャグループ</li>
          <li><code className="text-blue-300">(?&lt;name&gt;pattern)</code> — 名前付きキャプチャグループ</li>
          <li><code className="text-blue-300">match.output.1</code> — インデックスでグループにアクセス</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: キャプチャグループでデータ抽出</h2>
        <SwiftEditor
          defaultCode={`import Foundation

let dateStr = "2024-03-15"

// キャプチャグループで年月日を抽出
let dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/

if let match = dateStr.wholeMatch(of: dateRegex) {
    let year  = match.output.year
    let month = match.output.month
    let day   = match.output.day
    print("年: \\(year)")
    print("月: \\(month)")
    print("日: \\(day)")
}

// firstMatchで文中から抽出
let log = "Error at line 42: unexpected token"
let lineRegex = /line (\\d+)/
if let m = log.firstMatch(of: lineRegex) {
    print("行番号: \\(m.output.1)")
}`}
          expectedOutput={`年: 2024
月: 03
日: 15
行番号: 42`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">RegexBuilder DSL</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">RegexBuilder</code> フレームワークを使うと複雑なパターンをSwiftコードとして構造化できます。
          <code className="text-blue-300">Regex {"{ ... }"}</code> ブロック内に <code className="text-blue-300">One</code>、<code className="text-blue-300">OneOrMore</code>、
          <code className="text-blue-300">Optionally</code> などの宣言的なコンポーネントを並べます。
          可読性が高くコメントも入れやすいのが利点です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">Regex {"{ }"}</code> — RegexBuilderブロック</li>
          <li><code className="text-blue-300">OneOrMore(.digit)</code> — 1文字以上の数字</li>
          <li><code className="text-blue-300">Optionally("-")</code> — 省略可能な文字</li>
          <li><code className="text-blue-300">CharacterClass(.word)</code> — 単語文字クラス</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: RegexBuilderでパターン構築</h2>
        <SwiftEditor
          defaultCode={`import RegexBuilder

// 郵便番号パターン: 123-4567 または 1234567
let postalRegex = Regex {
    Capture {
        OneOrMore(.digit)
    }
    Optionally("-")
    Capture {
        OneOrMore(.digit)
    }
}

let samples = ["123-4567", "1234567", "abc-def"]
for s in samples {
    if let m = s.wholeMatch(of: postalRegex) {
        print("\\(s) -> \\(m.output.1)-\\(m.output.2)")
    } else {
        print("\\(s) -> 不一致")
    }
}`}
          expectedOutput={`123-4567 -> 123-4567
1234567 -> 1234567
abc-def -> 不一致`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="regex" />
      </div>
      <LessonNav lessons={lessons} currentId="regex" basePath="/learn/strings" />
    </div>
  );
}
