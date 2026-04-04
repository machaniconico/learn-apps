import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function FactoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファクトリパターン</h1>
        <p className="text-gray-400">companion objectとfactory関数を使ったオブジェクト生成の委譲パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファクトリパターンはオブジェクトの生成ロジックを専用のメソッド（ファクトリメソッド）に委譲するパターンです。
          コンストラクタを直接呼ぶ代わりにファクトリメソッドを使うことで、
          生成ロジックの変更をクライアントコードに影響なく行えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>companion objectのファクトリメソッドでインスタンスを生成</li>
          <li>プライベートコンストラクタで直接生成を防止できる</li>
          <li>キャッシュや検証ロジックをファクトリに集中できる</li>
          <li>invoke演算子オーバーロードでコンストラクタ風の呼び出しも可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">companion objectによるファクトリメソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">companion object</code>にファクトリメソッドを定義するKotlinらしいパターンです。
        </p>
        <KotlinEditor
          defaultCode={`class Color private constructor(
    val red: Int,
    val green: Int,
    val blue: Int
) {
    override fun toString() = "Color(r=\${red}, g=\${green}, b=\${blue})"

    companion object {
        fun fromRGB(r: Int, g: Int, b: Int): Color {
            require(r in 0..255 && g in 0..255 && b in 0..255) {
                "RGB値は0〜255の範囲で指定してください"
            }
            return Color(r, g, b)
        }

        fun fromHex(hex: String): Color {
            val value = hex.trimStart('#').toInt(16)
            return Color(
                red = (value shr 16) and 0xFF,
                green = (value shr 8) and 0xFF,
                blue = value and 0xFF
            )
        }

        val RED = Color(255, 0, 0)
        val GREEN = Color(0, 255, 0)
        val BLUE = Color(0, 0, 255)
    }
}

fun main() {
    val c1 = Color.fromRGB(128, 64, 32)
    println(c1)

    val c2 = Color.fromHex("#FF8040")
    println(c2)

    println(Color.RED)
    println(Color.GREEN)
}`}
          expectedOutput={`Color(r=128, g=64, b=32)
Color(r=255, g=128, b=64)
Color(r=255, g=0, b=0)
Color(r=0, g=255, b=0)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sealed classとファクトリの組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          sealed classのファクトリメソッドを使うと、型安全な生成パターンを実現できます。
        </p>
        <KotlinEditor
          defaultCode={`sealed class Result<out T> {
    data class Success<T>(val value: T) : Result<T>()
    data class Failure(val error: String) : Result<Nothing>()

    companion object {
        fun <T> success(value: T): Result<T> = Success(value)
        fun failure(error: String): Result<Nothing> = Failure(error)

        fun <T> of(block: () -> T): Result<T> = try {
            success(block())
        } catch (e: Exception) {
            failure(e.message ?: "不明なエラー")
        }
    }
}

fun divide(a: Int, b: Int): Result<Int> =
    if (b == 0) Result.failure("ゼロ除算エラー")
    else Result.success(a / b)

fun main() {
    val r1 = divide(10, 2)
    val r2 = divide(10, 0)

    listOf(r1, r2).forEach { result ->
        when (result) {
            is Result.Success -> println("成功: \${result.value}")
            is Result.Failure -> println("失敗: \${result.error}")
        }
    }

    val r3 = Result.of { "hello".toInt() }
    println(r3)
}`}
          expectedOutput={`成功: 5
失敗: ゼロ除算エラー
Failure(error=For input string: "hello")`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="factory" />
      </div>
      <LessonNav lessons={lessons} currentId="factory" basePath="/learn/design" />
    </div>
  );
}
