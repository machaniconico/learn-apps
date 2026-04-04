import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("scope-functions");

export default function ComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">スコープ関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スコープ関数の比較</h1>
        <p className="text-gray-400">let・run・with・apply・alsoの違いと適切な選び方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">5つのスコープ関数の整理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スコープ関数の選び方は2つの観点で決まります。
          ①ラムダ内でオブジェクトをthisで参照するかitで参照するか、
          ②戻り値がラムダの結果かオブジェクト自身か。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>let - it参照、ラムダ結果を返す → null安全処理・変換</li>
          <li>run - this参照、ラムダ結果を返す → 計算・変換</li>
          <li>with - this参照、ラムダ結果を返す → 複数操作のまとめ</li>
          <li>apply - this参照、オブジェクトを返す → 初期化</li>
          <li>also - it参照、オブジェクトを返す → 副作用・ログ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各スコープ関数の使い分け</h2>
        <p className="text-gray-400 mb-4">
          同じ処理でも異なるスコープ関数で書けます。
          目的に合ったものを選びましょう。
        </p>
        <KotlinEditor
          defaultCode={`data class User(var name: String, var email: String)

fun main() {
    // apply - 初期化・設定
    val user = User("", "").apply {
        name = "Alice"
        email = "alice@example.com"
    }

    // let - 変換、null安全
    val greeting = user.let { "こんにちは、${"$"}{it.name}！" }

    // run - thisで複数プロパティを使う計算
    val info = user.run { "${"$"}{name} <${"$"}{email}>" }

    // also - 副作用（ログ）
    user.also { println("ユーザー作成: ${"$"}{it.name}") }

    println(greeting)
    println(info)
}`}
          expectedOutput={`ユーザー作成: Alice
こんにちは、Alice！
Alice <alice@example.com>`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践的なチェーン</h2>
        <p className="text-gray-400 mb-4">
          複数のスコープ関数をチェーンして複雑な処理を読みやすく書けます。
        </p>
        <KotlinEditor
          defaultCode={`data class Config(var host: String = "", var port: Int = 0)

fun loadConfig(): Config? = Config("localhost", 8080)

fun main() {
    val result = loadConfig()
        ?.also { println("設定読み込み: ${"$"}{it}") }
        ?.run {
            if (port == 8080) copy(port = 9090) else this
        }
        ?.let { cfg ->
            "接続先: ${"$"}{cfg.host}:${"$"}{cfg.port}"
        } ?: "設定なし"

    println(result)
}`}
          expectedOutput={`設定読み込み: Config(host=localhost, port=8080)
接続先: localhost:9090`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="scope-functions" lessonId="comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="comparison" basePath="/learn/scope-functions" />
    </div>
  );
}
