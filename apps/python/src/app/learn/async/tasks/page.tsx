import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function AsyncTasksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">非同期処理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">タスクと並行実行</h1>
        <p className="text-gray-400">asyncio.create_taskで複数のコルーチンを並行処理する</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">タスク（Task）とは</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">タスク（Task）</strong>はコルーチンをイベントループにスケジュールするためのラッパーです。
          <code className="bg-gray-800 text-violet-300 px-1 rounded">asyncio.create_task()</code>でコルーチンをタスクに変換すると、
          即座にイベントループに登録され、バックグラウンドで実行が始まります。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <h3 className="text-violet-400 font-semibold mb-3">タスクの作成と実行</h3>
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`import asyncio

async def work(name: str, seconds: float) -> str:
    await asyncio.sleep(seconds)
    return f"{name} 完了"

async def main():
    # タスクを作成（即座にスケジュール）
    task1 = asyncio.create_task(work("タスクA", 1.0))
    task2 = asyncio.create_task(work("タスクB", 0.5))
    task3 = asyncio.create_task(work("タスクC", 0.3))

    # 全タスクの完了を待つ（並行実行）
    r1 = await task1
    r2 = await task2
    r3 = await task3

    print(r1, r2, r3)

asyncio.run(main())`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">asyncio.gather() — 複数のコルーチンを一括実行</h2>
        <p className="text-gray-300 mb-4">
          <code className="bg-gray-800 text-violet-300 px-1 rounded">asyncio.gather()</code>は
          複数のコルーチンを並行実行し、全て完了したら結果をリストで返す便利な関数です。
          タスクを個別に作成するより簡潔に書けます。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <h3 className="text-violet-400 font-semibold mb-3">gather() の使い方</h3>
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`async def main():
    # 全て並行実行 — 合計時間 ≈ max(1.0, 0.5, 0.3) = 1.0秒
    results = await asyncio.gather(
        work("タスクA", 1.0),
        work("タスクB", 0.5),
        work("タスクC", 0.3),
    )
    print(results)
    # ['タスクA 完了', 'タスクB 完了', 'タスクC 完了']`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">順次実行 vs 並行実行の比較</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h3 className="text-red-400 font-semibold mb-2">順次実行（await を連続）</h3>
            <pre className="text-gray-300 text-xs font-mono whitespace-pre-wrap">{`# 合計 1.0 + 0.5 + 0.3 = 1.8秒
r1 = await work("A", 1.0)
r2 = await work("B", 0.5)
r3 = await work("C", 0.3)`}</pre>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h3 className="text-green-400 font-semibold mb-2">並行実行（gather）</h3>
            <pre className="text-gray-300 text-xs font-mono whitespace-pre-wrap">{`# 合計 ≈ 1.0秒（最長の処理時間）
results = await asyncio.gather(
    work("A", 1.0),
    work("B", 0.5),
    work("C", 0.3),
)`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">並行処理のシミュレーション</h2>
        <PythonPlayground
          defaultCode={`# 並行処理のメリットをシミュレート（同期コードで概念を確認）
import time
import threading

results = []
lock = threading.Lock()

def work(name: str, seconds: float):
    """I/O待ちをシミュレート"""
    time.sleep(seconds * 0.1)  # 時間を1/10に短縮してデモ
    with lock:
        results.append(f"{name} 完了")
        print(f"[{name}] 完了 (待機: {seconds}秒分)")

tasks = [("タスクA", 1.0), ("タスクB", 0.5), ("タスクC", 0.3)]

# 逐次実行
print("=== 逐次実行 ===")
results.clear()
start = time.time()
for name, sec in tasks:
    work(name, sec)
elapsed_seq = time.time() - start
print(f"合計: {elapsed_seq:.2f}秒 (スケール済み)")

# 並行実行（スレッドで概念をデモ）
print()
print("=== 並行実行（スレッド） ===")
results.clear()
start = time.time()
threads = [threading.Thread(target=work, args=(name, sec)) for name, sec in tasks]
for t in threads:
    t.start()
for t in threads:
    t.join()
elapsed_par = time.time() - start
print(f"合計: {elapsed_par:.2f}秒 (スケール済み)")

speedup = elapsed_seq / elapsed_par
print(f"\\n速度向上: 約{speedup:.1f}倍")
print("asyncio.gather()でも同様の並行効果が得られます")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="async" lessonId="tasks" />
      </div>
      <LessonNav lessons={lessons} currentId="tasks" basePath="/learn/async" />
    </div>
  );
}
