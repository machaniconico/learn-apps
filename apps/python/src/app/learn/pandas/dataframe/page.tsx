import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pandas");

export default function PandasDataframePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Pandas レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">DataFrame</h1>
        <p className="text-gray-400">表形式データ構造DataFrameの作成・基本操作・列の追加・削除を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DataFrameとは</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1 rounded text-purple-300">pd.DataFrame</code> は複数のSeriesを列として持つ
          2次元の表形式データ構造です。スプレッドシートやSQLテーブルに相当し、Pandasの中心的なデータ構造です。
          行方向のインデックスと列名でデータを管理します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DataFrameの作成と情報確認</h2>
        <PythonPlayground defaultCode={`import pandas as pd

# 辞書からDataFrameを作成
df = pd.DataFrame({
    '商品名': ['りんご', 'バナナ', 'みかん', 'ぶどう', 'もも'],
    '価格': [150, 100, 80, 300, 250],
    '在庫数': [50, 120, 80, 30, 45],
    'カテゴリ': ['国産', '輸入', '国産', '国産', '国産'],
})

print("DataFrame:")
print(df)

print("\\n基本情報:")
print(f"  形状: {df.shape}")
print(f"  列名: {df.columns.tolist()}")
print(f"  インデックス: {df.index.tolist()}")

print("\\n各列のデータ型:")
print(df.dtypes)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">列の操作と基本統計</h2>
        <PythonPlayground defaultCode={`import pandas as pd

df = pd.DataFrame({
    '商品名': ['りんご', 'バナナ', 'みかん', 'ぶどう', 'もも'],
    '価格': [150, 100, 80, 300, 250],
    '在庫数': [50, 120, 80, 30, 45],
})

# 列へのアクセス
print("価格列:")
print(df['価格'])

# 新しい列の追加
df['合計金額'] = df['価格'] * df['在庫数']
print("\\n合計金額列を追加:")
print(df)

# 基本統計
print("\\n数値列の基本統計:")
print(df.describe().round(1))

# 列の削除
df_no_total = df.drop(columns=['合計金額'])
print("\\n合計金額列を削除後の列:", df_no_total.columns.tolist())`} />
      </section>

      <LessonCompleteButton categoryId="pandas" lessonId="dataframe" />
      <LessonNav lessons={lessons} currentId="dataframe" basePath="/learn/pandas" />
    </div>
  );
}
