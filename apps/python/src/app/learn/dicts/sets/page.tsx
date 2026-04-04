import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dicts");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">辞書・集合 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">集合（set）</h1>
        <p className="text-gray-400">重複なし・順序なしのデータ構造 set の使い方を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">集合の基本</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            集合（<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">set</code>）は重複のないユニークな要素のコレクションです。
            数学の集合と同様の演算（和・積・差など）が使えます。
          </p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• 重複した値を自動的に除去する</li>
            <li>• 順序を持たない（インデックスアクセス不可）</li>
            <li>• 要素の追加・削除が可能（ミュータブル）</li>
            <li>• 存在確認が非常に高速（O(1)）</li>
          </ul>
        </div>
        <PythonPlayground
          defaultCode={`# 集合の作成
s1 = {1, 2, 3, 4, 5}
s2 = set([3, 4, 5, 6, 7])  # リストから作成

print("s1:", s1)
print("s2:", s2)

# 重複は自動除去
dupes = {1, 2, 2, 3, 3, 3, 4}
print("重複除去:", dupes)

# リストの重複除去に活用
words = ["apple", "banana", "apple", "cherry", "banana"]
unique = list(set(words))
print("ユニーク:", unique)

# 存在確認（高速）
print(3 in s1)
print(10 in s1)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">集合の演算</h2>
        <PythonPlayground
          defaultCode={`a = {1, 2, 3, 4, 5}
b = {3, 4, 5, 6, 7}

# 和集合（どちらかに含まれる）
print("和集合 (a | b):", a | b)
print("和集合 (union):", a.union(b))

# 積集合（両方に含まれる）
print("積集合 (a & b):", a & b)
print("積集合 (intersection):", a.intersection(b))

# 差集合（aにあってbにない）
print("差集合 (a - b):", a - b)
print("差集合 (difference):", a.difference(b))

# 対称差（どちらか一方にのみ含まれる）
print("対称差 (a ^ b):", a ^ b)

# 部分集合・上位集合の確認
c = {1, 2, 3}
print(f"{c} は {a} の部分集合？", c.issubset(a))
print(f"{a} は {c} の上位集合？", a.issuperset(c))`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">集合の要素操作</h2>
        <PythonPlayground
          defaultCode={`s = {1, 2, 3}

# 要素の追加
s.add(4)
print("add後:", s)

# 要素の削除
s.remove(2)   # なければ KeyError
print("remove後:", s)

s.discard(10)  # なくてもエラーにならない
print("discard後:", s)

# 集合内包表記
squares = {x**2 for x in range(1, 6)}
print("二乗の集合:", squares)

evens = {x for x in range(20) if x % 2 == 0}
print("偶数集合:", evens)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="dicts" lessonId="sets" />
      </div>
      <LessonNav lessons={lessons} currentId="sets" basePath="/learn/dicts" />
    </div>
  );
}
