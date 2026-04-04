import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("matplotlib");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Matplotlibでグラフを表示するための関数はどれですか？",
    options: ["plt.render()", "plt.show()", "plt.display()", "plt.draw()"],
    answer: 1,
    explanation: "plt.show() はMatplotlibのグラフを画面に表示するための関数です。Jupyter Notebookでは自動表示される場合もあります。",
  },
  {
    question: "折れ線グラフを描くMatplotlibの関数はどれですか？",
    options: ["plt.bar()", "plt.scatter()", "plt.plot()", "plt.line()"],
    answer: 2,
    explanation: "plt.plot() は折れ線グラフを描画する関数です。plt.bar() は棒グラフ、plt.scatter() は散布図を描きます。",
  },
  {
    question: "plt.subplots(2, 3) は何を意味しますか？",
    options: [
      "2つのグラフを縦に並べる",
      "2行3列のサブプロットグリッドを作成する",
      "3つのグラフを横に並べる",
      "グラフのサイズを2×3インチにする",
    ],
    answer: 1,
    explanation: "plt.subplots(2, 3) は2行3列の合計6つのサブプロットを持つFigureを作成します。返り値はfig（Figure）とaxes（2D配列）です。",
  },
  {
    question: "グラフのX軸ラベルを設定するメソッドはどれですか？",
    options: ["ax.x_label('ラベル')", "ax.set_xlabel('ラベル')", "ax.xlabel = 'ラベル'", "plt.x('ラベル')"],
    answer: 1,
    explanation: "ax.set_xlabel() でX軸ラベルを設定します。同様に ax.set_ylabel() でY軸ラベル、ax.set_title() でタイトルを設定できます。",
  },
];

export default function MatplotlibPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">Matplotlib</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Pythonデータ可視化の基本ライブラリMatplotlibをマスターしましょう。折れ線・棒グラフ・散布図から
          サブプロット・カスタマイズ・スタイルまで、プロフェッショナルなグラフ作成を学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="matplotlib" totalLessons={5} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/matplotlib" color="red" categoryId="matplotlib" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Matplotlibでできること</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-gray-900 border border-red-500/20">
            <div className="text-2xl mb-2">📉</div>
            <h3 className="text-red-400 font-bold mb-1">多様なグラフ種類</h3>
            <p className="text-gray-400 text-sm">折れ線・棒・円・散布図・ヒストグラムなど豊富なグラフタイプをサポートします。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-red-500/20">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="text-red-400 font-bold mb-1">高度なカスタマイズ</h3>
            <p className="text-gray-400 text-sm">色・フォント・サイズ・スタイルなど細部まで自由にカスタマイズできます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-red-500/20">
            <div className="text-2xl mb-2">🖼️</div>
            <h3 className="text-red-400 font-bold mb-1">出版品質の出力</h3>
            <p className="text-gray-400 text-sm">PNG・PDF・SVGなど様々な形式で高品質なグラフを保存できます。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Matplotlibのオブジェクト構造を理解しよう</h2>
        <p className="text-gray-400 mb-4">MatplotlibはFigure（全体の枠）とAxes（個々のグラフ領域）から構成されます。このコードでは、グラフの基本的なデータ構造と操作を示します。</p>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# データの準備
x = np.linspace(0, 2 * np.pi, 100)
y_sin = np.sin(x)
y_cos = np.cos(x)

# グラフの作成（ブラウザでは表示されませんが、構造を確認できます）
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(x, y_sin, label='sin(x)', color='blue')
ax.plot(x, y_cos, label='cos(x)', color='red')
ax.set_xlabel('X軸')
ax.set_ylabel('Y軸')
ax.set_title('三角関数のグラフ')
ax.legend()
ax.grid(True)

print("Figure作成完了")
print(f"Figureサイズ: {fig.get_size_inches()} インチ")
print(f"Axesの数: {len(fig.axes)}")
print("グラフの種類: 折れ線グラフ（2本）")
plt.close(fig)`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">データの可視化パターン</h2>
        <p className="text-gray-400 mb-4">棒グラフ・散布図など、よく使われるグラフ種類のコードパターンを確認しましょう。</p>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# サンプルデータ
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 32, 67, 41]

fig, axes = plt.subplots(1, 2, figsize=(10, 4))

# 棒グラフ
axes[0].bar(categories, values, color=['#4299e1', '#68d391', '#f6ad55', '#fc8181', '#b794f4'])
axes[0].set_title('棒グラフの例')
axes[0].set_ylabel('値')

# 散布図
x_scatter = np.random.randn(50)
y_scatter = x_scatter * 2 + np.random.randn(50) * 0.5
axes[1].scatter(x_scatter, y_scatter, alpha=0.6, color='purple')
axes[1].set_title('散布図の例')

plt.tight_layout()
print("グラフ構造:")
for i, ax in enumerate(axes):
    print(f"  subplot {i+1}: {ax.get_title()}")
plt.close(fig)`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="red" />
      </section>
    </div>
  );
}
