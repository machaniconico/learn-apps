import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ios")!.lessons;

export default function NavigationControllerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">iOS開発基礎</span>
        <h1 className="text-3xl font-bold text-gray-100">UINavigationController</h1>
        <p className="text-gray-400">画面遷移とナビゲーションスタックを学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">UINavigationController</code> は
          スタック構造で複数の ViewController を管理します。
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">pushViewController</code> で画面を積み重ね、
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">popViewController</code> で戻ります。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import UIKit

// ナビゲーションスタックの基本
class HomeViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "ホーム"
        view.backgroundColor = .systemBackground

        navigationItem.rightBarButtonItem = UIBarButtonItem(
            title: "設定",
            style: .plain,
            target: self,
            action: #selector(showSettings)
        )

        let button = UIButton(type: .system)
        button.setTitle("詳細を見る", for: .normal)
        button.addTarget(self, action: #selector(showDetail), for: .touchUpInside)
        button.frame = CGRect(x: 0, y: 0, width: 200, height: 44)
        button.center = view.center
        view.addSubview(button)
    }

    @objc private func showDetail() {
        let detailVC = DetailViewController()
        detailVC.itemTitle = "Swift UIKit"
        // スタックにプッシュ
        navigationController?.pushViewController(detailVC, animated: true)
    }

    @objc private func showSettings() {
        let settingsVC = SettingsViewController()
        // モーダルで表示
        let nav = UINavigationController(rootViewController: settingsVC)
        present(nav, animated: true)
    }
}

class DetailViewController: UIViewController {
    var itemTitle: String?

    override func viewDidLoad() {
        super.viewDidLoad()
        title = itemTitle
        view.backgroundColor = .systemBackground
        print("Detail: \\(itemTitle ?? "")")
    }
}

class SettingsViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "設定"
        navigationItem.leftBarButtonItem = UIBarButtonItem(
            barButtonSystemItem: .close,
            target: self,
            action: #selector(dismiss as () -> Void)
        )
    }
}

print("Navigation stack: Home → Detail")`}
        height="420px"
        expectedOutput="Navigation stack: Home → Detail"
      />

      <SwiftEditor
        defaultCode={`import UIKit

// プログラムで NavigationController を構成
class AppCoordinator {

    let window: UIWindow

    init(window: UIWindow) {
        self.window = window
    }

    func start() {
        let homeVC = HomeViewController()
        let navController = UINavigationController(rootViewController: homeVC)

        // ナビゲーションバーのカスタマイズ
        let appearance = UINavigationBarAppearance()
        appearance.configureWithOpaqueBackground()
        appearance.backgroundColor = .systemIndigo
        appearance.titleTextAttributes = [.foregroundColor: UIColor.white]
        appearance.largeTitleTextAttributes = [.foregroundColor: UIColor.white]

        navController.navigationBar.standardAppearance = appearance
        navController.navigationBar.scrollEdgeAppearance = appearance
        navController.navigationBar.prefersLargeTitles = true
        navController.navigationBar.tintColor = .white

        window.rootViewController = navController
        window.makeKeyAndVisible()
        print("App started with NavigationController")
    }
}

// スタック操作のバリエーション
// navigationController?.pushViewController(vc, animated: true)
// navigationController?.popViewController(animated: true)
// navigationController?.popToRootViewController(animated: true)
// navigationController?.popToViewController(targetVC, animated: true)
// navigationController?.setViewControllers([vc1, vc2], animated: true)

print("Navigation methods demonstrated")`}
        height="320px"
        expectedOutput="Navigation methods demonstrated"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ios" lessonId="navigation-controller" />
      </div>
      <LessonNav lessons={lessons} currentId="navigation-controller" basePath="/learn/ios" />
    </div>
  );
}
