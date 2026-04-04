import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonで非同期関数を定義するキーワードの組み合わせとして正しいのはどれですか？",
    options: [
      "async def",
      "def async",
      "await def",
      "async function",
    ],
    answer: 0,
    explanation: "async def を使うとコルーチン関数を定義できます。これがPythonの非同期プログラミングの基本です。",
  },
  {
    question: "asyncio.run() の役割として正しいのはどれですか？",
    options: [
      "コルーチンを新しいスレッドで実行する",
      "イベントループを作成してコルーチンを実行し、完了後に閉じる",
      "複数のコルーチンを並行実行する",
      "非同期ジェネレータを作成する",
    ],
    answer: 1,
    explanation: "asyncio.run() はイベントループを作成し、渡されたコルーチンを実行して結果を返し、最後にループを閉じます。",
  },
  {
    question: "asyncio.gather() の特徴として正しいのはどれですか？",
    options: [
      "コルーチンを順番に1つずつ実行する",
      "複数のコルーチンを並行して実行し、全ての結果をまとめて返す",
      "コルーチンを別プロセスで実行する",
      "タイムアウトを設定して実行する",
    ],
    answer: 1,
    explanation: "asyncio.gather() は複数のコルーチンを並行実行し、全て完了したらそれぞれの結果をリストとして返します。",
  },
  {
    question: "await キーワードについて正しい説明はどれですか？",
    options: [
      "任意の関数の前に使える",
      "async def 内でのみ使用でき、コルーチンの完了を待つ",
      "別スレッドでコードを実行する",
      "コルーチンをキャンセルする",
    ],
    answer: 1,
    explanation: "await は async def で定義されたコルーチン内でのみ使用でき、awaitable オブジェクト（コルーチン等）の完了を待ちます。",
  },
];

export default function AsyncPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">非同期処理</h1>
        <div className="mb-3">
          <DifficultyBadge difficulty="advanced" />
        </div>
        <p className="text-gray-400">
          asyncioを使った非同期プログラミングをマスターしましょう。
          async/await構文・イベントループ・タスクによる並行処理など、
          モダンなPythonで必須のスキルを体系的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="async" totalLessons={5} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/async" color="violet" categoryId="async" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">非同期処理とは？</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "I/O待ち時間を有効活用",
              desc: "ネットワーク・ファイルI/Oの待機中に他の処理を進められる。CPU時間を無駄にしない。",
              icon: "⚡",
            },
            {
              title: "シングルスレッドで並行処理",
              desc: "マルチスレッドのような複雑なロック管理が不要。イベントループが協調的にタスクを切り替える。",
              icon: "🔄",
            },
            {
              title: "async/await 構文",
              desc: "コールバック地獄を解消するシンプルな記法。同期コードに近い可読性で非同期処理が書ける。",
              icon: "✍️",
            },
            {
              title: "Web開発に最適",
              desc: "FastAPI・aiohttpなど多くのWebフレームワークが非同期に対応。高スループットなAPIを構築できる。",
              icon: "🌐",
            },
            {
              title: "タスクによる並行実行",
              desc: "asyncio.create_task()やgather()で複数の処理を並行させ、合計待ち時間を短縮できる。",
              icon: "🚀",
            },
            {
              title: "標準ライブラリに組み込み",
              desc: "asyncioはPython 3.4以降の標準ライブラリ。追加インストール不要で高機能な非同期処理が使える。",
              icon: "📦",
            },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">非同期処理のパターンを試してみよう</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-violet-400 mb-3">基本のコルーチンパターン（概念デモ）</h3>
          <p className="text-gray-400 text-sm mb-3">
            Pyodideはasyncioに制限があるため、コルーチンの仕組みをジェネレータで模倣したデモです。
            実際のasync/awaitも同様の「処理を中断・再開する」コンセプトで動作します。
          </p>
          <PythonPlayground
            defaultCode={`# コルーチンの概念をシミュレート
# 実際の非同期処理では async def / await を使います

import time

def simulate_io(name, duration):
    """I/O処理をシミュレート（同期版）"""
    print(f"[開始] {name} - {duration}秒かかる処理を開始")
    # 実際の非同期処理では await asyncio.sleep(duration)
    time.sleep(0.001)  # デモ用の小さな待機
    print(f"[完了] {name} - 処理完了")
    return f"{name}の結果"

# 逐次実行（非同期なし）
print("=== 逐次実行 ===")
start = time.time()
result1 = simulate_io("APIリクエスト", 1)
result2 = simulate_io("DBクエリ", 0.5)
result3 = simulate_io("ファイル読込", 0.3)
elapsed = time.time() - start
print(f"合計: {elapsed:.3f}秒")
print()

# 非同期ではgather()で並行実行し合計時間を短縮できる
print("=== 非同期処理のメリット ===")
print("async/awaitを使えば3つの処理を並行実行し")
print("合計時間を約1秒（最長の処理時間）に短縮できます")
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-violet-400 mb-3">asyncioコードパターン（リファレンス）</h3>
          <p className="text-gray-400 text-sm mb-3">
            実際のasyncioコードはこのように書きます。実行環境でasyncioが使える場合（通常のPython）に有効です。
          </p>
          <PythonPlayground
            defaultCode={`# 実際のasyncioパターン（コード参照用）
# 通常のPython環境では正常に動作します

# === async/await の基本パターン ===
# import asyncio
#
# async def fetch_data(name: str, delay: float) -> str:
#     print(f"[開始] {name}")
#     await asyncio.sleep(delay)   # I/O待ちをシミュレート
#     print(f"[完了] {name}")
#     return f"{name}の結果"
#
# async def main():
#     # 並行実行: 合計時間 ≈ max(1.0, 0.5, 0.3) = 1.0秒
#     results = await asyncio.gather(
#         fetch_data("APIリクエスト", 1.0),
#         fetch_data("DBクエリ", 0.5),
#         fetch_data("ファイル読込", 0.3),
#     )
#     for r in results:
#         print(r)
#
# asyncio.run(main())

# Pyodideで動作する代替デモ: コルーチンオブジェクトの確認
import types

async def greet(name):
    return f"こんにちは、{name}！"

coro = greet("Python")
print(f"型: {type(coro)}")
print(f"コルーチン？: {isinstance(coro, types.CoroutineType)}")

# コルーチンを手動で進める
try:
    coro.send(None)
except StopIteration as e:
    print(f"戻り値: {e.value}")
`}
          />
        </div>
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
