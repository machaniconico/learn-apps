import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("scope-functions");

export default function ApplyAlsoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">スコープ関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">apply・also関数</h1>
        <p className="text-gray-400">オブジェクト自身を返すapplyとalsoの使い方と使い分け</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">applyとalsoとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">apply</code>と
          <code className="text-pink-300">also</code>はどちらも
          レシーバオブジェクト自身を返します。
          違いはラムダ内でのオブジェクトの参照方法です。
          applyはthis、alsoはitを使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>apply - thisでアクセス、オブジェクト初期化に使う</li>
          <li>also - itでアクセス、副作用（ログ等）に使う</li>
          <li>両方ともレシーバオブジェクトを返す</li>
          <li>チェーンしても元のオブジェクトが流れる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">applyでオブジェクト初期化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">apply</code>はオブジェクトを作成して
          初期設定をするパターンに最適です。
        </p>
        <KotlinEditor
          defaultCode={`data class ServerConfig(
    var host: String = "localhost",
    var port: Int = 8080,
    var maxConnections: Int = 100,
    var timeout: Int = 30
)

fun main() {
    val config = ServerConfig().apply {
        host = "example.com"
        port = 443
        maxConnections = 500
        timeout = 60
    }
    println(config)

    val list = mutableListOf<Int>().apply {
        add(1)
        add(2)
        add(3)
    }
    println(list)
}`}
          expectedOutput={`ServerConfig(host=example.com, port=443, maxConnections=500, timeout=60)
[1, 2, 3]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">alsoで副作用を挟む</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">also</code>はチェーンの途中でログ出力などの
          副作用を挟むのに適しています。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = mutableListOf(1, 2, 3)
        .also { println("初期: ${"$"}{it}") }
        .apply { add(4); add(5) }
        .also { println("追加後: ${"$"}{it}") }
        .filter { it % 2 == 0 }
        .also { println("フィルタ後: ${"$"}{it}") }

    println("最終: ${"$"}{numbers}")
}`}
          expectedOutput={`初期: [1, 2, 3]
追加後: [1, 2, 3, 4, 5]
フィルタ後: [2, 4]
最終: [2, 4]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="scope-functions" lessonId="apply-also" />
      </div>
      <LessonNav lessons={lessons} currentId="apply-also" basePath="/learn/scope-functions" />
    </div>
  );
}
