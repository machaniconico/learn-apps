import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function ParameterizedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">テスト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パラメータ化テスト</h1>
        <p className="text-gray-400">@ParameterizedTestを使って複数のデータセットで同一テストを実行する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化テストの利点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          同じテストロジックを複数のデータセットで実行する場合、
          パラメータ化テストを使うとコードの重複を避けられます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>@ParameterizedTestでパラメータ化テストを定義する</li>
          <li>@ValueSourceで単純な値のリストを提供する</li>
          <li>@CsvSourceで複数パラメータのデータを提供する</li>
          <li>@MethodSourceでより複雑なデータを提供できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パラメータ化テストのシミュレーション</h2>
        <p className="text-gray-400 mb-4">複数の入力データを使って同じテストロジックを繰り返します。</p>
        <KotlinEditor
          defaultCode={`fun isPalindrome(s: String): Boolean {
    val cleaned = s.lowercase().filter { it.isLetterOrDigit() }
    return cleaned == cleaned.reversed()
}

fun main() {
    // @ParameterizedTest @ValueSource相当
    val palindromes = listOf("racecar", "level", "madam", "A")
    val nonPalindromes = listOf("hello", "kotlin", "world")

    palindromes.forEach { word ->
        val result = isPalindrome(word)
        println("isPalindrome(\"\${word}\") = \${result} -> \${if (result) "PASS" else "FAIL"}")
    }
    nonPalindromes.forEach { word ->
        val result = !isPalindrome(word)
        println("notPalindrome(\"\${word}\") = \${result} -> \${if (result) "PASS" else "FAIL"}")
    }
}`}
          expectedOutput={`isPalindrome("racecar") = true -> PASS
isPalindrome("level") = true -> PASS
isPalindrome("madam") = true -> PASS
isPalindrome("A") = true -> PASS
notPalindrome("hello") = true -> PASS
notPalindrome("kotlin") = true -> PASS
notPalindrome("world") = true -> PASS`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数パラメータのテスト</h2>
        <p className="text-gray-400 mb-4">入力と期待値のペアをリストで管理してテストします。</p>
        <KotlinEditor
          defaultCode={`fun gradeToLetter(score: Int): String = when {
    score >= 90 -> "A"
    score >= 80 -> "B"
    score >= 70 -> "C"
    score >= 60 -> "D"
    else -> "F"
}

fun main() {
    // @CsvSource相当: (入力, 期待値)のペア
    val testCases = listOf(
        95 to "A",
        85 to "B",
        75 to "C",
        65 to "D",
        55 to "F"
    )
    testCases.forEach { (score, expected) ->
        val actual = gradeToLetter(score)
        val pass = actual == expected
        println("gradeToLetter(\${score}) == \${expected}: \${if (pass) "PASS" else "FAIL"}")
    }
}`}
          expectedOutput={`gradeToLetter(95) == A: PASS
gradeToLetter(85) == B: PASS
gradeToLetter(75) == C: PASS
gradeToLetter(65) == D: PASS
gradeToLetter(55) == F: PASS`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="parameterized" />
      </div>
      <LessonNav lessons={lessons} currentId="parameterized" basePath="/learn/testing" />
    </div>
  );
}
