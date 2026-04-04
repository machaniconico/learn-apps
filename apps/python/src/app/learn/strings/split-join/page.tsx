import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">文字列操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">split・join</h1>
        <p className="text-gray-400">文字列の分割と結合の使いどころを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">split() で文字列を分割する</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-3">
            <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">str.split(sep, maxsplit)</code> で文字列をリストに分割します。
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>• <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">sep</code>：区切り文字（省略時は空白文字）</li>
            <li>• <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">maxsplit</code>：最大分割回数（省略時は無制限）</li>
            <li>• <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">rsplit()</code>：右から分割する版</li>
          </ul>
        </div>
        <PythonPlayground
          defaultCode={`# split の基本
csv_line = "田中,25,東京,エンジニア"
fields = csv_line.split(",")
print(fields)
print(f"名前: {fields[0]}, 年齢: {fields[1]}")

# 区切り文字なし（空白で分割）
sentence = "  Hello   Python   World  "
words = sentence.split()  # 連続空白もまとめて分割
print(words)

# maxsplit で分割回数を制限
text = "aaa:bbb:ccc:ddd"
print(text.split(":", 2))  # 最大2回分割

# splitlines で改行で分割
multiline = "1行目\n2行目\n3行目"
print(multiline.splitlines())`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">join() でリストを文字列に結合する</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300">
            <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">"区切り".join(iterable)</code> でイテラブルの要素を結合した文字列を返します。
            すべての要素が文字列である必要があります。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# join の基本
words = ["Python", "は", "楽しい"]
print(" ".join(words))       # スペース区切り
print("、".join(words))      # 読点区切り
print("".join(words))        # 区切りなし

# リストのパス結合
path_parts = ["usr", "local", "bin", "python3"]
print("/".join(path_parts))

# CSVの生成
row = ["田中", "25", "東京"]
csv_row = ",".join(row)
print(csv_row)

# 数値リストは文字列に変換が必要
numbers = [1, 2, 3, 4, 5]
print("-".join(str(n) for n in numbers))`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">split と join の組み合わせ</h2>
        <PythonPlayground
          defaultCode={`# 文字列の変換パターン
# スペースをアンダースコアに変換
name = "田中 太郎"
snake = "_".join(name.split())
print(snake)

# キャメルケース → スネークケース（簡易版）
camel = "myVariableName"
import re
snake = "_".join(re.findall('[A-Z]?[a-z]+|[A-Z]+(?=[A-Z]|$)', camel)).lower()
print(snake)

# CSVの読み書き
data = [
    ["名前", "年齢", "都市"],
    ["田中", "25", "東京"],
    ["鈴木", "30", "大阪"],
]

csv_text = "\n".join(",".join(row) for row in data)
print("CSV出力:")
print(csv_text)

print("\nCSV解析:")
for line in csv_text.splitlines():
    fields = line.split(",")
    print(fields)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="strings" lessonId="split-join" />
      </div>
      <LessonNav lessons={lessons} currentId="split-join" basePath="/learn/strings" />
    </div>
  );
}
