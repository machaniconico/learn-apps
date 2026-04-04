import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function TypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Python基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型の基本</h1>
        <p className="text-gray-400">int・float・str・boolなど基本的なデータ型を理解する</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Pythonの基本データ型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonにはいくつかの基本的なデータ型があります。それぞれの型には異なる特性と用途があります。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">int</code> - 整数型。例: <code className="text-gray-300 bg-gray-800 px-1 rounded">-10, 0, 42, 1000000</code></li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">float</code> - 浮動小数点型。例: <code className="text-gray-300 bg-gray-800 px-1 rounded">3.14, -0.5, 1.0e10</code></li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">str</code> - 文字列型。例: <code className="text-gray-300 bg-gray-800 px-1 rounded">"hello", 'Python', """複数行"""</code></li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">bool</code> - 真偽値型。<code className="text-gray-300 bg-gray-800 px-1 rounded">True</code> または <code className="text-gray-300 bg-gray-800 px-1 rounded">False</code> のみ</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">NoneType</code> - None型。値が存在しないことを表す</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">各データ型の特性</h2>
        <p className="text-gray-400 mb-4">それぞれのデータ型がどのように動作するか確認しましょう。</p>
        <PythonPlayground defaultCode={`# int（整数型）
a = 100
b = -50
c = 0
print(f"int: {a}, {b}, {c}")
print(f"intの演算: {a + b}, {a * b}, {a ** 2}")

# float（浮動小数点型）
x = 3.14
y = 2.0
print(f"\\nfloat: {x}, {y}")
print(f"floatの演算: {x + y:.4f}")
print(f"整数と浮動小数点の演算: {10 / 3}")  # 結果はfloat

# str（文字列型）
s1 = "こんにちは"
s2 = 'Python'
print(f"\\nstr: '{s1}', '{s2}'")
print(f"文字列の長さ: {len(s1)}")
print(f"文字列の結合: {s1 + '、' + s2}")

# bool（真偽値型）
is_ok = True
is_ng = False
print(f"\\nbool: {is_ok}, {is_ng}")
print(f"boolの演算: {is_ok and is_ng}, {is_ok or is_ng}")`} />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型の特殊な動作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Pythonの型にはいくつかの特殊な動作があります。知っておくと役立ちます。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">10 / 3</code> - 常に float を返す（3.333...）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">10 // 3</code> - 整数除算（切り捨て）で int を返す（3）</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">True + 1</code> - bool は int のサブクラスなので 2 になる</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">isinstance(x, float)</code> - 型チェックに推奨される方法</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型チェックと isinstance</h2>
        <p className="text-gray-400 mb-4">isinstance() を使うと型を安全にチェックできます。</p>
        <PythonPlayground defaultCode={`# isinstance() で型を確認
values = [42, 3.14, "hello", True, None, [1, 2], {"a": 1}]

for v in values:
    print(f"{repr(v)!s:<15}", end=" → ")
    if isinstance(v, bool):    # bool は int より先に確認
        print("bool")
    elif isinstance(v, int):
        print("int")
    elif isinstance(v, float):
        print("float")
    elif isinstance(v, str):
        print("str")
    elif v is None:
        print("NoneType")
    else:
        print(type(v).__name__)

# bool は int のサブクラス
print(f"\\nisinstance(True, int): {isinstance(True, int)}")
print(f"True == 1: {True == 1}")
print(f"True + 1 = {True + 1}")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="types" />
      </div>
      <LessonNav lessons={lessons} currentId="types" basePath="/learn/basics" />
    </div>
  );
}
