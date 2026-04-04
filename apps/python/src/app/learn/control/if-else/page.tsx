import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function IfElsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if文</h1>
        <p className="text-gray-400">条件に応じて処理を分岐させる基本構文</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if文とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if</code>文は
          条件が True のときだけ特定の処理を実行する制御構文です。
          条件が False のときの処理は
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else</code>で定義できます。
          Pythonではインデント（4スペース）がブロックの範囲を決めます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if 条件:</code> - 条件がTrueのとき実行</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else:</code> - 条件がFalseのとき実行</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">値 if 条件 else 値</code> - 三項演算子（1行条件式）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">if/elseの基本</h2>
        <PythonPlayground defaultCode={`# if/elseの基本構文
temperature = 28

if temperature >= 30:
    print("今日は暑いです！")
    print("熱中症に注意しましょう")
else:
    print("今日は過ごしやすい気温です")
    print(f"気温: {temperature}°C")

# 条件のみ（elseなし）
is_raining = False
if is_raining:
    print("\\n傘を持って行きましょう")

print("今日も良い一日を！")

# 三項演算子（1行条件式）
age = 20
status = "成人" if age >= 18 else "未成年"
print(f"\\n年齢 {age}歳: {status}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">条件式の書き方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          if文の条件には比較演算子・論理演算子・in演算子など様々な式が使えます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if x &gt; 0:</code> - 比較演算子</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if x &gt; 0 and x &lt; 10:</code> - 論理演算子</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if 0 &lt; x &lt; 10:</code> - チェーン比較（Pythonの特徴）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if item in list:</code> - メンバーシップ確認</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if x is None:</code> - 同一性確認</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">様々な条件式</h2>
        <PythonPlayground defaultCode={`# 様々な条件式の例

# チェーン比較
score = 75
if 60 <= score < 80:
    print(f"スコア {score}: B評価")

# in演算子
day = "土曜日"
weekdays = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日"]
if day in weekdays:
    print(f"{day}は平日です")
else:
    print(f"{day}は休日です")

# is/is not
value = None
if value is None:
    print("\\n値が設定されていません")
if value is not None:
    print("値が存在します")

# 文字列・リストの真偽値チェック
name = "田中"
items = []

if name:
    print(f"\\nこんにちは、{name}さん")

if not items:
    print("リストが空です")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}
