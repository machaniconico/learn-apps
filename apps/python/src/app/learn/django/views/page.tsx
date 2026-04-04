import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("django");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Django レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビュー</h1>
        <p className="text-gray-400">関数ビューとクラスベースビューの書き方とURLの設定を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">関数ベースビュー（FBV）</h2>
        <p className="text-gray-400 mb-4">
          最もシンプルなビューの形式です。<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">request</code>を受け取り、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">HttpResponse</code>や<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">render()</code>を返します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <p className="text-xs text-gray-500 mb-2">blog/views.py</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import Article

def article_list(request):
    """記事一覧"""
    articles = Article.objects.filter(is_published=True).order_by('-published_at')
    return render(request, 'blog/article_list.html', {'articles': articles})

def article_detail(request, pk):
    """記事詳細（存在しなければ404）"""
    article = get_object_or_404(Article, pk=pk, is_published=True)
    return render(request, 'blog/article_detail.html', {'article': article})

def article_create(request):
    """記事作成"""
    if request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        Article.objects.create(title=title, content=content, author=request.user)
        return redirect('article_list')
    return render(request, 'blog/article_form.html')`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">クラスベースビュー（CBV）</h2>
        <p className="text-gray-400 mb-4">
          Djangoには<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">ListView</code>・<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">DetailView</code>・<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">CreateView</code>などの汎用ビューがあります。
          クラス変数を設定するだけで定型処理を自動化できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from django.views.generic import ListView, DetailView, CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy

class ArticleListView(ListView):
    model = Article
    template_name = 'blog/article_list.html'
    context_object_name = 'articles'
    paginate_by = 10

    def get_queryset(self):
        return Article.objects.filter(is_published=True)

class ArticleDetailView(DetailView):
    model = Article
    template_name = 'blog/article_detail.html'

class ArticleCreateView(LoginRequiredMixin, CreateView):
    model = Article
    fields = ['title', 'content']
    template_name = 'blog/article_form.html'
    success_url = reverse_lazy('article_list')

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">URLの設定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">urls.py</code>でURLパターンとビューを対応付けます。
          アプリのURLはプロジェクトのurls.pyで<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">include()</code>して読み込みます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <p className="text-xs text-gray-500 mb-2">blog/urls.py</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.ArticleListView.as_view(), name='article_list'),
    path('<int:pk>/', views.ArticleDetailView.as_view(), name='article_detail'),
    path('new/', views.ArticleCreateView.as_view(), name='article_create'),
]

# mysite/urls.py で include
# path('blog/', include('blog.urls')),`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビューの処理フローを確認する</h2>
        <p className="text-gray-400 mb-4">
          Djangoのリクエスト処理フローをPythonで再現してみましょう。
        </p>
        <PythonPlayground defaultCode={`from dataclasses import dataclass
from typing import Callable

@dataclass
class Request:
    method: str
    path: str
    user: str = "anonymous"
    data: dict = None

    def __post_init__(self):
        if self.data is None:
            self.data = {}

@dataclass
class Response:
    status_code: int
    content: str
    redirect_url: str = None

def render(template, context):
    """Django の render() に相当"""
    # テンプレートの変数を置換するシミュレーション
    result = f"[{template}]\n"
    for key, value in context.items():
        if isinstance(value, list):
            result += f"  {key}: {len(value)}件\n"
            for item in value[:3]:
                result += f"    - {item}\n"
        else:
            result += f"  {key}: {value}\n"
    return result

def redirect(url):
    """Django の redirect() に相当"""
    return Response(status_code=302, content="", redirect_url=url)

# データ（本来はDBから取得）
articles_db = [
    {"id": 1, "title": "Django入門", "published": True},
    {"id": 2, "title": "ORM活用法", "published": True},
    {"id": 3, "title": "下書き記事", "published": False},
]

# 関数ベースビュー
def article_list(request):
    articles = [a["title"] for a in articles_db if a["published"]]
    content = render("blog/article_list.html", {"articles": articles})
    return Response(status_code=200, content=content)

def article_detail(request, pk):
    article = next((a for a in articles_db if a["id"] == pk), None)
    if not article:
        return Response(status_code=404, content="記事が見つかりません")
    content = render("blog/article_detail.html", {"article": article["title"]})
    return Response(status_code=200, content=content)

def article_create(request):
    if request.method == "POST":
        new_article = {"id": len(articles_db)+1, "title": request.data.get("title"), "published": False}
        articles_db.append(new_article)
        return redirect("/blog/")
    content = render("blog/article_form.html", {})
    return Response(status_code=200, content=content)

# テスト
requests = [
    (article_list, Request("GET", "/blog/"), {}),
    (article_detail, Request("GET", "/blog/1/"), {"pk": 1}),
    (article_detail, Request("GET", "/blog/99/"), {"pk": 99}),
    (article_create, Request("POST", "/blog/new/", data={"title": "新記事"}), {}),
]

for view_func, req, kwargs in requests:
    resp = view_func(req, **kwargs)
    print(f"{req.method} {req.path} -> {resp.status_code}")
    if resp.redirect_url:
        print(f"  Redirect -> {resp.redirect_url}")
    elif resp.content:
        print(resp.content)
    print()`} />
      </section>

      <LessonCompleteButton categoryId="django" lessonId="views" />
      <LessonNav lessons={lessons} currentId="views" basePath="/learn/django" />
    </div>
  );
}
