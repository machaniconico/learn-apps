import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lists");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">リスト・タプル レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リストの基本</h1>
        <p className="text-gray-400">リストの作成・アクセス・更新の基礎を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">リストとは？</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            リストは複数の値を順番に格納できるデータ構造です。角括弧 <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">[]</code> を使って作成し、異なる型の値を混在させることもできます。
          </p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• 順序があり、インデックスでアクセスできる</li>
            <li>• 同じ値を複数回格納できる（重複可）</li>
            <li>• 要素の追加・削除・変更が可能（ミュータブル）</li>
            <li>• 異なる型の要素を混在させることができる</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">リストの作成とインデックスアクセス</h2>
        <p className="text-gray-400 mb-4">
          インデックスは <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">0</code> から始まります。マイナスのインデックスを使うと末尾から数えることができます。
        </p>
        <PythonPlayground
          defaultCode={`# リストの作成
fruits = ["りんご", "バナナ", "みかん", "ぶどう", "いちご"]

# インデックスアクセス（0始まり）
print(fruits[0])   # 最初の要素
print(fruits[1])   # 2番目の要素
print(fruits[-1])  # 最後の要素
print(fruits[-2])  # 後ろから2番目

# 要素数
print("要素数:", len(fruits))

# 型が混在するリスト
mixed = [1, "hello", 3.14, True, None]
print("混在リスト:", mixed)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">リストの変更</h2>
        <p className="text-gray-400 mb-4">
          リストはミュータブルなので、インデックスを使って要素を変更できます。
        </p>
        <PythonPlayground
          defaultCode={`# リストの変更
colors = ["赤", "青", "緑"]
print("変更前:", colors)

# インデックス指定で変更
colors[1] = "黄"
print("変更後:", colors)

# 要素の存在確認
print("赤 は含まれる?", "赤" in colors)
print("青 は含まれる?", "青" in colors)

# リストのコピー
colors_copy = colors.copy()
colors_copy[0] = "紫"
print("元のリスト:", colors)
print("コピー:", colors_copy)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="lists" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/lists" />
    </div>
  );
}
