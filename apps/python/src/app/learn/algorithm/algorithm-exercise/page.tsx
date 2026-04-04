import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">アルゴリズム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アルゴリズム演習</h1>
        <p className="text-gray-400">アルゴリズムを実装して解く競技プログラミング風問題</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">これまでの復習</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { term: "O(1) / O(n) / O(n²)", desc: "定数・線形・二乗時間。ループの重なりで決まる" },
            { term: "バブルソート", desc: "隣接比較の繰り返し。O(n²)。学習用" },
            { term: "マージソート", desc: "分割統治。常にO(n log n)で安定" },
            { term: "二分探索", desc: "ソート済み配列にO(log n)で探索" },
            { term: "再帰", desc: "基底ケース + 再帰ケース。ツリー・分割統治に強い" },
            { term: "動的計画法", desc: "部分問題をメモ化して指数時間を多項式に短縮" },
          ].map((item) => (
            <div key={item.term} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <code className="text-yellow-400 font-mono text-sm font-semibold">{item.term}</code>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習1: 重複を除いた最大部分配列和（カデーンのアルゴリズム）</h2>
        <p className="text-gray-300 mb-4">
          配列の連続する部分配列の中で、和が最大になるものを見つけるアルゴリズムです。
          動的計画法の考え方で O(n) で解けます。
        </p>
        <PythonPlayground
          defaultCode={`# カデーンのアルゴリズム（最大部分配列和）
def max_subarray(arr: list) -> tuple:
    """
    最大連続部分配列の和と、その範囲を返す
    計算量: O(n)
    """
    if not arr:
        return 0, 0, -1

    max_sum = current_sum = arr[0]
    start = end = temp_start = 0

    for i in range(1, len(arr)):
        if current_sum + arr[i] < arr[i]:
            # 新しい部分配列を開始した方が良い
            current_sum = arr[i]
            temp_start = i
        else:
            current_sum += arr[i]

        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i

    return max_sum, start, end

# テストケース
test_cases = [
    [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    [1, 2, 3, 4, 5],
    [-1, -2, -3, -4],
    [5, -3, 5],
    [0, -1, 0, 1],
]

for arr in test_cases:
    total, s, e = max_subarray(arr)
    subarray = arr[s:e+1]
    print(f"配列:        {arr}")
    print(f"最大部分配列: {subarray} (インデックス {s}〜{e})")
    print(f"最大和:      {total}")
    print()
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習2: コインチェンジ問題（DP）</h2>
        <p className="text-gray-300 mb-4">
          指定した金額をコインで支払うのに必要な最少枚数を求める問題です。
          動的計画法の典型問題のひとつです。
        </p>
        <PythonPlayground
          defaultCode={`def coin_change(coins: list, amount: int) -> int:
    """
    amount円を支払うのに必要なコインの最少枚数を返す
    支払えない場合は -1 を返す
    計算量: O(amount × len(coins))
    """
    # dp[i] = i円を支払うのに必要な最少枚数（不可能は無限大）
    INF = float("inf")
    dp = [INF] * (amount + 1)
    dp[0] = 0  # 0円に必要なコインは0枚

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] != INF:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != INF else -1

def coin_change_detail(coins: list, amount: int) -> tuple:
    """何枚ずつ使ったかも返すバージョン"""
    INF = float("inf")
    dp = [INF] * (amount + 1)
    used = [-1] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
                used[i] = coin

    if dp[amount] == INF:
        return -1, []

    # 使ったコインを逆追跡
    selected = []
    cur = amount
    while cur > 0:
        selected.append(used[cur])
        cur -= used[cur]

    return dp[amount], sorted(selected, reverse=True)

# 日本円の硬貨
coins_jp = [1, 5, 10, 50, 100, 500]
test_amounts = [11, 234, 789, 1000, 9999]

print("=== 日本円コイン [1, 5, 10, 50, 100, 500] ===")
for amount in test_amounts:
    count, detail = coin_change_detail(coins_jp, amount)
    print(f"{amount:>5}円: {count}枚 {detail}")

print()

# 特殊なコインで貪欲法が失敗する例
coins_special = [1, 3, 4]
amount = 6
count, detail = coin_change_detail(coins_special, amount)
greedy_detail = [4, 1, 1]  # 貪欲法では4+1+1=3枚
dp_detail = detail

print(f"=== コイン {coins_special} で {amount} 円 ===")
print(f"貪欲法（誤）: {greedy_detail} → {len(greedy_detail)}枚")
print(f"DP（正解）:   {dp_detail} → {count}枚")
print("3+3=6なのでDP法が正解（2枚）")
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習3: 素数判定とエラトステネスの篩</h2>
        <PythonPlayground
          defaultCode={`import math
import time

# 基本的な素数判定 O(sqrt(n))
def is_prime(n: int) -> bool:
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

# エラトステネスの篩 O(n log log n)
def sieve_of_eratosthenes(limit: int) -> list:
    """2からlimitまでの全素数を返す"""
    is_prime_arr = [True] * (limit + 1)
    is_prime_arr[0] = is_prime_arr[1] = False

    for i in range(2, int(math.sqrt(limit)) + 1):
        if is_prime_arr[i]:
            # iの倍数を全て「合成数」に
            for j in range(i * i, limit + 1, i):
                is_prime_arr[j] = False

    return [i for i, p in enumerate(is_prime_arr) if p]

# 基本判定で1000以下の素数を求める
t1 = time.perf_counter()
primes_naive = [n for n in range(2, 1001) if is_prime(n)]
t1 = (time.perf_counter() - t1) * 1000

# 篩で1000以下の素数を求める
t2 = time.perf_counter()
primes_sieve = sieve_of_eratosthenes(1000)
t2 = (time.perf_counter() - t2) * 1000

print(f"1000以下の素数の個数: {len(primes_sieve)}")
print(f"最初の20個: {primes_sieve[:20]}")
print(f"\\n基本判定: {t1:.3f}ms")
print(f"篩:       {t2:.3f}ms")
print(f"結果が一致: {primes_naive == primes_sieve}")

# 大きな範囲
primes_large = sieve_of_eratosthenes(100_000)
print(f"\\n10万以下の素数: {len(primes_large)}個")
print(f"最大の素数: {primes_large[-1]}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="algorithm" lessonId="algorithm-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="algorithm-exercise" basePath="/learn/algorithm" />
    </div>
  );
}
