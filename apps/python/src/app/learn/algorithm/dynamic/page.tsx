import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmDynamicPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">アルゴリズム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">動的計画法</h1>
        <p className="text-gray-400">部分問題を記憶して効率化する動的計画法の入門</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">動的計画法（DP）とは</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">動的計画法（Dynamic Programming, DP）</strong>は、
          問題を部分問題に分割し、<strong className="text-white">一度計算した結果を記憶（メモ化）</strong>して
          再利用することで効率化する手法です。
        </p>
        <p className="text-gray-300 mb-4">
          適用できる問題の条件：
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h3 className="text-yellow-400 font-semibold mb-2">最適部分構造</h3>
            <p className="text-gray-300 text-sm">全体の最適解が部分問題の最適解から構成できる</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h3 className="text-yellow-400 font-semibold mb-2">重複する部分問題</h3>
            <p className="text-gray-300 text-sm">同じ部分問題が繰り返し登場する（だから記憶が効果的）</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">メモ化再帰 vs テーブル法</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h3 className="text-gray-300 font-semibold mb-2">メモ化再帰（Top-down）</h3>
            <p className="text-gray-400 text-sm mb-2">再帰を使い、計算済みの結果を辞書に保存する</p>
            <pre className="text-gray-300 text-xs font-mono">{`memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]`}</pre>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h3 className="text-gray-300 font-semibold mb-2">テーブル法（Bottom-up）</h3>
            <p className="text-gray-400 text-sm mb-2">小さな問題から順に配列に記録する</p>
            <pre className="text-gray-300 text-xs font-mono">{`def fib(n):
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">フィボナッチ数列のDP最適化</h2>
        <PythonPlayground
          defaultCode={`import time
import sys
sys.setrecursionlimit(5000)

# ナイーブな再帰 O(2^n)
def fib_naive(n: int) -> int:
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# メモ化再帰 O(n)
def fib_memo(n: int, memo: dict = {}) -> int:
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# テーブル法 O(n)
def fib_dp(n: int) -> int:
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# 空間最適化 O(1)
def fib_optimal(n: int) -> int:
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# ベンチマーク（n=30まで: ナイーブも使用）
n = 30
print(f"n={n} の計算:")

t1 = time.perf_counter()
r1 = fib_naive(n)
t1 = (time.perf_counter() - t1) * 1000
print(f"ナイーブ再帰:  {r1:>10} ({t1:.2f}ms)")

t2 = time.perf_counter()
r2 = fib_memo(n)
t2 = (time.perf_counter() - t2) * 1000
print(f"メモ化再帰:    {r2:>10} ({t2:.4f}ms)")

t3 = time.perf_counter()
r3 = fib_dp(n)
t3 = (time.perf_counter() - t3) * 1000
print(f"テーブル法:    {r3:>10} ({t3:.4f}ms)")

t4 = time.perf_counter()
r4 = fib_optimal(n)
t4 = (time.perf_counter() - t4) * 1000
print(f"空間最適化:    {r4:>10} ({t4:.4f}ms)")

# 大きなnも高速
print(f"\\nfib(200) = {fib_optimal(200)}")
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ナップサック問題（DPの応用）</h2>
        <PythonPlayground
          defaultCode={`# 0/1ナップサック問題: 容量制限内で価値を最大化
# 各アイテムは1つだけ選べる

def knapsack(capacity: int, weights: list, values: list) -> int:
    """
    capacity: ナップサックの容量
    weights:  各アイテムの重さ
    values:   各アイテムの価値
    returns:  最大価値
    """
    n = len(weights)
    # dp[i][w] = i番目まで考慮し、容量wでの最大価値
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # アイテムiを選ばない
            dp[i][w] = dp[i - 1][w]
            # アイテムiを選ぶ（重さが収まる場合）
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                )

    return dp[n][capacity]

def knapsack_items(capacity: int, weights: list, values: list, names: list):
    """選んだアイテムも返す版"""
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i - 1][w]
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])

    # 選択したアイテムを逆追跡
    selected = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i - 1][w]:
            selected.append(names[i - 1])
            w -= weights[i - 1]

    return dp[n][capacity], selected[::-1]

# 問題: 容量10kgのナップサックに何を入れる？
items = [
    ("本",     2, 6),   # (名前, 重さ, 価値)
    ("カメラ", 3, 9),
    ("衣類",   4, 5),
    ("PC",     5, 8),
    ("食料",   1, 3),
    ("薬",     1, 4),
]

names   = [item[0] for item in items]
weights = [item[1] for item in items]
values  = [item[2] for item in items]
capacity = 10

best_value, chosen = knapsack_items(capacity, weights, values, names)

print(f"ナップサック容量: {capacity}kg")
print(f"\\nアイテム一覧:")
for name, w, v in items:
    print(f"  {name:<6}: {w}kg, 価値{v}")

print(f"\\n最適な選択: {', '.join(chosen)}")
total_weight = sum(weights[names.index(n)] for n in chosen)
print(f"合計重さ: {total_weight}kg / {capacity}kg")
print(f"最大価値: {best_value}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="algorithm" lessonId="dynamic" />
      </div>
      <LessonNav lessons={lessons} currentId="dynamic" basePath="/learn/algorithm" />
    </div>
  );
}
