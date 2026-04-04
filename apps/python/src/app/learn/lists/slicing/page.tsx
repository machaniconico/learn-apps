import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lists");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">リスト・タプル レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スライス</h1>
        <p className="text-gray-400">リストや文字列の一部を切り出すスライス記法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">スライスの基本構文</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-3">
            スライスの構文は <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">リスト[start:stop:step]</code> です。
          </p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">start</code>：開始インデックス（省略時は先頭）</li>
            <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">stop</code>：終了インデックスの手前（省略時は末尾）</li>
            <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">step</code>：ステップ数（省略時は1）</li>
          </ul>
        </div>
        <PythonPlayground
          defaultCode={`lst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 基本スライス
print(lst[2:5])    # インデックス2から4まで
print(lst[:3])     # 先頭から3つ
print(lst[7:])     # インデックス7以降
print(lst[:])      # 全要素のコピー

# ステップ指定
print(lst[::2])    # 2つおきに取得（偶数インデックス）
print(lst[1::2])   # 奇数インデックス
print(lst[::-1])   # 逆順

# マイナスインデックス
print(lst[-3:])    # 末尾3つ
print(lst[:-3])    # 末尾3つを除く`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">スライスによる変更</h2>
        <p className="text-gray-400 mb-4">
          スライスは代入先として使うこともでき、複数要素を一度に置き換えられます。
        </p>
        <PythonPlayground
          defaultCode={`lst = [1, 2, 3, 4, 5]

# スライスへの代入（置き換え）
lst[1:3] = [20, 30]
print("置き換え後:", lst)

# スライスへの代入（要素数が変わってもOK）
lst[1:3] = [200, 300, 400]
print("要素数変更後:", lst)

# 文字列のスライス（文字列は変更不可）
text = "Hello, Python!"
print(text[7:13])   # "Python"
print(text[::-1])   # 逆順`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">実用的なスライスパターン</h2>
        <PythonPlayground
          defaultCode={`# ページネーション（1ページ5件表示）
items = list(range(1, 21))
page_size = 5

for page in range(1, 5):
    start = (page - 1) * page_size
    end = start + page_size
    print(f"ページ{page}: {items[start:end]}")

# リストの最初と最後を除く
data = [1, 2, 3, 4, 5, 6, 7, 8]
middle = data[1:-1]
print("中間部分:", middle)

# 偶数番目の要素のみ取得
words = ["a", "b", "c", "d", "e", "f"]
even_words = words[::2]
print("偶数番目:", even_words)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="lists" lessonId="slicing" />
      </div>
      <LessonNav lessons={lessons} currentId="slicing" basePath="/learn/lists" />
    </div>
  );
}
