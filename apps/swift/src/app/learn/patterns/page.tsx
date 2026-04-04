import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "patterns")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Singletonパターンの特徴は？",
    options: ["複数のインスタンスを作成する", "アプリ全体で1つのインスタンスを共有する", "インスタンスを作成しない", "プロトコルに準拠する"],
    answer: 1,
    explanation: "Singletonはstatic let sharedでアプリ全体で唯一のインスタンスを提供するパターンです。",
  },
  {
    question: "MVVMのViewModelの役割は？",
    options: ["データ永続化", "UI描画", "ModelとViewの間のロジック管理", "ネットワーク通信のみ"],
    answer: 2,
    explanation: "ViewModelはModelからデータを取得し、Viewが表示しやすい形に変換するビジネスロジックを担います。",
  },
  {
    question: "依存性注入（DI）のメリットは？",
    options: ["コードが複雑になる", "テスタビリティと柔軟性が向上する", "パフォーマンスが向上する", "メモリ使用量が減る"],
    answer: 1,
    explanation: "DIにより依存をプロトコルで抽象化でき、テスト時にモックに差し替えやすくなりテスタビリティが向上します。",
  },
  {
    question: "Factoryパターンの目的は？",
    options: ["オブジェクトの破棄", "オブジェクト生成ロジックの隠蔽・集約", "データの変換", "UIの構築"],
    answer: 1,
    explanation: "Factoryパターンはオブジェクト生成の詳細を隠蔽し、生成ロジックを一箇所に集約します。",
  },
];

export default function PatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">{category.name}</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty={category.difficulty} />
          <span className="text-gray-500 text-sm">{category.lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Swiftでよく使われるデザインパターンを学びます。
          Singleton、Observer、MVVM、依存性注入、Coordinator、Factoryパターンを
          実際のコード例を通して理解しましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="patterns" totalLessons={category.lessons.length} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{category.lessons.length}レッスン</h2>
        <LessonList lessons={category.lessons} basePath="/learn/patterns" color="purple" categoryId="patterns" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Singletonパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">static let shared</code>を使って
          アプリ全体で唯一のインスタンスを提供するパターンです。
        </p>
        <SwiftEditor
          defaultCode={`class AppSettings {
    // シングルトンインスタンス
    static let shared = AppSettings()

    // 外部からのインスタンス生成を禁止
    private init() {}

    var isDarkMode: Bool = false
    var fontSize: Int = 14
    var language: String = "ja"
}

// どこからでも同じインスタンスにアクセス
AppSettings.shared.isDarkMode = true
AppSettings.shared.fontSize = 16

let settings = AppSettings.shared
print("ダークモード:", settings.isDarkMode)
print("フォントサイズ:", settings.fontSize)
print("言語:", settings.language)`}
          expectedOutput={`ダークモード: true
フォントサイズ: 16
言語: ja`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MVVMパターン</h2>
        <p className="text-gray-400 mb-4">
          Model-View-ViewModelパターンはSwiftUIと相性の良いアーキテクチャです。
          ViewModelがビジネスロジックを担い、ViewはUIだけに集中できます。
        </p>
        <SwiftEditor
          defaultCode={`import Foundation

// Model
struct User: Identifiable {
    let id: Int
    let name: String
    let email: String
}

// ViewModel
@Observable
class UserViewModel {
    var users: [User] = []
    var isLoading = false
    var errorMessage: String?

    func loadUsers() async {
        isLoading = true
        defer { isLoading = false }

        // 実際はAPIからフェッチ
        try? await Task.sleep(nanoseconds: 500_000_000)
        users = [
            User(id: 1, name: "田中太郎", email: "tanaka@example.com"),
            User(id: 2, name: "山田花子", email: "yamada@example.com"),
        ]
        print("ユーザー数:", users.count)
    }
}

// 使用例
let vm = UserViewModel()
Task {
    await vm.loadUsers()
    for user in vm.users {
        print("\\(user.id): \\(user.name) (\\(user.email))")
    }
}`}
          expectedOutput={`ユーザー数: 2
1: 田中太郎 (tanaka@example.com)
2: 山田花子 (yamada@example.com)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
