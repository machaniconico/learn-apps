import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pandas");

export default function PandasGroupbyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Pandas レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">groupby・集約</h1>
        <p className="text-gray-400">データをグループ化して集計・変換するgroupbyの使い方を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">groupbyの仕組み</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1 rounded text-purple-300">groupby()</code> は「分割・適用・結合（Split-Apply-Combine）」のパターンで動作します。
          指定した列の値でデータをグループに分割し、各グループに集計関数を適用して結果を結合します。
          SQLの <code className="bg-gray-800 px-1 rounded text-purple-300">GROUP BY</code> に相当します。
        </p>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-mono">
            df.groupby('列名')['対象列'].集計関数()<br />
            df.groupby('列名').agg(&#123;'列': ['mean', 'sum']&#125;)
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なgroupby集計</h2>
        <PythonPlayground defaultCode={`import pandas as pd

df = pd.DataFrame({
    '部署': ['営業', 'エンジニア', 'デザイン', 'エンジニア', '営業', 'デザイン', 'エンジニア'],
    '名前': ['田中', '鈴木', '佐藤', '山田', '伊藤', '渡辺', '中村'],
    '年齢': [25, 30, 22, 35, 28, 26, 32],
    '給与': [350000, 480000, 320000, 550000, 380000, 310000, 510000],
})

# 部署ごとの平均給与
print("部署ごとの平均給与:")
print(df.groupby('部署')['給与'].mean().astype(int))

# 複数の集計
print("\\n部署ごとの各種統計:")
stats = df.groupby('部署')['給与'].agg(['mean', 'min', 'max', 'count'])
stats.columns = ['平均', '最小', '最大', '人数']
print(stats.astype(int))`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数列のgroupbyとagg</h2>
        <PythonPlayground defaultCode={`import pandas as pd

df = pd.DataFrame({
    '部署': ['営業', 'エンジニア', 'デザイン', 'エンジニア', '営業', 'デザイン'],
    '役職': ['一般', 'シニア', '一般', 'シニア', 'マネージャー', 'シニア'],
    '給与': [350000, 550000, 320000, 600000, 480000, 420000],
    '残業時間': [20, 15, 10, 25, 5, 12],
})

# 複数列でグループ化
print("部署×役職ごとの平均給与:")
result = df.groupby(['部署', '役職'])['給与'].mean().astype(int)
print(result)

# 複数列への複数の集計（agg）
print("\\n部署ごとの詳細統計:")
result2 = df.groupby('部署').agg(
    平均給与=('給与', 'mean'),
    平均残業=('残業時間', 'mean'),
    人数=('給与', 'count')
)
result2['平均給与'] = result2['平均給与'].astype(int)
print(result2)`} />
      </section>

      <LessonCompleteButton categoryId="pandas" lessonId="groupby" />
      <LessonNav lessons={lessons} currentId="groupby" basePath="/learn/pandas" />
    </div>
  );
}
