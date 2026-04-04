import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function NamedArgsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">名前付き引数</h1>
        <p className="text-gray-400">引数名を指定して関数を呼び出す名前付き引数の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">名前付き引数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          名前付き引数を使うと、パラメータ名を指定して引数を渡せます。
          これにより引数の順番を変えることができ、コードの可読性が向上します。
          特にパラメータが多い関数や、デフォルト引数を持つ関数で有効です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>パラメータ名 = 値 の形式で指定</li>
          <li>名前付き引数は順番を変えられる</li>
          <li>名前なし引数と混在可能（名前なしは先に）</li>
          <li>デフォルト引数のある特定パラメータだけ省略できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">名前付き引数の基本</h2>
        <p className="text-gray-400 mb-4">引数名を指定することで順番を変えたり可読性を上げられます。</p>
        <KotlinEditor
          defaultCode={`fun createMessage(
    to: String,
    from: String,
    subject: String,
    body: String
) {
    println("宛先: \${to}")
    println("送信者: \${from}")
    println("件名: \${subject}")
    println("本文: \${body}")
    println("---")
}

fun main() {
    // 名前付き引数で順番を変える
    createMessage(
        body = "お世話になっております",
        from = "Alice",
        to = "Bob",
        subject = "ご連絡"
    )
}`}
          expectedOutput={`宛先: Bob
送信者: Alice
件名: ご連絡
本文: お世話になっております
---`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数と名前付き引数の組み合わせ</h2>
        <p className="text-gray-400 mb-4">名前付き引数で特定のデフォルト引数だけを上書きできます。</p>
        <KotlinEditor
          defaultCode={`fun buildUrl(
    host: String = "localhost",
    port: Int = 8080,
    path: String = "/",
    secure: Boolean = false
): String {
    val scheme = if (secure) "https" else "http"
    return "\${scheme}://\${host}:\${port}\${path}"
}

fun main() {
    println(buildUrl())
    println(buildUrl(host = "example.com", secure = true))
    println(buildUrl(port = 443, path = "/api", secure = true))
}`}
          expectedOutput={`http://localhost:8080/
https://example.com:8080/
http://localhost:443/api`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="named-args" />
      </div>
      <LessonNav lessons={lessons} currentId="named-args" basePath="/learn/functions" />
    </div>
  );
}
