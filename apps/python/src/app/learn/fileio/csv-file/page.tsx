import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function CsvFilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CSVファイル操作</h1>
        <p className="text-gray-400">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">csv</code> モジュールを使ってCSV（コンマ区切り値）ファイルの
          読み書きをする方法を学びます。スプレッドシートやデータベースとの連携で頻繁に使われます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">CSV の基本形式</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">data.csv</div>
          <div className="p-4 font-mono text-sm text-gray-300">
            <p>名前,年齢,都市,スコア</p>
            <p>田中太郎,28,東京,92</p>
            <p>鈴木花子,32,大阪,88</p>
            <p>&quot;山田, 一郎&quot;,25,名古屋,95</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          コンマを含む値は <code className="text-orange-400 bg-gray-800 px-1 rounded">&quot;&quot;</code>（ダブルクォート）で囲みます。
          csv モジュールがこの処理を自動で行います。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">csv.reader と csv.DictReader</h2>
        <PythonPlayground
          defaultCode={`import csv
import io

csv_data = """名前,年齢,都市,スコア
田中太郎,28,東京,92
鈴木花子,32,大阪,88
佐藤一郎,25,名古屋,95
山田美咲,29,福岡,79"""

print("=== csv.reader ===")
reader = csv.reader(io.StringIO(csv_data))
header = next(reader)
print(f"ヘッダー: {header}")
for row in reader:
    print(f"  {row}")

print()
print("=== csv.DictReader ===")
reader = csv.DictReader(io.StringIO(csv_data))
for row in reader:
    print(f"  {row['名前']}（{row['年齢']}歳, {row['都市']}）: {row['スコア']}点")

print()
print("=== 集計 ===")
reader = csv.DictReader(io.StringIO(csv_data))
rows = list(reader)
scores = [int(r["スコア"]) for r in rows]
print(f"平均スコア: {sum(scores)/len(scores):.1f}点")
print(f"最高スコア: {max(scores)}点（{rows[scores.index(max(scores))]['名前']}）")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">csv.writer と csv.DictWriter</h2>
        <PythonPlayground
          defaultCode={`import csv
import io

# csv.writer で書き込む
print("=== csv.writer ===")
output = io.StringIO()
writer = csv.writer(output, quoting=csv.QUOTE_MINIMAL)
writer.writerow(["ID", "商品名", "価格"])
writer.writerows([
    [1, "りんご", 150],
    [2, "バナナ", 80],
    [3, "みかん、八朔", 200],  # コンマを含む値は自動でクォート
])
output.seek(0)
print(output.read())

# csv.DictWriter で書き込む
print("=== csv.DictWriter ===")
output2 = io.StringIO()
fieldnames = ["名前", "部署", "給与"]
writer2 = csv.DictWriter(output2, fieldnames=fieldnames)
writer2.writeheader()
writer2.writerows([
    {"名前": "田中太郎", "部署": "開発", "給与": 450000},
    {"名前": "鈴木花子", "部署": "営業", "給与": 380000},
])
output2.seek(0)
print(output2.read())
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="fileio" lessonId="csv-file" />
      </div>
      <LessonNav lessons={lessons} currentId="csv-file" basePath="/learn/fileio" />
    </div>
  );
}
