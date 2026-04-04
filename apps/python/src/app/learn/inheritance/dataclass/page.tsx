import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">継承・応用 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">データクラス</h1>
        <p className="text-gray-400">@dataclass で定型的なクラスを簡潔に書く方法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">@dataclass の基本</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <p className="text-gray-300 mb-4">
            <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">@dataclass</code> デコレータ（Python 3.7+）を使うと、
            <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">__init__</code>・<code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">__repr__</code>・
            <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">__eq__</code> などを自動生成します。
          </p>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex gap-3">
              <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">field(default=...)</code>
              <span>デフォルト値の設定</span>
            </div>
            <div className="flex gap-3">
              <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">field(default_factory=list)</code>
              <span>可変型（リスト等）のデフォルト値</span>
            </div>
            <div className="flex gap-3">
              <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded shrink-0">frozen=True</code>
              <span>イミュータブル（変更不可）なデータクラス</span>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float

@dataclass
class Student:
    name: str
    grade: int
    scores: list = field(default_factory=list)
    active: bool = True

    def average(self):
        return sum(self.scores) / len(self.scores) if self.scores else 0

# 自動生成された __init__ で作成
p1 = Point(3.0, 4.0)
p2 = Point(3.0, 4.0)
p3 = Point(0.0, 0.0)

print(p1)           # 自動生成された __repr__
print(p1 == p2)     # 自動生成された __eq__（True）
print(p1 == p3)     # False

s = Student("田中", 2, [90, 85, 92])
print(s)
print(f"平均: {s.average():.1f}点")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">frozen と order オプション</h2>
        <PythonPlayground
          defaultCode={`from dataclasses import dataclass

@dataclass(frozen=True)  # イミュータブルにする
class Color:
    r: int
    g: int
    b: int

    def to_hex(self):
        return f"#{self.r:02x}{self.g:02x}{self.b:02x}"

# frozenなのでハッシュ可能（辞書キーに使える）
red = Color(255, 0, 0)
green = Color(0, 255, 0)
blue = Color(0, 0, 255)

palette = {red: "赤", green: "緑", blue: "青"}
print(palette[red])

print(red.to_hex())

# 変更しようとするとエラー
try:
    red.r = 128
except Exception as e:
    print(f"エラー: {e}")

@dataclass(order=True)  # 比較演算子を自動生成
class Version:
    major: int
    minor: int
    patch: int

v1 = Version(1, 0, 0)
v2 = Version(2, 0, 0)
v3 = Version(1, 5, 3)

versions = [v2, v3, v1]
print("バージョン一覧:", sorted(versions))`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">データクラスと継承</h2>
        <PythonPlayground
          defaultCode={`from dataclasses import dataclass

@dataclass
class Address:
    street: str
    city: str
    postal_code: str

@dataclass
class Person:
    name: str
    age: int
    address: Address

@dataclass
class Employee(Person):
    company: str
    salary: float

    @property
    def monthly_tax(self):
        return self.salary * 0.1

addr = Address("桜通り1-2-3", "名古屋市", "460-0001")
emp = Employee(
    name="田中太郎",
    age=30,
    address=addr,
    company="株式会社Python",
    salary=400000
)

print(emp)
print(f"住所: {emp.address.city} {emp.address.street}")
print(f"月収: {emp.salary:,}円")
print(f"推定税額: {emp.monthly_tax:,.0f}円")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="inheritance" lessonId="dataclass" />
      </div>
      <LessonNav lessons={lessons} currentId="dataclass" basePath="/learn/inheritance" />
    </div>
  );
}
