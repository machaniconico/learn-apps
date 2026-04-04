import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flask");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Flaskでルートを定義するために使うデコレータはどれですか？",
    options: ["@flask.route()", "@app.route()", "@route.flask()", "@web.route()"],
    answer: 1,
    explanation: "@app.route() デコレータを使ってURLパスと処理を対応付けます。appはFlaskインスタンスです。",
  },
  {
    question: "Flaskアプリのインスタンスを作成する正しいコードはどれですか？",
    options: [
      "app = Flask()",
      "app = Flask('myapp')",
      "app = Flask(__name__)",
      "app = flask.App(__name__)",
    ],
    answer: 2,
    explanation: "Flask(__name__) と書きます。__name__ はモジュール名を自動で渡す特別な変数で、テンプレートや静的ファイルの場所を特定するために使われます。",
  },
  {
    question: "Jinjaテンプレートで変数を出力するための構文はどれですか？",
    options: ["{{ variable }}", "{% variable %}", "{# variable #}", "<% variable %>"],
    answer: 0,
    explanation: "{{ }} は変数の値を出力するための構文です。{% %} は制御構文（if/for）、{# #} はコメントに使います。",
  },
  {
    question: "FlaskでJSONレスポンスを返す最も簡単な方法はどれですか？",
    options: [
      "return json.dumps(data)",
      "return jsonify(data)",
      "return Response(data, mimetype='application/json')",
      "return data.to_json()",
    ],
    answer: 1,
    explanation: "jsonify() 関数を使うと、Pythonの辞書やリストを自動的にJSONレスポンスに変換してContent-TypeヘッダーもJSON用に設定してくれます。",
  },
];

export default function FlaskPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">Flask入門</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          PythonのマイクロWebフレームワーク「Flask」を学びましょう。
          シンプルな設計思想で、小規模なWebアプリからREST APIまで柔軟に構築できます。
          ルーティング・テンプレート・データベース連携・認証などを順番に習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="flask" totalLessons={8} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/flask" color="pink" categoryId="flask" />
      </section>

      {/* What is Flask? */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Flaskとは？</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-gray-900 border border-pink-500/20">
            <div className="text-2xl mb-2">🪶</div>
            <h3 className="text-pink-400 font-bold mb-1">軽量・シンプル</h3>
            <p className="text-gray-400 text-sm">必要最小限の機能だけを提供するマイクロフレームワーク。学習コストが低く、小規模プロジェクトに最適です。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-pink-500/20">
            <div className="text-2xl mb-2">🔌</div>
            <h3 className="text-pink-400 font-bold mb-1">拡張性が高い</h3>
            <p className="text-gray-400 text-sm">Flask-SQLAlchemy・Flask-Login・Flask-RESTfulなど豊富な拡張機能で機能を自由に追加できます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-pink-500/20">
            <div className="text-2xl mb-2">📖</div>
            <h3 className="text-pink-400 font-bold mb-1">Jinjaテンプレート</h3>
            <p className="text-gray-400 text-sm">強力なテンプレートエンジンJinjaを内蔵。HTMLに動的なデータを埋め込むことが簡単にできます。</p>
          </div>
        </div>
      </section>

      {/* Code example 1: Decorators and routing pattern */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デコレータパターンでルーティングを理解する</h2>
        <p className="text-gray-400 mb-4">
          Flaskのルーティングは<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">@app.route()</code>デコレータで実現します。
          デコレータの仕組みをPythonで確認してみましょう。
        </p>
        <PythonPlayground defaultCode={`# Flaskのルーティングの仕組みをPythonで再現
# デコレータを使ったルートの登録パターン

routes = {}  # URLパスと関数のマッピング

def route(path):
    """@app.route() のような動作をするデコレータ"""
    def decorator(func):
        routes[path] = func
        return func
    return decorator

@route("/")
def index():
    return "<h1>Hello, Flask!</h1>"

@route("/about")
def about():
    return "<p>このサイトについて</p>"

@route("/users/<name>")
def greet_user(name="ゲスト"):
    return f"<p>こんにちは、{name}さん！</p>"

# ルーティングテーブルを確認
print("登録されたルート:")
for path, func in routes.items():
    print(f"  {path} -> {func.__name__}()")

# リクエストのシミュレーション
print("\\nルートを呼び出す:")
print(routes["/"]());
print(routes["/about"]())
print(routes["/users/<name>"]("田中"))`} />
      </section>

      {/* Code example 2: JSON responses with dicts */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSONレスポンスのデータ構造</h2>
        <p className="text-gray-400 mb-4">
          FlaskのREST APIでは辞書を<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">jsonify()</code>で変換してJSONを返します。
          辞書操作でAPIレスポンスの構造を学びましょう。
        </p>
        <PythonPlayground defaultCode={`import json

# FlaskのJSONレスポンスをシミュレート
def jsonify(data):
    """flask.jsonify() の簡易版"""
    return json.dumps(data, ensure_ascii=False, indent=2)

# ユーザー一覧エンドポイントのデータ
def get_users():
    users = [
        {"id": 1, "name": "田中太郎", "email": "tanaka@example.com", "active": True},
        {"id": 2, "name": "鈴木花子", "email": "suzuki@example.com", "active": True},
        {"id": 3, "name": "佐藤次郎", "email": "sato@example.com", "active": False},
    ]
    return jsonify({"users": users, "total": len(users)})

# 個別ユーザーエンドポイント
def get_user(user_id):
    users = {1: "田中太郎", 2: "鈴木花子", 3: "佐藤次郎"}
    if user_id in users:
        return jsonify({"id": user_id, "name": users[user_id]})
    return jsonify({"error": "ユーザーが見つかりません"}), 404

print("GET /api/users")
print(get_users())
print("\\nGET /api/users/1")
print(get_user(1))`} />
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="pink" />
      </section>
    </div>
  );
}
