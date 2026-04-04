import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

const quizQuestions: QuizQuestion[] = [
  {
    question: "重複を許さないコレクションはどれですか？",
    options: ["List", "Set", "Map", "Array"],
    answer: 1,
    explanation: "SetはKotlinで重複要素を許さないコレクションです。setOfやmutableSetOfで作成できます。",
  },
  {
    question: "キーと値のペアを格納するコレクションはどれですか？",
    options: ["List", "Set", "Map", "Sequence"],
    answer: 2,
    explanation: "MapはキーとValueのペアを格納するコレクションです。mapOf()やmutableMapOf()で作成できます。",
  },
  {
    question: "mutableListOf()で作成したリストの特徴は？",
    options: [
      "要素の追加・削除ができない",
      "要素の追加・削除ができる",
      "重複要素を持てない",
      "キーと値のペアを持つ",
    ],
    answer: 1,
    explanation: "mutableListOf()は変更可能なリストを作成します。add()やremove()で要素を操作できます。",
  },
  {
    question: "buildList { }の用途は？",
    options: [
      "イミュータブルなリストを作成する",
      "ラムダでリストを構築するビルダー関数",
      "リストをソートする",
      "リストをフィルタリングする",
    ],
    answer: 1,
    explanation: "buildList { }はラムダ内でaddなどの操作を行い、最終的にイミュータブルなListを返すビルダー関数です。",
  },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">コレクション</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          KotlinのコレクションはList・Set・Mapの3種類が中心です。
          イミュータブルとミュータブルの区別、ビルダー関数、反復処理、
          グルーピングなど、実践的なコレクション操作を学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="collections" totalLessons={6} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/collections" color="green" categoryId="collections" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">SetとMapの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">setOf()</code>で重複なしのセット、
          <code className="text-green-300">mapOf()</code>でキーと値のマップを作成できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val fruits = setOf("apple", "banana", "apple", "cherry")
    println(fruits)

    val scores = mapOf("Alice" to 90, "Bob" to 85, "Carol" to 92)
    println(scores["Alice"])
    println(scores.size)
}`}
          expectedOutput={`[apple, banana, cherry]
90
3`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ミュータブルコレクション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">mutableListOf()</code>や
          <code className="text-green-300">mutableMapOf()</code>を使うと要素を追加・削除できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val list = mutableListOf("Kotlin", "Java")
    list.add("Swift")
    list.remove("Java")
    println(list)

    val map = mutableMapOf("a" to 1, "b" to 2)
    map["c"] = 3
    println(map)
}`}
          expectedOutput={`[Kotlin, Swift]
{a=1, b=2, c=3}`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
