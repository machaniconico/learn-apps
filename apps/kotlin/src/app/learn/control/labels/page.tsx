import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LabelsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラベル</h1>
        <p className="text-gray-400">ネストしたループを制御するためのラベル付きbreak・continueを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラベルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ラベルを使うと、ネストしたループの特定のループにbreakやcontinueを適用できます。
          ラベルは識別子に@を付けて定義し、break@ラベル名やcontinue@ラベル名で参照します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ラベルは ラベル名@ の形式で定義</li>
          <li>break@ラベル名 でそのラベルのループを終了</li>
          <li>continue@ラベル名 でそのラベルのループの次へ</li>
          <li>ネストしたループの外側を制御するのに使う</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラベル付きbreak</h2>
        <p className="text-gray-400 mb-4">外側のループをbreakで抜ける例です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    // ラベルなし（内側のループのみ終了）
    println("ラベルなし:")
    for (i in 1..3) {
        for (j in 1..3) {
            if (j == 2) break
            print("(\${i},\${j}) ")
        }
    }
    println()

    // ラベルあり（外側のループも終了）
    println("ラベルあり:")
    outer@ for (i in 1..3) {
        for (j in 1..3) {
            if (i == 2 && j == 2) break@outer
            print("(\${i},\${j}) ")
        }
    }
    println()
}`}
          expectedOutput={`ラベルなし:
(1,1) (2,1) (3,1)
ラベルあり:
(1,1) (1,2) (1,3) (2,1) `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラベル付きcontinue</h2>
        <p className="text-gray-400 mb-4">外側のループの次の繰り返しにスキップする例です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    println("ラベル付きcontinue:")
    outer@ for (i in 1..3) {
        for (j in 1..3) {
            if (j == 2) continue@outer
            print("(\${i},\${j}) ")
        }
    }
    println()
}`}
          expectedOutput={`ラベル付きcontinue:
(1,1) (2,1) (3,1) `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="labels" />
      </div>
      <LessonNav lessons={lessons} currentId="labels" basePath="/learn/control" />
    </div>
  );
}
