import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dicts");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonの辞書（dict）でキーに使えないものはどれですか？",
    options: ["文字列", "整数", "タプル", "リスト"],
    answer: 3,
    explanation: "辞書のキーはハッシュ可能（イミュータブル）なオブジェクトである必要があります。リストはミュータブルなのでキーに使えません。",
  },
  {
    question: "辞書 d = {'a': 1, 'b': 2} で存在しないキー 'c' を安全に取得するには？",
    options: ["d['c']", "d.get('c')", "d.find('c')", "d.fetch('c')"],
    answer: 1,
    explanation: "get() メソッドは存在しないキーにアクセスしてもKeyErrorを起こさず、デフォルト値（省略時はNone）を返します。",
  },
  {
    question: "集合（set）の特徴として正しいのはどれですか？",
    options: [
      "重複した値を保持できる",
      "要素に順序があり、インデックスでアクセスできる",
      "重複を自動的に除去し、順序を持たない",
      "キーと値のペアでデータを管理する",
    ],
    answer: 2,
    explanation: "集合（set）は重複のないユニークな値のコレクションで、順序を持ちません。インデックスアクセスはできません。",
  },
  {
    question: "辞書内包表記で {k: v*2 for k, v in d.items()} は何をしますか？",
    options: [
      "辞書のキーを2倍にする",
      "辞書の値を2倍にした新しい辞書を作る",
      "辞書を2回繰り返す",
      "辞書のキーと値を入れ替える",
    ],
    answer: 1,
    explanation: "辞書内包表記 {k: v*2 for k, v in d.items()} は各キーに対して値を2倍にした新しい辞書を生成します。",
  },
];

export default function DictsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">辞書・集合</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400 mt-2">
          キーと値でデータを管理する辞書（dict）と、重複のないデータ管理に使う集合（set）を学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="dicts" totalLessons={6} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/dicts" color="cyan" categoryId="dicts" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">このカテゴリで学ぶこと</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "辞書の基本", desc: "キーと値のペアでデータ管理", icon: "📖" },
            { title: "辞書メソッド", desc: "keys・values・items・get", icon: "🔑" },
            { title: "辞書内包表記", desc: "簡潔な辞書生成の書き方", icon: "⚡" },
            { title: "集合（set）", desc: "重複なし・高速な存在確認", icon: "🎯" },
            { title: "集合演算", desc: "和集合・積集合・差集合", icon: "🔄" },
            { title: "frozenset", desc: "変更不可能な集合の活用", icon: "🔒" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">辞書の基本を試してみよう</h2>
        <PythonPlayground
          defaultCode={`# 辞書の作成と操作
student = {
    "name": "田中太郎",
    "age": 20,
    "grade": "A",
    "subjects": ["数学", "英語", "プログラミング"]
}

print("名前:", student["name"])
print("年齢:", student["age"])

# キーの存在確認
if "grade" in student:
    print("成績:", student["grade"])

# 安全なアクセス
score = student.get("score", 0)
print("スコア:", score)

# 要素の追加・更新
student["score"] = 95
print("更新後:", student)`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">集合の操作を試してみよう</h2>
        <PythonPlayground
          defaultCode={`# 集合の作成と演算
a = {1, 2, 3, 4, 5}
b = {3, 4, 5, 6, 7}

print("集合A:", a)
print("集合B:", b)
print("和集合:", a | b)
print("積集合:", a & b)
print("差集合 (A-B):", a - b)
print("対称差:", a ^ b)

# 重複除去に活用
words = ["apple", "banana", "apple", "cherry", "banana"]
unique = set(words)
print("重複除去:", unique)
print("ユニーク数:", len(unique))`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">辞書内包表記</h2>
        <PythonPlayground
          defaultCode={`# 辞書内包表記の活用
# 数値の二乗を辞書に
squares = {x: x**2 for x in range(1, 6)}
print("二乗辞書:", squares)

# 条件付き内包表記
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print("偶数の二乗:", even_squares)

# キーと値を入れ替える
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print("元の辞書:", original)
print("反転辞書:", inverted)`}
        />
      </section>

      <Quiz questions={quizQuestions} color="cyan" />
    </div>
  );
}
