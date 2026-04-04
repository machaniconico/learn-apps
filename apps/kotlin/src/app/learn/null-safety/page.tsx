import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Null許容型のString型はどう宣言しますか？",
    options: ["String?", "String!", "Nullable<String>", "String | null"],
    answer: 0,
    explanation: "Kotlinでは型名の後に?を付けることでNull許容型になります。String?はnullを代入できるString型です。",
  },
  {
    question: "セーフコール演算子?.の説明として正しいのは？",
    options: [
      "nullの場合に例外をスローする",
      "nullの場合にnullを返し、非nullの場合にメソッドを呼び出す",
      "nullを非null型に変換する",
      "nullチェックなしでメソッドを呼び出す",
    ],
    answer: 1,
    explanation: "?.はレシーバがnullの場合にnullを返し、非nullの場合だけメソッドやプロパティにアクセスします。",
  },
  {
    question: "エルビス演算子?:の使い方として正しいのは？",
    options: [
      "val len = str?.length ?: 0",
      "val len = str!?.length",
      "val len = str ?? 0",
      "val len = str?.length || 0",
    ],
    answer: 0,
    explanation: "?:はleft-hand sideがnullの場合にright-hand sideの値を返します。str?.lengthがnullなら0を返します。",
  },
  {
    question: "!!演算子の説明として正しいのは？",
    options: [
      "常にnullを返す",
      "値がnullでも安全に処理する",
      "値がnullの場合にNullPointerExceptionをスローする",
      "Null許容型を新しい型に変換する",
    ],
    answer: 2,
    explanation: "!!はnon-null assertionで、値がnullの場合にNullPointerExceptionをスローします。使用は慎重に。",
  },
];

export default function NullSafetyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">Null安全</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          KotlinのNull安全システムを学びます。Null許容型（T?）とNon-null型（T）の区別から始め、
          セーフコール演算子（?.）、エルビス演算子（?:）、非Nullアサーション（!!）、
          let関数、セーフキャスト（as?）まで、NullPointerExceptionを防ぐための仕組みをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="null-safety" totalLessons={7} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/null-safety" color="pink" categoryId="null-safety" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Null許容型の基本</h2>
        <p className="text-gray-400 mb-4">
          KotlinではデフォルトですべてのNon-null型です。
          <code className="text-pink-300">?</code>を付けることでNull許容型になります。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val nonNull: String = "Hello"
    val nullable: String? = null
    println(nullable)

    val name: String? = "Kotlin"
    val length = name?.length
    println(length)
}`}
          expectedOutput={`null
6`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エルビス演算子でデフォルト値</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">?:</code>（エルビス演算子）は左辺がnullの場合に右辺の値を返します。
        </p>
        <KotlinEditor
          defaultCode={`fun getLength(str: String?): Int {
    return str?.length ?: 0
}

fun main() {
    println(getLength("Hello"))
    println(getLength(null))
    val name: String? = null
    val displayName = name ?: "ゲスト"
    println(displayName)
}`}
          expectedOutput={`5
0
ゲスト`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
