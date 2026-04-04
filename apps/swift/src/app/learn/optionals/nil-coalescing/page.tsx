import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "optionals")!.lessons;

export default function NilCoalescingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Optional型 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Nil合体演算子</h1>
        <p className="text-gray-400">??によるデフォルト値</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Nil合体演算子（??）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Nil合体演算子<code className="text-pink-300">??</code>は、Optional型の値がnilだった場合にデフォルト値を提供するための演算子です。
          <code className="text-pink-300">a ?? b</code>という形式で、<code className="text-pink-300">a</code>がnilでなければアンラップされた値を、nilであれば<code className="text-pink-300">b</code>を返します。
          <code className="text-pink-300">if let</code>より簡潔にデフォルト値を設定したい場面で非常に便利です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">optional ?? defaultValue</code> — 基本構文</li>
          <li>左辺がnilでなければアンラップした値を返す</li>
          <li>左辺がnilなら右辺のデフォルト値を返す</li>
          <li>結果の型は非Optional型になる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">??の連鎖と組み合わせ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">??</code>は連鎖させることができます。<code className="text-pink-300">a ?? b ?? c</code>のように書くと、
          <code className="text-pink-300">a</code>がnilなら<code className="text-pink-300">b</code>を試し、それもnilなら<code className="text-pink-300">c</code>を使います。
          またオプショナルチェーン<code className="text-pink-300">?.</code>と組み合わせて、<code className="text-pink-300">object?.property ?? "デフォルト"</code>のように使うことも多いです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">a ?? b ?? c</code> — 複数のフォールバック</li>
          <li><code className="text-pink-300">optional?.property ?? "default"</code> — チェーンとの組み合わせ</li>
          <li>右辺はOptional型でも非Optional型でもよい</li>
          <li>右辺がOptionalの場合、結果もOptionalになる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">??の短絡評価</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">??</code>は短絡評価（short-circuit evaluation）を行います。
          左辺がnilでない場合、右辺は評価されません。
          これにより、右辺に副作用のある式や重い処理を置いても、必要な場合のみ実行されます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: ??による基本的なデフォルト値設定</h2>
        <SwiftEditor
          defaultCode={`var username: String? = "Swift太郎"
var guestName: String? = nil

// ??でデフォルト値を提供
let displayName1 = username ?? "ゲスト"
let displayName2 = guestName ?? "ゲスト"

print("ユーザー1: \\(displayName1)")
print("ユーザー2: \\(displayName2)")

// 数値のデフォルト値
var score: Int? = 95
var missedScore: Int? = nil

let finalScore1 = score ?? 0
let finalScore2 = missedScore ?? 0

print("スコア1: \\(finalScore1)点")
print("スコア2: \\(finalScore2)点（欠席）")`}
          expectedOutput={`ユーザー1: Swift太郎
ユーザー2: ゲスト
スコア1: 95点
スコア2: 0点（欠席）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ??の連鎖と実用的な使い方</h2>
        <SwiftEditor
          defaultCode={`var preferredLanguage: String? = nil
var systemLanguage: String? = nil
let defaultLanguage = "日本語"

// 連鎖したフォールバック
let language = preferredLanguage ?? systemLanguage ?? defaultLanguage
print("使用言語: \\(language)")

// systemLanguageが設定されている場合
let systemLanguage2: String? = "英語"
let language2 = preferredLanguage ?? systemLanguage2 ?? defaultLanguage
print("使用言語: \\(language2)")

// オプショナルチェーンとの組み合わせ
struct Config {
    var theme: String?
}

var config: Config? = Config(theme: "ダーク")
var config2: Config? = Config(theme: nil)
var config3: Config? = nil

print(config?.theme ?? "ライト（デフォルト）")
print(config2?.theme ?? "ライト（デフォルト）")
print(config3?.theme ?? "ライト（デフォルト）")`}
          expectedOutput={`使用言語: 日本語
使用言語: 英語
ダーク
ライト（デフォルト）
ライト（デフォルト）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: ??を使った関数とデータ変換</h2>
        <SwiftEditor
          defaultCode={`// 文字列からIntへの変換（失敗するとnilになる）
func parseAge(from text: String) -> Int {
    return Int(text) ?? 0
}

print(parseAge(from: "25"))   // 25
print(parseAge(from: "abc"))  // 0（変換失敗→デフォルト0）
print(parseAge(from: ""))     // 0

// ??を使った辞書アクセス
let translations = ["apple": "リンゴ", "banana": "バナナ"]

func translate(_ word: String) -> String {
    return translations[word] ?? "翻訳なし"
}

print(translate("apple"))
print(translate("cherry"))

// 配列の安全な操作
let numbers = [10, 20, 30]
let first = numbers.first ?? 0
let isEmpty = numbers.isEmpty
print("最初の要素: \\(first)")
print("合計: \\(numbers.reduce(0, +))")`}
          expectedOutput={`25
0
0
リンゴ
翻訳なし
最初の要素: 10
合計: 60`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optionals" lessonId="nil-coalescing" />
      </div>
      <LessonNav lessons={lessons} currentId="nil-coalescing" basePath="/learn/optionals" />
    </div>
  );
}
