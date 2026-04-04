import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fastapi");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">FastAPI レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非同期エンドポイント</h1>
        <p className="text-gray-400">async defを使ったコルーチンベースのAPIエンドポイントの書き方を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">非同期処理の必要性</h2>
        <p className="text-gray-400 mb-4">
          WebアプリはデータベースやAPIなどI/O処理で多くの時間を使います。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">async def</code>を使うと、
          I/O待機中に他のリクエストを処理できるため、スループットが大幅に向上します。
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-gray-400 mb-2">同期処理（def）</p>
            <pre className="text-xs font-mono text-gray-300 whitespace-pre">{`@app.get("/sync")
def sync_endpoint():
    # DBに問い合わせ（ブロッキング）
    time.sleep(0.1)  # 他リクエストが待機
    return {"data": "result"}

# 100リクエスト → 約10秒かかる`}</pre>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <p className="text-sm font-semibold text-teal-400 mb-2">非同期処理（async def）</p>
            <pre className="text-xs font-mono text-gray-300 whitespace-pre">{`@app.get("/async")
async def async_endpoint():
    # I/O待機中に他リクエストを処理
    await asyncio.sleep(0.1)
    return {"data": "result"}

# 100リクエスト → 約0.1秒で処理`}</pre>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">async/awaitの書き方</h2>
        <p className="text-gray-400 mb-4">
          非同期関数は<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">async def</code>で定義し、
          他の非同期関数の呼び出しには<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">await</code>を付けます。
          FastAPIはどちらのスタイルも混在させることができます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import FastAPI
import asyncio
import httpx  # 非同期HTTPクライアント

app = FastAPI()

async def fetch_external_api(url: str) -> dict:
    """外部APIを非同期で呼び出す"""
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()

@app.get("/weather/{city}")
async def get_weather(city: str):
    # 外部APIを並列で呼び出す
    current, forecast = await asyncio.gather(
        fetch_external_api(f"https://api.weather.com/current/{city}"),
        fetch_external_api(f"https://api.weather.com/forecast/{city}"),
    )
    return {"current": current, "forecast": forecast}`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">依存性注入（Dependency Injection）</h2>
        <p className="text-gray-400 mb-4">
          FastAPIの<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Depends()</code>で依存性を注入できます。
          DB接続・認証チェック・共通バリデーションなどを再利用可能な形で定義できます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from fastapi import Depends, HTTPException, status

async def get_db():
    """DB接続を提供する依存関数"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db = Depends(get_db),
):
    """トークンからユーザーを取得する依存関数"""
    user = verify_token(token, db)
    if not user:
        raise HTTPException(status_code=401)
    return user

# エンドポイントで依存関係を宣言
@app.get("/profile")
async def get_profile(user = Depends(get_current_user)):
    return {"username": user.username, "email": user.email}`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">非同期処理の並列実行を確認する</h2>
        <p className="text-gray-400 mb-4">
          asyncioを使った複数の非同期タスクの並列実行と処理時間を確認してみましょう。
        </p>
        <PythonPlayground defaultCode={`import asyncio
import time

async def simulate_db_query(name: str, delay: float) -> dict:
    """データベースクエリのシミュレーション"""
    await asyncio.sleep(delay)
    return {"source": name, "data": f"{name}からのデータ"}

async def simulate_api_call(name: str, delay: float) -> dict:
    """外部API呼び出しのシミュレーション"""
    await asyncio.sleep(delay)
    return {"api": name, "status": "success"}

# パターン1：順次実行（遅い）
async def sequential():
    start = time.time()
    users = await simulate_db_query("usersテーブル", 0.1)
    posts = await simulate_db_query("postsテーブル", 0.1)
    weather = await simulate_api_call("天気API", 0.1)
    elapsed = time.time() - start
    return elapsed, [users, posts, weather]

# パターン2：並列実行（速い）
async def concurrent():
    start = time.time()
    results = await asyncio.gather(
        simulate_db_query("usersテーブル", 0.1),
        simulate_db_query("postsテーブル", 0.1),
        simulate_api_call("天気API", 0.1),
    )
    elapsed = time.time() - start
    return elapsed, results

async def main():
    print("=== 順次実行 ===")
    elapsed, results = await sequential()
    print(f"処理時間: {elapsed:.3f}秒")
    for r in results:
        print(f"  取得: {list(r.values())[0]}")

    print("\n=== 並列実行（asyncio.gather）===")
    elapsed, results = await concurrent()
    print(f"処理時間: {elapsed:.3f}秒")
    for r in results:
        print(f"  取得: {list(r.values())[0]}")
    print(f"\n速度向上: 約{3/max(elapsed,0.001):.1f}倍高速")

asyncio.run(main())`} />
      </section>

      <LessonCompleteButton categoryId="fastapi" lessonId="async-endpoints" />
      <LessonNav lessons={lessons} currentId="async-endpoints" basePath="/learn/fastapi" />
    </div>
  );
}
