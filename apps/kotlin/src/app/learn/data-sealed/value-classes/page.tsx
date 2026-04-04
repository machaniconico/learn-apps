import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("data-sealed");

export default function ValueClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データクラス・Sealed レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">値クラス</h1>
        <p className="text-gray-400">@JvmInlineとvalue classを使ったインライン型ラッパー</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値クラスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">@JvmInline value class</code>は単一のプロパティを
          ラップする型安全なクラスで、実行時にオーバーヘッドがほぼありません。
          プリミティブ型に意味を持たせるために使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>単一のvalプロパティのみ持てる</li>
          <li>実行時はラップされた型として扱われる</li>
          <li>型安全なラッパーを低コストで作れる</li>
          <li>Kotlin 1.5以降で安定版</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値クラスの定義</h2>
        <p className="text-gray-400 mb-4">
          値クラスを使ってプリミティブ型に型安全な意味を持たせられます。
        </p>
        <KotlinEditor
          defaultCode={`@JvmInline
value class UserId(val value: Int)

@JvmInline
value class Email(val value: String) {
    init {
        require(value.contains("@")) { "Invalid email: ${"$"}{value}" }
    }
}

fun findUser(id: UserId): String = "User#${"$"}{id.value}"

fun main() {
    val id = UserId(42)
    println(findUser(id))

    val email = Email("user@example.com")
    println(email.value)
    println(id)
}`}
          expectedOutput={`User#42
user@example.com
UserId(value=42)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型安全性の向上</h2>
        <p className="text-gray-400 mb-4">
          同じ基底型でも値クラスで区別すると誤った引数を渡すコンパイルエラーで検出できます。
        </p>
        <KotlinEditor
          defaultCode={`@JvmInline value class Meters(val value: Double)
@JvmInline value class Kilograms(val value: Double)

fun calculateBMI(height: Meters, weight: Kilograms): Double {
    val h = height.value
    return weight.value / (h * h)
}

fun main() {
    val height = Meters(1.75)
    val weight = Kilograms(70.0)
    val bmi = calculateBMI(height, weight)
    println("BMI: ${"$"}{String.format("%.1f", bmi)}")
    println("身長: ${"$"}{height.value}m")
    println("体重: ${"$"}{weight.value}kg")
}`}
          expectedOutput={`BMI: 22.9
身長: 1.75m
体重: 70.0kg`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="data-sealed" lessonId="value-classes" />
      </div>
      <LessonNav lessons={lessons} currentId="value-classes" basePath="/learn/data-sealed" />
    </div>
  );
}
