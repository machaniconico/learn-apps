import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonで関数を定義するキーワードはどれですか？",
    options: ["function", "def", "func", "define"],
    answer: 1,
    explanation: "Pythonでは def キーワードを使って関数を定義します。例: def my_function():",
  },
  {
    question: "デフォルト引数を持つ関数 def greet(name, greeting='こんにちは') を greet('田中') と呼び出した場合の出力はどうなりますか？",
    options: [
      "エラーになる",
      "greeting は None になる",
      "greeting は 'こんにちは' が使われる",
      "name のみ出力される",
    ],
    answer: 2,
    explanation: "デフォルト引数は、その引数が渡されなかった場合に使われる初期値です。greet('田中') と呼び出すと greeting='こんにちは' が使われます。",
  },
  {
    question: "lambda x: x * 2 の意味として正しいものはどれですか？",
    options: [
      "xを2倍にする名前付き関数",
      "x を受け取り x * 2 を返す無名関数",
      "xと2を掛け合わせる演算子",
      "ラムダ計算を実行する組み込み関数",
    ],
    answer: 1,
    explanation: "lambda は無名関数を作るキーワードです。lambda x: x * 2 は引数 x を受け取り x * 2 を返す関数オブジェクトです。",
  },
  {
    question: "**kwargs を使う目的として正しいものはどれですか？",
    options: [
      "引数の個数を制限する",
      "任意の数のキーワード引数を辞書として受け取る",
      "関数の戻り値を複数にする",
      "引数に型注釈を付ける",
    ],
    answer: 1,
    explanation: "**kwargs を使うと、任意の数のキーワード引数を辞書として受け取れます。例: def func(**kwargs): では func(a=1, b=2) のように呼び出せます。",
  },
];

export default function FunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">関数</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          コードを再利用可能なブロックにまとめる「関数」を学びます。
          基本的な関数定義から、引数・戻り値・ラムダ式・デコレータまで、
          Pythonの関数を使いこなしましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="functions" totalLessons={8} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/functions" color="yellow" categoryId="functions" />
      </section>

      {/* What are Functions? */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">関数とは？</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-gray-900 border border-yellow-500/20">
            <div className="text-2xl mb-2">♻️</div>
            <h3 className="text-yellow-400 font-bold mb-1">コードの再利用</h3>
            <p className="text-gray-400 text-sm">同じ処理を何度も書く代わりに、関数にまとめて呼び出せます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-yellow-500/20">
            <div className="text-2xl mb-2">🧩</div>
            <h3 className="text-yellow-400 font-bold mb-1">モジュール化</h3>
            <p className="text-gray-400 text-sm">プログラムを小さな部品に分割して、読みやすく管理しやすくします。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-yellow-500/20">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-yellow-400 font-bold mb-1">抽象化</h3>
            <p className="text-gray-400 text-sm">複雑な処理に名前をつけて、使う側が詳細を気にしなくて済みます。</p>
          </div>
        </div>
      </section>

      {/* Code example 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数の基本</h2>
        <p className="text-gray-400 mb-4">def を使った関数の定義・呼び出し・戻り値の使い方を確認しましょう。</p>
        <PythonPlayground defaultCode={`# 基本的な関数の定義
def greet(name):
    """名前を受け取ってあいさつする関数"""
    return f"こんにちは、{name}さん！"

# 関数の呼び出し
message = greet("田中")
print(message)
print(greet("山田"))

# 複数の値を返す
def divide(a, b):
    """割り算の結果と余りを返す"""
    if b == 0:
        return None, None
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(17, 5)
print(f"\\n17 ÷ 5 = {q} 余り {r}")`} />
      </section>

      {/* Code example 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">引数の種類</h2>
        <p className="text-gray-400 mb-4">デフォルト引数・*args・**kwargs など、様々な引数の使い方を試してみましょう。</p>
        <PythonPlayground defaultCode={`# デフォルト引数
def power(base, exponent=2):
    return base ** exponent

print(power(3))      # 3の2乗
print(power(3, 3))   # 3の3乗

# *args - 可変長位置引数
def sum_all(*args):
    return sum(args)

print(f"\\n合計: {sum_all(1, 2, 3, 4, 5)}")

# **kwargs - 可変長キーワード引数
def profile(**kwargs):
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print("\\nプロフィール:")
profile(名前="田中太郎", 年齢=25, 職業="エンジニア")`} />
      </section>

      {/* Code example 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式とデコレータ</h2>
        <p className="text-gray-400 mb-4">簡潔な無名関数 lambda と、関数を拡張するデコレータを体験しましょう。</p>
        <PythonPlayground defaultCode={`# ラムダ式
double = lambda x: x * 2
square = lambda x: x ** 2
add = lambda x, y: x + y

print(f"doubleの適用: {double(5)}")
print(f"squareの適用: {square(4)}")
print(f"addの適用: {add(3, 7)}")

# ラムダをソートに活用
students = [("田中", 85), ("山田", 72), ("鈴木", 91)]
students.sort(key=lambda s: s[1], reverse=True)
print("\\n成績順:")
for name, score in students:
    print(f"  {name}: {score}点")

# シンプルなデコレータ
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"[LOG] {func.__name__} を呼び出し")
        result = func(*args, **kwargs)
        print(f"[LOG] {func.__name__} が完了")
        return result
    return wrapper

@logger
def say_hello(name):
    print(f"Hello, {name}!")

say_hello("Python")`} />
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="yellow" />
      </section>
    </div>
  );
}
