import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("scope-functions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "let関数の戻り値は何ですか？",
    options: ["レシーバオブジェクト", "ラムダの結果", "Unit", "null"],
    answer: 1,
    explanation: "letはラムダの最後の式の結果を返します。オブジェクトをitとして参照します。",
  },
  {
    question: "apply関数の戻り値は何ですか？",
    options: ["ラムダの結果", "Unit", "レシーバオブジェクト自身", "null"],
    answer: 2,
    explanation: "applyはラムダの結果ではなく、レシーバオブジェクト自身を返します。オブジェクト初期化に便利です。",
  },
  {
    question: "with関数の特徴として正しいのは？",
    options: [
      "拡張関数として定義されている",
      "レシーバを最初の引数として渡す通常の関数",
      "nullableオブジェクトに使用できる",
      "オブジェクト自身を返す",
    ],
    answer: 1,
    explanation: "withは拡張関数ではなく、レシーバオブジェクトを最初の引数として取る通常の関数です。",
  },
  {
    question: "also関数とapply関数の違いは？",
    options: [
      "alsoはラムダ結果を返し、applyはオブジェクトを返す",
      "alsoはitでオブジェクト参照、applyはthisでオブジェクト参照",
      "alsoはnullableのみ、applyはnon-nullのみ",
      "違いはない",
    ],
    answer: 1,
    explanation: "alsoはラムダ内でitを使ってオブジェクトを参照し、applyはthisを使います。両方ともオブジェクト自身を返します。",
  },
];

export default function ScopeFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">スコープ関数</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          let・run・with・apply・alsoの5つのスコープ関数を学びます。
          それぞれの違いを理解し、適切な場面で使い分けられるようになります。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="scope-functions" totalLessons={5} color="pink" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/scope-functions" color="pink" categoryId="scope-functions" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">let関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">let</code>はオブジェクトをラムダに渡し、
          ラムダの結果を返します。nullチェックと組み合わせて使うことが多いです。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name: String? = "Kotlin"
    val length = name?.let {
        println("名前: ${"$"}{it}")
        it.length
    }
    println("長さ: ${"$"}{length}")

    val result = "hello".let { it.uppercase() }
    println(result)
}`}
          expectedOutput={`名前: Kotlin
長さ: 6
HELLO`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">apply関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">apply</code>はオブジェクト自身を返します。
          オブジェクトの初期化や設定に使うと便利です。
        </p>
        <KotlinEditor
          defaultCode={`data class Config(
    var host: String = "",
    var port: Int = 0,
    var debug: Boolean = false
)

fun main() {
    val config = Config().apply {
        host = "localhost"
        port = 8080
        debug = true
    }
    println(config)
}`}
          expectedOutput={`Config(host=localhost, port=8080, debug=true)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="pink" />
    </div>
  );
}
