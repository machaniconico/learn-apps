import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NumbersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">数値と計算</h1>
        <p className="text-gray-400">整数・浮動小数点数の計算と数学関数</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">数値の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonには主に2種類の数値型があります。
          整数型（int）は任意の大きさの整数を扱え、浮動小数点型（float）は小数を扱います。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">int</code> - 整数。サイズ制限なし（例: 123, -456, 1_000_000）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">float</code> - 浮動小数点数（例: 3.14, -0.5, 1.5e10）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">complex</code> - 複素数（例: 3+4j）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">1_000_000</code> - アンダースコアで桁区切り可能（Python 3.6以降）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数値の計算</h2>
        <PythonPlayground defaultCode={`# 整数の計算
print("=== 整数の計算 ===")
print(f"大きな数: {10 ** 20}")
print(f"2進数: {0b1010}")    # 10
print(f"16進数: {0xFF}")      # 255
print(f"8進数: {0o17}")       # 15

# 浮動小数点の注意点
print("\\n=== 浮動小数点の注意 ===")
print(f"0.1 + 0.2 = {0.1 + 0.2}")          # 精度の問題
print(f"round(0.1 + 0.2, 1) = {round(0.1 + 0.2, 1)}")  # 丸め

# 数学関数
import math
print("\\n=== mathモジュール ===")
print(f"math.pi = {math.pi}")
print(f"math.e  = {math.e}")
print(f"math.sqrt(16) = {math.sqrt(16)}")
print(f"math.floor(3.7) = {math.floor(3.7)}")
print(f"math.ceil(3.2) = {math.ceil(3.2)}")
print(f"math.abs(-5) = {abs(-5)}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">組み込み数値関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonにはインポート不要で使える便利な数値関数が組み込まれています。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">abs(x)</code> - 絶対値</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">round(x, n)</code> - 四捨五入（n桁）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">max(a, b, ...)</code> - 最大値</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">min(a, b, ...)</code> - 最小値</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">sum(iterable)</code> - 合計</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">pow(x, y)</code> - べき乗（x**yと同じ）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">divmod(x, y)</code> - 商と余りをタプルで返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実践的な計算</h2>
        <p className="text-gray-400 mb-4">実際のプログラムでよく使う計算パターンを練習しましょう。</p>
        <PythonPlayground defaultCode={`# BMI計算
weight = 65.0  # kg
height = 1.70  # m
bmi = weight / (height ** 2)
print(f"BMI: {bmi:.1f}")

if bmi < 18.5:
    status = "低体重"
elif bmi < 25.0:
    status = "標準"
elif bmi < 30.0:
    status = "肥満度1"
else:
    status = "肥満度2以上"
print(f"判定: {status}")

# 利率計算（複利）
principal = 100_000   # 元金
rate = 0.03           # 年利3%
years = 10            # 10年
amount = principal * (1 + rate) ** years
print(f"\\n元金: {principal:,}円")
print(f"年利: {rate * 100}%")
print(f"{years}年後: {amount:,.0f}円")
print(f"利益: {amount - principal:,.0f}円")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="numbers" />
      </div>
      <LessonNav lessons={lessons} currentId="numbers" basePath="/learn/basics" />
    </div>
  );
}
