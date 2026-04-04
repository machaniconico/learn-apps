import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("numpy");

export default function NumpyExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">NumPy レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">NumPy演習</h1>
        <p className="text-gray-400">NumPyの知識を総合した実践問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">演習の概要</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          これまでのレッスンで学んだ配列作成・演算・インデックス・ブロードキャスト・線形代数を
          組み合わせて使います。各問題を解いてコードを実行し、期待する出力が得られるか確認しましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題1: 統計計算</h2>
        <p className="text-gray-400 mb-4">与えられたデータの統計量を計算してください。</p>
        <PythonPlayground defaultCode={`import numpy as np

# 生徒の点数データ（5科目×6人）
scores = np.array([
    [85, 72, 90, 88, 76],  # 生徒1
    [91, 85, 78, 95, 89],  # 生徒2
    [70, 65, 80, 72, 68],  # 生徒3
    [88, 92, 85, 90, 94],  # 生徒4
    [75, 80, 70, 78, 82],  # 生徒5
    [60, 55, 65, 70, 58],  # 生徒6
])

# 各生徒の平均点（行方向の平均）
student_avg = scores.mean(axis=1)
print("各生徒の平均点:")
for i, avg in enumerate(student_avg, 1):
    print(f"  生徒{i}: {avg:.1f}点")

# 各科目の平均点（列方向の平均）
subject_avg = scores.mean(axis=0)
print("\\n各科目の平均点:", subject_avg.round(1))

# 80点以上の生徒数（科目ごと）
above_80 = (scores >= 80).sum(axis=0)
print("各科目の80点以上の人数:", above_80)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題2: データの正規化と変換</h2>
        <p className="text-gray-400 mb-4">ブロードキャストを使ってデータを正規化（0〜1の範囲に変換）してみましょう。</p>
        <PythonPlayground defaultCode={`import numpy as np

# センサーデータ（3チャンネル×5時刻）
data = np.array([
    [10.0, 25.0, 18.0, 32.0, 8.0],
    [100.0, 250.0, 150.0, 300.0, 80.0],
    [0.5, 1.2, 0.8, 1.5, 0.3],
])

print("元データ:")
print(data)

# Min-Max正規化（各行を0〜1の範囲に正規化）
row_min = data.min(axis=1, keepdims=True)
row_max = data.max(axis=1, keepdims=True)
normalized = (data - row_min) / (row_max - row_min)

print("\\n正規化後（ブロードキャスト使用）:")
print(normalized.round(3))

print("\\n各行の最小値:", normalized.min(axis=1))
print("各行の最大値:", normalized.max(axis=1))`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題3: 行列演算の応用</h2>
        <p className="text-gray-400 mb-4">線形代数を使った実用的な計算を試してみましょう。</p>
        <PythonPlayground defaultCode={`import numpy as np

# 回転行列を使った座標変換
def rotation_matrix(theta_deg):
    """theta度回転させる回転行列"""
    theta = np.radians(theta_deg)
    return np.array([
        [np.cos(theta), -np.sin(theta)],
        [np.sin(theta),  np.cos(theta)]
    ])

# 点群データ
points = np.array([[1, 0], [0, 1], [-1, 0], [0, -1]], dtype=float)
print("元の点群:")
for p in points:
    print(f"  ({p[0]:.2f}, {p[1]:.2f})")

# 45度回転
R = rotation_matrix(45)
rotated = (R @ points.T).T  # 転置を活用

print("\\n45度回転後:")
for p in rotated:
    print(f"  ({p[0]:.2f}, {p[1]:.2f})")

# ノルム（距離）が変わらないことを確認
orig_dist = np.linalg.norm(points, axis=1)
rot_dist = np.linalg.norm(rotated, axis=1)
print("\\n元のノルム:", orig_dist.round(4))
print("回転後ノルム:", rot_dist.round(4))`} />
      </section>

      <LessonCompleteButton categoryId="numpy" lessonId="numpy-exercise" />
      <LessonNav lessons={lessons} currentId="numpy-exercise" basePath="/learn/numpy" />
    </div>
  );
}
