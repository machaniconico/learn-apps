import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クラス基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">initブロック</h1>
        <p className="text-gray-400">initブロックを使ったオブジェクト生成時の初期化処理の書き方を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">init</code>ブロックはクラスのインスタンスが生成されるときに実行される初期化コードです。
          プライマリコンストラクタの引数を使った初期化処理やバリデーションを書くのに適しています。
        </p>
        <p className="text-gray-300 leading-relaxed">
          クラスに複数のinitブロックを定義することもできます。
          その場合、定義した順番に実行されます。
          プロパティの初期化もinitブロックの実行と同じタイミングで行われます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: 基本的なinitブロック</h2>
        <KotlinEditor
          defaultCode={`class Person(val name: String, val age: Int) {
    init {
        require(name.isNotBlank()) { "名前は空にできません" }
        require(age >= 0) { "年齢は0以上でなければなりません" }
        println("Personを作成: $\{name}, $\{age}歳")
    }

    fun greet() = "こんにちは、$\{name}です！"
}

fun main() {
    val p = Person("田中", 25)
    println(p.greet())
}`}
          expectedOutput={`Personを作成: 田中, 25歳
こんにちは、田中です！`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: 複数のinitブロック</h2>
        <KotlinEditor
          defaultCode={`class DatabaseConfig(val host: String, val port: Int) {
    val connectionString: String

    init {
        println("ステップ1: 設定を検証中")
        require(port in 1..65535) { "ポート番号が無効です" }
    }

    init {
        println("ステップ2: 接続文字列を生成中")
        connectionString = "$\{host}:$\{port}"
    }

    init {
        println("ステップ3: 初期化完了 -> $\{connectionString}")
    }
}

fun main() {
    val config = DatabaseConfig("localhost", 5432)
    println("接続先: $\{config.connectionString}")
}`}
          expectedOutput={`ステップ1: 設定を検証中
ステップ2: 接続文字列を生成中
ステップ3: 初期化完了 -> localhost:5432
接続先: localhost:5432`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 3: initブロックとセカンダリコンストラクタ</h2>
        <KotlinEditor
          defaultCode={`class Matrix(val rows: Int, val cols: Int) {
    val data: Array<IntArray>

    init {
        data = Array(rows) { IntArray(cols) }
        println("$\{rows}x$\{cols}の行列を作成")
    }

    constructor(size: Int) : this(size, size) {
        println("正方行列 $\{size}x$\{size}")
    }

    fun set(r: Int, c: Int, v: Int) { data[r][c] = v }
    fun get(r: Int, c: Int) = data[r][c]
}

fun main() {
    val m = Matrix(2)
    m.set(0, 0, 1)
    m.set(1, 1, 5)
    println("(0,0)=$\{m.get(0,0)}, (1,1)=$\{m.get(1,1)}")
}`}
          expectedOutput={`2x2の行列を作成
正方行列 2x2
(0,0)=1, (1,1)=5`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="init-blocks" />
      </div>
      <LessonNav lessons={lessons} currentId="init-blocks" basePath="/learn/classes" />
    </div>
  );
}
