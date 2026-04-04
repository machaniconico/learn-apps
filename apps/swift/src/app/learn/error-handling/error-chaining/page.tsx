import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "error-handling")!.lessons;

export default function ErrorChainingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラー処理 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラーの連鎖</h1>
        <p className="text-gray-400">underlyingErrorとエラーラッピングで根本原因を追跡します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エラーの連鎖とラッピング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数のレイヤーを持つアプリケーションでは、低レイヤーのエラーを高レイヤーのエラーで包んで伝播させるパターンが重要です。
          Swift の <code className="text-orange-300">LocalizedError</code> プロトコルや独自の <code className="text-orange-300">underlyingError</code> プロパティを使うことで、
          エラーチェーンを構築できます。これにより根本原因（root cause）を保持しながら、
          各レイヤーで意味のあるエラーメッセージを提供できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">underlyingError: Error?</code> — 根本原因のエラーを保持</li>
          <li><code className="text-orange-300">LocalizedError</code> — errorDescription 等を提供するプロトコル</li>
          <li>エラーをラップして上位レイヤーに伝播するパターン</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: underlyingErrorによるエラーラッピング</h2>
        <SwiftEditor
          defaultCode={`// 低レイヤー: データベースエラー
enum DatabaseError: Error {
    case connectionFailed
    case queryFailed(reason: String)
}

// 高レイヤー: リポジトリエラー（根本原因を保持）
enum RepositoryError: Error {
    case fetchFailed(underlying: Error)
    case saveFailed(underlying: Error)

    var underlyingError: Error? {
        switch self {
        case .fetchFailed(let e), .saveFailed(let e): return e
        }
    }
}

func queryDatabase() throws(DatabaseError) {
    throw DatabaseError.queryFailed(reason: "テーブルが存在しません")
}

func fetchUser() throws(RepositoryError) {
    do {
        try queryDatabase()
    } catch {
        throw RepositoryError.fetchFailed(underlying: error)
    }
}

do {
    try fetchUser()
} catch let error as RepositoryError {
    print("リポジトリエラー: \\(error)")
    if let underlying = error.underlyingError {
        print("根本原因: \\(underlying)")
    }
}`}
          expectedOutput={`リポジトリエラー: fetchFailed(underlying: queryFailed(reason: "テーブルが存在しません"))
根本原因: queryFailed(reason: "テーブルが存在しません")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: LocalizedErrorでユーザー向けメッセージを追加</h2>
        <SwiftEditor
          defaultCode={`import Foundation

enum AppError: LocalizedError {
    case networkUnavailable
    case serverError(code: Int, underlying: Error?)
    case decodingFailed(underlying: Error?)

    var errorDescription: String? {
        switch self {
        case .networkUnavailable:
            return "ネットワークに接続できません"
        case .serverError(let code, _):
            return "サーバーエラーが発生しました（コード: \\(code)）"
        case .decodingFailed:
            return "データの解析に失敗しました"
        }
    }

    var recoverySuggestion: String? {
        switch self {
        case .networkUnavailable:
            return "Wi-Fiまたはモバイルデータの接続を確認してください"
        case .serverError:
            return "しばらく後にもう一度お試しください"
        case .decodingFailed:
            return "アプリを更新してみてください"
        }
    }

    var underlyingError: Error? {
        switch self {
        case .networkUnavailable: return nil
        case .serverError(_, let e), .decodingFailed(let e): return e
        }
    }
}

let error = AppError.serverError(code: 503, underlying: nil)
print(error.errorDescription ?? "不明なエラー")
print(error.recoverySuggestion ?? "")`}
          expectedOutput={`サーバーエラーが発生しました（コード: 503）
しばらく後にもう一度お試しください`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: エラーチェーンを再帰的に辿る</h2>
        <SwiftEditor
          defaultCode={`protocol ChainableError: Error {
    var underlyingError: Error? { get }
}

enum IOError: ChainableError {
    case fileNotFound(path: String)
    var underlyingError: Error? { nil }
}

enum ServiceError: ChainableError {
    case loadFailed(underlying: Error)
    var underlyingError: Error? {
        if case .loadFailed(let e) = self { return e }
        return nil
    }
}

enum AppError: ChainableError {
    case startupFailed(underlying: Error)
    var underlyingError: Error? {
        if case .startupFailed(let e) = self { return e }
        return nil
    }
}

// エラーチェーンを再帰的に辿るヘルパー
func printErrorChain(_ error: Error, depth: Int = 0) {
    let indent = String(repeating: "  ", count: depth)
    print("\\(indent)→ \\(error)")
    if let chainable = error as? ChainableError,
       let next = chainable.underlyingError {
        printErrorChain(next, depth: depth + 1)
    }
}

// 3層のエラーチェーンを構築
let rootCause = IOError.fileNotFound(path: "/config.json")
let serviceErr = ServiceError.loadFailed(underlying: rootCause)
let appErr = AppError.startupFailed(underlying: serviceErr)

print("エラーチェーン:")
printErrorChain(appErr)`}
          expectedOutput={`エラーチェーン:
→ startupFailed(underlying: loadFailed(underlying: fileNotFound(path: "/config.json")))
  → loadFailed(underlying: fileNotFound(path: "/config.json"))
    → fileNotFound(path: "/config.json")`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="error-handling" lessonId="error-chaining" />
      </div>
      <LessonNav lessons={lessons} currentId="error-chaining" basePath="/learn/error-handling" />
    </div>
  );
}
