import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lists");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">リスト・タプル レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ネストされたリスト</h1>
        <p className="text-gray-400">リストの中にリストを持つ二次元データ構造を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">二次元リストの基本</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-3">
            リストの要素にリストを入れることで、表や行列のような二次元データを表現できます。
            アクセスには <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">lst[行][列]</code> のように二重インデックスを使います。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 二次元リスト（行列）
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# 行全体にアクセス
print("1行目:", matrix[0])
print("2行目:", matrix[1])

# 特定の要素にアクセス（行, 列）
print("matrix[1][2]:", matrix[1][2])  # 6

# 全要素を表示
for row in matrix:
    print(row)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">二次元リストの操作</h2>
        <PythonPlayground
          defaultCode={`# 成績表
grades = [
    ["田中", 90, 85, 92],
    ["鈴木", 75, 80, 70],
    ["佐藤", 95, 88, 91],
]

# ヘッダー
print(f"{'名前':<6} {'数学':>4} {'英語':>4} {'理科':>4} {'平均':>6}")
print("-" * 30)

for row in grades:
    name = row[0]
    scores = row[1:]
    avg = sum(scores) / len(scores)
    print(f"{name:<6} {scores[0]:>4} {scores[1]:>4} {scores[2]:>4} {avg:>6.1f}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">ネストされたリストの内包表記</h2>
        <PythonPlayground
          defaultCode={`# 内包表記で二次元リストを生成
# 3x3の0行列
zeros = [[0] * 3 for _ in range(3)]
print("ゼロ行列:")
for row in zeros:
    print(row)

# 九九の表
print("\n九九の表:")
table = [[i * j for j in range(1, 10)] for i in range(1, 10)]
for row in table[:3]:
    print(row[:5], "...")

# 二次元リストのフラット化
nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in nested for x in row]
print("\nフラット化:", flat)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="lists" lessonId="nested" />
      </div>
      <LessonNav lessons={lessons} currentId="nested" basePath="/learn/lists" />
    </div>
  );
}
