import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ジェネリクスの型パラメータはどう書きますか？",
    options: ["<T>", "[T]", "(T)", "{T}"],
    answer: 0,
    explanation: "ジェネリクスの型パラメータは山括弧<T>で書きます。Tは任意の名前ですが、慣習的にT（Type）、E（Element）、K（Key）、V（Value）などが使われます。",
  },
  {
    question: "outキーワードの意味は？",
    options: [
      "型パラメータを引数として受け取れる",
      "型パラメータを戻り値として返せる（共変）",
      "型パラメータを任意の型にできる",
      "型情報を実行時に保持する",
    ],
    answer: 1,
    explanation: "outは共変（covariant）を表します。out Tとすると、TはProducer（生産者）として戻り値にのみ使えます。List<out Number>はList<Int>を受け入れます。",
  },
  {
    question: "reifiedキーワードが必要な理由は？",
    options: [
      "型パラメータをprivateにするため",
      "ジェネリック関数をインライン化するため",
      "実行時に型情報を保持するため",
      "型制約を追加するため",
    ],
    answer: 2,
    explanation: "Kotlinのジェネリクスは実行時に型消去されますが、inline + reifiedを使うと実行時に型情報にアクセスできます。",
  },
  {
    question: "型制約 where T : Comparable<T>, T : Serializable の意味は？",
    options: [
      "TはComparableまたはSerializableのいずれか",
      "TはComparableかつSerializableを実装している",
      "TはComparableをSerializableに変換できる",
      "whereは型パラメータのデフォルト値を設定する",
    ],
    answer: 1,
    explanation: "where句を使うと複数の型制約を同時に課せます。T : Comparable<T>, T : Serializableの場合、TはComparableかつSerializableを実装している必要があります。",
  },
];

export default function GenericsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">ジェネリクス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinのジェネリクスを学びます。型パラメータを使った汎用クラスと関数から始め、
          型制約、共変・反変（in/out）、スタープロジェクション、
          reified型パラメータまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="generics" totalLessons={6} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/generics" color="violet" categoryId="generics" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスの基本</h2>
        <p className="text-gray-400 mb-4">
          型パラメータ<code className="text-violet-300">&lt;T&gt;</code>を使うと、
          さまざまな型に対応した汎用的なクラスや関数を作れます。
        </p>
        <KotlinEditor
          defaultCode={`class Box<T>(val value: T) {
    fun describe() = "Box contains: $\{value} ($\{value!!::class.simpleName})"
}

fun <T> swap(pair: Pair<T, T>): Pair<T, T> = Pair(pair.second, pair.first)

fun main() {
    val intBox = Box(42)
    val strBox = Box("Kotlin")
    println(intBox.describe())
    println(strBox.describe())
    val pair = Pair("A", "B")
    println(swap(pair))
}`}
          expectedOutput={`Box contains: 42 (Int)
Box contains: Kotlin (String)
(B, A)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変性（Variance）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">out</code>（共変）と<code className="text-violet-300">in</code>（反変）で
          型パラメータの使用方向を制限します。
        </p>
        <KotlinEditor
          defaultCode={`interface Producer<out T> {
    fun produce(): T
}

interface Consumer<in T> {
    fun consume(item: T)
}

class NumberProducer : Producer<Number> {
    override fun produce(): Number = 3.14
}

class AnyConsumer : Consumer<Any> {
    override fun consume(item: Any) = println("消費: $\{item}")
}

fun main() {
    val p: Producer<Any> = NumberProducer()
    println("生産: $\{p.produce()}")
    val c: Consumer<Number> = AnyConsumer()
    c.consume(42)
}`}
          expectedOutput={`生産: 3.14
消費: 42`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
