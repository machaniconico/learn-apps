import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dicts");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">辞書・集合 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">frozenset</h1>
        <p className="text-gray-400">変更不可能な集合 frozenset とその用途を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">frozenset とは？</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">frozenset</code> は変更不可能（イミュータブル）な集合です。
            通常の <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">set</code> と同じ演算が使えますが、要素の追加・削除はできません。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-cyan-400 font-semibold mb-2">frozenset の特徴</p>
              <ul className="space-y-1 text-gray-300">
                <li>• 作成後に変更できない</li>
                <li>• ハッシュ可能（辞書のキーに使える）</li>
                <li>• 集合の要素に使える</li>
                <li>• set と同じ集合演算が使える</li>
              </ul>
            </div>
            <div>
              <p className="text-cyan-400 font-semibold mb-2">主な用途</p>
              <ul className="space-y-1 text-gray-300">
                <li>• 辞書のキーとして集合を使いたい時</li>
                <li>• 集合の集合を作りたい時</li>
                <li>• 変更されてほしくない定数集合</li>
                <li>• キャッシュや不変データの表現</li>
              </ul>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`# frozenset の基本
fs = frozenset([1, 2, 3, 4, 5])
print("frozenset:", fs)
print("型:", type(fs))

# 集合演算は使える
s = {3, 4, 5, 6, 7}
print("和集合:", fs | s)
print("積集合:", fs & s)
print("差集合:", fs - s)

# 変更しようとするとエラー
try:
    fs.add(6)
except AttributeError as e:
    print("エラー:", e)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">frozenset を辞書のキーに使う</h2>
        <PythonPlayground
          defaultCode={`# frozenset を辞書キーに使う（通常の set はキーに使えない）
# グループの組み合わせをキーとして使う例
group_scores = {
    frozenset(["田中", "鈴木"]): 95,
    frozenset(["佐藤", "山田"]): 87,
    frozenset(["田中", "佐藤"]): 91,
}

# 検索
team = frozenset(["田中", "鈴木"])
print(f"チームのスコア: {group_scores[team]}")

# frozenset の集合（set of frozensets）
allowed_pairs = {
    frozenset(["A", "B"]),
    frozenset(["C", "D"]),
    frozenset(["A", "C"]),
}

check = frozenset(["A", "B"])
print(f"{'A', 'B'} は許可されているか: {check in allowed_pairs}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">set と frozenset の比較</h2>
        <PythonPlayground
          defaultCode={`import sys

# メモリ使用量の比較
regular_set = set(range(1000))
frozen_set = frozenset(range(1000))

print(f"set のサイズ: {sys.getsizeof(regular_set)} bytes")
print(f"frozenset のサイズ: {sys.getsizeof(frozen_set)} bytes")

# ハッシュ可能かどうかの確認
try:
    h = hash(regular_set)
    print("set はハッシュ可能")
except TypeError:
    print("set はハッシュ不可（辞書キーに使えない）")

try:
    h = hash(frozen_set)
    print(f"frozenset はハッシュ可能（hash={h}）")
except TypeError:
    print("frozenset はハッシュ不可")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="dicts" lessonId="frozen-set" />
      </div>
      <LessonNav lessons={lessons} currentId="frozen-set" basePath="/learn/dicts" />
    </div>
  );
}
