import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">クラス基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">classmethod・staticmethod</h1>
        <p className="text-gray-400">クラスメソッドと静的メソッドの違いと使い方を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">3種類のメソッド</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-purple-400 font-semibold mb-1">インスタンスメソッド（通常）</p>
              <p className="text-gray-300">第1引数が <code className="text-purple-400 bg-gray-800 px-1 rounded">self</code>。インスタンスの属性にアクセス可能。</p>
            </div>
            <div>
              <p className="text-purple-400 font-semibold mb-1">@classmethod</p>
              <p className="text-gray-300">第1引数が <code className="text-purple-400 bg-gray-800 px-1 rounded">cls</code>（クラス自身）。クラス変数にアクセス可能。代替コンストラクタとして使うことが多い。</p>
            </div>
            <div>
              <p className="text-purple-400 font-semibold mb-1">@staticmethod</p>
              <p className="text-gray-300">引数に <code className="text-purple-400 bg-gray-800 px-1 rounded">self</code> も <code className="text-purple-400 bg-gray-800 px-1 rounded">cls</code> もない。クラスや インスタンスに依存しないユーティリティ関数。</p>
            </div>
          </div>
        </div>
        <PythonPlayground
          defaultCode={`class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    # インスタンスメソッド
    def to_fahrenheit(self):
        return self.celsius * 9/5 + 32

    # クラスメソッド（代替コンストラクタ）
    @classmethod
    def from_fahrenheit(cls, fahrenheit):
        celsius = (fahrenheit - 32) * 5/9
        return cls(celsius)  # cls を使ってインスタンスを生成

    # 静的メソッド（クラスに関連するが独立したロジック）
    @staticmethod
    def is_valid_celsius(value):
        return -273.15 <= value <= 1e8

    def __str__(self):
        return f"{self.celsius:.1f}°C"

# 通常のコンストラクタ
t1 = Temperature(100)
print(f"{t1} = {t1.to_fahrenheit():.1f}°F")

# classmethod を使った代替コンストラクタ
t2 = Temperature.from_fahrenheit(98.6)
print(f"{t2} (体温: 98.6°F から変換)")

# staticmethod
print(Temperature.is_valid_celsius(25))    # True
print(Temperature.is_valid_celsius(-300))  # False`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">classmethod の活用例</h2>
        <PythonPlayground
          defaultCode={`class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_string):
        """'YYYY-MM-DD' 形式の文字列からDateを作成"""
        year, month, day = map(int, date_string.split("-"))
        return cls(year, month, day)

    @classmethod
    def today(cls):
        """今日の日付のDateを作成"""
        import datetime
        d = datetime.date.today()
        return cls(d.year, d.month, d.day)

    @staticmethod
    def is_leap_year(year):
        """うるう年かどうか判定"""
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

    def __str__(self):
        return f"{self.year}/{self.month:02d}/{self.day:02d}"

d1 = Date(2025, 4, 1)
d2 = Date.from_string("2025-12-25")
d3 = Date.today()

print(d1)
print(d2)
print(f"今日: {d3}")
print(f"2024年はうるう年？ {Date.is_leap_year(2024)}")
print(f"2025年はうるう年？ {Date.is_leap_year(2025)}")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="classes" lessonId="classmethod" />
      </div>
      <LessonNav lessons={lessons} currentId="classmethod" basePath="/learn/classes" />
    </div>
  );
}
