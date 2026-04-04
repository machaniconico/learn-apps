import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("django");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Django レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">管理画面</h1>
        <p className="text-gray-400">Django Adminを使ったデータの管理・確認・カスタマイズ方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">管理画面の基本設定</h2>
        <p className="text-gray-400 mb-4">
          モデルを<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">admin.site.register()</code>で登録するだけで
          データのCRUD操作ができる管理画面が自動生成されます。
          スーパーユーザーを作成してから<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">/admin/</code>にアクセスします。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# スーパーユーザーを作成
python manage.py createsuperuser

# blog/admin.py
from django.contrib import admin
from .models import Article, Category, Tag

# シンプルな登録
admin.site.register(Category)

# デコレータを使った登録
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    # 一覧に表示するフィールド
    list_display = ['title', 'author', 'is_published', 'published_at']
    # フィルター
    list_filter = ['is_published', 'published_at', 'author']
    # 検索対象フィールド
    search_fields = ['title', 'content']`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">管理画面のカスタマイズ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">ModelAdmin</code>クラスを使って管理画面の表示・操作を細かくカスタマイズできます。
          一覧の絞り込み・並び替え・カスタム操作（アクション）などを設定できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'is_published', 'published_at', 'word_count']
    list_editable = ['is_published']    # 一覧から直接編集可能
    ordering = ['-published_at']
    date_hierarchy = 'published_at'     # 日付ナビゲーション

    # 編集画面のレイアウト
    fieldsets = (
        ('基本情報', {'fields': ('title', 'content')}),
        ('公開設定', {'fields': ('is_published', 'published_at'), 'classes': ('collapse',)}),
    )

    # カスタムカラム
    def word_count(self, obj):
        return len(obj.content.split())
    word_count.short_description = '文字数'

    # カスタムアクション
    @admin.action(description='選択した記事を公開する')
    def publish_articles(self, request, queryset):
        queryset.update(is_published=True)

    actions = ['publish_articles']`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">インライン管理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">InlineModelAdmin</code>を使うと、
          関連モデルを親モデルの編集画面内で一緒に編集できます。
          例えばユーザーのプロフィールや記事のコメントなどで便利です。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`class CommentInline(admin.TabularInline):  # または StackedInline
    model = Comment
    extra = 1          # 追加の空フォーム数
    readonly_fields = ['created_at']

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    inlines = [CommentInline]
    # → 記事の編集画面にコメントの一覧・追加フォームが表示される`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">管理画面の機能をシミュレートする</h2>
        <p className="text-gray-400 mb-4">
          Django Adminが提供するデータ管理機能をPythonで確認してみましょう。
        </p>
        <PythonPlayground defaultCode={`from dataclasses import dataclass, field
from typing import ClassVar, Optional
from datetime import datetime

@dataclass
class Article:
    title: str
    content: str
    author: str
    is_published: bool = False
    id: int = 0
    created_at: str = field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))

    _db: ClassVar[list] = []
    _next_id: ClassVar[int] = 1

    def save(self):
        if self.id == 0:
            self.id = Article._next_id
            Article._next_id += 1
            Article._db.append(self)
        return self

# Django Adminの機能を再現
class ArticleAdmin:
    """ModelAdmin の簡易版"""

    list_display = ["id", "title", "author", "is_published", "word_count"]
    list_filter = ["is_published", "author"]

    def word_count(self, obj):
        """カスタムカラム"""
        return len(obj.content.split())

    def changelist_view(self, filter_by=None, search=None):
        """一覧ビュー"""
        queryset = Article._db

        # フィルター適用
        if filter_by:
            queryset = [a for a in queryset if all(
                getattr(a, k, None) == v for k, v in filter_by.items()
            )]

        # 検索適用
        if search:
            queryset = [a for a in queryset if
                       search.lower() in a.title.lower() or
                       search.lower() in a.content.lower()]

        print(f"{'ID':<4} {'タイトル':<20} {'著者':<10} {'公開':<6} {'文字数'}")
        print("-" * 55)
        for obj in queryset:
            wc = self.word_count(obj)
            status = "✓" if obj.is_published else "✗"
            print(f"{obj.id:<4} {obj.title:<20} {obj.author:<10} {status:<6} {wc}文字")
        print(f"合計: {len(queryset)}件")

    def publish_action(self, queryset):
        """カスタムアクション：一括公開"""
        count = 0
        for obj in queryset:
            if not obj.is_published:
                obj.is_published = True
                count += 1
        return count

# データ作成
Article("Django入門", "Djangoを学ぶ最初の一歩です。モデル ビュー テンプレートの理解が重要です", "田中", True).save()
Article("ORM活用", "SQLAlchemyとの違いとDjangoのクエリの書き方を説明します", "鈴木").save()
Article("管理画面カスタマイズ", "Admin を使いこなすための高度な設定について", "田中").save()

admin = ArticleAdmin()

print("=== 全記事一覧 ===")
admin.changelist_view()

print("\n=== 田中の記事のみ ===")
admin.changelist_view(filter_by={"author": "田中"})

print("\n=== '入門' で検索 ===")
admin.changelist_view(search="入門")

print("\n=== 一括公開アクション ===")
unpublished = [a for a in Article._db if not a.is_published]
count = admin.publish_action(unpublished)
print(f"{count}件を公開しました")
admin.changelist_view()`} />
      </section>

      <LessonCompleteButton categoryId="django" lessonId="admin" />
      <LessonNav lessons={lessons} currentId="admin" basePath="/learn/django" />
    </div>
  );
}
