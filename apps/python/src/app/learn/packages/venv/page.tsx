import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function VenvPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ管理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">仮想環境（venv）</h1>
        <p className="text-gray-400">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">venv</code> はプロジェクトごとに独立したPython環境を作るツールです。
          パッケージの競合を防ぎ、再現性のある開発環境を実現します。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">なぜ仮想環境が必要か？</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-900/20 rounded-xl p-4 border border-red-700/50">
            <h3 className="text-red-400 font-semibold mb-2">問題：グローバル環境の混在</h3>
            <p className="text-gray-400 text-sm">
              プロジェクトAが <code className="text-red-300 bg-gray-800 px-1 rounded">Django 3.2</code> を、
              プロジェクトBが <code className="text-red-300 bg-gray-800 px-1 rounded">Django 4.2</code> を必要とする場合、
              グローバルにインストールすると競合してどちらかが動かなくなります。
            </p>
          </div>
          <div className="bg-green-900/20 rounded-xl p-4 border border-green-700/50">
            <h3 className="text-green-400 font-semibold mb-2">解決：仮想環境で分離</h3>
            <p className="text-gray-400 text-sm">
              各プロジェクトに独立した環境を持つことで、バージョンの競合を防ぎます。
              チームメンバーと同じ環境を簡単に再現することも可能です。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">venv の基本的な使い方</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">ターミナル</div>
          <div className="p-4 font-mono text-sm space-y-4">
            <div>
              <p className="text-gray-500 text-xs mb-1"># 1. 仮想環境を作成</p>
              <code className="text-green-400">python -m venv .venv</code>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1"># 2. 仮想環境を有効化（macOS/Linux）</p>
              <code className="text-green-400">source .venv/bin/activate</code>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1"># 2. 仮想環境を有効化（Windows）</p>
              <code className="text-green-400">.venv\Scripts\activate</code>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1"># 3. パッケージをインストール（仮想環境内）</p>
              <code className="text-green-400">pip install requests flask</code>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1"># 4. 仮想環境を無効化</p>
              <code className="text-green-400">deactivate</code>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4">
          <h3 className="text-white font-semibold mb-2">.venv ディレクトリの構造</h3>
          <pre className="text-sm font-mono text-gray-400">
{`.venv/
├── bin/          # macOS/Linux: python, pip, activate など
│   ├── activate
│   ├── python -> python3
│   └── pip
├── Scripts/      # Windows: python.exe, pip.exe など
├── lib/          # インストールしたパッケージ
│   └── python3.x/
│       └── site-packages/
└── pyvenv.cfg    # Python バージョン情報`}
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">仮想環境の確認</h2>
        <PythonPlayground
          defaultCode={`import sys
import os

print(f"Python実行ファイル: {sys.executable}")
print(f"Pythonバージョン: {sys.version.split()[0]}")
print(f"プラットフォーム: {sys.platform}")

# 仮想環境かどうか確認
in_venv = hasattr(sys, 'real_prefix') or (
    hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix
)
print(f"仮想環境内: {in_venv}")

# sys.path（モジュール検索パス）
print("\\nモジュール検索パス（先頭3件）:")
for p in sys.path[:3]:
    if p:
        print(f"  {p}")

# VIRTUAL_ENV 環境変数
venv_path = os.environ.get("VIRTUAL_ENV", "（仮想環境外）")
print(f"\\nVIRTUAL_ENV: {venv_path}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="packages" lessonId="venv" />
      </div>
      <LessonNav lessons={lessons} currentId="venv" basePath="/learn/packages" />
    </div>
  );
}
