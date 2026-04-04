import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegation");

export default function MapDelegationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">委譲 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Mapへの委譲</h1>
        <p className="text-gray-400">Mapにプロパティ値を格納してクラスをMapに委譲するパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Mapへのプロパティ委譲</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinではクラスのプロパティ値をMapに格納して委譲できます。
          JSONやDynamic構造のデータを扱うときに便利なパターンです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>val name: String by map でMapのキー"name"の値をプロパティとして使える</li>
          <li>MutableMapを使うとvar（ミュータブル）のプロパティにも委譲できる</li>
          <li>プロパティ名がMapのキーになる</li>
          <li>動的なデータ構造のラッパークラスに適している</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Mapへの委譲の基本</h2>
        <p className="text-gray-400 mb-4">Mapをコンストラクタで受け取りプロパティに委譲します。</p>
        <KotlinEditor
          defaultCode={`class User(val map: Map<String, Any?>) {
    val name: String by map
    val age: Int by map
    val email: String by map
}

fun main() {
    val user = User(mapOf(
        "name" to "Alice",
        "age" to 30,
        "email" to "alice@example.com"
    ))

    println("名前: \${user.name}")
    println("年齢: \${user.age}")
    println("メール: \${user.email}")
}`}
          expectedOutput={`名前: Alice
年齢: 30
メール: alice@example.com`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MutableMapへの委譲</h2>
        <p className="text-gray-400 mb-4">MutableMapを使うとvarプロパティを委譲できます。</p>
        <KotlinEditor
          defaultCode={`class MutableUser(val map: MutableMap<String, Any?>) {
    var name: String by map
    var age: Int by map
}

fun main() {
    val user = MutableUser(mutableMapOf(
        "name" to "Bob",
        "age" to 25
    ))

    println("初期: \${user.name}, \${user.age}")

    user.name = "Bob Smith"
    user.age = 26

    println("更新後: \${user.name}, \${user.age}")
    println("Map内容: \${user.map}")
}`}
          expectedOutput={`初期: Bob, 25
更新後: Bob Smith, 26
Map内容: {name=Bob Smith, age=26}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONパースのシミュレーション</h2>
        <p className="text-gray-400 mb-4">Map委譲はJSONのデータをKotlinオブジェクトにマッピングするのに便利です。</p>
        <KotlinEditor
          defaultCode={`class Product(private val data: Map<String, Any?>) {
    val id: Int by data
    val name: String by data
    val price: Double by data
    val inStock: Boolean by data

    override fun toString() = "Product(id=\${id}, name=\${name}, price=\${price}, inStock=\${inStock})"
}

fun main() {
    // JSONをMapに変換したシミュレーション
    val jsonData = listOf(
        mapOf("id" to 1, "name" to "Kotlin本", "price" to 2800.0, "inStock" to true),
        mapOf("id" to 2, "name" to "Java本", "price" to 3200.0, "inStock" to false)
    )

    val products = jsonData.map { Product(it) }
    products.forEach { println(it) }
    println("在庫あり: \${products.filter { it.inStock }.map { it.name }}")
}`}
          expectedOutput={`Product(id=1, name=Kotlin本, price=2800.0, inStock=true)
Product(id=2, name=Java本, price=3200.0, inStock=false)
在庫あり: [Kotlin本]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegation" lessonId="map-delegation" />
      </div>
      <LessonNav lessons={lessons} currentId="map-delegation" basePath="/learn/delegation" />
    </div>
  );
}
