import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function MapBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Mapの基本</h1>
        <p className="text-gray-400">キーと値のペアを管理するMapの作成と操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Mapとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          MapはキーとValueのペアを格納するコレクションです。
          キーは一意で、1つのキーに対して1つの値が対応します。
          <code className="text-green-300">mapOf()</code>でイミュータブルなMapを、
          <code className="text-green-300">mutableMapOf()</code>でミュータブルなMapを作成できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>キーは一意（重複不可）</li>
          <li>値はキーで高速にアクセス可能</li>
          <li>to infix関数でキーと値のペアを作成</li>
          <li>存在しないキーへのアクセスはnullを返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mapOf()で作成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">mapOf()</code>と
          <code className="text-green-300">to</code>中置演算子でMapを作成します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val capitals = mapOf(
        "Japan" to "Tokyo",
        "France" to "Paris",
        "Germany" to "Berlin"
    )
    println(capitals["Japan"])
    println(capitals["USA"])  // 存在しないキー
    println(capitals.size)
    println(capitals.keys)
    println(capitals.values)
}`}
          expectedOutput={`Tokyo
null
3
[Japan, France, Germany]
[Tokyo, Paris, Berlin]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">mutableMapOf()で操作</h2>
        <p className="text-gray-400 mb-4">
          ミュータブルなMapはput()や[]演算子で要素を追加・更新できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val scores = mutableMapOf("Alice" to 85, "Bob" to 90)
    scores["Carol"] = 95
    scores["Alice"] = 88  // 更新
    println(scores)

    scores.remove("Bob")
    println(scores)
    println(scores.getOrDefault("Dave", 0))
}`}
          expectedOutput={`{Alice=88, Bob=90, Carol=95}
{Alice=88, Carol=95}
0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Mapの反復処理</h2>
        <p className="text-gray-400 mb-4">
          Map.entriesを使ってキーと値のペアを反復処理できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val prices = mapOf("apple" to 100, "banana" to 80, "cherry" to 200)

    for ((fruit, price) in prices) {
        println("${"$"}{fruit}: ${"$"}{price}円")
    }

    val expensive = prices.filter { (_, price) -> price >= 100 }
    println(expensive)
}`}
          expectedOutput={`apple: 100円
banana: 80円
cherry: 200円
{apple=100, cherry=200}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="map-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="map-basics" basePath="/learn/collections" />
    </div>
  );
}
