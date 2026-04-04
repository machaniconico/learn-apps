import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flask");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Flask レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フォーム処理</h1>
        <p className="text-gray-400">GETとPOSTでフォームデータを受け取り、バリデーションを行う方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">requestオブジェクト</h2>
        <p className="text-gray-400 mb-4">
          Flaskでは<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">request</code>オブジェクトでリクエストデータにアクセスします。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">request.form</code>でPOSTデータ、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">request.args</code>でGETのクエリパラメータを取得できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask import Flask, request, redirect, url_for

app = Flask(__name__)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # POSTデータの取得
        username = request.form.get('username', '')
        password = request.form.get('password', '')

        # バリデーション
        if not username or not password:
            return 'ユーザー名とパスワードを入力してください', 400

        # 認証処理...
        return redirect(url_for('dashboard'))

    # GETリクエスト：ログインフォームを表示
    return render_template('login.html')`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">WTFormsによるフォームバリデーション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">Flask-WTF</code>を使うとフォームのバリデーションとCSRF対策を簡単に実装できます。
          フォームをクラスとして定義し、バリデーターを指定するだけです。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length

class LoginForm(FlaskForm):
    email = StringField('メールアドレス', validators=[
        DataRequired(message='必須項目です'),
        Email(message='有効なメールアドレスを入力してください'),
    ])
    password = PasswordField('パスワード', validators=[
        DataRequired(),
        Length(min=8, message='8文字以上で入力してください'),
    ])
    submit = SubmitField('ログイン')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():  # バリデーション成功＋POST
        email = form.email.data
        password = form.password.data
        # 認証処理...
    return render_template('login.html', form=form)`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">フラッシュメッセージ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">flash()</code>関数で一時的なメッセージをセッションに保存し、
          次のリクエストで表示できます。フォーム送信後のフィードバックによく使われます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask import flash

@app.route('/submit', methods=['POST'])
def submit():
    # 処理成功時
    flash('登録が完了しました！', 'success')
    # エラー時
    # flash('入力に誤りがあります', 'error')
    return redirect(url_for('index'))

# テンプレート側で表示
# {% with messages = get_flashed_messages(with_categories=true) %}
#   {% for category, message in messages %}
#     <div class="alert alert-{{ category }}">{{ message }}</div>
#   {% endfor %}
# {% endwith %}`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォームバリデーションを実装する</h2>
        <p className="text-gray-400 mb-4">
          Pythonでフォームデータのバリデーション処理を実装してみましょう。
        </p>
        <PythonPlayground defaultCode={`import re

def validate_form(data: dict) -> tuple[bool, list[str]]:
    """フォームバリデーション（Flask-WTFの仕組みを再現）"""
    errors = []

    # 名前のバリデーション
    name = data.get("name", "").strip()
    if not name:
        errors.append("名前は必須です")
    elif len(name) < 2:
        errors.append("名前は2文字以上で入力してください")

    # メールアドレスのバリデーション
    email = data.get("email", "").strip()
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not email:
        errors.append("メールアドレスは必須です")
    elif not re.match(email_pattern, email):
        errors.append("有効なメールアドレスを入力してください")

    # パスワードのバリデーション
    password = data.get("password", "")
    if len(password) < 8:
        errors.append("パスワードは8文字以上が必要です")
    if not re.search(r'[A-Z]', password):
        errors.append("パスワードに大文字を含めてください")

    return len(errors) == 0, errors

# テストケース
test_cases = [
    {"name": "田中太郎", "email": "tanaka@example.com", "password": "SecurePass1"},
    {"name": "A", "email": "invalid-email", "password": "weak"},
    {"name": "", "email": "", "password": ""},
]

for i, data in enumerate(test_cases, 1):
    valid, errors = validate_form(data)
    print(f"テスト{i}: {'✓ 有効' if valid else '✗ エラー'}")
    for err in errors:
        print(f"  - {err}")`} />
      </section>

      <LessonCompleteButton categoryId="flask" lessonId="forms" />
      <LessonNav lessons={lessons} currentId="forms" basePath="/learn/flask" />
    </div>
  );
}
