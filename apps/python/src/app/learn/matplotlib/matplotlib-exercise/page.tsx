import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("matplotlib");

export default function MatplotlibExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Matplotlib レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Matplotlib演習</h1>
        <p className="text-gray-400">Matplotlibの知識を総合した実践的なデータ可視化問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">演習の目標</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          グラフの基本・カスタマイズ・サブプロット・応用グラフの知識を組み合わせ、
          実際のデータを想定した可視化コードを書きます。コードを実行してエラーなく動作することを確認しましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題1: 売上トレンドの可視化</h2>
        <p className="text-gray-400 mb-4">月別売上データを折れ線グラフと棒グラフを使って比較表示してください。</p>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# 月別売上データ（2年分）
months = list(range(1, 13))
sales_2023 = [120, 95, 130, 110, 145, 160, 180, 175, 140, 125, 130, 200]
sales_2024 = [135, 105, 150, 125, 160, 175, 195, 190, 155, 140, 150, 220]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# 折れ線グラフで推移比較
ax1.plot(months, sales_2023, 'b-o', label='2023年', linewidth=2, markersize=5)
ax1.plot(months, sales_2024, 'r-s', label='2024年', linewidth=2, markersize=5)
ax1.set_title('年次売上比較（折れ線）')
ax1.set_xlabel('月')
ax1.set_ylabel('売上（万円）')
ax1.legend()
ax1.grid(True, alpha=0.3)
ax1.set_xticks(months)

# 前年比を棒グラフで表示
growth = [(y24 - y23) / y23 * 100 for y23, y24 in zip(sales_2023, sales_2024)]
colors = ['green' if g >= 0 else 'red' for g in growth]
ax2.bar(months, growth, color=colors, alpha=0.7)
ax2.axhline(y=0, color='black', linestyle='-', linewidth=0.8)
ax2.set_title('前年比成長率（%）')
ax2.set_xlabel('月')
ax2.set_ylabel('成長率（%）')
ax2.grid(True, alpha=0.3, axis='y')
ax2.set_xticks(months)

plt.tight_layout()
print("売上トレンドグラフ作成完了")
print(f"年間成長率: {sum(sales_2024)/sum(sales_2023)*100-100:.1f}%")
plt.close(fig)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題2: 分布の可視化ダッシュボード</h2>
        <p className="text-gray-400 mb-4">複数の統計グラフを組み合わせたダッシュボードを作成しましょう。</p>
        <PythonPlayground defaultCode={`import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

# テストデータ
scores = {
    '数学': np.random.normal(72, 12, 100),
    '英語': np.random.normal(68, 15, 100),
    '理科': np.random.normal(75, 10, 100),
}

fig = plt.figure(figsize=(12, 8))

# サブプロットレイアウト
ax1 = fig.add_subplot(2, 2, 1)  # 左上: ヒストグラム
ax2 = fig.add_subplot(2, 2, 2)  # 右上: 箱ひげ図
ax3 = fig.add_subplot(2, 1, 2)  # 下段: 積み上げ棒グラフ

# ヒストグラム
colors = ['#4299e1', '#f6ad55', '#68d391']
for (subject, data), color in zip(scores.items(), colors):
    ax1.hist(data, bins=20, alpha=0.5, label=subject, color=color)
ax1.set_title('点数分布')
ax1.legend(fontsize=8)
ax1.set_xlabel('点数')

# 箱ひげ図
bp = ax2.boxplot(list(scores.values()), labels=list(scores.keys()), patch_artist=True)
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)
ax2.set_title('科目別点数分布')
ax2.set_ylabel('点数')
ax2.grid(True, alpha=0.3)

# 評価分布（積み上げ棒グラフ）
def grade_counts(data):
    return [
        sum(data >= 90),
        sum((data >= 80) & (data < 90)),
        sum((data >= 70) & (data < 80)),
        sum(data < 70),
    ]

subjects = list(scores.keys())
grades = [grade_counts(v) for v in scores.values()]
grade_labels = ['90点以上', '80-89点', '70-79点', '70点未満']
grade_colors = ['#68d391', '#4299e1', '#f6ad55', '#fc8181']

bottom = np.zeros(3)
for i, (label, color) in enumerate(zip(grade_labels, grade_colors)):
    values = [g[i] for g in grades]
    ax3.bar(subjects, values, bottom=bottom, label=label, color=color, alpha=0.8)
    bottom += np.array(values)

ax3.set_title('科目別評価分布')
ax3.set_ylabel('生徒数')
ax3.legend(loc='upper right')

plt.suptitle('成績分析ダッシュボード', fontsize=14, fontweight='bold', y=1.02)
plt.tight_layout()
print("ダッシュボード作成完了")
for subject, data in scores.items():
    print(f"  {subject}: 平均={data.mean():.1f}, 標準偏差={data.std():.1f}")
plt.close(fig)`} />
      </section>

      <LessonCompleteButton categoryId="matplotlib" lessonId="matplotlib-exercise" />
      <LessonNav lessons={lessons} currentId="matplotlib-exercise" basePath="/learn/matplotlib" />
    </div>
  );
}
