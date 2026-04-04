import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("numpy");

export default function NumpyBroadcastingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">NumPy レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ブロードキャスト</h1>
        <p className="text-gray-400">形状の異なる配列同士を自動的に拡張して演算するブロードキャストの仕組みを理解します。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ブロードキャストとは</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          ブロードキャストは、形状の異なる配列同士の演算を可能にするNumPyの仕組みです。
          小さい配列を大きい配列に合わせて「自動的に複製」して演算します。
          実際にデータをコピーするわけではないため、メモリ効率が良いです。
        </p>
        <div className="bg-gray-900 border border-blue-500/20 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-semibold mb-2">ブロードキャストのルール：</p>
          <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
            <li>次元数が異なる場合、小さい方の配列の左側に1を追加して次元数を合わせる</li>
            <li>各次元のサイズが1の場合、大きい方に合わせて拡張する</li>
            <li>どの次元も1でなく異なるサイズなら演算エラーとなる</li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">スカラーとのブロードキャスト</h2>
        <p className="text-gray-400 mb-4">スカラー（単一数値）との演算は最も基本的なブロードキャストです。</p>
        <PythonPlayground defaultCode={`import numpy as np

# スカラーとのブロードキャスト（最も基本的）
a = np.array([1, 2, 3, 4, 5])
print("a =", a)
print("a + 10 =", a + 10)    # 全要素に10を加算
print("a * 2 =", a * 2)      # 全要素を2倍
print("a ** 2 =", a ** 2)    # 全要素を2乗

# 2次元配列とスカラー
b = np.array([[1, 2, 3],
              [4, 5, 6]])
print("\\nb + 100:")
print(b + 100)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">異なる形状の配列間のブロードキャスト</h2>
        <PythonPlayground defaultCode={`import numpy as np

# 2次元配列と1次元配列のブロードキャスト
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])
row = np.array([10, 20, 30])  # shape: (3,)

print("A =")
print(A)
print("\\nrow =", row)
print("\\nA + row (各行にrowを加算):")
print(A + row)

# 列ベクトルとのブロードキャスト
col = np.array([[100], [200], [300]])  # shape: (3, 1)
print("\\ncol =")
print(col)
print("\\nA + col (各列にcolを加算):")
print(A + col)`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ブロードキャストの実用例</h2>
        <PythonPlayground defaultCode={`import numpy as np

# 正規化（各列をその列の平均で引く）
data = np.array([[100, 50, 200],
                 [80,  60, 180],
                 [90,  55, 195]])

col_mean = data.mean(axis=0)  # 各列の平均
print("列の平均:", col_mean)

normalized = data - col_mean  # ブロードキャストで正規化
print("\\n正規化後:")
print(normalized)

# 距離行列の計算
points = np.array([[0, 0], [1, 0], [0, 1], [1, 1]])
# (4,2)と(4,1,2)のブロードキャスト
diff = points[:, np.newaxis, :] - points[np.newaxis, :, :]
dist = np.sqrt((diff**2).sum(axis=2))
print("\\n距離行列:")
print(dist.round(2))`} />
      </section>

      <LessonCompleteButton categoryId="numpy" lessonId="broadcasting" />
      <LessonNav lessons={lessons} currentId="broadcasting" basePath="/learn/numpy" />
    </div>
  );
}
