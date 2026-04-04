import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

const quizQuestions: QuizQuestion[] = [
  {
    question: "os.path.join('home', 'user', 'file.txt') の結果として正しいのはどれですか？",
    options: [
      "home/user/file.txt（OSに応じた区切り文字）",
      "home.user.file.txt",
      "home\\user\\file.txt（常にWindowsパス）",
      "エラーになる",
    ],
    answer: 0,
    explanation: "os.path.join()はOSに応じた区切り文字（Unix系は'/'、Windowsは'\\'）を使ってパスを結合します。",
  },
  {
    question: "collections.Counter(['a', 'b', 'a', 'c', 'a']) の結果はどれですか？",
    options: [
      "Counter({'a': 3, 'b': 1, 'c': 1})",
      "{'a': 3, 'b': 1, 'c': 1}",
      "Counter([3, 1, 1])",
      "Counter({'a': 1, 'b': 1, 'c': 1})",
    ],
    answer: 0,
    explanation: "Counter は各要素の出現回数を数えるクラスです。最も多い順に並んで表示されます。",
  },
  {
    question: "datetime.date.today() が返すのは何ですか？",
    options: [
      "今日の日付（date オブジェクト）",
      "現在の日時（datetime オブジェクト）",
      "UNIXタイムスタンプ（整数）",
      "ISO形式の文字列",
    ],
    answer: 0,
    explanation: "date.today() は今日の日付を表す date オブジェクトを返します。日時が必要な場合は datetime.now() を使います。",
  },
  {
    question: "itertools.chain([1,2], [3,4]) の結果はどれですか？",
    options: [
      "[[1,2],[3,4]]",
      "1 2 3 4（イテレータとして順に取り出せる）",
      "(1,2,3,4)（タプル）",
      "{1,2,3,4}（集合）",
    ],
    answer: 1,
    explanation: "itertools.chain() は複数のイテラブルを一つのイテレータとして順に返します。list() で包むと [1, 2, 3, 4] になります。",
  },
];

export default function StdlibPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">標準ライブラリ</h1>
        <div className="mb-3">
          <DifficultyBadge difficulty="intermediate" />
        </div>
        <p className="text-gray-400">
          Pythonには豊富な標準ライブラリが付属しています。os、datetime、collections、itertoolsなど、
          インストール不要でそのまま使える強力なモジュール群を習得しましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="stdlib" totalLessons={8} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/stdlib" color="teal" categoryId="stdlib" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">標準ライブラリとは？</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "インストール不要",
              desc: "Pythonをインストールすれば即座に使える。外部依存ゼロで環境を選ばない。",
              icon: "📦",
            },
            {
              title: "豊富なモジュール群",
              desc: "ファイル操作・日時・ネットワーク・暗号化など200以上のモジュールが揃っている。",
              icon: "🗂️",
            },
            {
              title: "高品質・信頼性",
              desc: "Pythonコアチームがメンテナンスしており、バグが少なく安定している。",
              icon: "✅",
            },
            {
              title: "クロスプラットフォーム",
              desc: "Windows・macOS・Linuxで同じコードが動く。パス操作もOSを意識せずに書ける。",
              icon: "🌍",
            },
            {
              title: "パフォーマンス",
              desc: "多くのモジュールはC言語で実装されており、Pure Pythonより高速に動作する。",
              icon: "⚡",
            },
            {
              title: "学習コスト低",
              desc: "公式ドキュメントが充実しており、統一されたAPIデザインで学びやすい。",
              icon: "📚",
            },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">よく使うモジュールを試してみよう</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-teal-400 mb-3">os モジュール — ファイルシステム操作</h3>
          <PythonPlayground
            defaultCode={`import os

# カレントディレクトリを取得
cwd = os.getcwd()
print(f"現在のディレクトリ: {cwd}")

# パスを結合
path = os.path.join("home", "user", "documents", "file.txt")
print(f"結合パス: {path}")

# パスの分解
dirname = os.path.dirname(path)
basename = os.path.basename(path)
print(f"ディレクトリ: {dirname}")
print(f"ファイル名: {basename}")

# 拡張子を取得
name, ext = os.path.splitext(basename)
print(f"名前: {name}, 拡張子: {ext}")

# 環境変数を取得
home = os.environ.get("HOME", "不明")
print(f"HOMEディレクトリ: {home}")
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-teal-400 mb-3">datetime モジュール — 日付・時刻</h3>
          <PythonPlayground
            defaultCode={`from datetime import datetime, date, timedelta

# 現在の日時
now = datetime.now()
print(f"現在: {now}")

# 日付フォーマット
formatted = now.strftime("%Y年%m月%d日 %H:%M")
print(f"フォーマット: {formatted}")

# 日付計算
today = date.today()
delta = timedelta(days=30)
future = today + delta
print(f"今日: {today}")
print(f"30日後: {future}")

# 2つの日付の差
start = date(2024, 1, 1)
end = date(2024, 12, 31)
diff = end - start
print(f"2024年の日数: {diff.days}日")
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-teal-400 mb-3">collections モジュール — 高機能コレクション</h3>
          <PythonPlayground
            defaultCode={`from collections import Counter, defaultdict, deque

# Counter: 要素の出現回数を数える
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counter = Counter(words)
print("カウント:", counter)
print("最多3つ:", counter.most_common(3))

# defaultdict: キーがなくてもエラーにならない辞書
scores = defaultdict(list)
scores["Alice"].append(90)
scores["Alice"].append(85)
scores["Bob"].append(78)
print("Alice のスコア:", scores["Alice"])
print("Carol のスコア:", scores["Carol"])  # KeyError にならない

# deque: 両端への追加・削除が高速
queue = deque([1, 2, 3])
queue.appendleft(0)   # 左端に追加
queue.append(4)       # 右端に追加
print("deque:", queue)
queue.popleft()       # 左端から取り出し
print("popleft後:", queue)
`}
          />
        </div>
      </section>

      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
