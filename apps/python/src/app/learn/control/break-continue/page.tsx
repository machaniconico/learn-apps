import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function BreakContinuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">break・continue</h1>
        <p className="text-gray-400">ループを中断・スキップする制御文</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">break と continue</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ループの流れを細かく制御するための2つのキーワードです。
          これらを使いこなすことで、より効率的なループが書けます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">break</code> - ループを即座に終了してループの外へ</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">continue</code> - 現在のイテレーションをスキップして次へ</li>
          <li>どちらもforループとwhileループの両方で使える</li>
          <li>ネストしたループでは内側のループのみに効果がある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">break の使い方</h2>
        <PythonPlayground defaultCode={`# breakでループを終了
print("=== breakの例 ===")
numbers = [3, 7, 2, 8, 5, 1, 9, 4]
target = 8

for n in numbers:
    print(f"  確認: {n}")
    if n == target:
        print(f"  {target} が見つかりました！")
        break

# whileループでのbreak
print("\\n=== FizzBuzz（breakあり）===")
n = 1
while True:
    if n % 15 == 0:
        print(f"{n}: FizzBuzz")
        break
    elif n % 3 == 0:
        print(f"{n}: Fizz")
    elif n % 5 == 0:
        print(f"{n}: Buzz")
    else:
        print(f"{n}: {n}")
    n += 1
print("最初のFizzBuzzを見つけて終了！")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">continue の使い方</h2>
        <PythonPlayground defaultCode={`# continueで現在のイテレーションをスキップ
print("=== continueの例 ===")
print("偶数のみ表示（奇数をスキップ）:")
for i in range(1, 11):
    if i % 2 != 0:
        continue   # 奇数はスキップ
    print(f"  {i}")

# 有効なデータのみ処理
data = [10, -3, 25, None, 8, -1, 42, None, 5]
print("\\n正の数のみ合計:")
total = 0
for item in data:
    if item is None or item <= 0:
        continue   # None や負の数はスキップ
    total += item
    print(f"  {item} を追加 → 合計: {total}")

print(f"最終合計: {total}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">breakとcontinueの使いどころ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          どちらを使うかは処理の目的によって決まります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><strong className="text-white">break を使う場面:</strong> 条件を満たす要素を見つけたら終了、エラー発生時に早期終了</li>
          <li><strong className="text-white">continue を使う場面:</strong> 特定の条件の要素をスキップ、無効データのフィルタリング</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践：データフィルタリング</h2>
        <PythonPlayground defaultCode={`# break と continue を組み合わせた実践例
students = [
    {"name": "田中", "score": 85, "active": True},
    {"name": "山田", "score": 92, "active": True},
    {"name": "鈴木", "score": 45, "active": False},
    {"name": "佐藤", "score": 78, "active": True},
    {"name": "高橋", "score": 95, "active": True},
]

print("アクティブな学生の成績（90点以上で検索終了）:")
high_scorer = None

for student in students:
    # 非アクティブはスキップ
    if not student["active"]:
        print(f"  {student['name']}: 非アクティブ（スキップ）")
        continue

    score = student["score"]
    print(f"  {student['name']}: {score}点")

    # 90点以上が見つかったら終了
    if score >= 90:
        high_scorer = student
        break

if high_scorer:
    print(f"\\n最初の高得点者: {high_scorer['name']} ({high_scorer['score']}点)")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="break-continue" />
      </div>
      <LessonNav lessons={lessons} currentId="break-continue" basePath="/learn/control" />
    </div>
  );
}
