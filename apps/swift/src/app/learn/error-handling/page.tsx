import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "error-handling")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "エラーをスローできる関数を定義するキーワードはどれですか？",
    options: ["throw", "throws", "error", "raise"],
    answer: 1,
    explanation: "func myFunc() throws {} のように throws キーワードを付けた関数がエラーをスローできます。",
  },
  {
    question: "try? を使った場合、エラーが発生するとどうなりますか？",
    options: [
      "プログラムがクラッシュする",
      "nilが返される",
      "エラーが無視される",
      "デフォルト値が返される",
    ],
    answer: 1,
    explanation: "try? はエラーをオプショナルに変換し、エラー発生時は nil を返します。成功時は Optional でラップされた値が返ります。",
  },
  {
    question: "Result<Success, Failure> 型の Failure に使える型の条件は何ですか？",
    options: [
      "Anyに準拠している",
      "Errorプロトコルに準拠している",
      "Equatableに準拠している",
      "制約はない",
    ],
    answer: 1,
    explanation: "Result<Success, Failure: Error> のように、Failure は Error プロトコルに準拠した型でなければなりません。",
  },
  {
    question: "rethrows キーワードの役割は何ですか？",
    options: [
      "エラーを再スローして握りつぶす",
      "引数のクロージャがスローする場合のみ関数もスロー可能にする",
      "エラーを別の型に変換する",
      "非同期エラーを同期的に処理する",
    ],
    answer: 1,
    explanation: "rethrows を付けた関数は、引数として受け取るクロージャがエラーをスローする場合にのみ、そのエラーを伝播させます。",
  },
];

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">エラーハンドリング</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">{lessons.length}レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Swiftのエラーハンドリングはthrows・do-catch・try構文で安全にエラーを処理します。
          カスタムErrorプロトコル実装、Result型による関数型スタイル、rethrowsによるエラー伝播まで、
          堅牢なアプリケーション開発に欠かせない知識を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="error-handling" totalLessons={lessons.length} color="orange" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全{lessons.length}レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/error-handling" color="orange" categoryId="error-handling" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例</h2>
        <SwiftEditor
          defaultCode={`enum NetworkError: Error {
    case notFound
    case unauthorized
    case serverError(Int)
}

func fetchUser(id: Int) throws -> String {
    if id <= 0 { throw NetworkError.notFound }
    if id == 403 { throw NetworkError.unauthorized }
    return "User\\(id)"
}

// do-catch
do {
    let user = try fetchUser(id: 1)
    print(user)
    let _ = try fetchUser(id: 0)
} catch NetworkError.notFound {
    print("ユーザーが見つかりません")
} catch NetworkError.unauthorized {
    print("認証エラー")
} catch {
    print("その他のエラー: \\(error)")
}

// try? で Optional に
let result = try? fetchUser(id: 42)
print(result ?? "nil")

// Result 型
func safeDiv(_ a: Int, _ b: Int) -> Result<Int, Error> {
    if b == 0 { return .failure(NetworkError.notFound) }
    return .success(a / b)
}
print(safeDiv(10, 2))`}
          expectedOutput={`User1
ユーザーが見つかりません
User42
success(5)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
