import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("lists");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">リスト・タプル レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">タプルのアンパック</h1>
        <p className="text-gray-400">タプルの値を複数の変数に一度に代入する方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">基本的なアンパック</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300">
            アンパック（分割代入）とは、タプルやリストの要素を複数の変数に一度に割り当てる操作です。
            コードを簡潔にできる強力な機能です。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 基本的なアンパック
point = (3, 7)
x, y = point
print(f"x={x}, y={y}")

# RGB値のアンパック
rgb = (255, 128, 0)
red, green, blue = rgb
print(f"R={red}, G={green}, B={blue}")

# 変数のスワップ（アンパックの慣用句）
a, b = 10, 20
print(f"スワップ前: a={a}, b={b}")
a, b = b, a
print(f"スワップ後: a={a}, b={b}")

# リストも同様にアンパックできる
first, second, third = ["alpha", "beta", "gamma"]
print(f"{first}, {second}, {third}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">スター(*) を使った拡張アンパック</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">*変数名</code> を使うと、余った要素をリストとしてまとめて受け取れます。
        </p>
        <PythonPlayground
          defaultCode={`# スターを使った拡張アンパック
numbers = [1, 2, 3, 4, 5]

# 最初と最後を取り出し、残りはリストに
first, *middle, last = numbers
print(f"最初: {first}")
print(f"中間: {middle}")
print(f"最後: {last}")

# 最初の2つと残り
a, b, *rest = [10, 20, 30, 40, 50]
print(f"a={a}, b={b}, rest={rest}")

# 関数の戻り値のアンパック
def get_stats(data):
    return min(data), max(data), sum(data) / len(data)

data = [85, 92, 78, 95, 88]
minimum, maximum, average = get_stats(data)
print(f"最小: {minimum}, 最大: {maximum}, 平均: {average:.1f}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">アンパックの実用例</h2>
        <PythonPlayground
          defaultCode={`# forループでのアンパック
pairs = [(1, "one"), (2, "two"), (3, "three")]
for num, word in pairs:
    print(f"{num} = {word}")

# 辞書の items() でアンパック
scores = {"田中": 90, "鈴木": 85, "佐藤": 92}
for name, score in scores.items():
    print(f"{name}: {score}点")

# ネストしたアンパック
data = [("Alice", (25, "東京")), ("Bob", (30, "大阪"))]
for name, (age, city) in data:
    print(f"{name}: {age}歳, {city}在住")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="lists" lessonId="tuple-unpacking" />
      </div>
      <LessonNav lessons={lessons} currentId="tuple-unpacking" basePath="/learn/lists" />
    </div>
  );
}
