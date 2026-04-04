import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function CustomExceptionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">例外処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタム例外</h1>
        <p className="text-gray-400">Exceptionクラスを継承した独自の例外クラスを作成する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外の設計</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カスタム例外を使うと、ドメイン固有のエラー情報を持たせることができます。
          ExceptionやRuntimeExceptionを継承して作成します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Exceptionを継承してカスタム例外クラスを作る</li>
          <li>追加のプロパティでエラー情報を付加できる</li>
          <li>例外の階層を作ることで分類して処理できる</li>
          <li>sealed classと組み合わせると型安全なエラーハンドリングができる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なカスタム例外</h2>
        <p className="text-gray-400 mb-4">Exceptionを継承してカスタム例外を作成します。</p>
        <KotlinEditor
          defaultCode={`class ValidationException(
    message: String,
    val field: String,
    val value: Any?
) : Exception(message)

fun validateEmail(email: String) {
    if (!email.contains("@")) {
        throw ValidationException(
            "無効なメールアドレス",
            field = "email",
            value = email
        )
    }
}

fun main() {
    try {
        validateEmail("invalid-email")
    } catch (e: ValidationException) {
        println("バリデーションエラー: \${e.message}")
        println("フィールド: \${e.field}")
        println("値: \${e.value}")
    }
    validateEmail("user@example.com")
    println("バリデーション成功")
}`}
          expectedOutput={`バリデーションエラー: 無効なメールアドレス
フィールド: email
値: invalid-email
バリデーション成功`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外の階層構造</h2>
        <p className="text-gray-400 mb-4">基底例外クラスを作り、サブクラスで具体的なエラーを表現します。</p>
        <KotlinEditor
          defaultCode={`open class AppException(message: String) : Exception(message)
class NetworkException(message: String) : AppException("ネットワークエラー: \${message}")
class DatabaseException(message: String) : AppException("DBエラー: \${message}")

fun simulateOperation(type: String) {
    when (type) {
        "network" -> throw NetworkException("接続タイムアウト")
        "db" -> throw DatabaseException("クエリ失敗")
        else -> println("成功: \${type}")
    }
}

fun main() {
    listOf("success", "network", "db").forEach { type ->
        try {
            simulateOperation(type)
        } catch (e: AppException) {
            println("アプリエラー: \${e.message}")
        }
    }
}`}
          expectedOutput={`成功: success
アプリエラー: ネットワークエラー: 接続タイムアウト
アプリエラー: DBエラー: クエリ失敗`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="custom-exceptions" />
      </div>
      <LessonNav lessons={lessons} currentId="custom-exceptions" basePath="/learn/exceptions" />
    </div>
  );
}
