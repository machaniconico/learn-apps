import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonでforループを使ってリスト [1, 2, 3] の各要素を出力するコードはどれですか？",
    options: [
      "for i in [1, 2, 3]: print(i)",
      "for (int i=0; i<3; i++) print(i)",
      "foreach i in [1, 2, 3]: print(i)",
      "loop i in [1, 2, 3]: print(i)",
    ],
    answer: 0,
    explanation: "Pythonのforループは 'for 変数 in イテラブル:' という構文です。他の言語と違い、インデックスを使わずに要素を直接取り出せます。",
  },
  {
    question: "whileループでループを強制的に終了させるキーワードはどれですか？",
    options: ["stop", "exit", "break", "end"],
    answer: 2,
    explanation: "break 文を使うとループを即座に終了できます。continue は現在のイテレーションをスキップして次へ進みます。",
  },
  {
    question: "range(2, 10, 3) が生成する数値のシーケンスはどれですか？",
    options: ["2, 3, 4, 5, 6, 7, 8, 9", "2, 5, 8", "3, 6, 9", "2, 4, 6, 8"],
    answer: 1,
    explanation: "range(start, stop, step) は start から始まり、step ずつ増えて stop の手前で止まります。range(2, 10, 3) は 2, 5, 8 を生成します。",
  },
  {
    question: "リスト内包表記 [x**2 for x in range(5)] の結果はどれですか？",
    options: ["[0, 1, 2, 3, 4]", "[1, 4, 9, 16, 25]", "[0, 1, 4, 9, 16]", "[1, 2, 3, 4, 5]"],
    answer: 2,
    explanation: "range(5) は 0, 1, 2, 3, 4 を生成し、それぞれを2乗するので [0, 1, 4, 9, 16] になります。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          プログラムの流れをコントロールする制御構文を学びます。
          条件分岐（if/elif/else）・繰り返し処理（for/while）・内包表記まで、
          プログラムに「判断」と「繰り返し」の力を与えましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="blue" categoryId="control" />
      </section>

      {/* What is Control Flow? */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">制御構文とは？</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-gray-900 border border-blue-500/20">
            <div className="text-2xl mb-2">🔀</div>
            <h3 className="text-blue-400 font-bold mb-1">条件分岐</h3>
            <p className="text-gray-400 text-sm">if/elif/else を使って条件に応じた異なる処理を実行します。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-blue-500/20">
            <div className="text-2xl mb-2">🔁</div>
            <h3 className="text-blue-400 font-bold mb-1">繰り返し処理</h3>
            <p className="text-gray-400 text-sm">for と while を使って同じ処理を何度も繰り返すことができます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-blue-500/20">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-blue-400 font-bold mb-1">内包表記</h3>
            <p className="text-gray-400 text-sm">リスト・辞書・集合をシンプルな1行のコードで生成できます。</p>
          </div>
        </div>
      </section>

      {/* Code example 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐の基本</h2>
        <p className="text-gray-400 mb-4">if/elif/else を使って条件に応じた処理を実行します。</p>
        <PythonPlayground defaultCode={`# 条件分岐の基本
score = 75

if score >= 90:
    print("評価: S（優秀）")
elif score >= 80:
    print("評価: A（良い）")
elif score >= 70:
    print("評価: B（普通）")
elif score >= 60:
    print("評価: C（合格）")
else:
    print("評価: F（不合格）")

# 1行の条件式（三項演算子）
status = "合格" if score >= 60 else "不合格"
print(f"スコア {score} 点: {status}")`} />
      </section>

      {/* Code example 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループの基本</h2>
        <p className="text-gray-400 mb-4">for ループと while ループの使い方を比較してみましょう。</p>
        <PythonPlayground defaultCode={`# forループ - リストの反復
fruits = ["りんご", "バナナ", "みかん", "ぶどう"]
print("=== forループ ===")
for i, fruit in enumerate(fruits, 1):
    print(f"{i}. {fruit}")

# forループ - rangeを使った繰り返し
print("\\n=== 1から5の合計 ===")
total = 0
for i in range(1, 6):
    total += i
    print(f"  {i}を足す → 合計: {total}")

# whileループ
print("\\n=== whileループ ===")
count = 3
while count > 0:
    print(f"カウントダウン: {count}")
    count -= 1
print("スタート！")`} />
      </section>

      {/* Code example 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">内包表記</h2>
        <p className="text-gray-400 mb-4">内包表記を使うとリストや辞書をシンプルなコードで生成できます。</p>
        <PythonPlayground defaultCode={`# リスト内包表記
squares = [x**2 for x in range(1, 11)]
print("1から10の二乗:", squares)

# 条件付き内包表記
evens = [x for x in range(1, 21) if x % 2 == 0]
print("1から20の偶数:", evens)

# 辞書内包表記
word_lengths = {word: len(word) for word in ["Python", "Java", "Go", "Rust"]}
print("\\n単語の文字数:", word_lengths)

# ネストした内包表記
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print("\\n掛け算表:")
for row in matrix:
    print(row)`} />
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="blue" />
      </section>
    </div>
  );
}
