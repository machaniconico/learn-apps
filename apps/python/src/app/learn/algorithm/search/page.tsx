import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmSearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">アルゴリズム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">探索アルゴリズム</h1>
        <p className="text-gray-400">線形探索・二分探索の実装と使いどころ</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">線形探索（Linear Search）</h2>
        <p className="text-gray-300 mb-4">
          配列の先頭から順番に目的の要素を探す最もシンプルな探索方法です。
          計算量は <code className="bg-gray-800 text-yellow-300 px-1 rounded">O(n)</code> で、
          最悪ケースでは全要素を確認します。
          <strong className="text-white">ソートされていないデータ</strong>にも使えるのがメリットです。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`def linear_search(arr: list, target) -> int:
    """線形探索 O(n) — 見つかればインデックス、なければ -1"""
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

arr = [5, 3, 8, 1, 9, 2, 7]
print(linear_search(arr, 8))   # 2
print(linear_search(arr, 99))  # -1`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">二分探索（Binary Search）</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">ソート済みの配列</strong>に使える高速な探索方法です。
          中央の要素と比較し、目的の値が左半分か右半分かを判定して探索範囲を半分に絞ります。
          計算量は <code className="bg-gray-800 text-yellow-300 px-1 rounded">O(log n)</code> です。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`def binary_search(arr: list, target) -> int:
    """二分探索 O(log n) — ソート済み配列が前提"""
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1   # 右半分を探索
        else:
            right = mid - 1  # 左半分を探索

    return -1  # 見つからない

arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 6))   # -1`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">二分探索の動作を可視化しよう</h2>
        <PythonPlayground
          defaultCode={`# 二分探索の各ステップを可視化

def binary_search_verbose(arr, target):
    """二分探索（各ステップを表示）"""
    left, right = 0, len(arr) - 1
    step = 0

    while left <= right:
        mid = (left + right) // 2
        step += 1

        # 現在の状態を可視化
        display = []
        for i, val in enumerate(arr):
            if i == left and i == right:
                display.append(f"[{val}]")
            elif i == mid:
                display.append(f"*{val}*")
            elif left <= i <= right:
                display.append(str(val))
            else:
                display.append(f"({val})")
        print(f"ステップ{step}: [{', '.join(display)}]")
        print(f"         left={left}, mid={mid}, right={right}, arr[mid]={arr[mid]}")

        if arr[mid] == target:
            print(f"→ 発見！ インデックス {mid}")
            return mid
        elif arr[mid] < target:
            print(f"→ {arr[mid]} < {target} なので右半分へ")
            left = mid + 1
        else:
            print(f"→ {arr[mid]} > {target} なので左半分へ")
            right = mid - 1

    print(f"→ 見つからない")
    return -1

arr = list(range(2, 30, 2))  # [2, 4, 6, ..., 28]
print(f"配列: {arr}")
print(f"配列の長さ: {len(arr)}")
print()

target = 14
print(f"=== {target} を探索 ===")
binary_search_verbose(arr, target)

print()
target2 = 11
print(f"=== {target2} を探索（存在しない）===")
binary_search_verbose(arr, target2)
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">bisectモジュール — Pythonの二分探索</h2>
        <PythonPlayground
          defaultCode={`import bisect

# Python標準の二分探索モジュール
arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

# 挿入位置を返す
pos = bisect.bisect_left(arr, 7)
print(f"7 の位置（bisect_left）: {pos}")  # 3

# 要素が存在するか確認
def contains(arr, target):
    pos = bisect.bisect_left(arr, target)
    return pos < len(arr) and arr[pos] == target

print(f"7 が存在する: {contains(arr, 7)}")    # True
print(f"6 が存在する: {contains(arr, 6)}")    # False

# 挿入してソートを維持
bisect.insort(arr, 6)
print(f"\\n6 を挿入後: {arr}")

# 応用: スコアからランクを判定
def get_rank(score: int) -> str:
    thresholds = [60, 70, 80, 90]
    ranks = ["F", "C", "B", "A", "S"]
    return ranks[bisect.bisect_left(thresholds, score)]

test_scores = [55, 60, 75, 80, 95, 100]
for s in test_scores:
    print(f"スコア {s:>3}: ランク {get_rank(s)}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="algorithm" lessonId="search" />
      </div>
      <LessonNav lessons={lessons} currentId="search" basePath="/learn/algorithm" />
    </div>
  );
}
