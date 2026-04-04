import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("coroutines");

export default function SuspendFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">コルーチン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">suspend関数</h1>
        <p className="text-gray-400">suspendキーワードを使った一時停止可能な関数の定義と呼び出しを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">suspend関数の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          suspend関数はコルーチンの中断ポイントになれる関数です。
          スレッドをブロックせずに非同期処理の結果を待てます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>suspendキーワードを関数宣言の前に付ける</li>
          <li>コルーチンまたは別のsuspend関数から呼び出す</li>
          <li>内部でdelayやawait()などのsuspend関数を使える</li>
          <li>通常の関数と同じように見えるが非同期に動作する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">suspend関数の定義</h2>
        <p className="text-gray-400 mb-4">suspendキーワードで一時停止可能な関数を定義します。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun greet(name: String): String {
    delay(100L) // 非同期待機（スレッドをブロックしない）
    return "こんにちは、\${name}さん！"
}

fun main() = runBlocking {
    val message = greet("Kotlin")
    println(message)
}`}
          expectedOutput={`こんにちは、Kotlinさん！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">suspend関数のチェーン</h2>
        <p className="text-gray-400 mb-4">suspend関数は別のsuspend関数を呼び出せます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun fetchUserId(): Int {
    delay(100L)
    return 42
}

suspend fun fetchUserName(id: Int): String {
    delay(100L)
    return "ユーザー\${id}"
}

suspend fun fetchUser(): String {
    val id = fetchUserId()
    return fetchUserName(id)
}

fun main() = runBlocking {
    val user = fetchUser()
    println(user)
}`}
          expectedOutput={`ユーザー42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">withContextでのコンテキスト切り替え</h2>
        <p className="text-gray-400 mb-4">withContextを使うとsuspend関数内でディスパッチャを切り替えられます。</p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun loadData(): String = withContext(Dispatchers.IO) {
    // I/O処理をシミュレート
    delay(200L)
    "データ読み込み完了"
}

fun main() = runBlocking {
    println("開始")
    val data = loadData()
    println(data)
    println("終了")
}`}
          expectedOutput={`開始
データ読み込み完了
終了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="coroutines" lessonId="suspend-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="suspend-functions" basePath="/learn/coroutines" />
    </div>
  );
}
