import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dataformats");

export default function CsvPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">データ形式 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CSV処理</h1>
        <p className="text-gray-400">
          CSVはスプレッドシートやデータベースと互換性が高く、データ分析で頻繁に使われます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">csv</code> モジュールを使った高度な操作を学びましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">CSV の読み込みと変換</h2>
        <PythonPlayground
          defaultCode={`import csv
import io
from collections import defaultdict

# 売上データの CSV
sales_csv = """日付,商品,カテゴリ,数量,単価
2024-01-15,りんご,果物,100,150
2024-01-15,バナナ,果物,200,80
2024-01-16,キャベツ,野菜,50,120
2024-01-16,トマト,野菜,80,200
2024-01-17,りんご,果物,120,150
2024-01-17,牛乳,乳製品,60,200
2024-01-18,バナナ,果物,180,80
2024-01-18,チーズ,乳製品,30,450"""

reader = csv.DictReader(io.StringIO(sales_csv))
rows = list(reader)

# カテゴリ別売上集計
by_category = defaultdict(lambda: {"数量": 0, "売上": 0})
for row in rows:
    cat = row["カテゴリ"]
    qty = int(row["数量"])
    price = int(row["単価"])
    by_category[cat]["数量"] += qty
    by_category[cat]["売上"] += qty * price

print("カテゴリ別売上:")
total = 0
for cat, data in sorted(by_category.items()):
    revenue = data["売上"]
    total += revenue
    print(f"  {cat}: {data['数量']}個, {revenue:,}円")
print(f"合計: {total:,}円")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">CSV の書き込みとフォーマット</h2>
        <PythonPlayground
          defaultCode={`import csv
import io

# 集計結果を CSV に書き出す
summary_data = [
    {"カテゴリ": "果物", "商品数": 2, "総数量": 600, "総売上": 61000},
    {"カテゴリ": "野菜", "商品数": 2, "総数量": 130, "総売上": 22000},
    {"カテゴリ": "乳製品", "商品数": 2, "総数量": 90, "総売上": 25500},
]

# 標準 CSV
output = io.StringIO()
writer = csv.DictWriter(output, fieldnames=["カテゴリ", "商品数", "総数量", "総売上"])
writer.writeheader()
writer.writerows(summary_data)
output.seek(0)
print("=== 標準 CSV ===")
print(output.read())

# TSV（タブ区切り）
output2 = io.StringIO()
writer2 = csv.DictWriter(
    output2,
    fieldnames=["カテゴリ", "商品数", "総数量", "総売上"],
    delimiter="\\t"
)
writer2.writeheader()
writer2.writerows(summary_data)
output2.seek(0)
print("=== TSV（タブ区切り）===")
for line in output2.getvalue().split("\\n"):
    print(repr(line))
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="dataformats" lessonId="csv" />
      </div>
      <LessonNav lessons={lessons} currentId="csv" basePath="/learn/dataformats" />
    </div>
  );
}
