import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">比較演算子</h1>
        <p className="text-gray-400">==・!=・&lt;・&gt;など値を比較する演算子</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子の一覧</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          比較演算子は2つの値を比較してTrueまたはFalseを返します。
          if文の条件として頻繁に使われます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">==</code> - 等しい（値が同じ）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">!=</code> - 等しくない</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;</code> - より小さい</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt;</code> - より大きい</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;=</code> - 以下</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&gt;=</code> - 以上</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">is</code> - 同一オブジェクト（Noneの比較に使用）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">in</code> - コレクション内に存在する</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較演算子の実例</h2>
        <PythonPlayground defaultCode={`# 比較演算子の基本
a, b = 10, 20
print(f"a={a}, b={b}")
print(f"a == b: {a == b}")
print(f"a != b: {a != b}")
print(f"a < b:  {a < b}")
print(f"a > b:  {a > b}")
print(f"a <= b: {a <= b}")
print(f"a >= b: {a >= b}")

# 文字列の比較（アルファベット順）
print("\\n=== 文字列の比較 ===")
print(f"'apple' == 'apple': {'apple' == 'apple'}")
print(f"'apple' < 'banana': {'apple' < 'banana'}")
print(f"'Z' < 'a': {'Z' < 'a'}")  # 大文字は小文字より小さい

# is演算子（同一性）
print("\\n=== is演算子 ===")
x = None
print(f"x is None: {x is None}")
print(f"x is not None: {x is not None}")

# in演算子
fruits = ["りんご", "バナナ", "みかん"]
print(f"\\n'バナナ' in fruits: {'バナナ' in fruits}")
print(f"'ぶどう' in fruits: {'ぶどう' in fruits}")
print(f"'ぶどう' not in fruits: {'ぶどう' not in fruits}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">== と is の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">==</code>は値の等しさを比較し、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">is</code>はオブジェクトの同一性（同じオブジェクトかどうか）を確認します。
          Noneの比較には必ず<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">is</code>を使いましょう。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">== None</code> より <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">is None</code> を使う</li>
          <li>小さな整数（-5〜256）はキャッシュされるため is が True になる場合がある</li>
          <li>リスト・辞書などは内容が同じでも is は False になる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">チェーン比較</h2>
        <p className="text-gray-400 mb-4">Pythonでは数学のように比較演算子をチェーンできます。</p>
        <PythonPlayground defaultCode={`# チェーン比較
x = 15
print(f"x = {x}")

# 通常の書き方（andを使う）
if x >= 10 and x <= 20:
    print("xは10以上20以下（andを使用）")

# Pythonのチェーン比較
if 10 <= x <= 20:
    print("xは10以上20以下（チェーン比較）")

# 複数のチェーン比較
y = 7
z = 15
if x > y < z:
    print(f"\\n{y} < {x} かつ {y} < {z}: True")

# 実用例：年齢区分
def age_category(age):
    if age < 0:
        return "無効な年齢"
    elif age <= 12:
        return "子ども"
    elif age <= 17:
        return "青少年"
    elif age <= 64:
        return "成人"
    else:
        return "シニア"

for age in [5, 15, 30, 65, -1]:
    print(f"年齢 {age:>3}: {age_category(age)}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="comparison" basePath="/learn/control" />
    </div>
  );
}
