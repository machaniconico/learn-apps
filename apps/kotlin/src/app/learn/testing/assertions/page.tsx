import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function AssertionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">テスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アサーション</h1>
        <p className="text-gray-400">assertEquals、assertTrue、assertThrowsなど主要なアサーションの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JUnit5のアサーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アサーションはテストの検証に使います。JUnit5ではorg.junit.jupiter.api.Assertionsに
          多くのアサーションメソッドが用意されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>assertEquals: 期待値と実際値が等しいことを検証</li>
          <li>assertTrue / assertFalse: 条件の真偽を検証</li>
          <li>assertNull / assertNotNull: nullかどうかを検証</li>
          <li>assertThrows: 特定の例外がスローされることを検証</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なアサーション</h2>
        <p className="text-gray-400 mb-4">assertEquals、assertTrue、assertNullなどの基本アサーションです。</p>
        <KotlinEditor
          defaultCode={`fun check(condition: Boolean, msg: String) {
    println(if (condition) "PASS: \${msg}" else "FAIL: \${msg}")
}

fun main() {
    // assertEquals相当
    check(2 + 3 == 5, "2 + 3 == 5")

    // assertTrue相当
    check("Kotlin".startsWith("Ko"), "startsWith Ko")

    // assertFalse相当
    check(!"hello".isEmpty(), "not empty")

    // assertNull相当
    val value: String? = null
    check(value == null, "value is null")

    // assertNotNull相当
    val name = "Alice"
    check(name != null, "name is not null")
}`}
          expectedOutput={`PASS: 2 + 3 == 5
PASS: startsWith Ko
PASS: not empty
PASS: value is null
PASS: name is not null`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assertThrowsの使い方</h2>
        <p className="text-gray-400 mb-4">例外がスローされることを検証します。</p>
        <KotlinEditor
          defaultCode={`fun divide(a: Int, b: Int): Int {
    if (b == 0) throw ArithmeticException("ゼロ除算")
    return a / b
}

fun assertThrows(block: () -> Unit): Exception? {
    return try {
        block()
        null
    } catch (e: Exception) {
        e
    }
}

fun main() {
    val e = assertThrows { divide(10, 0) }
    println("例外発生: \${e != null}")
    println("メッセージ: \${e?.message}")
    println("型: \${e is ArithmeticException}")

    val e2 = assertThrows { divide(10, 2) }
    println("例外なし: \${e2 == null}")
}`}
          expectedOutput={`例外発生: true
メッセージ: ゼロ除算
型: true
例外なし: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="assertions" />
      </div>
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/testing" />
    </div>
  );
}
