import { KotlinEditor } from "@/components/kotlin-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("coroutines");

const quizQuestions: QuizQuestion[] = [
  {
    question: "コルーチンを起動して結果を返さない場合に使うビルダーはどれですか？",
    options: ["async", "launch", "runBlocking", "withContext"],
    answer: 1,
    explanation: "launchはJobを返すコルーチンビルダーで、結果を返さない非同期処理に使います。",
  },
  {
    question: "suspend関数を呼び出せる場所はどこですか？",
    options: [
      "通常の関数の中",
      "コルーチンまたは別のsuspend関数の中",
      "どこでも呼び出せる",
      "mainスレッドのみ",
    ],
    answer: 1,
    explanation: "suspend関数はコルーチンスコープまたは別のsuspend関数からのみ呼び出せます。",
  },
  {
    question: "I/O処理に適したCoroutineDispatcherはどれですか？",
    options: ["Dispatchers.Main", "Dispatchers.Default", "Dispatchers.IO", "Dispatchers.Unconfined"],
    answer: 2,
    explanation: "Dispatchers.IOはファイルやネットワークなどI/Oブロッキング処理に最適化されたディスパッチャです。",
  },
  {
    question: "asyncで起動したコルーチンの結果を取得するメソッドはどれですか？",
    options: ["get()", "result()", "await()", "collect()"],
    answer: 2,
    explanation: "asyncはDeferredを返し、await()を呼び出すことで結果を取得できます。",
  },
];

export default function CoroutinesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">コルーチン</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Kotlinコルーチンによる非同期プログラミングを学びます。launchとasyncによるコルーチン起動から始め、
          suspend関数、コルーチンコンテキスト、構造化並行処理、チャネル、例外処理、Flowの入門まで、
          非同期処理の基礎から応用まで幅広くカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="coroutines" totalLessons={8} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/coroutines" color="indigo" categoryId="coroutines" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コルーチンの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">launch</code>でコルーチンを起動し、
          <code className="text-indigo-300">delay</code>で非同期に待機します。
        </p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
    delay(2000L)
}`}
          expectedOutput={`Hello,
World!`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">asyncで並列処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">async</code>を使うと複数の処理を並列実行し、
          <code className="text-indigo-300">await()</code>で結果を取得できます。
        </p>
        <KotlinEditor
          defaultCode={`import kotlinx.coroutines.*

suspend fun fetchData(id: Int): String {
    delay(500L)
    return "Data-\${id}"
}

fun main() = runBlocking {
    val d1 = async { fetchData(1) }
    val d2 = async { fetchData(2) }
    println("\${d1.await()} and \${d2.await()}")
}`}
          expectedOutput={`Data-1 and Data-2`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
