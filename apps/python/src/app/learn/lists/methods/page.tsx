import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lists");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">リスト・タプル レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リストのメソッド</h1>
        <p className="text-gray-400">append・remove・sort など主要メソッドの使い方を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">要素の追加メソッド</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">append(x)</code>
              <span className="text-gray-300">末尾に要素 x を追加する</span>
            </div>
            <div className="flex gap-3">
              <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">insert(i, x)</code>
              <span className="text-gray-300">インデックス i の位置に x を挿入する</span>
            </div>
            <div className="flex gap-3">
              <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">extend(iterable)</code>
              <span className="text-gray-300">別のイテラブルの全要素を末尾に追加する</span>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`nums = [1, 2, 3]

# append: 末尾に追加
nums.append(4)
print("append後:", nums)

# insert: 位置を指定して挿入
nums.insert(0, 0)  # 先頭に0を挿入
print("insert後:", nums)

# extend: 別のリストを結合
nums.extend([5, 6, 7])
print("extend後:", nums)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">要素の削除メソッド</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">remove(x)</code>
              <span className="text-gray-300">最初に見つかった値 x を削除する</span>
            </div>
            <div className="flex gap-3">
              <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">pop(i)</code>
              <span className="text-gray-300">インデックス i の要素を取り出して削除する（省略時は末尾）</span>
            </div>
            <div className="flex gap-3">
              <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">clear()</code>
              <span className="text-gray-300">すべての要素を削除する</span>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`fruits = ["りんご", "バナナ", "みかん", "バナナ", "ぶどう"]

# remove: 値を指定して削除（最初の1つ）
fruits.remove("バナナ")
print("remove後:", fruits)

# pop: インデックス指定で取り出し
removed = fruits.pop(1)
print("取り出した要素:", removed)
print("pop後:", fruits)

# del文でも削除できる
del fruits[0]
print("del後:", fruits)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">整列・検索メソッド</h2>
        <PythonPlayground
          defaultCode={`numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

# sort: 昇順にソート（元のリストを変更）
numbers.sort()
print("昇順:", numbers)

numbers.sort(reverse=True)
print("降順:", numbers)

# sorted: 新しいソート済みリストを返す
original = [3, 1, 4, 1, 5, 9]
sorted_list = sorted(original)
print("元のリスト:", original)  # 変更されない
print("sorted:", sorted_list)

# index: 要素の位置を検索
nums = [10, 20, 30, 20, 40]
print("20の位置:", nums.index(20))   # 最初の位置
print("20の個数:", nums.count(20))   # 出現回数

# reverse: 逆順にする
lst = [1, 2, 3, 4, 5]
lst.reverse()
print("逆順:", lst)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="lists" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/lists" />
    </div>
  );
}
