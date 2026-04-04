import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flask");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Flask レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ルーティング</h1>
        <p className="text-gray-400">@app.routeデコレータでURLと処理関数を対応付ける方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">基本的なルーティング</h2>
        <p className="text-gray-400 mb-4">
          Flaskでは<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">@app.route()</code>デコレータでURLパスと関数を対応付けます。
          HTTPメソッドはデフォルトでGETのみですが、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">methods</code>引数で指定できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5 mb-4">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask import Flask, request

app = Flask(__name__)

# GETのみ（デフォルト）
@app.route('/')
def index():
    return 'トップページ'

# 複数のHTTPメソッドを受け付ける
@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        return 'データを受け取りました'
    return 'フォームページ'`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">動的なURLパラメータ</h2>
        <p className="text-gray-400 mb-4">
          URLの一部を変数として受け取ることができます。<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;変数名&gt;</code>の形式で定義し、
          型を指定することもできます（int:・float:・path:・uuid:）。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# 文字列パラメータ（デフォルト）
@app.route('/user/<username>')
def show_user(username):
    return f'ユーザー: {username}'

# 整数パラメータ
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'記事ID: {post_id}'

# 複数のパラメータ
@app.route('/category/<string:cat>/item/<int:item_id>')
def show_item(cat, item_id):
    return f'カテゴリ: {cat}, 商品ID: {item_id}'`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">URLリダイレクトとurl_for</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">url_for()</code>関数を使うと、関数名からURLを逆引き生成できます。
          URLを文字列でハードコードすると後のリファクタリングが大変になるため、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">url_for()</code>の使用を推奨します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask import Flask, url_for, redirect

@app.route('/old-path')
def old_endpoint():
    # url_for で新しいURLに動的にリダイレクト
    return redirect(url_for('new_endpoint'))

@app.route('/new-path')
def new_endpoint():
    return '新しいパスです'

# url_for でURLを生成
with app.test_request_context():
    print(url_for('show_user', username='tanaka'))
    # => /user/tanaka`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ルーティングパターンを実践する</h2>
        <p className="text-gray-400 mb-4">
          URLパターンと動的パラメータの処理を確認してみましょう。
        </p>
        <PythonPlayground defaultCode={`# Flaskのルーティングをシミュレート

class Router:
    def __init__(self):
        self.routes = {}

    def route(self, path):
        """デコレータでルートを登録する"""
        def decorator(func):
            self.routes[path] = func
            return func
        return decorator

    def dispatch(self, path):
        """URLに対応するハンドラを呼び出す"""
        # 完全一致チェック
        if path in self.routes:
            return self.routes[path]()

        # 動的パラメータのチェック
        for route_path, handler in self.routes.items():
            parts = route_path.split("/")
            req_parts = path.split("/")
            if len(parts) != len(req_parts):
                continue
            kwargs = {}
            match = True
            for rp, pp in zip(parts, req_parts):
                if rp.startswith("<") and rp.endswith(">"):
                    param_name = rp[1:-1]
                    kwargs[param_name] = pp
                elif rp != pp:
                    match = False
                    break
            if match:
                return handler(**kwargs)
        return "404 Not Found"

app = Router()

@app.route("/")
def index():
    return "トップページ"

@app.route("/hello/<name>")
def hello(name="World"):
    return f"こんにちは、{name}さん！"

@app.route("/user/<username>")
def user_profile(username=""):
    return f"ユーザー: {username}"

# テスト
test_paths = ["/", "/hello/tanaka", "/user/macha", "/unknown"]
for path in test_paths:
    result = app.dispatch(path)
    print(f"GET {path} -> {result}")`} />
      </section>

      <LessonCompleteButton categoryId="flask" lessonId="routing" />
      <LessonNav lessons={lessons} currentId="routing" basePath="/learn/flask" />
    </div>
  );
}
