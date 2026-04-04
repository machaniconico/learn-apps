import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function AsyncAwaitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">非同期処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">awaitキーワード</h1>
        <p className="text-gray-400">awaitを使って非同期関数の完了を待つ方法を学ぶ</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">awaitの役割</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 text-violet-300 px-1 rounded">await</code>は
          <strong className="text-white">awaitableオブジェクト</strong>の完了を待つキーワードです。
          await に達するとコルーチンは一時停止し、イベントループに制御を返します。
          他の処理が実行できる状態になったら再開されます。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <h3 className="text-violet-400 font-semibold mb-3">awaitable なオブジェクト</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-violet-400 font-mono">コルーチン</span>
              <span className="text-gray-500 mx-2">—</span>
              <span><code className="bg-gray-900 px-1 rounded">async def</code> で定義した関数の呼び出し結果</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-400 font-mono">Task</span>
              <span className="text-gray-500 mx-2">—</span>
              <span><code className="bg-gray-900 px-1 rounded">asyncio.create_task()</code> で生成したタスク</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-400 font-mono">Future</span>
              <span className="text-gray-500 mx-2">—</span>
              <span>低レベルの非同期操作の結果を表すオブジェクト</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">awaitの使い方</h2>
        <div className="space-y-4 mb-6">
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
            <h3 className="text-violet-400 font-semibold mb-3">基本パターン</h3>
            <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`import asyncio

async def fetch_data(url: str) -> str:
    # ネットワーク通信を待つ（シミュレート）
    await asyncio.sleep(1)
    return f"{url} のデータ"

async def main():
    # await で完了を待つ
    result = await fetch_data("https://example.com")
    print(result)

asyncio.run(main())`}</pre>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
            <h3 className="text-violet-400 font-semibold mb-3">await を連鎖させる</h3>
            <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`async def step1() -> int:
    await asyncio.sleep(0.5)
    return 10

async def step2(value: int) -> int:
    await asyncio.sleep(0.5)
    return value * 2

async def main():
    a = await step1()        # step1の完了を待つ
    b = await step2(a)       # step2の完了を待つ
    print(f"最終結果: {b}")  # 20

asyncio.run(main())`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">await は async def の中でのみ使用可能</h2>
        <p className="text-gray-300 mb-4">
          await は必ず <code className="bg-gray-800 text-violet-300 px-1 rounded">async def</code> で
          定義されたコルーチン関数の内部でのみ使えます。
          通常の関数の中で使うと SyntaxError になります。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h3 className="text-red-400 font-semibold mb-2 text-sm">誤り</h3>
            <pre className="text-gray-300 text-xs font-mono">{`def wrong():
    # SyntaxError!
    result = await something()`}</pre>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h3 className="text-green-400 font-semibold mb-2 text-sm">正しい</h3>
            <pre className="text-gray-300 text-xs font-mono">{`async def correct():
    # OK
    result = await something()`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">コルーチンの戻り値とawait</h2>
        <PythonPlayground
          defaultCode={`# await の動作をコルーチンオブジェクトで確認
import types

async def double(n: int) -> int:
    return n * 2

async def pipeline(start: int) -> str:
    # コルーチンを await で順番に処理
    a = double(start)         # コルーチンオブジェクト
    b = double(start + 1)     # コルーチンオブジェクト

    # 手動で実行（通常は await を使う）
    def run(coro):
        try:
            coro.send(None)
        except StopIteration as e:
            return e.value

    result_a = run(a)
    result_b = run(b)
    return f"double({start})={result_a}, double({start+1})={result_b}"

# pipeline コルーチンを実行
coro = pipeline(5)
try:
    coro.send(None)
except StopIteration as e:
    print(e.value)

# awaitパターンの確認（コードリファレンス）
print()
print("=== 実際のawaitパターン（コード参照） ===")
print("async def main():")
print("    result = await double(10)  # 20 が返る")
print("    print(result)")
print("asyncio.run(main())")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="async" lessonId="await" />
      </div>
      <LessonNav lessons={lessons} currentId="await" basePath="/learn/async" />
    </div>
  );
}
