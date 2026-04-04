import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhileLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileループ</h1>
        <p className="text-gray-400">条件が真の間繰り返すwhileループの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">whileループとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          whileループは条件が真（true）の間、ブロックを繰り返し実行します。
          繰り返し回数が事前にわからない場合に適しています。
          無限ループにならないよう、条件が必ずfalseになるようにしてください。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>while (条件) {} の構文</li>
          <li>条件が最初からfalseの場合は一度も実行されない</li>
          <li>ループ内で条件を変化させることが重要</li>
          <li>無限ループにはwhile(true)を使い、breakで抜ける</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なwhileループ</h2>
        <p className="text-gray-400 mb-4">カウンタを使ったwhileループの基本例です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    var count = 1

    while (count <= 5) {
        println("カウント: \${count}")
        count++
    }

    println("ループ終了")
}`}
          expectedOutput={`カウント: 1
カウント: 2
カウント: 3
カウント: 4
カウント: 5
ループ終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件を使ったwhileループ</h2>
        <p className="text-gray-400 mb-4">実際の条件に基づいてループを制御する例です。</p>
        <KotlinEditor
          defaultCode={`fun main() {
    var number = 1
    var sum = 0

    while (sum < 100) {
        sum += number
        number++
    }

    println("合計が100を超えた: \${sum}")
    println("最後に加算した数: \${number - 1}")

    // 2のべき乗
    var power = 1
    while (power < 1000) {
        print("\${power} ")
        power *= 2
    }
    println()
}`}
          expectedOutput={`合計が100を超えた: 105
最後に加算した数: 14
1 2 4 8 16 32 64 128 256 512 `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
