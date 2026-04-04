import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("matplotlib");

export default function MatplotlibCustomizationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Matplotlib レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">グラフのカスタマイズ</h1>
        <p className="text-gray-400">タイトル・ラベル・凡例・色・フォントサイズなど、グラフの外観を整える方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">主なカスタマイズオプション</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-red-400 font-semibold mb-2">テキスト系</h3>
            <p className="text-gray-400 text-sm font-mono text-xs">
              ax.set_title('タイトル')<br />
              ax.set_xlabel('X軸ラベル')<br />
              ax.set_ylabel('Y軸ラベル')<br />
              ax.legend(loc='best')
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-red-400 font-semibold mb-2">軸・グリッド系</h3>
            <p className="text-gray-400 text-sm font-mono text-xs">
              ax.set_xlim(0, 10)<br />
              ax.set_ylim(-1, 1)<br />
              ax.grid(True, alpha=0.3)<br />
              ax.tick_params(labelsize=10)
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カラーと線スタイルのカスタマイズ</h2>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 4 * np.pi, 200)

fig, ax = plt.subplots(figsize=(9, 4))

# 色・線スタイル・マーカーの設定
ax.plot(x, np.sin(x), color='#4299e1', linewidth=2.5,
        label='sin(x)', linestyle='-')
ax.plot(x, np.sin(x + np.pi/4), color='#f6ad55', linewidth=2,
        label='sin(x+π/4)', linestyle='--')
ax.plot(x, np.sin(x + np.pi/2), color='#68d391', linewidth=2,
        label='sin(x+π/2)', linestyle='-.')

# タイトルとラベル
ax.set_title('位相シフトした正弦波', fontsize=14, fontweight='bold', pad=15)
ax.set_xlabel('位相 (rad)', fontsize=12)
ax.set_ylabel('振幅', fontsize=12)

# 凡例・グリッド
ax.legend(loc='upper right', fontsize=10)
ax.grid(True, alpha=0.3, linestyle=':')
ax.set_xlim(0, 4 * np.pi)

print("グラフ設定:")
print(f"  タイトル: {ax.get_title()}")
print(f"  ライン数: {len(ax.lines)}")
print(f"  凡例ラベル: {[l.get_label() for l in ax.lines]}")
plt.close(fig)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">注釈とテキストの追加</h2>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 2 * np.pi, 100)
y = np.sin(x)

fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(x, y, 'b-', linewidth=2)

# テキスト注釈の追加
max_idx = np.argmax(y)
ax.annotate(
    f'最大値 ({x[max_idx]:.2f}, {y[max_idx]:.2f})',
    xy=(x[max_idx], y[max_idx]),
    xytext=(x[max_idx] + 0.5, y[max_idx] - 0.3),
    arrowprops=dict(arrowstyle='->', color='red'),
    color='red', fontsize=10
)

ax.axhline(y=0, color='gray', linestyle='--', alpha=0.5)  # 水平線
ax.set_title('sin(x) の最大値')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.grid(True, alpha=0.3)

print("注釈テキスト数:", len(ax.texts) + len(ax.patches))
print("グラフ作成完了")
plt.close(fig)`} />
      </section>

      <LessonCompleteButton categoryId="matplotlib" lessonId="customization" />
      <LessonNav lessons={lessons} currentId="customization" basePath="/learn/matplotlib" />
    </div>
  );
}
