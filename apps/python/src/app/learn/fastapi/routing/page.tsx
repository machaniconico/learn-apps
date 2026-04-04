import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fastapi");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">FastAPI レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パスオペレーション</h1>
        <p className="text-gray-400">GET・POST・PUT・DELETEルートの定義方法とパラメータの受け取り方を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">HTTPメソッドの定義</h2>
        <p className="text-gray-400 mb-4">
          FastAPIでは各HTTPメソッドに対応したデコレータが用意されています。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">@app.get()</code>・
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">@app.post()</code>・
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">@app.put()</code>・
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">@app.delete()</code>を使います。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import FastAPI

app = FastAPI()

items = {}

@app.get("/items")        # 一覧取得
def list_items():
    return list(items.values())

@app.post("/items")       # 作成
def create_item(item: ItemCreate):
    items[item.id] = item
    return item

@app.put("/items/{id}")   # 更新
def update_item(id: int, item: ItemUpdate):
    items[id] = item
    return item

@app.delete("/items/{id}") # 削除
def delete_item(id: int):
    del items[id]
    return {"ok": True}`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">パスパラメータとクエリパラメータ</h2>
        <p className="text-gray-400 mb-4">
          <strong className="text-white">パスパラメータ</strong>はURLの一部として定義し、
          <strong className="text-white">クエリパラメータ</strong>は関数の引数として定義するだけで自動的に認識されます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import FastAPI, Query
from typing import Optional

app = FastAPI()

# パスパラメータ：{item_id} が int に自動変換
@app.get("/items/{item_id}")
def get_item(item_id: int):
    return {"item_id": item_id}

# クエリパラメータ：関数引数として定義
# GET /items?skip=0&limit=10&q=python
@app.get("/items")
def list_items(
    skip: int = 0,
    limit: int = 10,
    q: Optional[str] = None,
):
    return {"skip": skip, "limit": limit, "q": q}

# Queryクラスで詳細なバリデーション
@app.get("/search")
def search(
    q: str = Query(min_length=3, max_length=50, description="検索キーワード"),
):
    return {"results": f"'{q}' の検索結果"}`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">レスポンスモデルとステータスコード</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">response_model</code>でレスポンスの型を指定すると、
          余分なフィールドが自動的に除外されます。また<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">status_code</code>でHTTPステータスコードを指定できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import FastAPI, status
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str  # 内部処理用

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    # password は含まれない

@app.post(
    "/users",
    response_model=UserResponse,   # パスワードを除いたモデル
    status_code=status.HTTP_201_CREATED,
)
def create_user(user: UserCreate):
    # パスワードをハッシュ化してDBに保存...
    return {"id": 1, "username": user.username, "email": user.email}`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ルーティングパターンを確認する</h2>
        <p className="text-gray-400 mb-4">
          パスパラメータとクエリパラメータの処理をPythonで実装してみましょう。
        </p>
        <PythonPlayground defaultCode={`# FastAPIのルーティングシステムを簡易再現
from typing import Optional

class FastAPIRouter:
    def __init__(self):
        self.routes = {}

    def get(self, path):
        """GETメソッドのデコレータ"""
        def decorator(func):
            self.routes[("GET", path)] = func
            return func
        return decorator

    def post(self, path):
        """POSTメソッドのデコレータ"""
        def decorator(func):
            self.routes[("POST", path)] = func
            return func
        return decorator

    def dispatch(self, method, path):
        handler = self.routes.get((method, path))
        if handler:
            return {"status": 200, "body": handler()}
        return {"status": 404, "body": {"detail": "Not Found"}}

app = FastAPIRouter()

# 商品データ
products = [
    {"id": 1, "name": "Pythonの教科書", "price": 3200},
    {"id": 2, "name": "Flaskハンドブック", "price": 2800},
    {"id": 3, "name": "料理レシピ集", "price": 1500},
]

@app.get("/products")
def list_products():
    return products

@app.get("/health")
def health_check():
    return {"status": "ok"}

# テスト
test_cases = [
    ("GET", "/products"),
    ("GET", "/health"),
    ("GET", "/unknown"),
    ("POST", "/products"),
]

for method, path in test_cases:
    result = app.dispatch(method, path)
    print(f"{method} {path}")
    print(f"  -> {result}")
    print()`} />
      </section>

      <LessonCompleteButton categoryId="fastapi" lessonId="routing" />
      <LessonNav lessons={lessons} currentId="routing" basePath="/learn/fastapi" />
    </div>
  );
}
