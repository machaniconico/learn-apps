import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">forループ</h1>
        <p className="text-gray-400">リストやrangeを使った繰り返し処理</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">forループとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code>ループは
          リスト・タプル・文字列・辞書などのイテラブルな（繰り返し可能な）オブジェクトの
          各要素に対して処理を繰り返します。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">for 変数 in イテラブル:</code> - 基本構文</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">for i in range(n):</code> - 0からn-1までループ</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">for i, v in enumerate(list):</code> - インデックスと値を同時に取得</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">for k, v in dict.items():</code> - 辞書のキーと値を同時に取得</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">forループの基本</h2>
        <PythonPlayground defaultCode={`# リストのforループ
fruits = ["りんご", "バナナ", "みかん", "ぶどう"]
print("フルーツリスト:")
for fruit in fruits:
    print(f"  - {fruit}")

# 文字列のforループ
print("\\nPythonの各文字:")
for char in "Python":
    print(char, end=" ")
print()

# rangeを使ったループ
print("\\n1から5の二乗:")
for i in range(1, 6):
    print(f"  {i}^2 = {i**2}")

# enumerate（インデックス付き）
print("\\n番号付きリスト:")
for i, fruit in enumerate(fruits, 1):
    print(f"  {i}. {fruit}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">for/else 構文</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonのforループには<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else</code>節を付けられます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">break</code>で終了しなかった場合に
          elseブロックが実行されます。検索処理などで使われます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>ループが正常に完了した場合 → else が実行される</li>
          <li>break でループが終了した場合 → else はスキップ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">辞書のループと for/else</h2>
        <PythonPlayground defaultCode={`# 辞書のforループ
scores = {"田中": 85, "山田": 92, "鈴木": 78}

print("=== キーのみ ===")
for name in scores:
    print(f"  {name}")

print("\\n=== キーと値 ===")
for name, score in scores.items():
    print(f"  {name}: {score}点")

# for/else の例
print("\\n=== 検索（for/else）===")
def find_high_scorer(scores, threshold):
    for name, score in scores.items():
        if score >= threshold:
            print(f"  {name}さんが{threshold}点以上: {score}点")
            break
    else:
        print(f"  {threshold}点以上の人はいませんでした")

find_high_scorer(scores, 90)
find_high_scorer(scores, 100)

# ネストしたforループ
print("\\n=== 掛け算表（3x3）===")
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i*j:3}", end="")
    print()`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="for-loop" basePath="/learn/control" />
    </div>
  );
}
