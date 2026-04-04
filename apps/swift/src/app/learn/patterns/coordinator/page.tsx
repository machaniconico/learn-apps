import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "patterns")!.lessons;

export default function CoordinatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Coordinatorパターン</h1>
        <p className="text-gray-400">画面遷移ロジックをViewControllerから分離するCoordinatorパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Coordinatorとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-300">Coordinator</code>パターンは画面遷移ロジックを
          ViewControllerから切り出して専門のCoordinatorクラスに委譲するパターンです。
          UIKitでよく使われますが、SwiftUIでも応用できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ViewControllerは遷移ロジックを持たない</li>
          <li>Coordinatorが次の画面への遷移を管理する</li>
          <li>デリゲートパターンでCoordinatorに通知する</li>
          <li>子Coordinatorを持つ階層構造を作れる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なCoordinator</h2>
        <p className="text-gray-400 mb-4">
          アプリのフロー管理をCoordinatorに集約する実装例です。
        </p>
        <SwiftEditor
          defaultCode={`import UIKit

// Coordinatorプロトコル
protocol Coordinator: AnyObject {
    var childCoordinators: [Coordinator] { get set }
    func start()
}

// 各画面のデリゲートプロトコル
protocol LoginCoordinatorDelegate: AnyObject {
    func didLogin(username: String)
}

protocol HomeCoordinatorDelegate: AnyObject {
    func didLogout()
    func didSelectItem(_ item: String)
}

// 具体的なCoordinator
class AppCoordinator: Coordinator {
    var childCoordinators: [Coordinator] = []
    private let navigationController: UINavigationController

    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func start() {
        showLogin()
    }

    private func showLogin() {
        let loginCoordinator = LoginCoordinator(
            navigationController: navigationController
        )
        loginCoordinator.delegate = self
        childCoordinators.append(loginCoordinator)
        loginCoordinator.start()
    }

    private func showHome(username: String) {
        let homeCoordinator = HomeCoordinator(
            navigationController: navigationController,
            username: username
        )
        homeCoordinator.delegate = self
        childCoordinators.append(homeCoordinator)
        homeCoordinator.start()
    }
}

extension AppCoordinator: LoginCoordinatorDelegate {
    func didLogin(username: String) {
        // ログイン後にホームへ遷移
        childCoordinators.removeAll { $0 is LoginCoordinator }
        showHome(username: username)
        print("AppCoordinator: \\(username) がログイン → ホームへ")
    }
}

extension AppCoordinator: HomeCoordinatorDelegate {
    func didLogout() {
        childCoordinators.removeAll { $0 is HomeCoordinator }
        showLogin()
        print("AppCoordinator: ログアウト → ログインへ")
    }

    func didSelectItem(_ item: String) {
        print("AppCoordinator: アイテム選択 → \\(item)詳細画面へ")
    }
}

class LoginCoordinator: Coordinator {
    var childCoordinators: [Coordinator] = []
    weak var delegate: LoginCoordinatorDelegate?
    private let navigationController: UINavigationController

    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }

    func start() {
        print("LoginCoordinator: ログイン画面を表示")
        // 実際はViewControllerを生成して push/present
        // simulateLogin()
    }

    func simulateLogin(username: String) {
        delegate?.didLogin(username: username)
    }
}

class HomeCoordinator: Coordinator {
    var childCoordinators: [Coordinator] = []
    weak var delegate: HomeCoordinatorDelegate?
    private let navigationController: UINavigationController
    let username: String

    init(navigationController: UINavigationController, username: String) {
        self.navigationController = navigationController
        self.username = username
    }

    func start() {
        print("HomeCoordinator: \\(username) のホーム画面を表示")
    }
}

// シミュレーション
let nav = UINavigationController()
let appCoordinator = AppCoordinator(navigationController: nav)
appCoordinator.start()`}
          expectedOutput={`LoginCoordinator: ログイン画面を表示`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SwiftUIでのCoordinator応用</h2>
        <p className="text-gray-400 mb-4">
          SwiftUIでは@Observableクラスで画面フローを管理するCoordinatorパターンを使えます。
        </p>
        <SwiftEditor
          defaultCode={`import SwiftUI

// SwiftUI向けAppRouter（Coordinatorの役割）
@Observable
class AppRouter {
    enum Route: Hashable {
        case home
        case detail(id: Int, title: String)
        case settings
        case profile(username: String)
    }

    var path: [Route] = []
    var isShowingSheet = false
    var sheetRoute: Route?

    func navigate(to route: Route) {
        path.append(route)
        print("遷移: → \\(route)")
    }

    func navigateBack() {
        if !path.isEmpty {
            path.removeLast()
        }
    }

    func navigateToRoot() {
        path.removeAll()
    }

    func presentSheet(_ route: Route) {
        sheetRoute = route
        isShowingSheet = true
    }

    func dismissSheet() {
        isShowingSheet = false
        sheetRoute = nil
    }
}

// Viewはルーティングロジックを持たずRouterに委譲
struct RootView: View {
    @State private var router = AppRouter()

    var body: some View {
        NavigationStack(path: $router.path) {
            HomeView(router: router)
                .navigationDestination(for: AppRouter.Route.self) { route in
                    switch route {
                    case .detail(let id, let title):
                        Text("詳細: \\(title) (ID: \\(id))")
                    case .settings:
                        Text("設定画面")
                    case .profile(let username):
                        Text("プロフィール: \\(username)")
                    case .home:
                        HomeView(router: router)
                    }
                }
        }
        .sheet(isPresented: $router.isShowingSheet) {
            if let route = router.sheetRoute {
                Text("シート: \\(String(describing: route))")
            }
        }
    }
}

struct HomeView: View {
    let router: AppRouter

    var body: some View {
        VStack(spacing: 16) {
            Button("詳細へ") {
                router.navigate(to: .detail(id: 1, title: "Swift入門"))
            }
            Button("設定へ") {
                router.navigate(to: .settings)
            }
        }
        .navigationTitle("ホーム")
    }
}

// 動作確認
let router = AppRouter()
router.navigate(to: .detail(id: 1, title: "Swift入門"))
router.navigate(to: .settings)
print("現在のパス:", router.path.count, "階層")
router.navigateToRoot()
print("ルートに戻る:", router.path.count, "階層")`}
          expectedOutput={`遷移: → detail(id: 1, title: "Swift入門")
遷移: → settings
現在のパス: 2 階層
ルートに戻る: 0 階層`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="coordinator" />
      </div>
      <LessonNav lessons={lessons} currentId="coordinator" basePath="/learn/patterns" />
    </div>
  );
}
