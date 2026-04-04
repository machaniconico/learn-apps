import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function MockingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">テスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モッキング</h1>
        <p className="text-gray-400">MockKライブラリを使った依存オブジェクトのモック化とスタブの作り方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">モックとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          モックはテスト用の偽のオブジェクトです。外部依存（データベース、API等）を
          モックに置き換えることで、テストを高速・安定・独立させられます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>mockk&#123;&#125;でモックオブジェクトを作成する</li>
          <li>every&#123;&#125;でメソッドの戻り値を設定（スタブ）する</li>
          <li>verify&#123;&#125;でメソッドが呼ばれたか検証する</li>
          <li>インターフェースをモックに置き換えることで依存を切り離す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースによる依存性注入</h2>
        <p className="text-gray-400 mb-4">インターフェースを使うとテスト時にモックに差し替えられます。</p>
        <KotlinEditor
          defaultCode={`interface UserRepository {
    fun findById(id: Int): String?
    fun save(name: String): Int
}

class FakeUserRepository : UserRepository {
    private val db = mutableMapOf<Int, String>()
    private var nextId = 1

    override fun findById(id: Int): String? = db[id]
    override fun save(name: String): Int {
        db[nextId] = name
        return nextId++
    }
}

class UserService(private val repo: UserRepository) {
    fun createUser(name: String): String {
        val id = repo.save(name)
        return "ユーザー作成: ID=\${id}, name=\${name}"
    }
    fun getUser(id: Int): String = repo.findById(id) ?: "見つかりません"
}

fun main() {
    val fakeRepo = FakeUserRepository()
    val service = UserService(fakeRepo)

    println(service.createUser("Alice"))
    println(service.getUser(1))
    println(service.getUser(99))
}`}
          expectedOutput={`ユーザー作成: ID=1, name=Alice
Alice
見つかりません`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テストダブルのパターン</h2>
        <p className="text-gray-400 mb-4">Stub（戻り値固定）、Spy（呼び出し記録）などのパターンを実装します。</p>
        <KotlinEditor
          defaultCode={`interface EmailService {
    fun send(to: String, subject: String): Boolean
}

// Stub: 常に成功を返す
class StubEmailService : EmailService {
    override fun send(to: String, subject: String) = true
}

// Spy: 呼び出しを記録するStub
class SpyEmailService : EmailService {
    val sentEmails = mutableListOf<Pair<String, String>>()
    override fun send(to: String, subject: String): Boolean {
        sentEmails.add(Pair(to, subject))
        return true
    }
}

fun main() {
    val spy = SpyEmailService()
    spy.send("alice@example.com", "件名A")
    spy.send("bob@example.com", "件名B")

    println("送信数: \${spy.sentEmails.size}")
    println("最初の宛先: \${spy.sentEmails[0].first}")
}`}
          expectedOutput={`送信数: 2
最初の宛先: alice@example.com`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="mocking" />
      </div>
      <LessonNav lessons={lessons} currentId="mocking" basePath="/learn/testing" />
    </div>
  );
}
