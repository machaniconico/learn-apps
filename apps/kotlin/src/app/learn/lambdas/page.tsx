import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambdas");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Kotlinのラムダ式の正しい構文は？",
    options: ["(x: Int) => x * 2", "{ x: Int -> x * 2 }", "lambda(x: Int) { x * 2 }", "fun(x: Int) => x * 2"],
    answer: 1,
    explanation: "Kotlinのラムダ式は{ 引数 -> 本体 }の形式です。波括弧で囲み、->の左に引数、右に処理を書きます。",
  },
  {
    question: "高階関数の説明として正しいのは？",
    options: ["多数の引数を持つ関数", "関数を引数として受け取るか戻り値として返す関数", "再帰的に呼び出される関数", "inlineで定義された関数"],
    answer: 1,
    explanation: "高階関数は関数を引数として受け取るか、関数を戻り値として返す関数です。",
  },
  {
    question: "引数が1つのラムダでパラメータ名を省略した場合に使える暗黙の名前は？",
    options: ["self", "this", "it", "arg"],
    answer: 2,
    explanation: "引数が1つのラムダではパラメータ名をitで参照できます。{ it * 2 }のように使います。",
  },
  {
    question: "apply関数の説明として正しいのは？",
    options: ["レシーバを変換して別の型を返す", "レシーバにブロックを適用してレシーバ自身を返す", "Null許容値をnullでない場合だけ処理する", "複数の引数を受け取る関数を適用する"],
    answer: 1,
    explanation: "applyはレシーバにブロックを適用し、レシーバ自身を返します。オブジェクトの初期化・設定に便利です。",
  },
];

export default function LambdasPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">ラムダ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinのラムダと関数型プログラミングを学びます。ラムダ式の基本構文から高階関数、関数型の宣言、
          クロージャ、itキーワード、with・apply・letなどのスコープ関数、inlineキーワードまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="lambdas" totalLessons={7} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/lambdas" color="violet" categoryId="lambdas" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式の基本</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式は<code className="text-violet-300">{"{ 引数 -> 処理 }"}</code>の形式で書きます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    val doubled = numbers.map { it * 2 }
    println(doubled)
    val evens = numbers.filter { it % 2 == 0 }
    println(evens)
    val sum = numbers.reduce { acc, n -> acc + n }
    println("合計: ${"$"}sum")
}`}
          expectedOutput={`[2, 4, 6, 8, 10]
[2, 4]
合計: 15`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スコープ関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-violet-300">apply</code>・<code className="text-violet-300">let</code>はオブジェクトのスコープ内でコードを実行します。
        </p>
        <KotlinEditor
          defaultCode={`data class Person(var name: String = "", var age: Int = 0)

fun main() {
    val person = Person().apply {
        name = "山田"
        age = 25
    }
    println(person)

    val maybeNull: String? = "Kotlin"
    maybeNull?.let { println("文字数: ${"$"}{it.length}") }
}`}
          expectedOutput={`Person(name=山田, age=25)
文字数: 6`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
