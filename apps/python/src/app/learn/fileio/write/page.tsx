import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function WritePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイルへの書き込み</h1>
        <p className="text-gray-400">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">write()</code>・
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">writelines()</code> を使ってファイルにデータを書き込む方法を学びます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">書き込みモード</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {[
            { mode: "'w'", desc: "テキスト書き込み（上書き）。ファイルが存在しなければ作成。" },
            { mode: "'a'", desc: "テキスト追記。既存の内容は保持して末尾に追加。" },
            { mode: "'x'", desc: "新規作成のみ。ファイルが存在する場合はエラー。" },
            { mode: "'wb'", desc: "バイナリ書き込み（上書き）。" },
          ].map((item) => (
            <div key={item.mode} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <code className="text-orange-400 font-mono text-sm">{item.mode}</code>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">write() と writelines()</h2>
        <PythonPlayground
          defaultCode={`import io

# write(): 文字列を書き込む
print("=== write() ===")
buf = io.StringIO()
chars_written = buf.write("こんにちは、Python！\\n")
buf.write("2行目\\n")
buf.write("3行目\\n")

print(f"最初の write で書いた文字数: {chars_written}")
buf.seek(0)
print("内容:")
print(buf.read())

# writelines(): 文字列のリストを書き込む（改行は自分で付ける）
print("=== writelines() ===")
buf2 = io.StringIO()
lines = [
    "りんご\\n",
    "バナナ\\n",
    "みかん\\n",
    "ぶどう\\n",
]
buf2.writelines(lines)
buf2.seek(0)
print("内容:")
print(buf2.read())

# print() でファイルに書き込む
print("=== print(file=...) ===")
buf3 = io.StringIO()
print("Pythonから出力", file=buf3)
print("改行は自動", file=buf3)
print("区切り文字", "変更可", sep="|", file=buf3)
buf3.seek(0)
print(buf3.read())
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">追記モードとログファイルの例</h2>
        <PythonPlayground
          defaultCode={`import io
from datetime import datetime

# ログファイルのシミュレート
log_buffer = io.StringIO()

def log(level: str, message: str, file=None):
    """シンプルなロガー"""
    timestamp = "2024-03-15 10:30:00"  # シミュレート用固定値
    entry = f"[{timestamp}] [{level.upper()}] {message}\\n"
    if file:
        file.write(entry)
    return entry

# ログを書き込む
entries = [
    log("INFO", "アプリケーション起動", log_buffer),
    log("INFO", "データベース接続成功", log_buffer),
    log("WARNING", "設定ファイルが見つかりません（デフォルト使用）", log_buffer),
    log("ERROR", "認証に失敗しました: ユーザー 'admin'", log_buffer),
    log("INFO", "リトライ: 1/3", log_buffer),
]

print("ログファイルの内容:")
log_buffer.seek(0)
print(log_buffer.read())

# 実際の追記モード
print("--- 実際のコード例 ---")
print("""with open('app.log', 'a', encoding='utf-8') as f:
    f.write(f'[{datetime.now()}] INFO アプリ起動\\n')
""")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="fileio" lessonId="write" />
      </div>
      <LessonNav lessons={lessons} currentId="write" basePath="/learn/fileio" />
    </div>
  );
}
