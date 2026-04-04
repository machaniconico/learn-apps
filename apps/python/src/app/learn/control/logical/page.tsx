import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function LogicalPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">論理演算子</h1>
        <p className="text-gray-400">and・or・notを使った複合条件の書き方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">論理演算子とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          論理演算子は複数の条件を組み合わせたり、条件を反転させるために使います。
          Pythonでは記号（&&, ||, !）ではなく英単語（and, or, not）を使います。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">and</code> - 両方がTrueのときTrue（かつ）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">or</code> - どちらかがTrueのときTrue（または）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">not</code> - TrueをFalse、FalseをTrueに反転（否定）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">論理演算の真理値表</h2>
        <PythonPlayground defaultCode={`# and演算子（両方TrueのときだけTrue）
print("=== and演算子 ===")
print(f"True  and True  = {True and True}")
print(f"True  and False = {True and False}")
print(f"False and True  = {False and True}")
print(f"False and False = {False and False}")

# or演算子（どちらかがTrueのときTrue）
print("\\n=== or演算子 ===")
print(f"True  or True  = {True or True}")
print(f"True  or False = {True or False}")
print(f"False or True  = {False or True}")
print(f"False or False = {False or False}")

# not演算子（TrueとFalseを逆転）
print("\\n=== not演算子 ===")
print(f"not True  = {not True}")
print(f"not False = {not False}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">短絡評価（ショートサーキット）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonの論理演算子は「短絡評価」を行います。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">and</code>は左辺がFalseなら右辺を評価せず、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">or</code>は左辺がTrueなら右辺を評価しません。
          これを利用してデフォルト値を設定するパターンがよく使われます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">a and b</code> — aがFalsyならaを、そうでなければbを返す</li>
          <li><code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">a or b</code> — aがTruthyならaを、そうでなければbを返す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">論理演算子の実践的な使い方</h2>
        <PythonPlayground defaultCode={`# 実践的な条件式
age = 20
has_ticket = True
is_vip = False

# and: 複数条件を全て満たす
if age >= 18 and has_ticket:
    print("入場できます")

# or: いずれかの条件を満たす
if is_vip or (age >= 18 and has_ticket):
    print("特典エリアに入れます")

# not: 条件を反転
if not is_vip:
    print("VIP会員ではありません")

# orを使ったデフォルト値
username = ""
display_name = username or "匿名ユーザー"
print(f"\\n表示名: {display_name}")

# andを使った安全なアクセス
data = {"name": "田中"}
name = data and data.get("name", "不明")
print(f"名前: {name}")

# 優先順位: not > and > or
x, y, z = True, False, True
print(f"\\nnot x or y and z = {not x or y and z}")
print(f"(not x) or (y and z) = {(not x) or (y and z)}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="logical" />
      </div>
      <LessonNav lessons={lessons} currentId="logical" basePath="/learn/control" />
    </div>
  );
}
