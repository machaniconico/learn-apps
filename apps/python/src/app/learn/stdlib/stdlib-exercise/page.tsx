import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function StdlibExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">標準ライブラリ演習</h1>
        <p className="text-gray-400">
          os・datetime・collections・itertools・pathlib・math・jsonを組み合わせた実践的な問題に取り組みましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1: 単語頻度分析</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">collections.Counter</code> を使って
          テキスト中の単語の出現頻度を分析し、上位5語を表示してください。
        </p>
        <PythonPlayground
          defaultCode={`from collections import Counter
import re

text = """
Python is a versatile programming language.
Python is used for web development, data science, and automation.
Python is easy to learn and read. Many developers love Python.
The Python community is large and welcoming.
"""

# TODO: 以下を実装してください
# 1. テキストを小文字に変換
# 2. 単語のリストに分割（re.findall を使う）
# 3. Counter で出現回数を数える
# 4. 上位5語を表示

# ヒント:
# words = re.findall(r'[a-z]+', text.lower())
# counter = Counter(words)
# for word, count in counter.most_common(5):
#     print(f"{word}: {count}回")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2: 日付範囲の生成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">datetime</code> と
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">itertools</code> を使って、
          指定した期間の全日付をリストで返す関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`from datetime import date, timedelta
import itertools

def date_range(start: date, end: date):
    """start から end（含む）までの全日付をリストで返す"""
    # TODO: 実装してください
    # ヒント: timedelta(days=1) を使って1日ずつ増やす
    pass

# テスト
start = date(2024, 3, 28)
end = date(2024, 4, 3)
dates = date_range(start, end)

if dates:
    print(f"期間: {start} 〜 {end} ({len(dates)}日間)")
    for d in dates:
        weekday = ["月", "火", "水", "木", "金", "土", "日"][d.weekday()]
        print(f"  {d.strftime('%m/%d')} ({weekday})")
else:
    print("date_range 関数を実装してください")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3: JSON データの集計</h2>
        <p className="text-gray-400 mb-4">
          JSON形式の売上データを集計し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">defaultdict</code> を使ってカテゴリごとの合計を計算してください。
        </p>
        <PythonPlayground
          defaultCode={`import json
from collections import defaultdict

json_data = '''[
    {"product": "りんご", "category": "果物", "price": 150, "qty": 10},
    {"product": "バナナ", "category": "果物", "price": 80, "qty": 20},
    {"product": "キャベツ", "category": "野菜", "price": 120, "qty": 5},
    {"product": "トマト", "category": "野菜", "price": 200, "qty": 8},
    {"product": "牛乳", "category": "乳製品", "price": 200, "qty": 15},
    {"product": "チーズ", "category": "乳製品", "price": 450, "qty": 3}
]'''

# TODO: 実装してください
# 1. JSON を Python オブジェクトに変換
# 2. defaultdict(int) でカテゴリごとの合計金額を集計
# 3. カテゴリ名と合計金額を表示

# 期待する出力例:
# 果物: 2,100円
# 野菜: 2,200円
# 乳製品: 4,350円
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習4: 数学計算ユーティリティ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">math</code> モジュールを使って、
          数値リストの統計情報（平均・標準偏差・中央値）を計算する関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import math

def statistics_summary(nums: list) -> dict:
    """数値リストの基本統計量を返す"""
    if not nums:
        return {}

    n = len(nums)
    mean = sum(nums) / n

    # TODO: 標準偏差を計算
    # variance = sum((x - mean) ** 2 for x in nums) / n
    # std_dev = math.sqrt(variance)

    # TODO: 中央値を計算
    # sorted_nums = sorted(nums)
    # if n % 2 == 1:
    #     median = sorted_nums[n // 2]
    # else:
    #     median = (sorted_nums[n//2-1] + sorted_nums[n//2]) / 2

    return {
        "count": n,
        "mean": mean,
        # "std_dev": std_dev,
        # "median": median,
        "min": min(nums),
        "max": max(nums),
    }

# テスト
scores = [85, 92, 78, 95, 88, 76, 91, 83, 87, 90]
result = statistics_summary(scores)
print("=== テストスコアの統計 ===")
for key, val in result.items():
    if isinstance(val, float):
        print(f"{key}: {val:.2f}")
    else:
        print(f"{key}: {val}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="stdlib" lessonId="stdlib-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="stdlib-exercise" basePath="/learn/stdlib" />
    </div>
  );
}
