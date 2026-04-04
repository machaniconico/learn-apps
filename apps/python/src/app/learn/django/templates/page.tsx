import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("django");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Django レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テンプレート</h1>
        <p className="text-gray-400">Djangoテンプレート言語でHTMLを動的に生成する方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Djangoテンプレート言語（DTL）の基本</h2>
        <p className="text-gray-400 mb-4">
          DjangoのテンプレートはJinjaに似た構文を持ちますが、セキュリティと意図的なシンプルさを重視した独自言語です。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{{ }}"}</code>で変数を出力し、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{% %}"}</code>で制御構文を書きます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <p className="text-xs text-gray-500 mb-2">templates/blog/article_list.html</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`{% extends 'base.html' %}

{% block title %}記事一覧{% endblock %}

{% block content %}
<h1>記事一覧</h1>

{% if articles %}
  {% for article in articles %}
    <article>
      <h2>
        <a href="{% url 'blog:article_detail' article.pk %}">
          {{ article.title }}
        </a>
      </h2>
      <p>{{ article.published_at|date:"Y年m月d日" }}</p>
      <p>{{ article.content|truncatechars:100 }}</p>
    </article>
  {% endfor %}
{% else %}
  <p>記事がありません。</p>
{% endif %}

{% endblock %}`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">テンプレートフィルター</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">|</code>（パイプ）でフィルターを適用して値を変換できます。
          日時のフォーマット・文字列の切り詰め・デフォルト値の設定などに使います。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`{# 文字列の変換 #}
{{ article.title|upper }}         {# 大文字 #}
{{ article.title|lower }}         {# 小文字 #}
{{ article.content|truncatechars:50 }} {# 50文字で切り詰め #}
{{ article.title|slugify }}       {# URLフレンドリーな文字列 #}

{# 日時のフォーマット #}
{{ article.published_at|date:"Y/m/d H:i" }}

{# 数値のフォーマット #}
{{ price|floatformat:0 }}        {# 小数点以下を丸める #}

{# デフォルト値 #}
{{ article.bio|default:"プロフィールなし" }}

{# HTML エスケープ #}
{{ content|safe }}               {# HTMLをそのまま出力（信頼できる場合のみ） #}
{{ user_input|escape }}          {# HTMLエスケープ（デフォルトで有効）#}`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">テンプレートの継承とinclude</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{% extends %}"}</code>でベーステンプレートを継承し、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{% include %}"}</code>で部品を読み込みます。
          共通のレイアウトをDRYに管理できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <p className="text-xs text-gray-500 mb-2">templates/base.html</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`<!DOCTYPE html>
<html lang="ja">
<head>
  <title>{% block title %}サイト名{% endblock %} | MySite</title>
  {% block extra_css %}{% endblock %}
</head>
<body>
  {% include 'partials/navbar.html' %}

  <main>
    {% if messages %}
      {% for message in messages %}
        <div class="alert alert-{{ message.tags }}">{{ message }}</div>
      {% endfor %}
    {% endif %}

    {% block content %}{% endblock %}
  </main>

  {% include 'partials/footer.html' %}
  {% block extra_js %}{% endblock %}
</body>
</html>`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートフィルターを実装する</h2>
        <p className="text-gray-400 mb-4">
          Djangoのテンプレートフィルターと同等の処理をPythonで実装してみましょう。
        </p>
        <PythonPlayground defaultCode={`import re
from datetime import datetime

# Djangoテンプレートフィルターをシミュレート
class TemplateFilters:
    @staticmethod
    def upper(value):
        return str(value).upper()

    @staticmethod
    def lower(value):
        return str(value).lower()

    @staticmethod
    def truncatechars(value, length):
        s = str(value)
        if len(s) > length:
            return s[:length-3] + "..."
        return s

    @staticmethod
    def slugify(value):
        value = str(value).lower()
        value = re.sub(r'[^\w\s-]', '', value)
        value = re.sub(r'[\s_-]+', '-', value)
        return value.strip('-')

    @staticmethod
    def date(value, format_str):
        if isinstance(value, datetime):
            # Djangoのdate formatをpythonのstrftimeに変換
            mapping = {"Y": "%Y", "m": "%m", "d": "%d", "H": "%H", "i": "%M"}
            py_format = format_str
            for k, v in mapping.items():
                py_format = py_format.replace(k, v)
            return value.strftime(py_format)
        return str(value)

    @staticmethod
    def default(value, default_value):
        return value if value else default_value

    @staticmethod
    def floatformat(value, decimal_places):
        return f"{float(value):.{decimal_places}f}"

# フィルターのテスト
f = TemplateFilters()
title = "Djangoのテンプレートエンジン入門"
content = "Djangoのテンプレートエンジンはとても強力です。変数・フィルター・タグを組み合わせることで..."
price = 3200.0
now = datetime.now()

print(f"元のタイトル: {title}")
print(f"upper: {f.upper(title)}")
print(f"truncatechars(20): {f.truncatechars(title, 20)}")
print(f"slugify: {f.slugify(title)}")
print()
print(f"日時フォーマット: {f.date(now, 'Y/m/d H:i')}")
print()
print(f"price floatformat(0): {f.floatformat(price, 0)}")
print(f"空の値にデフォルト: {f.default('', 'プロフィールなし')}")
print(f"空でない値: {f.default('実際の値', 'デフォルト')}")`} />
      </section>

      <LessonCompleteButton categoryId="django" lessonId="templates" />
      <LessonNav lessons={lessons} currentId="templates" basePath="/learn/django" />
    </div>
  );
}
