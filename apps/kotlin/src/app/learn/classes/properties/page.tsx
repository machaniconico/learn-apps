import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function PropertiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロパティ</h1>
        <p className="text-gray-400">valとvarによるプロパティの定義と管理を学びます。</p>
      </div>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">計算プロパティ</h2>
        <p className="text-gray-400 mb-4">
          ゲッターを定義することで毎回計算されるプロパティを作れます。
        </p>
        <KotlinEditor
          defaultCode={`class Temperature(val celsius: Double) {
    val fahrenheit: Double
        get() = celsius * 9.0 / 5.0 + 32
    val kelvin: Double
        get() = celsius + 273.15
}

fun main() {
    val temp = Temperature(100.0)
    println("摂氏: ${"$"}{temp.celsius}°C")
    println("華氏: ${"$"}{temp.fahrenheit}°F")
    println("ケルビン: ${"$"}{temp.kelvin}K")
}`}
          expectedOutput={`摂氏: 100.0°C
華氏: 212.0°F
ケルビン: 373.15K`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">遅延初期化プロパティ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">lateinit var</code>は後から初期化、<code className="text-red-300">lazy</code>は最初のアクセス時に初期化されます。
        </p>
        <KotlinEditor
          defaultCode={`class DatabaseManager {
    lateinit var connectionString: String
    fun connect(url: String) { connectionString = url; println("接続: ${"$"}connectionString") }
    fun isConnected() = ::connectionString.isInitialized
}

class ExpensiveResource {
    val data: List<Int> by lazy {
        println("データを読み込み中...")
        (1..5).toList()
    }
}

fun main() {
    val db = DatabaseManager()
    println("接続済み: ${"$"}{db.isConnected()}")
    db.connect("jdbc:postgresql://localhost/mydb")
    println("接続済み: ${"$"}{db.isConnected()}")
    val res = ExpensiveResource()
    println(res.data)
    println(res.data)
}`}
          expectedOutput={`接続済み: false
接続: jdbc:postgresql://localhost/mydb
接続済み: true
データを読み込み中...
[1, 2, 3, 4, 5]
[1, 2, 3, 4, 5]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バッキングフィールド</h2>
        <p className="text-gray-400 mb-4">カスタムゲッター・セッター内では<code className="text-red-300">field</code>でバッキングフィールドにアクセスします。</p>
        <KotlinEditor
          defaultCode={`class Counter {
    var count: Int = 0
        set(value) { field = if (value < 0) 0 else value }
    fun increment() { count++ }
}

fun main() {
    val counter = Counter()
    counter.increment()
    counter.increment()
    println("カウント: ${"$"}{counter.count}")
    counter.count = -5
    println("補正後: ${"$"}{counter.count}")
}`}
          expectedOutput={`カウント: 2
補正後: 0`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="properties" />
      </div>
      <LessonNav lessons={lessons} currentId="properties" basePath="/learn/classes" />
    </div>
  );
}
