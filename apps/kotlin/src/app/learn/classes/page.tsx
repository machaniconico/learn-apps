import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Kotlinでクラスのインスタンスを生成する方法は？",
    options: ["new MyClass()", "MyClass()", "create MyClass()", "MyClass.new()"],
    answer: 1,
    explanation: "KotlinではJavaのようにnewキーワードは不要です。MyClass()のようにクラス名を関数のように呼び出します。",
  },
  {
    question: "data classが自動生成するメソッドに含まれないのは？",
    options: ["equals()", "hashCode()", "toString()", "compareTo()"],
    answer: 3,
    explanation: "data classはequals()・hashCode()・toString()・copy()・componentN()を自動生成します。compareTo()は生成されません。",
  },
  {
    question: "プライマリコンストラクタでプロパティを直接定義するには？",
    options: ["class Person(name: String)", "class Person(val name: String)", "class Person { val name: String }", "class Person(property name: String)"],
    answer: 1,
    explanation: "val/varをコンストラクタパラメータの前に付けるとプロパティとして定義されます。",
  },
  {
    question: "Kotlinでデフォルトの可視性修飾子は？",
    options: ["private", "protected", "internal", "public"],
    answer: 3,
    explanation: "Kotlinではデフォルトの可視性はpublicです。明示的に指定しない場合はどこからでもアクセスできます。",
  },
];

export default function ClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">クラス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinのクラスシステムを学びます。クラス定義の基本からプライマリ・セカンダリコンストラクタ、
          プロパティとカスタムゲッター・セッター、data class、inner/nestedクラス、可視性修飾子までカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="classes" totalLessons={8} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/classes" color="red" categoryId="classes" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">class</code>キーワードでクラスを定義します。Kotlinではnewキーワードなしでインスタンスを生成できます。
        </p>
        <KotlinEditor
          defaultCode={`class Person(val name: String, var age: Int) {
    fun greet() {
        println("こんにちは、私は${"$"}{name}です。${"$"}{age}歳です。")
    }
}

fun main() {
    val person = Person("田中", 30)
    person.greet()
    person.age = 31
    println("誕生日: ${"$"}{person.age}歳")
}`}
          expectedOutput={`こんにちは、私は田中です。30歳です。
誕生日: 31歳`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">データクラス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">data class</code>はequals・hashCode・toString・copyを自動生成します。
        </p>
        <KotlinEditor
          defaultCode={`data class Point(val x: Int, val y: Int)

fun main() {
    val p1 = Point(3, 4)
    val p2 = Point(3, 4)
    val p3 = p1.copy(y = 10)
    println(p1)
    println(p1 == p2)
    println(p3)
}`}
          expectedOutput={`Point(x=3, y=4)
true
Point(x=3, y=10)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
