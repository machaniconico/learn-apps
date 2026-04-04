import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithm");

export default function AlgorithmComplexityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">アルゴリズム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">計算量とBig-O記法</h1>
        <p className="text-gray-400">アルゴリズムの効率を表すO記法の読み方と考え方</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">計算量とは何か</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">計算量（Complexity）</strong>は、アルゴリズムが入力データのサイズ
          <code className="bg-gray-800 text-yellow-300 px-1 rounded">n</code>に対してどれだけの
          時間（時間計算量）やメモリ（空間計算量）を必要とするかを表す指標です。
        </p>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">Big-O記法</strong>は最悪ケースの増加率を表します。
          定数倍は無視し、最も支配的な項だけを残します。
          例えば <code className="bg-gray-800 text-yellow-300 px-1 rounded">3n² + 5n + 2</code> は
          <code className="bg-gray-800 text-yellow-300 px-1 rounded">O(n²)</code>と表します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">主要なBig-O記法の比較</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">記法</th>
                <th className="text-left py-3 px-4 text-gray-300">名称</th>
                <th className="text-left py-3 px-4 text-gray-300">n=100 の処理量</th>
                <th className="text-left py-3 px-4 text-gray-300">例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { notation: "O(1)", name: "定数時間", ops: "1", example: "配列のインデックスアクセス" },
                { notation: "O(log n)", name: "対数時間", ops: "7", example: "二分探索" },
                { notation: "O(n)", name: "線形時間", ops: "100", example: "線形探索" },
                { notation: "O(n log n)", name: "線形対数時間", ops: "700", example: "マージソート、クイックソート" },
                { notation: "O(n²)", name: "二乗時間", ops: "10,000", example: "バブルソート、選択ソート" },
                { notation: "O(2ⁿ)", name: "指数時間", ops: "2¹⁰⁰ (天文学的)", example: "部分集合の全探索" },
              ].map((row) => (
                <tr key={row.notation} className="hover:bg-gray-800/30">
                  <td className="py-3 px-4">
                    <code className="text-yellow-400 font-mono">{row.notation}</code>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{row.name}</td>
                  <td className="py-3 px-4 text-gray-400 font-mono">{row.ops}</td>
                  <td className="py-3 px-4 text-gray-400">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">計算量の見分け方</h2>
        <div className="space-y-3 mb-6">
          {[
            { code: "return arr[0]", complexity: "O(1)", desc: "処理量が入力サイズに関わらず一定" },
            { code: "for x in arr: print(x)", complexity: "O(n)", desc: "1回のループ — nに比例" },
            { code: "for i in arr:\n  for j in arr: ...", complexity: "O(n²)", desc: "二重ループ — n²に比例" },
            { code: "while n > 1:\n  n = n // 2", complexity: "O(log n)", desc: "毎回半分に減らす" },
          ].map((item) => (
            <div key={item.complexity} className="flex items-start gap-4 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <code className="text-yellow-400 font-mono text-sm font-bold shrink-0 w-20">{item.complexity}</code>
              <div>
                <pre className="text-gray-300 text-xs font-mono mb-1">{item.code}</pre>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">計算量の違いを体感しよう</h2>
        <PythonPlayground
          defaultCode={`import time

def measure(func, n):
    start = time.perf_counter()
    func(n)
    return (time.perf_counter() - start) * 1000  # ms

# O(1): 定数時間
def constant(n):
    arr = list(range(n))
    return arr[0]  # インデックスアクセス

# O(n): 線形時間
def linear(n):
    arr = list(range(n))
    total = 0
    for x in arr:
        total += x
    return total

# O(n²): 二乗時間
def quadratic(n):
    arr = list(range(n))
    count = 0
    for i in arr:
        for j in arr:
            count += 1
    return count

# O(log n): 対数時間
def logarithmic(n):
    count = 0
    while n > 1:
        n //= 2
        count += 1
    return count

sizes = [100, 500, 1000, 2000]
print(f"{'n':>5} | {'O(1)':>8} | {'O(log n)':>10} | {'O(n)':>8} | {'O(n²)':>8}")
print("-" * 55)

for n in sizes:
    t1 = measure(constant, n)
    t2 = measure(logarithmic, n)
    t3 = measure(linear, n)
    t4 = measure(quadratic, n)
    print(f"{n:>5} | {t1:>7.3f}ms | {t2:>9.3f}ms | {t3:>7.3f}ms | {t4:>7.3f}ms")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="algorithm" lessonId="complexity" />
      </div>
      <LessonNav lessons={lessons} currentId="complexity" basePath="/learn/algorithm" />
    </div>
  );
}
