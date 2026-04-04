import { SwiftEditor } from "@/components/swift-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* プロジェクト1: 連絡先管理アプリ */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト1: 連絡先管理アプリ</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-900 text-green-300">初級</span>
        </div>
        <p className="text-gray-400 mb-4">構造体・配列・Optional を使って連絡先を管理するプログラムを作成しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>Contact 構造体を定義する（名前・電話番号・メール）</li>
          <li>電話番号とメールは Optional で定義する</li>
          <li>連絡先を配列で管理して追加・一覧表示を実装する</li>
          <li>名前で検索して見つからない場合は nil を返す</li>
        </ul>
        <SwiftEditor
          defaultCode={`// TODO: Contact 構造体を定義する
// フィールド: name: String, phone: String?, email: String?
struct Contact {
    // TODO: プロパティを追加する

    // TODO: 連絡先情報を整形して返す description プロパティを実装する
    var description: String {
        // TODO: phone と email を Optional チェーンで組み立てる
        return name
    }
}

// TODO: ContactBook 構造体を定義する
struct ContactBook {
    var contacts: [Contact] = []

    // TODO: 連絡先を追加する mutating func を実装する
    // mutating func add(_ contact: Contact)

    // TODO: 名前で検索して Contact? を返す func を実装する
    // func search(name: String) -> Contact?
}

var book = ContactBook()
// TODO: 連絡先を追加して検索を確認する`}
          expectedOutput={`=== 連絡先一覧 ===
田中 太郎 | 電話: 090-1234-5678 | メール: taro@example.com
山田 花子 | 電話: なし | メール: hanako@example.com
佐藤 次郎 | 電話: 080-9876-5432 | メール: なし

=== 検索結果 ===
見つかりました: 田中 太郎
見つかりません: 鈴木 一郎`}
        />
      </div>

      {/* プロジェクト2: 図書館管理システム */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト2: 図書館管理システム</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-400 mb-4">クラス・プロトコル・エラー処理を使って図書館の貸出管理システムを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>Borrowable プロトコルを定義する（貸出・返却メソッド）</li>
          <li>Book クラスで Borrowable を実装する</li>
          <li>貸出中の本を再度借りようとしたら Error をスローする</li>
          <li>do-catch で借りる処理を安全に実行する</li>
        </ul>
        <SwiftEditor
          defaultCode={`// TODO: 貸出エラーを表す enum を定義する
// enum LibraryError: Error { case alreadyBorrowed, notBorrowed }

// TODO: Borrowable プロトコルを定義する
// protocol Borrowable {
//     mutating func borrow() throws
//     mutating func returnBook()
// }

// TODO: Book クラスを定義して Borrowable を実装する
class Book {
    let title: String
    let author: String
    // TODO: isBorrowed プロパティを追加する

    init(title: String, author: String) {
        self.title = title
        self.author = author
    }

    // TODO: borrow() と returnBook() を実装する
}

// TODO: 本を借りて返す処理を do-catch で実装する
let book = Book(title: "Swift プログラミング", author: "山田 太郎")`}
          expectedOutput={`「Swift プログラミング」を借りました
エラー: すでに貸出中です
「Swift プログラミング」を返却しました
「Swift プログラミング」を借りました`}
        />
      </div>

      {/* プロジェクト3: ToDoリストCLI */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト3: ToDoリストCLI</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-400 mb-4">enum とコレクションを使って優先度付きの ToDoリストを管理しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>Priority enum を定義する（高・中・低）</li>
          <li>TodoItem 構造体を定義する（タイトル・優先度・完了フラグ）</li>
          <li>優先度でフィルタリングして表示する</li>
          <li>完了率をパーセントで計算して出力する</li>
        </ul>
        <SwiftEditor
          defaultCode={`// TODO: Priority enum を定義する（high, medium, low）
// 各ケースに日本語ラベルを返す computed property を追加する
enum Priority {
    // TODO: case を追加する

    var label: String {
        // TODO: switch で日本語を返す
        return ""
    }
}

// TODO: TodoItem 構造体を定義する
struct TodoItem {
    // TODO: title: String, priority: Priority, isDone: Bool を追加する
}

// TODO: TodoList を管理する struct を定義する
struct TodoList {
    var items: [TodoItem] = []

    // TODO: アイテム追加・完了マーク・優先度フィルタ・完了率を実装する
}

var list = TodoList()
// TODO: アイテムを追加して動作を確認する`}
          expectedOutput={`=== ToDoリスト ===
[未] [高] Swift の基礎を学ぶ
[完] [高] Xcode をインストールする
[未] [中] プロトコルを理解する
[未] [低] ドキュメントを読む

完了率: 25% (1/4)

=== 高優先度のみ ===
[未] [高] Swift の基礎を学ぶ
[完] [高] Xcode をインストールする`}
        />
      </div>

      {/* プロジェクト4: 天気予報APIクライアント */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト4: 天気予報APIクライアント</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-900 text-red-300">上級</span>
        </div>
        <p className="text-gray-400 mb-4">async/await と Codable を使って天気データを取得・デコードするクライアントを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>WeatherResponse 構造体を Codable で定義する</li>
          <li>async 関数で擬似的な天気データを取得する</li>
          <li>JSONDecoder で JSON をデコードして表示する</li>
          <li>エラーが発生した場合は適切なメッセージを出力する</li>
        </ul>
        <SwiftEditor
          defaultCode={`import Foundation

// TODO: WeatherResponse 構造体を Codable で定義する
// フィールド: city: String, temperature: Double, condition: String, humidity: Int
struct WeatherResponse: Codable {
    // TODO: プロパティを追加する
}

// TODO: 擬似的な天気データ（JSON 文字列）を返す async 関数を実装する
// func fetchWeather(for city: String) async throws -> WeatherResponse

// TODO: 複数の都市の天気を async/await で取得して表示する
// async let を使って並行取得を試みる

// エントリーポイント（Swift 5.5+ のトップレベル await）
// Task { ... } で非同期処理を起動する`}
          expectedOutput={`=== 天気予報 ===
東京: 22.5°C、晴れ、湿度60%
大阪: 24.0°C、曇り、湿度65%
札幌: 15.3°C、雨、湿度80%`}
        />
      </div>
    </div>
  );
}
