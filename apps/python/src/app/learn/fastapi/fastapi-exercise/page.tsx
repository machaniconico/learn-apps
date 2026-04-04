import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fastapi");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">FastAPI レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">FastAPI演習</h1>
        <p className="text-gray-400">FastAPIでCRUD APIを設計・実装する実践問題に挑戦します。</p>
      </div>

      {/* Challenge 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">課題1：書籍管理APIの設計</h2>
        <p className="text-gray-400 mb-4">
          FastAPIを使った書籍管理APIを設計してください。Pydanticモデル・エンドポイント・バリデーションをすべて含めた完全なAPIを考えましょう。
        </p>
        <div className="bg-gray-900 rounded-xl border border-teal-500/20 p-5 mb-4">
          <p className="text-teal-400 font-semibold text-sm mb-3">要件</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <strong className="text-white">Pydanticモデル</strong>: BookCreate（入力）、BookResponse（出力）、BookUpdate（更新）を定義</li>
            <li>• <code className="text-teal-400 bg-gray-800 px-1 rounded">GET /books</code> - 全書籍取得（skip/limit/genre フィルター対応）</li>
            <li>• <code className="text-teal-400 bg-gray-800 px-1 rounded">POST /books</code> - 書籍作成（タイトル・著者・価格・ジャンル）</li>
            <li>• <code className="text-teal-400 bg-gray-800 px-1 rounded">GET /books/{"{id}"}</code> - 書籍詳細（存在しない場合404）</li>
            <li>• <code className="text-teal-400 bg-gray-800 px-1 rounded">PUT /books/{"{id}"}</code> - 書籍更新（部分更新対応）</li>
            <li>• <code className="text-teal-400 bg-gray-800 px-1 rounded">DELETE /books/{"{id}"}</code> - 書籍削除</li>
          </ul>
        </div>
      </section>

      {/* Challenge 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">課題2：認証付きAPIの設計</h2>
        <p className="text-gray-400 mb-4">
          JWTトークンを使った認証機能を追加する設計を考えてください。
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">認証フロー</p>
            <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
              <li>POST /auth/register でユーザー登録</li>
              <li>POST /auth/login でJWTトークン取得</li>
              <li>Authorizationヘッダーにトークンを付与</li>
              <li>保護されたエンドポイントにアクセス</li>
            </ol>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-300 mb-2">使用ライブラリ</p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• <code className="text-teal-400 bg-gray-800 px-1 rounded">python-jose</code> - JWT生成・検証</li>
              <li>• <code className="text-teal-400 bg-gray-800 px-1 rounded">passlib</code> - パスワードハッシュ化</li>
              <li>• <code className="text-teal-400 bg-gray-800 px-1 rounded">fastapi.security</code> - OAuth2スキーム</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">書籍管理APIをPythonで実装してみよう</h2>
        <p className="text-gray-400 mb-4">
          課題1の書籍管理APIを実際に実装してテストしてみましょう。
        </p>
        <PythonPlayground defaultCode={`import json
from dataclasses import dataclass, field
from typing import Optional, ClassVar

@dataclass
class Book:
    title: str
    author: str
    price: int
    genre: str
    id: int = 0
    available: bool = True

class BookRepository:
    _books: ClassVar[list] = []
    _next_id: ClassVar[int] = 1

    @classmethod
    def create(cls, title, author, price, genre):
        if price < 0:
            raise ValueError("価格は0以上にしてください")
        b = Book(title=title, author=author, price=price, genre=genre, id=cls._next_id)
        cls._books.append(b)
        cls._next_id += 1
        return b

    @classmethod
    def get_all(cls, genre=None, skip=0, limit=10):
        result = cls._books
        if genre:
            result = [b for b in result if b.genre == genre]
        return result[skip:skip+limit]

    @classmethod
    def get_by_id(cls, book_id):
        return next((b for b in cls._books if b.id == book_id), None)

    @classmethod
    def update(cls, book_id, **kwargs):
        b = cls.get_by_id(book_id)
        if not b:
            return None
        allowed = {"title", "author", "price", "genre", "available"}
        for k, v in kwargs.items():
            if k in allowed:
                if k == "price" and v < 0:
                    raise ValueError("価格は0以上にしてください")
                setattr(b, k, v)
        return b

    @classmethod
    def delete(cls, book_id):
        before = len(cls._books)
        cls._books = [b for b in cls._books if b.id != book_id]
        return len(cls._books) < before

def show(label, data):
    print(f"\n{label}")
    if isinstance(data, list):
        for item in data:
            print(f"  [{item.id}] {item.title} / {item.author} ¥{item.price} ({item.genre})")
    elif data:
        print(f"  [{data.id}] {data.title} / {data.author} ¥{data.price}")
    else:
        print("  (None)")

# APIのテスト
print("=== POST /books（書籍作成）===")
BookRepository.create("FastAPI完全ガイド", "山田太郎", 3800, "tech")
BookRepository.create("Pythonデータ分析", "鈴木花子", 4200, "tech")
BookRepository.create("料理の基本", "佐藤次郎", 1800, "life")

print("=== GET /books（一覧）===")
show("全書籍", BookRepository.get_all())

show("techジャンルのみ", BookRepository.get_all(genre="tech"))

print("=== GET /books/1（詳細）===")
show("書籍ID=1", BookRepository.get_by_id(1))
print("  存在しないID=99:", BookRepository.get_by_id(99))

print("=== PUT /books/1（更新）===")
updated = BookRepository.update(1, price=3500, available=False)
show("更新後", updated)

print("=== DELETE /books/3（削除）===")
result = BookRepository.delete(3)
print(f"  削除{'成功' if result else '失敗'}")
show("削除後の全書籍", BookRepository.get_all())`} />
      </section>

      <LessonCompleteButton categoryId="fastapi" lessonId="fastapi-exercise" />
      <LessonNav lessons={lessons} currentId="fastapi-exercise" basePath="/learn/fastapi" />
    </div>
  );
}
