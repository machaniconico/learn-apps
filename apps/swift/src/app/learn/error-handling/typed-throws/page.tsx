import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "error-handling")!.lessons;

export default function TypedThrowsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラー処理 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型付きthrows</h1>
        <p className="text-gray-400">throws(ErrorType)でスローされる具体的なエラー型を宣言します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型付きthrowsとは（Swift 6.0+）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift 6.0から導入された<code className="text-orange-300">throws(ErrorType)</code>構文を使うと、
          関数がスローする具体的なエラー型をコンパイラに伝えられます。
          従来の <code className="text-orange-300">throws</code> は <code className="text-orange-300">any Error</code> 型でしたが、
          型付きthrowsではcatch節でキャストが不要になり、型安全性が向上します。
          また、ジェネリクスと組み合わせて高階関数のエラー型を伝播させることもできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">throws(MyError)</code> — 特定のエラー型のみをスローすることを宣言</li>
          <li>catch節でキャストなしに具体的なエラー型を扱える</li>
          <li><code className="text-orange-300">throws(any Error)</code> は従来の <code className="text-orange-300">throws</code> と等価</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 型付きthrowsの基本</h2>
        <SwiftEditor
          defaultCode={`enum NetworkError: Error {
    case timeout
    case unauthorized
    case notFound(url: String)
}

// throws(NetworkError) で具体的な型を指定
func fetchData(from url: String) throws(NetworkError) -> String {
    if url.isEmpty {
        throw NetworkError.timeout
    }
    if url.contains("secret") {
        throw NetworkError.unauthorized
    }
    if url.contains("missing") {
        throw NetworkError.notFound(url: url)
    }
    return "データ取得成功: \\(url)"
}

// catch で NetworkError として直接扱える（キャスト不要）
do {
    let result = try fetchData(from: "https://api.example.com/data")
    print(result)
} catch .timeout {
    print("タイムアウトエラー")
} catch .unauthorized {
    print("認証エラー")
} catch .notFound(let url) {
    print("見つかりません: \\(url)")
}

do {
    let _ = try fetchData(from: "secret-endpoint")
} catch {
    print("エラー: \\(error)")
}`}
          expectedOutput={`データ取得成功: https://api.example.com/data
エラー: unauthorized`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: ジェネリクスでエラー型を伝播</h2>
        <SwiftEditor
          defaultCode={`enum ParseError: Error {
    case invalidFormat
    case outOfRange(value: Int)
}

// ジェネリックなエラー型パラメータ
func transform<T, E: Error>(
    _ value: T,
    using transform: (T) throws(E) -> T
) throws(E) -> T {
    try transform(value)
}

func validateAge(_ age: Int) throws(ParseError) -> Int {
    guard age >= 0 else { throw ParseError.invalidFormat }
    guard age <= 150 else { throw ParseError.outOfRange(value: age) }
    return age
}

do {
    let age = try transform(25, using: validateAge)
    print("有効な年齢: \\(age)")
} catch .invalidFormat {
    print("フォーマットエラー")
} catch .outOfRange(let v) {
    print("範囲外の値: \\(v)")
}

do {
    let _ = try transform(200, using: validateAge)
} catch .outOfRange(let v) {
    print("範囲外: \\(v)")
}`}
          expectedOutput={`有効な年齢: 25
範囲外: 200`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 型付きthrowsとResult型の連携</h2>
        <SwiftEditor
          defaultCode={`enum ValidationError: Error {
    case empty(field: String)
    case tooShort(field: String, minimum: Int)
    case tooLong(field: String, maximum: Int)
}

func validateUsername(_ name: String) throws(ValidationError) -> String {
    if name.isEmpty { throw ValidationError.empty(field: "ユーザー名") }
    if name.count < 3 { throw ValidationError.tooShort(field: "ユーザー名", minimum: 3) }
    if name.count > 20 { throw ValidationError.tooLong(field: "ユーザー名", maximum: 20) }
    return name
}

// Result に変換するヘルパー
func toResult<T, E: Error>(_ body: () throws(E) -> T) -> Result<T, E> {
    do {
        return .success(try body())
    } catch {
        return .failure(error)
    }
}

let results = ["ok", "ab", "x", "validUser123"]

for name in results {
    let result = toResult { try validateUsername(name) }
    switch result {
    case .success(let n):
        print("✓ '\\(n)' は有効")
    case .failure(.empty(let f)):
        print("✗ \\(f): 空です")
    case .failure(.tooShort(let f, let min)):
        print("✗ \\(f): \\(min)文字以上必要")
    case .failure(.tooLong(let f, let max)):
        print("✗ \\(f): \\(max)文字以下にしてください")
    }
}`}
          expectedOutput={`✓ 'ok' は有効
✗ ユーザー名: 3文字以上必要
✗ ユーザー名: 3文字以上必要
✓ 'validUser123' は有効`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="error-handling" lessonId="typed-throws" />
      </div>
      <LessonNav lessons={lessons} currentId="typed-throws" basePath="/learn/error-handling" />
    </div>
  );
}
