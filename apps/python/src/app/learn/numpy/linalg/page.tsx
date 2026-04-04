import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("numpy");

export default function NumpyLinalgPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">NumPy レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">線形代数</h1>
        <p className="text-gray-400">行列演算・行列式・固有値・逆行列など、NumPyの線形代数機能を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">numpy.linalg モジュール</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1 rounded text-blue-300">numpy.linalg</code> は線形代数の演算を提供するサブモジュールです。
          機械学習・統計・物理シミュレーションなど幅広い分野で使われます。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-1">np.dot() / @</h3>
            <p className="text-gray-400 text-sm">行列の積（ドット積）。Python 3.5以降は @ 演算子も使える。</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-1">np.linalg.inv()</h3>
            <p className="text-gray-400 text-sm">正方行列の逆行列を計算。行列式が0の場合はエラー。</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-1">np.linalg.det()</h3>
            <p className="text-gray-400 text-sm">行列式（determinant）を計算。線形独立性の判定に使用。</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-1">np.linalg.eig()</h3>
            <p className="text-gray-400 text-sm">固有値と固有ベクトルを計算。PCA（主成分分析）などに使用。</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">行列演算を試してみよう</h2>
        <PythonPlayground defaultCode={`import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print("A =")
print(A)
print("\\nB =")
print(B)

# 行列の積
print("\\nA @ B (行列積):")
print(A @ B)  # np.dot(A, B) と同じ

# 転置
print("\\nA.T (転置):")
print(A.T)

# 逆行列
A_inv = np.linalg.inv(A)
print("\\nA の逆行列:")
print(A_inv.round(4))

# 確認: A @ A_inv = 単位行列
print("\\nA @ A_inv (≈単位行列):")
print((A @ A_inv).round(10))`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">固有値・連立方程式</h2>
        <PythonPlayground defaultCode={`import numpy as np

# 固有値と固有ベクトル
A = np.array([[4, 1], [2, 3]])
eigenvalues, eigenvectors = np.linalg.eig(A)
print("固有値:", eigenvalues)
print("固有ベクトル:")
print(eigenvectors)

# 行列式
det = np.linalg.det(A)
print("\\n行列式:", det)

# 連立方程式を解く: Ax = b
# 2x + y = 5
# x + 3y = 10
A_eq = np.array([[2, 1], [1, 3]])
b = np.array([5, 10])
x = np.linalg.solve(A_eq, b)
print("\\n連立方程式 Ax = b の解:")
print(f"x = {x[0]:.4f}, y = {x[1]:.4f}")

# 検証
print("検証 A @ x:", A_eq @ x)`} />
      </section>

      <LessonCompleteButton categoryId="numpy" lessonId="linalg" />
      <LessonNav lessons={lessons} currentId="linalg" basePath="/learn/numpy" />
    </div>
  );
}
