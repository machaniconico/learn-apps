import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ファイルを読み込み専用で開くモードはどれですか？",
    options: ["'r'", "'w'", "'a'", "'rb'"],
    answer: 0,
    explanation: "'r' はテキスト読み込みモードです。ファイルが存在しない場合はエラーになります。バイナリ読み込みは 'rb' を使います。",
  },
  {
    question: "with 文を使ってファイルを開く主なメリットはどれですか？",
    options: [
      "ファイルが自動的にクローズされる",
      "読み込みが高速になる",
      "エンコーディングが自動検出される",
      "ファイルサイズに制限がなくなる",
    ],
    answer: 0,
    explanation: "with 文（コンテキストマネージャ）を使うと、ブロックを抜けたときに自動的に close() が呼ばれます。例外が発生した場合でも確実にクローズされます。",
  },
  {
    question: "open() でファイルに追記するモードはどれですか？",
    options: ["'a'", "'w'", "'r+'", "'x'"],
    answer: 0,
    explanation: "'a'（append）モードは既存の内容を保持したまま末尾に追記します。'w' は上書き、'r+' は読み書き両用です。",
  },
  {
    question: "CSV ファイルを扱う標準モジュールはどれですか？",
    options: ["csv", "pandas", "xlrd", "tablib"],
    answer: 0,
    explanation: "csv モジュールは Python 標準ライブラリに含まれており、インストール不要です。より高機能な操作には pandas が使われます。",
  },
];

export default function FileIOPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">ファイルI/O</h1>
        <div className="mb-3">
          <DifficultyBadge difficulty="intermediate" />
        </div>
        <p className="text-gray-400">
          実際のアプリケーションではファイルの読み書きは不可欠です。テキストファイル・バイナリファイル・CSVを
          安全かつ効率的に扱う方法をマスターしましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="fileio" totalLessons={6} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/fileio" color="orange" categoryId="fileio" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">ファイル操作の基本を知ろう</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { title: "テキストファイル", desc: "UTF-8などのエンコーディングで文字列として読み書きする最も基本的な形式。", icon: "📄" },
            { title: "バイナリファイル", desc: "画像・音声・動画などバイト列として読み書きする形式。", icon: "🔢" },
            { title: "CSV", desc: "スプレッドシートやデータベースのエクスポートに使われる表形式テキスト。", icon: "📊" },
            { title: "with 文", desc: "コンテキストマネージャを使ってファイルのクローズ忘れを防ぐ安全な書き方。", icon: "🔒" },
            { title: "エンコーディング", desc: "encoding='utf-8' を明示して文字化けを防ぐことが重要。", icon: "🌐" },
            { title: "例外処理", desc: "FileNotFoundError など I/O に関する例外を適切に捕捉する。", icon: "⚠️" },
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
        <h2 className="text-xl font-bold text-white mb-4">ファイル操作を試してみよう</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-orange-400 mb-3">テキストファイルの読み書き（メモリ上でシミュレート）</h3>
          <PythonPlayground
            defaultCode={`import io

# StringIO を使ってメモリ上でファイル操作をシミュレート
print("=== ファイル書き込みシミュレート ===")

# ファイルに書き込む内容
lines = [
    "1行目: Python ファイル操作",
    "2行目: テキストの書き込み",
    "3行目: 改行を含む複数行",
]

# StringIO をファイルとして使用
buf = io.StringIO()
for line in lines:
    buf.write(line + "\\n")

print("書き込み完了！内容:")
buf.seek(0)  # 先頭に戻る
content = buf.read()
print(content)

print("=== 行ごとに読み込み ===")
buf.seek(0)
for i, line in enumerate(buf, 1):
    print(f"行{i}: {line.rstrip()}")

# 実際のファイル操作コード例
print()
print("--- 実際のコード例 ---")
print("""with open('file.txt', 'w', encoding='utf-8') as f:
    f.write('Hello, World!')

with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)
""")
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-orange-400 mb-3">CSV データの処理</h3>
          <PythonPlayground
            defaultCode={`import csv
import io

# CSV データをメモリ上で作成・読み込み
csv_data = """名前,年齢,都市
田中太郎,28,東京
鈴木花子,32,大阪
佐藤一郎,25,名古屋
山田美咲,29,福岡"""

print("=== CSV 読み込み ===")
reader = csv.DictReader(io.StringIO(csv_data))
rows = list(reader)
for row in rows:
    print(f"{row['名前']}（{row['年齢']}歳）- {row['都市']}")

print()
print("=== CSV 書き込み ===")
output = io.StringIO()
fieldnames = ["名前", "年齢", "都市"]
writer = csv.DictWriter(output, fieldnames=fieldnames)
writer.writeheader()
writer.writerows(rows)

output.seek(0)
print(output.read())
`}
          />
        </div>
      </section>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
