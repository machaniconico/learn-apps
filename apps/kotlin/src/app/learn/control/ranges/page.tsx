import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function RangesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">範囲（Ranges）</h1>
        <p className="text-gray-400">..演算子やuntil、downToを使った範囲オブジェクトの作り方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Kotlinの範囲</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinの範囲（Range）は連続した値のシーケンスです。
          ..演算子で両端を含む範囲、untilで上端を含まない範囲を作れます。
          downToで逆順、stepで刻み幅を指定できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>1..10 : 1から10を含む（閉区間）</li>
          <li>1 until 10 : 1から9まで（半開区間）</li>
          <li>10 downTo 1 : 10から1まで逆順</li>
          <li>1..10 step 2 : 1, 3, 5, 7, 9</li>
          <li>in演算子で範囲内チェック</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">様々な範囲の種類</h2>
        <p className="text-gray-400 mb-4">各範囲演算子の動作を確認しましょう。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    // 閉区間（両端含む）
    print("1..5: ")
    for (i in 1..5) print("\${i} ")
    println()

    // 半開区間（上端含まない）
    print("1 until 5: ")
    for (i in 1 until 5) print("\${i} ")
    println()

    // 逆順
    print("5 downTo 1: ")
    for (i in 5 downTo 1) print("\${i} ")
    println()

    // 刻み幅
    print("0..10 step 3: ")
    for (i in 0..10 step 3) print("\${i} ")
    println()
}`}
          expectedOutput={`1..5: 1 2 3 4 5
1 until 5: 1 2 3 4
5 downTo 1: 5 4 3 2 1
0..10 step 3: 0 3 6 9 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">範囲のin演算子</h2>
        <p className="text-gray-400 mb-4">in演算子で値が範囲内かどうかチェックできます。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    val score = 85

    println("85 in 80..89: \${score in 80..89}")
    println("85 in 90..100: \${score in 90..100}")
    println("85 !in 60..79: \${score !in 60..79}")

    // 文字の範囲
    val ch = 'e'
    println("'e' in 'a'..'z': \${ch in 'a'..'z'}")
    println("'e' in 'A'..'Z': \${ch in 'A'..'Z'}")
}`}
          expectedOutput={`85 in 80..89: true
85 in 90..100: false
85 !in 60..79: true
'e' in 'a'..'z': true
'e' in 'A'..'Z': false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="ranges" />
      </div>
      <LessonNav lessons={lessons} currentId="ranges" basePath="/learn/control" />
    </div>
  );
}
