import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function MathPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">mathモジュール</h1>
        <p className="text-gray-400">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">math</code> モジュールは数学的な定数・三角関数・対数・べき乗などを提供します。
          科学技術計算やゲーム開発など様々な場面で活躍します。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">数学定数と基本関数</h2>
        <PythonPlayground
          defaultCode={`import math

# 数学定数
print(f"π (pi):  {math.pi}")
print(f"e:       {math.e}")
print(f"無限大:  {math.inf}")
print(f"NaN:     {math.nan}")
print(f"tau(2π): {math.tau}")

print()
# 丸め関数
print(f"ceil(4.2):  {math.ceil(4.2)}")   # 切り上げ
print(f"floor(4.8): {math.floor(4.8)}")  # 切り捨て
print(f"trunc(4.9): {math.trunc(4.9)}")  # 0方向への切り捨て
print(f"fabs(-3.5): {math.fabs(-3.5)}")  # 絶対値（float）

print()
# べき乗と平方根
print(f"sqrt(16):    {math.sqrt(16)}")
print(f"pow(2, 10):  {math.pow(2, 10)}")
print(f"log(100):    {math.log(100):.4f}")   # 自然対数
print(f"log10(100):  {math.log10(100)}")     # 常用対数
print(f"log2(1024):  {math.log2(1024)}")     # 2を底とする対数
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">三角関数とその応用</h2>
        <p className="text-gray-400 mb-4">
          三角関数の引数は<strong className="text-gray-300">ラジアン</strong>です。
          度からラジアンへの変換は <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">math.radians()</code> を使います。
        </p>
        <PythonPlayground
          defaultCode={`import math

# 度をラジアンに変換
print("=== 三角関数 ===")
angles_deg = [0, 30, 45, 60, 90]
for deg in angles_deg:
    rad = math.radians(deg)
    sin_val = math.sin(rad)
    cos_val = math.cos(rad)
    print(f"{deg:3}° → sin={sin_val:.4f}, cos={cos_val:.4f}")

print()
# 2点間の距離計算
print("=== 2点間の距離 ===")
def distance(x1, y1, x2, y2):
    return math.sqrt((x2-x1)**2 + (y2-y1)**2)

points = [(0, 0), (3, 4), (6, 8)]
for i in range(len(points)-1):
    d = distance(*points[i], *points[i+1])
    print(f"{points[i]} → {points[i+1]}: {d:.2f}")

print()
# 階乗と最大公約数
print(f"5! = {math.factorial(5)}")
print(f"gcd(48, 18) = {math.gcd(48, 18)}")
print(f"lcm(4, 6) = {math.lcm(4, 6)}")  # Python 3.9+
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="stdlib" lessonId="math" />
      </div>
      <LessonNav lessons={lessons} currentId="math" basePath="/learn/stdlib" />
    </div>
  );
}
