import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function PlatformTypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Null安全 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プラットフォーム型</h1>
        <p className="text-gray-400">JavaコードとのNull互換性とプラットフォーム型の扱い方を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">プラットフォーム型とは</h2>
        <p className="text-gray-400 mb-4">
          JavaのコードはKotlinのNull安全システムの外にあります。JavaのメソッドはT!（プラットフォーム型）として扱われます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val path: String? = System.getenv("PATH")
    path?.let {
        val firstPath = it.split(":").firstOrNull()
        println("最初のPATH: ${"$"}firstPath")
    } ?: println("PATH環境変数が設定されていません")

    val username = System.getProperty("user.name") ?: "unknown"
    println("ユーザー名: ${"$"}username")
}`}
          expectedOutput={`最初のPATH: /usr/local/bin
ユーザー名: user`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全なJava連携パターン</h2>
        <p className="text-gray-400 mb-4">JavaのAPIを安全に呼び出すパターンです。</p>
        <KotlinEditor
          defaultCode={`fun getSystemProperty(key: String): String {
    return System.getProperty(key) ?: "未設定"
}

fun main() {
    println(getSystemProperty("java.version"))
    println(getSystemProperty("os.name"))
    println(getSystemProperty("存在しないキー"))
}`}
          expectedOutput={`21.0.1
Mac OS X
未設定`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Null安全のベストプラクティスまとめ</h2>
        <p className="text-gray-400 mb-4">Null安全のカテゴリで学んだすべての演算子と関数の使い分けまとめです。</p>
        <KotlinEditor
          defaultCode={`data class User(val name: String?, val email: String?, val age: Int?)

fun processUser(user: User): String {
    val name = user.name ?: "ゲスト"
    val email = user.email ?: "未設定"
    val age = user.age ?: 0
    val greeting = user.name?.let { "ようこそ、${"$"}{it}さん" } ?: "ゲストさん、ようこそ"
    return "${"$"}greeting (email: ${"$"}email, age: ${"$"}age)"
}

fun main() {
    println(processUser(User("田中", "tanaka@example.com", 30)))
    println(processUser(User(null, null, null)))
}`}
          expectedOutput={`ようこそ、田中さん (email: tanaka@example.com, age: 30)
ゲストさん、ようこそ (email: 未設定, age: 0)`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="null-safety" lessonId="platform-types" />
      </div>
      <LessonNav lessons={lessons} currentId="platform-types" basePath="/learn/null-safety" />
    </div>
  );
}
