import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数とデータ型</h1>
        <p className="text-gray-400">データを保存する箱の使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変数はデータを保存するための「名前付きの箱」です。
          Pythonでは <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">=</code> を使って
          変数に値を代入します。他の言語と違い、型の宣言は不要です。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">name = "Python"</code> - 文字列を変数に代入</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">count = 42</code> - 整数を変数に代入</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">pi = 3.14</code> - 浮動小数点数を変数に代入</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">is_valid = True</code> - 真偽値を変数に代入</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の基本操作</h2>
        <p className="text-gray-400 mb-4">変数への代入、参照、更新の基本的な使い方を確認しましょう。</p>
        <PythonPlayground defaultCode={`# 変数への代入
name = "田中太郎"
age = 25
height = 175.5
is_student = True

# 変数の参照
print(name)
print(age)
print(height)
print(is_student)

# 変数の更新
age = 26
print(f"\\n誕生日がきて {age} 歳になりました")

# 複数代入
x = y = z = 0
print(f"x={x}, y={y}, z={z}")

# 一度に複数の変数に代入
a, b, c = 1, 2, 3
print(f"a={a}, b={b}, c={c}")

# 値のスワップ（Pythonらしい書き方）
a, b = b, a
print(f"スワップ後: a={a}, b={b}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数名のルール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonの変数名には以下のルールがあります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">英字・数字・アンダースコア(_)</code> のみ使用可能</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">数字から始めることはできない</code> — 例: <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">2value</code> はNG</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">スネークケース</code> が慣習 — 例: <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">user_name</code></li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">予約語は使用不可</code> — <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">if</code>, <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code>, <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">while</code> など</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">データ型の確認</h2>
        <p className="text-gray-400 mb-4">type() 関数を使って変数のデータ型を確認できます。</p>
        <PythonPlayground defaultCode={`# 各データ型の確認
values = {
    "整数": 42,
    "浮動小数点": 3.14,
    "文字列": "hello",
    "真偽値": True,
    "None": None,
    "リスト": [1, 2, 3],
    "辞書": {"key": "value"},
}

for name, value in values.items():
    print(f"{name:<12}: {type(value).__name__:<10} → {repr(value)}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
