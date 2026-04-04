import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function PathlibPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">pathlibモジュール</h1>
        <p className="text-gray-400">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">pathlib</code> はPython 3.4以降で使えるオブジェクト指向スタイルのパス操作ライブラリです。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">os.path</code> より直感的に書けます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Path オブジェクトの基本</h2>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-4">
          <p className="text-gray-300 mb-3">
            <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">pathlib.Path</code> はパスをオブジェクトとして表現します。
            文字列の連結ではなく <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">/</code> 演算子でパスを結合できます。
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { attr: "p.name", desc: "ファイル名（拡張子込み）" },
              { attr: "p.stem", desc: "ファイル名（拡張子なし）" },
              { attr: "p.suffix", desc: "拡張子（.txt など）" },
              { attr: "p.parent", desc: "親ディレクトリ" },
              { attr: "p.exists()", desc: "パスが存在するか" },
              { attr: "p.is_file()", desc: "ファイルかどうか" },
            ].map((item) => (
              <div key={item.attr} className="flex gap-2">
                <code className="text-teal-400 font-mono shrink-0">{item.attr}</code>
                <span className="text-gray-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <PythonPlayground
          defaultCode={`from pathlib import Path

# Path オブジェクトの作成
p = Path("/home/user/documents/report.txt")
print(f"パス: {p}")
print(f"名前: {p.name}")
print(f"ステム: {p.stem}")
print(f"拡張子: {p.suffix}")
print(f"親: {p.parent}")
print(f"祖先: {p.parent.parent}")

print()
# / 演算子でパス結合
base = Path("/home/user")
docs = base / "documents"
file = docs / "report.txt"
print(f"結合: {file}")

print()
# カレントディレクトリ
cwd = Path.cwd()
print(f"カレント: {cwd}")

# ホームディレクトリ
home = Path.home()
print(f"ホーム: {home}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">ファイルのグロブ検索と読み書き</h2>
        <PythonPlayground
          defaultCode={`from pathlib import Path
import tempfile
import os

# 一時ディレクトリでファイル操作をデモ
with tempfile.TemporaryDirectory() as tmpdir:
    base = Path(tmpdir)

    # ファイルを作成
    (base / "hello.txt").write_text("こんにちは、pathlib！", encoding="utf-8")
    (base / "data.csv").write_text("name,age\\n太郎,25", encoding="utf-8")
    (base / "notes.txt").write_text("メモ1\\nメモ2\\nメモ3", encoding="utf-8")

    # ファイルを読み込む
    content = (base / "hello.txt").read_text(encoding="utf-8")
    print(f"読み込み: {content}")

    # glob でファイルを検索
    txt_files = list(base.glob("*.txt"))
    print(f"\\n.txt ファイル ({len(txt_files)}件):")
    for f in sorted(txt_files):
        size = f.stat().st_size
        print(f"  {f.name} ({size} bytes)")

    # ファイル情報
    f = base / "data.csv"
    stat = f.stat()
    print(f"\\ndata.csv サイズ: {stat.st_size} bytes")
    print(f"絶対パス: {f.resolve()}")

print("完了（一時ファイルは自動削除）")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="stdlib" lessonId="pathlib" />
      </div>
      <LessonNav lessons={lessons} currentId="pathlib" basePath="/learn/stdlib" />
    </div>
  );
}
