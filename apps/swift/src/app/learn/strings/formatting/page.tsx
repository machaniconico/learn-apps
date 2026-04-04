import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "strings")!.lessons;

export default function FormattingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フォーマット</h1>
        <p className="text-gray-400">formatted()メソッドとFormatStyleを使って数値・日付・通貨を適切な文字列に整形する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">formatted() メソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 5.5で導入された <code className="text-blue-300">.formatted()</code> はロケール対応の文字列整形APIです。
          従来の <code className="text-blue-300">NumberFormatter</code> や <code className="text-blue-300">DateFormatter</code> より簡潔に書けます。
          引数なしで呼ぶとデフォルトスタイル、引数にFormatStyleを渡すと詳細な制御が可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">number.formatted()</code> — デフォルト数値フォーマット</li>
          <li><code className="text-blue-300">.formatted(.number.precision(.fractionLength(2)))</code> — 小数点桁数指定</li>
          <li><code className="text-blue-300">.formatted(.percent)</code> — パーセント表示</li>
          <li><code className="text-blue-300">.formatted(.currency(code: "JPY"))</code> — 通貨表示</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 数値のフォーマット</h2>
        <SwiftEditor
          defaultCode={`import Foundation

let integer = 1_234_567
let decimal = 3.14159
let ratio   = 0.856

// デフォルト
print(integer.formatted())

// 小数点以下の桁数
print(decimal.formatted(.number.precision(.fractionLength(2))))

// パーセント
print(ratio.formatted(.percent.precision(.fractionLength(1))))

// 通貨
let price = 1980.0
print(price.formatted(.currency(code: "JPY")))
print(price.formatted(.currency(code: "USD")))`}
          expectedOutput={`1,234,567
3.14
85.6%
¥1,980
$1,980.00`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">日付のフォーマット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">Date</code> にも <code className="text-blue-300">.formatted()</code> が使えます。
          <code className="text-blue-300">.dateTime</code> スタイルで年・月・日・時刻の各コンポーネントを個別に指定できます。
          <code className="text-blue-300">.relative(presentation:)</code> で「3分前」のような相対表示も可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">date.formatted()</code> — デフォルト日付フォーマット</li>
          <li><code className="text-blue-300">.formatted(.dateTime.year().month().day())</code> — コンポーネント指定</li>
          <li><code className="text-blue-300">.formatted(date: .long, time: .shortened)</code> — スタイル指定</li>
          <li><code className="text-blue-300">.formatted(.relative(presentation: .named))</code> — 相対時間表示</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 日付のフォーマット</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// 固定の日付を作成
var components = DateComponents()
components.year  = 2024
components.month = 3
components.day   = 15
components.hour  = 9
components.minute = 30
let date = Calendar.current.date(from: components)!

// デフォルト
print(date.formatted())

// コンポーネント指定
print(date.formatted(.dateTime.year().month().day()))

// スタイル指定
print(date.formatted(date: .long, time: .omitted))

// 時刻のみ
print(date.formatted(.dateTime.hour().minute()))`}
          expectedOutput={`3/15/2024, 9:30 AM
Mar 15, 2024
March 15, 2024
9:30 AM`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リストと計測値のフォーマット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列に対しても <code className="text-blue-300">.formatted()</code> でリスト表示が作れます。
          また <code className="text-blue-300">Measurement</code> 型を使うと単位変換と整形を組み合わせられます。
          <code className="text-blue-300">ByteCountFormatStyle</code> でファイルサイズの人間に読みやすい表示も簡単です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">array.formatted(.list(type: .and))</code> — 「A, B, and C」形式</li>
          <li><code className="text-blue-300">array.formatted(.list(type: .or))</code> — 「A, B, or C」形式</li>
          <li><code className="text-blue-300">Int64(bytes).formatted(.byteCount(style: .file))</code> — ファイルサイズ</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: リストとバイト数のフォーマット</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// 配列をリスト形式に
let fruits = ["りんご", "みかん", "ぶどう"]
print(fruits.formatted(.list(type: .and)))
print(fruits.formatted(.list(type: .or)))

// ファイルサイズ
let sizes: [Int64] = [512, 1_500, 2_048_000, 1_073_741_824]
for bytes in sizes {
    print(bytes.formatted(.byteCount(style: .file)))
}

// 数値のグループ化と符号
let negValue = -42500.0
print(negValue.formatted(.number.grouping(.automatic).sign(strategy: .always())))`}
          expectedOutput={`りんご, みかん, and ぶどう
りんご, みかん, or ぶどう
512 bytes
1.5 kB
2.05 MB
1.07 GB
+42,500`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="formatting" />
      </div>
      <LessonNav lessons={lessons} currentId="formatting" basePath="/learn/strings" />
    </div>
  );
}
