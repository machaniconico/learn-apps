import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・インターフェース レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インターフェースのデフォルト実装</h1>
        <p className="text-gray-400">インターフェースにデフォルトのメソッド実装を追加する方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概念説明</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Kotlinのインターフェースはメソッドにデフォルト実装を持てます。
          実装クラスでオーバーライドしなければデフォルト実装が使われます。
          これにより、既存クラスを壊さずにインターフェースに機能を追加できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          複数のインターフェースが同名のデフォルトメソッドを持つ場合、
          実装クラスは必ずオーバーライドし、
          <code className="text-violet-300">super&lt;インターフェース名&gt;.メソッド()</code>で明示的に呼び出します。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 1: デフォルト実装</h2>
        <KotlinEditor
          defaultCode={`interface Logger {
    fun log(message: String) = println("[LOG] $\{message}")
    fun warn(message: String) = println("[WARN] $\{message}")
    fun error(message: String) = println("[ERROR] $\{message}")
}

class AppService : Logger {
    fun run() {
        log("サービス開始")
        warn("メモリ使用率が高い")
        error("データベース接続失敗")
    }
}

class DebugService : Logger {
    override fun log(message: String) = println("[DEBUG:LOG] $\{message}")

    fun run() {
        log("デバッグ開始")
        warn("軽微な問題")
    }
}

fun main() {
    AppService().run()
    println("---")
    DebugService().run()
}`}
          expectedOutput={`[LOG] サービス開始
[WARN] メモリ使用率が高い
[ERROR] データベース接続失敗
---
[DEBUG:LOG] デバッグ開始
[WARN] 軽微な問題`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コード例 2: 競合するデフォルト実装の解決</h2>
        <KotlinEditor
          defaultCode={`interface A {
    fun hello() = println("Hello from A")
}

interface B {
    fun hello() = println("Hello from B")
}

class C : A, B {
    override fun hello() {
        super<A>.hello()
        super<B>.hello()
        println("Hello from C")
    }
}

fun main() {
    val c = C()
    c.hello()
}`}
          expectedOutput={`Hello from A
Hello from B
Hello from C`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="interface-default" />
      </div>
      <LessonNav lessons={lessons} currentId="interface-default" basePath="/learn/inheritance" />
    </div>
  );
}
