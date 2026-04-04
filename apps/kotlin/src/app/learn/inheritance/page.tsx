import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Kotlinでクラスを継承可能にするキーワードは？",
    options: ["abstract", "open", "extends", "virtual"],
    answer: 1,
    explanation: "Kotlinではデフォルトでクラスはfinalです。openキーワードを付けることで継承可能になります。",
  },
  {
    question: "親クラスのメソッドをオーバーライドするときに使うキーワードは？",
    options: ["override", "virtual", "redefine", "@Override"],
    answer: 0,
    explanation: "Kotlinではoverrideキーワードをメソッドやプロパティのオーバーライドに使います。",
  },
  {
    question: "sealed classの特徴として正しいのは？",
    options: ["継承を完全に禁止する", "同じファイル内のみで継承できる", "インスタンス化できない", "インターフェースの実装のみ許可する"],
    answer: 1,
    explanation: "sealed classは同じファイル内でのみサブクラスを定義できます。when式で網羅チェックができます。",
  },
  {
    question: "型チェックに使うKotlinの演算子は？",
    options: ["typeof", "instanceof", "is", "checkType"],
    answer: 2,
    explanation: "Kotlinではis演算子で型チェックを行います。isチェック後はスマートキャストが自動適用されます。",
  },
];

export default function InheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">継承</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinの継承モデルを学びます。デフォルトfinalなクラスとopenキーワード、メソッド・プロパティのオーバーライド、
          抽象クラス、インターフェース、sealed classによる型の制限、isとasによる型チェックまでをカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="inheritance" totalLessons={7} color="orange" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/inheritance" color="orange" categoryId="inheritance" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">openとoverride</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">open</code>クラス・関数は継承・オーバーライド可能です。
        </p>
        <KotlinEditor
          defaultCode={`open class Animal(val name: String) {
    open fun sound(): String = "..."
    fun describe() = println("${"$"}{name}の鳴き声: ${"$"}{sound()}")
}

class Dog(name: String) : Animal(name) { override fun sound() = "ワン！" }
class Cat(name: String) : Animal(name) { override fun sound() = "ニャー！" }

fun main() {
    Dog("ポチ").describe()
    Cat("タマ").describe()
}`}
          expectedOutput={`ポチの鳴き声: ワン！
タマの鳴き声: ニャー！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sealed classとwhen</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">sealed class</code>とwhen式を組み合わせると網羅的なパターンマッチができます。
        </p>
        <KotlinEditor
          defaultCode={`sealed class Result
data class Success(val data: String) : Result()
data class Error(val message: String) : Result()
object Loading : Result()

fun handleResult(result: Result): String = when (result) {
    is Success -> "成功: ${"$"}{result.data}"
    is Error   -> "エラー: ${"$"}{result.message}"
    is Loading -> "読み込み中..."
}

fun main() {
    println(handleResult(Success("ユーザーデータ")))
    println(handleResult(Error("接続タイムアウト")))
    println(handleResult(Loading))
}`}
          expectedOutput={`成功: ユーザーデータ
エラー: 接続タイムアウト
読み込み中...`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
