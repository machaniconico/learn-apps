import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Kotlinのwhen式でJavaのswitch文と同じ役割を果たすものはどれですか？",
    options: ["if-else", "when", "match", "select"],
    answer: 1,
    explanation: "KotlinのwhenはJavaのswitch文に相当しますが、より強力で式として使えます。",
  },
  {
    question: "1から10の範囲を表すKotlinの正しい書き方はどれですか？",
    options: ["1 to 10", "1..10", "range(1, 10)", "1:10"],
    answer: 1,
    explanation: "Kotlinでは..演算子で範囲を作ります。1..10は1から10を含む範囲です。",
  },
  {
    question: "do-whileループの特徴として正しいのはどれですか？",
    options: [
      "条件が真の間だけ実行される",
      "必ず少なくとも1回は実行される",
      "コレクションの要素を順番に処理する",
      "条件が偽の間実行される",
    ],
    answer: 1,
    explanation: "do-whileは最初にブロックを実行してから条件をチェックするため、必ず1回以上実行されます。",
  },
  {
    question: "ループを途中で終了するキーワードはどれですか？",
    options: ["stop", "exit", "break", "return"],
    answer: 2,
    explanation: "breakはループを即座に終了させます。continueは現在の繰り返しをスキップして次へ進みます。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinの制御構文を学びます。if-else、when式、for/while/do-whileループ、
          範囲（Ranges）、break・continue・ラベルなど、プログラムの流れを制御するための
          構文をすべてカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="blue" categoryId="control" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">if式とwhen式</h2>
        <p className="text-gray-400 mb-4">
          Kotlinのif-elseは<code className="text-blue-300">式</code>として使えます。
          when式はJavaのswitch文より強力で、様々な条件に対応できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val score = 85

    // if式（値を返す）
    val grade = if (score >= 90) "A" else if (score >= 80) "B" else "C"
    println("成績: \${grade}")

    // when式
    val message = when {
        score >= 90 -> "優秀"
        score >= 80 -> "良好"
        score >= 70 -> "普通"
        else -> "要努力"
    }
    println("評価: \${message}")
}`}
          expectedOutput={`成績: B
評価: 良好`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループと範囲</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">..</code>演算子で範囲を作り、forループで繰り返し処理できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    // 範囲を使ったforループ
    for (i in 1..5) {
        print("\${i} ")
    }
    println()

    // downToで逆順
    for (i in 5 downTo 1) {
        print("\${i} ")
    }
    println()

    // stepで刻み幅
    for (i in 0..10 step 2) {
        print("\${i} ")
    }
    println()
}`}
          expectedOutput={`1 2 3 4 5
5 4 3 2 1
0 2 4 6 8 10 `}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
