import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

const quizQuestions: QuizQuestion[] = [
  {
    question: "JUnit5でテストメソッドに付けるアノテーションはどれですか？",
    options: ["@Test", "@UnitTest", "@TestCase", "@Check"],
    answer: 0,
    explanation: "@TestアノテーションはJUnit5でテストメソッドを示すために使います。",
  },
  {
    question: "assertEquals(expected, actual)で確認することは何ですか？",
    options: [
      "actualがnullでないこと",
      "expectedとactualが等しいこと",
      "actualがtrueであること",
      "例外がスローされること",
    ],
    answer: 1,
    explanation: "assertEqualsは期待値(expected)と実際値(actual)が等しいことを検証します。",
  },
  {
    question: "コルーチンのテストに使う関数はどれですか？",
    options: ["runBlocking", "runTest", "testCoroutine", "coroutineTest"],
    answer: 1,
    explanation: "runTestはkotlinx-coroutines-testが提供するテスト用コルーチンスコープで、仮想時間を使います。",
  },
  {
    question: "AAAパターンの3つのフェーズはどれですか？",
    options: [
      "Assert-Arrange-Act",
      "Arrange-Assert-Act",
      "Arrange-Act-Assert",
      "Act-Assert-Arrange",
    ],
    answer: 2,
    explanation: "AAAパターンはArrange（準備）、Act（実行）、Assert（検証）の順で構成します。",
  },
];

export default function TestingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">テスト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinのテスト手法を学びます。JUnit5による単体テストの基本から、アサーション、
          MockKを使ったモッキング、コルーチンのテスト、パラメータ化テスト、
          AAAパターンなどのテスト設計まで幅広くカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="testing" totalLessons={6} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/testing" color="teal" categoryId="testing" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JUnit5の基本テスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">@Test</code>アノテーションを使って
          テストメソッドを定義し、<code className="text-teal-300">assertEquals</code>で検証します。
        </p>
        <KotlinEditor
          defaultCode={`fun add(a: Int, b: Int): Int = a + b

fun main() {
    // テストのシミュレーション
    val result = add(2, 3)
    val expected = 5
    if (result == expected) {
        println("PASS: add(2, 3) == 5")
    } else {
        println("FAIL: expected \${expected}, got \${result}")
    }
}`}
          expectedOutput={`PASS: add(2, 3) == 5`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">AAAパターン</h2>
        <p className="text-gray-400 mb-4">
          Arrange（準備）、Act（実行）、Assert（検証）の3フェーズで構造化されたテストを書きます。
        </p>
        <KotlinEditor
          defaultCode={`data class Calculator(val history: MutableList<Int> = mutableListOf()) {
    fun add(a: Int, b: Int): Int {
        val result = a + b
        history.add(result)
        return result
    }
}

fun main() {
    // Arrange
    val calc = Calculator()

    // Act
    val result = calc.add(10, 20)

    // Assert
    println("result == 30: \${result == 30}")
    println("history size == 1: \${calc.history.size == 1}")
    println("history[0] == 30: \${calc.history[0] == 30}")
}`}
          expectedOutput={`result == 30: true
history size == 1: true
history[0] == 30: true`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
