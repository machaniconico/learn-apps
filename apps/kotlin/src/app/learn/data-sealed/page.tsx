import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("data-sealed");

const quizQuestions: QuizQuestion[] = [
  {
    question: "data classで自動生成されないメソッドはどれですか？",
    options: ["equals()", "hashCode()", "toString()", "clone()"],
    answer: 3,
    explanation: "data classはequals、hashCode、toString、copy、componentNを自動生成しますが、clone()は生成しません。",
  },
  {
    question: "sealed classのサブクラスはどこで定義できますか？",
    options: [
      "どこでも定義できる",
      "同じファイル内のみ（Kotlin 1.5以前）",
      "同じパッケージ内のみ",
      "別のモジュールでも定義できる",
    ],
    answer: 1,
    explanation: "Kotlin 1.5以前はsealed classのサブクラスは同じファイル内のみ、1.5以降は同じパッケージ内で定義できます。",
  },
  {
    question: "data classのcopy()メソッドの用途は？",
    options: [
      "オブジェクトを完全に複製する",
      "一部プロパティだけ変えた新インスタンスを作る",
      "オブジェクトをシリアライズする",
      "プロパティをリセットする",
    ],
    answer: 1,
    explanation: "copy()は指定したプロパティだけ変えた新しいインスタンスを作成します。イミュータブルなオブジェクト操作に便利です。",
  },
  {
    question: "typealiasの用途として正しいものは？",
    options: [
      "新しい型を作成する",
      "既存の型に別名をつける",
      "型を継承する",
      "型を削除する",
    ],
    answer: 1,
    explanation: "typealiasは既存の型に別名をつけるだけで、新しい型は作りません。コードの可読性向上に使います。",
  },
];

export default function DataSealedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">データクラス・Sealed</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          data classによる便利なデータ保持クラス、sealed classを使った閉じた型階層、
          値クラス、型エイリアスなどKotlinの高度な型システムを活用する方法を学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="data-sealed" totalLessons={6} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/data-sealed" color="cyan" categoryId="data-sealed" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">データクラスの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">data class</code>を使うと
          equals・hashCode・toString・copyが自動生成されます。
        </p>
        <KotlinEditor
          defaultCode={`data class User(val name: String, val age: Int)

fun main() {
    val user1 = User("Alice", 25)
    val user2 = User("Alice", 25)
    println(user1)
    println(user1 == user2)
    val user3 = user1.copy(age = 26)
    println(user3)
}`}
          expectedOutput={`User(name=Alice, age=25)
true
User(name=Alice, age=26)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sealed classとwhen式</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sealed class</code>とwhen式を組み合わせると
          すべてのサブタイプを網羅的に処理できます。
        </p>
        <KotlinEditor
          defaultCode={`sealed class Result
data class Success(val data: String) : Result()
data class Error(val message: String) : Result()

fun handle(result: Result): String = when (result) {
    is Success -> "成功: ${"$"}{result.data}"
    is Error -> "エラー: ${"$"}{result.message}"
}

fun main() {
    println(handle(Success("データ取得完了")))
    println(handle(Error("接続タイムアウト")))
}`}
          expectedOutput={`成功: データ取得完了
エラー: 接続タイムアウト`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
