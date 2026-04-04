import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">クラス基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カプセル化</h1>
        <p className="text-gray-400">アンダースコアを使ったアクセス制限の慣習を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">アクセス制限の慣習</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            Pythonは厳密なアクセス制限機構を持ちませんが、命名規則でアクセス制限を表現します。
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">変数名</code>
              <span className="text-gray-300">パブリック：自由にアクセス可能</span>
            </div>
            <div className="flex gap-3">
              <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">_変数名</code>
              <span className="text-gray-300">プロテクテッド：クラス内部・サブクラスで使う（慣習）</span>
            </div>
            <div className="flex gap-3">
              <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">__変数名</code>
              <span className="text-gray-300">プライベート：名前マングリングにより外部からのアクセスを防ぐ</span>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner        # パブリック
        self._bank_code = "0001"  # プロテクテッド（慣習）
        self.__balance = balance  # プライベート（名前マングリング）

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"{amount:,}円を入金しました")

    def withdraw(self, amount):
        if amount > self.__balance:
            print("残高が不足しています")
        else:
            self.__balance -= amount
            print(f"{amount:,}円を出金しました")

    def get_balance(self):
        return self.__balance

account = BankAccount("田中", 10000)
account.deposit(5000)
account.withdraw(3000)
print(f"残高: {account.get_balance():,}円")

# 直接アクセスしようとするとエラー
try:
    print(account.__balance)
except AttributeError as e:
    print(f"エラー: {e}")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">名前マングリングの仕組み</h2>
        <PythonPlayground
          defaultCode={`class MyClass:
    def __init__(self):
        self.public = "パブリック"
        self._protected = "プロテクテッド"
        self.__private = "プライベート"

obj = MyClass()
print(obj.public)      # OK
print(obj._protected)  # OK（慣習として避けるべき）

# __private は名前マングリングされる
# _MyClass__private という名前に変換される
try:
    print(obj.__private)
except AttributeError:
    print("__private には直接アクセスできない")

# dir() で実際の属性名を確認
attrs = [a for a in dir(obj) if not a.startswith("__") or "private" in a.lower()]
print("属性:", [a for a in dir(obj) if "private" in a.lower() or a in ["public", "_protected"]])`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="classes" lessonId="encapsulation" />
      </div>
      <LessonNav lessons={lessons} currentId="encapsulation" basePath="/learn/classes" />
    </div>
  );
}
