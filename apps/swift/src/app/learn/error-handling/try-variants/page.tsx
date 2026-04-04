import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "error-handling")!.lessons;

export default function TryVariantsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラーハンドリング レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">tryのバリアント</h1>
        <p className="text-gray-400">try・try?・try!の3つの違いと使い分けを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">3種類のtry</h2>
        <p className="text-gray-300 mb-3">
          Swiftにはエラーを処理する3つの方法があります。
          <code className="text-orange-300">try</code>（do-catch必須）、
          <code className="text-orange-300">try?</code>（Optional変換）、
          <code className="text-orange-300">try!</code>（強制実行・エラーでクラッシュ）です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">try</code> — do-catch の中で使う。エラーを上流に伝播できる</li>
          <li><code className="text-orange-300">try?</code> — エラーを nil に変換。戻り値は Optional</li>
          <li><code className="text-orange-300">try!</code> — エラーが絶対ないと確信できる場合のみ使用</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: try? の活用</h2>
        <SwiftEditor
          defaultCode={`enum ConvertError: Error {
    case invalidInput
}

func toInt(_ string: String) throws -> Int {
    guard let n = Int(string) else {
        throw ConvertError.invalidInput
    }
    return n
}

// try? → Optional<Int>
let a = try? toInt("42")
let b = try? toInt("abc")

print(a as Any)   // Optional(42)
print(b as Any)   // nil

// nil合体演算子と組み合わせ
let value = (try? toInt("100")) ?? 0
let invalid = (try? toInt("xyz")) ?? -1
print(value)
print(invalid)

// Optional binding
if let n = try? toInt("99") {
    print("変換成功: \\(n)")
}`}
          expectedOutput={`Optional(42)
nil
100
-1
変換成功: 99`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: try・try?・try! の比較</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// URLの作成（失敗しないことがわかっている場合）
// try! は絶対失敗しないことが確実な場合のみ
// let url = try! URL(string: "https://example.com")!

enum AppError: Error { case badData }

func riskyOperation(succeed: Bool) throws -> String {
    if succeed { return "成功" }
    throw AppError.badData
}

// try: do-catchが必要
do {
    let result = try riskyOperation(succeed: true)
    print("try: \\(result)")
} catch {
    print("エラー")
}

// try?: Optionalで受け取る
let r1 = try? riskyOperation(succeed: true)
let r2 = try? riskyOperation(succeed: false)
print("try?: \\(r1 ?? "nil")")
print("try?: \\(r2 ?? "nil")")

// try!: 失敗したらクラッシュ（この例では成功することが確実）
let r3 = try! riskyOperation(succeed: true)
print("try!: \\(r3)")`}
          expectedOutput={`try: 成功
try?: 成功
try?: nil
try!: 成功`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="error-handling" lessonId="try-variants" />
      </div>
      <LessonNav lessons={lessons} currentId="try-variants" basePath="/learn/error-handling" />
    </div>
  );
}
