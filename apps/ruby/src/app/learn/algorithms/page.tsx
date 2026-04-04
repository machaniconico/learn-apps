import { RubyEditor } from "@/components/ruby-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "algorithms")!;
const lessons = category.lessons;

const quizQuestions: QuizQuestion[] = [
  {
    question: "二分探索の前提条件はどれですか？",
    options: ["配列がランダムであること", "配列がソート済みであること", "配列の長さが偶数であること", "配列の要素が数値であること"],
    answer: 1,
    explanation: "二分探索はソート済み配列に対して適用でき、O(log n)の計算量で探索できます。",
  },
  {
    question: "Rubyで配列をスタックとして使う場合、push/popはどちら側に作用しますか？",
    options: ["先頭", "末尾", "ランダム", "中央"],
    answer: 1,
    explanation: "Array#pushは末尾に追加、Array#popは末尾から取り出します（LIFO）。",
  },
  {
    question: "クイックソートの平均計算量はどれですか？",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    answer: 1,
    explanation: "クイックソートの平均計算量はO(n log n)ですが、最悪ケースはO(n²)です。",
  },
  {
    question: "Rubyの組み込みHashはどのデータ構造を基にしていますか？",
    options: ["二分木", "ハッシュテーブル", "連結リスト", "配列"],
    answer: 1,
    explanation: "RubyのHashはハッシュテーブルを基に実装されており、O(1)の平均アクセス時間を持ちます。",
  },
];

export default function AlgorithmsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">アルゴリズム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Rubyでアルゴリズムとデータ構造を実装しながら学びます。ソート・探索・再帰から、スタック・キュー・連結リスト・ハッシュテーブルまで、コンピュータサイエンスの基礎をRubyコードで体得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="algorithms" totalLessons={6} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/algorithms" color="indigo" categoryId="algorithms" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">ソートを試してみよう</h2>
        <RubyEditor
          defaultCode={`# バブルソートの実装
def bubble_sort(arr)
  n = arr.length
  loop do
    swapped = false
    (n - 1).times do |i|
      if arr[i] > arr[i + 1]
        arr[i], arr[i + 1] = arr[i + 1], arr[i]
        swapped = true
      end
    end
    break unless swapped
  end
  arr
end

data = [64, 34, 25, 12, 22, 11, 90]
puts bubble_sort(data).inspect

# Rubyの組み込みsort
puts [5, 3, 8, 1, 9].sort.inspect`}
          expectedOutput={`[11, 12, 22, 25, 34, 64, 90]
[1, 3, 5, 8, 9]`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="indigo" />
      </section>
    </div>
  );
}
