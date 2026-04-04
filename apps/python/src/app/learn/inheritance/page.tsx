import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonで継承を定義する正しい構文はどれですか？",
    options: [
      "class Dog extends Animal:",
      "class Dog inherits Animal:",
      "class Dog(Animal):",
      "class Dog implements Animal:",
    ],
    answer: 2,
    explanation: "Pythonでは class 子クラス名(親クラス名): の形式で継承を定義します。他の言語の extends や implements とは異なります。",
  },
  {
    question: "super() の主な用途はどれですか？",
    options: [
      "子クラスを作成する",
      "親クラスのメソッドを明示的に呼び出す",
      "クラスの属性を削除する",
      "インスタンスを複製する",
    ],
    answer: 1,
    explanation: "super() は親クラスへの参照を返します。super().__init__() のように使い、親クラスのメソッドを子クラスから呼び出せます。",
  },
  {
    question: "抽象クラスを作成するために使うモジュールはどれですか？",
    options: ["abstract", "abc", "interface", "base"],
    answer: 1,
    explanation: "Pythonの標準ライブラリ abc (Abstract Base Classes) モジュールを使います。ABC クラスを継承し @abstractmethod デコレータでメソッドを抽象化します。",
  },
  {
    question: "@dataclass デコレータの主な利点はどれですか？",
    options: [
      "クラスを抽象クラスにする",
      "__init__・__repr__・__eq__ などを自動生成し、定型コードを削減する",
      "クラスの継承を禁止する",
      "メソッドをキャッシュする",
    ],
    answer: 1,
    explanation: "@dataclass はPython 3.7で追加された機能で、__init__・__repr__・__eq__ などを自動生成します。データ保持用のシンプルなクラスを簡潔に書けます。",
  },
];

export default function InheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">継承・応用</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400 mt-2">
          クラスの継承、メソッドオーバーライド、super()、抽象クラス、データクラスなど、オブジェクト指向プログラミングの応用を学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="inheritance" totalLessons={6} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/inheritance" color="violet" categoryId="inheritance" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">このカテゴリで学ぶこと</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "継承の基本", desc: "親クラスの機能を引き継ぐ設計", icon: "🌳" },
            { title: "オーバーライド", desc: "子クラスでメソッドを上書き", icon: "✏️" },
            { title: "super()", desc: "親クラスのメソッドを活用する", icon: "⬆️" },
            { title: "抽象クラス", desc: "ABCで共通インターフェースを定義", icon: "📐" },
            { title: "データクラス", desc: "@dataclassで定型コードを削減", icon: "🗂️" },
            { title: "実践演習", desc: "継承を活用した設計問題", icon: "🎯" },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">継承の基本を試してみよう</h2>
        <PythonPlayground
          defaultCode={`# 継承の基本
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name}が鳴きました"

    def describe(self):
        return f"動物: {self.name}"

class Dog(Animal):
    def speak(self):  # オーバーライド
        return f"{self.name}がワンワンと鳴きました"

class Cat(Animal):
    def speak(self):  # オーバーライド
        return f"{self.name}がニャーと鳴きました"

# 多態性（ポリモーフィズム）
animals = [Dog("ポチ"), Cat("タマ"), Animal("謎の動物")]
for animal in animals:
    print(animal.speak())`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">データクラスを試してみよう</h2>
        <PythonPlayground
          defaultCode={`from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float

    def distance_from_origin(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5

@dataclass
class Student:
    name: str
    grade: int
    scores: list = field(default_factory=list)

    def average(self) -> float:
        return sum(self.scores) / len(self.scores) if self.scores else 0

# 自動生成された __repr__ と __eq__
p1 = Point(3.0, 4.0)
p2 = Point(3.0, 4.0)
print(p1)
print(p1 == p2)
print(f"原点からの距離: {p1.distance_from_origin()}")

s = Student("田中", 2, [90, 85, 92])
print(s)
print(f"平均点: {s.average():.1f}")`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
