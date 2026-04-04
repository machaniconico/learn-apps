import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ConstructorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンストラクタ</h1>
        <p className="text-gray-400">プライマリコンストラクタとセカンダリコンストラクタの使い方を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プライマリコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          プライマリコンストラクタはクラスヘッダーに定義します。val/varを付けるとプロパティとして宣言されます。
        </p>
        <KotlinEditor
          defaultCode={`class User(val id: Int, val name: String, var email: String)

fun main() {
    val user = User(1, "田中", "tanaka@example.com")
    println("ID: ${"$"}{user.id}")
    println("名前: ${"$"}{user.name}")
    user.email = "new@example.com"
    println("更新後メール: ${"$"}{user.email}")
}`}
          expectedOutput={`ID: 1
名前: 田中
更新後メール: new@example.com`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セカンダリコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          クラス本体にconstructorキーワードで追加のコンストラクタを定義できます。this(...)で委譲が必要です。
        </p>
        <KotlinEditor
          defaultCode={`class Rectangle(val width: Double, val height: Double) {
    val area = width * height
    constructor(side: Double) : this(side, side)
    constructor(width: Int, height: Int) : this(width.toDouble(), height.toDouble())
    fun describe() = "幅: ${"$"}width, 高さ: ${"$"}height, 面積: ${"$"}area"
}

fun main() {
    println(Rectangle(4.0, 6.0).describe())
    println(Rectangle(5.0).describe())
    println(Rectangle(3, 7).describe())
}`}
          expectedOutput={`幅: 4.0, 高さ: 6.0, 面積: 24.0
幅: 5.0, 高さ: 5.0, 面積: 25.0
幅: 3.0, 高さ: 7.0, 面積: 21.0`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数</h2>
        <p className="text-gray-400 mb-4">デフォルト引数を使うことで、多くのセカンダリコンストラクタを避けられます。</p>
        <KotlinEditor
          defaultCode={`class Config(
    val host: String = "localhost",
    val port: Int = 8080,
    val debug: Boolean = false
)

fun main() {
    val default = Config()
    val custom = Config(host = "example.com", port = 443)
    println("${"$"}{default.host}:${"$"}{default.port} debug=${"$"}{default.debug}")
    println("${"$"}{custom.host}:${"$"}{custom.port} debug=${"$"}{custom.debug}")
}`}
          expectedOutput={`localhost:8080 debug=false
example.com:443 debug=false`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="constructors" />
      </div>
      <LessonNav lessons={lessons} currentId="constructors" basePath="/learn/classes" />
    </div>
  );
}
