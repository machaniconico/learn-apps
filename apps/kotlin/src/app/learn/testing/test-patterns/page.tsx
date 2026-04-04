import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function TestPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">テスト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テストパターン</h1>
        <p className="text-gray-400">AAA（Arrange-Act-Assert）パターンなどKotlinでよく使われるテスト設計を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">良いテストの特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          良いテストはFIRST原則に従います。Fast（高速）、Independent（独立）、
          Repeatable（繰り返し可能）、Self-validating（自己検証）、Timely（適時）です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>AAAパターン: Arrange・Act・Assertの3フェーズで構造化する</li>
          <li>1テスト1アサーション: テストごとに1つのことを検証する</li>
          <li>テスト名は「状況_操作_期待結果」の形式が分かりやすい</li>
          <li>境界値テスト: 最小・最大・境界の値をテストする</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">AAAパターン</h2>
        <p className="text-gray-400 mb-4">Arrange（準備）、Act（実行）、Assert（検証）の3フェーズでテストを書きます。</p>
        <KotlinEditor
          defaultCode={`data class BankAccount(var balance: Double = 0.0) {
    fun deposit(amount: Double) {
        require(amount > 0) { "入金額は正の値が必要" }
        balance += amount
    }
    fun withdraw(amount: Double) {
        require(amount > 0) { "出金額は正の値が必要" }
        require(amount <= balance) { "残高不足" }
        balance -= amount
    }
}

fun main() {
    // テスト: deposit_正の金額_残高が増える
    run {
        // Arrange
        val account = BankAccount(100.0)
        // Act
        account.deposit(50.0)
        // Assert
        println("残高150: \${account.balance == 150.0}")
    }

    // テスト: withdraw_残高以内_残高が減る
    run {
        val account = BankAccount(100.0)
        account.withdraw(30.0)
        println("残高70: \${account.balance == 70.0}")
    }
}`}
          expectedOutput={`残高150: true
残高70: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">境界値テスト</h2>
        <p className="text-gray-400 mb-4">境界値・ゼロ・最大値などのエッジケースをテストします。</p>
        <KotlinEditor
          defaultCode={`fun clamp(value: Int, min: Int, max: Int): Int {
    return when {
        value < min -> min
        value > max -> max
        else -> value
    }
}

fun main() {
    data class TestCase(val value: Int, val expected: Int, val desc: String)

    val cases = listOf(
        TestCase(-10, 0, "最小値以下"),
        TestCase(0, 0, "最小値ちょうど"),
        TestCase(5, 5, "範囲内"),
        TestCase(10, 10, "最大値ちょうど"),
        TestCase(15, 10, "最大値超過")
    )

    cases.forEach { (value, expected, desc) ->
        val result = clamp(value, 0, 10)
        println("\${desc}: \${if (result == expected) "PASS" else "FAIL(\${result})"}")
    }
}`}
          expectedOutput={`最小値以下: PASS
最小値ちょうど: PASS
範囲内: PASS
最大値ちょうど: PASS
最大値超過: PASS`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="test-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="test-patterns" basePath="/learn/testing" />
    </div>
  );
}
