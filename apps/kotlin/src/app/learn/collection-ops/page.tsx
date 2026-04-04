import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collection-ops");

const quizQuestions: QuizQuestion[] = [
  {
    question: "filter関数の動作として正しいのは？",
    options: [
      "各要素を別の値に変換する",
      "条件を満たす要素だけを残す",
      "要素を1つの値に集約する",
      "要素を並び替える",
    ],
    answer: 1,
    explanation: "filterは述語（条件）を満たす要素だけを含む新しいコレクションを返します。",
  },
  {
    question: "foldとreduceの違いは？",
    options: [
      "foldは並列処理、reduceは直列処理",
      "foldは初期値を持つ、reduceは最初の要素を初期値にする",
      "foldは左から、reduceは右から処理する",
      "違いはない",
    ],
    answer: 1,
    explanation: "foldは初期値を引数に取りますが、reduceは最初の要素を初期値として使います。空のコレクションではreduceは例外を投げます。",
  },
  {
    question: "Sequenceの特徴として正しいのは？",
    options: [
      "毎回中間コレクションを作成する",
      "遅延評価を行い中間コレクションを作らない",
      "要素を重複なく保持する",
      "キーと値のペアを保持する",
    ],
    answer: 1,
    explanation: "Sequenceは遅延評価を行い、各要素を順番に処理するため中間コレクションの生成を避けられます。",
  },
  {
    question: "groupByの戻り値の型は？",
    options: ["List<T>", "Set<T>", "Map<K, List<T>>", "Sequence<T>"],
    answer: 2,
    explanation: "groupByはキーをキー、そのキーに属する要素のリストを値とするMapを返します。",
  },
];

export default function CollectionOpsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">コレクション操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          filter・map・flatMap・reduce・foldなどのコレクション操作関数を学びます。
          さらにSequenceを使った遅延評価とパフォーマンス最適化も習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="collection-ops" totalLessons={8} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/collection-ops" color="pink" categoryId="collection-ops" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">filter・mapの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">filter</code>で条件に合う要素を絞り込み、
          <code className="text-pink-300">map</code>で各要素を変換します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    val evens = numbers.filter { it % 2 == 0 }
    println(evens)

    val squares = numbers.map { it * it }
    println(squares)

    val evenSquares = numbers.filter { it % 2 == 0 }.map { it * it }
    println(evenSquares)
}`}
          expectedOutput={`[2, 4, 6, 8, 10]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
[4, 16, 36, 64, 100]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">reduce・foldで集約</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">reduce</code>は最初の要素を初期値に、
          <code className="text-pink-300">fold</code>は指定した初期値から集約処理を行います。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    val sum = numbers.reduce { acc, n -> acc + n }
    println("reduce sum: ${"$"}{sum}")

    val product = numbers.fold(1) { acc, n -> acc * n }
    println("fold product: ${"$"}{product}")

    val words = listOf("Kotlin", "is", "awesome")
    val sentence = words.fold("") { acc, w -> if (acc.isEmpty()) w else "${"$"}{acc} ${"$"}{w}" }
    println(sentence)
}`}
          expectedOutput={`reduce sum: 15
fold product: 120
Kotlin is awesome`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
