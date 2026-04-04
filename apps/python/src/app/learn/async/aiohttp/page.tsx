import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function AsyncAiohttpPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">非同期処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">aiohttpによるHTTP通信</h1>
        <p className="text-gray-400">非同期HTTPクライアント・サーバーにaiohttpを使う</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">aiohttpとは</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">aiohttp</strong>はPythonの非同期HTTPクライアント/サーバーライブラリです。
          <code className="bg-gray-800 text-violet-300 px-1 rounded">requests</code>ライブラリの非同期版と考えると理解しやすいでしょう。
          asyncioと組み合わせることで、複数のHTTPリクエストを並行して送信し、処理時間を大幅に短縮できます。
        </p>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-amber-300 text-sm">
            <strong>注意:</strong> aiohttp は外部ライブラリのため、Pyodideのプレイグラウンドでは
            直接実行できません。このレッスンではコードパターンの学習と、
            urllib/urllib.request を使った同等のデモを行います。
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">aiohttp クライアントの基本パターン</h2>
        <div className="space-y-4 mb-6">
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
            <h3 className="text-violet-400 font-semibold mb-3">単一のGETリクエスト</h3>
            <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`import asyncio
import aiohttp

async def fetch(url: str) -> str:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            print(f"ステータス: {response.status}")
            return await response.text()

async def main():
    html = await fetch("https://example.com")
    print(html[:200])

asyncio.run(main())`}</pre>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
            <h3 className="text-violet-400 font-semibold mb-3">複数URLを並行取得</h3>
            <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`async def fetch_all(urls: list[str]) -> list[str]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_one(session, url) for url in urls]
        return await asyncio.gather(*tasks)

async def fetch_one(session, url: str) -> str:
    async with session.get(url) as resp:
        return await resp.text()

async def main():
    urls = [
        "https://api.example.com/users",
        "https://api.example.com/posts",
        "https://api.example.com/comments",
    ]
    # 3リクエストを並行送信 — 合計時間≈最遅リクエストの時間
    results = await fetch_all(urls)
    for r in results:
        print(len(r), "文字取得")`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">JSONデータの取得とPOSTリクエスト</h2>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <h3 className="text-violet-400 font-semibold mb-3">JSON取得とPOSTリクエスト</h3>
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`async def get_json(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.json()  # JSONを自動でパース

async def post_data(url: str, data: dict) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data) as resp:
            return await resp.json()

async def main():
    # JSONプレースホルダーAPIから取得
    user = await get_json("https://jsonplaceholder.typicode.com/users/1")
    print(f"ユーザー: {user['name']}")

    # 新しい投稿を作成
    new_post = await post_data(
        "https://jsonplaceholder.typicode.com/posts",
        {"title": "テスト", "body": "本文", "userId": 1}
    )
    print(f"作成ID: {new_post['id']}")`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">urllib を使った同期版デモ（実行可能）</h2>
        <PythonPlayground
          defaultCode={`# urllib を使った HTTP リクエストデモ（Pyodideで動作確認用）
import urllib.request
import json

def fetch_user(user_id: int) -> dict:
    """JSONPlaceholder APIからユーザーを取得"""
    url = f"https://jsonplaceholder.typicode.com/users/{user_id}"
    try:
        with urllib.request.urlopen(url, timeout=5) as response:
            data = json.loads(response.read().decode())
            return data
    except Exception as e:
        return {"error": str(e)}

def fetch_posts(user_id: int) -> list:
    """指定ユーザーの投稿を取得"""
    url = f"https://jsonplaceholder.typicode.com/posts?userId={user_id}"
    try:
        with urllib.request.urlopen(url, timeout=5) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        return []

# ユーザー情報を取得
user = fetch_user(1)
if "error" not in user:
    print(f"名前: {user.get('name')}")
    print(f"メール: {user.get('email')}")
    print(f"会社: {user.get('company', {}).get('name')}")

    posts = fetch_posts(1)
    print(f"\\n投稿数: {len(posts)}")
    if posts:
        print(f"最初の投稿タイトル: {posts[0]['title'][:40]}...")
else:
    print("ネットワークエラー（オフライン環境での実行）")
    print("aiohttp を使えば上記処理を非同期・並行実行できます")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="async" lessonId="aiohttp" />
      </div>
      <LessonNav lessons={lessons} currentId="aiohttp" basePath="/learn/async" />
    </div>
  );
}
