import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Kotlinでシングルトンパターンを実装する最もKotlinらしい方法は？",
    options: ["class + privateコンストラクタ", "object宣言", "companion object", "lazy初期化"],
    answer: 1,
    explanation: "Kotlinのobject宣言は言語レベルでシングルトンを保証します。スレッドセーフで簡潔に書けます。",
  },
  {
    question: "ビルダーパターンをKotlinらしく書く際によく使うスコープ関数はどれですか？",
    options: ["let", "run", "apply", "also"],
    answer: 2,
    explanation: "apply関数はレシーバオブジェクト自身を返しながらブロック内でプロパティを設定できるため、ビルダーパターンに最適です。",
  },
  {
    question: "ストラテジーパターンをKotlinで実装する際、インターフェースの代わりに使えるものは？",
    options: ["sealed class", "高階関数（関数型）", "companion object", "data class"],
    answer: 1,
    explanation: "Kotlinでは高階関数（(Input) -> Output型）をストラテジーとして渡せるため、シンプルなケースでは専用インターフェース不要です。",
  },
  {
    question: "Delegates.observableを使うデザインパターンはどれですか？",
    options: ["ファクトリパターン", "シングルトンパターン", "オブザーバーパターン", "デコレーターパターン"],
    answer: 2,
    explanation: "Delegates.observableはプロパティの変更を監視してコールバックを呼ぶため、オブザーバーパターンの実装に使います。",
  },
];

export default function DesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">デザインパターン</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinのイディオムを活かしたデザインパターンを学びます。object宣言によるシングルトン、
          companion objectを使ったファクトリ、apply/DSLスタイルのビルダー、
          Delegates.observableを使ったオブザーバー、高階関数によるストラテジー、
          拡張関数とbyキーワードを使ったデコレーターまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="design" totalLessons={6} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/design" color="purple" categoryId="design" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinらしいシングルトン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">object</code>宣言を使うと言語レベルでスレッドセーフなシングルトンが作れます。
          Javaのような複雑な実装は不要です。
        </p>
        <KotlinEditor
          defaultCode={`object AppConfig {
    val appName = "Kotlin App"
    val version = "1.0.0"
    var debugMode = false

    fun getInfo(): String = "\${appName} v\${version} (debug=\${debugMode})"
}

fun main() {
    println(AppConfig.getInfo())
    AppConfig.debugMode = true
    println(AppConfig.getInfo())

    // 同じインスタンスであることを確認
    val config1 = AppConfig
    val config2 = AppConfig
    println("同じインスタンス: \${config1 === config2}")
}`}
          expectedOutput={`Kotlin App v1.0.0 (debug=false)
Kotlin App v1.0.0 (debug=true)
同じインスタンス: true`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">高階関数によるストラテジーパターン</h2>
        <p className="text-gray-400 mb-4">
          Kotlinでは関数を第一級オブジェクトとして扱えるため、高階関数でストラテジーパターンを簡潔に表現できます。
        </p>
        <KotlinEditor
          defaultCode={`fun sortNumbers(numbers: List<Int>, strategy: (Int, Int) -> Int): List<Int> {
    return numbers.sortedWith { a, b -> strategy(a, b) }
}

fun main() {
    val numbers = listOf(5, 2, 8, 1, 9, 3)

    val ascending = sortNumbers(numbers) { a, b -> a - b }
    println("昇順: \${ascending}")

    val descending = sortNumbers(numbers) { a, b -> b - a }
    println("降順: \${descending}")

    // 絶対値でソート
    val byAbsolute = listOf(-5, 2, -8, 1, 9, -3)
        .sortedBy { Math.abs(it) }
    println("絶対値順: \${byAbsolute}")
}`}
          expectedOutput={`昇順: [1, 2, 3, 5, 8, 9]
降順: [9, 8, 5, 3, 2, 1]
絶対値順: [1, 2, -3, -5, -8, 9]`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
