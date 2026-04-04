import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・応用 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">抽象クラス</h1>
        <p className="text-gray-400">ABC モジュールを使ったインターフェースの定義を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">抽象クラスとは？</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">抽象クラス</strong>はインスタンス化できないクラスで、
            サブクラスが必ず実装しなければならないメソッドを定義します。
            共通インターフェースの強制に使います。
          </p>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex gap-3">
              <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">from abc import ABC, abstractmethod</code>
              <span>必要なインポート</span>
            </div>
            <div className="flex gap-3">
              <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">class MyClass(ABC):</code>
              <span>ABC を継承して抽象クラスを定義</span>
            </div>
            <div className="flex gap-3">
              <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">@abstractmethod</code>
              <span>サブクラスに実装を強制するデコレータ</span>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod

# 抽象クラス
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        """面積を返す（サブクラスで実装必須）"""
        pass

    @abstractmethod
    def perimeter(self) -> float:
        """周長を返す（サブクラスで実装必須）"""
        pass

    def describe(self):
        """共通のメソッド（具体的な実装あり）"""
        return f"面積: {self.area():.2f}, 周長: {self.perimeter():.2f}"

# 具体クラス
class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14159 * self.r ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.r

r = Rectangle(4, 6)
c = Circle(5)
print(r.describe())
print(c.describe())

# 抽象クラスはインスタンス化できない
try:
    s = Shape()
except TypeError as e:
    print(f"エラー: {e}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">抽象クラスの実用例</h2>
        <PythonPlayground
          defaultCode={`from abc import ABC, abstractmethod

class DataStorage(ABC):
    """データ保存の共通インターフェース"""

    @abstractmethod
    def save(self, key: str, value: str) -> None:
        pass

    @abstractmethod
    def load(self, key: str) -> str:
        pass

    @abstractmethod
    def delete(self, key: str) -> None:
        pass

    def exists(self, key: str) -> bool:
        """共通実装（サブクラスで使える）"""
        try:
            self.load(key)
            return True
        except KeyError:
            return False

class MemoryStorage(DataStorage):
    def __init__(self):
        self._store = {}

    def save(self, key, value):
        self._store[key] = value

    def load(self, key):
        if key not in self._store:
            raise KeyError(f"キー '{key}' が見つかりません")
        return self._store[key]

    def delete(self, key):
        del self._store[key]

storage = MemoryStorage()
storage.save("name", "田中太郎")
storage.save("email", "tanaka@example.com")
print(storage.load("name"))
print(f"exists('name'): {storage.exists('name')}")
print(f"exists('age'): {storage.exists('age')}")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="inheritance" lessonId="abstract" />
      </div>
      <LessonNav lessons={lessons} currentId="abstract" basePath="/learn/inheritance" />
    </div>
  );
}
