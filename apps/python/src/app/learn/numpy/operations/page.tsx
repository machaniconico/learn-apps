import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("numpy");

export default function NumpyOperationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">NumPy レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列演算</h1>
        <p className="text-gray-400">ベクトル演算・ユニバーサル関数・集約関数を使ったNumPyの高速な数値計算を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">要素ごとの演算（ベクトル演算）</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          NumPy配列の演算は<strong className="text-white">要素ごと（element-wise）</strong>に行われます。
          Pythonのforループを書かずに、配列全体に一括で演算できるため、コードが短くなり処理速度も大幅に向上します。
        </p>
        <div className="bg-gray-900 border border-blue-500/20 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-mono">
            a = [1, 2, 3]  b = [4, 5, 6]<br />
            a + b → [5, 7, 9]  ← 要素ごとに加算<br />
            a * 2 → [2, 4, 6]  ← スカラーとの演算も可能
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ユニバーサル関数（ufunc）</h2>
        <p className="text-gray-400 mb-4">
          np.sqrt()・np.sin()・np.exp()などのユニバーサル関数は、配列の全要素に一括して適用できます。
          C言語で実装されており非常に高速です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本演算を試してみよう</h2>
        <PythonPlayground defaultCode={`import numpy as np

a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

# 四則演算（要素ごと）
print("a + b =", a + b)
print("a - b =", a - b)
print("a * b =", a * b)
print("b / a =", b / a)

# スカラーとの演算
print("\\na * 3 =", a * 3)
print("a ** 2 =", a ** 2)

# ユニバーサル関数
print("\\nnp.sqrt(a):", np.sqrt(a))
print("np.exp(a):", np.exp(a).round(2))
print("np.abs([-1, -2, 3]):", np.abs([-1, -2, 3]))`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">集約関数と統計</h2>
        <p className="text-gray-400 mb-4">配列全体や軸ごとに集計する関数群です。axis引数で行方向・列方向を指定できます。</p>
        <PythonPlayground defaultCode={`import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

# 全体の集約
print("合計:", np.sum(a))
print("平均:", np.mean(a))
print("最大:", np.max(a))
print("最小:", np.min(a))
print("標準偏差:", np.std(a).round(2))

# 軸ごとの集約
print("\\n列ごとの合計 (axis=0):", np.sum(a, axis=0))  # [12, 15, 18]
print("行ごとの合計 (axis=1):", np.sum(a, axis=1))  # [6, 15, 24]

# 最大値のインデックス
print("\\n最大値のインデックス:", np.argmax(a))  # 8
print("各列の最大インデックス:", np.argmax(a, axis=0))`} />
      </section>

      <LessonCompleteButton categoryId="numpy" lessonId="operations" />
      <LessonNav lessons={lessons} currentId="operations" basePath="/learn/numpy" />
    </div>
  );
}
