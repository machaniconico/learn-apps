import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function SetBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Setの基本</h1>
        <p className="text-gray-400">重複を許さないコレクションSetの作成と操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Setとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SetはKotlinのコレクションの一つで、重複する要素を持ちません。
          同じ値を追加しようとしても一度しか保持されません。
          <code className="text-green-300">setOf()</code>でイミュータブルなSetを、
          <code className="text-green-300">mutableSetOf()</code>でミュータブルなSetを作成できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>重複要素を自動的に除外する</li>
          <li>順序は保証されない（LinkedHashSetは挿入順を保持）</li>
          <li>contains()で要素の存在チェックが高速</li>
          <li>setOf()はイミュータブル、mutableSetOf()はミュータブル</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">setOf()で作成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">setOf()</code>を使ってSetを作成します。
          重複する値は自動的に一つにまとめられます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val fruits = setOf("apple", "banana", "cherry", "apple", "banana")
    println(fruits)
    println("size: ${"$"}{fruits.size}")
    println("contains apple: ${"$"}{fruits.contains("apple")}")
    println("contains grape: ${"$"}{"grape" in fruits}")
}`}
          expectedOutput={`[apple, banana, cherry]
size: 3
contains apple: true
contains grape: false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mutableSetOf()で操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">mutableSetOf()</code>を使うと
          add()やremove()で要素を動的に操作できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val colors = mutableSetOf("red", "green", "blue")
    colors.add("yellow")
    colors.add("red")  // 重複 - 無視される
    println(colors)

    colors.remove("green")
    println(colors)
    println("size: ${"$"}{colors.size}")
}`}
          expectedOutput={`[red, green, blue, yellow]
[red, blue, yellow]
size: 3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Set演算</h2>
        <p className="text-gray-400 mb-4">
          和集合・積集合・差集合などの集合演算をKotlinで簡単に行えます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val a = setOf(1, 2, 3, 4, 5)
    val b = setOf(3, 4, 5, 6, 7)

    println("和集合: ${"$"}{a union b}")
    println("積集合: ${"$"}{a intersect b}")
    println("差集合: ${"$"}{a subtract b}")
}`}
          expectedOutput={`和集合: [1, 2, 3, 4, 5, 6, 7]
積集合: [3, 4, 5]
差集合: [1, 2]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="set-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="set-basics" basePath="/learn/collections" />
    </div>
  );
}
