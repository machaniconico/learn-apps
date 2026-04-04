import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lists");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">リスト・タプル レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リスト・タプル演習</h1>
        <p className="text-gray-400">リストとタプルを活用した実践問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1：リスト操作の基本</h2>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
          <p className="text-orange-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            1〜10の数字のリストを作成し、偶数のみを取り出したリストと、奇数の合計を計算してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習1：リスト操作
numbers = list(range(1, 11))
print("元のリスト:", numbers)

# 偶数のみ取り出す（内包表記で）
evens = [n for n in numbers if n % 2 == 0]
print("偶数:", evens)

# 奇数の合計
odd_sum = sum(n for n in numbers if n % 2 != 0)
print("奇数の合計:", odd_sum)

# 上位3つ（ソートしてスライス）
top3 = sorted(numbers, reverse=True)[:3]
print("上位3つ:", top3)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2：成績処理システム</h2>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
          <p className="text-orange-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            生徒名と成績のリストから、平均点以上の生徒を抽出し、成績順にランキングを表示してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習2：成績処理
students = [
    ("田中", 85),
    ("鈴木", 72),
    ("佐藤", 91),
    ("山田", 78),
    ("中村", 95),
    ("小林", 68),
]

# 平均点を計算
scores = [score for _, score in students]
average = sum(scores) / len(scores)
print(f"平均点: {average:.1f}点")

# 成績順でソート
ranked = sorted(students, key=lambda x: x[1], reverse=True)

print("\n成績ランキング:")
for i, (name, score) in enumerate(ranked, start=1):
    mark = "★" if score >= average else " "
    print(f"{i}位 {mark} {name}: {score}点")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3：買い物リスト管理</h2>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
          <p className="text-orange-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            商品名と価格のタプルリストを使って、合計金額、最高額商品、予算内の商品リストを表示してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習3：買い物リスト
shopping = [
    ("りんご", 150),
    ("牛乳", 210),
    ("パン", 280),
    ("卵", 320),
    ("チーズ", 450),
    ("ジュース", 180),
]

budget = 700

# 合計金額
total = sum(price for _, price in shopping)
print(f"合計金額: {total}円")

# 最高額商品
most_expensive = max(shopping, key=lambda x: x[1])
print(f"最高額: {most_expensive[0]} ({most_expensive[1]}円)")

# 予算内の組み合わせを探す（貪欲法）
affordable = [(name, price) for name, price in shopping if price <= budget]
print(f"\n予算{budget}円以内の商品:")
for name, price in sorted(affordable, key=lambda x: x[1]):
    print(f"  {name}: {price}円")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習4：行列の転置</h2>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
          <p className="text-orange-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            二次元リスト（行列）を転置（行と列を入れ替える）してください。zip と内包表記を活用しましょう。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習4：行列の転置
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

print("元の行列:")
for row in matrix:
    print(row)

# zip を使った転置
transposed = [list(row) for row in zip(*matrix)]

print("\n転置後:")
for row in transposed:
    print(row)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="lists" lessonId="lists-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="lists-exercise" basePath="/learn/lists" />
    </div>
  );
}
