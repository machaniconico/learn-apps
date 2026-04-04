import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function OperatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">演算子</h1>
        <p className="text-gray-400">算術・比較・論理演算子を使いこなす</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          数値の計算に使う演算子です。数学と同じような感覚で使えますが、いくつかPython特有の演算子があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">+</code> - 加算（足し算）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">-</code> - 減算（引き算）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">*</code> - 乗算（掛け算）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">/</code> - 除算（割り算）、結果はfloat</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">//</code> - 整数除算（切り捨て）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">%</code> - 剰余（余り）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">**</code> - べき乗</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">算術演算子を試してみよう</h2>
        <PythonPlayground defaultCode={`a = 17
b = 5

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")    # 3.4 (float)
print(f"{a} // {b} = {a // b}")  # 3 (整数除算)
print(f"{a} % {b} = {a % b}")   # 2 (余り)
print(f"{a} ** {b} = {a ** b}")  # 1419857

# 複合代入演算子
x = 10
x += 5   # x = x + 5
print(f"\\nx += 5 → {x}")
x -= 3
print(f"x -= 3 → {x}")
x *= 2
print(f"x *= 2 → {x}")
x //= 4
print(f"x //= 4 → {x}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子と論理演算子</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          比較演算子は2つの値を比較して True または False を返します。
          論理演算子は複数の条件を組み合わせます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">==</code> - 等しい　<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">!=</code> - 等しくない</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;</code> - より小さい　<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt;</code> - より大きい</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;=</code> - 以下　<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt;=</code> - 以上</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">and</code> - かつ（両方True）　<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">or</code> - または（どちらかTrue）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">not</code> - 否定（TrueとFalseを逆転）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較・論理演算子を試してみよう</h2>
        <PythonPlayground defaultCode={`# 比較演算子
x = 10
print(f"x = {x}")
print(f"x == 10: {x == 10}")
print(f"x != 10: {x != 10}")
print(f"x > 5:   {x > 5}")
print(f"x < 5:   {x < 5}")
print(f"x >= 10: {x >= 10}")
print(f"x <= 10: {x <= 10}")

# 論理演算子
age = 20
has_id = True
print(f"\\nage = {age}, has_id = {has_id}")
print(f"age >= 18 and has_id: {age >= 18 and has_id}")
print(f"age < 18 or has_id: {age < 18 or has_id}")
print(f"not has_id: {not has_id}")

# チェーン比較（Pythonの便利な機能）
score = 75
print(f"\\nscore = {score}")
print(f"60 <= score <= 80: {60 <= score <= 80}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="operators" />
      </div>
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}
