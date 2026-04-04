import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("django");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Djangoでモデルの変更をデータベースに反映するコマンドの順番として正しいのはどれですか？",
    options: [
      "migrate → makemigrations",
      "makemigrations → migrate",
      "syncdb → migrate",
      "migrate → syncdb",
    ],
    answer: 1,
    explanation: "まず makemigrations でマイグレーションファイルを生成し、次に migrate でデータベースに変更を反映します。",
  },
  {
    question: "DjangoのORMでデータベースから全レコードを取得する書き方はどれですか？",
    options: [
      "Model.find_all()",
      "Model.select('*')",
      "Model.objects.all()",
      "Model.query.all()",
    ],
    answer: 2,
    explanation: "Djangoでは Model.objects.all() でクエリセットとして全レコードを取得します。objects はモデルマネージャーです。",
  },
  {
    question: "Djangoの管理画面でモデルを登録する正しい方法はどれですか？",
    options: [
      "admin.register(Model)",
      "admin.site.register(Model)",
      "site.admin.add(Model)",
      "django.admin.include(Model)",
    ],
    answer: 1,
    explanation: "admin.site.register(Model) を admin.py に記述することで、そのモデルをDjango管理画面から操作できるようになります。",
  },
  {
    question: "Djangoテンプレートでfor文を書く正しい構文はどれですか？",
    options: [
      "{{ for item in items }}...{{ endfor }}",
      "{% for item in items %}...{% endfor %}",
      "{for item in items}...{/for}",
      "<!-- for item in items -->...<!-- /for -->",
    ],
    answer: 1,
    explanation: "Djangoテンプレートでは {% %} タグで制御構文を書きます。{% for %} と {% endfor %} でループ処理を記述します。",
  },
];

export default function DjangoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">Django入門</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Python製フルスタックWebフレームワーク「Django」を学びましょう。
          「バッテリー同梱」の思想のもと、ORM・管理画面・認証・フォームなど
          Webアプリに必要な機能がすべて揃っています。本格的なWebアプリ開発を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="django" totalLessons={8} color="green" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/django" color="green" categoryId="django" />
      </section>

      {/* What is Django? */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Djangoとは？</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-gray-900 border border-green-500/20">
            <div className="text-2xl mb-2">🔋</div>
            <h3 className="text-green-400 font-bold mb-1">バッテリー同梱</h3>
            <p className="text-gray-400 text-sm">認証・管理画面・ORM・フォームなど、Webアプリに必要な機能がすべて標準搭載されています。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-green-500/20">
            <div className="text-2xl mb-2">🛡️</div>
            <h3 className="text-green-400 font-bold mb-1">セキュリティ重視</h3>
            <p className="text-gray-400 text-sm">CSRF・XSS・SQLインジェクション対策がデフォルトで組み込まれており、安全なアプリを作れます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-green-500/20">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-green-400 font-bold mb-1">強力な管理画面</h3>
            <p className="text-gray-400 text-sm">モデルを登録するだけで自動生成される管理画面でデータの確認・編集が即座に行えます。</p>
          </div>
        </div>
      </section>

      {/* Code example 1: ORM pattern with classes */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">DjangoのORMパターンを理解する</h2>
        <p className="text-gray-400 mb-4">
          Djangoのモデルはクラスとして定義し、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">objects</code>マネージャーでクエリを実行します。
          クラスベースのデータ管理パターンを確認しましょう。
        </p>
        <PythonPlayground defaultCode={`# DjangoのORMパターンをシミュレート
from dataclasses import dataclass, field
from typing import ClassVar, Optional
from datetime import datetime

@dataclass
class Article:
    """Django Modelに相当するクラス"""
    title: str
    content: str
    author: str
    published: bool = False
    created_at: str = field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))

    # クラス変数としてデータベース相当のストレージ
    _db: ClassVar[list] = []
    _next_id: ClassVar[int] = 1

    def save(self):
        """Model.save() に相当"""
        self._db.append({"id": Article._next_id, **self.__dict__})
        Article._next_id += 1
        return self

    @classmethod
    def objects_all(cls):
        """Article.objects.all() に相当"""
        return cls._db.copy()

    @classmethod
    def objects_filter(cls, **kwargs):
        """Article.objects.filter() に相当"""
        results = cls._db
        for key, value in kwargs.items():
            results = [r for r in results if r.get(key) == value]
        return results

# レコードを作成・保存
Article(title="Flask入門", content="Flaskの基本...", author="田中").save()
Article(title="Django入門", content="Djangoの基本...", author="鈴木", published=True).save()
Article(title="FastAPI入門", content="FastAPIの基本...", author="佐藤", published=True).save()

# クエリの実行
all_articles = Article.objects_all()
print(f"全記事数: {len(all_articles)}")

published = Article.objects_filter(published=True)
print(f"公開済み: {len(published)}件")
for a in published:
    print(f"  - {a['title']} (著者: {a['author']})")`} />
      </section>

      {/* Code example 2: MVT pattern */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MVTアーキテクチャのパターン</h2>
        <p className="text-gray-400 mb-4">
          DjangoはModel・View・Templateの3層構造（MVT）でアプリを構成します。
          各レイヤーの役割を理解しましょう。
        </p>
        <PythonPlayground defaultCode={`# Django MVTパターンのシミュレーション

# ── Model層：データとビジネスロジック ──
class Product:
    _store = [
        {"id": 1, "name": "Pythonハンドブック", "price": 3200, "stock": 15},
        {"id": 2, "name": "Webアプリ入門", "price": 2800, "stock": 3},
        {"id": 3, "name": "データ分析実践", "price": 4500, "stock": 0},
    ]

    @classmethod
    def get_available(cls):
        return [p for p in cls._store if p["stock"] > 0]

    @classmethod
    def get_by_id(cls, pk):
        return next((p for p in cls._store if p["id"] == pk), None)

# ── View層：リクエストを受け取りレスポンスを返す ──
def product_list_view(request=None):
    """ListView に相当"""
    products = Product.get_available()
    context = {"products": products, "count": len(products)}
    return render_template("product_list.html", context)

def product_detail_view(request=None, pk=1):
    """DetailView に相当"""
    product = Product.get_by_id(pk)
    if product is None:
        return "404 Not Found"
    return render_template("product_detail.html", {"product": product})

# ── Template層：HTMLの生成 ──
def render_template(template_name, context):
    """Djangoのrender()の簡易版"""
    if template_name == "product_list.html":
        lines = [f"商品一覧 ({context['count']}件)"]
        for p in context["products"]:
            lines.append(f"  - {p['name']}: {p['price']:,}円 (在庫: {p['stock']})")
        return "\\n".join(lines)
    elif template_name == "product_detail.html":
        p = context["product"]
        return f"商品詳細\\n  名前: {p['name']}\\n  価格: {p['price']:,}円"
    return ""

print(product_list_view())
print()
print(product_detail_view(pk=1))`} />
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="green" />
      </section>
    </div>
  );
}
