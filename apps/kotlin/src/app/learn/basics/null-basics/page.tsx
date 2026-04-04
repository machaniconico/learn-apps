import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NullBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン12</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">null基礎</h1>
        <p className="text-gray-400">Kotlinにおけるnullの概念とnull許容型・非null型の基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinのnull安全</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinはnull安全な言語です。通常の型（String、Intなど）にはnullを代入できません。
          nullを代入したい場合は型名の後に?を付けてNull許容型（String?など）にする必要があります。
          これによりNullPointerExceptionを防止できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>String: nullを代入できない（非null型）</li>
          <li>String?: nullを代入できる（null許容型）</li>
          <li>?. セーフコール演算子でnullチェック</li>
          <li>?: エルビス演算子でデフォルト値を設定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">null許容型と非null型</h2>
        <p className="text-gray-400 mb-4">?を付けるとnullを代入できます。セーフコールでnullを安全に扱えます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val nonNull: String = "Hello"
    val nullable: String? = null
    val name: String? = "Kotlin"

    println("非null: \${nonNull}")
    println("null値: \${nullable}")

    // セーフコール演算子 ?.
    println("null長さ: \${nullable?.length}")
    println("名前長さ: \${name?.length}")
}`}
          expectedOutput={`非null: Hello
null値: null
null長さ: null
名前長さ: 6`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エルビス演算子でデフォルト値</h2>
        <p className="text-gray-400 mb-4">?:演算子を使うと、nullの場合にデフォルト値を返せます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name: String? = null
    val greeting: String? = "こんにちは"

    // エルビス演算子 ?:
    val displayName = name ?: "ゲスト"
    val message = greeting ?: "メッセージなし"

    println("名前: \${displayName}")
    println("メッセージ: \${message}")

    val length = name?.length ?: 0
    println("名前の長さ: \${length}")
}`}
          expectedOutput={`名前: ゲスト
メッセージ: こんにちは
名前の長さ: 0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="null-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="null-basics" basePath="/learn/basics" />
    </div>
  );
}
