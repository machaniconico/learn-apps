import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">クラス基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロパティ</h1>
        <p className="text-gray-400">@property デコレータでゲッター・セッターを定義する方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">@property デコレータ</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@property</code> を使うとメソッドを属性のように呼び出せます。
            値の検証や計算済みプロパティの定義に使います。
          </p>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex gap-3">
              <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">@property</code>
              <span>ゲッター（読み取り）</span>
            </div>
            <div className="flex gap-3">
              <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">@プロパティ名.setter</code>
              <span>セッター（書き込み・検証付き）</span>
            </div>
            <div className="flex gap-3">
              <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">@プロパティ名.deleter</code>
              <span>デリーター（削除）</span>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`class Circle:
    def __init__(self, radius):
        self._radius = radius  # プライベート変数

    @property
    def radius(self):
        """半径を取得するゲッター"""
        return self._radius

    @radius.setter
    def radius(self, value):
        """半径を設定するセッター（検証付き）"""
        if value < 0:
            raise ValueError("半径は0以上にしてください")
        self._radius = value

    @property
    def area(self):
        """面積（計算済みプロパティ）"""
        return 3.14159 * self._radius ** 2

    @property
    def diameter(self):
        """直径（計算済みプロパティ）"""
        return self._radius * 2

c = Circle(5)
print(f"半径: {c.radius}")   # ゲッター
print(f"直径: {c.diameter}") # 計算済みプロパティ
print(f"面積: {c.area:.2f}") # 計算済みプロパティ

c.radius = 10  # セッター
print(f"変更後の面積: {c.area:.2f}")

try:
    c.radius = -1  # 検証でエラー
except ValueError as e:
    print(f"エラー: {e}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">プロパティを使った実用例</h2>
        <PythonPlayground
          defaultCode={`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age  # setterが呼ばれる

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if not isinstance(value, int):
            raise TypeError("年齢は整数にしてください")
        if not 0 <= value <= 150:
            raise ValueError("年齢は0〜150の間にしてください")
        self._age = value

    @property
    def birth_year(self):
        """誕生年（推定）"""
        return 2025 - self._age

    @property
    def is_adult(self):
        """成人かどうか"""
        return self._age >= 18

p = Person("田中", 25)
print(f"{p.name}: {p.age}歳")
print(f"生まれ: {p.birth_year}年頃")
print(f"成人: {p.is_adult}")

# セッターで検証
try:
    p.age = 200
except ValueError as e:
    print(f"エラー: {e}")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="classes" lessonId="property" />
      </div>
      <LessonNav lessons={lessons} currentId="property" basePath="/learn/classes" />
    </div>
  );
}
