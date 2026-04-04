import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "spm")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Swift Package Managerで新しいライブラリパッケージを作成するコマンドはどれですか？",
    options: [
      "swift package init --type library",
      "swift new package --library",
      "swift create package",
      "swift init --library",
    ],
    answer: 0,
    explanation: "swift package init --type library でライブラリパッケージを作成します。--type executable で実行ファイルも作成できます。",
  },
  {
    question: "Package.swift で外部パッケージの依存を宣言するのに使うフィールドはどれですか？",
    options: ["imports", "dependencies", "packages", "requires"],
    answer: 1,
    explanation: "Package.swift の dependencies フィールドに .package(url:from:) などで外部パッケージを指定します。",
  },
  {
    question: "SPM の targets の中で、テスト用ターゲットを定義するには何を使いますか？",
    options: [".target", ".executableTarget", ".testTarget", ".plugin"],
    answer: 2,
    explanation: ".testTarget を使うとXCTestベースのテストターゲットを定義できます。",
  },
];

export default function SPMPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-green-400">{category.name}</h1>
          <DifficultyBadge difficulty={category.difficulty} />
          <span className="text-sm text-gray-500">{category.lessons.length} レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Swift Package Manager (SPM) はSwift公式のパッケージ管理ツールです。
          Package.swift でパッケージの構成を宣言し、依存パッケージの追加、ターゲットとプロダクトの定義、
          プラグインの活用まで、Swiftエコシステムの中心的なツールを習得しましょう。
        </p>
        <ProgressBar categoryId="spm" totalLessons={category.lessons.length} color="green" />
      </div>

      {/* Lesson List */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-4">レッスン一覧</h2>
        <LessonList lessons={category.lessons} basePath="/learn/spm" color="green" categoryId="spm" />
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-100">コード例</h2>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">基本的な Package.swift</h3>
          <SwiftEditor
            defaultCode={`// Package.swift
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyLibrary",
    platforms: [
        .macOS(.v13),
        .iOS(.v16),
    ],
    products: [
        .library(
            name: "MyLibrary",
            targets: ["MyLibrary"]
        ),
    ],
    dependencies: [
        .package(
            url: "https://github.com/apple/swift-algorithms",
            from: "1.0.0"
        ),
    ],
    targets: [
        .target(
            name: "MyLibrary",
            dependencies: [
                .product(name: "Algorithms", package: "swift-algorithms")
            ]
        ),
        .testTarget(
            name: "MyLibraryTests",
            dependencies: ["MyLibrary"]
        ),
    ]
)`}
            height="340px"
            expectedOutput="Package.swift の構造例です。products・dependencies・targets を宣言します。"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">swift package コマンド</h3>
          <SwiftEditor
            defaultCode={`// ターミナルで実行するSPMコマンド

// パッケージの初期化
// $ swift package init --type library
// $ swift package init --type executable

// 依存関係のビルド
// $ swift build

// テストの実行
// $ swift test

// パッケージグラフの表示
// $ swift package show-dependencies

// パッケージの更新
// $ swift package update

// Xcodeプロジェクトの生成
// $ swift package generate-xcodeproj`}
            height="220px"
            expectedOutput="これらはターミナルコマンドです。Xcodeのターミナルやシェルから実行してください。"
          />
        </div>
      </section>

      {/* Quiz */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-2">確認クイズ</h2>
        <Quiz questions={quizQuestions} color="green" />
      </section>
    </div>
  );
}
