import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function PipPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ管理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">pip入門</h1>
        <p className="text-gray-400">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">pip</code> はPythonのパッケージインストーラです。
          PyPI（Python Package Index）から数十万のパッケージをワンコマンドでインストールできます。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">基本的な pip コマンド</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">ターミナル</div>
          <div className="p-4 font-mono text-sm space-y-3">
            {[
              { cmd: "pip install requests", desc: "# パッケージをインストール" },
              { cmd: "pip install requests==2.31.0", desc: "# バージョンを指定してインストール" },
              { cmd: "pip install 'requests>=2.28,<3.0'", desc: "# バージョン範囲を指定" },
              { cmd: "pip uninstall requests", desc: "# パッケージをアンインストール" },
              { cmd: "pip list", desc: "# インストール済みパッケージ一覧" },
              { cmd: "pip show requests", desc: "# パッケージの詳細情報" },
              { cmd: "pip freeze", desc: "# requirements.txt 形式で出力" },
              { cmd: "pip install --upgrade requests", desc: "# パッケージを最新版に更新" },
            ].map((item) => (
              <div key={item.cmd} className="flex flex-wrap gap-2">
                <code className="text-green-400">{item.cmd}</code>
                <span className="text-gray-500">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">よく使われるパッケージ</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {[
            { name: "requests", desc: "HTTP リクエストを送る", use: "Web API 呼び出し" },
            { name: "numpy", desc: "数値計算・配列操作", use: "データサイエンス" },
            { name: "pandas", desc: "データ分析・CSV 操作", use: "データ処理" },
            { name: "flask", desc: "軽量 Web フレームワーク", use: "Web 開発" },
            { name: "fastapi", desc: "高速 Web API フレームワーク", use: "API 開発" },
            { name: "pytest", desc: "テストフレームワーク", use: "ユニットテスト" },
          ].map((pkg) => (
            <div key={pkg.name} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <code className="text-green-400 font-mono text-sm">{pkg.name}</code>
              <p className="text-gray-300 text-sm">{pkg.desc}</p>
              <span className="text-xs text-gray-500">{pkg.use}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">インストール済みパッケージを確認する</h2>
        <PythonPlayground
          defaultCode={`import sys
import importlib

# 利用可能な標準ライブラリを確認
standard_libs = [
    "os", "sys", "json", "csv", "math",
    "datetime", "collections", "itertools",
    "pathlib", "re", "random", "string",
    "functools", "operator", "io", "time"
]

print("=== 標準ライブラリ確認 ===")
available = []
for lib in standard_libs:
    try:
        importlib.import_module(lib)
        available.append(lib)
    except ImportError:
        pass

for lib in available:
    print(f"  {lib}: OK")

print(f"\\n合計 {len(available)} モジュール利用可能")
print(f"Python バージョン: {sys.version.split()[0]}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="packages" lessonId="pip" />
      </div>
      <LessonNav lessons={lessons} currentId="pip" basePath="/learn/packages" />
    </div>
  );
}
