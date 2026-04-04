import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lambda");

export default function HigherOrderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ラムダ式 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">高階関数</h1>
        <p className="text-gray-400">関数を引数や戻り値として扱う高階関数の定義と活用</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">高階関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          高階関数は関数を引数として受け取るか、関数を戻り値として返す関数です。
          Kotlinの標準ライブラリのmap・filter・foldなどもすべて高階関数です。
          自分でも定義することで汎用的な処理を作れます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>関数を引数に取る - 処理を外部から注入できる</li>
          <li>関数を返す - 関数を動的に生成できる</li>
          <li>コードの再利用性が高まる</li>
          <li>テストしやすい設計になる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数を引数に取る</h2>
        <p className="text-gray-400 mb-4">
          処理のロジックを引数として受け取る高階関数を定義します。
        </p>
        <KotlinEditor
          defaultCode={`fun operateOnList(list: List<Int>, operation: (Int) -> Int): List<Int> {
    return list.map(operation)
}

fun <T> measure(label: String, action: () -> T): T {
    println("${"$"}{label}開始")
    val result = action()
    println("${"$"}{label}完了")
    return result
}

fun main() {
    val nums = listOf(1, 2, 3, 4, 5)
    println(operateOnList(nums) { it * 3 })
    println(operateOnList(nums) { it * it })

    val result = measure("処理") {
        nums.sum()
    }
    println("結果: ${"$"}{result}")
}`}
          expectedOutput={`[3, 6, 9, 12, 15]
[1, 4, 9, 16, 25]
処理開始
処理完了
結果: 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数を返す</h2>
        <p className="text-gray-400 mb-4">
          関数を戻り値として返すことで、引数に応じたカスタム関数を動的に生成できます。
        </p>
        <KotlinEditor
          defaultCode={`fun multiplier(factor: Int): (Int) -> Int = { it * factor }

fun greeter(greeting: String): (String) -> String = { name ->
    "${"$"}{greeting}, ${"$"}{name}!"
}

fun main() {
    val double = multiplier(2)
    val triple = multiplier(3)
    println(double(5))
    println(triple(5))

    val hello = greeter("こんにちは")
    val hi = greeter("やあ")
    println(hello("Kotlin"))
    println(hi("World"))
}`}
          expectedOutput={`10
15
こんにちは, Kotlin!
やあ, World!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="lambda" lessonId="higher-order" />
      </div>
      <LessonNav lessons={lessons} currentId="higher-order" basePath="/learn/lambda" />
    </div>
  );
}
