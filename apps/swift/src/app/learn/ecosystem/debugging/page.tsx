import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function DebuggingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Swiftエコシステム</span>
        <h1 className="text-3xl font-bold text-gray-100">デバッグ</h1>
        <p className="text-gray-400">LLDB・ブレークポイント・po コマンドの活用を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          LLDB（Low Level Debugger）は Xcode に統合されたデバッガです。
          ブレークポイントで実行を一時停止し、変数の状態確認・コードの動的変更・バックトレースの確認ができます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// LLDB コマンドリファレンス

// 基本コマンド:
// po <expr>        オブジェクトを print（description を表示）
// p <expr>         式を評価して値を表示
// v <varname>      変数の値を表示（高速）
// bt               バックトレース（コールスタック）
// frame info       現在のフレーム情報
// frame variable   現在フレームの全変数

// ブレークポイント:
// br set -f MyFile.swift -l 42  特定行にブレークポイント
// br set -n myFunction          関数名でブレークポイント
// br list                       ブレークポイント一覧
// br delete 1                   ブレークポイント削除
// br disable 1                  無効化

// 実行制御:
// c (continue)     実行を継続
// n (next)         ステップオーバー
// s (step)         ステップイン
// finish           現在の関数を完了まで実行

// 変数の書き換え（デバッグ中）:
// expression myVariable = 42
// expression isLoggedIn = true

struct User {
    let name: String
    var score: Int
}

let user = User(name: "Alice", score: 95)
// Xcodeのデバッガで: po user → ▿ User - name: "Alice", score: 95
print("User: \\(user.name), Score: \\(user.score)")`}
        height="380px"
        expectedOutput="User: Alice, Score: 95"
      />

      <SwiftEditor
        defaultCode={`// 条件付きブレークポイントとログポイント

// 条件付きブレークポイント（Xcodeで設定）:
// ブレークポイントを右クリック → Edit Breakpoint
// Condition: index > 10  (配列処理でこの条件のみ停止)

// ログポイント（ブレークポイントの代わりにログ出力）:
// Action: Log Message: "Processing item @{item}"
// "Automatically continue after evaluating actions" にチェック

// カスタムデバッグ出力
extension User: CustomDebugStringConvertible {
    var debugDescription: String {
        "User(name: \\(name), score: \\(score), grade: \\(grade))"
    }

    var grade: String {
        switch score {
        case 90...100: return "A"
        case 80..<90:  return "B"
        case 70..<80:  return "C"
        default:       return "F"
        }
    }
}

struct User {
    let name: String
    var score: Int
}

let users = [
    User(name: "Alice", score: 95),
    User(name: "Bob", score: 72),
    User(name: "Charlie", score: 88),
]

// po users でデバッガに出力される
for user in users {
    print(user.debugDescription)
}`}
        height="360px"
        expectedOutput="User(name: Alice, score: 95, grade: A)\nUser(name: Bob, score: 72, grade: C)\nUser(name: Charlie, score: 88, grade: B)"
      />

      <SwiftEditor
        defaultCode={`// assert と precondition でデバッグを支援
func divide(_ a: Double, by b: Double) -> Double {
    // Debug ビルドのみ停止（Release は最適化で除去）
    assert(b != 0, "除数は0以外でなければなりません")
    return a / b
}

// precondition は Release でも実行される
func getElement<T>(from array: [T], at index: Int) -> T {
    precondition(index >= 0 && index < array.count,
                 "Index \\(index) is out of range [0, \\(array.count))")
    return array[index]
}

// assertionFailure / fatalError
enum Direction { case north, south, east, west }

func move(direction: Direction) -> String {
    switch direction {
    case .north: return "Moving North"
    case .south: return "Moving South"
    case .east:  return "Moving East"
    case .west:  return "Moving West"
    }
}

print(divide(10, by: 2))    // 5.0
let arr = [1, 2, 3, 4, 5]
print(getElement(from: arr, at: 2))  // 3
print(move(direction: .north))       // Moving North`}
        height="280px"
        expectedOutput="5.0\n3\nMoving North"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="ecosystem" lessonId="debugging" />
      </div>
      <LessonNav lessons={lessons} currentId="debugging" basePath="/learn/ecosystem" />
    </div>
  );
}
