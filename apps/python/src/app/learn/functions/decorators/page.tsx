import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function DecoratorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">関数 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デコレータ</h1>
        <p className="text-gray-400">関数を拡張するデコレータの仕組みと書き方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デコレータとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デコレータは関数を受け取り、新しい機能を追加した関数を返す「関数のラッパー」です。
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">@デコレータ名</code>を
          関数定義の直前に書くことで適用できます。
          ログ記録・実行時間計測・認証・キャッシュなど横断的な関心事に使われます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">@デコレータ名</code> - 関数定義の直前に付ける</li>
          <li>デコレータ自体は「関数を受け取り関数を返す関数」</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">functools.wraps</code>で元の関数情報を保持する</li>
          <li>複数のデコレータを重ねることができる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デコレータの仕組み</h2>
        <PythonPlayground defaultCode={`# デコレータの基本的な仕組み
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"[前処理] {func.__name__} を呼び出します")
        result = func(*args, **kwargs)
        print(f"[後処理] {func.__name__} が完了しました")
        return result
    return wrapper

# デコレータを適用
@my_decorator
def say_hello(name):
    print(f"こんにちは、{name}さん！")

@my_decorator
def add(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")
    return result

# 呼び出す
say_hello("田中")
print()
total = add(3, 5)
print(f"戻り値: {total}")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的なデコレータ</h2>
        <p className="text-gray-400 mb-4">実際のプログラムで役立つデコレータを作ってみましょう。</p>
        <PythonPlayground defaultCode={`import time
import functools

# 実行時間を計測するデコレータ
def timer(func):
    @functools.wraps(func)  # 元の関数情報を保持
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"[TIMER] {func.__name__}: {elapsed:.4f}秒")
        return result
    return wrapper

# 呼び出し回数を数えるデコレータ
def count_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        print(f"[COUNT] {func.__name__} の呼び出し回数: {wrapper.calls}回目")
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

@timer
@count_calls
def calculate(n):
    """n番目のフィボナッチ数を計算する（再帰版）"""
    if n <= 1:
        return n
    return calculate(n - 1) + calculate(n - 2)

# functools.wraps のおかげでdocstringが保持される
print(calculate.__doc__)
print()

# 小さいnで試す
result = calculate(10)
print(f"fibonacci(10) = {result}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">引数を取るデコレータ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デコレータ自体に引数を渡したい場合は、さらに1層外側に関数を追加します。
          <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">@repeat(3)</code>のように呼び出せます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>デコレータファクトリとも呼ばれる</li>
          <li>外側の関数で引数を受け取り、内側でデコレータを定義する</li>
        </ul>
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="decorators" />
      </div>
      <LessonNav lessons={lessons} currentId="decorators" basePath="/learn/functions" />
    </div>
  );
}
