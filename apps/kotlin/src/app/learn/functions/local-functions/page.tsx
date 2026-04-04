import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function LocalFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ローカル関数</h1>
        <p className="text-gray-400">関数内に定義するローカル関数の概念と活用シーンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ローカル関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinでは関数の中に別の関数を定義できます。これをローカル関数と呼びます。
          ローカル関数は外側の関数の変数にアクセスでき（クロージャ）、
          外部から呼び出せないためカプセル化に役立ちます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>関数内で fun キーワードで定義</li>
          <li>外側の関数の変数（スコープ）にアクセス可能</li>
          <li>外部から呼び出せない（カプセル化）</li>
          <li>コードの重複を避けつつスコープを限定できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ローカル関数の基本</h2>
        <p className="text-gray-400 mb-4">関数内に別の関数を定義して使う例です。</p>
        <KotlinEditor
          defaultCode={`fun printFormattedReport(title: String, items: List<String>) {
    // ローカル関数：外側の変数にアクセスできる
    fun printLine() {
        println("-".repeat(title.length + 4))
    }

    fun printItem(item: String) {
        println("| \${item}")
    }

    printLine()
    println("| \${title}")
    printLine()
    for (item in items) {
        printItem(item)
    }
    printLine()
}

fun main() {
    printFormattedReport(
        "商品リスト",
        listOf("Apple - 100円", "Banana - 80円", "Cherry - 200円")
    )
}`}
          expectedOutput={`-----------
| 商品リスト
-----------
| Apple - 100円
| Banana - 80円
| Cherry - 200円
-----------`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ローカル関数で外側の変数を使う</h2>
        <p className="text-gray-400 mb-4">ローカル関数は外側の関数のスコープにアクセスできます。</p>
        <KotlinEditor
          defaultCode={`fun processScores(scores: List<Int>) {
    var passCount = 0
    var failCount = 0

    fun evaluate(score: Int) {
        if (score >= 60) {
            passCount++
            println("\${score}点: 合格")
        } else {
            failCount++
            println("\${score}点: 不合格")
        }
    }

    for (score in scores) {
        evaluate(score)
    }

    println("合格: \${passCount}人, 不合格: \${failCount}人")
}

fun main() {
    processScores(listOf(85, 45, 72, 58, 91, 63))
}`}
          expectedOutput={`85点: 合格
45点: 不合格
72点: 合格
58点: 不合格
91点: 合格
63点: 合格
合格: 4人, 不合格: 2人`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="local-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="local-functions" basePath="/learn/functions" />
    </div>
  );
}
