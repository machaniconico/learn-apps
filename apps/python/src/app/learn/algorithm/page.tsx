import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

const quizQuestions: QuizQuestion[] = [
  {
    question: "O(n²) と O(n log n) のアルゴリズムで n=1000 のとき、処理量の比はおよそどれですか？",
    options: [
      "ほぼ同じ",
      "O(n²) の方が約100倍多い",
      "O(n log n) の方が多い",
      "2倍しか違わない",
    ],
    answer: 1,
    explanation: "n=1000 のとき O(n²)=1,000,000、O(n log n)≈10,000 なので約100倍の差があります。",
  },
  {
    question: "二分探索が使える前提条件はどれですか？",
    options: [
      "データが辞書形式であること",
      "データが昇順または降順にソート済みであること",
      "データが重複していないこと",
      "データ量が1000件以下であること",
    ],
    answer: 1,
    explanation: "二分探索は配列が整列済みである必要があります。毎回中央値と比較して探索範囲を半分に絞ります。",
  },
  {
    question: "フィボナッチ数列を動的計画法（メモ化）で実装するメリットはどれですか？",
    options: [
      "コードが短くなる",
      "重複する部分問題の計算を省き、指数時間をO(n)に短縮できる",
      "メモリをまったく使わなくなる",
      "並列処理が可能になる",
    ],
    answer: 1,
    explanation: "ナイーブな再帰はO(2^n)ですが、メモ化により各部分問題を1度だけ計算するのでO(n)になります。",
  },
  {
    question: "クイックソートの平均計算量はどれですか？",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n²)",
      "O(log n)",
    ],
    answer: 1,
    explanation: "クイックソートの平均計算量はO(n log n)です。ただし最悪ケース（既に整列済みなど）ではO(n²)になる場合があります。",
  },
];

export default function AlgorithmPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">アルゴリズム</h1>
        <div className="mb-3">
          <DifficultyBadge difficulty="advanced" />
        </div>
        <p className="text-gray-400">
          計算量・ソート・探索・再帰・動的計画法など、プログラマーの必須知識を学びます。
          Pythonでアルゴリズムを実装しながら、効率的な問題解決の思考法を身につけましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="algorithm" totalLessons={6} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/algorithm" color="yellow" categoryId="algorithm" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">アルゴリズムを学ぶ意義</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "効率的な問題解決",
              desc: "同じ問題でも効率の良いアルゴリズムを選ぶことで、処理速度が劇的に変わる。",
              icon: "🧠",
            },
            {
              title: "計算量の理解",
              desc: "Big-O記法でアルゴリズムの効率を評価し、データ量に応じた設計判断ができる。",
              icon: "📊",
            },
            {
              title: "コーディング面接対策",
              desc: "技術系面接ではアルゴリズム問題が頻出。基本的なアルゴリズムの理解が必要。",
              icon: "💼",
            },
            {
              title: "データ構造との連携",
              desc: "アルゴリズムは適切なデータ構造と組み合わせることで真の効果を発揮する。",
              icon: "🔗",
            },
            {
              title: "再帰的思考",
              desc: "問題を小さな部分問題に分割して解く再帰的な考え方は多くの場面で応用できる。",
              icon: "♻️",
            },
            {
              title: "動的計画法",
              desc: "計算済みの結果を再利用するDPは、指数時間の問題を多項式時間で解く強力な手法。",
              icon: "🗄️",
            },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">アルゴリズムを実際に動かしてみよう</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">ソートアルゴリズムの比較</h3>
          <PythonPlayground
            defaultCode={`import random
import time

# バブルソート O(n²)
def bubble_sort(arr):
    n = len(arr)
    arr = arr.copy()
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Pythonの組み込みソート（Timsort, O(n log n)）
def builtin_sort(arr):
    return sorted(arr)

# テストデータ
data = [random.randint(1, 1000) for _ in range(500)]

# バブルソート
t1 = time.time()
result1 = bubble_sort(data)
t2 = time.time()
print(f"バブルソート:    {(t2-t1)*1000:.2f}ms")

# 組み込みソート
t3 = time.time()
result2 = builtin_sort(data)
t4 = time.time()
print(f"組み込みソート:  {(t4-t3)*1000:.2f}ms")

print(f"結果が一致: {result1 == result2}")
print(f"先頭5要素: {result1[:5]}")
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">二分探索 vs 線形探索</h3>
          <PythonPlayground
            defaultCode={`import time

# 線形探索 O(n)
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# 二分探索 O(log n)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# テストデータ（ソート済み）
n = 100_000
data = list(range(n))
target = 99_999  # 最悪ケース（末尾に近い）

# 線形探索
t1 = time.time()
idx1 = linear_search(data, target)
t2 = time.time()
print(f"線形探索: インデックス={idx1}, 時間={((t2-t1)*1000):.3f}ms")

# 二分探索
t3 = time.time()
idx2 = binary_search(data, target)
t4 = time.time()
print(f"二分探索: インデックス={idx2}, 時間={((t4-t3)*1000):.3f}ms")

import math
print(f"\\nlog2({n}) ≈ {math.log2(n):.1f} 回で見つかる（二分探索）")
`}
          />
        </div>
      </section>

      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
