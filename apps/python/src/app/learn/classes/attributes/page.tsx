import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">クラス基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インスタンス変数・クラス変数</h1>
        <p className="text-gray-400">インスタンスごとの値とクラス共通の値の使い分けを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">インスタンス変数とクラス変数の違い</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-purple-400 font-semibold mb-3">インスタンス変数</p>
              <ul className="space-y-2 text-gray-300">
                <li>• <code className="text-purple-400 bg-gray-800 px-1 rounded">self.変数名</code> で定義</li>
                <li>• 各インスタンスが独立した値を持つ</li>
                <li>• 主に <code className="text-purple-400 bg-gray-800 px-1 rounded">__init__</code> で初期化</li>
                <li>• 例：名前、年齢、残高</li>
              </ul>
            </div>
            <div>
              <p className="text-purple-400 font-semibold mb-3">クラス変数</p>
              <ul className="space-y-2 text-gray-300">
                <li>• クラス直下で定義（selfなし）</li>
                <li>• すべてのインスタンスで共有</li>
                <li>• <code className="text-purple-400 bg-gray-800 px-1 rounded">クラス名.変数名</code> でアクセス推奨</li>
                <li>• 例：カウンター、定数、設定値</li>
              </ul>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`class Employee:
    # クラス変数（全インスタンスで共有）
    company = "株式会社Python"
    total_employees = 0

    def __init__(self, name, salary):
        # インスタンス変数（各インスタンスで独立）
        self.name = name
        self.salary = salary
        Employee.total_employees += 1  # クラス変数を変更

    def get_info(self):
        return f"{Employee.company} - {self.name} (月給:{self.salary:,}円)"

e1 = Employee("田中", 300000)
e2 = Employee("鈴木", 350000)
e3 = Employee("佐藤", 280000)

print(e1.get_info())
print(e2.get_info())
print(f"\n全社員数: {Employee.total_employees}名")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">クラス変数の注意点</h2>
        <PythonPlayground
          defaultCode={`class Config:
    debug = False
    max_retries = 3

    def __init__(self, name):
        self.name = name

c1 = Config("app1")
c2 = Config("app2")

print("初期状態:")
print(f"c1.debug = {c1.debug}")
print(f"c2.debug = {c2.debug}")

# クラス変数をクラスを通して変更 → 全インスタンスに反映
Config.debug = True
print("\nConfig.debug = True 後:")
print(f"c1.debug = {c1.debug}")  # True
print(f"c2.debug = {c2.debug}")  # True

# インスタンスを通して変更するとそのインスタンスの属性になる
c1.debug = False  # c1専用のインスタンス変数が作られる
print("\nc1.debug = False 後:")
print(f"c1.debug = {c1.debug}")  # False（インスタンス変数）
print(f"c2.debug = {c2.debug}")  # True（クラス変数）`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="classes" lessonId="attributes" />
      </div>
      <LessonNav lessons={lessons} currentId="attributes" basePath="/learn/classes" />
    </div>
  );
}
