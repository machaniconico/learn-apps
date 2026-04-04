import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flask");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Flask レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">認証・セッション</h1>
        <p className="text-gray-400">Flaskのセッション管理とFlask-Loginを使ったログイン機能の実装を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Flaskのセッション管理</h2>
        <p className="text-gray-400 mb-4">
          Flaskの<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">session</code>オブジェクトは辞書のように使えます。
          データはクライアント側のCookieに暗号化して保存されるため、<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">SECRET_KEY</code>の設定が必須です。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask import Flask, session, redirect, url_for

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # 本番では安全なランダム文字列を使うこと

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if authenticate(username, password):
        session['user_id'] = get_user_id(username)
        session['logged_in'] = True
        return redirect(url_for('dashboard'))
    return 'ログイン失敗', 401

@app.route('/logout')
def logout():
    session.clear()  # セッションをクリア
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return f"ようこそ！ユーザーID: {session['user_id']}"`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Flask-Loginの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Flask-Login</code>はユーザー認証を簡単に実装できる拡張機能です。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">@login_required</code>デコレータで保護されたルートを簡単に作れます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask_login import LoginManager, UserMixin, login_user, logout_user
from flask_login import login_required, current_user

login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password_hash = db.Column(db.String(128))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    user = User.query.filter_by(username=form.username.data).first()
    if user and check_password_hash(user.password_hash, form.password.data):
        login_user(user)
        return redirect(url_for('dashboard'))

@app.route('/dashboard')
@login_required  # 未ログインならlogin_viewにリダイレクト
def dashboard():
    return f'こんにちは、{current_user.username}さん！'`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">パスワードのハッシュ化</h2>
        <p className="text-gray-400 mb-4">
          パスワードは絶対に平文で保存してはいけません。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">werkzeug.security</code>の
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">generate_password_hash()</code>と
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">check_password_hash()</code>を使います。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from werkzeug.security import generate_password_hash, check_password_hash

# ユーザー登録時：ハッシュ化して保存
password = "ユーザーが入力したパスワード"
hashed = generate_password_hash(password)
# → 'scrypt:32768:8:1$...$...' のような文字列でDBに保存

# ログイン時：ハッシュと比較
is_valid = check_password_hash(hashed, password)
print(is_valid)  # True

# 異なるパスワードで試す
is_valid = check_password_hash(hashed, "wrongpassword")
print(is_valid)  # False`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">認証の仕組みを実装する</h2>
        <p className="text-gray-400 mb-4">
          セッションを使った認証フローをPythonでシミュレートしてみましょう。
        </p>
        <PythonPlayground defaultCode={`import hashlib
import secrets

# シンプルなハッシュ関数（werkzeugのgenerate_password_hashの簡易版）
def hash_password(password: str) -> str:
    salt = secrets.token_hex(8)
    h = hashlib.sha256(f"{salt}{password}".encode()).hexdigest()
    return f"sha256:{salt}:{h}"

def check_password(stored_hash: str, password: str) -> bool:
    parts = stored_hash.split(":")
    if len(parts) != 3:
        return False
    _, salt, stored = parts
    h = hashlib.sha256(f"{salt}{password}".encode()).hexdigest()
    return h == stored

# セッションの簡易実装
sessions = {}  # {session_id: user_id}

def login(users_db, username, password):
    user = users_db.get(username)
    if not user:
        return None, "ユーザーが見つかりません"
    if not check_password(user["password_hash"], password):
        return None, "パスワードが違います"
    session_id = secrets.token_hex(16)
    sessions[session_id] = username
    return session_id, "ログイン成功"

def get_current_user(session_id):
    return sessions.get(session_id)

# ユーザーDB（実際はSQLiteなどに保存）
users_db = {
    "tanaka": {"password_hash": hash_password("mypassword123")},
    "suzuki": {"password_hash": hash_password("securepass456")},
}

# ログインフロー
session_id, msg = login(users_db, "tanaka", "mypassword123")
print(f"ログイン: {msg}")
print(f"セッションID: {session_id[:20]}...")
print(f"現在のユーザー: {get_current_user(session_id)}")

# 間違ったパスワード
_, msg = login(users_db, "tanaka", "wrongpassword")
print(f"\\n誤ったパスワード: {msg}")`} />
      </section>

      <LessonCompleteButton categoryId="flask" lessonId="auth" />
      <LessonNav lessons={lessons} currentId="auth" basePath="/learn/flask" />
    </div>
  );
}
