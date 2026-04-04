import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ラムダ式の正しい構文はどれですか？",
    options: [
      "{ x: Int -> x * 2 }",
      "(x: Int) => x * 2",
      "lambda(x: Int) { x * 2 }",
      "fun(x: Int) -> x * 2",
    ],
    answer: 0,
    explanation: "Kotlinのラムダ式は{ パラメータ -> 本体 }の形式です。{ x: Int -> x * 2 }が正しい構文です。",
  },
  {
    question: "ラムダのパラメータが1つのとき省略できる暗黙の名前は？",
    options: ["self", "it", "this", "arg"],
    answer: 1,
    explanation: "パラメータが1つの場合、itという暗黙のパラメータ名を使用できます。",
  },
  {
    question: "高階関数とは何ですか？",
    options: [
      "再帰的な関数",
      "関数を引数または戻り値として扱う関数",
      "インライン化された関数",
      "ネストされた関数",
    ],
    answer: 1,
    explanation: "高階関数は関数を引数として受け取るか、関数を戻り値として返す関数のことです。",
  },
  {
    question: "inlineキーワードの効果は？",
    options: [
      "関数をprivateにする",
      "ラムダのオブジェクト生成を避けてパフォーマンスを改善する",
      "関数を最初に実行する",
      "関数をシングルトンにする",
    ],
    answer: 1,
    explanation: "inline関数はコンパイル時にラムダのコードを呼び出し元に展開し、ラムダオブジェクトの生成コストを削減します。",
  },
];

export default function LambdaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">ラムダ式</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinのラムダ式と高階関数を学びます。ラムダ構文、関数型、クロージャ、
          インライン関数など、関数型プログラミングの核心技術を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="lambda" totalLessons={8} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/lambda" color="pink" categoryId="lambda" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式の基本</h2>
        <p className="text-gray-400 mb-4">
          ラムダ式は<code className="text-pink-300">{"{ パラメータ -> 本体 }"}</code>の形式で書きます。
          変数に代入したり、高階関数に渡したりできます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val double = { x: Int -> x * 2 }
    println(double(5))

    val greet = { name: String -> "Hello, ${"$"}{name}!" }
    println(greet("Kotlin"))

    val numbers = listOf(1, 2, 3, 4, 5)
    val doubled = numbers.map { it * 2 }
    println(doubled)
}`}
          expectedOutput={`10
Hello, Kotlin!
[2, 4, 6, 8, 10]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">高階関数</h2>
        <p className="text-gray-400 mb-4">
          関数を引数として受け取る高階関数を自分で定義できます。
          関数型は<code className="text-pink-300">(Int) -&gt; String</code>のように表記します。
        </p>
        <KotlinEditor
          defaultCode={`fun applyTwice(x: Int, f: (Int) -> Int): Int = f(f(x))

fun transform(items: List<String>, f: (String) -> String): List<String> {
    return items.map(f)
}

fun main() {
    println(applyTwice(3, { it * 2 }))
    val result = transform(listOf("hello", "world")) { it.uppercase() }
    println(result)
}`}
          expectedOutput={`12
[HELLO, WORLD]`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
