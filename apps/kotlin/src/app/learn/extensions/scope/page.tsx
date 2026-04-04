import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("extensions");

export default function ExtensionScopePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">拡張関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">拡張関数のスコープ</h1>
        <p className="text-gray-400">インポート、スコープ制限、優先順位のルール</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スコープのルール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          拡張関数は定義した場所のスコープで使用可能です。
          別のファイルで使うにはインポートが必要です。
          メンバー関数と同名の拡張関数があればメンバー関数が優先されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>同じファイル内なら自動的に使える</li>
          <li>別ファイルではimportが必要</li>
          <li>メンバー関数は拡張関数より優先される</li>
          <li>クラス内で定義するとそのクラスのスコープに限定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メンバー関数と拡張関数の優先順位</h2>
        <p className="text-gray-400 mb-4">
          同名のメンバー関数と拡張関数が存在する場合、メンバー関数が優先されます。
        </p>
        <KotlinEditor
          defaultCode={`class MyClass {
    fun greet() = "メンバー関数のgreet"
}

fun MyClass.greet() = "拡張関数のgreet"
fun MyClass.hello() = "拡張関数のhello"

fun main() {
    val obj = MyClass()
    println(obj.greet())   // メンバー関数が優先
    println(obj.hello())   // 拡張関数（メンバーがない）
}`}
          expectedOutput={`メンバー関数のgreet
拡張関数のhello`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラス内での拡張関数</h2>
        <p className="text-gray-400 mb-4">
          クラス内で拡張関数を定義するとそのクラスのスコープに限定されます。
        </p>
        <KotlinEditor
          defaultCode={`class StringProcessor {
    fun String.process(): String = this.trim().uppercase()

    fun run(input: String): String {
        return input.process()
    }
}

fun main() {
    val processor = StringProcessor()
    println(processor.run("  hello world  "))
    // "  hello world  ".process() はここでは使えない
    println(processor.run("  kotlin  "))
}`}
          expectedOutput={`HELLO WORLD
KOTLIN`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="extensions" lessonId="scope" />
      </div>
      <LessonNav lessons={lessons} currentId="scope" basePath="/learn/extensions" />
    </div>
  );
}
