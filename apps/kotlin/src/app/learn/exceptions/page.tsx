import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "finallyブロックの特徴として正しいのはどれですか？",
    options: [
      "例外が発生した場合のみ実行される",
      "例外が発生しない場合のみ実行される",
      "例外の有無に関わらず常に実行される",
      "catchブロックがある場合のみ実行される",
    ],
    answer: 2,
    explanation: "finallyブロックは例外が発生した場合もしない場合も常に実行されます。リソース解放に使います。",
  },
  {
    question: "Kotlinでカスタム例外を作る方法はどれですか？",
    options: [
      "Throwableをimplementsする",
      "Exceptionクラスを継承する",
      "@Exceptionアノテーションを使う",
      "exception keywordを使う",
    ],
    answer: 1,
    explanation: "KotlinでカスタムExceptionはExceptionクラス（またはそのサブクラス）を継承して作成します。",
  },
  {
    question: "Kotlinのtry-catchを式として使う場合の戻り値はどれですか？",
    options: [
      "常にnullを返す",
      "tryブロックまたはcatchブロックの最後の式の値",
      "例外オブジェクト",
      "Boolean値",
    ],
    answer: 1,
    explanation: "Kotlinのtryは式であり、tryブロックまたはcatchブロックの最後の式の値が結果になります。",
  },
  {
    question: "AutoCloseableリソースを安全に扱うKotlinの関数はどれですか？",
    options: ["close()", "use()", "with()", "apply()"],
    answer: 1,
    explanation: "use関数はAutoCloseableを実装したリソースを自動でクローズします。Javaのtry-with-resourcesに相当します。",
  },
];

export default function ExceptionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">例外処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinの例外処理を学びます。try-catch-finallyブロックの基本から、throw式、
          カスタム例外クラスの作成、JavaとKotlinの例外体系の違い、
          try式、use関数によるリソース管理まで幅広くカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="exceptions" totalLessons={6} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/exceptions" color="red" categoryId="exceptions" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">try-catchの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">try</code>ブロックで例外が発生する可能性のあるコードを囲み、
          <code className="text-red-300">catch</code>で例外を処理します。
        </p>
        <KotlinEditor
          defaultCode={`fun divide(a: Int, b: Int): Int {
    return a / b
}

fun main() {
    try {
        println(divide(10, 2))
        println(divide(10, 0))
    } catch (e: ArithmeticException) {
        println("エラー: \${e.message}")
    } finally {
        println("処理完了")
    }
}`}
          expectedOutput={`5
エラー: / by zero
処理完了`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">Exception</code>を継承して独自の例外クラスを作成できます。
        </p>
        <KotlinEditor
          defaultCode={`class InvalidAgeException(message: String) : Exception(message)

fun checkAge(age: Int) {
    if (age < 0 || age > 150) {
        throw InvalidAgeException("無効な年齢: \${age}")
    }
    println("年齢 \${age} は有効です")
}

fun main() {
    try {
        checkAge(25)
        checkAge(-1)
    } catch (e: InvalidAgeException) {
        println("例外: \${e.message}")
    }
}`}
          expectedOutput={`年齢 25 は有効です
例外: 無効な年齢: -1`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
