import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

const quizQuestions: QuizQuestion[] = [
  {
    question: "SOLID原則の「S」が表す原則はどれですか？",
    options: [
      "Single Responsibility Principle（単一責任の原則）",
      "Singleton Pattern（シングルトンパターン）",
      "Static Method Principle（静的メソッドの原則）",
      "Separation of Concerns（関心の分離）",
    ],
    answer: 0,
    explanation: "S は Single Responsibility Principle（単一責任の原則）です。クラスは1つの理由でのみ変更されるべきという原則です。",
  },
  {
    question: "Singletonパターンの目的はどれですか？",
    options: [
      "オブジェクトのコピーを大量に作成する",
      "クラスのインスタンスが1つだけ存在することを保証する",
      "複数のインターフェースを1つに統一する",
      "オブジェクトの生成を遅延させる",
    ],
    answer: 1,
    explanation: "Singletonパターンはクラスのインスタンスが1つだけ存在することを保証し、グローバルアクセスポイントを提供します。",
  },
  {
    question: "Observerパターンで、状態変化を通知するオブジェクトの呼び名はどれですか？",
    options: [
      "Observer（オブザーバー）",
      "Subject / Publisher（サブジェクト / 発行者）",
      "Decorator（デコレータ）",
      "Adapter（アダプター）",
    ],
    answer: 1,
    explanation: "状態変化を通知する側を Subject または Publisher と呼びます。変化を受け取る側が Observer または Subscriber です。",
  },
  {
    question: "Adapterパターンの主な用途はどれですか？",
    options: [
      "オブジェクトの生成方法を隠蔽する",
      "互換性のないインターフェースを持つクラスを協調させる",
      "オブジェクトに動的に機能を追加する",
      "複雑なサブシステムへのシンプルなインターフェースを提供する",
    ],
    answer: 1,
    explanation: "Adapterパターンは既存クラスのインターフェースを期待されるインターフェースに変換し、互換性のないクラスを協調させます。",
  },
];

export default function DesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">設計パターン</h1>
        <div className="mb-3">
          <DifficultyBadge difficulty="advanced" />
        </div>
        <p className="text-gray-400">
          ソフトウェア設計の定石であるデザインパターンをPythonで学びます。
          SOLID原則から生成・構造・振る舞いパターンまで、保守性の高いコード設計の技術を習得しましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="design" totalLessons={5} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/design" color="indigo" categoryId="design" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">デザインパターンとは？</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "再利用可能な解決策",
              desc: "ソフトウェア設計で繰り返し登場する問題に対する実証済みの解決策のテンプレート。",
              icon: "♻️",
            },
            {
              title: "共通語彙の提供",
              desc: "「Observerパターンで実装した」と言えば、チーム全員がその設計意図をすぐに理解できる。",
              icon: "💬",
            },
            {
              title: "保守性の向上",
              desc: "適切なパターンを使うことで変更が局所化され、機能追加時の影響範囲を最小限にできる。",
              icon: "🔧",
            },
            {
              title: "GoFの23パターン",
              desc: "Gang of Fourが定義した生成・構造・振る舞いの3カテゴリ23パターンが基本となる。",
              icon: "📖",
            },
            {
              title: "SOLID原則との連携",
              desc: "SOLID原則はデザインパターンの背景にある設計原則。両方を理解することで設計の質が上がる。",
              icon: "🏗️",
            },
            {
              title: "Pythonでの実装",
              desc: "Pythonの動的型付け・デコレータ・多重継承を活用すると、よりシンプルにパターンを実装できる。",
              icon: "🐍",
            },
          ].map((item) => (
            <div key={item.title} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">デザインパターンを試してみよう</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-400 mb-3">Singletonパターン — インスタンスを1つに限定</h3>
          <PythonPlayground
            defaultCode={`# Singletonパターン: インスタンスが1つだけ存在することを保証
class DatabaseConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.connected = False
            cls._instance.url = ""
        return cls._instance

    def connect(self, url: str):
        self.url = url
        self.connected = True
        print(f"接続しました: {url}")

    def query(self, sql: str) -> str:
        if not self.connected:
            return "エラー: 未接続"
        return f"クエリ実行: {sql}"

# 同じインスタンスが返される
db1 = DatabaseConnection()
db1.connect("postgresql://localhost/mydb")

db2 = DatabaseConnection()
print(f"同一インスタンス: {db1 is db2}")  # True
print(db2.query("SELECT * FROM users"))

# 設定変更が全体に反映される
db1.url = "postgresql://production/mydb"
print(f"db2のURL: {db2.url}")  # 同じインスタンスなので反映される
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-400 mb-3">Observerパターン — 変化を自動通知</h3>
          <PythonPlayground
            defaultCode={`# Observerパターン: 状態変化を複数のオブジェクトに通知
from abc import ABC, abstractmethod
from typing import List

class Observer(ABC):
    @abstractmethod
    def update(self, event: str, data) -> None:
        pass

class Subject:
    def __init__(self):
        self._observers: List[Observer] = []

    def subscribe(self, observer: Observer):
        self._observers.append(observer)

    def unsubscribe(self, observer: Observer):
        self._observers.remove(observer)

    def notify(self, event: str, data=None):
        for observer in self._observers:
            observer.update(event, data)

# 具体的なSubject
class StockPrice(Subject):
    def __init__(self, symbol: str, price: float):
        super().__init__()
        self.symbol = symbol
        self._price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, new_price: float):
        old = self._price
        self._price = new_price
        self.notify("price_changed", {"symbol": self.symbol, "old": old, "new": new_price})

# 具体的なObserver
class PriceAlert(Observer):
    def __init__(self, name: str, threshold: float):
        self.name = name
        self.threshold = threshold

    def update(self, event: str, data):
        if event == "price_changed" and data["new"] >= self.threshold:
            print(f"[{self.name}] アラート! {data['symbol']} が {data['new']} 円に達しました")

class PriceLogger(Observer):
    def update(self, event: str, data):
        if event == "price_changed":
            change = data["new"] - data["old"]
            sign = "+" if change > 0 else ""
            print(f"[ログ] {data['symbol']}: {data['old']} → {data['new']} ({sign}{change})")

# 使用例
stock = StockPrice("TECH", 1000)
stock.subscribe(PriceAlert("投資家A", threshold=1100))
stock.subscribe(PriceAlert("投資家B", threshold=1200))
stock.subscribe(PriceLogger())

print("株価を変動させます:")
stock.price = 1050
stock.price = 1150
stock.price = 1250
`}
          />
        </div>
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
