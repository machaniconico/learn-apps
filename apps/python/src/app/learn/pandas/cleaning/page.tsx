import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pandas");

export default function PandasCleaningPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Pandas レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データクレンジング</h1>
        <p className="text-gray-400">欠損値・重複の処理とデータ型の変換など、分析に使えるデータに整える技術を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">欠損値（NaN）の処理</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          実際のデータには欠損値（<code className="bg-gray-800 px-1 rounded text-purple-300">NaN</code>）が含まれることが多くあります。
          Pandasは欠損値を <code className="bg-gray-800 px-1 rounded text-purple-300">np.nan</code> で表現し、
          <code className="bg-gray-800 px-1 rounded text-purple-300">isnull()</code>・<code className="bg-gray-800 px-1 rounded text-purple-300">dropna()</code>・
          <code className="bg-gray-800 px-1 rounded text-purple-300">fillna()</code> で検出・除去・補完ができます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">欠損値の検出と処理</h2>
        <PythonPlayground defaultCode={`import pandas as pd
import numpy as np

df = pd.DataFrame({
    '名前': ['田中', '鈴木', None, '山田', '伊藤'],
    '年齢': [25, np.nan, 22, 35, np.nan],
    '給与': [350000, 480000, np.nan, 550000, 380000],
})

print("元データ:")
print(df)

# 欠損値の確認
print("\\n欠損値の数:")
print(df.isnull().sum())

# fillna: 欠損値を補完
df_filled = df.copy()
df_filled['年齢'] = df_filled['年齢'].fillna(df_filled['年齢'].mean())
df_filled['給与'] = df_filled['給与'].fillna(0)
df_filled['名前'] = df_filled['名前'].fillna('不明')
print("\\n補完後:")
print(df_filled)

# dropna: 欠損値を含む行を削除
df_dropped = df.dropna()
print("\\n欠損行を削除後:")
print(df_dropped)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">重複の処理とデータ型変換</h2>
        <PythonPlayground defaultCode={`import pandas as pd

df = pd.DataFrame({
    'id': [1, 2, 2, 3, 4, 4],
    '商品': ['A', 'B', 'B', 'C', 'D', 'D'],
    '価格': ['100', '200', '200', '150', '300', '300'],
    'カテゴリ': ['食品', '雑貨', '雑貨', '食品', '電機', '電機'],
})

print("元データ:")
print(df)

# 重複の確認
print("\\n重複行の数:", df.duplicated().sum())

# 重複を削除
df_unique = df.drop_duplicates()
print("\\n重複削除後:")
print(df_unique)

# データ型の変換
df_unique = df_unique.copy()
df_unique['価格'] = pd.to_numeric(df_unique['価格'])
df_unique['カテゴリ'] = df_unique['カテゴリ'].astype('category')
print("\\nデータ型変換後:")
print(df_unique.dtypes)`} />
      </section>

      <LessonCompleteButton categoryId="pandas" lessonId="cleaning" />
      <LessonNav lessons={lessons} currentId="cleaning" basePath="/learn/pandas" />
    </div>
  );
}
