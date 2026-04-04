import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

const quizQuestions: QuizQuestion[] = [
  {
    question: "文字列テンプレートで変数を埋め込む構文はどれですか？",
    options: ["${variable}", "#{variable}", "%(variable)", "&{variable}"],
    answer: 0,
    explanation: "Kotlinの文字列テンプレートでは${変数名}または$変数名で変数を埋め込めます。",
  },
  {
    question: "文字列の長さを取得するプロパティは？",
    options: ["size", "count", "length", "len"],
    answer: 2,
    explanation: "Kotlinの文字列はlengthプロパティで長さを取得します。",
  },
  {
    question: "複数行文字列を作るには何を使いますか？",
    options: ['""', '"""', "''", "\\n"],
    answer: 1,
    explanation: 'トリプルクォート"""..."""を使うと複数行文字列（raw string）を作成できます。',
  },
  {
    question: "文字列を大文字に変換する関数は？",
    options: ["toUpper()", "uppercase()", "toUpperCase()", "upper()"],
    answer: 1,
    explanation: "Kotlin 1.5以降はuppercase()を使います。toUpperCase()は非推奨です。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">文字列操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinの文字列操作を学びます。文字列テンプレート、豊富な文字列メソッド、
          正規表現、複数行文字列など、実用的な文字列処理の技術を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="green" categoryId="strings" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列テンプレート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">$変数名</code>や
          <code className="text-green-300">{"${式}"}</code>を使って文字列に変数・式を埋め込めます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name = "Kotlin"
    val version = 2.0
    println("Hello, $name!")
    println("Version: ${"$"}{version}")
    println("Length: ${"$"}{name.length}文字")
}`}
          expectedOutput={`Hello, Kotlin!
Version: 2.0
Length: 6文字`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">主要な文字列メソッド</h2>
        <p className="text-gray-400 mb-4">
          Kotlinの文字列には<code className="text-green-300">uppercase()</code>、
          <code className="text-green-300">contains()</code>、
          <code className="text-green-300">replace()</code>など多くのメソッドがあります。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val str = "Hello, Kotlin!"
    println(str.uppercase())
    println(str.lowercase())
    println(str.contains("Kotlin"))
    println(str.replace("Kotlin", "World"))
    println(str.startsWith("Hello"))
}`}
          expectedOutput={`HELLO, KOTLIN!
hello, kotlin!
true
Hello, World!
true`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
