import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("matplotlib");

export default function MatplotlibBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Matplotlib レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">グラフの基本</h1>
        <p className="text-gray-400">折れ線グラフ・棒グラフ・散布図の描き方とMatplotlibの基本構造を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">MatplotlibのFigureとAxes</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Matplotlibは2層構造を持ちます。
          <strong className="text-white">Figure</strong>（キャンバス全体）の中に
          <strong className="text-white">Axes</strong>（個々のグラフ領域）が含まれます。
          <code className="bg-gray-800 px-1 rounded text-red-300">plt.subplots()</code> でFigureとAxesを同時に作成するのが推奨パターンです。
        </p>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-mono">
            fig, ax = plt.subplots()  # Figure + Axes を作成<br />
            ax.plot(x, y)             # グラフを描く<br />
            plt.show()                # 表示
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">折れ線グラフ</h2>
        <p className="text-gray-400 mb-4">
          ブラウザ上のPyodide環境ではmatplotlibのグラフ表示はできませんが、コードの構造を確認できます。
          実際のJupyter NotebookやPythonスクリプトでは美しいグラフが表示されます。
        </p>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# データの準備
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# グラフ作成
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(x, y1, label='sin(x)', color='blue', linewidth=2)
ax.plot(x, y2, label='cos(x)', color='red', linewidth=2, linestyle='--')
ax.set_xlabel('X軸')
ax.set_ylabel('Y軸')
ax.set_title('三角関数')
ax.legend()
ax.grid(True, alpha=0.3)

print("グラフ作成完了")
print(f"  タイトル: {ax.get_title()}")
print(f"  X軸ラベル: {ax.get_xlabel()}")
print(f"  Y軸ラベル: {ax.get_ylabel()}")
print(f"  ライン数: {len(ax.lines)}")
plt.close(fig)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">棒グラフと散布図</h2>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(10, 4))

# 棒グラフ
categories = ['1月', '2月', '3月', '4月', '5月']
values = [120, 95, 140, 110, 160]
axes[0].bar(categories, values, color='steelblue', edgecolor='white')
axes[0].set_title('月別売上')
axes[0].set_ylabel('売上（万円）')

# 散布図
np.random.seed(42)
x = np.random.randn(50)
y = x * 1.5 + np.random.randn(50) * 0.5
axes[1].scatter(x, y, alpha=0.6, color='tomato', s=50)
axes[1].set_title('散布図')
axes[1].set_xlabel('X')
axes[1].set_ylabel('Y')

plt.tight_layout()
print("グラフ作成完了")
for i, ax in enumerate(axes):
    print(f"  subplot {i+1}: {ax.get_title()}")
plt.close(fig)`} />
      </section>

      <LessonCompleteButton categoryId="matplotlib" lessonId="basics" />
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/matplotlib" />
    </div>
  );
}
