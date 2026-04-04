import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "error-handling")!.lessons;

export default function ResultTypePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラーハンドリング レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Result型</h1>
        <p className="text-gray-400">Result{"<Success, Failure>"}を使って関数型スタイルでエラーを扱います。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Result{"<Success, Failure>"} とは</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-orange-300">{"Result<Success, Failure: Error>"}</code> は成功値か失敗値のどちらかを表すenum型です。
          非同期処理のコールバックやエラーを値として扱いたい場面で有効です。
          <code className="text-orange-300">.success(value)</code> か <code className="text-orange-300">.failure(error)</code> のどちらかになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">Result.success(value)</code> — 成功ケース</li>
          <li><code className="text-orange-300">Result.failure(error)</code> — 失敗ケース</li>
          <li><code className="text-orange-300">result.get()</code> — 成功値を取り出す（失敗ならスロー）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Result型の基本</h2>
        <SwiftEditor
          defaultCode={`enum MathError: Error {
    case divisionByZero
    case overflow
}

func divide(_ a: Int, by b: Int) -> Result<Int, MathError> {
    if b == 0 { return .failure(.divisionByZero) }
    return .success(a / b)
}

// switch で分岐
let r1 = divide(10, by: 2)
switch r1 {
case .success(let value): print("結果: \\(value)")
case .failure(let error): print("エラー: \\(error)")
}

// get() でスロー形式に変換
let r2 = divide(5, by: 0)
do {
    let v = try r2.get()
    print(v)
} catch MathError.divisionByZero {
    print("ゼロ除算エラー")
}

// map で変換
let r3 = divide(20, by: 4).map { "答えは\\($0)" }
print(try! r3.get())`}
          expectedOutput={`結果: 5
ゼロ除算エラー
答えは5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Result の map・flatMap</h2>
        <SwiftEditor
          defaultCode={`enum ParseError: Error { case invalid }

func parseNumber(_ s: String) -> Result<Int, ParseError> {
    Int(s).map { .success($0) } ?? .failure(.invalid)
}

func doubleResult(_ n: Int) -> Result<Int, ParseError> {
    .success(n * 2)
}

// map: 成功値を変換
let r1 = parseNumber("21").map { $0 * 2 }
switch r1 {
case .success(let v): print("map結果: \\(v)")
case .failure: print("失敗")
}

// flatMap: Result を返す変換
let r2 = parseNumber("10").flatMap { doubleResult($0) }
switch r2 {
case .success(let v): print("flatMap結果: \\(v)")
case .failure: print("失敗")
}

// 失敗ケース
let r3 = parseNumber("abc").map { $0 + 1 }
switch r3 {
case .success(let v): print(v)
case .failure(let e): print("変換失敗: \\(e)")
}`}
          expectedOutput={`map結果: 42
flatMap結果: 20
変換失敗: invalid`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="error-handling" lessonId="result-type" />
      </div>
      <LessonNav lessons={lessons} currentId="result-type" basePath="/learn/error-handling" />
    </div>
  );
}
