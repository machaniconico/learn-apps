import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("numpy");

export default function NumpyArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">NumPy レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列の作成</h1>
        <p className="text-gray-400">np.array・zeros・ones・arangeでNumPy配列（ndarray）を作る方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">NumPyとは</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          NumPy（Numerical Python）は、Pythonで科学技術計算を行うための基盤ライブラリです。
          中心となるデータ構造は <code className="bg-gray-800 px-1 rounded text-blue-300">ndarray</code>（N次元配列）で、
          同一の型を持つ要素を効率的に格納します。純粋なPythonリストより格段に高速な数値演算が可能です。
        </p>
        <div className="bg-gray-900 border border-blue-500/20 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300">
            <span className="text-blue-400 font-semibold">ndarrayの特徴：</span>
            同一型・固定サイズ・C言語レベルの計算速度・多次元対応
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な配列作成関数</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-2">np.array()</h3>
            <p className="text-gray-400 text-sm">Pythonリスト・タプルからndarrayを作成する最も基本的な方法。</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-2">np.zeros() / np.ones()</h3>
            <p className="text-gray-400 text-sm">全要素がゼロまたは1の配列を形状を指定して作成。初期化に便利。</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-2">np.arange()</h3>
            <p className="text-gray-400 text-sm">Pythonのrange()のように連続する値の配列を作成。ステップ幅も指定可能。</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-blue-400 font-semibold mb-2">np.linspace()</h3>
            <p className="text-gray-400 text-sm">指定範囲を均等に分割した配列を作成。グラフのX軸データなどに使用。</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">配列作成を試してみよう</h2>
        <PythonPlayground defaultCode={`import numpy as np

# np.array() でリストから配列を作成
a = np.array([1, 2, 3, 4, 5])
print("1次元配列:", a)
print("  dtype:", a.dtype)
print("  shape:", a.shape)

# 2次元配列
b = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print("\\n2次元配列:")
print(b)
print("  shape:", b.shape)  # (3, 3)
print("  ndim:", b.ndim)    # 2次元

# 特殊な配列
print("\\nzeros(3, 4):")
print(np.zeros((3, 4)))

print("\\nones(2, 3):")
print(np.ones((2, 3)))

print("\\narange(0, 10, 2):", np.arange(0, 10, 2))
print("linspace(0, 1, 5):", np.linspace(0, 1, 5))`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">配列の属性と変形</h2>
        <p className="text-gray-400 mb-4">ndarrayには形状・次元数・要素数などの属性があります。reshapeで形状を変えることもできます。</p>
        <PythonPlayground defaultCode={`import numpy as np

a = np.arange(12)
print("元の配列:", a)
print("shape:", a.shape, "  ndim:", a.ndim, "  size:", a.size)

# reshape で形状を変更
b = a.reshape(3, 4)
print("\\nreshape(3, 4):")
print(b)

c = a.reshape(2, 2, 3)
print("\\nreshape(2, 2, 3):")
print(c)
print("shape:", c.shape)  # (2, 2, 3)

# データ型の指定
f = np.array([1, 2, 3], dtype=np.float64)
print("\\nfloat64配列:", f, "  dtype:", f.dtype)`} />
      </section>

      <LessonCompleteButton categoryId="numpy" lessonId="arrays" />
      <LessonNav lessons={lessons} currentId="arrays" basePath="/learn/numpy" />
    </div>
  );
}
