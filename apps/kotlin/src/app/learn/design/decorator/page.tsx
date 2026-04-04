import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DecoratorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デコレーターパターン</h1>
        <p className="text-gray-400">拡張関数とインターフェース委譲を活用したデコレーターパターンの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デコレーターパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デコレーターパターンは既存のオブジェクトに動的に機能を追加するパターンです。
          継承を使わずに機能拡張できるため、柔軟な設計が可能です。
          Kotlinではbyキーワードによるインターフェース委譲と拡張関数が強力なツールになります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>by キーワードでインターフェース実装を委譲しデコレーターを簡潔に書く</li>
          <li>拡張関数で既存クラスを変更せずに機能を追加</li>
          <li>ラッパークラスで機能を積み重ねる古典的なデコレーター</li>
          <li>関数合成でデコレーターチェーンを作れる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">byキーワードによるインターフェース委譲</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">by</code>キーワードを使うとデコレーター実装の定型コードを大幅に削減できます。
        </p>
        <KotlinEditor
          defaultCode={`interface TextProcessor {
    fun process(text: String): String
}

class PlainProcessor : TextProcessor {
    override fun process(text: String) = text
}

class UpperCaseDecorator(private val wrapped: TextProcessor) : TextProcessor by wrapped {
    override fun process(text: String) = wrapped.process(text).uppercase()
}

class TrimDecorator(private val wrapped: TextProcessor) : TextProcessor by wrapped {
    override fun process(text: String) = wrapped.process(text).trim()
}

class PrefixDecorator(
    private val wrapped: TextProcessor,
    private val prefix: String
) : TextProcessor by wrapped {
    override fun process(text: String) = "\${prefix}\${wrapped.process(text)}"
}

fun main() {
    val base = PlainProcessor()
    val trimmed = TrimDecorator(base)
    val upper = UpperCaseDecorator(trimmed)
    val prefixed = PrefixDecorator(upper, ">> ")

    val input = "  hello, world  "
    println("元テキスト: '\${input}'")
    println("trim後: '\${trimmed.process(input)}'")
    println("大文字: '\${upper.process(input)}'")
    println("プレフィックス付き: '\${prefixed.process(input)}'")
}`}
          expectedOutput={`元テキスト: '  hello, world  '
trim後: 'hello, world'
大文字: 'HELLO, WORLD'
プレフィックス付き: '>> HELLO, WORLD'`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数合成によるデコレーター</h2>
        <p className="text-gray-400 mb-4">
          関数合成を使うとデコレーターを関数のチェーンとして表現できます。
        </p>
        <KotlinEditor
          defaultCode={`typealias Transform = (String) -> String

fun andThen(f: Transform, g: Transform): Transform = { g(f(it)) }

infix fun Transform.then(other: Transform): Transform = { other(this(it)) }

fun main() {
    val trim: Transform = String::trim
    val upper: Transform = String::uppercase
    val addBrackets: Transform = { "[$it]" }
    val removeSpaces: Transform = { it.replace(" ", "_") }

    // andThen で合成
    val pipeline1 = andThen(andThen(trim, upper), addBrackets)
    println(pipeline1("  hello world  "))

    // then 中置関数で合成（読みやすい）
    val pipeline2 = trim then upper then removeSpaces then addBrackets
    println(pipeline2("  hello world  "))

    // リストで複数変換を適用
    val transforms = listOf<Transform>(
        String::trim,
        String::uppercase,
        { it.replace("O", "0") }
    )
    val result = transforms.fold("  hello world  ") { acc, t -> t(acc) }
    println(result)
}`}
          expectedOutput={`[HELLO WORLD]
[HELLO_WORLD]
HELL0 W0RLD`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="decorator" />
      </div>
      <LessonNav lessons={lessons} currentId="decorator" basePath="/learn/design" />
    </div>
  );
}
