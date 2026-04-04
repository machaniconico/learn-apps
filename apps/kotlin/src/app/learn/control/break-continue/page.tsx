import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function BreakContinuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">break・continue</h1>
        <p className="text-gray-400">ループを中断するbreakと次の繰り返しにスキップするcontinueを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">breakとcontinue</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          breakはループを即座に終了させます。continueは現在の繰り返しをスキップして次へ進みます。
          どちらも最も内側のループに対して作用します。
          ネストしたループを制御するにはラベルを使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>break: ループを終了する</li>
          <li>continue: 現在の繰り返しをスキップ</li>
          <li>最も内側のループに作用する</li>
          <li>外側のループを制御するにはラベルが必要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">breakの使い方</h2>
        <p className="text-gray-400 mb-4">特定の条件でループを抜けるbreakの使い方です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    // breakで最初の偶数を見つけたら終了
    for (i in 1..10) {
        if (i % 2 == 0) {
            println("最初の偶数: \${i}")
            break
        }
    }

    // 検索でbreakを使う
    val numbers = listOf(3, 7, 2, 9, 4, 1, 8)
    var found = -1
    for (num in numbers) {
        if (num > 5) {
            found = num
            break
        }
    }
    println("5より大きい最初の数: \${found}")
}`}
          expectedOutput={`最初の偶数: 2
5より大きい最初の数: 7`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">continueの使い方</h2>
        <p className="text-gray-400 mb-4">特定の要素をスキップするcontinueの使い方です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    // 偶数をスキップして奇数だけ表示
    print("奇数: ")
    for (i in 1..10) {
        if (i % 2 == 0) continue
        print("\${i} ")
    }
    println()

    // 3の倍数をスキップ
    print("3の倍数以外: ")
    for (i in 1..15) {
        if (i % 3 == 0) continue
        print("\${i} ")
    }
    println()
}`}
          expectedOutput={`奇数: 1 3 5 7 9
3の倍数以外: 1 2 4 5 7 8 10 11 13 14 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="break-continue" />
      </div>
      <LessonNav lessons={lessons} currentId="break-continue" basePath="/learn/control" />
    </div>
  );
}
