import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function ElvisOperatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">Null安全 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エルビス演算子</h1>
        <p className="text-gray-400">?:演算子を使ったデフォルト値の設定</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エルビス演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          エルビス演算子<code className="text-cyan-300">?:</code>は、
          左辺の値がnullでない場合はその値を、nullの場合は右辺の値を返します。
          Javaの三項演算子<code className="text-cyan-300">x != null ? x : default</code>を
          簡潔に書ける構文です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>左辺がnullでない → 左辺の値を返す</li>
          <li>左辺がnull → 右辺の値を返す</li>
          <li>右辺にはthrowやreturnも使える</li>
          <li>チェーンして使うことも可能</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト値の設定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">?:</code>を使ってnullのときのデフォルト値を指定します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name: String? = null
    val displayName = name ?: "ゲスト"
    println(displayName)

    val input: String? = "  "
    val value = input?.trim()?.takeIf { it.isNotEmpty() } ?: "デフォルト"
    println(value)

    fun getLength(s: String?) = s?.length ?: 0
    println(getLength("Hello"))
    println(getLength(null))
}`}
          expectedOutput={`ゲスト
デフォルト
5
0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">throwとreturnとの組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          右辺に<code className="text-cyan-300">throw</code>や
          <code className="text-cyan-300">return</code>を使って
          nullの場合に即座に処理を中断できます。
        </p>
        <KotlinEditor
          defaultCode={`fun processName(name: String?): String {
    val validName = name ?: return "名前なし"
    return validName.uppercase()
}

fun main() {
    println(processName("kotlin"))
    println(processName(null))

    val map = mapOf("key" to "value")
    val result = map["key"] ?: "not found"
    val missing = map["other"] ?: "not found"
    println(result)
    println(missing)
}`}
          expectedOutput={`KOTLIN
名前なし
value
not found`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="null-safety" lessonId="elvis-operator" />
      </div>
      <LessonNav lessons={lessons} currentId="elvis-operator" basePath="/learn/null-safety" />
    </div>
  );
}
