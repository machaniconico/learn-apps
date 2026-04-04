import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("data-sealed");

export default function TypeAliasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データクラス・Sealed レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型エイリアス</h1>
        <p className="text-gray-400">typealiasキーワードを使った型の別名定義</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">typealiasとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">typealias</code>は既存の型に別名をつけます。
          新しい型を作るわけではなく、単に別名をつけるだけです。
          複雑な型名を短くしたり、意味のある名前をつけたりするのに便利です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>新しい型は作成しない（コンパイル後は元の型と同じ）</li>
          <li>関数型に意味のある名前をつけるのに有用</li>
          <li>複雑なジェネリック型を短縮できる</li>
          <li>コードの可読性向上に役立つ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なtypealias</h2>
        <p className="text-gray-400 mb-4">
          長い型名に短い別名をつけてコードを読みやすくします。
        </p>
        <KotlinEditor
          defaultCode={`typealias StringMap = Map<String, String>
typealias IntList = List<Int>
typealias Predicate<T> = (T) -> Boolean

fun filterWith(list: IntList, pred: Predicate<Int>): IntList {
    return list.filter(pred)
}

fun main() {
    val config: StringMap = mapOf("host" to "localhost", "port" to "8080")
    println(config)

    val numbers: IntList = listOf(1, 2, 3, 4, 5, 6)
    val evens = filterWith(numbers) { it % 2 == 0 }
    println(evens)
}`}
          expectedOutput={`{host=localhost, port=8080}
[2, 4, 6]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数型のtypealias</h2>
        <p className="text-gray-400 mb-4">
          複雑な関数型に意味のある名前をつけることでコードの意図が明確になります。
        </p>
        <KotlinEditor
          defaultCode={`typealias EventHandler = (String) -> Unit
typealias Transformer<T, R> = (T) -> R

fun registerHandler(event: String, handler: EventHandler) {
    println("${"$"}{event}を登録")
    handler("イベント発生: ${"$"}{event}")
}

fun <T, R> transform(value: T, transformer: Transformer<T, R>): R {
    return transformer(value)
}

fun main() {
    registerHandler("click") { msg -> println(msg) }
    val result = transform(42) { it.toString() }
    println(result)
    val upper = transform("hello") { it.uppercase() }
    println(upper)
}`}
          expectedOutput={`clickを登録
イベント発生: click
42
HELLO`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="data-sealed" lessonId="type-aliases" />
      </div>
      <LessonNav lessons={lessons} currentId="type-aliases" basePath="/learn/data-sealed" />
    </div>
  );
}
