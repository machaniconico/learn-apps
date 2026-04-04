import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function ThrowPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">例外処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">throw式</h1>
        <p className="text-gray-400">throwを使った例外のスローと例外オブジェクトの生成方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">throwの特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinでthrowは式（expression）であり、Nothing型を返します。
          エルビス演算子と組み合わせると簡潔に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>throw ExceptionType("メッセージ")で例外をスローする</li>
          <li>throwはNothing型の式なので式の中で使える</li>
          <li>?: throwパターンでnull時に例外をスローできる</li>
          <li>requireとcheckはIllegalArgumentExceptionをスローする</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なthrow</h2>
        <p className="text-gray-400 mb-4">条件チェックと組み合わせてthrowを使います。</p>
        <KotlinEditor
          defaultCode={`fun setScore(score: Int): String {
    if (score < 0) throw IllegalArgumentException("スコアは0以上が必要: \${score}")
    if (score > 100) throw IllegalArgumentException("スコアは100以下が必要: \${score}")
    return "スコア設定: \${score}"
}

fun main() {
    println(setScore(85))
    try {
        println(setScore(-5))
    } catch (e: IllegalArgumentException) {
        println("エラー: \${e.message}")
    }
    try {
        println(setScore(110))
    } catch (e: IllegalArgumentException) {
        println("エラー: \${e.message}")
    }
}`}
          expectedOutput={`スコア設定: 85
エラー: スコアは0以上が必要: -5
エラー: スコアは100以下が必要: 110`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">throwを式として使う</h2>
        <p className="text-gray-400 mb-4">throwはNothing型の式なのでエルビス演算子と組み合わせられます。</p>
        <KotlinEditor
          defaultCode={`fun getUser(id: Int): String? = if (id > 0) "ユーザー\${id}" else null

fun requireUser(id: Int): String {
    return getUser(id) ?: throw IllegalStateException("ユーザーが見つからない: id=\${id}")
}

fun main() {
    println(requireUser(1))
    try {
        println(requireUser(-1))
    } catch (e: IllegalStateException) {
        println("エラー: \${e.message}")
    }
}`}
          expectedOutput={`ユーザー1
エラー: ユーザーが見つからない: id=-1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">requireとcheck関数</h2>
        <p className="text-gray-400 mb-4">requireはIllegalArgumentException、checkはIllegalStateExceptionをスローします。</p>
        <KotlinEditor
          defaultCode={`class Connection {
    var isOpen = false

    fun open() {
        check(!isOpen) { "接続は既に開いています" }
        isOpen = true
        println("接続オープン")
    }

    fun send(data: String) {
        check(isOpen) { "接続が開いていません" }
        require(data.isNotEmpty()) { "データが空です" }
        println("送信: \${data}")
    }
}

fun main() {
    val conn = Connection()
    conn.open()
    conn.send("Hello")
    try { conn.open() } catch (e: IllegalStateException) { println("エラー: \${e.message}") }
    try { conn.send("") } catch (e: IllegalArgumentException) { println("エラー: \${e.message}") }
}`}
          expectedOutput={`接続オープン
送信: Hello
エラー: 接続は既に開いています
エラー: データが空です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="exceptions" lessonId="throw" />
      </div>
      <LessonNav lessons={lessons} currentId="throw" basePath="/learn/exceptions" />
    </div>
  );
}
