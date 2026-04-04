import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function SealedClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">継承 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">シールドクラス</h1>
        <p className="text-gray-400">sealed classで型階層を制限し、when式で網羅的なパターンマッチを実現します。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sealed classの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">sealed class</code>はサブクラスを同じファイル内に限定します。when式で網羅チェックができます。
        </p>
        <KotlinEditor
          defaultCode={`sealed class NetworkResult
data class Success(val data: String) : NetworkResult()
data class Error(val code: Int, val message: String) : NetworkResult()
object Loading : NetworkResult()
object Empty : NetworkResult()

fun handleResult(result: NetworkResult): String = when (result) {
    is Success -> "データ取得成功: ${"$"}{result.data}"
    is Error   -> "エラー ${"$"}{result.code}: ${"$"}{result.message}"
    is Loading -> "読み込み中..."
    is Empty   -> "データなし"
}

fun main() {
    listOf(Success("ユーザー一覧"), Error(404, "見つかりません"), Loading, Empty)
        .forEach { println(handleResult(it)) }
}`}
          expectedOutput={`データ取得成功: ユーザー一覧
エラー 404: 見つかりません
読み込み中...
データなし`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sealed classと式木</h2>
        <p className="text-gray-400 mb-4">sealed classはdata class・object・通常のclassを組み合わせて再帰的な構造も表現できます。</p>
        <KotlinEditor
          defaultCode={`sealed class Expr {
    data class Number(val value: Double) : Expr()
    data class Add(val left: Expr, val right: Expr) : Expr()
    data class Multiply(val left: Expr, val right: Expr) : Expr()
}

fun evaluate(expr: Expr): Double = when (expr) {
    is Expr.Number   -> expr.value
    is Expr.Add      -> evaluate(expr.left) + evaluate(expr.right)
    is Expr.Multiply -> evaluate(expr.left) * evaluate(expr.right)
}

fun main() {
    // (3 + 4) * 2
    val expression = Expr.Multiply(
        Expr.Add(Expr.Number(3.0), Expr.Number(4.0)),
        Expr.Number(2.0)
    )
    println("結果: ${"$"}{evaluate(expression)}")
}`}
          expectedOutput={`結果: 14.0`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">UIステートのモデリング</h2>
        <p className="text-gray-400 mb-4">sealed classはUIの状態管理に特に有用です。型安全に有限の状態を表現できます。</p>
        <KotlinEditor
          defaultCode={`sealed class UiState<out T> {
    object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String) : UiState<Nothing>()
}

data class User(val name: String, val age: Int)

fun renderUi(state: UiState<User>) = when (state) {
    is UiState.Loading  -> println("スピナー表示中...")
    is UiState.Success  -> println("ユーザー: ${"$"}{state.data.name}, ${"$"}{state.data.age}歳")
    is UiState.Error    -> println("エラー画面: ${"$"}{state.message}")
}

fun main() {
    renderUi(UiState.Loading)
    renderUi(UiState.Success(User("田中", 30)))
    renderUi(UiState.Error("ネットワークエラー"))
}`}
          expectedOutput={`スピナー表示中...
ユーザー: 田中, 30歳
エラー画面: ネットワークエラー`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="sealed-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="sealed-classes" basePath="/learn/inheritance" />
    </div>
  );
}
