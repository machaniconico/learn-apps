import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function MultilineStringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">文字列操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複数行文字列</h1>
        <p className="text-gray-400">トリプルクォートを使った複数行文字列とtrimIndent</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数行文字列（Raw String）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          トリプルクォート<code className="text-green-300">{"\"\"\"...\"\"\""}</code>を使うと
          改行を含む複数行の文字列をエスケープなしで書けます。
          <code className="text-green-300">trimIndent()</code>でインデントを整形できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>改行やタブをそのまま含められる</li>
          <li>バックスラッシュのエスケープが不要</li>
          <li>trimIndent() - 共通インデントを削除</li>
          <li>trimMargin() - |などのマーカーまでのインデントを削除</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数行文字列の基本</h2>
        <p className="text-gray-400 mb-4">
          トリプルクォートで複数行の文字列を作成し、
          <code className="text-green-300">trimIndent()</code>でインデントを除去します。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val poem = """
        春はあけぼの
        夏は夜
        秋は夕暮れ
        冬はつとめて
    """.trimIndent()
    println(poem)
}`}
          expectedOutput={`春はあけぼの
夏は夜
秋は夕暮れ
冬はつとめて`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートとの組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          複数行文字列にも文字列テンプレートを使って変数を埋め込めます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name = "Kotlin"
    val version = 2.0
    val info = """
        言語: ${"$"}{name}
        バージョン: ${"$"}{version}
        特徴:
          - Null安全
          - 拡張関数
          - コルーチン
    """.trimIndent()
    println(info)
}`}
          expectedOutput={`言語: Kotlin
バージョン: 2.0
特徴:
  - Null安全
  - 拡張関数
  - コルーチン`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="multiline-strings" />
      </div>
      <LessonNav lessons={lessons} currentId="multiline-strings" basePath="/learn/strings" />
    </div>
  );
}
