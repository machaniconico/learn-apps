import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flask");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Flask レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Flaskセットアップ</h1>
        <p className="text-gray-400">Flaskのインストールと最小限のWebアプリ起動方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Flaskのインストール</h2>
        <p className="text-gray-400 mb-4">
          Flaskはpipで簡単にインストールできます。まず仮想環境を作成し、その中にインストールするのがベストプラクティスです。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5 mb-4">
          <p className="text-sm font-semibold text-gray-300 mb-3">インストール手順</p>
          <div className="space-y-3 text-sm font-mono">
            <div>
              <p className="text-gray-500 mb-1"># 仮想環境の作成と有効化</p>
              <p className="text-green-400">python -m venv venv</p>
              <p className="text-green-400">source venv/bin/activate  <span className="text-gray-500"># Windows: venv\Scripts\activate</span></p>
            </div>
            <div>
              <p className="text-gray-500 mb-1"># Flaskのインストール</p>
              <p className="text-green-400">pip install flask</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1"># インストール確認</p>
              <p className="text-green-400">flask --version</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">最小限のFlaskアプリ</h2>
        <p className="text-gray-400 mb-4">
          Flaskアプリの基本構造はわずか数行です。<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Flask(__name__)</code>でアプリインスタンスを作り、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">@app.route()</code>でルートを定義します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5 mb-4">
          <p className="text-sm font-semibold text-gray-300 mb-3">app.py</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, Flask!'

if __name__ == '__main__':
    app.run(debug=True)`}</pre>
        </div>
        <p className="text-gray-400 text-sm">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">debug=True</code>を指定するとコード変更時に自動でリロードされます。本番環境では必ず<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">False</code>にしましょう。
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクト構成</h2>
        <p className="text-gray-400 mb-4">
          小規模なFlaskアプリは単一ファイルでも書けますが、中規模以上では適切なディレクトリ構成を取ることが重要です。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-300 whitespace-pre">{`myapp/
├── app.py          # アプリのエントリーポイント
├── requirements.txt
├── templates/      # Jinjaテンプレート
│   ├── base.html
│   └── index.html
└── static/         # CSS・JS・画像など静的ファイル
    ├── css/
    └── js/`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デコレータの仕組みを確認する</h2>
        <p className="text-gray-400 mb-4">
          Flaskのルーティングはデコレータを活用しています。デコレータがどのように動作するかを確認しましょう。
        </p>
        <PythonPlayground defaultCode={`# Flaskのデコレータパターンをシミュレート
class FlaskApp:
    def __init__(self, name):
        self.name = name
        self.routes = {}

    def route(self, path):
        def decorator(func):
            self.routes[path] = func
            print(f"ルート登録: {path} -> {func.__name__}()")
            return func
        return decorator

    def run(self, host="127.0.0.1", port=5000, debug=False):
        print(f"\\nサーバー起動: http://{host}:{port}/")
        print(f"デバッグモード: {debug}")

# アプリの作成
app = FlaskApp(__name__)

@app.route("/")
def index():
    return "Hello, Flask!"

@app.route("/about")
def about():
    return "Flaskで作ったWebアプリです"

app.run(debug=True)

# 登録されたルートを確認
print(f"\\n登録ルート数: {len(app.routes)}")
for path, func in app.routes.items():
    result = func()
    print(f"  {path}: '{result}'")`} />
      </section>

      <LessonCompleteButton categoryId="flask" lessonId="setup" />
      <LessonNav lessons={lessons} currentId="setup" basePath="/learn/flask" />
    </div>
  );
}
