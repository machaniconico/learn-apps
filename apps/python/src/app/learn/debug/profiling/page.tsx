import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugProfilingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロファイリング</h1>
        <p className="text-gray-400">cProfileとtimeitを使ってボトルネックを特定し、コードを最適化する方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">プロファイリングとは</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          プロファイリングはプログラムの実行時間や呼び出し回数を計測し、
          パフォーマンスのボトルネック（最も時間がかかっている部分）を特定する技術です。
          「推測で最適化せず、計測してから最適化する」がパフォーマンス改善の鉄則です。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-orange-400 font-semibold mb-2">cProfile</h3>
            <p className="text-gray-400 text-sm">関数単位で実行時間・呼び出し回数を計測する標準ライブラリのプロファイラ。</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-orange-400 font-semibold mb-2">timeit</h3>
            <p className="text-gray-400 text-sm">小さなコード片の実行時間を精密に計測するためのモジュール。</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">timeitで実行時間を計測しよう</h2>
        <PythonPlayground defaultCode={`import timeit
import time

# 2つのアプローチの速度比較

# アプローチ1: リストを使った文字列連結（遅い）
def concat_with_plus(n):
    result = ""
    for i in range(n):
        result += str(i)
    return result

# アプローチ2: joinを使った文字列連結（速い）
def concat_with_join(n):
    return "".join(str(i) for i in range(n))

# アプローチ3: f-stringを使う
def concat_with_list(n):
    parts = []
    for i in range(n):
        parts.append(str(i))
    return "".join(parts)

n = 1000

# timeitで計測
t1 = timeit.timeit(lambda: concat_with_plus(n), number=100)
t2 = timeit.timeit(lambda: concat_with_join(n), number=100)
t3 = timeit.timeit(lambda: concat_with_list(n), number=100)

print(f"文字列連結の速度比較（n={n}, 100回実行）:")
print(f"  += 演算子:  {t1:.4f}秒")
print(f"  join():     {t2:.4f}秒")
print(f"  list+join:  {t3:.4f}秒")
print(f"\\n速度改善率: {t1/t2:.1f}倍")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">cProfileでボトルネックを特定する</h2>
        <PythonPlayground defaultCode={`import cProfile
import pstats
import io

# ボトルネックのある関数群
def slow_fibonacci(n):
    """再帰による遅いフィボナッチ（指数時間）"""
    if n <= 1:
        return n
    return slow_fibonacci(n - 1) + slow_fibonacci(n - 2)

def fast_fibonacci(n):
    """メモ化による高速フィボナッチ（線形時間）"""
    memo = {}
    def fib(k):
        if k in memo:
            return memo[k]
        if k <= 1:
            return k
        memo[k] = fib(k - 1) + fib(k - 2)
        return memo[k]
    return fib(n)

# cProfileで計測
def profile_target():
    slow_fibonacci(28)  # 遅い版
    fast_fibonacci(100)  # 速い版

# プロファイリング実行
pr = cProfile.Profile()
pr.enable()
profile_target()
pr.disable()

# 結果を整形して表示
stream = io.StringIO()
stats = pstats.Stats(pr, stream=stream)
stats.sort_stats('cumulative')
stats.print_stats(10)  # 上位10件表示

output = stream.getvalue()
print("cProfileの結果（上位行）:")
for line in output.split('\\n')[:20]:
    print(line)`} />
      </section>

      <LessonCompleteButton categoryId="debug" lessonId="profiling" />
      <LessonNav lessons={lessons} currentId="profiling" basePath="/learn/debug" />
    </div>
  );
}
