import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クラス基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンパニオンオブジェクト</h1>
        <p className="text-gray-400">companion objectを使ったクラスレベルのメンバーの定義方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">companion object</code>はクラスに1つだけ存在するオブジェクトで、
          クラス名を通じてアクセスできます。Javaのstaticメンバーに相当します。
          ファクトリメソッドや定数の定義に多く使われます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          companion objectには名前を付けることもできます。
          また、インターフェースを実装することも可能です。
          <code className="text-violet-300">const val</code>でコンパイル時定数を定義できます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: ファクトリメソッド</h2>
        <KotlinEditor
          defaultCode={`class User private constructor(val name: String, val role: String) {
    companion object {
        fun createAdmin(name: String) = User(name, "admin")
        fun createGuest() = User("ゲスト", "guest")
        const val MAX_NAME_LENGTH = 50
    }

    override fun toString() = "User($\{name}, $\{role})"
}

fun main() {
    val admin = User.createAdmin("山田")
    val guest = User.createGuest()
    println(admin)
    println(guest)
    println("名前最大長: $\{User.MAX_NAME_LENGTH}")
}`}
          expectedOutput={`User(山田, admin)
User(ゲスト, guest)
名前最大長: 50`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: カウンター付きcompanion object</h2>
        <KotlinEditor
          defaultCode={`class Connection(val id: Int, val host: String) {
    companion object {
        private var count = 0

        fun create(host: String): Connection {
            count++
            return Connection(count, host)
        }

        fun totalCount() = count
    }
}

fun main() {
    val c1 = Connection.create("server1")
    val c2 = Connection.create("server2")
    val c3 = Connection.create("server3")
    println("接続1: ID=$\{c1.id}, $\{c1.host}")
    println("接続2: ID=$\{c2.id}, $\{c2.host}")
    println("総接続数: $\{Connection.totalCount()}")
}`}
          expectedOutput={`接続1: ID=1, server1
接続2: ID=2, server2
総接続数: 3`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="companion-objects" />
      </div>
      <LessonNav lessons={lessons} currentId="companion-objects" basePath="/learn/classes" />
    </div>
  );
}
