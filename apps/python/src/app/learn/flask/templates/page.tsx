import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flask");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Flask レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Jinjaテンプレート</h1>
        <p className="text-gray-400">HTMLテンプレートに動的なデータを埋め込む方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Jinjaの基本構文</h2>
        <p className="text-gray-400 mb-4">
          Jinjaテンプレートには3種類の特別な構文があります。
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{{ }}"}</code>は変数の出力、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{% %}"}</code>は制御構文、
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{# #}"}</code>はコメントです。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <p className="text-xs text-gray-500 mb-2">templates/index.html</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`<!DOCTYPE html>
<html>
<head><title>{{ title }}</title></head>
<body>
  <h1>こんにちは、{{ user.name }}さん！</h1>

  {# これはコメントです #}

  {% if user.is_admin %}
    <p>管理者メニュー</p>
  {% endif %}

  <ul>
  {% for item in items %}
    <li>{{ loop.index }}. {{ item }}</li>
  {% endfor %}
  </ul>
</body>
</html>`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">render_templateとコンテキスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">render_template()</code>関数でテンプレートにデータを渡します。
          キーワード引数がテンプレートの変数名になります。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from flask import Flask, render_template

app = Flask(__name__)

@app.route('/users/<int:user_id>')
def user_profile(user_id):
    # データベースからユーザー取得（仮）
    user = {"id": user_id, "name": "田中太郎", "is_admin": False}
    items = ["Python基礎", "Flask入門", "SQLAlchemy"]

    # テンプレートにデータを渡す
    return render_template(
        'profile.html',
        title=f"{user['name']}のプロフィール",
        user=user,
        items=items,
    )`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">テンプレートの継承</h2>
        <p className="text-gray-400 mb-4">
          Jinjaの強力な機能の一つが<strong className="text-white">テンプレート継承</strong>です。
          共通のレイアウトを<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">base.html</code>に定義し、
          各ページはそれを<code className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{% extends %}"}</code>で継承します。
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-xs text-gray-500 mb-2">templates/base.html（親）</p>
            <pre className="text-xs font-mono text-gray-200 whitespace-pre">{`<!DOCTYPE html>
<html>
<head>
  <title>{% block title %}サイト{% endblock %}</title>
</head>
<body>
  <nav>共通ナビゲーション</nav>
  <main>
    {% block content %}{% endblock %}
  </main>
  <footer>共通フッター</footer>
</body>
</html>`}</pre>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-xs text-gray-500 mb-2">templates/index.html（子）</p>
            <pre className="text-xs font-mono text-gray-200 whitespace-pre">{`{% extends 'base.html' %}

{% block title %}トップページ{% endblock %}

{% block content %}
  <h1>ようこそ！</h1>
  <p>このサイトはFlaskで作られています。</p>
{% endblock %}`}</pre>
          </div>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートエンジンの仕組みを確認する</h2>
        <p className="text-gray-400 mb-4">
          テンプレートエンジンが変数と制御構文をどのように処理するかをPythonで再現してみましょう。
        </p>
        <PythonPlayground defaultCode={`import re

def render_template(template, context):
    """Jinjaテンプレートエンジンの簡易版"""
    result = template

    # {{ variable }} の置換
    def replace_var(match):
        key = match.group(1).strip()
        keys = key.split(".")
        val = context
        for k in keys:
            val = val.get(k, "") if isinstance(val, dict) else getattr(val, k, "")
        return str(val)

    result = re.sub(r'\{\{\s*(.+?)\s*\}\}', replace_var, result)
    return result

# テンプレートの定義
template = """
こんにちは、{{ user.name }}さん！
メールアドレス: {{ user.email }}
登録日: {{ user.joined }}
"""

# コンテキストデータ（Flaskのrender_templateに渡すデータ）
context = {
    "user": {
        "name": "田中太郎",
        "email": "tanaka@example.com",
        "joined": "2024-01-15",
    }
}

# レンダリング
output = render_template(template, context)
print("=== レンダリング結果 ===")
print(output)

# forループのシミュレーション
items = ["Flask基礎", "ルーティング", "テンプレート"]
print("=== 商品リスト ===")
for i, item in enumerate(items, 1):
    print(f"{i}. {item}")`} />
      </section>

      <LessonCompleteButton categoryId="flask" lessonId="templates" />
      <LessonNav lessons={lessons} currentId="templates" basePath="/learn/flask" />
    </div>
  );
}
