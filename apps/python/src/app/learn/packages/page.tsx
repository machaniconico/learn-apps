import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

const quizQuestions: QuizQuestion[] = [
  {
    question: "pip でパッケージをインストールするコマンドはどれですか？",
    options: [
      "pip install パッケージ名",
      "pip add パッケージ名",
      "pip get パッケージ名",
      "pip download パッケージ名",
    ],
    answer: 0,
    explanation: "pip install パッケージ名 がインストールの基本コマンドです。バージョン指定は pip install パッケージ名==1.0.0 のように書きます。",
  },
  {
    question: "仮想環境（venv）を作成するコマンドはどれですか？",
    options: [
      "python -m venv 環境名",
      "python venv 環境名",
      "pip venv 環境名",
      "virtualenv 環境名",
    ],
    answer: 0,
    explanation: "python -m venv 環境名 でカレントディレクトリに仮想環境フォルダが作成されます。Pythonに標準付属しています。",
  },
  {
    question: "requirements.txt から一括インストールするコマンドはどれですか？",
    options: [
      "pip install -r requirements.txt",
      "pip install requirements.txt",
      "pip load requirements.txt",
      "pip freeze requirements.txt",
    ],
    answer: 0,
    explanation: "-r フラグでファイルを指定すると、記載されたすべてのパッケージをまとめてインストールできます。",
  },
  {
    question: "Poetry で新しいプロジェクトを作成するコマンドはどれですか？",
    options: [
      "poetry new プロジェクト名",
      "poetry create プロジェクト名",
      "poetry init プロジェクト名",
      "poetry start プロジェクト名",
    ],
    answer: 0,
    explanation: "poetry new でディレクトリ構造ごと作成します。既存ディレクトリに設定だけ追加する場合は poetry init を使います。",
  },
];

export default function PackagesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">パッケージ管理</h1>
        <div className="mb-3">
          <DifficultyBadge difficulty="intermediate" />
        </div>
        <p className="text-gray-400">
          Pythonのエコシステムは豊富なサードパーティパッケージで成り立っています。
          pip・venv・Poetryを使ってパッケージを管理し、再現性のある開発環境を構築しましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="packages" totalLessons={5} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/packages" color="green" categoryId="packages" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">なぜパッケージ管理が重要か？</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            {
              title: "コードの再利用",
              desc: "NumPy・pandas・requestsなど世界中の開発者が作ったライブラリをすぐに使える。",
              icon: "♻️",
            },
            {
              title: "バージョン管理",
              desc: "依存パッケージのバージョンを固定して、チームメンバーや本番環境で同じ動作を保証する。",
              icon: "🔒",
            },
            {
              title: "環境の分離",
              desc: "プロジェクトごとに独立した仮想環境を作り、パッケージの競合を防ぐ。",
              icon: "🏝️",
            },
            {
              title: "簡単な共有",
              desc: "requirements.txt や pyproject.toml でプロジェクトの依存関係を誰でも再現できる。",
              icon: "🤝",
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
        <h2 className="text-xl font-bold text-white mb-4">パッケージ管理ツールを理解しよう</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">pip — パッケージのインストール・管理</h3>
          <PythonPlayground
            defaultCode={`# pip コマンドの使い方をシミュレート（実際はターミナルで実行）
import sys

# インストール済みパッケージの確認（Pyodide環境）
import importlib

packages_to_check = ["json", "os", "math", "datetime", "collections"]
print("利用可能なモジュール確認:")
for pkg in packages_to_check:
    try:
        importlib.import_module(pkg)
        print(f"  {pkg}: 利用可能")
    except ImportError:
        print(f"  {pkg}: 未インストール")

print()
print("--- pip コマンド例（ターミナルで実行）---")
print("pip install requests       # インストール")
print("pip install requests==2.31.0  # バージョン指定")
print("pip uninstall requests     # アンインストール")
print("pip list                   # インストール済み一覧")
print("pip show requests          # パッケージ情報")
print("pip freeze                 # requirements.txt 形式で出力")
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3">requirements.txt の書き方</h3>
          <PythonPlayground
            defaultCode={`# requirements.txt の内容例をコードで表現
requirements = """
# 本番環境の依存パッケージ
requests==2.31.0
flask>=2.3.0,<3.0.0
sqlalchemy~=2.0
python-dotenv>=1.0.0

# バージョン指定なし（最新版）
pillow
"""

print("requirements.txt の例:")
print(requirements)

# バージョン指定の意味
specs = {
    "requests==2.31.0": "完全一致（2.31.0のみ）",
    "flask>=2.3.0,<3.0.0": "2.3.0以上3.0.0未満",
    "sqlalchemy~=2.0": "2.0以上2.xまで（互換バージョン）",
    "python-dotenv>=1.0.0": "1.0.0以上（最新推奨）",
}

print("バージョン指定の意味:")
for spec, meaning in specs.items():
    print(f"  {spec!r:40s} → {meaning}")
`}
          />
        </div>
      </section>

      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
