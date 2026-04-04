import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Kotlinで変更できない変数を宣言するキーワードはどれですか？",
    options: ["var", "val", "const", "let"],
    answer: 1,
    explanation: "valは再代入不可の変数（読み取り専用）を宣言します。varは変更可能な変数です。",
  },
  {
    question: "Kotlinのメイン関数の正しい書き方はどれですか？",
    options: [
      "void main() {}",
      "fun main() {}",
      "function main() {}",
      "def main() {}",
    ],
    answer: 1,
    explanation: "Kotlinではfunキーワードを使って関数を定義します。メイン関数はfun main()です。",
  },
  {
    question: "文字列テンプレートで変数を埋め込む正しい方法はどれですか？",
    options: [
      '"Hello ${name}"',
      '"Hello #{name}"',
      '"Hello %{name}"',
      '"Hello @{name}"',
    ],
    answer: 0,
    explanation: "Kotlinの文字列テンプレートでは${}または$を使って変数を埋め込みます。",
  },
  {
    question: "Kotlinでnullを代入できる変数の宣言方法はどれですか？",
    options: ["var name: String", "var name: String?", "var name: Nullable<String>", "var name: String | null"],
    answer: 1,
    explanation: "型名の後に?を付けることでNull許容型になります。String?はnullを代入できます。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">Kotlin基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinプログラミングの基礎を学びます。Hello Worldから始まり、変数宣言、データ型、
          文字列操作、演算子、入出力など、Kotlinを書くために必要な基本的な概念をカバーします。
          型推論やnull安全の基礎についても触れます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="blue" categoryId="basics" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のKotlinプログラム</h2>
        <p className="text-gray-400 mb-4">
          Kotlinのエントリーポイントは<code className="text-blue-300">fun main()</code>関数です。
          <code className="text-blue-300">println()</code>で画面に出力できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    println("Hello, World!")
    println("Kotlinへようこそ！")
    val language = "Kotlin"
    println("私は\${language}を学んでいます")
}`}
          expectedOutput={`Hello, World!
Kotlinへようこそ！
私はKotlinを学んでいます`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数とデータ型</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">val</code>は読み取り専用、
          <code className="text-blue-300">var</code>は変更可能な変数です。型推論により型注釈を省略できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name: String = "Alice"
    var age: Int = 25
    val height = 165.5  // 型推論でDouble
    var score = 100

    println("名前: \${name}")
    println("年齢: \${age}")
    age = 26
    println("来年の年齢: \${age}")
    println("身長: \${height}")
}`}
          expectedOutput={`名前: Alice
年齢: 25
来年の年齢: 26
身長: 165.5`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
