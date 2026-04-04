import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flow");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Flowの値を収集するために使うメソッドはどれですか？",
    options: ["subscribe()", "collect()", "observe()", "listen()"],
    answer: 1,
    explanation: "collectはFlowから値を収集するための終端演算子です。",
  },
  {
    question: "Flowの実行コンテキストを変更するために使う演算子はどれですか？",
    options: ["withContext", "flowOn", "launchIn", "switchMap"],
    answer: 1,
    explanation: "flowOnはFlowのupstream（上流）処理のコンテキストを変更します。",
  },
  {
    question: "StateFlowとSharedFlowの違いとして正しいのはどれですか？",
    options: [
      "StateFlowは初期値が不要、SharedFlowは初期値が必要",
      "StateFlowは現在の状態を保持し初期値が必要、SharedFlowはイベント共有向け",
      "どちらも同じ",
      "StateFlowはコルーチンでのみ使用可能",
    ],
    answer: 1,
    explanation: "StateFlowは状態保持用で初期値が必要、SharedFlowはブロードキャスト型のイベント共有に使います。",
  },
  {
    question: "Flowのエラーを処理するための演算子はどれですか？",
    options: ["onError", "catch", "handleError", "rescue"],
    answer: 1,
    explanation: "catch演算子はFlowの上流で発生した例外をキャッチして処理します。",
  },
];

export default function FlowPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">Flow</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlin Flowを使った非同期ストリーム処理を学びます。flowビルダーによる基本的なFlowの作成から、
          map・filterなどの演算子、flowOnによるコンテキスト制御、StateFlow・SharedFlow、
          エラー処理、テストまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="flow" totalLessons={6} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/flow" color="indigo" categoryId="flow" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Flowの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">flow</code>ビルダーで値を非同期に発行し、
          <code className="text-indigo-300">collect</code>で収集します。
        </p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun numberFlow(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100L)
        emit(i)
    }
}

fun main() = runBlocking {
    numberFlow().collect { value ->
        println(value)
    }
}`}
          expectedOutput={`1
2
3`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Flow演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">map</code>や<code className="text-indigo-300">filter</code>を
          使ってFlowの値を変換・絞り込みできます。
        </p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    (1..5).asFlow()
        .filter { it % 2 == 0 }
        .map { it * it }
        .collect { println(it) }
}`}
          expectedOutput={`4
16`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
