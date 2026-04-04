import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "functions")!.lessons;

export default function ThrowingFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">関数 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">throwsする関数</h1>
        <p className="text-gray-400">エラーを投げる関数の定義と、try/catchを使った安全な呼び出し方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">throwsとError型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftのエラーハンドリングは <code className="text-blue-300">throws</code> キーワードを使います。
          エラーを投げる可能性がある関数には <code className="text-blue-300">throws</code> を付けて定義し、
          呼び出し側は <code className="text-blue-300">do-catch</code> ブロック内で <code className="text-blue-300">try</code> を使います。
          エラー型は <code className="text-blue-300">Error</code> プロトコルに準拠した列挙型で定義するのが一般的です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">enum MyError: Error</code> — Errorプロトコルに準拠した列挙型</li>
          <li><code className="text-blue-300">func f() throws</code> — エラーを投げる可能性がある関数</li>
          <li><code className="text-blue-300">throw MyError.case</code> — エラーを投げる</li>
          <li><code className="text-blue-300">try f()</code> — throwsする関数の呼び出し</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Error型の定義とthrows関数</h2>
        <SwiftEditor
          defaultCode={`enum ValidationError: Error {
    case empty
    case tooShort(min: Int)
    case tooLong(max: Int)
}

func validateUsername(_ name: String) throws -> String {
    if name.isEmpty {
        throw ValidationError.empty
    }
    if name.count < 3 {
        throw ValidationError.tooShort(min: 3)
    }
    if name.count > 20 {
        throw ValidationError.tooLong(max: 20)
    }
    return name
}

do {
    let valid = try validateUsername("Alice")
    print("有効なユーザー名: \\(valid)")
} catch ValidationError.empty {
    print("エラー: 空文字は不可")
} catch ValidationError.tooShort(let min) {
    print("エラー: \\(min)文字以上必要")
} catch {
    print("不明なエラー: \\(error)")
}`}
          expectedOutput={`有効なユーザー名: Alice`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">try? と try! による呼び出し</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-300">try?</code> を使うとエラー発生時に <code className="text-blue-300">nil</code> を返すオプショナルになります。
          <code className="text-blue-300">try!</code> はエラーが絶対に発生しないと確信できる場合のみ使用し、
          エラーが発生するとクラッシュします。通常は <code className="text-blue-300">do-catch</code> を推奨します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">try?</code> — エラー時はnilを返すオプショナル変換</li>
          <li><code className="text-blue-300">try!</code> — エラー時はクラッシュ（確実な場合のみ）</li>
          <li><code className="text-blue-300">if let result = try? f()</code> — オプショナルバインディングとの組み合わせ</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: try? によるオプショナル処理</h2>
        <SwiftEditor
          defaultCode={`enum ParseError: Error {
    case invalidFormat
}

func parseInt(_ s: String) throws -> Int {
    guard let n = Int(s) else {
        throw ParseError.invalidFormat
    }
    return n
}

// try? でオプショナルとして受け取る
let good = try? parseInt("42")
let bad  = try? parseInt("abc")

print("good: \\(good as Any)")  // Optional(42)
print("bad:  \\(bad  as Any)")  // nil

// if let で安全に使う
if let number = try? parseInt("100") {
    print("パース成功: \\(number * 2)")
}`}
          expectedOutput={`good: Optional(42)
bad:  nil
パース成功: 200`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エラーの伝播</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          呼び出した関数のエラーを自分でキャッチせず、上位の呼び出し元へ伝播させることができます。
          関数自身に <code className="text-blue-300">throws</code> を付けることで内部の <code className="text-blue-300">try</code> のエラーがそのまま外へ伝わります。
          これにより責任の所在を適切な場所に集約できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>throws関数内でtryを使うとエラーは自動的に呼び出し元へ伝播</li>
          <li><code className="text-blue-300">rethrows</code> — クロージャのエラーのみを伝播する特殊なキーワード</li>
          <li>do-catchを省略することでエラー処理を上位レイヤーに委ねられる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: エラーの伝播チェーン</h2>
        <SwiftEditor
          defaultCode={`enum AppError: Error {
    case notFound(String)
    case accessDenied
}

func fetchData(id: Int) throws -> String {
    if id <= 0 { throw AppError.notFound("ID=\\(id)") }
    return "データ #\\(id)"
}

// エラーをそのまま伝播させる
func processData(id: Int) throws -> String {
    let raw = try fetchData(id: id)   // エラーは呼び出し元へ
    return raw.uppercased()
}

// 最上位でまとめてキャッチ
do {
    print(try processData(id: 5))
    print(try processData(id: -1))
} catch AppError.notFound(let msg) {
    print("未検出: \\(msg)")
} catch {
    print("エラー: \\(error)")
}`}
          expectedOutput={`データ #5
未検出: ID=-1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="throwing-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="throwing-functions" basePath="/learn/functions" />
    </div>
  );
}
