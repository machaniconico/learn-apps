import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function TypeConversionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型変換</h1>
        <p className="text-gray-400">int()・str()・float()による型の変換</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型変換とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型変換（キャスト）とは、あるデータ型の値を別のデータ型に変換することです。
          Pythonでは組み込み関数を使って明示的に型を変換します。
          たとえば<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">input()</code>は常に文字列を返すため、
          数値として扱うには変換が必要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">int(x)</code> - 整数に変換（例: "42" → 42, 3.9 → 3）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">float(x)</code> - 浮動小数点数に変換（例: "3.14" → 3.14, 5 → 5.0）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">str(x)</code> - 文字列に変換（例: 42 → "42", True → "True"）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">bool(x)</code> - 真偽値に変換（例: 0 → False, "hello" → True）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">list(x)</code> - リストに変換（例: "abc" → ['a', 'b', 'c']）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な型変換</h2>
        <PythonPlayground defaultCode={`# 文字列 → 数値
s_int = "42"
s_float = "3.14"
print(f"'{s_int}' → int: {int(s_int)}")
print(f"'{s_float}' → float: {float(s_float)}")

# 数値 → 文字列
n = 12345
f = 3.14
print(f"\\n{n} → str: '{str(n)}'")
print(f"{f} → str: '{str(f)}'")

# 数値 → 真偽値
print(f"\\nbool(0) = {bool(0)}")
print(f"bool(1) = {bool(1)}")
print(f"bool(-1) = {bool(-1)}")
print(f"bool(0.0) = {bool(0.0)}")
print(f"bool(3.14) = {bool(3.14)}")

# float → int（小数点以下切り捨て）
print(f"\\nint(3.9) = {int(3.9)}")   # 切り捨て（四捨五入ではない）
print(f"int(-3.1) = {int(-3.1)}")   # 0方向に切り捨て`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型変換が失敗するケース</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべての変換が成功するわけではありません。
          変換できない値を渡すと<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">ValueError</code>が発生します。
          ユーザー入力を変換する際は例外処理とセットで使うのが安全です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">int("hello")</code> - ValueError（数字以外の文字列）</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">int("3.14")</code> - ValueError（小数点付き文字列）</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">int(None)</code> - TypeError（Noneは変換不可）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全な型変換パターン</h2>
        <p className="text-gray-400 mb-4">try/exceptを使って型変換エラーを安全に処理しましょう。</p>
        <PythonPlayground defaultCode={`# 安全な型変換（try/except）
def safe_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return None

# テスト
test_values = ["42", "3.14", "hello", None, "100", ""]
for v in test_values:
    result = safe_int(v)
    if result is not None:
        print(f"'{v}' → {result} (成功)")
    else:
        print(f"'{v}' → 変換失敗")

# 実用例：入力値の検証
def parse_age(age_str):
    age = safe_int(age_str)
    if age is None:
        return None, "数字を入力してください"
    if age < 0 or age > 150:
        return None, "有効な年齢を入力してください"
    return age, None

tests = ["25", "-5", "200", "abc", "30"]
print()
for t in tests:
    age, err = parse_age(t)
    if err:
        print(f"'{t}': エラー - {err}")
    else:
        print(f"'{t}': 有効な年齢 {age}歳")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="type-conversion" />
      </div>
      <LessonNav lessons={lessons} currentId="type-conversion" basePath="/learn/basics" />
    </div>
  );
}
