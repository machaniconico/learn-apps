import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function ReadPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイルの読み込み</h1>
        <p className="text-gray-400">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">open()</code> 関数と各種読み込みメソッドを使ってファイルの内容を読み取る方法を学びます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">open() 関数のモード</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {[
            { mode: "'r'", desc: "テキスト読み込み（デフォルト）" },
            { mode: "'rb'", desc: "バイナリ読み込み" },
            { mode: "'r+'", desc: "読み書き両用（ファイルが存在する必要あり）" },
            { mode: "'rt'", desc: "'r' と同じ（テキストモード明示）" },
          ].map((item) => (
            <div key={item.mode} className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <code className="text-orange-400 bg-gray-900 px-2 py-1 rounded font-mono text-sm shrink-0">{item.mode}</code>
              <span className="text-gray-300 text-sm">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">読み込みメソッドの使い方</h2>
        <PythonPlayground
          defaultCode={`import io

# メモリ上のファイルでデモ（実際のファイル操作と同じ動作）
content = """Pythonのファイル操作
2行目のテキスト
3行目のテキスト
4行目のテキスト
5行目のテキスト"""

# read(): ファイル全体を文字列として読む
f = io.StringIO(content)
all_text = f.read()
print("=== read() ===")
print(all_text[:30] + "...")
print(f"文字数: {len(all_text)}")

# readline(): 1行ずつ読む
f = io.StringIO(content)
print("\\n=== readline() ===")
line1 = f.readline()
line2 = f.readline()
print(f"1行目: {line1.rstrip()!r}")
print(f"2行目: {line2.rstrip()!r}")

# readlines(): 全行をリストで読む
f = io.StringIO(content)
lines = f.readlines()
print("\\n=== readlines() ===")
print(f"行数: {len(lines)}")
for i, line in enumerate(lines, 1):
    print(f"  {i}: {line.rstrip()}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">イテレータとして行を読む</h2>
        <p className="text-gray-400 mb-4">
          ファイルオブジェクトは直接 <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code> ループで使えます。
          大きなファイルでもメモリを効率的に使えます。
        </p>
        <PythonPlayground
          defaultCode={`import io

# 大きなテキストファイルを行ごとに処理する例
csv_data = """名前,年齢,都市,スコア
田中太郎,28,東京,92
鈴木花子,32,大阪,88
佐藤一郎,25,名古屋,95
山田美咲,29,福岡,79
伊藤健太,35,札幌,84"""

f = io.StringIO(csv_data)
header = None
total_score = 0
count = 0

for line in f:
    line = line.rstrip()
    if header is None:
        header = line.split(",")
        print(f"ヘッダー: {header}")
        continue

    parts = line.split(",")
    name, age, city, score = parts
    total_score += int(score)
    count += 1
    print(f"  {name}（{age}歳, {city}）: {score}点")

if count > 0:
    print(f"\\n平均スコア: {total_score / count:.1f}点")

# 実際のコード
print("\\n--- 実際のファイル読み込み ---")
print("""with open('data.csv', 'r', encoding='utf-8') as f:
    for line in f:
        process(line.rstrip())
""")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="fileio" lessonId="read" />
      </div>
      <LessonNav lessons={lessons} currentId="read" basePath="/learn/fileio" />
    </div>
  );
}
