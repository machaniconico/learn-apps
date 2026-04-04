import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function RangePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">range関数</h1>
        <p className="text-gray-400">連続した数値のシーケンスを生成する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">range()とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">range()</code>は
          整数のシーケンスを生成する組み込み関数です。
          forループと組み合わせて特定の回数だけ処理を繰り返すのによく使われます。
          実際にはリストを作成せず、値を必要なときに1つずつ生成するため省メモリです。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">range(n)</code> - 0からn-1まで（1ずつ増加）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">range(start, stop)</code> - startからstop-1まで</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">range(start, stop, step)</code> - stepずつ増加</li>
          <li>stepを負にすると降順になる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">range()の各種パターン</h2>
        <PythonPlayground defaultCode={`# range(n) - 0からn-1
print("range(5):", list(range(5)))

# range(start, stop) - startからstop-1
print("range(1, 6):", list(range(1, 6)))
print("range(3, 10):", list(range(3, 10)))

# range(start, stop, step) - stepずつ増加
print("range(0, 20, 5):", list(range(0, 20, 5)))
print("range(1, 10, 2):", list(range(1, 10, 2)))  # 奇数

# 負のstepで降順
print("range(10, 0, -1):", list(range(10, 0, -1)))
print("range(10, -1, -2):", list(range(10, -1, -2)))

# forループでの使用
print("\\n1から10の合計:")
total = sum(range(1, 11))
print(f"  sum(range(1, 11)) = {total}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">range()の特徴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          range()はリストではなく「rangeオブジェクト」を返します。
          必要なときに値を生成するため、range(1000000)としても少ないメモリしか使いません。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">range()</code> はイテラブル（繰り返し可能）なオブジェクト</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">list(range(n))</code> でリストに変換できる</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">n in range(m)</code> でn がrange内にあるか確認できる</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">len(range(n))</code> で長さを取得できる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">range()の実践的な使い方</h2>
        <PythonPlayground defaultCode={`# インデックスを使ったリスト操作
colors = ["赤", "青", "緑", "黄", "紫"]

print("インデックス付きで表示:")
for i in range(len(colors)):
    print(f"  [{i}] {colors[i]}")

# N回繰り返す
print("\\n'hello'を3回表示:")
for _ in range(3):  # アンダースコアは使わない変数
    print("  hello")

# 逆順のリストを処理
print("\\n逆順:")
for i in range(len(colors) - 1, -1, -1):
    print(f"  {colors[i]}")

# 2次元グリッドの生成
print("\\n3x3のグリッド:")
grid = []
for row in range(3):
    grid_row = []
    for col in range(3):
        grid_row.append(row * 3 + col + 1)
    grid.append(grid_row)

for row in grid:
    print("  ", row)`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="range" />
      </div>
      <LessonNav lessons={lessons} currentId="range" basePath="/learn/control" />
    </div>
  );
}
