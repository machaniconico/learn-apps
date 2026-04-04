import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function WithStatementPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">with文</h1>
        <p className="text-gray-400">
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">with</code> 文（コンテキストマネージャ）を使うと、
          ファイルのクローズ忘れを防ぎ、例外が発生した場合でも確実にリソースを解放できます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">with 文を使う理由</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-900/20 rounded-xl p-4 border border-red-700/50">
            <h3 className="text-red-400 font-semibold mb-2">with なしの問題</h3>
            <pre className="text-sm font-mono text-gray-400 bg-gray-900 p-3 rounded">
{`f = open("file.txt")
try:
    data = f.read()
    # 例外が発生すると...
    process(data)
finally:
    f.close()  # 忘れやすい！`}
            </pre>
          </div>
          <div className="bg-green-900/20 rounded-xl p-4 border border-green-700/50">
            <h3 className="text-green-400 font-semibold mb-2">with 文のベストプラクティス</h3>
            <pre className="text-sm font-mono text-gray-400 bg-gray-900 p-3 rounded">
{`with open("file.txt") as f:
    data = f.read()
    process(data)
# ブロックを抜けると自動で close()`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">with 文の基本パターン</h2>
        <PythonPlayground
          defaultCode={`import io
from contextlib import contextmanager

# コンテキストマネージャの動作を確認
class DemoFile:
    def __init__(self, name):
        self.name = name
        print(f"ファイル '{name}' を開く")

    def __enter__(self):
        print(f"__enter__: '{self.name}' 使用開始")
        return self  # as に渡されるオブジェクト

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"__exit__: '{self.name}' クローズ")
        if exc_type:
            print(f"  例外 {exc_type.__name__} が発生したが処理を継続")
        return False  # False = 例外を再送出

    def read(self):
        return "ファイルの内容"

print("=== with 文の実行順序 ===")
with DemoFile("test.txt") as f:
    print(f"本体: {f.read()}")

print()
print("=== 例外が発生した場合 ===")
try:
    with DemoFile("error.txt") as f:
        print("例外を発生させます")
        raise ValueError("テストエラー")
except ValueError as e:
    print(f"例外を捕捉: {e}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">複数ファイルの同時オープンと contextmanager</h2>
        <PythonPlayground
          defaultCode={`import io
from contextlib import contextmanager

# 複数ファイルを同時に with で開く
print("=== 複数ファイル同時オープン ===")
src_data = "入力ファイルの内容\\n行2\\n行3"
src = io.StringIO(src_data)
dst = io.StringIO()

# with を使って複数ファイルを管理
# 実際は: with open('src.txt') as src, open('dst.txt', 'w') as dst:
for line in src:
    dst.write(line.upper())

dst.seek(0)
print("変換後:")
print(dst.read())

print()
# @contextmanager デコレータでカスタムコンテキストマネージャを作る
@contextmanager
def managed_resource(name: str):
    print(f"開始: {name}")
    try:
        yield name  # with ブロックに渡す値
    finally:
        print(f"終了: {name}（必ず実行される）")

with managed_resource("データベース接続") as res:
    print(f"使用中: {res}")
    # 例外が起きても finally は実行される

print("完了")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="fileio" lessonId="with-statement" />
      </div>
      <LessonNav lessons={lessons} currentId="with-statement" basePath="/learn/fileio" />
    </div>
  );
}
