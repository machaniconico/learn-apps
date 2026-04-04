import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("extensions");

export default function ExtensionPropertiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">拡張関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">拡張プロパティ</h1>
        <p className="text-gray-400">既存クラスに新しいプロパティを追加する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">拡張プロパティとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          拡張プロパティを使うと既存クラスに新しいプロパティを追加できます。
          ただし、バッキングフィールドを持てないため、
          getterとsetterを明示的に定義する必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>val/varで定義するがバッキングフィールドは持てない</li>
          <li>getterは必須、varの場合はsetterも必要</li>
          <li>初期化子は使えない</li>
          <li>他のプロパティやメソッドを使って計算した値を返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">valの拡張プロパティ</h2>
        <p className="text-gray-400 mb-4">
          読み取り専用の拡張プロパティをgetterで定義します。
        </p>
        <KotlinEditor
          defaultCode={`val String.wordCount: Int
    get() = this.split("\\s+".toRegex()).filter { it.isNotEmpty() }.size

val String.isPalindrome: Boolean
    get() = this == this.reversed()

val Int.squared: Int
    get() = this * this

fun main() {
    println("Hello Kotlin World".wordCount)
    println("racecar".isPalindrome)
    println("hello".isPalindrome)
    println(7.squared)
}`}
          expectedOutput={`3
true
false
49`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">varの拡張プロパティ</h2>
        <p className="text-gray-400 mb-4">
          varの拡張プロパティにはgetterとsetterの両方が必要です。
          内部状態はMutableMapなどで管理します。
        </p>
        <KotlinEditor
          defaultCode={`val List<Int>.sum: Int
    get() = this.fold(0) { acc, n -> acc + n }

val List<Int>.average: Double
    get() = if (isEmpty()) 0.0 else sum.toDouble() / size

fun main() {
    val nums = listOf(1, 2, 3, 4, 5)
    println(nums.sum)
    println(nums.average)
    println(listOf(10, 20, 30).sum)
}`}
          expectedOutput={`15
3.0
60`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="extension-properties" />
      </div>
      <LessonNav lessons={lessons} currentId="extension-properties" basePath="/learn/extensions" />
    </div>
  );
}
