import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ReturnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">関数 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">戻り値</h1>
        <p className="text-gray-400">return文で関数から値を返す方法</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">return文とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">return</code>文は
          関数から値を返すための命令です。returnに達すると関数の実行が終了します。
          returnなし（またはreturnのみ）の関数はNoneを返します。
          Pythonでは複数の値をタプルとして返すことができます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">return 値</code> - 値を返して関数を終了</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">return</code> - Noneを返して関数を終了</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">return a, b, c</code> - タプルとして複数の値を返す</li>
          <li>関数はreturnが実行された時点で終了する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">return文の様々な使い方</h2>
        <PythonPlayground defaultCode={`# 単一の値を返す
def square(n):
    return n ** 2

print(f"square(5) = {square(5)}")
print(f"square(10) = {square(10)}")

# 早期return（ガード節）
def safe_divide(a, b):
    if b == 0:
        return None  # 早期return
    return a / b

print(f"\\nsafe_divide(10, 2) = {safe_divide(10, 2)}")
print(f"safe_divide(10, 0) = {safe_divide(10, 0)}")

# 複数の値を返す（タプル）
def min_max(numbers):
    return min(numbers), max(numbers)

data = [3, 7, 1, 9, 4, 6, 2]
minimum, maximum = min_max(data)
print(f"\\nデータ: {data}")
print(f"最小: {minimum}, 最大: {maximum}")

# タプルとして受け取ることもできる
result = min_max(data)
print(f"タプルとして: {result}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">戻り値の型ヒント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Python 3.5以降では型ヒント（Type Hints）を使って引数と戻り値の型を明示できます。
          実行時には強制されませんが、コードの読みやすさが向上し、IDEのサポートも受けられます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">def func(x: int) -&gt; str:</code> - 引数と戻り値の型を指定</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">Optional[str]</code> - Noneまたは指定した型</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">tuple[int, str]</code> - タプルの型</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型ヒントを使った関数</h2>
        <PythonPlayground defaultCode={`from typing import Optional

# 型ヒント付き関数
def calculate_grade(score: float) -> str:
    """スコアから評価を返す"""
    if score >= 90:
        return "S"
    elif score >= 80:
        return "A"
    elif score >= 70:
        return "B"
    elif score >= 60:
        return "C"
    else:
        return "F"

# 複数の型ヒント
def parse_number(s: str) -> Optional[float]:
    """文字列を数値に変換する。失敗したらNoneを返す"""
    try:
        return float(s)
    except ValueError:
        return None

# タプルの戻り値
def divide_with_remainder(a: int, b: int) -> tuple[int, int]:
    """商と余りをタプルで返す"""
    return divmod(a, b)

# テスト
scores = [95.5, 82.0, 71.5, 55.0]
for score in scores:
    print(f"{score}点: {calculate_grade(score)}")

print()
test_strings = ["3.14", "42", "hello", "100"]
for s in test_strings:
    result = parse_number(s)
    print(f"parse_number('{s}') = {result}")

print()
q, r = divide_with_remainder(17, 5)
print(f"17 ÷ 5 = {q} 余り {r}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="return" />
      </div>
      <LessonNav lessons={lessons} currentId="return" basePath="/learn/functions" />
    </div>
  );
}
