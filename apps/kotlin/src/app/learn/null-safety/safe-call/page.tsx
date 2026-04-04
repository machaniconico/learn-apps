import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function SafeCallPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Null安全 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セーフコール演算子</h1>
        <p className="text-gray-400">?.演算子でNull許容型に安全にアクセスする方法を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">?.演算子の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">?.</code>はレシーバがnullの場合にnullを返し、非nullの場合だけアクセスします。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val str: String? = "Hello, Kotlin"
    println(str?.length)

    val nullStr: String? = null
    println(nullStr?.length)

    val upper = str?.uppercase()
    println(upper)
}`}
          expectedOutput={`13
null
HELLO, KOTLIN`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チェーンしたセーフコール</h2>
        <p className="text-gray-400 mb-4">
          セーフコールはチェーンして使えます。チェーンのどこかがnullなら全体がnullになります。
        </p>
        <KotlinEditor
          defaultCode={`data class Address(val city: String, val zip: String?)
data class User(val name: String, val address: Address?)

fun main() {
    val user1 = User("田中", Address("東京", "100-0001"))
    val user2 = User("山田", null)
    println(user1.address?.city)
    println(user2.address?.city)
    println(user1.address?.zip)
}`}
          expectedOutput={`東京
null
100-0001`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セーフコールと関数</h2>
        <p className="text-gray-400 mb-4">セーフコールは関数にも使えます。</p>
        <KotlinEditor
          defaultCode={`fun processName(name: String?): String {
    val trimmed = name?.trim()
    val upper = trimmed?.uppercase()
    return upper ?: "不明"
}

fun main() {
    println(processName("  kotlin  "))
    println(processName(null))
}`}
          expectedOutput={`KOTLIN
不明`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="null-safety" lessonId="safe-call" />
      </div>
      <LessonNav lessons={lessons} currentId="safe-call" basePath="/learn/null-safety" />
    </div>
  );
}
