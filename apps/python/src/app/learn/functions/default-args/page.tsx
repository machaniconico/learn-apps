import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function DefaultArgsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">関数 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト引数</h1>
        <p className="text-gray-400">引数に初期値を設定してオプション化する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デフォルト引数は、関数呼び出し時に引数が省略された場合に使われる初期値です。
          省略可能な引数を作ることで、関数をより柔軟に使えるようになります。
          デフォルト値を持つ引数は、持たない引数より後に書く必要があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">def func(必須引数, オプション=デフォルト値):</code></li>
          <li>デフォルト引数を持つ引数は必ず後ろに書く</li>
          <li>ミュータブルな値（リスト・辞書）をデフォルトにしない</li>
          <li>代わりに<code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">None</code>を使い、関数内でチェックする</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数の基本</h2>
        <PythonPlayground defaultCode={`# デフォルト引数の定義
def greet(name, greeting="こんにちは", times=1):
    for _ in range(times):
        print(f"{greeting}、{name}さん！")

# 全引数を指定
greet("田中", "おはよう", 2)
print()

# 一部のみ指定（残りはデフォルト）
greet("山田")
print()
greet("鈴木", "こんばんは")
print()

# キーワード引数でデフォルトを飛ばして指定
greet("佐藤", times=3)
print()

# 数値のデフォルト
def power(base, exponent=2):
    return base ** exponent

print(f"power(3) = {power(3)}")       # 3^2 = 9
print(f"power(3, 3) = {power(3, 3)}")  # 3^3 = 27`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ミュータブルなデフォルト値の落とし穴</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デフォルト値は関数定義時に一度だけ評価されます。
          リストや辞書をデフォルト値にすると、すべての呼び出しで同じオブジェクトが共有され、
          意図しない動作を引き起こします。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-red-400">NG</span>: <code className="text-gray-300 bg-gray-800 px-1 rounded">def func(items=[]):</code></li>
          <li><span className="text-green-400">OK</span>: <code className="text-gray-300 bg-gray-800 px-1 rounded">def func(items=None):</code> → 内部で <code className="text-yellow-400 bg-gray-800 px-1 rounded">if items is None: items = []</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全なデフォルト引数の書き方</h2>
        <PythonPlayground defaultCode={`# 問題のある書き方（やってはいけない）
def add_item_bad(item, items=[]):
    items.append(item)
    return items

result1 = add_item_bad("りんご")
result2 = add_item_bad("バナナ")
result3 = add_item_bad("みかん")
# 全て同じリストを共有してしまう！
print("問題のある書き方:")
print(result1)
print(result2)
print(result3)

# 正しい書き方（Noneを使う）
def add_item_good(item, items=None):
    if items is None:
        items = []    # 毎回新しいリストを作成
    items.append(item)
    return items

result4 = add_item_good("りんご")
result5 = add_item_good("バナナ")
result6 = add_item_good("みかん")
print("\\n正しい書き方:")
print(result4)
print(result5)
print(result6)`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="default-args" />
      </div>
      <LessonNav lessons={lessons} currentId="default-args" basePath="/learn/functions" />
    </div>
  );
}
