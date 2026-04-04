import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "collections")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "Swift の配列に要素を追加するメソッドは？",
    options: ["add()", "push()", "append()", "insert()"],
    answer: 2,
    explanation: "append()メソッドで配列の末尾に要素を追加できます。特定の位置に挿入するにはinsert(_:at:)を使います。",
  },
  {
    question: "Dictionaryで存在しないキーにアクセスすると？",
    options: ["エラーが発生する", "nilが返される", "デフォルト値が返される", "空文字が返される"],
    answer: 1,
    explanation: "DictionaryはOptional型を返すため、存在しないキーにアクセスするとnilが返されます。",
  },
  {
    question: "Setの特徴は？",
    options: ["順序が保証される", "重複した値を持てる", "重複した値を持てない", "キーと値のペアを持つ"],
    answer: 2,
    explanation: "Setは重複した値を持たないコレクションです。順序は保証されません。",
  },
  {
    question: "mapメソッドの役割は？",
    options: ["コレクションをフィルタリングする", "コレクションの各要素を変換して新しい配列を返す", "コレクションを集計する", "コレクションをソートする"],
    answer: 1,
    explanation: "mapはコレクションの各要素にクロージャを適用して新しい配列を作成します。",
  },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">コレクション</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Swiftのコレクション型を学びます。Array・Dictionary・Setの基本操作から、
          map・filter・reduceなどの高階関数まで、データを扱う力を身につけましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="collections" totalLessons={7} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/collections" color="green" categoryId="collections" />
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">コード例: コレクションの基本</h2>
        <SwiftEditor
          defaultCode={`// 配列
var fruits = ["りんご", "バナナ", "みかん"]
fruits.append("ぶどう")
print(fruits.count)

// 辞書
var scores: [String: Int] = ["Alice": 90, "Bob": 75]
scores["Carol"] = 88
print(scores["Alice"] ?? 0)

// map と filter
let numbers = [1, 2, 3, 4, 5, 6]
let evens = numbers.filter { $0 % 2 == 0 }
let doubled = evens.map { $0 * 2 }
print(doubled)`}
          expectedOutput={`4
90
[4, 8, 12]`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
