import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・応用 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドオーバーライド</h1>
        <p className="text-gray-400">親クラスのメソッドを子クラスで上書きする方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">オーバーライドの基本</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-3">
            子クラスで親クラスと同名のメソッドを定義することで、親クラスの動作を上書き（オーバーライド）できます。
            これによって同じメソッド名でクラスごとに異なる動作を実現します（ポリモーフィズム）。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`class Shape:
    def __init__(self, color="白"):
        self.color = color

    def area(self):
        return 0

    def describe(self):
        return f"{self.color}の図形、面積: {self.area():.2f}"

class Rectangle(Shape):
    def __init__(self, width, height, color="白"):
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self):  # オーバーライド
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius, color="白"):
        super().__init__(color)
        self.radius = radius

    def area(self):  # オーバーライド
        return 3.14159 * self.radius ** 2

class Triangle(Shape):
    def __init__(self, base, height, color="白"):
        super().__init__(color)
        self.base = base
        self.height = height

    def area(self):  # オーバーライド
        return self.base * self.height / 2

# ポリモーフィズム：同じメソッド名で異なる動作
shapes = [
    Rectangle(4, 5, "赤"),
    Circle(3, "青"),
    Triangle(6, 4, "緑"),
]

for shape in shapes:
    print(shape.describe())  # それぞれの area() が呼ばれる`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">特殊メソッドのオーバーライド</h2>
        <PythonPlayground
          defaultCode={`class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):     # + 演算子
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):     # - 演算子
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):    # * 演算子（スカラー倍）
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other):      # == 演算子
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def magnitude(self):
        return (self.x**2 + self.y**2) ** 0.5

v1 = Vector(1, 2)
v2 = Vector(3, 4)

print(v1 + v2)          # Vector(4, 6)
print(v2 - v1)          # Vector(2, 2)
print(v1 * 3)           # Vector(3, 6)
print(v1 == Vector(1, 2))  # True
print(f"|v2| = {v2.magnitude():.2f}")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="inheritance" lessonId="override" />
      </div>
      <LessonNav lessons={lessons} currentId="override" basePath="/learn/inheritance" />
    </div>
  );
}
