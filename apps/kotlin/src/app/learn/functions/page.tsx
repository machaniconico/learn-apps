import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Kotlinで関数を定義するキーワードはどれですか？",
    options: ["function", "def", "fun", "func"],
    answer: 2,
    explanation: "Kotlinではfunキーワードを使って関数を定義します。",
  },
  {
    question: "デフォルト引数を持つ関数について正しいのはどれですか？",
    options: [
      "デフォルト引数は最初のパラメータにしか設定できない",
      "デフォルト引数が設定されたパラメータは省略できる",
      "デフォルト引数はStringのみ設定できる",
      "デフォルト引数を使うと戻り値の型が変わる",
    ],
    answer: 1,
    explanation: "デフォルト引数が設定されたパラメータは省略可能で、省略するとデフォルト値が使われます。",
  },
  {
    question: "単式関数の正しい書き方はどれですか？",
    options: [
      "fun add(a: Int, b: Int) { return a + b }",
      "fun add(a: Int, b: Int) = a + b",
      "fun add(a: Int, b: Int) -> a + b",
      "fun add(a: Int, b: Int): return a + b",
    ],
    answer: 1,
    explanation: "単式関数は=を使って式を直接返します。ブロックとreturnが不要になります。",
  },
  {
    question: "varargパラメータについて正しいのはどれですか？",
    options: [
      "関数に複数のvarargパラメータを定義できる",
      "varargパラメータは関数の先頭に置く必要がある",
      "varargパラメータは可変長の引数を受け取る",
      "varargは整数型にしか使えない",
    ],
    answer: 2,
    explanation: "varargキーワードを使うと、その型の引数を任意の個数受け取れます。関数内では配列として扱います。",
  },
];

export default function FunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">関数</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinの関数について学びます。基本的な関数定義から、パラメータ、戻り値、
          デフォルト引数、名前付き引数、単式関数、可変長引数、ローカル関数まで、
          Kotlinの関数機能をすべてカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="functions" totalLessons={8} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/functions" color="blue" categoryId="functions" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の基本定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">fun</code>キーワードで関数を定義します。
          パラメータと戻り値の型を指定できます。
        </p>
        <KotlinEditor
          defaultCode={`fun greet(name: String): String {
    return "こんにちは、\${name}！"
}

fun add(a: Int, b: Int): Int = a + b

fun main() {
    println(greet("Alice"))
    println(greet("Kotlin"))
    println("3 + 5 = \${add(3, 5)}")
}`}
          expectedOutput={`こんにちは、Alice！
こんにちは、Kotlin！
3 + 5 = 8`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数と名前付き引数</h2>
        <p className="text-gray-400 mb-4">
          デフォルト引数でパラメータを省略可能にし、名前付き引数で可読性を高められます。
        </p>
        <KotlinEditor
          defaultCode={`fun createProfile(
    name: String,
    age: Int = 0,
    language: String = "Kotlin"
): String {
    return "名前: \${name}, 年齢: \${age}, 言語: \${language}"
}

fun main() {
    println(createProfile("Alice", 25, "Java"))
    println(createProfile("Bob"))
    println(createProfile(name = "Carol", language = "Python", age = 30))
}`}
          expectedOutput={`名前: Alice, 年齢: 25, 言語: Java
名前: Bob, 年齢: 0, 言語: Kotlin
名前: Carol, 年齢: 30, 言語: Python`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
