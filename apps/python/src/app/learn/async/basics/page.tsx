import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function AsyncBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">非同期処理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非同期処理の基本</h1>
        <p className="text-gray-400">asyncio・コルーチン・イベントループの仕組みを理解する</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">同期処理 vs 非同期処理</h2>
        <p className="text-gray-300 mb-4">
          通常のPythonプログラムは<strong className="text-white">同期処理</strong>で動作します。
          処理が1つずつ順番に実行され、I/O待ち（ネットワーク通信・ファイル読み書きなど）の間も
          CPUは待ち続けます。
        </p>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">非同期処理</strong>ではI/O待ちの間に別の処理を進めることができます。
          1つのスレッドで複数の処理を効率よく並行させる仕組みです。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h3 className="text-red-400 font-semibold mb-2">同期処理（非効率）</h3>
            <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">{`処理A開始 → 待ち1秒
処理B開始 → 待ち1秒
処理C開始 → 待ち1秒
合計: 3秒`}</pre>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h3 className="text-green-400 font-semibold mb-2">非同期処理（効率的）</h3>
            <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">{`処理A開始 → 待ちの間にB・Cを進める
処理B開始 ↗
処理C開始 ↗
合計: 約1秒`}</pre>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">コルーチンとは</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">コルーチン（coroutine）</strong>は、途中で処理を一時停止して
          制御を返し、後で再開できる特殊な関数です。
          <code className="bg-gray-800 text-violet-300 px-1 rounded">async def</code>で定義し、
          <code className="bg-gray-800 text-violet-300 px-1 rounded">await</code>で一時停止します。
        </p>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 mb-6">
          <h3 className="text-violet-400 font-semibold mb-3">コルーチンの基本構文</h3>
          <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">{`import asyncio

async def hello():          # コルーチン関数
    print("処理開始")
    await asyncio.sleep(1)  # 1秒待機（I/O待ちをシミュレート）
    print("処理完了")
    return "結果"

# コルーチンを実行するにはイベントループが必要
result = asyncio.run(hello())  # イベントループを作成して実行
print(result)  # "結果"`}</pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">イベントループとは</h2>
        <p className="text-gray-300 mb-4">
          <strong className="text-white">イベントループ</strong>はasyncioの中心的な仕組みです。
          複数のコルーチンを管理し、I/O待ちが発生したタイミングで別のコルーチンに切り替えます。
          スケジューラのように動作し、効率的に処理を切り替えます。
        </p>
        <ul className="space-y-2 mb-6">
          {[
            "asyncio.run() がイベントループを自動で作成・管理する（Python 3.7以降）",
            "コルーチンが await に達するとイベントループに制御が戻る",
            "イベントループは別のコルーチンが実行できるか確認して切り替える",
            "全コルーチンが完了するとイベントループが終了する",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
              <span className="text-violet-400 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">コルーチンの仕組みをデモで確認</h2>
        <PythonPlayground
          defaultCode={`# コルーチンオブジェクトの確認（Pyodideで動作）
import types

# async def でコルーチン関数を定義
async def compute(x: int) -> int:
    # await asyncio.sleep(0) などがあれば一時停止できる
    return x * x

# コルーチン関数を呼び出すとコルーチンオブジェクトが返る
coro = compute(5)
print(f"型: {type(coro)}")
print(f"コルーチン？: {isinstance(coro, types.CoroutineType)}")

# コルーチンを手動で実行（通常は asyncio.run() を使う）
try:
    coro.send(None)
except StopIteration as e:
    print(f"戻り値: {e.value}")

# 複数のコルーチン関数を定義
async def greet(name: str) -> str:
    return f"こんにちは、{name}！"

async def add(a: int, b: int) -> int:
    return a + b

for coro in [greet("Python"), add(3, 4)]:
    try:
        coro.send(None)
    except StopIteration as e:
        print(f"結果: {e.value}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="async" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/async" />
    </div>
  );
}
