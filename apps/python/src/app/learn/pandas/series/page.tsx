import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pandas");

export default function PandasSeriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Pandas レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Series</h1>
        <p className="text-gray-400">Pandasの1次元ラベル付きデータ構造Seriesの作成・アクセス・操作を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">SeriesはラベルつきのNumPy配列</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1 rounded text-purple-300">pd.Series</code> はインデックス（ラベル）と値のペアからなる1次元データ構造です。
          NumPyのndarrayに「意味のあるラベル」を加えたようなイメージです。
          辞書から作成することもでき、キーが自動的にインデックスになります。
        </p>
        <div className="bg-gray-900 border border-purple-500/20 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300">
            <span className="text-purple-400 font-semibold">Seriesの特徴：</span>
            インデックスによるラベルアクセス・欠損値（NaN）の自動処理・NumPy互換の演算
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Seriesの作成と基本操作</h2>
        <PythonPlayground defaultCode={`import pandas as pd
import numpy as np

# リストから作成
s1 = pd.Series([10, 20, 30, 40, 50])
print("デフォルトインデックス:")
print(s1)

# インデックスを指定して作成
s2 = pd.Series([85, 92, 78, 96], index=['国語', '数学', '英語', '理科'])
print("\\nラベルインデックス:")
print(s2)

# 辞書から作成
data = {'東京': 1396, '大阪': 882, '名古屋': 233}
s3 = pd.Series(data, name='人口（万人）')
print("\\n辞書から作成:")
print(s3)

# 属性
print("\\nindex:", s2.index.tolist())
print("values:", s2.values)
print("dtype:", s2.dtype)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">インデックスアクセスと演算</h2>
        <PythonPlayground defaultCode={`import pandas as pd

scores = pd.Series([85, 92, 78, 96, 88],
                   index=['国語', '数学', '英語', '理科', '社会'])

# ラベルでアクセス
print("数学の点数:", scores['数学'])
print("複数ラベル:", scores[['国語', '英語']].to_dict())

# 条件フィルタ
print("\\n90点以上:")
print(scores[scores >= 90])

# 統計
print("\\n平均:", scores.mean())
print("最大:", scores.max())
print("最高点の科目:", scores.idxmax())

# 演算（全体に適用）
print("\\n10点加算後:")
print(scores + 10)`} />
      </section>

      <LessonCompleteButton categoryId="pandas" lessonId="series" />
      <LessonNav lessons={lessons} currentId="series" basePath="/learn/pandas" />
    </div>
  );
}
