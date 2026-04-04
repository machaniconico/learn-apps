import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function HelloWorldPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Hello, World!</h1>
        <p className="text-gray-400">Kotlinで最初のプログラムを作成し、画面に文字を出力する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinプログラムの構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinプログラムはmain関数から実行が始まります。funキーワードで関数を定義し、
          println()関数で文字列を画面に出力します。Kotlinはセミコロンが不要なシンプルな構文が特徴です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>fun main()がプログラムのエントリーポイント</li>
          <li>println()は引数を出力して改行する</li>
          <li>print()は改行なしで出力する</li>
          <li>文字列はダブルクォートで囲む</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なHello World</h2>
        <p className="text-gray-400 mb-4">最もシンプルなKotlinプログラムです。main関数の中でprintln()を呼び出します。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    println("Hello, World!")
}`}
          expectedOutput={`Hello, World!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数行の出力</h2>
        <p className="text-gray-400 mb-4">println()を複数回呼び出すと、それぞれ改行して出力されます。print()は改行しません。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    println("Hello, World!")
    println("Kotlinを学ぼう")
    print("改行なし ")
    print("続き")
    println()
    println("最後の行")
}`}
          expectedOutput={`Hello, World!
Kotlinを学ぼう
改行なし 続き
最後の行`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列テンプレート</h2>
        <p className="text-gray-400 mb-4">$記号を使うと文字列の中に変数の値を埋め込めます。式は${}で囲みます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name = "Kotlin"
    val version = 2
    println("Hello, \${name}!")
    println("\${name} バージョン \${version}")
    println("1 + 1 = \${1 + 1}")
}`}
          expectedOutput={`Hello, Kotlin!
Kotlin バージョン 2
1 + 1 = 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="hello-world" />
      </div>
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
