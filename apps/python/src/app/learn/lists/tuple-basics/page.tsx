import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lists");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">リスト・タプル レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">タプルの基本</h1>
        <p className="text-gray-400">変更不可能なシーケンスであるタプルの使い方を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">タプルとは？</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            タプルは丸括弧 <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">()</code> で作成するイミュータブル（変更不可能）なシーケンスです。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-orange-400 font-semibold mb-2">タプルの特徴</p>
              <ul className="space-y-1 text-gray-300">
                <li>• 変更不可能（イミュータブル）</li>
                <li>• リストより高速・省メモリ</li>
                <li>• 辞書のキーに使える</li>
                <li>• 変更されないデータに適している</li>
              </ul>
            </div>
            <div>
              <p className="text-orange-400 font-semibold mb-2">使いどころ</p>
              <ul className="space-y-1 text-gray-300">
                <li>• 座標や RGB 値など固定データ</li>
                <li>• 関数の複数戻り値</li>
                <li>• 定数的なデータの保持</li>
                <li>• 辞書のキーとして使いたい時</li>
              </ul>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`# タプルの作成
point = (3, 7)
rgb = (255, 128, 0)
single = (42,)  # 要素が1つのタプルはカンマが必要

print("座標:", point)
print("RGB:", rgb)
print("単一要素:", single)
print("型:", type(point))

# 括弧なしでも作れる
coords = 10, 20
print("括弧なし:", coords, type(coords))

# インデックスアクセス（リストと同じ）
print("x座標:", point[0])
print("y座標:", point[1])`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">タプルの操作と制限</h2>
        <PythonPlayground
          defaultCode={`# タプルの操作
colors = ("赤", "青", "緑", "青", "黄")

# 読み取りは可能
print("要素数:", len(colors))
print("インデックス:", colors.index("青"))
print("個数:", colors.count("青"))
print("スライス:", colors[1:3])

# 変更しようとするとエラー
try:
    colors[0] = "紫"
except TypeError as e:
    print("エラー:", e)

# タプルはイミュータブルだが、内包するリストは変更可能
t = ([1, 2, 3], [4, 5, 6])
t[0].append(99)
print("タプル内のリストを変更:", t)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">タプルの用途：関数の複数戻り値</h2>
        <PythonPlayground
          defaultCode={`# 関数から複数の値を返す（タプルとして返される）
def get_min_max(numbers):
    return min(numbers), max(numbers)

def divmod_custom(a, b):
    return a // b, a % b

data = [5, 2, 8, 1, 9, 3, 7]
minimum, maximum = get_min_max(data)
print(f"最小値: {minimum}, 最大値: {maximum}")

quotient, remainder = divmod_custom(17, 5)
print(f"17 ÷ 5 = {quotient} 余り {remainder}")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="lists" lessonId="tuple-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="tuple-basics" basePath="/learn/lists" />
    </div>
  );
}
