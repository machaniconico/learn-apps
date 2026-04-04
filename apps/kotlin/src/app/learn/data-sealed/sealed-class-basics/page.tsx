import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("data-sealed");

export default function SealedClassBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">データクラス・Sealed レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">sealedクラスの基本</h1>
        <p className="text-gray-400">閉じた型階層を定義するsealed classの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">sealed classとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">sealed class</code>は継承できるサブクラスを
          制限した抽象クラスです。コンパイラがすべてのサブクラスを把握しているため、
          when式で網羅チェックができます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>サブクラスは同じパッケージ内に限定</li>
          <li>サブクラスはclass/data class/object/sealed classなど</li>
          <li>when式でelseなしの網羅チェックが可能</li>
          <li>代数的データ型（ADT）を表現できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">sealed classの定義</h2>
        <p className="text-gray-400 mb-4">
          sealedクラスとそのサブクラスを定義して型階層を作ります。
        </p>
        <KotlinEditor
          defaultCode={`sealed class Shape {
    data class Circle(val radius: Double) : Shape()
    data class Rectangle(val width: Double, val height: Double) : Shape()
    data class Triangle(val base: Double, val height: Double) : Shape()
}

fun area(shape: Shape): Double = when (shape) {
    is Shape.Circle -> Math.PI * shape.radius * shape.radius
    is Shape.Rectangle -> shape.width * shape.height
    is Shape.Triangle -> 0.5 * shape.base * shape.height
}

fun main() {
    println(area(Shape.Circle(5.0)))
    println(area(Shape.Rectangle(4.0, 6.0)))
    println(area(Shape.Triangle(3.0, 8.0)))
}`}
          expectedOutput={`78.53981633974483
24.0
12.0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーハンドリングへの応用</h2>
        <p className="text-gray-400 mb-4">
          sealed classはAPIのレスポンスやエラーハンドリングのパターンに
          よく使われます。
        </p>
        <KotlinEditor
          defaultCode={`sealed class ApiResult<out T> {
    data class Success<T>(val data: T) : ApiResult<T>()
    data class Error(val code: Int, val message: String) : ApiResult<Nothing>()
    object Loading : ApiResult<Nothing>()
}

fun handleResult(result: ApiResult<String>) {
    when (result) {
        is ApiResult.Success -> println("成功: ${"$"}{result.data}")
        is ApiResult.Error -> println("エラー ${"$"}{result.code}: ${"$"}{result.message}")
        ApiResult.Loading -> println("ロード中...")
    }
}

fun main() {
    handleResult(ApiResult.Success("データ取得完了"))
    handleResult(ApiResult.Error(404, "Not Found"))
    handleResult(ApiResult.Loading)
}`}
          expectedOutput={`成功: データ取得完了
エラー 404: Not Found
ロード中...`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="data-sealed" lessonId="sealed-class-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="sealed-class-basics" basePath="/learn/data-sealed" />
    </div>
  );
}
