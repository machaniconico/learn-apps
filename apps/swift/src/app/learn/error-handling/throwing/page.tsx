import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "error-handling")!.lessons;

export default function ThrowingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラーハンドリング レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラーのスロー</h1>
        <p className="text-gray-400">throwsとthrowキーワードを使ってエラーをスローする関数を定義します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">throws と throw</h2>
        <p className="text-gray-300 mb-3">
          エラーをスローできる関数には <code className="text-orange-300">throws</code> キーワードを付けます。
          関数内でエラーを発生させるには <code className="text-orange-300">throw エラー値</code> を使います。
          スローされた関数を呼び出す側は <code className="text-orange-300">try</code> が必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">func f() throws</code> — エラーをスローできる関数</li>
          <li><code className="text-orange-300">throw MyError.case</code> — エラーをスロー</li>
          <li>呼び出し側は <code className="text-orange-300">try f()</code> と書く必要がある</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: エラー定義とスロー</h2>
        <SwiftEditor
          defaultCode={`// Errorプロトコルに準拠したエラー型
enum ValidationError: Error {
    case emptyString
    case tooShort(min: Int)
    case tooLong(max: Int)
}

func validate(username: String) throws -> String {
    if username.isEmpty {
        throw ValidationError.emptyString
    }
    if username.count < 3 {
        throw ValidationError.tooShort(min: 3)
    }
    if username.count > 20 {
        throw ValidationError.tooLong(max: 20)
    }
    return username
}

// try は do-catch の中で使う
do {
    let name = try validate(username: "ab")
    print("有効: \\(name)")
} catch ValidationError.emptyString {
    print("エラー: 空文字列")
} catch ValidationError.tooShort(let min) {
    print("エラー: \\(min)文字以上必要")
} catch {
    print("その他: \\(error)")
}`}
          expectedOutput={`エラー: 3文字以上必要`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: throws関数の連鎖</h2>
        <SwiftEditor
          defaultCode={`enum ParseError: Error {
    case invalidFormat
    case outOfRange
}

func parseAge(_ string: String) throws -> Int {
    guard let age = Int(string) else {
        throw ParseError.invalidFormat
    }
    guard (0...150).contains(age) else {
        throw ParseError.outOfRange
    }
    return age
}

func createPerson(name: String, ageStr: String) throws -> String {
    let age = try parseAge(ageStr)  // エラーを上流に伝播
    return "\\(name)(\\(age)歳)"
}

do {
    let p = try createPerson(name: "太郎", ageStr: "25")
    print(p)
} catch ParseError.invalidFormat {
    print("年齢のフォーマットが不正")
} catch ParseError.outOfRange {
    print("年齢が範囲外")
}

do {
    let p = try createPerson(name: "花子", ageStr: "abc")
    print(p)
} catch {
    print("エラー: \\(error)")
}`}
          expectedOutput={`太郎(25歳)
エラー: invalidFormat`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="error-handling" lessonId="throwing" />
      </div>
      <LessonNav lessons={lessons} currentId="throwing" basePath="/learn/error-handling" />
    </div>
  );
}
