import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "ecosystem")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "LLDB でオブジェクトの内容を出力するコマンドはどれですか？",
    options: ["print", "po", "log", "dump"],
    answer: 1,
    explanation: "po（print object）コマンドでオブジェクトのdescriptionを出力できます。p コマンドはLLDB式として評価します。",
  },
  {
    question: "Instruments の Time Profiler は何を計測しますか？",
    options: [
      "メモリアロケーション量",
      "CPU使用時間とホットスポット",
      "ネットワーク通信量",
      "ディスクI/O",
    ],
    answer: 1,
    explanation: "Time Profiler はCPUの使用時間を計測し、パフォーマンスのボトルネックを特定するために使います。",
  },
  {
    question: "SwiftLint は主に何をするツールですか？",
    options: [
      "Swiftコードをコンパイルする",
      "コードのスタイルとベストプラクティスをチェックする",
      "自動テストを生成する",
      "依存パッケージを管理する",
    ],
    answer: 1,
    explanation: "SwiftLint はSwiftのコーディング規約やベストプラクティスに違反していないかを静的解析するLintツールです。",
  },
];

export default function EcosystemPage() {
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
          Swift開発を支えるエコシステムを学びましょう。Xcodeのワークスペース構成、
          LLDBを使ったデバッグ技法、Instrumentsによるパフォーマンス計測、
          swift-formatやSwiftLintによるコード品質管理、Xcode CloudやGitHub ActionsによるCI/CDまで、
          プロフェッショナルな開発フローを習得します。
        </p>
        <ProgressBar categoryId="ecosystem" totalLessons={category.lessons.length} color="green" />
      </div>

      {/* Lesson List */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-4">レッスン一覧</h2>
        <LessonList lessons={category.lessons} basePath="/learn/ecosystem" color="green" categoryId="ecosystem" />
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-100">コード例</h2>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">SwiftLint 設定ファイル (.swiftlint.yml)</h3>
          <SwiftEditor
            defaultCode={`# .swiftlint.yml の例

# disabled_rules:
#   - trailing_whitespace

# opt_in_rules:
#   - empty_count
#   - force_unwrapping

# included:
#   - Sources

# excluded:
#   - Pods
#   - .build

# line_length:
#   warning: 120
#   error: 150

# type_body_length:
#   warning: 300
#   error: 400

# file_length:
#   warning: 500
#   error: 800`}
            height="260px"
            expectedOutput="SwiftLintの設定ファイル例です。YAMLで各ルールをカスタマイズできます。"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">GitHub Actions CI/CD ワークフロー</h3>
          <SwiftEditor
            defaultCode={`# .github/workflows/swift.yml
# name: Swift CI

# on:
#   push:
#     branches: [ main ]
#   pull_request:
#     branches: [ main ]

# jobs:
#   build:
#     runs-on: macos-latest
#     steps:
#     - uses: actions/checkout@v4
#     - name: Build
#       run: swift build -v
#     - name: Run tests
#       run: swift test -v

// LLDB コマンド例
// (lldb) po myObject          // オブジェクトの出力
// (lldb) p myVariable         // 変数の値
// (lldb) bt                   // バックトレース
// (lldb) frame variable       // 現在フレームの変数一覧
// (lldb) expression count = 5 // 変数を書き換え`}
            height="260px"
            expectedOutput="GitHub ActionsとLLDBのコマンド例です。"
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
