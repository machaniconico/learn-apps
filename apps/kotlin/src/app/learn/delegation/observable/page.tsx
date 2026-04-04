import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegation");

export default function ObservablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">委譲 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">observableデリゲート</h1>
        <p className="text-gray-400">Delegates.observableとvetoableを使ってプロパティ変更を監視する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Delegates.observableとvetoable</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Delegates.observableはプロパティが変更されるたびにコールバックを呼び出します。
          Delegates.vetoableは変更を許可するかどうかを制御できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Delegates.observable(初期値) &#123; _, 旧値, 新値 -&#62; &#125;</li>
          <li>コールバックは値が変わるたびに呼ばれる</li>
          <li>Delegates.vetoableはtrueを返すと変更を許可、falseで拒否</li>
          <li>import kotlin.properties.Delegatesが必要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">observableの基本</h2>
        <p className="text-gray-400 mb-4">Delegates.observableでプロパティの変更を監視します。</p>
        <KotlinEditor
          defaultCode={`import kotlin.properties.Delegates

class User {
    var name: String by Delegates.observable("未設定") { _, old, new ->
        println("name変更: '\${old}' -> '\${new}'")
    }
    var age: Int by Delegates.observable(0) { _, old, new ->
        println("age変更: \${old} -> \${new}")
    }
}

fun main() {
    val user = User()
    println("初期値 - name: \${user.name}, age: \${user.age}")
    user.name = "Alice"
    user.age = 25
    user.name = "Bob"
}`}
          expectedOutput={`初期値 - name: 未設定, age: 0
name変更: '未設定' -> 'Alice'
age変更: 0 -> 25
name変更: 'Alice' -> 'Bob'`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">vetoableで変更を制御</h2>
        <p className="text-gray-400 mb-4">Delegates.vetoableで条件を満たさない変更を拒否できます。</p>
        <KotlinEditor
          defaultCode={`import kotlin.properties.Delegates

class AgeHolder {
    var age: Int by Delegates.vetoable(0) { _, old, new ->
        val allowed = new in 0..150
        if (!allowed) println("年齢 \${new} は無効（変更拒否）")
        allowed
    }
}

fun main() {
    val holder = AgeHolder()
    holder.age = 25
    println("age: \${holder.age}")

    holder.age = 200  // 拒否される
    println("age: \${holder.age}")

    holder.age = 30
    println("age: \${holder.age}")
}`}
          expectedOutput={`age: 25
年齢 200 は無効（変更拒否）
age: 25
age: 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変更履歴の記録</h2>
        <p className="text-gray-400 mb-4">observableを使ってプロパティの変更履歴を記録します。</p>
        <KotlinEditor
          defaultCode={`import kotlin.properties.Delegates

class TrackedValue<T>(initial: T) {
    val history = mutableListOf<T>()
    var value: T by Delegates.observable(initial) { _, _, new ->
        history.add(new)
    }
    init { history.add(initial) }
}

fun main() {
    val price = TrackedValue(100)
    price.value = 120
    price.value = 90
    price.value = 110

    println("現在値: \${price.value}")
    println("履歴: \${price.history}")
    println("最高値: \${price.history.max()}")
    println("最安値: \${price.history.min()}")
}`}
          expectedOutput={`現在値: 110
履歴: [100, 120, 90, 110]
最高値: 120
最安値: 90`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegation" lessonId="observable" />
      </div>
      <LessonNav lessons={lessons} currentId="observable" basePath="/learn/delegation" />
    </div>
  );
}
