import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NoneTypePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">None型</h1>
        <p className="text-gray-400">値が存在しないことを表すNoneの使い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Noneとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">None</code>は
          「値が存在しない」ことを表すPython独自の特別な値です。
          他の言語の<code className="text-gray-300 bg-gray-800 px-1 rounded">null</code>や
          <code className="text-gray-300 bg-gray-800 px-1 rounded">undefined</code>に相当します。
          Noneは<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">NoneType</code>型の
          唯一のインスタンスです。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">None</code> - 値が存在しないことを表す</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">x is None</code> - Noneかどうかの確認（推奨）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">x is not None</code> - Noneでないことの確認</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">x == None</code> - 非推奨（isを使うべき）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Noneの基本動作</h2>
        <PythonPlayground defaultCode={`# Noneの基本
x = None
print(f"x = {x}")
print(f"type(x) = {type(x)}")
print(f"x is None: {x is None}")
print(f"bool(None): {bool(None)}")

# Noneは唯一のインスタンス
a = None
b = None
print(f"\\na is b: {a is b}")  # 常にTrue（同じオブジェクト）

# 関数がreturnしない場合
def no_return():
    x = 1 + 1  # returnなし

result = no_return()
print(f"\\nreturnなしの関数の戻り値: {result}")
print(f"is None: {result is None}")

# 初期値としてのNone
user_input = None
if user_input is None:
    print("\\nまだ入力がありません")
else:
    print(f"入力値: {user_input}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Noneの実践的な使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Noneはデフォルト値・エラー時の戻り値・オプション引数などで頻繁に使われます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-green-400">デフォルト値</span> — 変数を初期化する際に「まだ値がない」状態を表す</li>
          <li><span className="text-green-400">関数の戻り値</span> — 処理が失敗した場合や結果がない場合に返す</li>
          <li><span className="text-green-400">オプション引数</span> — <code className="text-gray-300 bg-gray-800 px-1 rounded">def func(arg=None):</code> で省略可能な引数を定義</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Noneを使った実践例</h2>
        <PythonPlayground defaultCode={`# 検索関数の例
def find_user(users, name):
    for user in users:
        if user["name"] == name:
            return user
    return None  # 見つからない場合

users = [
    {"name": "田中", "age": 25},
    {"name": "山田", "age": 30},
    {"name": "鈴木", "age": 22},
]

result = find_user(users, "山田")
if result is not None:
    print(f"見つかりました: {result}")
else:
    print("ユーザーが見つかりませんでした")

result2 = find_user(users, "佐藤")
if result2 is not None:
    print(f"見つかりました: {result2}")
else:
    print("佐藤さんは見つかりませんでした")

# オプション引数にNoneを使う
def create_profile(name, email=None, age=None):
    profile = {"name": name}
    if email is not None:
        profile["email"] = email
    if age is not None:
        profile["age"] = age
    return profile

p1 = create_profile("田中")
p2 = create_profile("山田", email="yamada@example.com", age=30)
print(f"\\np1 = {p1}")
print(f"p2 = {p2}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="none-type" />
      </div>
      <LessonNav lessons={lessons} currentId="none-type" basePath="/learn/basics" />
    </div>
  );
}
