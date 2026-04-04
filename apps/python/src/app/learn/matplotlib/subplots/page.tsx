import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("matplotlib");

export default function MatplotlibSubplotsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Matplotlib レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">サブプロット</h1>
        <p className="text-gray-400">複数のグラフを1つのFigureに並べて表示するsubplotsの使い方を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">plt.subplots() の使い方</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1 rounded text-red-300">plt.subplots(nrows, ncols)</code> で
          複数のグラフ領域（Axes）を持つFigureを作成できます。
          返り値の <code className="bg-gray-800 px-1 rounded text-red-300">axes</code> は
          NumPy配列として返されるため、<code className="bg-gray-800 px-1 rounded text-red-300">axes[0, 1]</code> などで個々のAxesにアクセスします。
        </p>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-mono">
            fig, axes = plt.subplots(2, 3)  # 2行3列のサブプロット<br />
            axes[0, 0].plot(...)  # 1行1列目<br />
            axes[1, 2].bar(...)   # 2行3列目<br />
            plt.tight_layout()   # 間隔を自動調整
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">2×2サブプロットを作成しよう</h2>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(2, 2, figsize=(10, 8))

x = np.linspace(0, 2 * np.pi, 100)

# 左上: 折れ線グラフ
axes[0, 0].plot(x, np.sin(x), 'b-')
axes[0, 0].set_title('折れ線グラフ')
axes[0, 0].set_xlabel('x')
axes[0, 0].set_ylabel('sin(x)')
axes[0, 0].grid(True, alpha=0.3)

# 右上: 棒グラフ
categories = ['A', 'B', 'C', 'D']
values = [23, 45, 32, 55]
axes[0, 1].bar(categories, values, color='tomato')
axes[0, 1].set_title('棒グラフ')
axes[0, 1].set_ylabel('値')

# 左下: 散布図
np.random.seed(42)
x_s = np.random.randn(50)
y_s = x_s * 1.5 + np.random.randn(50)
axes[1, 0].scatter(x_s, y_s, alpha=0.6, color='green')
axes[1, 0].set_title('散布図')

# 右下: ヒストグラム
data = np.random.randn(200)
axes[1, 1].hist(data, bins=20, color='purple', alpha=0.7)
axes[1, 1].set_title('ヒストグラム')
axes[1, 1].set_xlabel('値')
axes[1, 1].set_ylabel('頻度')

plt.tight_layout()
print(f"サブプロット数: {axes.size}")
for i in range(2):
    for j in range(2):
        print(f"  [{i},{j}]: {axes[i,j].get_title()}")
plt.close(fig)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">GridSpecで不均等なレイアウト</h2>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np

fig = plt.figure(figsize=(10, 6))
gs = gridspec.GridSpec(2, 3, figure=fig)

# 大きなグラフ（2行×2列分）
ax_large = fig.add_subplot(gs[:, :2])
x = np.linspace(0, 10, 200)
ax_large.plot(x, np.sin(x), 'b-', linewidth=2)
ax_large.set_title('メインチャート（2列分）')
ax_large.set_xlabel('x')
ax_large.grid(True, alpha=0.3)

# 右上の小グラフ
ax_top_right = fig.add_subplot(gs[0, 2])
ax_top_right.bar(['A', 'B', 'C'], [3, 7, 5], color='tomato')
ax_top_right.set_title('サブグラフ1')

# 右下の小グラフ
ax_bot_right = fig.add_subplot(gs[1, 2])
ax_bot_right.scatter(range(5), [2, 4, 3, 6, 5], color='green')
ax_bot_right.set_title('サブグラフ2')

plt.tight_layout()
print("GridSpecレイアウト完了")
print(f"合計Axes数: {len(fig.axes)}")
plt.close(fig)`} />
      </section>

      <LessonCompleteButton categoryId="matplotlib" lessonId="subplots" />
      <LessonNav lessons={lessons} currentId="subplots" basePath="/learn/matplotlib" />
    </div>
  );
}
