import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("numpy");

export default function NumpyIndexingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">NumPy レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インデックスとスライス</h1>
        <p className="text-gray-400">多次元配列の要素アクセス・スライス・ファンシーインデックス・ブーリアンインデックスを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なインデックスアクセス</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          1次元配列はPythonリストと同様に <code className="bg-gray-800 px-1 rounded text-blue-300">a[0]</code> でアクセスします。
          2次元配列は <code className="bg-gray-800 px-1 rounded text-blue-300">a[行, 列]</code> または <code className="bg-gray-800 px-1 rounded text-blue-300">a[行][列]</code> で要素にアクセスします。
          負のインデックスは末尾からのアクセスを意味します（<code className="bg-gray-800 px-1 rounded text-blue-300">a[-1]</code> は最後の要素）。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">スライス記法</h2>
        <p className="text-gray-400 mb-4">
          <code className="bg-gray-800 px-1 rounded text-blue-300">a[start:stop:step]</code> の記法で部分配列を取り出せます。
          多次元配列では各軸にスライスを指定できます。
        </p>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-mono">
            a[1:4]    # インデックス1から3まで<br />
            a[:, 0]   # 全行の0列目<br />
            a[0, :]   # 0行目の全列<br />
            a[::2]    # 1つおきの要素
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">インデックスとスライスを試そう</h2>
        <PythonPlayground defaultCode={`import numpy as np

a = np.array([[1, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10, 11, 12]])

print("配列 a:")
print(a)

# 要素アクセス
print("\\na[0, 0] =", a[0, 0])   # 1
print("a[1, 2] =", a[1, 2])     # 7
print("a[-1, -1] =", a[-1, -1]) # 12

# スライス
print("\\n1行目:", a[0, :])          # [1, 2, 3, 4]
print("1列目:", a[:, 0])            # [1, 5, 9]
print("左上2x2:", a[:2, :2])        # [[1,2],[5,6]]
print("1行おき:", a[::2, :])        # 0行目と2行目`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファンシーインデックスとブーリアンインデックス</h2>
        <p className="text-gray-400 mb-4">整数配列やTrue/Falseの配列でインデックスを指定できます。条件フィルタリングに特に有用です。</p>
        <PythonPlayground defaultCode={`import numpy as np

a = np.array([10, 20, 30, 40, 50, 60, 70, 80])

# ファンシーインデックス（整数配列で指定）
idx = np.array([0, 2, 4, 6])
print("インデックス [0,2,4,6]:", a[idx])

# ブーリアンインデックス（条件フィルタ）
mask = a > 40
print("\\n40より大きいマスク:", mask)
print("フィルタ結果:", a[mask])

# 条件を直接書く
print("30以上60以下:", a[(a >= 30) & (a <= 60)])

# 値の変更
b = a.copy()
b[b > 50] = 0
print("\\n50超を0に:", b)`} />
      </section>

      <LessonCompleteButton categoryId="numpy" lessonId="indexing" />
      <LessonNav lessons={lessons} currentId="indexing" basePath="/learn/numpy" />
    </div>
  );
}
