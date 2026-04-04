import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function BuilderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビルダーパターン</h1>
        <p className="text-gray-400">apply関数やDSLスタイルを活用したKotlinらしいビルダーパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビルダーパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビルダーパターンは複雑なオブジェクトを段階的に構築するパターンです。
          多くの引数を持つオブジェクトの生成を読みやすく安全にできます。
          Kotlinではapply関数やDSLを使うとより簡潔に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>apply関数でプロパティを設定しながらオブジェクト自身を返す</li>
          <li>data classのcopy()で既存オブジェクトから新しいオブジェクトを作る</li>
          <li>DSLスタイルで読みやすいビルダーAPIを設計できる</li>
          <li>デフォルト引数と名前付き引数で多くのケースをカバーできる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">applyを使ったビルダーパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">apply</code>関数はオブジェクトのスコープ内でプロパティを設定し、オブジェクト自身を返します。
        </p>
        <KotlinEditor
          defaultCode={`data class HttpRequest(
    var url: String = "",
    var method: String = "GET",
    var headers: MutableMap<String, String> = mutableMapOf(),
    var body: String? = null,
    var timeout: Int = 30
)

fun buildRequest(block: HttpRequest.() -> Unit): HttpRequest =
    HttpRequest().apply(block)

fun main() {
    val request = buildRequest {
        url = "https://api.example.com/users"
        method = "POST"
        headers["Content-Type"] = "application/json"
        headers["Authorization"] = "Bearer token123"
        body = """{"name": "Alice", "age": 30}"""
        timeout = 60
    }

    println("URL: \${request.url}")
    println("Method: \${request.method}")
    println("Headers: \${request.headers}")
    println("Body: \${request.body}")
    println("Timeout: \${request.timeout}秒")
}`}
          expectedOutput={`URL: https://api.example.com/users
Method: POST
Headers: {Content-Type=application/json, Authorization=Bearer token123}
Body: {"name": "Alice", "age": 30}
Timeout: 60秒`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DSLスタイルのビルダー</h2>
        <p className="text-gray-400 mb-4">
          ネストされたDSLを使うと複雑なオブジェクト構造を宣言的に記述できます。
        </p>
        <KotlinEditor
          defaultCode={`data class MenuItem(val name: String, val price: Int)
data class MenuSection(val title: String, val items: List<MenuItem>)
data class Menu(val sections: List<MenuSection>)

class MenuBuilder {
    private val sections = mutableListOf<MenuSection>()

    fun section(title: String, block: SectionBuilder.() -> Unit) {
        sections.add(SectionBuilder(title).apply(block).build())
    }

    fun build() = Menu(sections.toList())
}

class SectionBuilder(private val title: String) {
    private val items = mutableListOf<MenuItem>()

    fun item(name: String, price: Int) {
        items.add(MenuItem(name, price))
    }

    fun build() = MenuSection(title, items.toList())
}

fun menu(block: MenuBuilder.() -> Unit) = MenuBuilder().apply(block).build()

fun main() {
    val lunchMenu = menu {
        section("ドリンク") {
            item("コーヒー", 400)
            item("オレンジジュース", 450)
        }
        section("フード") {
            item("サンドイッチ", 750)
            item("サラダ", 600)
        }
    }

    lunchMenu.sections.forEach { section ->
        println("【\${section.title}】")
        section.items.forEach { item ->
            println("  \${item.name}: ¥\${item.price}")
        }
    }
}`}
          expectedOutput={`【ドリンク】
  コーヒー: ¥400
  オレンジジュース: ¥450
【フード】
  サンドイッチ: ¥750
  サラダ: ¥600`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="builder" />
      </div>
      <LessonNav lessons={lessons} currentId="builder" basePath="/learn/design" />
    </div>
  );
}
