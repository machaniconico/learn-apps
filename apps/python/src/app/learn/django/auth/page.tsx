import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("django");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Django レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">認証システム</h1>
        <p className="text-gray-400">Djangoの組み込み認証システムでログイン・ログアウト・権限管理を実装する方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Djangoの組み込み認証</h2>
        <p className="text-gray-400 mb-4">
          Djangoには<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">django.contrib.auth</code>として強力な認証システムが内蔵されています。
          ユーザーモデル・ログイン・ログアウト・パスワード管理がすぐに使えます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# mysite/urls.py - 認証URLをまとめて追加
from django.contrib.auth import views as auth_views
from django.urls import path, include

urlpatterns = [
    # Djangoの組み込み認証ビュー（login・logout・password_change など）
    path('accounts/', include('django.contrib.auth.urls')),
    # → /accounts/login/ /accounts/logout/ などが自動で追加される
]

# blog/views.py
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

@login_required  # ログインしていない場合は /accounts/login/ にリダイレクト
def my_profile(request):
    return render(request, 'profile.html', {'user': request.user})

def my_login(request):
    if request.method == 'POST':
        user = authenticate(
            username=request.POST['username'],
            password=request.POST['password'],
        )
        if user:
            login(request, user)  # セッションにユーザーを記録
            return redirect('home')
        return render(request, 'login.html', {'error': '認証失敗'})
    return render(request, 'login.html')`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">カスタムユーザーモデル</h2>
        <p className="text-gray-400 mb-4">
          Djangoのデフォルトユーザーモデルに独自のフィールドを追加する場合は、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">AbstractUser</code>を継承してカスタムユーザーを定義します。
          プロジェクト開始時に設定することを強く推奨します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    birth_date = models.DateField(null=True, blank=True)
    twitter = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.username

# settings.py - カスタムユーザーモデルを指定
AUTH_USER_MODEL = 'accounts.CustomUser'`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">パーミッションとグループ</h2>
        <p className="text-gray-400 mb-4">
          Djangoの認証システムにはパーミッション（権限）とグループ管理が内蔵されています。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">@permission_required</code>デコレータで特定の権限を持つユーザーのみアクセスを許可できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from django.contrib.auth.decorators import permission_required
from django.contrib.auth.mixins import PermissionRequiredMixin

# 関数ビュー
@permission_required('blog.add_article', raise_exception=True)
def article_create(request):
    ...

# クラスベースビュー
class ArticleDeleteView(PermissionRequiredMixin, DeleteView):
    permission_required = 'blog.delete_article'
    model = Article
    success_url = reverse_lazy('article_list')

# テンプレートでのパーミッション確認
# {% if user.has_perm('blog.add_article') %}
#   <a href="{% url 'article_create' %}">記事を書く</a>
# {% endif %}`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">認証システムをシミュレートする</h2>
        <p className="text-gray-400 mb-4">
          Djangoの認証フローをPythonで再現してみましょう。
        </p>
        <PythonPlayground defaultCode={`import hashlib
import secrets
from dataclasses import dataclass, field
from typing import ClassVar, Optional, set

@dataclass
class User:
    username: str
    _password_hash: str
    is_active: bool = True
    is_staff: bool = False
    is_superuser: bool = False
    permissions: set = field(default_factory=set)
    groups: set = field(default_factory=set)

    def has_perm(self, perm):
        if not self.is_active:
            return False
        if self.is_superuser:
            return True
        return perm in self.permissions

    def has_module_perms(self, app_label):
        return self.is_active and (self.is_superuser or
               any(p.startswith(app_label + ".") for p in self.permissions))

class AuthSystem:
    _users: ClassVar[dict] = {}  # username -> User
    _sessions: ClassVar[dict] = {}  # session_id -> username

    @classmethod
    def _hash_password(cls, password):
        salt = "fixed_salt"  # 実際はランダム
        return hashlib.sha256(f"{salt}{password}".encode()).hexdigest()

    @classmethod
    def create_user(cls, username, password, **kwargs):
        if username in cls._users:
            raise ValueError(f"ユーザー '{username}' は既に存在します")
        user = User(username=username, _password_hash=cls._hash_password(password), **kwargs)
        cls._users[username] = user
        return user

    @classmethod
    def authenticate(cls, username, password):
        user = cls._users.get(username)
        if user and user._password_hash == cls._hash_password(password):
            return user
        return None

    @classmethod
    def login(cls, user):
        session_id = secrets.token_hex(16)
        cls._sessions[session_id] = user.username
        return session_id

    @classmethod
    def get_user(cls, session_id):
        username = cls._sessions.get(session_id)
        return cls._users.get(username) if username else None

    @classmethod
    def logout(cls, session_id):
        cls._sessions.pop(session_id, None)

def login_required(session_id):
    user = AuthSystem.get_user(session_id)
    return user if user and user.is_active else None

# テスト
print("=== ユーザー作成 ===")
admin = AuthSystem.create_user("admin", "admin123", is_superuser=True)
editor = AuthSystem.create_user("editor", "pass456",
                                 permissions={"blog.add_article", "blog.change_article"})
print(f"ユーザー作成: admin, editor")

print("\n=== 認証テスト ===")
user = AuthSystem.authenticate("editor", "pass456")
print(f"認証成功: {user.username}" if user else "認証失敗")

user = AuthSystem.authenticate("editor", "wrongpass")
print(f"認証成功: {user}" if user else "認証失敗（期待通り）")

print("\n=== セッション管理 ===")
session = AuthSystem.login(editor)
print(f"ログイン成功、セッション: {session[:20]}...")

current = login_required(session)
print(f"セッションからユーザー取得: {current.username}")

print("\n=== パーミッション確認 ===")
for perm in ["blog.add_article", "blog.delete_article", "blog.view_article"]:
    has = editor.has_perm(perm)
    adm = admin.has_perm(perm)
    print(f"  {perm}: editor={has}, admin={adm}")

print("\n=== ログアウト ===")
AuthSystem.logout(session)
print(f"ログアウト後: {login_required(session)}")`} />
      </section>

      <LessonCompleteButton categoryId="django" lessonId="auth" />
      <LessonNav lessons={lessons} currentId="auth" basePath="/learn/django" />
    </div>
  );
}
