import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Kotlinで読み取り専用リストを作るには？",
    options: ["mutableListOf()", "listOf()", "arrayOf()", "ArrayList()"],
    answer: 1,
    explanation: "listOf()は読み取り専用（イミュータブル）なリストを作ります。要素の追加・削除・変更はできません。",
  },
  {
    question: "配列の要素数を取得するプロパティは？",
    options: ["length", "count", "size", "capacity"],
    answer: 2,
    explanation: "Kotlinの配列とコレクションはsizeプロパティで要素数を取得します。Javaの配列のlengthとは異なります。",
  },
  {
    question: "分割代入（destructuring）でリストの最初の2要素を取り出すには？",
    options: [
      "val (a, b) = list",
      "val [a, b] = list",
      "val {a, b} = list",
      "val a, b = list",
    ],
    answer: 0,
    explanation: "Kotlinの分割代入は丸括弧()を使います。val (a, b) = listでリストの最初の2要素をaとbに代入します。",
  },
  {
    question: "二次元配列を作るには？",
    options: [
      "Array(3, 3) { 0 }",
      "Array(3) { IntArray(3) }",
      "IntArray(3, 3)",
      "arrayOf(arrayOf(3, 3))",
    ],
    answer: 1,
    explanation: "二次元配列はArray(rows) { IntArray(cols) }のように外側の配列の各要素をIntArrayにします。",
  },
];

export default function ArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">配列・リスト</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinの配列とリストを学びます。arrayOfやlistOfによる作成から始め、
          要素へのアクセスと操作、ミュータブルリスト、配列とリストの相互変換、
          多次元配列、リスト操作関数、分割代入までカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="arrays" totalLessons={8} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/arrays" color="green" categoryId="arrays" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列とリストの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">arrayOf()</code>で配列、
          <code className="text-green-300">listOf()</code>で読み取り専用リストを作ります。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val arr = arrayOf(1, 2, 3, 4, 5)
    val list = listOf("apple", "banana", "cherry")

    println("配列: $\{arr.toList()}")
    println("配列サイズ: $\{arr.size}")
    println("リスト: $\{list}")
    println("リストサイズ: $\{list.size}")
    println("配列[0]: $\{arr[0]}")
    println("リスト[1]: $\{list[1]}")
}`}
          expectedOutput={`配列: [1, 2, 3, 4, 5]
配列サイズ: 5
リスト: [apple, banana, cherry]
リストサイズ: 3
配列[0]: 1
リスト[1]: banana`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ミュータブルリストと分割代入</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">mutableListOf()</code>で変更可能なリストを作り、
          分割代入で複数の変数に同時に代入できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val mList = mutableListOf(10, 20, 30)
    mList.add(40)
    mList.removeAt(0)
    println("変更後: $\{mList}")

    val (first, second, third) = mList
    println("分割代入: first=$\{first}, second=$\{second}, third=$\{third}")
}`}
          expectedOutput={`変更後: [20, 30, 40]
分割代入: first=20, second=30, third=40`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
