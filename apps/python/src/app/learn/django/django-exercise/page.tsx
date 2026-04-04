import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("django");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Django レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Django演習</h1>
        <p className="text-gray-400">DjangoでブログアプリなどのWebアプリを設計・構築する実践問題に挑戦します。</p>
      </div>

      {/* Challenge 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">課題1：ブログアプリの設計</h2>
        <p className="text-gray-400 mb-4">
          以下の要件を満たすブログアプリをDjangoで設計してください。
          モデル・ビュー・テンプレート・URLの構成を考えましょう。
        </p>
        <div className="bg-gray-900 rounded-xl border border-green-500/20 p-5 mb-4">
          <p className="text-green-400 font-semibold text-sm mb-3">要件</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2">モデル</p>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>• <strong>Article</strong>: title, content, author(FK), tags(M2M), published</li>
                <li>• <strong>Category</strong>: name, slug</li>
                <li>• <strong>Tag</strong>: name, slug</li>
                <li>• <strong>Comment</strong>: content, article(FK), author(FK), created_at</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2">ビュー・URL</p>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>• <code className="text-green-400 bg-gray-800 px-1 rounded">GET /</code> 記事一覧（ページネーション）</li>
                <li>• <code className="text-green-400 bg-gray-800 px-1 rounded">GET /article/&lt;slug&gt;/</code> 記事詳細</li>
                <li>• <code className="text-green-400 bg-gray-800 px-1 rounded">GET/POST /article/new/</code> 記事作成</li>
                <li>• <code className="text-green-400 bg-gray-800 px-1 rounded">GET /category/&lt;slug&gt;/</code> カテゴリ別一覧</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">課題2：ECサイト（商品管理）の構成</h2>
        <p className="text-gray-400 mb-4">
          シンプルなECサイトの商品管理機能を設計してください。
          Django Adminを活用した管理機能も含めることを意識しましょう。
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">モデル設計</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Product（商品）</li>
              <li>• Category（カテゴリ）</li>
              <li>• Order（注文）</li>
              <li>• OrderItem（注文明細）</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">Admin機能</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• 商品の一覧・フィルター</li>
              <li>• 注文のインライン表示</li>
              <li>• 一括在庫更新アクション</li>
              <li>• 売上合計のカスタム表示</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">ユーザー機能</p>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• ログイン・ログアウト</li>
              <li>• 商品一覧・詳細</li>
              <li>• カート機能（セッション）</li>
              <li>• 注文履歴</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ブログアプリのデータ層を実装する</h2>
        <p className="text-gray-400 mb-4">
          課題1のブログアプリのモデルとクエリをPythonで実装してみましょう。
        </p>
        <PythonPlayground defaultCode={`from dataclasses import dataclass, field
from typing import ClassVar, Optional
from datetime import datetime

# モデルの定義
@dataclass
class Category:
    name: str
    slug: str
    id: int = 0
    _db: ClassVar[list] = []
    _next_id: ClassVar[int] = 1

    def save(self):
        self.id = Category._next_id
        Category._next_id += 1
        Category._db.append(self)
        return self

@dataclass
class Tag:
    name: str
    slug: str
    id: int = 0
    _db: ClassVar[list] = []
    _next_id: ClassVar[int] = 1

    def save(self):
        self.id = Tag._next_id
        Tag._next_id += 1
        Tag._db.append(self)
        return self

@dataclass
class Article:
    title: str
    content: str
    author: str
    category: Optional[object] = None
    tags: list = field(default_factory=list)
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

    def get_absolute_url(self):
        return f"/blog/{self.id}/"

    @classmethod
    def get_published(cls):
        return [a for a in cls._db if a.is_published]

    @classmethod
    def get_by_category(cls, category_slug):
        return [a for a in cls._db
                if a.is_published and a.category and a.category.slug == category_slug]

    @classmethod
    def get_by_tag(cls, tag_slug):
        return [a for a in cls._db
                if a.is_published and any(t.slug == tag_slug for t in a.tags)]

# データの作成
cat_tech = Category("技術", "tech").save()
cat_life = Category("生活", "life").save()
tag_python = Tag("Python", "python").save()
tag_django = Tag("Django", "django").save()

Article("Django入門", "Djangoを学ぶ最初の記事", "田中",
       category=cat_tech, tags=[tag_python, tag_django], is_published=True).save()
Article("Pythonの基礎", "Python基礎知識のまとめ", "鈴木",
       category=cat_tech, tags=[tag_python], is_published=True).save()
Article("料理の記録", "今日作った料理について", "田中",
       category=cat_life, is_published=True).save()
Article("下書き記事", "まだ公開していない記事", "田中").save()

# クエリのテスト
print("=== 公開済み記事 ===")
for a in Article.get_published():
    tags = ", ".join(t.name for t in a.tags)
    print(f"  [{a.id}] {a.title} (カテゴリ: {a.category.name if a.category else 'なし'}, タグ: {tags or 'なし'})")
    print(f"        URL: {a.get_absolute_url()}")

print("\n=== techカテゴリの記事 ===")
for a in Article.get_by_category("tech"):
    print(f"  {a.title}")

print("\n=== django タグの記事 ===")
for a in Article.get_by_tag("django"):
    print(f"  {a.title}")`} />
      </section>

      <LessonCompleteButton categoryId="django" lessonId="django-exercise" />
      <LessonNav lessons={lessons} currentId="django-exercise" basePath="/learn/django" />
    </div>
  );
}
