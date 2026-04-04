import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・応用 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">継承の基本</h1>
        <p className="text-gray-400">親クラスを引き継ぐ子クラスの定義方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">継承とは？</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">継承</strong>は既存のクラス（親クラス）の属性とメソッドを引き継いで、新しいクラス（子クラス）を作る仕組みです。
            コードの再利用性が高まり、共通機能を一箇所にまとめられます。
          </p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• 構文：<code className="text-violet-400 bg-gray-800 px-1 rounded">class 子クラス(親クラス):</code></li>
            <li>• 子クラスは親クラスのすべての属性・メソッドを引き継ぐ</li>
            <li>• 子クラスで独自のメソッドや属性を追加できる</li>
            <li>• 親クラスのメソッドを上書き（オーバーライド）できる</li>
          </ul>
        </div>
        <PythonPlayground
          defaultCode={`# 親クラス（基底クラス）
class Vehicle:
    def __init__(self, brand, speed):
        self.brand = brand
        self.speed = speed

    def move(self):
        return f"{self.brand}が時速{self.speed}kmで移動中"

    def stop(self):
        return f"{self.brand}が停止しました"

# 子クラス（派生クラス）
class Car(Vehicle):
    def __init__(self, brand, speed, doors):
        super().__init__(brand, speed)  # 親クラスの __init__ を呼ぶ
        self.doors = doors

    def honk(self):
        return f"{self.brand}がクラクションを鳴らしました: プーッ！"

class Motorcycle(Vehicle):
    def wheelie(self):
        return f"{self.brand}がウィリー走行中！"

# 使用例
car = Car("Toyota", 120, 4)
moto = Motorcycle("Yamaha", 180)

print(car.move())    # 親クラスのメソッドを引き継ぐ
print(car.honk())    # 子クラス独自のメソッド
print(moto.move())
print(moto.wheelie())`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">isinstance と issubclass</h2>
        <PythonPlayground
          defaultCode={`class Animal:
    pass

class Dog(Animal):
    pass

class Poodle(Dog):
    pass

dog = Dog()
poodle = Poodle()

# isinstance: インスタンスの型チェック（継承を考慮）
print(isinstance(dog, Dog))      # True
print(isinstance(dog, Animal))   # True（Animalも継承している）
print(isinstance(poodle, Dog))   # True
print(isinstance(poodle, Animal))# True

# issubclass: クラスの継承関係チェック
print(issubclass(Dog, Animal))   # True
print(issubclass(Poodle, Dog))   # True
print(issubclass(Poodle, Animal))# True
print(issubclass(Animal, Dog))   # False（逆は成立しない）

# type: 厳密な型チェック（継承を考慮しない）
print(type(poodle) == Dog)    # False
print(type(poodle) == Poodle) # True`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="inheritance" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/inheritance" />
    </div>
  );
}
