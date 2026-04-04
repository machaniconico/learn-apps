import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ControlExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">制御構文演習</h1>
        <p className="text-gray-400">条件分岐とループを組み合わせた実践問題</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演習の目標</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          if/elif/else・for/while・break/continue・内包表記を組み合わせた実践的なプログラムを作成します。
          各演習を実行して動作を確認し、コードを読んで理解を深めましょう。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-start gap-2"><span className="text-blue-400">1.</span><span>FizzBuzz（条件分岐とループ）</span></li>
          <li className="flex items-start gap-2"><span className="text-blue-400">2.</span><span>素数の列挙（ループとbreak）</span></li>
          <li className="flex items-start gap-2"><span className="text-blue-400">3.</span><span>三角形の描画（ネストしたループ）</span></li>
          <li className="flex items-start gap-2"><span className="text-blue-400">4.</span><span>データ分析（内包表記と条件）</span></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習1: FizzBuzz</h2>
        <p className="text-gray-400 mb-4">古典的なプログラミング問題。条件分岐とforループを使って解きましょう。</p>
        <PythonPlayground defaultCode={`# FizzBuzz問題
# 1から30まで:
#   3の倍数 → "Fizz"
#   5の倍数 → "Buzz"
#   両方の倍数 → "FizzBuzz"
#   それ以外 → 数字

result = []
for i in range(1, 31):
    if i % 15 == 0:
        result.append("FizzBuzz")
    elif i % 3 == 0:
        result.append("Fizz")
    elif i % 5 == 0:
        result.append("Buzz")
    else:
        result.append(str(i))

# 5つずつ行に表示
for i in range(0, len(result), 5):
    print(" ".join(f"{x:8}" for x in result[i:i+5]))

# 内包表記バージョン
print("\\n内包表記版:")
fizzbuzz = [
    "FizzBuzz" if i % 15 == 0
    else "Fizz" if i % 3 == 0
    else "Buzz" if i % 5 == 0
    else str(i)
    for i in range(1, 16)
]
print(fizzbuzz)`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習2: 素数の列挙</h2>
        <p className="text-gray-400 mb-4">エラトステネスの篩で素数を効率的に見つけましょう。</p>
        <PythonPlayground defaultCode={`# エラトステネスの篩
def sieve_of_eratosthenes(limit):
    """limit以下の素数をすべて返す"""
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False

    i = 2
    while i * i <= limit:
        if is_prime[i]:
            # iの倍数をすべて非素数にする
            j = i * i
            while j <= limit:
                is_prime[j] = False
                j += i
        i += 1

    return [n for n in range(2, limit + 1) if is_prime[n]]

primes = sieve_of_eratosthenes(100)
print(f"100以下の素数: {len(primes)}個")
print(primes)

# 双子素数（差が2の素数のペア）
print("\\n双子素数（100以下）:")
twins = [(p, p+2) for p in primes if p+2 in primes]
for pair in twins:
    print(f"  {pair}")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習3: パターン描画</h2>
        <p className="text-gray-400 mb-4">ネストしたforループで三角形や図形を描画しましょう。</p>
        <PythonPlayground defaultCode={`# ネストしたループで図形を描画

# 直角三角形
print("=== 直角三角形 ===")
for i in range(1, 7):
    print("*" * i)

# 二等辺三角形
print("\\n=== 二等辺三角形 ===")
n = 6
for i in range(1, n + 1):
    spaces = " " * (n - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)

# ダイヤモンド型
print("\\n=== ダイヤモンド ===")
for i in range(1, 6):
    spaces = " " * (5 - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)
for i in range(4, 0, -1):
    spaces = " " * (5 - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習4: 成績データの分析</h2>
        <p className="text-gray-400 mb-4">内包表記と条件分岐を使って成績データを分析しましょう。</p>
        <PythonPlayground defaultCode={`# 成績データの分析
students = [
    {"name": "田中", "scores": [85, 92, 78, 88, 90]},
    {"name": "山田", "scores": [72, 68, 75, 80, 65]},
    {"name": "鈴木", "scores": [95, 98, 92, 97, 99]},
    {"name": "佐藤", "scores": [60, 55, 70, 65, 58]},
    {"name": "高橋", "scores": [88, 85, 90, 87, 92]},
]

# 各学生の平均を計算
print("=== 成績分析 ===")
results = []
for s in students:
    avg = sum(s["scores"]) / len(s["scores"])
    highest = max(s["scores"])
    lowest = min(s["scores"])
    results.append({
        "name": s["name"],
        "avg": avg,
        "highest": highest,
        "lowest": lowest,
    })

# 平均順にソート
results.sort(key=lambda x: x["avg"], reverse=True)

for rank, r in enumerate(results, 1):
    grade = "S" if r["avg"] >= 90 else "A" if r["avg"] >= 80 else "B" if r["avg"] >= 70 else "C"
    print(f"{rank}位: {r['name']:<4} 平均{r['avg']:.1f}点 [{grade}] (最高:{r['highest']} 最低:{r['lowest']})")

# クラス全体の統計
all_avgs = [r["avg"] for r in results]
print(f"\\nクラス平均: {sum(all_avgs)/len(all_avgs):.1f}点")
print(f"80点以上: {sum(1 for r in results if r['avg'] >= 80)}人")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="control-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="control-exercise" basePath="/learn/control" />
    </div>
  );
}
