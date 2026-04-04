import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "control")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Swiftのswitch文でfallthrough（次のケースへの落下）は？",
    options: ["自動的に発生する", "fallthroughキーワードが必要", "breakで制御する", "continueで制御する"],
    answer: 1,
    explanation: "Swiftのswitch文はデフォルトでfallthroughしません。意図的にfallthroughしたい場合はfallthroughキーワードを使います。",
  },
  {
    question: "guard文の特徴は？",
    options: ["条件が真のときに処理を続ける", "条件が偽のときにelseブロックで早期リターンする", "ループを制御する", "switch文の代わりになる"],
    answer: 1,
    explanation: "guard文は条件が偽の場合にelseブロックを実行し、早期リターンするパターンです。",
  },
  {
    question: "Swiftのfor-inループで範囲を指定するには？",
    options: ["for i in 0 to 9", "for i in 0..9", "for i in 0..<10", "for i = 0; i < 10; i++"],
    answer: 2,
    explanation: "0..<10 は0から9まで（10を含まない）の範囲演算子です。0...9 は0から9まで（両端を含む）です。",
  },
  {
    question: "repeat-whileループと通常のwhileループの違いは？",
    options: ["repeat-whileは条件を最初に評価する", "repeat-whileは少なくとも1回は実行される", "repeat-whileは無限ループになる", "違いはない"],
    answer: 1,
    explanation: "repeat-whileは条件を後で評価するため、少なくとも1回は必ずループ本体が実行されます。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Swiftの制御フローを学びます。if-else・switch・for-in・while・guard文など、
          プログラムの流れを制御する構文をマスターしましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="cyan" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="cyan" categoryId="control" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: 制御構文の基本</h2>
        <SwiftEditor
          defaultCode={`// if-else
let score = 85
if score >= 90 {
    print("優秀")
} else if score >= 70 {
    print("合格")
} else {
    print("不合格")
}

// for-in ループ
for i in 1...3 {
    print("カウント: \\(i)")
}

// switch文
let day = "月"
switch day {
case "土", "日":
    print("週末")
default:
    print("平日")
}`}
          expectedOutput={`合格
カウント: 1
カウント: 2
カウント: 3
平日`}
        />
      </section>
      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
