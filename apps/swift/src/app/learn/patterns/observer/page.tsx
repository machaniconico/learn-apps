import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "patterns")!.lessons;

export default function ObserverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Observerパターン</h1>
        <p className="text-gray-400">NotificationCenterとCombineを使ったObserverパターンの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Observerパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">Observer</code>パターンはオブジェクトの状態変化を
          複数の観察者（Observer）に自動通知する仕組みです。
          Swiftでは<code className="text-purple-300">NotificationCenter</code>や
          <code className="text-purple-300">Combine</code>フレームワークで実装できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Subject（発行者）とObserver（購読者）が疎結合</li>
          <li><code className="text-purple-300">NotificationCenter</code>: 文字列ベースの通知</li>
          <li><code className="text-purple-300">Combine</code>: 型安全なリアクティブプログラミング</li>
          <li><code className="text-purple-300">@Observable</code>: SwiftUI向けの観察可能オブジェクト</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NotificationCenterを使う</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">NotificationCenter</code>でアプリ全体のイベント通知を実装します。
        </p>
        <SwiftEditor
          defaultCode={`import Foundation

// 通知名を拡張として定義（文字列の直書きを避ける）
extension Notification.Name {
    static let userDidLogin  = Notification.Name("userDidLogin")
    static let userDidLogout = Notification.Name("userDidLogout")
    static let dataUpdated   = Notification.Name("dataUpdated")
}

// 発行者
class AuthManager {
    static let shared = AuthManager()
    private init() {}

    private(set) var currentUser: String?

    func login(username: String) {
        currentUser = username
        // 通知を発行（userInfoでデータを添付）
        NotificationCenter.default.post(
            name: .userDidLogin,
            object: self,
            userInfo: ["username": username]
        )
    }

    func logout() {
        currentUser = nil
        NotificationCenter.default.post(name: .userDidLogout, object: self)
    }
}

// 購読者1
class NavigationController {
    private var observer: NSObjectProtocol?

    init() {
        observer = NotificationCenter.default.addObserver(
            forName: .userDidLogin,
            object: nil,
            queue: .main
        ) { notification in
            let username = notification.userInfo?["username"] as? String ?? ""
            print("[Navigation] \\(username) がログイン → ホーム画面へ遷移")
        }
    }

    deinit {
        if let observer = observer {
            NotificationCenter.default.removeObserver(observer)
        }
    }
}

// 使用例
let auth = AuthManager.shared
let nav = NavigationController()

auth.login(username: "田中太郎")
auth.logout()
print("現在のユーザー:", auth.currentUser as Any)`}
          expectedOutput={`[Navigation] 田中太郎 がログイン → ホーム画面へ遷移
現在のユーザー: nil`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Combineを使う</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">Combine</code>はAppleの型安全なリアクティブフレームワークです。
          PassthroughSubjectで値を発行し、.sinkで購読します。
        </p>
        <SwiftEditor
          defaultCode={`import Combine
import Foundation

// Combineを使ったObserverパターン
class StockTracker {
    // PassthroughSubject: 値を手動で発行するPublisher
    let pricePublisher = PassthroughSubject<Double, Never>()
    let alertPublisher = PassthroughSubject<String, Never>()

    private var currentPrice: Double = 0

    func updatePrice(_ price: Double) {
        currentPrice = price
        pricePublisher.send(price)

        if price > 10000 {
            alertPublisher.send("⚠️ 株価が10,000円を超えました: \\(price)円")
        } else if price < 5000 {
            alertPublisher.send("⚠️ 株価が5,000円を下回りました: \\(price)円")
        }
    }
}

let tracker = StockTracker()
var cancellables = Set<AnyCancellable>()

// 購読者1: 価格表示
tracker.pricePublisher
    .sink { price in
        print("現在の株価: \\(price)円")
    }
    .store(in: &cancellables)

// 購読者2: アラート
tracker.alertPublisher
    .sink { alert in
        print(alert)
    }
    .store(in: &cancellables)

// 価格を更新（全購読者に通知）
tracker.updatePrice(7500)
tracker.updatePrice(11000)
tracker.updatePrice(4800)`}
          expectedOutput={`現在の株価: 7500.0円
現在の株価: 11000.0円
⚠️ 株価が10,000円を超えました: 11000.0円
現在の株価: 4800.0円
⚠️ 株価が5,000円を下回りました: 4800.0円`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="observer" />
      </div>
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/patterns" />
    </div>
  );
}
