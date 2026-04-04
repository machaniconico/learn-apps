import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ios")!.lessons;

export default function AppLifecyclePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">iOS開発基礎</span>
        <h1 className="text-3xl font-bold text-gray-100">アプリのライフサイクル</h1>
        <p className="text-gray-400">@main App 構造体と UIApplicationDelegate の仕組みを学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          iOSアプリには明確なライフサイクルがあります。
          モダンなSwiftUIアプリでは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">@main</code> と
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">App</code> プロトコルを使います。
          UIKitベースのアプリでは <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">UIApplicationDelegate</code> が中心です。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import SwiftUI

// SwiftUI App ライフサイクル（iOS 14+）
@main
struct MyApp: App {
    // アプリ起動時に一度だけ初期化
    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
        }
    }
}

class AppState: ObservableObject {
    @Published var isLoggedIn = false
    @Published var currentUser: String?
}

// シーンフェーズの監視
struct ContentView: View {
    @Environment(\\.scenePhase) private var scenePhase

    var body: some View {
        Text("Hello")
            .onChange(of: scenePhase) { newPhase in
                switch newPhase {
                case .active:
                    print("App became active")
                case .inactive:
                    print("App became inactive")
                case .background:
                    print("App moved to background")
                @unknown default:
                    break
                }
            }
    }
}`}
        height="340px"
        expectedOutput="SwiftUI アプリのライフサイクル例です。Xcodeで実行して確認してください。"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">UIApplicationDelegate（UIKit）</h2>
        <p>
          UIKit ベースのアプリや UIKit の機能を SwiftUI から使う場合は
          <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300">UIApplicationDelegate</code> を実装します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`import UIKit

// UIKit ライフサイクル（従来の方法）
@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        print("App launched")
        // 初期設定（プッシュ通知登録など）
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        print("Will resign active")
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        print("Entered background")
        // バックグラウンドタスクを開始
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        print("Will enter foreground")
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        print("Did become active")
    }
}

// SwiftUI で UIApplicationDelegate を使う
// @main
// struct MyApp: App {
//     @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
//     var body: some Scene { WindowGroup { ContentView() } }
// }`}
        height="320px"
        expectedOutput="UIApplicationDelegate のライフサイクルメソッド例です。"
      />

      <SwiftEditor
        defaultCode={`// アプリの状態遷移まとめ
// Not Running → Inactive → Active
//                             ↓
//                          Inactive → Background → Suspended

// SwiftUI ScenePhase との対応
// .active    = Foreground Active
// .inactive  = Foreground Inactive / 画面切り替え中
// .background = Background

// バックグラウンドタスクの登録（SwiftUI）
import BackgroundTasks

// Info.plist に BGTaskSchedulerPermittedIdentifiers が必要
// BGTaskScheduler.shared.register(
//     forTaskWithIdentifier: "com.example.refresh",
//     using: nil
// ) { task in
//     // バックグラウンドで実行する処理
//     task.setTaskCompleted(success: true)
// }

// アプリ状態のシミュレーション
enum AppLifecycleState: String {
    case notRunning = "起動前"
    case inactive   = "非アクティブ"
    case active     = "アクティブ"
    case background = "バックグラウンド"
    case suspended  = "サスペンド"
}

var state: AppLifecycleState = .notRunning
print("Initial: \\(state.rawValue)")
state = .active
print("Current: \\(state.rawValue)")`}
        height="300px"
        expectedOutput="Initial: 起動前\nCurrent: アクティブ"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ios" lessonId="app-lifecycle" />
      </div>
      <LessonNav lessons={lessons} currentId="app-lifecycle" basePath="/learn/ios" />
    </div>
  );
}
