import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・リスト レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">多次元配列</h1>
        <p className="text-gray-400">二次元・多次元配列の作成方法と要素へのアクセス方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinで二次元配列を作るには<code className="text-green-300">Array(rows) {"{ IntArray(cols) }"}</code>のように
          外側の配列の各要素を内側の配列にします。
          要素へのアクセスは<code className="text-green-300">array[row][col]</code>です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-green-300">arrayOf(arrayOf(...))</code>でも作れますが、
          数値型の場合は<code className="text-green-300">IntArray</code>などのプリミティブ配列を使う方がメモリ効率が良いです。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: 二次元配列の基本</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val matrix = Array(3) { row -> IntArray(3) { col -> row * 3 + col + 1 } }

    println("行列:")
    for (row in matrix) {
        println(row.toList())
    }

    println("matrix[1][2] = $\{matrix[1][2]}")
    matrix[0][0] = 99
    println("更新後 matrix[0][0] = $\{matrix[0][0]}")
}`}
          expectedOutput={`行列:
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]
matrix[1][2] = 6
更新後 matrix[0][0] = 99`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: 二次元リスト</h2>
        <KotlinEditor
          defaultCode={`fun main() {
    val board = listOf(
        listOf("X", "O", "X"),
        listOf("O", "X", "O"),
        listOf("X", "O", "X")
    )

    println("三目並べボード:")
    board.forEachIndexed { r, row ->
        row.forEachIndexed { c, cell ->
            print("$\{cell}$\{if (c < 2) "|" else ""}")
        }
        println()
        if (r < 2) println("-+-+-")
    }
}`}
          expectedOutput={`三目並べボード:
X|O|X
-+-+-
O|X|O
-+-+-
X|O|X`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: 行列の転置</h2>
        <KotlinEditor
          defaultCode={`fun transpose(matrix: Array<IntArray>): Array<IntArray> {
    val rows = matrix.size
    val cols = matrix[0].size
    return Array(cols) { c -> IntArray(rows) { r -> matrix[r][c] } }
}

fun printMatrix(m: Array<IntArray>) = m.forEach { println(it.toList()) }

fun main() {
    val original = arrayOf(
        intArrayOf(1, 2, 3),
        intArrayOf(4, 5, 6)
    )
    println("元の行列(2x3):")
    printMatrix(original)
    println("転置後(3x2):")
    printMatrix(transpose(original))
}`}
          expectedOutput={`元の行列(2x3):
[1, 2, 3]
[4, 5, 6]
転置後(3x2):
[1, 4]
[2, 5]
[3, 6]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="multidimensional" />
      </div>
      <LessonNav lessons={lessons} currentId="multidimensional" basePath="/learn/arrays" />
    </div>
  );
}
