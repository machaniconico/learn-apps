import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dicts");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">辞書・集合 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">辞書内包表記</h1>
        <p className="text-gray-400">辞書を簡潔に生成する内包表記の書き方を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">辞書内包表記の基本</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-3">
            辞書内包表記の構文：<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{key: value for item in iterable}"}</code>
          </p>
          <p className="text-gray-300 text-sm">
            リスト内包表記と同様に、条件付きフィルタリングも可能です：<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{key: value for item in iterable if condition}"}</code>
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 通常の辞書作成
squares_normal = {}
for x in range(1, 6):
    squares_normal[x] = x ** 2
print("通常:", squares_normal)

# 辞書内包表記
squares = {x: x**2 for x in range(1, 6)}
print("内包表記:", squares)

# 条件付き
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print("偶数の二乗:", even_squares)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">実用的な辞書内包表記</h2>
        <PythonPlayground
          defaultCode={`# キーと値を入れ替える
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print("反転:", inverted)

# 文字列リストを辞書に変換
words = ["apple", "banana", "cherry"]
word_len = {word: len(word) for word in words}
print("単語長:", word_len)

# 辞書のフィルタリング
scores = {"田中": 90, "鈴木": 65, "佐藤": 82, "山田": 55, "中村": 95}
passing = {name: score for name, score in scores.items() if score >= 70}
print("合格者:", passing)

# 値の変換（点数をランクに変換）
def to_rank(score):
    if score >= 90: return "A"
    elif score >= 80: return "B"
    elif score >= 70: return "C"
    else: return "D"

ranks = {name: to_rank(score) for name, score in scores.items()}
print("ランク:", ranks)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">ネストした辞書内包表記</h2>
        <PythonPlayground
          defaultCode={`# 二次元辞書の生成
subjects = ["数学", "英語", "理科"]
students = ["田中", "鈴木", "佐藤"]

# 全生徒・全教科の初期スコアを0に設定
import random
random.seed(42)

grade_book = {
    student: {subject: random.randint(60, 100) for subject in subjects}
    for student in students
}

for student, grades in grade_book.items():
    avg = sum(grades.values()) / len(grades)
    print(f"{student}: {grades} → 平均 {avg:.1f}点")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="dicts" lessonId="comprehension" />
      </div>
      <LessonNav lessons={lessons} currentId="comprehension" basePath="/learn/dicts" />
    </div>
  );
}
