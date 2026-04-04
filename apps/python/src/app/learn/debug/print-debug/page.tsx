import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugPrintPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">print デバッグ</h1>
        <p className="text-gray-400">print()を戦略的に使ってバグを素早く特定する方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">printデバッグの考え方</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1 rounded text-orange-300">print()</code> によるデバッグは最も手軽な手法です。
          しかし「とにかく print を追加する」ではなく、<strong className="text-white">問題の仮説を立てて検証する</strong>
          戦略的なアプローチが重要です。
          変数の値・型・実行フローを段階的に絞り込むことでバグを効率よく特定できます。
        </p>
        <div className="bg-gray-900 border border-orange-500/20 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-semibold mb-2">デバッグの手順：</p>
          <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
            <li>バグが発生する最小の再現コードを特定する</li>
            <li>予想される出力と実際の出力の差を確認する</li>
            <li>二分探索的にprint位置を絞り込む</li>
            <li>変数の型・値・型変換が正しいか確認する</li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">バグを見つけよう</h2>
        <p className="text-gray-400 mb-4">意図的にバグが仕込まれたコードを、print デバッグで特定してみましょう。</p>
        <PythonPlayground defaultCode={`# バグが含まれるコード
def calculate_statistics(numbers):
    """数値リストの統計情報を計算する"""
    total = 0
    for n in numbers:
        total = total + n  # 意図的バグ: =+ にして上書き
    count = len(numbers)
    average = total / count
    return {'合計': total, '件数': count, '平均': average}

# テストデータ
data = [10, 20, 30, 40, 50]

print("=== printデバッグで問題を探す ===")
print(f"入力データ: {data}")

# デバッグ用printを追加
total_debug = 0
for i, n in enumerate(data):
    total_debug = total_debug + n
    print(f"  ループ {i}: n={n}, total={total_debug}")  # 各ステップを確認

result = calculate_statistics(data)
print(f"\\n結果: {result}")
print(f"期待する合計: {sum(data)}")
print(f"実際の合計: {result['合計']}")

if result['合計'] != sum(data):
    print("\\n[バグ発見] 合計値が正しくありません！")
else:
    print("\\n計算結果は正しいです")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">デバッグ出力を整える</h2>
        <p className="text-gray-400 mb-4">デバッグ用の出力を見やすくするテクニックを身につけましょう。</p>
        <PythonPlayground defaultCode={`# デバッグ出力を整理するパターン

def debug_print(label, value, level=0):
    """インデント付きのデバッグ出力"""
    indent = "  " * level
    print(f"{indent}[DEBUG] {label}: {repr(value)} (型: {type(value).__name__})")

def process_orders(orders):
    """注文リストを処理する"""
    debug_print("orders入力", orders)

    total = 0
    processed = []

    for i, order in enumerate(orders):
        debug_print(f"order[{i}]", order, level=1)

        price = order.get('price', 0)
        qty = order.get('quantity', 0)
        amount = price * qty

        debug_print(f"  price={price}, qty={qty}, amount", amount, level=2)
        total += amount
        processed.append({**order, 'amount': amount})

    debug_print("合計", total)
    return processed, total

# テスト
orders = [
    {'item': 'A', 'price': 100, 'quantity': 3},
    {'item': 'B', 'price': 250, 'quantity': 2},
    {'item': 'C', 'price': 50},  # 数量が欠落（バグの元）
]

print("=== 注文処理デバッグ ===")
result, total = process_orders(orders)
print(f"\\n合計: {total}円")`} />
      </section>

      <LessonCompleteButton categoryId="debug" lessonId="print-debug" />
      <LessonNav lessons={lessons} currentId="print-debug" basePath="/learn/debug" />
    </div>
  );
}
