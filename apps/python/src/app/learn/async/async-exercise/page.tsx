import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function AsyncExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">非同期処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非同期処理演習</h1>
        <p className="text-gray-400">非同期処理を使った並行プログラミングの実践問題</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">これまでの復習</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { term: "async def", desc: "コルーチン関数の定義。呼び出すとコルーチンオブジェクトが返る" },
            { term: "await", desc: "awaitableオブジェクトの完了を待つ。async def内でのみ使用可能" },
            { term: "asyncio.run()", desc: "イベントループを作成してコルーチンを実行するエントリーポイント" },
            { term: "asyncio.gather()", desc: "複数のコルーチンを並行実行し、全結果をリストで返す" },
            { term: "asyncio.create_task()", desc: "コルーチンをタスクとしてスケジュールし、並行実行を開始する" },
            { term: "aiohttp", desc: "非同期HTTPクライアント。複数リクエストを並行送信できる" },
          ].map((item) => (
            <div key={item.term} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <code className="text-violet-400 font-mono text-sm font-semibold">{item.term}</code>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習1: コルーチンの基本を確認しよう</h2>
        <p className="text-gray-300 mb-4">
          以下のコードを完成させて、複数の処理結果を集めてみましょう。
          コルーチンを手動実行するパターンを使って、async/awaitの仕組みを確認します。
        </p>
        <PythonPlayground
          defaultCode={`# 演習1: コルーチンを手動で実行して結果を集める

async def square(n: int) -> int:
    """nの2乗を返すコルーチン"""
    return n * n

async def cube(n: int) -> int:
    """nの3乗を返すコルーチン"""
    return n * n * n

def run_coro(coro):
    """コルーチンを手動実行するヘルパー"""
    try:
        coro.send(None)
    except StopIteration as e:
        return e.value

# 1から5までの2乗と3乗を計算
numbers = list(range(1, 6))
results = []

for n in numbers:
    sq = run_coro(square(n))
    cb = run_coro(cube(n))
    results.append((n, sq, cb))

print(f"{'n':>3} | {'n²':>6} | {'n³':>8}")
print("-" * 22)
for n, sq, cb in results:
    print(f"{n:>3} | {sq:>6} | {cb:>8}")
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習2: 非同期パイプラインのシミュレーション</h2>
        <p className="text-gray-300 mb-4">
          データ処理パイプライン（取得 → 変換 → 保存）を非同期パターンでシミュレートします。
          各ステップが独立していて並行実行できる構造を理解しましょう。
        </p>
        <PythonPlayground
          defaultCode={`import time

# 非同期パイプラインのシミュレーション
class AsyncPipeline:
    """非同期処理パイプラインのシミュレーター"""

    def __init__(self):
        self.log = []

    def _step(self, name: str, data, delay: float = 0):
        """処理ステップ（実際の非同期では await asyncio.sleep(delay)）"""
        time.sleep(delay * 0.05)  # デモ用の短い遅延
        entry = f"[{name}] {data}"
        self.log.append(entry)
        return data

    def fetch(self, user_id: int) -> dict:
        data = {"id": user_id, "name": f"User_{user_id}", "score": user_id * 10}
        return self._step("FETCH", data, 1.0)

    def transform(self, user: dict) -> dict:
        user["level"] = "Gold" if user["score"] >= 50 else "Silver"
        user["name"] = user["name"].upper()
        return self._step("TRANSFORM", user, 0.3)

    def save(self, user: dict) -> str:
        result = f"保存完了: {user['name']} (Level: {user['level']})"
        return self._step("SAVE", result, 0.5)

# パイプライン実行
pipeline = AsyncPipeline()
user_ids = [1, 3, 5, 7]

print("=== ユーザー処理パイプライン ===")
start = time.time()

for uid in user_ids:
    raw = pipeline.fetch(uid)
    transformed = pipeline.transform(raw)
    result = pipeline.save(transformed)
    print(result)

elapsed = time.time() - start
print(f"\\n処理時間: {elapsed:.2f}秒")
print("※ asyncio.gather() を使えば並行実行で高速化できます")
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">演習3: 実際のasyncioコードを読む</h2>
        <p className="text-gray-300 mb-4">
          以下は実際の環境で動くasyncioコードです。パターンを読んで理解を深めましょう。
        </p>
        <PythonPlayground
          defaultCode={`# 実際のasyncioコードパターンの参照
# ※ このコードは通常のPython環境（asyncioが完全対応した環境）で動作します

code_patterns = """
import asyncio
import aiohttp

# === パターン1: 基本的なasync/await ===
async def fetch_user(session, user_id: int) -> dict:
    url = f"https://api.example.com/users/{user_id}"
    async with session.get(url) as resp:
        return await resp.json()

# === パターン2: gather による並行実行 ===
async def fetch_all_users(user_ids: list[int]) -> list[dict]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_user(session, uid) for uid in user_ids]
        return await asyncio.gather(*tasks)

# === パターン3: タイムアウト付き実行 ===
async def fetch_with_timeout(url: str, timeout: float) -> str:
    try:
        async with asyncio.timeout(timeout):
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as resp:
                    return await resp.text()
    except asyncio.TimeoutError:
        return "タイムアウト"

# === エントリーポイント ===
async def main():
    users = await fetch_all_users([1, 2, 3, 4, 5])
    for user in users:
        print(f"- {user['name']}")

asyncio.run(main())
"""

print("=== asyncioの主要パターン ===")
for line in code_patterns.strip().split("\\n"):
    print(line)
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="async" lessonId="async-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="async-exercise" basePath="/learn/async" />
    </div>
  );
}
