import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lists");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">リスト・タプル レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">enumerate・zip</h1>
        <p className="text-gray-400">インデックス付き反復とシーケンスの結合を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">enumerate() 関数</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-3">
            <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">enumerate(iterable, start=0)</code> は
            ループ時に <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">(インデックス, 値)</code> のタプルを返します。
            手動でカウンター変数を管理する必要がなくなります。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`fruits = ["りんご", "バナナ", "みかん", "ぶどう"]

# enumerate なしの場合
print("--- enumerate なし ---")
i = 0
for fruit in fruits:
    print(f"{i}: {fruit}")
    i += 1

# enumerate を使う（スッキリ！）
print("\n--- enumerate を使う ---")
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# start 引数で開始番号を変更
print("\n--- 1から始める ---")
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}番目: {fruit}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">zip() 関数</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300">
            <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">zip(iter1, iter2, ...)</code> は
            複数のイテラブルを要素ごとにペアにして返します。最も短いイテラブルの長さで終了します。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`names = ["田中", "鈴木", "佐藤"]
scores = [90, 85, 92]
cities = ["東京", "大阪", "名古屋"]

# 2つのリストを結合
for name, score in zip(names, scores):
    print(f"{name}: {score}点")

# 3つのリストを結合
print()
for name, score, city in zip(names, scores, cities):
    print(f"{name}（{city}）: {score}点")

# zip でリストを辞書に変換
d = dict(zip(names, scores))
print("\n辞書:", d)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">enumerate と zip の組み合わせ</h2>
        <PythonPlayground
          defaultCode={`# enumerate と zip の組み合わせ
questions = ["Pythonの開発者は？", "Pythonの最新バージョンは？"]
answers = ["グイド・ヴァンロッサム", "3.x系"]

print("クイズ")
print("=" * 30)
for i, (q, a) in enumerate(zip(questions, answers), start=1):
    print(f"Q{i}: {q}")
    print(f"A{i}: {a}")
    print()

# zip の逆操作（unzip）
pairs = [("a", 1), ("b", 2), ("c", 3)]
keys, values = zip(*pairs)
print("キー:", keys)
print("値:", values)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="lists" lessonId="enumerate-zip" />
      </div>
      <LessonNav lessons={lessons} currentId="enumerate-zip" basePath="/learn/lists" />
    </div>
  );
}
