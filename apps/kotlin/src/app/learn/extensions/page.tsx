import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("extensions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "拡張関数の定義で正しい構文はどれですか？",
    options: [
      "fun String.shout() = this.uppercase()",
      "extend fun String.shout() = this.uppercase()",
      "fun shout(String) = this.uppercase()",
      "String.fun shout() = this.uppercase()",
    ],
    answer: 0,
    explanation: "拡張関数は「fun レシーバ型.関数名()」の形式で定義します。thisでレシーバオブジェクトにアクセスできます。",
  },
  {
    question: "拡張関数でthisが指すものは何ですか？",
    options: ["クラスのインスタンス全体", "レシーバオブジェクト", "拡張関数自身", "null"],
    answer: 1,
    explanation: "拡張関数内のthisはレシーバオブジェクト（拡張先のクラスのインスタンス）を指します。",
  },
  {
    question: "拡張プロパティに関して正しい説明はどれですか？",
    options: [
      "バッキングフィールドを持てる",
      "バッキングフィールドを持てない",
      "クラスのプロパティを上書きできる",
      "初期化子を持てる",
    ],
    answer: 1,
    explanation: "拡張プロパティはバッキングフィールドを持てないため、getterとsetterを明示的に定義する必要があります。",
  },
  {
    question: "メンバー関数と拡張関数の優先度について正しいのは？",
    options: [
      "拡張関数が優先される",
      "メンバー関数が優先される",
      "どちらも同じ優先度",
      "コンパイルエラーになる",
    ],
    answer: 1,
    explanation: "同名のメンバー関数と拡張関数がある場合、メンバー関数が常に優先されます。",
  },
];

export default function ExtensionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">拡張関数</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinの拡張関数を使うと、既存クラスを継承せずに新しいメソッドやプロパティを追加できます。
          拡張プロパティ、ジェネリック拡張、スコープの管理など実践的な使い方を学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="extensions" totalLessons={6} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/extensions" color="cyan" categoryId="extensions" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">拡張関数の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">fun String.shout()</code>のように
          レシーバ型を指定することで既存クラスにメソッドを追加できます。
        </p>
        <KotlinEditor
          defaultCode={`fun String.shout(): String = this.uppercase() + "!!!"

fun Int.isEven(): Boolean = this % 2 == 0

fun main() {
    println("hello".shout())
    println(4.isEven())
    println(7.isEven())
}`}
          expectedOutput={`HELLO!!!
true
false`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">拡張プロパティ</h2>
        <p className="text-gray-400 mb-4">
          拡張プロパティはバッキングフィールドを持てないため、
          <code className="text-cyan-300">get()</code>を明示的に定義します。
        </p>
        <KotlinEditor
          defaultCode={`val String.wordCount: Int
    get() = this.split(" ").filter { it.isNotEmpty() }.size

val Int.squared: Int
    get() = this * this

fun main() {
    println("Hello Kotlin World".wordCount)
    println(5.squared)
    println(10.squared)
}`}
          expectedOutput={`3
25
100`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
