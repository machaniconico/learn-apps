import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パラメータ</h1>
        <p className="text-gray-400">関数に引数を渡す方法と複数パラメータの扱い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">パラメータの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数のパラメータは名前と型をコロンで区切って指定します。
          複数のパラメータはカンマで区切ります。
          Kotlinのパラメータはデフォルトでvalなので、関数内で変更できません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>パラメータの形式: 名前: 型</li>
          <li>複数パラメータはカンマ区切り</li>
          <li>パラメータはval（変更不可）</li>
          <li>呼び出し時は順番通りに引数を渡す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パラメータを持つ関数</h2>
        <p className="text-gray-400 mb-4">1つまたは複数のパラメータを持つ関数を定義します。</p>
        <KotlinEditor
          defaultCode={`fun greet(name: String) {
    println("こんにちは、\${name}！")
}

fun introduce(name: String, age: Int, language: String) {
    println("私は\${name}です。\${age}歳で\${language}を学んでいます。")
}

fun main() {
    greet("Alice")
    greet("Bob")
    introduce("Carol", 25, "Kotlin")
}`}
          expectedOutput={`こんにちは、Alice！
こんにちは、Bob！
私はCarolです。25歳でKotlinを学んでいます。`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数値パラメータの関数</h2>
        <p className="text-gray-400 mb-4">数値パラメータを受け取って計算を行う関数の例です。</p>
        <KotlinEditor
          defaultCode={`fun printSum(a: Int, b: Int) {
    println("\${a} + \${b} = \${a + b}")
}

fun printRect(width: Int, height: Int) {
    val area = width * height
    val perimeter = 2 * (width + height)
    println("幅:\${width} 高さ:\${height} 面積:\${area} 周囲:\${perimeter}")
}

fun main() {
    printSum(3, 5)
    printSum(10, 20)
    printRect(4, 6)
    printRect(10, 3)
}`}
          expectedOutput={`3 + 5 = 8
10 + 20 = 30
幅:4 高さ:6 面積:24 周囲:20
幅:10 高さ:3 面積:30 周囲:26`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/functions" />
    </div>
  );
}
