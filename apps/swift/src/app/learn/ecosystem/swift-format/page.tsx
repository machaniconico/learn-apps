import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function SwiftFormatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swiftエコシステム</span>
        <h1 className="text-3xl font-bold text-gray-100">コード品質ツール</h1>
        <p className="text-gray-400">swift-format・SwiftLint によるコード品質管理を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          <strong>swift-format</strong> は Apple 公式のコードフォーマッタ、
          <strong>SwiftLint</strong> は Realm 開発のLintツールです。
          どちらも CI に組み込むことでコードの一貫性を保てます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// swift-format の設定ファイル（.swift-format）
// JSON 形式で設定する

// {
//   "version": 1,
//   "lineLength": 100,
//   "indentation": { "spaces": 4 },
//   "tabWidth": 4,
//   "maximumBlankLines": 1,
//   "respectsExistingLineBreaks": true,
//   "lineBreakBeforeEachArgument": true,
//   "lineBreakBeforeEachGenericRequirement": true,
//   "prioritizeKeepingFunctionOutputTogether": true,
//   "indentConditionalCompilationBlocks": true,
//   "rules": {
//     "AlwaysUseLowerCamelCase": true,
//     "AmbiguousTrailingClosureSyntax": true,
//     "BeginDocumentationCommentWithOneLineSummary": true,
//     "DoNotUseSemicolons": true,
//     "FileScopedDeclarationPrivacy": true,
//     "FullyIndirectEnum": true,
//     "GroupNumericLiterals": true,
//     "NoAccessLevelOnExtensionDeclaration": true,
//     "NoBlockComments": false,
//     "NoCasesWithOnlyFallthrough": true
//   }
// }

// 使用コマンド:
// $ swift-format format --in-place Sources/
// $ swift-format lint Sources/
// $ swift-format format --configuration .swift-format -i MyFile.swift

print("swift-format configuration example")`}
        height="360px"
        expectedOutput="swift-format configuration example"
      />

      <SwiftEditor
        defaultCode={`// SwiftLint の設定ファイル（.swiftlint.yml）
// YAML 形式で設定する

// disabled_rules:
//   - trailing_whitespace    # 末尾スペース（Xcodeが自動追加する場合）
//   - force_cast             # チームで許可している場合

// opt_in_rules:             # デフォルトOFFのルールを有効化
//   - empty_count            # count == 0 より isEmpty を使う
//   - force_unwrapping       # ! による強制アンラップを禁止
//   - implicitly_unwrapped_optional  # IUO を禁止
//   - closure_spacing        # クロージャ内のスペース統一
//   - literal_expression_end_indentation

// included:
//   - Sources
//   - Tests

// excluded:
//   - Pods
//   - .build
//   - DerivedData

// line_length:
//   warning: 120
//   error: 200

// type_body_length:
//   warning: 400
//   error: 600

// file_length:
//   warning: 500
//   error: 1000

// function_body_length:
//   warning: 50
//   error: 100

// 使用コマンド:
// $ swiftlint lint
// $ swiftlint lint --fix  (自動修正)

// SwiftLint ルール違反のコード例と修正
let count = [1, 2, 3].count
// SwiftLint: prefer isEmpty over count == 0
// 修正: let isEmpty = [1, 2, 3].isEmpty

print("SwiftLint rules example")
print("Array count: \\(count)")`}
        height="420px"
        expectedOutput="SwiftLint rules example\nArray count: 3"
      />

      <SwiftEditor
        defaultCode={`// Xcode Build Phase に SwiftLint を統合
// Target → Build Phases → + → New Run Script Phase

// スクリプト内容:
// if which swiftlint > /dev/null; then
//   swiftlint
// else
//   echo "warning: SwiftLint not installed. Run: brew install swiftlint"
// fi

// SPM プラグインとして統合（Package.swift）
// dependencies: [
//     .package(
//         url: "https://github.com/SimplyDanny/SwiftLintPlugins",
//         from: "0.57.0"
//     ),
// ],
// targets: [
//     .target(
//         name: "MyApp",
//         plugins: [.plugin(name: "SwiftLintBuildToolPlugin",
//                           package: "SwiftLintPlugins")]
//     ),
// ]

// コード品質を上げるベストプラクティス
struct CodeQualityExample {
    // Good: 明示的な型
    let userId: Int
    let userName: String

    // Good: プロパティに文書コメント
    /// ユーザーが認証済みかどうか
    var isAuthenticated: Bool

    // Good: guard による早期リターン
    func processUser(_ input: String?) -> String {
        guard let input = input, !input.isEmpty else {
            return "Invalid input"
        }
        return "Processed: \\(input)"
    }
}

let example = CodeQualityExample(userId: 1, userName: "Alice", isAuthenticated: true)
print(example.processUser("test"))
print(example.processUser(nil))`}
        height="380px"
        expectedOutput="Processed: test\nInvalid input"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ecosystem" lessonId="swift-format" />
      </div>
      <LessonNav lessons={lessons} currentId="swift-format" basePath="/learn/ecosystem" />
    </div>
  );
}
