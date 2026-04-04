import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegation");

export default function DelegationPatternPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">委譲 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">委譲パターン</h1>
        <p className="text-gray-400">Kotlinでクラスの機能を別オブジェクトに委譲するデザインパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">委譲パターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          委譲パターンでは、あるオブジェクトの処理を別のオブジェクト（デリゲート）に任せます。
          継承の代替として「継承より合成を」という原則に沿ったパターンです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>委譲先オブジェクトに実際の処理を任せる</li>
          <li>継承よりも柔軟な設計が可能</li>
          <li>コードの再利用性が高まる</li>
          <li>Kotlinのbyキーワードで言語レベルでサポートされている</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">手動での委譲パターン</h2>
        <p className="text-gray-400 mb-4">インターフェースを通じて処理を別オブジェクトに委譲します。</p>
        <KotlinEditor
          defaultCode={`interface Logger {
    fun log(message: String)
    fun logError(message: String)
}

class ConsoleLogger : Logger {
    override fun log(message: String) = println("[LOG] \${message}")
    override fun logError(message: String) = println("[ERROR] \${message}")
}

// 手動で委譲を実装
class Service(private val logger: Logger) : Logger {
    override fun log(message: String) = logger.log(message)
    override fun logError(message: String) = logger.logError(message)

    fun process(input: String) {
        log("処理開始: \${input}")
        if (input.isEmpty()) logError("入力が空です")
        else log("処理完了: \${input.uppercase()}")
    }
}

fun main() {
    val service = Service(ConsoleLogger())
    service.process("hello")
    service.process("")
}`}
          expectedOutput={`[LOG] 処理開始: hello
[LOG] 処理完了: HELLO
[LOG] 処理開始:
[ERROR] 入力が空です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">委譲で機能を組み合わせる</h2>
        <p className="text-gray-400 mb-4">複数の委譲先を持つことで機能を組み合わせられます。</p>
        <KotlinEditor
          defaultCode={`interface Formatter {
    fun format(text: String): String
}

class UpperCaseFormatter : Formatter {
    override fun format(text: String) = text.uppercase()
}

class TrimFormatter : Formatter {
    override fun format(text: String) = text.trim()
}

class PipelineFormatter(private val formatters: List<Formatter>) {
    fun process(text: String): String {
        return formatters.fold(text) { acc, formatter -> formatter.format(acc) }
    }
}

fun main() {
    val pipeline = PipelineFormatter(listOf(TrimFormatter(), UpperCaseFormatter()))
    val inputs = listOf("  hello  ", "  world  ", "  kotlin  ")
    inputs.forEach { println(pipeline.process(it)) }
}`}
          expectedOutput={`HELLO
WORLD
KOTLIN`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegation" lessonId="delegation-pattern" />
      </div>
      <LessonNav lessons={lessons} currentId="delegation-pattern" basePath="/learn/delegation" />
    </div>
  );
}
