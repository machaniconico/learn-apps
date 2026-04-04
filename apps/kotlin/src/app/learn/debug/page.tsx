import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

const quizQuestions: QuizQuestion[] = [
  {
    question: "デバッグ出力に変数名と値を一緒に表示する便利な方法はどれですか？",
    options: [
      'println(x)',
      'println("x = $x")',
      'debug(x)',
      'log(x)',
    ],
    answer: 1,
    explanation: "文字列テンプレートを使って変数名と値を一緒に表示することでデバッグが容易になります。",
  },
  {
    question: "NullPointerExceptionを防ぐKotlinの仕組みはどれですか？",
    options: ["try-catch", "Null安全型システム（String?）", "assert", "guard"],
    answer: 1,
    explanation: "KotlinのNull安全型システムにより、コンパイル時にnull参照エラーの多くを防げます。",
  },
  {
    question: "ブレークポイントで実行を停止する目的は何ですか？",
    options: [
      "プログラムを終了する",
      "特定の行で実行を一時停止して変数の状態を確認する",
      "エラーを無視する",
      "コードを削除する",
    ],
    answer: 1,
    explanation: "ブレークポイントを設定すると、その行で実行が停止し、変数の値やスタックトレースを確認できます。",
  },
  {
    question: "ClassCastExceptionが発生する原因はどれですか？",
    options: [
      "変数がnullのとき",
      "不正な型キャストを行ったとき",
      "配列の範囲外にアクセスしたとき",
      "スタックオーバーフローが起きたとき",
    ],
    answer: 1,
    explanation: "ClassCastExceptionはオブジェクトを互換性のない型にキャストしようとしたときに発生します。",
  },
];

export default function DebugPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">デバッグ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinプログラムのデバッグ手法を学びます。printデバッグの基本から、
          IntelliJ IDEAのデバッガ活用、ブレークポイントの設定、コルーチンのデバッグ、
          よくあるエラーとその対処法まで、実践的なデバッグスキルを身につけます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="debug" totalLessons={5} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/debug" color="teal" categoryId="debug" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">printデバッグの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">println()</code>を使って変数の値や処理の流れを
          確認するシンプルなデバッグ手法です。
        </p>
        <KotlinEditor
          defaultCode={`fun divide(a: Int, b: Int): Int {
    println("DEBUG: divide called with a=\${a}, b=\${b}")
    val result = a / b
    println("DEBUG: result=\${result}")
    return result
}

fun main() {
    val x = 10
    val y = 2
    println("Input: x=\${x}, y=\${y}")
    val result = divide(x, y)
    println("Output: \${result}")
}`}
          expectedOutput={`Input: x=10, y=2
DEBUG: divide called with a=10, b=2
DEBUG: result=5
Output: 5`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">よくあるエラー: NullPointerException</h2>
        <p className="text-gray-400 mb-4">
          Kotlinのnull安全型を活用して、実行時エラーをコンパイル時に防ぎます。
        </p>
        <KotlinEditor
          defaultCode={`fun getUserName(id: Int): String? {
    return if (id == 1) "Alice" else null
}

fun main() {
    val name1 = getUserName(1)
    val name2 = getUserName(99)

    // 安全なnullチェック
    println(name1?.uppercase() ?: "ユーザーが見つかりません")
    println(name2?.uppercase() ?: "ユーザーが見つかりません")
}`}
          expectedOutput={`ALICE
ユーザーが見つかりません`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
