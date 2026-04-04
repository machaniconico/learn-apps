import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmRecursionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">アルゴリズム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰</h1>
        <p className="text-gray-400">関数が自分自身を呼び出す再帰アルゴリズムの設計</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">再帰とは何か</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">再帰（Recursion）</strong>は、関数が自分自身を呼び出す技法です。
          複雑な問題を<strong className="text-white">同じ構造を持つより小さな問題</strong>に分割して解くのに適しています。
        </p>
        <p className="text-gray-300 mb-4">
          再帰関数には必ず2つの要素が必要です：
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h3 className="text-green-400 font-semibold mb-2">基底ケース（Base Case）</h3>
            <p className="text-gray-300 text-sm">再帰を止める条件。これがないと無限ループになる</p>
            <pre className="text-gray-300 text-xs font-mono mt-2">{`if n == 0:
    return 1  # ← 基底ケース`}</pre>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-2">再帰ケース（Recursive Case）</h3>
            <p className="text-gray-300 text-sm">問題を小さくして自分自身を呼び出す</p>
            <pre className="text-gray-300 text-xs font-mono mt-2">{`return n * factorial(n - 1)
# ↑ 問題を小さくして再帰`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">再帰の基本例：階乗とフィボナッチ</h2>
        <PythonPlayground
          defaultCode={`import sys
sys.setrecursionlimit(1000)

# 階乗: n! = n × (n-1) × ... × 1
def factorial(n: int) -> int:
    if n == 0 or n == 1:  # 基底ケース
        return 1
    return n * factorial(n - 1)  # 再帰ケース

print("=== 階乗 ===")
for i in range(0, 11):
    print(f"{i}! = {factorial(i)}")

print()

# フィボナッチ数列: F(n) = F(n-1) + F(n-2)
def fibonacci(n: int) -> int:
    if n <= 1:           # 基底ケース
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)  # 再帰ケース

print("=== フィボナッチ（ナイーブな再帰）===")
print("最初の15個:", [fibonacci(i) for i in range(15)])

# 再帰の呼び出し回数を確認
call_count = 0
def fibonacci_counted(n: int) -> int:
    global call_count
    call_count += 1
    if n <= 1:
        return n
    return fibonacci_counted(n - 1) + fibonacci_counted(n - 2)

call_count = 0
result = fibonacci_counted(10)
print(f"\\nfibonacci(10) = {result}")
print(f"呼び出し回数: {call_count} 回（非効率！）")
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">再帰の応用：ハノイの塔とフォルダ探索</h2>
        <PythonPlayground
          defaultCode={`# ハノイの塔: 再帰が最もエレガントに解ける問題の1つ
def hanoi(n: int, source: str, target: str, auxiliary: str) -> None:
    """n枚の円盤をsourceからtargetに移動"""
    if n == 1:
        print(f"  円盤 1: {source} → {target}")
        return
    # n-1枚を補助塔に移動
    hanoi(n - 1, source, auxiliary, target)
    # 一番大きい円盤を移動
    print(f"  円盤 {n}: {source} → {target}")
    # n-1枚を補助塔から目標塔に移動
    hanoi(n - 1, auxiliary, target, source)

print("=== ハノイの塔（3枚）===")
hanoi(3, "A", "C", "B")
print(f"必要な手数: {2**3 - 1} 手（2^n - 1）")

print()

# ツリー構造の探索（再帰が自然）
def tree_sum(node) -> int:
    """ツリーの全ノードの値を合計する"""
    if node is None:
        return 0
    return node["value"] + tree_sum(node.get("left")) + tree_sum(node.get("right"))

def tree_depth(node) -> int:
    """ツリーの深さを求める"""
    if node is None:
        return 0
    return 1 + max(tree_depth(node.get("left")), tree_depth(node.get("right")))

# バイナリツリー
tree = {
    "value": 1,
    "left": {
        "value": 2,
        "left": {"value": 4, "left": None, "right": None},
        "right": {"value": 5, "left": None, "right": None},
    },
    "right": {
        "value": 3,
        "left": {"value": 6, "left": None, "right": None},
        "right": None,
    },
}

print("=== バイナリツリーの探索 ===")
print(f"合計: {tree_sum(tree)}")    # 1+2+3+4+5+6=21
print(f"深さ: {tree_depth(tree)}")  # 3
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="algorithm" lessonId="recursion" />
      </div>
      <LessonNav lessons={lessons} currentId="recursion" basePath="/learn/algorithm" />
    </div>
  );
}
