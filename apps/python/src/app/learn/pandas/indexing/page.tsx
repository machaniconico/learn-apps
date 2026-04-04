import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pandas");

export default function PandasIndexingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">Pandas レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インデックス・選択</h1>
        <p className="text-gray-400">loc・iloc・条件フィルタを使ったデータの選択と絞り込み方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">loc と iloc の違い</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 border border-purple-500/20 rounded-xl p-4">
            <h3 className="text-purple-400 font-semibold mb-2">df.loc[]</h3>
            <p className="text-gray-400 text-sm">ラベルベースのインデックス。行・列をラベル名で指定します。スライスは両端を含みます。</p>
          </div>
          <div className="bg-gray-900 border border-purple-500/20 rounded-xl p-4">
            <h3 className="text-purple-400 font-semibold mb-2">df.iloc[]</h3>
            <p className="text-gray-400 text-sm">整数位置ベースのインデックス。0始まりの位置番号で行・列を指定します。</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">loc・iloc でデータを選択しよう</h2>
        <PythonPlayground defaultCode={`import pandas as pd

df = pd.DataFrame({
    '名前': ['田中', '鈴木', '佐藤', '山田', '伊藤'],
    '年齢': [25, 30, 22, 35, 28],
    '部署': ['営業', 'エンジニア', 'デザイン', 'エンジニア', '営業'],
    '給与': [350000, 480000, 320000, 550000, 380000],
}, index=['A', 'B', 'C', 'D', 'E'])

# loc: ラベルで選択
print("loc['B']（Bの行）:")
print(df.loc['B'])
print("\\nloc['A':'C', '名前':'年齢']（範囲選択）:")
print(df.loc['A':'C', '名前':'年齢'])

# iloc: 位置で選択
print("\\niloc[0]（0行目）:")
print(df.iloc[0])
print("\\niloc[:3, :2]（先頭3行×2列）:")
print(df.iloc[:3, :2])`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">条件フィルタリング</h2>
        <p className="text-gray-400 mb-4">複数条件の組み合わせやquery()を使ったデータの絞り込みを学びましょう。</p>
        <PythonPlayground defaultCode={`import pandas as pd

df = pd.DataFrame({
    '名前': ['田中', '鈴木', '佐藤', '山田', '伊藤'],
    '年齢': [25, 30, 22, 35, 28],
    '部署': ['営業', 'エンジニア', 'デザイン', 'エンジニア', '営業'],
    '給与': [350000, 480000, 320000, 550000, 380000],
})

# 単一条件
print("エンジニア部署:")
print(df[df['部署'] == 'エンジニア'][['名前', '給与']])

# 複数条件（& と | を使う）
print("\\n年齢25〜30 かつ 給与35万以上:")
mask = (df['年齢'].between(25, 30)) & (df['給与'] >= 350000)
print(df[mask][['名前', '年齢', '給与']])

# query() による簡潔な記法
print("\\nquery()で同じ結果:")
result = df.query("年齢 >= 25 and 給与 >= 350000")
print(result[['名前', '年齢', '給与']])`} />
      </section>

      <LessonCompleteButton categoryId="pandas" lessonId="indexing" />
      <LessonNav lessons={lessons} currentId="indexing" basePath="/learn/pandas" />
    </div>
  );
}
