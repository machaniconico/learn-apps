import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonでコメントを書くために使う記号はどれですか？",
    options: ["//", "#", "/*", "--"],
    answer: 1,
    explanation: "Pythonでは # を使って1行コメントを書きます。// はJavaScriptやC言語で使われる記法です。",
  },
  {
    question: "次のコードの出力はどれですか？ print(type(3.14))",
    options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'number'>"],
    answer: 2,
    explanation: "3.14は浮動小数点数なので type() は <class 'float'> を返します。",
  },
  {
    question: "Pythonで変数 x に整数 10 を代入する正しい書き方はどれですか？",
    options: ["int x = 10;", "x = 10", "var x = 10", "x := 10"],
    answer: 1,
    explanation: "Pythonでは型宣言なしに x = 10 と書くだけで変数に値を代入できます。",
  },
  {
    question: "文字列 'hello' を整数に変換する関数はどれですか？",
    options: ["str('hello')", "int('hello')", "float('hello')", "bool('hello')"],
    answer: 1,
    explanation: "int() 関数で文字列を整数に変換できます。ただし 'hello' のような数字以外の文字列は変換できずエラーになります。数字の文字列（例: '42'）なら int('42') で 42 になります。",
  },
];

export default function BasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">Python基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">12レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Pythonプログラミングの第一歩。変数・データ型・演算子・入出力など、
          すべてのプログラムの土台となる基礎知識を身につけましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="basics" totalLessons={12} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全12レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/basics" color="green" categoryId="basics" />
      </section>

      {/* What is Python? */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Pythonとは？</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-gray-900 border border-green-500/20">
            <div className="text-2xl mb-2">🐍</div>
            <h3 className="text-green-400 font-bold mb-1">シンプルな文法</h3>
            <p className="text-gray-400 text-sm">英語に近い読みやすい構文で、初心者でもすぐに書き始められます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-green-500/20">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="text-green-400 font-bold mb-1">幅広い用途</h3>
            <p className="text-gray-400 text-sm">Web開発・AI・データ分析・自動化など、あらゆる分野で活躍する言語です。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-green-500/20">
            <div className="text-2xl mb-2">📦</div>
            <h3 className="text-green-400 font-bold mb-1">豊富なライブラリ</h3>
            <p className="text-gray-400 text-sm">NumPy・Pandas・Djangoなど何十万ものパッケージが利用できます。</p>
          </div>
        </div>
      </section>

      {/* Code example 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pythonの基本構文を試してみよう</h2>
        <p className="text-gray-400 mb-4">変数の宣言から基本的な計算まで、Pythonの基礎を体験してみましょう。</p>
        <PythonPlayground defaultCode={`# 変数に値を代入する
name = "Python"
version = 3
is_popular = True

print(f"言語名: {name}")
print(f"メジャーバージョン: {version}")
print(f"人気がある: {is_popular}")

# 基本的な計算
x = 10
y = 3
print(f"\\n{x} + {y} = {x + y}")
print(f"{x} - {y} = {x - y}")
print(f"{x} * {y} = {x * y}")
print(f"{x} / {y} = {x / y:.2f}")
print(f"{x} // {y} = {x // y}  # 整数除算")
print(f"{x} % {y} = {x % y}   # 余り")
print(f"{x} ** {y} = {x ** y}  # べき乗")`} />
      </section>

      {/* Code example 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型とデータを確認しよう</h2>
        <p className="text-gray-400 mb-4">Pythonの主要なデータ型を実際に確認しながら学びましょう。</p>
        <PythonPlayground defaultCode={`# Pythonの主要なデータ型
integer = 42           # 整数 (int)
decimal = 3.14         # 浮動小数点数 (float)
text = "こんにちは"    # 文字列 (str)
flag = True            # 真偽値 (bool)
nothing = None         # None型

# 型を確認する
values = [integer, decimal, text, flag, nothing]
for v in values:
    print(f"値: {repr(v)!s:<20} 型: {type(v).__name__}")

# 型変換
number_str = "123"
print(f"\\n文字列 '{number_str}' を整数に変換: {int(number_str)}")
print(f"整数 {integer} を文字列に変換: '{str(integer)}'")
print(f"整数 {integer} を浮動小数点数に変換: {float(integer)}")`} />
      </section>

      {/* Code example 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">入出力の基本</h2>
        <p className="text-gray-400 mb-4">print()とf文字列を使った出力の様々なパターンを試してみましょう。</p>
        <PythonPlayground defaultCode={`# print()の様々な使い方
print("Hello, World!")
print("複数の値:", 1, 2, 3)
print("区切り文字を変更:", 1, 2, 3, sep="-")
print("改行なし:", end="")
print(" 続きの文")

# f文字列（フォーマット文字列）
name = "田中"
age = 25
print(f"\\n名前: {name}, 年齢: {age}歳")

# 数値のフォーマット
pi = 3.14159265
print(f"円周率: {pi:.2f}")    # 小数点2桁
print(f"円周率: {pi:.4f}")    # 小数点4桁

price = 1234567
print(f"価格: {price:,}円")   # 桁区切り`} />
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="green" />
      </section>
    </div>
  );
}
