import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function DoWhilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">do-whileループ</h1>
        <p className="text-gray-400">少なくとも一度は実行されるdo-whileループの構文を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">do-whileの特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          do-whileループはブロックを先に実行してから条件をチェックします。
          そのため、条件に関係なく必ず最低1回はブロックが実行されます。
          whileループとの最大の違いはこの点です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>do {} while (条件) の構文</li>
          <li>ブロックを先に実行してから条件チェック</li>
          <li>条件がfalseでも必ず1回実行される</li>
          <li>入力検証などの用途に適している</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なdo-whileループ</h2>
        <p className="text-gray-400 mb-4">do-whileループの基本的な使い方です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    var count = 1

    do {
        println("実行: \${count}")
        count++
    } while (count <= 5)

    println("終了")
}`}
          expectedOutput={`実行: 1
実行: 2
実行: 3
実行: 4
実行: 5
終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">whileとdo-whileの違い</h2>
        <p className="text-gray-400 mb-4">条件が最初からfalseの場合の動作の違いを確認します。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    var x = 10

    // whileループ：条件がfalseなので実行されない
    println("whileループ:")
    while (x < 5) {
        println("while実行: \${x}")
    }
    println("whileループ終了（0回実行）")

    // do-whileループ：最低1回は実行される
    println("do-whileループ:")
    do {
        println("do-while実行: \${x}")
    } while (x < 5)
    println("do-whileループ終了（1回実行）")
}`}
          expectedOutput={`whileループ:
whileループ終了（0回実行）
do-whileループ:
do-while実行: 10
do-whileループ終了（1回実行）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="do-while" />
      </div>
      <LessonNav lessons={lessons} currentId="do-while" basePath="/learn/control" />
    </div>
  );
}
