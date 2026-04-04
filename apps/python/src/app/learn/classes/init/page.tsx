import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">クラス基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">__init__ メソッド</h1>
        <p className="text-gray-400">コンストラクタで初期状態を設定する方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">コンストラクタとは？</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">__init__</code> はインスタンスが生成されるときに自動的に呼ばれる特殊メソッドです。
            インスタンス変数の初期化を行います。
          </p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• ダブルアンダースコアで囲まれた特殊メソッド（マジックメソッド）</li>
            <li>• 第1引数は <code className="text-purple-400 bg-gray-800 px-1 rounded">self</code>（インスタンス自身）</li>
            <li>• <code className="text-purple-400 bg-gray-800 px-1 rounded">self.変数名 = 値</code> でインスタンス変数を定義</li>
            <li>• 戻り値は None（return は不要）</li>
          </ul>
        </div>
        <PythonPlayground
          defaultCode={`class Person:
    def __init__(self, name, age, email=""):
        # インスタンス変数の初期化
        self.name = name
        self.age = age
        self.email = email
        self.is_active = True  # デフォルト値も設定できる

    def greet(self):
        return f"こんにちは、{self.name}（{self.age}歳）です"

# インスタンス生成時に引数を渡す
p1 = Person("田中太郎", 25, "tanaka@example.com")
p2 = Person("鈴木花子", 30)  # email は省略可能（デフォルト=""）

print(p1.greet())
print(f"email: {p1.email}")
print(f"active: {p1.is_active}")
print()
print(p2.greet())
print(f"email: '{p2.email}'")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">__repr__ と __str__</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">__repr__</code> と
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded"> __str__</code> を定義すると、オブジェクトを文字列として表示できます。
        </p>
        <PythonPlayground
          defaultCode={`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        """開発者向けの表現（デバッグ用）"""
        return f"Point(x={self.x}, y={self.y})"

    def __str__(self):
        """エンドユーザー向けの表現"""
        return f"({self.x}, {self.y})"

    def __eq__(self, other):
        """等価比較"""
        return self.x == other.x and self.y == other.y

p1 = Point(3, 4)
p2 = Point(3, 4)
p3 = Point(0, 0)

print(repr(p1))   # __repr__
print(str(p1))    # __str__
print(p1)         # __str__ (print時)
print(p1 == p2)   # __eq__
print(p1 == p3)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="classes" lessonId="init" />
      </div>
      <LessonNav lessons={lessons} currentId="init" basePath="/learn/classes" />
    </div>
  );
}
