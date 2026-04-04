import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function LambdaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ラムダ式</h1>
        <p className="text-gray-400">無名関数lambdaの書き方と活用シーン</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">lambda</code>は
          名前のない小さな関数（無名関数）を作るキーワードです。
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">def</code>で定義する関数より簡潔に書けますが、
          単一の式しか書けない制限があります。
          ソートのキー関数や高階関数に渡す短い処理に適しています。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">lambda 引数: 式</code> - 基本構文</li>
          <li>複数の引数: <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">lambda x, y: x + y</code></li>
          <li>引数なし: <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">lambda: "hello"</code></li>
          <li>式は1つのみ（複数行の処理はdefで書く）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式の基本</h2>
        <PythonPlayground defaultCode={`# ラムダ式の基本
double = lambda x: x * 2
square = lambda x: x ** 2
add = lambda x, y: x + y

print(f"double(5) = {double(5)}")
print(f"square(4) = {square(4)}")
print(f"add(3, 7) = {add(3, 7)}")

# defで書いた場合と同等
def double_def(x):
    return x * 2

print(f"\\ndouble(5) == double_def(5): {double(5) == double_def(5)}")

# 即時実行
result = (lambda x, y: x ** y)(2, 10)
print(f"\\n(lambda x, y: x**y)(2, 10) = {result}")

# 条件式も使える
classify = lambda x: "正" if x > 0 else "ゼロ" if x == 0 else "負"
for n in [5, 0, -3]:
    print(f"classify({n}) = {classify(n)}")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式の実践的な活用</h2>
        <p className="text-gray-400 mb-4">ソート・map・filter・sortedなどの高階関数とよく組み合わせます。</p>
        <PythonPlayground defaultCode={`# sorted()のkeyとして使う
students = [
    {"name": "田中", "score": 85, "age": 22},
    {"name": "山田", "score": 92, "age": 20},
    {"name": "鈴木", "score": 78, "age": 25},
    {"name": "佐藤", "score": 92, "age": 19},
]

# スコアで降順ソート
by_score = sorted(students, key=lambda s: s["score"], reverse=True)
print("スコア順:")
for s in by_score:
    print(f"  {s['name']}: {s['score']}点")

# スコアが同じ場合は年齢で昇順
by_score_then_age = sorted(
    students,
    key=lambda s: (-s["score"], s["age"])
)
print("\\nスコア降順、同スコアは年齢昇順:")
for s in by_score_then_age:
    print(f"  {s['name']}: {s['score']}点 ({s['age']}歳)")

# map() と filter()
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"\\n二乗: {squares}")
print(f"偶数: {evens}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="lambda" />
      </div>
      <LessonNav lessons={lessons} currentId="lambda" basePath="/learn/functions" />
    </div>
  );
}
