import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function ObserverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">デザインパターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オブザーバーパターン</h1>
        <p className="text-gray-400">Delegates.observableやFlowを活用したイベント通知の実装方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オブザーバーパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オブザーバーパターンはオブジェクトの状態変化を他のオブジェクト（オブザーバー）に通知するパターンです。
          イベントドリブンなシステムやMVVMアーキテクチャで広く使われます。
          KotlinではDelegates.observableや関数型の仕組みを使って簡潔に実装できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Delegates.observable - プロパティの変更を監視する標準委譲</li>
          <li>Delegates.vetoable - 変更を拒否できる委譲</li>
          <li>リスナー関数型でシンプルなオブザーバーを実現</li>
          <li>実際のアプリではKotlin FlowやLiveDataが使われる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Delegates.observableによる監視</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">Delegates.observable</code>を使うとプロパティの変更を自動的に検知できます。
        </p>
        <KotlinEditor
          defaultCode={`import kotlin.properties.Delegates

class StockPrice(val symbol: String) {
    val observers = mutableListOf<(String, Double, Double) -> Unit>()

    var price: Double by Delegates.observable(0.0) { _, old, new ->
        observers.forEach { it(symbol, old, new) }
    }

    fun addObserver(observer: (String, Double, Double) -> Unit) {
        observers.add(observer)
    }
}

fun main() {
    val apple = StockPrice("AAPL")

    apple.addObserver { symbol, old, new ->
        val change = new - old
        val sign = if (change >= 0) "+" else ""
        println("[\${symbol}] \${old} -> \${new} (\${sign}\${String.format("%.2f", change)})")
    }

    apple.addObserver { symbol, _, new ->
        if (new < 150.0) println("警告: \${symbol}が150ドルを下回りました")
    }

    apple.price = 175.50
    apple.price = 148.30
    apple.price = 182.00
}`}
          expectedOutput={`[AAPL] 0.0 -> 175.5 (+175.50)
[AAPL] 175.5 -> 148.3 (-27.20)
警告: AAPLが150ドルを下回りました
[AAPL] 148.3 -> 182.0 (+33.70)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数型を使ったイベントシステム</h2>
        <p className="text-gray-400 mb-4">
          高階関数とラムダを使って柔軟なイベントリスナーシステムを構築できます。
        </p>
        <KotlinEditor
          defaultCode={`class EventBus {
    private val listeners = mutableMapOf<String, MutableList<(Any) -> Unit>>()

    fun <T : Any> on(event: String, listener: (T) -> Unit) {
        @Suppress("UNCHECKED_CAST")
        listeners.getOrPut(event) { mutableListOf() }.add(listener as (Any) -> Unit)
    }

    fun emit(event: String, data: Any) {
        listeners[event]?.forEach { it(data) }
    }
}

data class UserEvent(val userId: Int, val action: String)

fun main() {
    val bus = EventBus()

    bus.on<UserEvent>("user.login") { event ->
        println("ログイン通知: ユーザー\${event.userId}がログインしました")
    }

    bus.on<UserEvent>("user.login") { event ->
        println("監査ログ: action=\${event.action}, userId=\${event.userId}")
    }

    bus.on<UserEvent>("user.logout") { event ->
        println("ログアウト: ユーザー\${event.userId}")
    }

    bus.emit("user.login", UserEvent(42, "login"))
    bus.emit("user.logout", UserEvent(42, "logout"))
}`}
          expectedOutput={`ログイン通知: ユーザー42がログインしました
監査ログ: action=login, userId=42
ログアウト: ユーザー42`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="observer" />
      </div>
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/design" />
    </div>
  );
}
