import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function BooleansPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">真偽値</h1>
        <p className="text-gray-400">TrueとFalseを使った論理的な処理</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">bool型とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">bool</code>型は
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">True</code>（真）または
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">False</code>（偽）の
          2つの値のみを持つデータ型です。条件判断やフラグとして広く使われます。
          Pythonのboolはintのサブクラスなので、Trueは1、Falseは0として扱われます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">True</code> - 真（1と同じ）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">False</code> - 偽（0と同じ）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">bool(値)</code> - 任意の値をboolに変換</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">真偽値の基本操作</h2>
        <PythonPlayground defaultCode={`# bool値の基本
t = True
f = False
print(f"True: {t}, False: {f}")
print(f"type(True): {type(True)}")

# bool はintのサブクラス
print(f"\\nTrue == 1: {True == 1}")
print(f"False == 0: {False == 0}")
print(f"True + True = {True + True}")
print(f"True * 10 = {True * 10}")

# 論理演算
print("\\n=== 論理演算 ===")
print(f"True and True  = {True and True}")
print(f"True and False = {True and False}")
print(f"False or True  = {False or True}")
print(f"False or False = {False or False}")
print(f"not True  = {not True}")
print(f"not False = {not False}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Truthyとfalsy</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonではbool以外の値もifの条件として使えます。
          Trueとして扱われる値を「truthy」、Falseとして扱われる値を「falsy」と呼びます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><span className="text-red-400 font-bold">falsy（偽として扱われる）:</span> <code className="text-gray-300 bg-gray-800 px-1 rounded">False, 0, 0.0, "", [], {'{}'}, set(), None</code></li>
          <li><span className="text-green-400 font-bold">truthy（真として扱われる）:</span> 上記以外のすべての値</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">TruthyとFalsyを確認する</h2>
        <p className="text-gray-400 mb-4">様々な値がTrue/Falseどちらとして評価されるか確認しましょう。</p>
        <PythonPlayground defaultCode={`# falsy な値
falsy_values = [False, 0, 0.0, "", [], {}, set(), None]
print("=== Falsy（偽として扱われる値）===")
for v in falsy_values:
    print(f"  bool({repr(v)!s:<12}) = {bool(v)}")

# truthy な値
print("\\n=== Truthy（真として扱われる値）===")
truthy_values = [True, 1, -1, 3.14, "hello", [0], {"a": 1}]
for v in truthy_values:
    print(f"  bool({repr(v)!s:<12}) = {bool(v)}")

# 実際の使用例
name = ""
if name:
    print(f"\\nこんにちは、{name}さん！")
else:
    print("\\n名前が入力されていません")

items = [1, 2, 3]
if items:
    print(f"リストに {len(items)} 個の要素があります")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="booleans" />
      </div>
      <LessonNav lessons={lessons} currentId="booleans" basePath="/learn/basics" />
    </div>
  );
}
