import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">クラス基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラスの基本</h1>
        <p className="text-gray-400">class キーワードを使ったオブジェクトの設計図を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">オブジェクト指向とクラス</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <strong className="text-white">クラス</strong>はオブジェクトの設計図です。現実世界のモノをデータ（属性）と操作（メソッド）の組み合わせとして表現します。
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-purple-400 font-semibold mb-2">クラスの構成要素</p>
              <ul className="space-y-1 text-gray-300">
                <li>• <strong className="text-white">属性（アトリビュート）</strong>：データ</li>
                <li>• <strong className="text-white">メソッド</strong>：操作・振る舞い</li>
                <li>• <strong className="text-white">インスタンス</strong>：クラスから作られた実体</li>
              </ul>
            </div>
            <div>
              <p className="text-purple-400 font-semibold mb-2">オブジェクト指向の利点</p>
              <ul className="space-y-1 text-gray-300">
                <li>• コードの再利用性が高まる</li>
                <li>• 関連するデータと処理をまとめられる</li>
                <li>• 大規模なプログラムの整理に適している</li>
              </ul>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`# 最もシンプルなクラス
class Dog:
    pass  # まだ何もない空のクラス

# インスタンスの作成
dog = Dog()
print(type(dog))  # <class '__main__.Dog'>
print(isinstance(dog, Dog))  # True

# 属性を動的に追加（推奨はしない）
dog.name = "ポチ"
dog.age = 3
print(f"{dog.name}（{dog.age}歳）")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">クラスの定義と使用</h2>
        <PythonPlayground
          defaultCode={`# 属性とメソッドを持つクラス
class Circle:
    # クラス変数（全インスタンスで共有）
    pi = 3.14159

    def __init__(self, radius):
        # インスタンス変数
        self.radius = radius

    def area(self):
        """面積を返す"""
        return Circle.pi * self.radius ** 2

    def circumference(self):
        """円周を返す"""
        return 2 * Circle.pi * self.radius

    def describe(self):
        return f"半径 {self.radius} の円"

# インスタンス生成と使用
c1 = Circle(5)
c2 = Circle(10)

print(c1.describe())
print(f"面積: {c1.area():.2f}")
print(f"円周: {c1.circumference():.2f}")
print()
print(c2.describe())
print(f"面積: {c2.area():.2f}")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="classes" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/classes" />
    </div>
  );
}
