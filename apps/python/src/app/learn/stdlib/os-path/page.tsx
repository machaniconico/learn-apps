import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function OsPathPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">osモジュール</h1>
        <p className="text-gray-400">
          ファイルシステム操作やパス処理のための <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">os</code> モジュールと
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">os.path</code> の使い方を学びます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">os モジュールとは</h2>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-4">
          <p className="text-gray-300 mb-3">
            <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">os</code> モジュールはオペレーティングシステムとやりとりするための機能を提供します。
            Windows・macOS・Linuxで同じコードが動くよう設計されており、ファイルやディレクトリの操作に広く使われています。
          </p>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-0.5">•</span>
              <span><strong className="text-gray-300">os.getcwd()</strong> — 現在のディレクトリを取得</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-0.5">•</span>
              <span><strong className="text-gray-300">os.listdir()</strong> — ディレクトリの内容を一覧取得</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-0.5">•</span>
              <span><strong className="text-gray-300">os.makedirs()</strong> — ディレクトリを再帰的に作成</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-0.5">•</span>
              <span><strong className="text-gray-300">os.environ</strong> — 環境変数の辞書</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">os.path によるパス操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">os.path</code> はパス文字列を操作するためのサブモジュールです。
          OSごとの区切り文字の違いを吸収してくれます。
        </p>
        <PythonPlayground
          defaultCode={`import os

# カレントディレクトリ
cwd = os.getcwd()
print(f"現在のディレクトリ: {cwd}")

# パスの結合（OS依存の区切り文字を自動使用）
path = os.path.join("home", "user", "documents", "report.txt")
print(f"結合パス: {path}")

# パスの分解
print(f"ディレクトリ: {os.path.dirname(path)}")
print(f"ファイル名: {os.path.basename(path)}")

# 拡張子の分離
name, ext = os.path.splitext("report.txt")
print(f"名前: {name}, 拡張子: {ext}")

# 絶対パスか確認
print(f"絶対パス: {os.path.isabs('/home/user')}")
print(f"相対パス: {os.path.isabs('documents/file.txt')}")

# パスの存在確認
print(f"/tmp 存在: {os.path.exists('/tmp')}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">環境変数と os.walk</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">os.environ</code> で環境変数を読み取り、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">os.walk()</code> でディレクトリを再帰的に探索できます。
        </p>
        <PythonPlayground
          defaultCode={`import os

# 環境変数の取得
home = os.environ.get("HOME", "不明")
path_env = os.environ.get("PATH", "不明")[:50]  # 最初の50文字
print(f"HOME: {home}")
print(f"PATH（先頭50文字）: {path_env}...")

print()

# os.walk のシミュレート
# 実際の使い方を示すコード例
print("--- os.walk の使い方 ---")
print("""
# ディレクトリを再帰的に探索
for dirpath, dirnames, filenames in os.walk('/path/to/dir'):
    print(f"ディレクトリ: {dirpath}")
    for filename in filenames:
        full_path = os.path.join(dirpath, filename)
        print(f"  ファイル: {full_path}")
""")

# os.sep: OSごとの区切り文字
print(f"パス区切り文字: {repr(os.sep)}")
print(f"改行文字: {repr(os.linesep)}")
print(f"CPUコア数: {os.cpu_count()}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="stdlib" lessonId="os-path" />
      </div>
      <LessonNav lessons={lessons} currentId="os-path" basePath="/learn/stdlib" />
    </div>
  );
}
