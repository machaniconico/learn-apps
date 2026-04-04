import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithms");

const quizQuestions: QuizQuestion[] = [
  {
    question: "バブルソートの最悪時間計算量は？",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
    answer: 2,
    explanation: "バブルソートは最悪の場合、全ての要素ペアを比較するため O(n^2) です。",
  },
  {
    question: "二分探索が使える前提条件は？",
    options: ["データが整数であること", "データがソート済みであること", "データが配列であること", "データが10個以上であること"],
    answer: 1,
    explanation: "二分探索はデータがソート済みでなければ正しく動作しません。ソート済みデータを半分ずつ絞り込みます。",
  },
  {
    question: "スタック(Stack)のデータ操作方式は？",
    options: ["FIFO", "LIFO", "ランダムアクセス", "優先度順"],
    answer: 1,
    explanation: "スタックはLIFO(Last In, First Out)方式で、最後に追加した要素が最初に取り出されます。",
  },
  {
    question: "連結リストの各ノードが持つ情報は？",
    options: ["値のみ", "値とインデックス", "値と次のノードへのポインタ", "値と配列"],
    answer: 2,
    explanation: "単方向連結リストの各ノードはデータ値と次のノードを指すポインタを持ちます。",
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
          Goで基本的なアルゴリズムとデータ構造を実装します。ソート、探索、再帰、スタック・キュー、
          連結リスト、ハッシュテーブルなど、プログラミングの基礎となるアルゴリズムを学びましょう。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="algorithms" totalLessons={6} color="indigo" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/algorithms" color="indigo" categoryId="algorithms" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ソートアルゴリズムの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">バブルソート</code>は最も基本的なソートアルゴリズムです。
          隣接する要素を比較して入れ替えます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func bubbleSort(arr []int) []int {
    result := make([]int, len(arr))
    copy(result, arr)
    n := len(result)
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-i-1; j++ {
            if result[j] > result[j+1] {
                result[j], result[j+1] = result[j+1], result[j]
            }
        }
    }
    return result
}

func main() {
    data := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Println("ソート前:", data)
    sorted := bubbleSort(data)
    fmt.Println("ソート後:", sorted)
}`}
          expectedOutput={`ソート前: [64 34 25 12 22 11 90]
ソート後: [11 12 22 25 34 64 90]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二分探索</h2>
        <p className="text-gray-400 mb-4">
          ソート済みデータを半分ずつ絞り込む<code className="text-cyan-300">二分探索</code>は O(log n) の効率です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func binarySearch(arr []int, target int) int {
    low, high := 0, len(arr)-1
    for low <= high {
        mid := (low + high) / 2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1
}

func main() {
    data := []int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}
    targets := []int{23, 50}
    for _, t := range targets {
        idx := binarySearch(data, t)
        if idx != -1 {
            fmt.Printf("%d はインデックス %d で見つかりました\\n", t, idx)
        } else {
            fmt.Printf("%d は見つかりませんでした\\n", t)
        }
    }
}`}
          expectedOutput={`23 はインデックス 5 で見つかりました
50 は見つかりませんでした`}
        />
      </section>
      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
