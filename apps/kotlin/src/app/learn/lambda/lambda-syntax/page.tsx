import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function LambdaSyntaxPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ラムダ式 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラムダ構文の詳細</h1>
        <p className="text-gray-400">itによる暗黙パラメータと末尾ラムダ構文</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ構文のバリエーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのラムダには様々な省略記法があります。
          パラメータが1つなら<code className="text-pink-300">it</code>という暗黙の名前を使えます。
          関数の最後の引数がラムダなら括弧の外に書ける末尾ラムダ構文もあります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>パラメータ1つ → itで参照可能</li>
          <li>最後の引数がラムダ → 括弧の外に書ける</li>
          <li>唯一の引数がラムダ → 括弧を省略できる</li>
          <li>使わないパラメータは_で無視できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">itとパラメータ省略</h2>
        <p className="text-gray-400 mb-4">
          パラメータが1つの場合、明示的な名前を省略して
          <code className="text-pink-300">it</code>を使えます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)

    // 明示的なパラメータ名
    val doubled1 = numbers.map { n -> n * 2 }
    println(doubled1)

    // itを使った省略形
    val doubled2 = numbers.map { it * 2 }
    println(doubled2)

    // 使わないパラメータは_で無視
    val pairs = listOf(Pair(1, "a"), Pair(2, "b"))
    val values = pairs.map { (_, v) -> v }
    println(values)
}`}
          expectedOutput={`[2, 4, 6, 8, 10]
[2, 4, 6, 8, 10]
[a, b]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">末尾ラムダ構文</h2>
        <p className="text-gray-400 mb-4">
          関数の最後の引数がラムダのとき、括弧の外に書ける末尾ラムダ構文が使えます。
        </p>
        <KotlinEditor
          defaultCode={`fun repeat(n: Int, action: (Int) -> Unit) {
    for (i in 1..n) action(i)
}

fun main() {
    // 通常の呼び出し
    repeat(3, { i -> println("${"$"}{i}回目") })

    println("---")

    // 末尾ラムダ構文
    repeat(3) { i ->
        println("${"$"}{i}回目（末尾ラムダ）")
    }
}`}
          expectedOutput={`1回目
2回目
3回目
---
1回目（末尾ラムダ）
2回目（末尾ラムダ）
3回目（末尾ラムダ）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="lambda-syntax" />
      </div>
      <LessonNav lessons={lessons} currentId="lambda-syntax" basePath="/learn/lambda" />
    </div>
  );
}
