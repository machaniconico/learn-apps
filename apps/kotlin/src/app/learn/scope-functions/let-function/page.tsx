import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("scope-functions");

export default function LetFunctionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">スコープ関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">let関数</h1>
        <p className="text-gray-400">オブジェクトをラムダに渡して変換・処理するlet</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">let関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">let</code>はオブジェクトをラムダの引数（it）として渡し、
          ラムダの結果を返します。nullableオブジェクトの安全な処理や、
          スコープを限定した変数変換に使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ラムダ内でitとしてオブジェクトにアクセス</li>
          <li>ラムダの最後の式が戻り値になる</li>
          <li>?.letでnullチェックを兼ねる</li>
          <li>スコープを限定して変数の使用範囲を制限</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">letの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">let</code>でオブジェクトを変換し、
          結果を受け取る使い方を学びます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val result = "  Hello, Kotlin!  ".let {
        it.trim()
    }.let {
        it.uppercase()
    }
    println(result)

    val number = 42
    val description = number.let {
        when {
            it < 0 -> "負の数"
            it == 0 -> "ゼロ"
            else -> "正の数: ${"$"}{it}"
        }
    }
    println(description)
}`}
          expectedOutput={`HELLO, KOTLIN!
正の数: 42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">?.letでnull安全処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">?.let</code>パターンはnullチェックと処理を
          一行で書ける定番のイディオムです。
        </p>
        <KotlinEditor
          defaultCode={`fun formatName(name: String?): String {
    return name?.let {
        it.trim().replaceFirstChar { c -> c.uppercase() }
    } ?: "名前未設定"
}

fun main() {
    println(formatName("kotlin"))
    println(formatName("  alice  "))
    println(formatName(null))
    println(formatName(""))

    val emails = listOf("a@b.com", null, "c@d.com", null)
    val validEmails = emails.mapNotNull { it?.let { email ->
        if (email.contains("@")) email else null
    }}
    println(validEmails)
}`}
          expectedOutput={`Kotlin
Alice
名前未設定
名前未設定
[a@b.com, c@d.com]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="scope-functions" lessonId="let-function" />
      </div>
      <LessonNav lessons={lessons} currentId="let-function" basePath="/learn/scope-functions" />
    </div>
  );
}
