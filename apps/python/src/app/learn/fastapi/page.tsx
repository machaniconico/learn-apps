import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fastapi");

const quizQuestions: QuizQuestion[] = [
  {
    question: "FastAPIで自動的に生成されるAPIドキュメントのURLはどれですか？",
    options: ["/api-docs", "/swagger", "/docs", "/openapi"],
    answer: 2,
    explanation: "/docs にアクセスするとSwagger UIが表示されます。/redoc でReDocも利用できます。どちらも自動生成されます。",
  },
  {
    question: "FastAPIでPOSTリクエストのボディを受け取るために使うクラスはどれですか？",
    options: ["dataclass", "TypedDict", "BaseModel (Pydantic)", "NamedTuple"],
    answer: 2,
    explanation: "PydanticのBaseModelを継承したクラスでリクエストボディのスキーマを定義します。自動でバリデーションとJSONのパースが行われます。",
  },
  {
    question: "FastAPIで非同期エンドポイントを定義する正しい方法はどれですか？",
    options: [
      "@app.get('/') def endpoint(): ...",
      "@app.get('/') async def endpoint(): ...",
      "@app.async_get('/') def endpoint(): ...",
      "async @app.get('/') def endpoint(): ...",
    ],
    answer: 1,
    explanation: "async def を使って非同期関数として定義します。通常の def でも動作しますが、I/O処理が多い場合は async def を使うことでパフォーマンスが向上します。",
  },
  {
    question: "FastAPIでパスパラメータを定義する正しい書き方はどれですか？",
    options: [
      "@app.get('/items/:id')",
      "@app.get('/items/{id}')",
      "@app.get('/items/<id>')",
      "@app.get('/items/[id]')",
    ],
    answer: 1,
    explanation: "FastAPIでは {パラメータ名} の形式でパスパラメータを定義します。関数の引数名と一致させることで自動的に値が渡されます。",
  },
];

export default function FastAPIPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">FastAPI入門</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          モダンで高速なPython製WebフレームワークFastAPIを学びましょう。
          型ヒントとPydanticによる自動バリデーション、非同期処理のサポート、
          自動ドキュメント生成など、本格的なREST API開発に必要なスキルを習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="fastapi" totalLessons={8} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/fastapi" color="teal" categoryId="fastapi" />
      </section>

      {/* What is FastAPI? */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">FastAPIとは？</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-gray-900 border border-teal-500/20">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-teal-400 font-bold mb-1">高速なパフォーマンス</h3>
            <p className="text-gray-400 text-sm">StarletteとPydanticをベースに、NodeJSやGoに匹敵する高いパフォーマンスを実現します。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-teal-500/20">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="text-teal-400 font-bold mb-1">自動ドキュメント</h3>
            <p className="text-gray-400 text-sm">コードを書くだけでSwagger UIとReDocの対話的なAPIドキュメントが自動生成されます。</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-900 border border-teal-500/20">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="text-teal-400 font-bold mb-1">型安全なバリデーション</h3>
            <p className="text-gray-400 text-sm">Pythonの型ヒントとPydanticで入出力データを自動バリデーション。バグを事前に防げます。</p>
          </div>
        </div>
      </section>

      {/* Code example 1: Type hints and validation */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Pydanticモデルによるデータ検証</h2>
        <p className="text-gray-400 mb-4">
          FastAPIではPydanticの<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">BaseModel</code>でリクエスト・レスポンスのデータ構造を定義します。
          型検証のパターンを確認してみましょう。
        </p>
        <PythonPlayground defaultCode={`# Pydanticスタイルのデータ検証をシミュレート
from dataclasses import dataclass
from typing import Optional

# FastAPIのBaseModelに相当するデータクラス
@dataclass
class UserCreate:
    name: str
    email: str
    age: int
    bio: Optional[str] = None

@dataclass
class UserResponse:
    id: int
    name: str
    email: str
    age: int

def validate_user(data: dict) -> UserCreate:
    """データのバリデーション"""
    if not isinstance(data.get("name"), str) or not data["name"]:
        raise ValueError("name は空でない文字列が必要です")
    if "@" not in data.get("email", ""):
        raise ValueError("有効なメールアドレスが必要です")
    if not isinstance(data.get("age"), int) or data["age"] < 0:
        raise ValueError("age は0以上の整数が必要です")
    return UserCreate(**{k: data[k] for k in ["name", "email", "age"] if k in data})

# 正常なデータ
try:
    user = validate_user({"name": "田中太郎", "email": "tanaka@example.com", "age": 25})
    print(f"バリデーション成功: {user.name}, {user.email}")
except ValueError as e:
    print(f"エラー: {e}")

# 不正なデータ
try:
    user = validate_user({"name": "山田", "email": "invalid-email", "age": -1})
except ValueError as e:
    print(f"バリデーションエラー: {e}")`} />
      </section>

      {/* Code example 2: Async patterns */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">非同期処理のパターン</h2>
        <p className="text-gray-400 mb-4">
          FastAPIは<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">async def</code>による非同期エンドポイントをネイティブにサポートします。
          asyncioを使ったパターンを学びましょう。
        </p>
        <PythonPlayground defaultCode={`import asyncio
import time

# 非同期関数のシミュレーション
async def fetch_user(user_id: int) -> dict:
    """データベースからユーザーを取得する（非同期）"""
    await asyncio.sleep(0)  # I/O待機のシミュレーション
    return {"id": user_id, "name": f"ユーザー{user_id}", "active": True}

async def fetch_orders(user_id: int) -> list:
    """注文履歴を取得する（非同期）"""
    await asyncio.sleep(0)
    return [
        {"order_id": 101, "item": "Pythonの教科書", "price": 3200},
        {"order_id": 102, "item": "Flask入門", "price": 2800},
    ]

async def get_user_dashboard(user_id: int):
    """ユーザーとその注文を並列取得（FastAPIのエンドポイント相当）"""
    # gather() で並列実行
    user, orders = await asyncio.gather(
        fetch_user(user_id),
        fetch_orders(user_id)
    )
    return {
        "user": user,
        "orders": orders,
        "total_orders": len(orders)
    }

# 実行
result = asyncio.run(get_user_dashboard(1))
print(f"ユーザー: {result['user']['name']}")
print(f"注文件数: {result['total_orders']}")
for order in result['orders']:
    print(f"  - {order['item']}: {order['price']}円")`} />
      </section>

      {/* Quiz */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">理解度チェック</h2>
        <Quiz questions={quizQuestions} color="teal" />
      </section>
    </div>
  );
}
