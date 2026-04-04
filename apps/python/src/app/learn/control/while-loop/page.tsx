import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function WhileLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">whileループ</h1>
        <p className="text-gray-400">条件が真の間繰り返すwhileの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">whileループとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">while</code>ループは
          指定した条件がTrueである間、処理を繰り返します。
          繰り返し回数が事前にわからない場合や、ユーザー入力を待つ場合によく使われます。
          条件が永遠にTrueになると無限ループになるため、必ずループを終了させる条件を書きましょう。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">while 条件:</code> - 基本構文</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">while True:</code> - 無限ループ（break で終了）</li>
          <li>ループ変数を更新して条件をFalseにする</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">whileループの基本</h2>
        <PythonPlayground defaultCode={`# カウントダウン
count = 5
print("カウントダウン開始:")
while count > 0:
    print(f"  {count}...")
    count -= 1  # 必ず更新する！
print("発射！")

# 合計計算
total = 0
n = 1
print("\\n1から100の合計:")
while n <= 100:
    total += n
    n += 1
print(f"  1+2+...+100 = {total}")

# コレクションの処理
items = [3, 7, 1, 9, 4, 6, 2]
print("\\nリストから偶数を除去:")
while len(items) > 0:
    item = items.pop(0)
    if item % 2 == 0:
        print(f"  {item} を除去（偶数）")
    else:
        print(f"  {item} はそのまま（奇数）")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">while True パターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">while True:</code>で
          無限ループを作り、内部でbreakを使って終了する書き方です。
          特定の条件が満たされるまで繰り返すパターンによく使われます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>ループの終了条件が複雑な場合に便利</li>
          <li>必ずbreakを入れてループを抜け出せるようにする</li>
          <li>ユーザー入力の検証ループでよく使われる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">while True を使った処理</h2>
        <PythonPlayground defaultCode={`# 素数判定（while Trueパターン）
def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    i = 3
    while True:
        if i * i > n:
            break
        if n % i == 0:
            return False
        i += 2
    return True

# 2から30の素数を表示
print("2から30の素数:")
primes = []
n = 2
while n <= 30:
    if is_prime(n):
        primes.append(n)
    n += 1
print(primes)

# コラッツ予想
def collatz(n):
    steps = 0
    while n != 1:
        if n % 2 == 0:
            n //= 2
        else:
            n = 3 * n + 1
        steps += 1
    return steps

print("\\nコラッツ予想のステップ数:")
for start in [6, 27, 100]:
    print(f"  {start} → 1 まで {collatz(start)} ステップ")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="while-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="while-loop" basePath="/learn/control" />
    </div>
  );
}
