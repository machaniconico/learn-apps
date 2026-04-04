import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pandas");

export default function PandasExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Pandas レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Pandas演習</h1>
        <p className="text-gray-400">Pandasの知識を総合した実践的なデータ分析問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">演習の目標</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Series・DataFrame・インデックス・クレンジング・groupbyを組み合わせた実践的なデータ分析を体験します。
          サンプルの売上データを使って分析してみましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題1: データの前処理</h2>
        <p className="text-gray-400 mb-4">欠損値と重複を含むデータをクレンジングしてください。</p>
        <PythonPlayground defaultCode={`import pandas as pd
import numpy as np

# 汚いデータ
raw_data = pd.DataFrame({
    '注文ID': [1, 2, 2, 3, 4, 5, None],
    '商品': ['A', 'B', 'B', 'C', None, 'A', 'D'],
    '数量': [2, 1, 1, 3, 2, None, 1],
    '単価': [1000, 2500, 2500, 800, 1500, 1000, 3000],
})

print("元データ:")
print(raw_data)
print("\\n欠損値:")
print(raw_data.isnull().sum())

# クレンジング
df = raw_data.copy()
df = df.drop_duplicates()                      # 重複削除
df = df.dropna(subset=['注文ID', '商品'])      # 重要列のNull除去
df['数量'] = df['数量'].fillna(1).astype(int)  # 数量の欠損は1で補完
df['注文ID'] = df['注文ID'].astype(int)

print("\\nクレンジング後:")
print(df)
print("\\n行数:", len(df))`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題2: 売上分析</h2>
        <p className="text-gray-400 mb-4">クレンジングしたデータを使って、商品別・月別の売上分析を行いましょう。</p>
        <PythonPlayground defaultCode={`import pandas as pd

# 売上データ
df = pd.DataFrame({
    '月': [1, 1, 1, 2, 2, 3, 3, 3, 3],
    '商品': ['A', 'B', 'C', 'A', 'B', 'A', 'B', 'C', 'A'],
    '数量': [10, 5, 8, 12, 7, 9, 6, 10, 15],
    '単価': [1000, 2500, 800, 1000, 2500, 1000, 2500, 800, 1000],
})

# 売上金額を追加
df['売上'] = df['数量'] * df['単価']

# 商品別の集計
print("商品別売上:")
product_stats = df.groupby('商品').agg(
    合計売上=('売上', 'sum'),
    合計数量=('数量', 'sum'),
    販売回数=('売上', 'count')
)
print(product_stats)

# 月別・商品別のクロス集計
print("\\n月別×商品別の売上:")
pivot = df.pivot_table(
    values='売上', index='月', columns='商品', aggfunc='sum', fill_value=0
)
print(pivot)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題3: データの結合</h2>
        <p className="text-gray-400 mb-4">2つのDataFrameをmerge（結合）して情報を統合しましょう。</p>
        <PythonPlayground defaultCode={`import pandas as pd

# 注文テーブル
orders = pd.DataFrame({
    '注文ID': [1, 2, 3, 4, 5],
    '顧客ID': ['C001', 'C002', 'C001', 'C003', 'C002'],
    '商品': ['A', 'B', 'C', 'A', 'B'],
    '金額': [1000, 2500, 800, 1000, 2500],
})

# 顧客テーブル
customers = pd.DataFrame({
    '顧客ID': ['C001', 'C002', 'C003', 'C004'],
    '顧客名': ['田中', '鈴木', '佐藤', '山田'],
    '都道府県': ['東京', '大阪', '東京', '名古屋'],
})

# 内部結合
merged = pd.merge(orders, customers, on='顧客ID', how='left')
print("結合後のデータ:")
print(merged)

# 顧客ごとの購入総額
print("\\n顧客別購入総額:")
print(merged.groupby('顧客名')['金額'].sum())`} />
      </section>

      <LessonCompleteButton categoryId="pandas" lessonId="pandas-exercise" />
      <LessonNav lessons={lessons} currentId="pandas-exercise" basePath="/learn/pandas" />
    </div>
  );
}
