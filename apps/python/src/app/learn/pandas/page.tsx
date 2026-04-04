import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pandas");

const quizQuestions: QuizQuestion[] = [
  {
    question: "PandasのDataFrameを作成する正しい方法はどれですか？",
    options: [
      "pd.DataFrame = {'col': [1,2,3]}",
      "pd.DataFrame({'col': [1,2,3]})",
      "pd.create_dataframe({'col': [1,2,3]})",
      "DataFrame.new({'col': [1,2,3]})",
    ],
    answer: 1,
    explanation: "pd.DataFrame() コンストラクタに辞書を渡すことでDataFrameを作成できます。辞書のキーが列名、値がリストで各列のデータになります。",
  },
  {
    question: "DataFrameの特定の行をインデックスラベルで選択する方法はどれですか？",
    options: ["df.iloc['label']", "df.loc['label']", "df['label']", "df.at('label')"],
    answer: 1,
    explanation: "df.loc[] はラベルベースのインデックスで行・列を選択します。一方 df.iloc[] は整数位置ベースです。",
  },
  {
    question: "欠損値（NaN）を0で埋めるメソッドはどれですか？",
    options: ["df.dropna(0)", "df.fillna(0)", "df.replace(NaN, 0)", "df.fill(0)"],
    answer: 1,
    explanation: "df.fillna(0) は欠損値（NaN）を指定した値で置き換えます。df.dropna() は欠損値を含む行を削除します。",
  },
  {
    question: "groupby().agg() の主な用途はどれですか？",
    options: [
      "データを並べ替えること",
      "特定の列を選択すること",
      "グループごとに複数の集計関数を適用すること",
      "DataFrameを結合すること",
    ],
    answer: 2,
    explanation: "groupby().agg() はグループ化したデータに対して、合計・平均・カウントなど複数の集計関数をまとめて適用できます。",
  },
];

export default function PandasPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">Pandas</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          データ分析の定番ライブラリPandasを習得しましょう。SeriesとDataFrameを使ったデータの読み込み・
          加工・集計・クレンジングなど、実務でよく使われる操作を体系的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="pandas" totalLessons={6} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/pandas" color="purple" categoryId="pandas" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Pandasでできること</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-gray-900 border border-purple-500/20">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-purple-400 font-bold mb-1">表形式データの操作</h3>
            <p className="text-gray-400 text-sm">CSVやExcelなどのデータをDataFrameで読み込み、自在に加工・分析できます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-purple-500/20">
            <div className="text-2xl mb-2">🧹</div>
            <h3 className="text-purple-400 font-bold mb-1">データクレンジング</h3>
            <p className="text-gray-400 text-sm">欠損値・重複・異常値の処理など、生データを分析に使える形に整えます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-purple-500/20">
            <div className="text-2xl mb-2">📈</div>
            <h3 className="text-purple-400 font-bold mb-1">集計・グループ化</h3>
            <p className="text-gray-400 text-sm">groupbyで条件別に集計し、pivot_tableで多角的な分析が行えます。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DataFrameを作ってみよう</h2>
        <p className="text-gray-400 mb-4">Pandasの基本データ構造DataFrameを作成して操作してみましょう。</p>
        <PythonPlayground defaultCode={`import pandas as pd

# DataFrameの作成
data = {
    '名前': ['田中', '鈴木', '佐藤', '山田', '伊藤'],
    '年齢': [25, 30, 22, 35, 28],
    '部署': ['営業', 'エンジニア', 'デザイン', 'エンジニア', '営業'],
    '給与': [350000, 480000, 320000, 550000, 380000],
}

df = pd.DataFrame(data)
print("DataFrame:")
print(df)
print("\\n形状:", df.shape)
print("列名:", list(df.columns))
print("\\n基本統計:")
print(df['給与'].describe())`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">データの選択と集計</h2>
        <p className="text-gray-400 mb-4">locやilocでデータを絞り込み、groupbyで集計する方法を試しましょう。</p>
        <PythonPlayground defaultCode={`import pandas as pd

data = {
    '名前': ['田中', '鈴木', '佐藤', '山田', '伊藤'],
    '年齢': [25, 30, 22, 35, 28],
    '部署': ['営業', 'エンジニア', 'デザイン', 'エンジニア', '営業'],
    '給与': [350000, 480000, 320000, 550000, 380000],
}
df = pd.DataFrame(data)

# 条件でフィルタ
engineers = df[df['部署'] == 'エンジニア']
print("エンジニア部署:")
print(engineers[['名前', '給与']])

# groupbyで集計
dept_stats = df.groupby('部署')['給与'].agg(['mean', 'count'])
dept_stats.columns = ['平均給与', '人数']
print("\\n部署別統計:")
print(dept_stats)`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="purple" />
      </section>
    </div>
  );
}
