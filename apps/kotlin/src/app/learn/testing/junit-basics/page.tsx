import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function JunitBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">テスト レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">JUnit基礎</h1>
        <p className="text-gray-400">@Testアノテーションを使ったJUnit5によるKotlinの単体テストの書き方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">JUnit5の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JUnit5（JUnit Jupiter）はKotlinで広く使われるテストフレームワークです。
          @Testアノテーションでテストメソッドを定義し、assertXxxで検証します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>@Test: テストメソッドを示すアノテーション</li>
          <li>@BeforeEach: 各テスト前に実行される初期化処理</li>
          <li>@AfterEach: 各テスト後に実行されるクリーンアップ処理</li>
          <li>@DisplayName: テストに分かりやすい名前を付ける</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テスト関数の作成</h2>
        <p className="text-gray-400 mb-4">@Testアノテーションを付けた関数がテストとして実行されます。</p>
        <KotlinEditor
          defaultCode={`// JUnit5のシミュレーション
fun assertEquals(expected: Any?, actual: Any?, msg: String = "") {
    if (expected != actual) throw AssertionError("\${msg}期待値:\${expected}, 実際:\${actual}")
    println("PASS: \${msg.ifEmpty { "\${expected} == \${actual}" }}")
}

fun add(a: Int, b: Int) = a + b
fun multiply(a: Int, b: Int) = a * b

fun main() {
    // @Test メソッドをシミュレート
    assertEquals(5, add(2, 3), "add(2,3)")
    assertEquals(0, add(-1, 1), "add(-1,1)")
    assertEquals(12, multiply(3, 4), "multiply(3,4)")
    assertEquals(0, multiply(0, 5), "multiply(0,5)")
    println("全テスト通過!")
}`}
          expectedOutput={`PASS: add(2,3)
PASS: add(-1,1)
PASS: multiply(3,4)
PASS: multiply(0,5)
全テスト通過!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストのライフサイクル</h2>
        <p className="text-gray-400 mb-4">@BeforeEachと@AfterEachで各テストの前後処理を定義します。</p>
        <KotlinEditor
          defaultCode={`class ShoppingCart {
    private val items = mutableListOf<String>()

    fun add(item: String) { items.add(item) }
    fun remove(item: String) { items.remove(item) }
    fun size() = items.size
    fun contains(item: String) = items.contains(item)
    fun clear() { items.clear() }
}

fun main() {
    val cart = ShoppingCart()

    // @BeforeEach相当
    fun setup() { cart.clear() }

    setup()
    cart.add("りんご")
    println("サイズ: \${cart.size() == 1}")
    println("りんご含む: \${cart.contains("りんご")}")

    setup()
    cart.add("バナナ")
    cart.add("みかん")
    println("セットアップ後サイズ: \${cart.size() == 2}")
}`}
          expectedOutput={`サイズ: true
りんご含む: true
セットアップ後サイズ: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="junit-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="junit-basics" basePath="/learn/testing" />
    </div>
  );
}
