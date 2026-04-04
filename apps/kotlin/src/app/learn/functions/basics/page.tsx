import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数の基本</h1>
        <p className="text-gray-400">funキーワードを使った関数の定義と呼び出しの基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数は特定の処理をまとめて名前を付けたものです。
          同じ処理を何度も書く代わりに関数を定義して呼び出すことで、
          コードの再利用性と可読性が向上します。
          Kotlinではfunキーワードで関数を定義します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>fun 関数名(パラメータ): 戻り値型 {} の構文</li>
          <li>戻り値がない場合はUnit（省略可能）</li>
          <li>関数は定義する前でも呼び出せる</li>
          <li>トップレベルに関数を定義できる（クラス不要）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初の関数</h2>
        <p className="text-gray-400 mb-4">戻り値なし（Unit）の関数を定義して呼び出します。</p>
        <KotlinEditor
          defaultCode={`fun sayHello() {
    println("Hello!")
}

fun printDivider() {
    println("----------")
}

fun main() {
    sayHello()
    printDivider()
    sayHello()
    printDivider()
}`}
          expectedOutput={`Hello!
----------
Hello!
----------`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数の関数を組み合わせる</h2>
        <p className="text-gray-400 mb-4">複数の関数を定義して組み合わせることで処理を構造化できます。</p>
        <KotlinEditor
          defaultCode={`fun printHeader() {
    println("=== Kotlinプログラム ===")
}

fun printBody() {
    println("関数を使ってコードを整理できます")
    println("各関数は一つの責任を持ちます")
}

fun printFooter() {
    println("======================")
}

fun main() {
    printHeader()
    printBody()
    printFooter()
}`}
          expectedOutput={`=== Kotlinプログラム ===
関数を使ってコードを整理できます
各関数は一つの責任を持ちます
======================`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/functions" />
    </div>
  );
}
