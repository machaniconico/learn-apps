import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "error-handling")!.lessons;

export default function CustomErrorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラーハンドリング レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタムエラー</h1>
        <p className="text-gray-400">Errorプロトコルを実装して、アプリ固有のエラー型を定義します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムエラーの定義</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-orange-300">Error</code> プロトコルに準拠した型ならエラーとして使えます。
          主に <code className="text-orange-300">enum</code> で定義し、関連値でエラーの詳細情報を持たせます。
          <code className="text-orange-300">LocalizedError</code> プロトコルで人間が読めるメッセージを提供できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">enum MyError: Error {"{ }"}</code> — 基本的な定義</li>
          <li>関連値でエラーの詳細情報を付加できる</li>
          <li><code className="text-orange-300">LocalizedError</code> で errorDescription を提供</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 詳細なカスタムエラー</h2>
        <SwiftEditor
          defaultCode={`enum APIError: Error {
    case invalidURL(String)
    case httpError(statusCode: Int, message: String)
    case decodingFailed(reason: String)
    case noInternet

    var description: String {
        switch self {
        case .invalidURL(let url):
            return "無効なURL: \\(url)"
        case .httpError(let code, let msg):
            return "HTTPエラー \\(code): \\(msg)"
        case .decodingFailed(let reason):
            return "デコード失敗: \\(reason)"
        case .noInternet:
            return "インターネット接続なし"
        }
    }
}

func simulateAPI(endpoint: String) throws -> String {
    switch endpoint {
    case "/users": return #"[{"id":1}]"#
    case "/bad-url": throw APIError.invalidURL(endpoint)
    case "/forbidden": throw APIError.httpError(statusCode: 403, message: "Forbidden")
    default: throw APIError.decodingFailed(reason: "unknown response")
    }
}

let endpoints = ["/users", "/bad-url", "/forbidden"]
for ep in endpoints {
    do {
        let data = try simulateAPI(endpoint: ep)
        print("成功: \\(data)")
    } catch let e as APIError {
        print("APIエラー: \\(e.description)")
    }
}`}
          expectedOutput={`成功: [{"id":1}]
APIエラー: 無効なURL: /bad-url
APIエラー: HTTPエラー 403: Forbidden`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: LocalizedError プロトコル</h2>
        <SwiftEditor
          defaultCode={`enum ShopError: LocalizedError {
    case outOfStock(item: String)
    case insufficientFunds(needed: Double, have: Double)
    case invalidItem

    var errorDescription: String? {
        switch self {
        case .outOfStock(let item):
            return "\\(item)は在庫切れです"
        case .insufficientFunds(let needed, let have):
            return "残高不足: 必要\\(needed)円、所持\\(have)円"
        case .invalidItem:
            return "無効な商品です"
        }
    }

    var recoverySuggestion: String? {
        switch self {
        case .outOfStock: return "入荷をお待ちください"
        case .insufficientFunds: return "チャージしてください"
        case .invalidItem: return "商品コードを確認してください"
        }
    }
}

func purchase(item: String, price: Double, balance: Double) throws {
    if balance < price {
        throw ShopError.insufficientFunds(needed: price, have: balance)
    }
    print("\\(item)を購入しました")
}

do {
    try purchase(item: "コーヒー", price: 300, balance: 150)
} catch let e as ShopError {
    print(e.errorDescription ?? "不明")
    print(e.recoverySuggestion ?? "")
}`}
          expectedOutput={`残高不足: 必要300.0円、所持150.0円
チャージしてください`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="error-handling" lessonId="custom-errors" />
      </div>
      <LessonNav lessons={lessons} currentId="custom-errors" basePath="/learn/error-handling" />
    </div>
  );
}
