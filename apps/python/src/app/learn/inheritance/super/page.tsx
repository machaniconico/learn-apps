import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・応用 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">super() の使い方</h1>
        <p className="text-gray-400">親クラスのメソッドを明示的に呼び出す方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">super() の基本</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-3">
            <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">super()</code> は親クラスへの参照を返します。
            子クラスでオーバーライドしたメソッドの中で、親クラスの同名メソッドを呼び出したいときに使います。
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>• <code className="text-violet-400 bg-gray-800 px-1 rounded">super().__init__()</code> で親クラスのコンストラクタを呼ぶ</li>
            <li>• 多重継承にも対応したMRO（メソッド解決順序）に従う</li>
            <li>• Python 3では引数なしで使えます</li>
          </ul>
        </div>
        <PythonPlayground
          defaultCode={`class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name}が「{self.sound}」と言いました"

    def describe(self):
        return f"動物: {self.name}"

class Pet(Animal):
    def __init__(self, name, sound, owner):
        super().__init__(name, sound)  # 親クラスの __init__ を呼ぶ
        self.owner = owner

    def describe(self):
        # super().describe() で親クラスのメソッドを呼ぶ
        base = super().describe()
        return f"{base}（飼い主: {self.owner}）"

class Dog(Pet):
    def __init__(self, name, owner, breed):
        super().__init__(name, "ワン", owner)  # Pet.__init__ を呼ぶ
        self.breed = breed

    def describe(self):
        base = super().describe()  # Pet.describe を呼ぶ
        return f"{base} [{self.breed}]"

# テスト
dog = Dog("ポチ", "田中", "柴犬")
print(dog.speak())    # Animal のメソッド
print(dog.describe()) # 3層の describe を繰り上がる`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">多重継承と MRO</h2>
        <PythonPlayground
          defaultCode={`# 多重継承
class A:
    def hello(self):
        return "A の hello"

class B(A):
    def hello(self):
        return f"B の hello + {super().hello()}"

class C(A):
    def hello(self):
        return f"C の hello + {super().hello()}"

class D(B, C):
    def hello(self):
        return f"D の hello + {super().hello()}"

d = D()
print(d.hello())

# MRO（メソッド解決順序）を確認
print("\nMRO:")
for cls in D.__mro__:
    print(f"  {cls.__name__}")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="inheritance" lessonId="super" />
      </div>
      <LessonNav lessons={lessons} currentId="super" basePath="/learn/inheritance" />
    </div>
  );
}
