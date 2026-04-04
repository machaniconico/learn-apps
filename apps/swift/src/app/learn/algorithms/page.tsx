import { SwiftEditor } from "@/components/swift-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "algorithms")!;

const quizQuestions: QuizQuestion[] = [
  {
    question: "二分探索が正しく機能するための前提条件はなんですか？",
    options: [
      "配列が空であること",
      "配列がソート済みであること",
      "配列の要素がすべて正の数であること",
      "配列の長さが偶数であること",
    ],
    answer: 1,
    explanation: "二分探索は配列がソート済みであることを前提とし、O(log n)の時間計算量で検索します。",
  },
  {
    question: "クイックソートの平均時間計算量はどれですか？",
    options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
    answer: 2,
    explanation: "クイックソートの平均時間計算量はO(n log n)です。最悪ケースはO(n²)になることがあります。",
  },
  {
    question: "スタック（Stack）のデータ取り出し方式はどれですか？",
    options: ["FIFO（先入れ先出し）", "LIFO（後入れ先出し）", "ランダムアクセス", "優先度順"],
    answer: 1,
    explanation: "スタックはLIFO（Last In, First Out）方式です。キューはFIFO（First In, First Out）方式です。",
  },
];

export default function AlgorithmsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-indigo-400">{category.name}</h1>
          <DifficultyBadge difficulty={category.difficulty} />
          <span className="text-sm text-gray-500">{category.lessons.length} レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          アルゴリズムはプログラミングの根幹です。ソート・探索・再帰といった基本アルゴリズムから、
          スタック・キュー・連結リスト・ハッシュテーブルといったデータ構造まで、
          Swiftのコードで実装しながら理解を深めましょう。
        </p>
        <ProgressBar categoryId="algorithms" totalLessons={category.lessons.length} color="indigo" />
      </div>

      {/* Lesson List */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-4">レッスン一覧</h2>
        <LessonList lessons={category.lessons} basePath="/learn/algorithms" color="indigo" categoryId="algorithms" />
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-100">コード例</h2>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">バブルソート</h3>
          <SwiftEditor
            defaultCode={`func bubbleSort(_ array: [Int]) -> [Int] {
    var arr = array
    let n = arr.count
    for i in 0..<n {
        for j in 0..<(n - i - 1) {
            if arr[j] > arr[j + 1] {
                arr.swapAt(j, j + 1)
            }
        }
    }
    return arr
}

let nums = [64, 34, 25, 12, 22, 11, 90]
print(bubbleSort(nums))
// [11, 12, 22, 25, 34, 64, 90]`}
            height="240px"
            expectedOutput="[11, 12, 22, 25, 34, 64, 90]"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">二分探索</h3>
          <SwiftEditor
            defaultCode={`func binarySearch(_ array: [Int], target: Int) -> Int? {
    var low = 0
    var high = array.count - 1

    while low <= high {
        let mid = (low + high) / 2
        if array[mid] == target {
            return mid
        } else if array[mid] < target {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return nil
}

let sorted = [11, 12, 22, 25, 34, 64, 90]
if let idx = binarySearch(sorted, target: 25) {
    print("Found at index \\(idx)")  // Found at index 3
} else {
    print("Not found")
}`}
            height="280px"
            expectedOutput="Found at index 3"
          />
        </div>
      </section>

      {/* Quiz */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-2">確認クイズ</h2>
        <Quiz questions={quizQuestions} color="indigo" />
      </section>
    </div>
  );
}
