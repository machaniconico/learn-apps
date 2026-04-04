import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・インターフェース レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">objectキーワード</h1>
        <p className="text-gray-400">object宣言を使ったシングルトンオブジェクトの作成方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">object</code>宣言はシングルトンパターンをKotlinで簡潔に実現します。
          クラスの定義とインスタンス生成が同時に行われ、アプリ全体で唯一のインスタンスとなります。
          クラス名でそのままアクセスできます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong className="text-white">object式</strong>（無名オブジェクト）はその場でインターフェースを実装したオブジェクトを
          作成するときに使います。Javaの無名クラスに相当します。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: object宣言（シングルトン）</h2>
        <KotlinEditor
          defaultCode={`object AppConfig {
    val appName = "Kotlin学習アプリ"
    var version = "1.0.0"
    private val settings = mutableMapOf<String, String>()

    fun set(key: String, value: String) { settings[key] = value }
    fun get(key: String) = settings[key] ?: "未設定"
    fun info() = "$\{appName} v$\{version}"
}

fun main() {
    println(AppConfig.info())
    AppConfig.set("theme", "dark")
    AppConfig.set("language", "ja")
    println("テーマ: $\{AppConfig.get("theme")}")
    println("言語: $\{AppConfig.get("language")}")
    println("未知: $\{AppConfig.get("unknown")}")
}`}
          expectedOutput={`Kotlin学習アプリ v1.0.0
テーマ: dark
言語: ja
未知: 未設定`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: object式（無名オブジェクト）</h2>
        <KotlinEditor
          defaultCode={`interface ClickListener {
    fun onClick(id: String)
}

fun setupButton(id: String, listener: ClickListener) {
    println("ボタン[$\{id}]のクリックをシミュレート")
    listener.onClick(id)
}

fun main() {
    setupButton("submit", object : ClickListener {
        override fun onClick(id: String) {
            println("ボタン[$\{id}]がクリックされました！フォームを送信します")
        }
    })

    setupButton("cancel", object : ClickListener {
        override fun onClick(id: String) {
            println("ボタン[$\{id}]がクリックされました！キャンセルします")
        }
    })
}`}
          expectedOutput={`ボタン[submit]のクリックをシミュレート
ボタン[submit]がクリックされました！フォームを送信します
ボタン[cancel]のクリックをシミュレート
ボタン[cancel]がクリックされました！キャンセルします`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="object-declarations" />
      </div>
      <LessonNav lessons={lessons} currentId="object-declarations" basePath="/learn/inheritance" />
    </div>
  );
}
