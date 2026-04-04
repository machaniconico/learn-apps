import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("django");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Django レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モデル（ORM）</h1>
        <p className="text-gray-400">Djangoのモデル定義とマイグレーションの仕組みを学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">モデルの定義</h2>
        <p className="text-gray-400 mb-4">
          Djangoのモデルは<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">models.Model</code>を継承したクラスです。
          クラス変数でフィールドを定義し、マイグレーションによってデータベースのテーブルが作成されます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <p className="text-xs text-gray-500 mb-2">blog/models.py</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ['-published_at']  # 新しい順に並べる
        verbose_name = '記事'
        verbose_name_plural = '記事一覧'

    def __str__(self):
        return self.title`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">マイグレーション</h2>
        <p className="text-gray-400 mb-4">
          モデルを変更したら<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">makemigrations</code>でマイグレーションファイルを生成し、
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">migrate</code>でデータベースに反映します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# マイグレーションファイルを生成
python manage.py makemigrations blog

# 変更内容の確認（SQLを表示）
python manage.py sqlmigrate blog 0001

# データベースに反映
python manage.py migrate

# マイグレーションの状態確認
python manage.py showmigrations`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">主要なフィールドタイプ</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">文字列・テキスト</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">CharField</code> - 短い文字列（max_length必須）</li>
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">TextField</code> - 長いテキスト</li>
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">EmailField</code> - メールアドレス</li>
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">URLField</code> - URL</li>
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">SlugField</code> - URLフレンドリーな文字列</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">数値・日時・関連</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">IntegerField</code> - 整数</li>
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">DateTimeField</code> - 日時</li>
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">BooleanField</code> - 真偽値</li>
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">ForeignKey</code> - 一対多の関連</li>
              <li><code className="text-green-400 bg-gray-800 px-1 rounded">ManyToManyField</code> - 多対多の関連</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ORMのクエリパターンを練習する</h2>
        <p className="text-gray-400 mb-4">
          DjangoのORMクエリに相当するデータ操作パターンを実装してみましょう。
        </p>
        <PythonPlayground defaultCode={`from dataclasses import dataclass, field
from typing import ClassVar, Optional
from datetime import datetime

@dataclass
class Article:
    title: str
    content: str
    author_id: int
    is_published: bool = False
    id: int = 0
    created_at: str = field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d %H:%M"))

    _db: ClassVar[list] = []
    _next_id: ClassVar[int] = 1

    def save(self):
        if self.id == 0:
            self.id = Article._next_id
            Article._next_id += 1
            Article._db.append(self)
        return self

    @classmethod
    def objects_all(cls):
        # Meta: ordering = ['-created_at'] に相当
        return sorted(cls._db, key=lambda a: a.created_at, reverse=True)

    @classmethod
    def objects_filter(cls, **kwargs):
        result = cls._db
        for k, v in kwargs.items():
            if k.endswith("__contains"):
                field = k[:-10]
                result = [a for a in result if v in str(getattr(a, field, ""))]
            else:
                result = [a for a in result if getattr(a, k, None) == v]
        return result

    @classmethod
    def objects_get(cls, **kwargs):
        results = cls.objects_filter(**kwargs)
        if len(results) == 0:
            raise LookupError("DoesNotExist: 該当するレコードがありません")
        if len(results) > 1:
            raise LookupError("MultipleObjectsReturned: 複数のレコードが見つかりました")
        return results[0]

# データを作成
Article(title="Django入門", content="Djangoを学ぶ最初の記事...", author_id=1, is_published=True).save()
Article(title="ORMの使い方", content="SQLAlchemyとの違い...", author_id=1, is_published=True).save()
Article(title="下書き記事", content="まだ公開していません...", author_id=2, is_published=False).save()

# クエリの実行
print("=== Article.objects.all() ===")
for a in Article.objects_all():
    status = "公開" if a.is_published else "下書き"
    print(f"  [{a.id}] {a.title} ({status})")

print("\\n=== Article.objects.filter(is_published=True) ===")
published = Article.objects_filter(is_published=True)
print(f"  公開済み: {len(published)}件")

print("\\n=== Article.objects.filter(title__contains='入門') ===")
intro = Article.objects_filter(**{"title__contains": "入門"})
for a in intro:
    print(f"  {a.title}")

print("\\n=== Article.objects.get(id=1) ===")
try:
    a = Article.objects_get(id=1)
    print(f"  {a.title} (著者ID: {a.author_id})")
except LookupError as e:
    print(f"  エラー: {e}")`} />
      </section>

      <LessonCompleteButton categoryId="django" lessonId="models" />
      <LessonNav lessons={lessons} currentId="models" basePath="/learn/django" />
    </div>
  );
}
