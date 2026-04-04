import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Kotlin基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数</h1>
        <p className="text-gray-400">varとvalを使った変数宣言と、変数への値の代入方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">varとvalの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinには2種類の変数宣言キーワードがあります。varは変更可能（ミュータブル）な変数、
          valは変更不可（イミュータブル）な読み取り専用変数です。
          基本的にはvalを使い、変更が必要な場合のみvarを使うのがKotlinのベストプラクティスです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>val: 一度代入したら変更不可（Javaのfinalに相当）</li>
          <li>var: 何度でも再代入可能</li>
          <li>変数名はキャメルケース（camelCase）が慣例</li>
          <li>型は変数名の後にコロンで指定する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">val（読み取り専用変数）</h2>
        <p className="text-gray-400 mb-4">valで宣言した変数は一度値を代入したら変更できません。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val name = "Alice"
    val age = 25
    println("名前: \${name}")
    println("年齢: \${age}")
    // name = "Bob"  // エラー！valは再代入不可
}`}
          expectedOutput={`名前: Alice
年齢: 25`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">var（変更可能な変数）</h2>
        <p className="text-gray-400 mb-4">varで宣言した変数は後から値を変更できます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    var score = 0
    println("初期スコア: \${score}")
    score = 100
    println("スコア更新後: \${score}")
    score += 50
    println("加算後: \${score}")
}`}
          expectedOutput={`初期スコア: 0
スコア更新後: 100
加算後: 150`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型を明示した変数宣言</h2>
        <p className="text-gray-400 mb-4">型推論に頼らず、明示的に型を指定することもできます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val firstName: String = "太郎"
    val lastName: String = "山田"
    var height: Double = 170.5
    var count: Int = 0

    println("\${lastName} \${firstName}")
    println("身長: \${height}cm")
    count++
    println("カウント: \${count}")
}`}
          expectedOutput={`山田 太郎
身長: 170.5cm
カウント: 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
