import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function CommentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コメントとdocstring</h1>
        <p className="text-gray-400">コードに説明を付ける方法とdocstringの書き方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コメントとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コメントはプログラムの実行に影響しない説明文です。
          コードの意図・なぜそう書いたか・注意点などを記録するために使います。
          適切なコメントはコードを読みやすくし、チームでの協業や将来の自分への手がかりになります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded"># コメント</code> - 1行コメント（#以降の全てがコメント）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">"""文字列"""</code> - 複数行コメント（docstringとして使用）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">__doc__</code> - docstringへのアクセス</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コメントの書き方</h2>
        <PythonPlayground defaultCode={`# 1行コメントの例
x = 42  # xに42を代入

# 複数行のコメントブロック
# このブロックは処理の概要を説明します
# 入力: 数値のリスト
# 出力: 平均値

def calculate_average(numbers):
    # 空リストのチェック
    if not numbers:
        return 0

    total = sum(numbers)  # 合計を計算
    count = len(numbers)  # 個数を取得

    return total / count  # 平均を返す

scores = [85, 92, 78, 95, 88]
avg = calculate_average(scores)
print(f"平均点: {avg:.1f}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">docstringとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          docstringは関数・クラス・モジュールの直後に書く文字列ドキュメントです。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">help()</code>関数や
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">__doc__</code>属性でアクセスできます。
          コードの使い方を自己文書化するために活用します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-green-400">1行docstring</span> — 簡潔な説明を1行で書く</li>
          <li><span className="text-green-400">複数行docstring</span> — 概要・引数・戻り値・例を詳しく記述する</li>
          <li><span className="text-green-400">Google スタイル・NumPy スタイル</span> — よく使われる書き方の規約</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">docstringの書き方と参照</h2>
        <PythonPlayground defaultCode={`def add(a, b):
    """2つの数値を足して返す。"""
    return a + b

def calculate_bmi(weight, height):
    """
    BMI（体格指数）を計算して返す。

    Args:
        weight (float): 体重（kg）
        height (float): 身長（m）

    Returns:
        float: BMI値

    Examples:
        >>> calculate_bmi(65, 1.70)
        22.49
    """
    if height <= 0:
        raise ValueError("身長は0より大きい値を指定してください")
    return weight / (height ** 2)

# docstringの確認
print(add.__doc__)
print()
print(calculate_bmi.__doc__)

# 実際に使ってみる
bmi = calculate_bmi(65, 1.70)
print(f"BMI: {bmi:.2f}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="comments" />
      </div>
      <LessonNav lessons={lessons} currentId="comments" basePath="/learn/basics" />
    </div>
  );
}
