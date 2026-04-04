import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("matplotlib");

export default function MatplotlibStylesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Matplotlib レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタイルと応用</h1>
        <p className="text-gray-400">スタイルシート・ヒートマップ・箱ひげ図など、Matplotlibの応用的なグラフを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">スタイルシートの使い方</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Matplotlibにはあらかじめ用意されたスタイルシートがあり、
          <code className="bg-gray-800 px-1 rounded text-red-300">plt.style.use()</code> で簡単に見た目を変えられます。
          有名なスタイルには <code className="bg-gray-800 px-1 rounded text-red-300">seaborn-v0_8</code>・
          <code className="bg-gray-800 px-1 rounded text-red-300">ggplot</code>・
          <code className="bg-gray-800 px-1 rounded text-red-300">dark_background</code> などがあります。
        </p>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# 利用可能なスタイルを確認
styles = plt.style.available
print("利用可能なスタイル（一部）:")
# ダークテーマとクラシックを抽出
dark_styles = [s for s in styles if 'dark' in s.lower() or 'seaborn' in s.lower() or 'ggplot' in s]
for s in sorted(dark_styles)[:10]:
    print(f"  {s}")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ヒートマップの作成</h2>
        <p className="text-gray-400 mb-4">相関行列や2次元データの可視化に便利なヒートマップを作成しましょう。</p>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# 相関行列データ（例：株価の相関）
labels = ['株A', '株B', '株C', '株D', '株E']
corr_matrix = np.array([
    [1.00, 0.85, 0.30, -0.20, 0.15],
    [0.85, 1.00, 0.25, -0.15, 0.10],
    [0.30, 0.25, 1.00,  0.70, 0.80],
    [-0.20, -0.15, 0.70, 1.00, 0.65],
    [0.15, 0.10, 0.80,  0.65, 1.00],
])

fig, ax = plt.subplots(figsize=(6, 5))
im = ax.imshow(corr_matrix, cmap='coolwarm', vmin=-1, vmax=1)
plt.colorbar(im, ax=ax)

# 軸のラベル設定
ax.set_xticks(range(len(labels)))
ax.set_yticks(range(len(labels)))
ax.set_xticklabels(labels)
ax.set_yticklabels(labels)
ax.set_title('株価相関行列')

# セルに値を表示
for i in range(len(labels)):
    for j in range(len(labels)):
        ax.text(j, i, f'{corr_matrix[i,j]:.2f}',
                ha='center', va='center', fontsize=8)

plt.tight_layout()
print("ヒートマップ作成完了")
print(f"カラーマップ: coolwarm")
plt.close(fig)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">箱ひげ図とヒストグラム</h2>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

# サンプルデータ（3グループの点数）
group_a = np.random.normal(75, 10, 50)
group_b = np.random.normal(65, 15, 50)
group_c = np.random.normal(80, 8, 50)

fig, axes = plt.subplots(1, 2, figsize=(10, 5))

# 箱ひげ図
bp = axes[0].boxplot([group_a, group_b, group_c],
                      labels=['グループA', 'グループB', 'グループC'],
                      patch_artist=True)
for patch, color in zip(bp['boxes'], ['lightblue', 'lightgreen', 'lightsalmon']):
    patch.set_facecolor(color)
axes[0].set_title('グループ別点数分布')
axes[0].set_ylabel('点数')
axes[0].grid(True, alpha=0.3)

# ヒストグラム（重ね合わせ）
axes[1].hist(group_a, bins=15, alpha=0.5, label='グループA', color='blue')
axes[1].hist(group_b, bins=15, alpha=0.5, label='グループB', color='green')
axes[1].hist(group_c, bins=15, alpha=0.5, label='グループC', color='red')
axes[1].set_title('点数分布ヒストグラム')
axes[1].legend()
axes[1].set_xlabel('点数')
axes[1].set_ylabel('頻度')

plt.tight_layout()
print("各グループの平均点:")
for name, data in [('A', group_a), ('B', group_b), ('C', group_c)]:
    print(f"  グループ{name}: {data.mean():.1f}点")
plt.close(fig)`} />
      </section>

      <LessonCompleteButton categoryId="matplotlib" lessonId="styles" />
      <LessonNav lessons={lessons} currentId="styles" basePath="/learn/matplotlib" />
    </div>
  );
}
