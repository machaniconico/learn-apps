import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Pythonのクラスメソッドの第1引数は慣習的に何と呼ばれますか？",
    options: ["this", "self", "cls", "me"],
    answer: 1,
    explanation: "インスタンスメソッドの第1引数は慣習的に self と命名します。これはインスタンス自身を参照するもので、メソッド呼び出し時に自動的に渡されます。",
  },
  {
    question: "__init__ メソッドの役割は何ですか？",
    options: [
      "クラスを削除する",
      "インスタンス生成時に初期状態を設定するコンストラクタ",
      "クラスメソッドを定義する",
      "継承を設定する",
    ],
    answer: 1,
    explanation: "__init__ はPythonのコンストラクタで、インスタンスが生成される際に自動的に呼び出されます。インスタンス変数の初期化などに使います。",
  },
  {
    question: "クラス変数とインスタンス変数の違いとして正しいものはどれですか？",
    options: [
      "クラス変数はインスタンスごとに異なる値を持つ",
      "インスタンス変数はすべてのインスタンスで共有される",
      "クラス変数はすべてのインスタンスで共有され、インスタンス変数はインスタンスごとに異なる",
      "違いはなく、同じものである",
    ],
    answer: 2,
    explanation: "クラス変数はクラス全体で共有される変数です。インスタンス変数は各インスタンスが独立して持つ変数で、__init__ 内で self.変数名 として定義します。",
  },
  {
    question: "@property デコレータの主な用途は何ですか？",
    options: [
      "クラスメソッドを定義する",
      "メソッドをプロパティとして使い、ゲッター・セッターを定義する",
      "静的メソッドを作成する",
      "クラスを抽象化する",
    ],
    answer: 1,
    explanation: "@property を使うとメソッドをプロパティのように呼び出せます。ゲッターに加えて @property名.setter でセッターも定義でき、値の検証などに活用できます。",
  },
];

export default function ClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">クラス基礎</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400 mt-2">
          オブジェクト指向プログラミングの核心、クラスを基礎から学びます。インスタンス、メソッド、カプセル化、プロパティまで丁寧に解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="classes" totalLessons={8} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/classes" color="purple" categoryId="classes" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">このカテゴリで学ぶこと</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "クラスの定義", desc: "class キーワードとオブジェクトの設計", icon: "🏛️" },
            { title: "__init__", desc: "コンストラクタで初期状態を設定", icon: "🔨" },
            { title: "メソッド", desc: "selfを使ったインスタンス操作", icon: "⚙️" },
            { title: "クラス変数", desc: "共有データとインスタンスデータ", icon: "📦" },
            { title: "カプセル化", desc: "アンダースコアによるアクセス制限", icon: "🔒" },
            { title: "プロパティ", desc: "@property でゲッター・セッターを実装", icon: "🎛️" },
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
        <h2 className="text-xl font-bold text-white mb-4">クラスの基本を試してみよう</h2>
        <PythonPlayground
          defaultCode={`# クラスの基本
class Dog:
    # クラス変数
    species = "Canis familiaris"

    def __init__(self, name, age):
        # インスタンス変数
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name}がワンワンと吠えました！"

    def describe(self):
        return f"{self.name}（{self.age}歳）"

# インスタンスの作成
dog1 = Dog("ポチ", 3)
dog2 = Dog("タロウ", 5)

print(dog1.describe())
print(dog2.describe())
print(dog1.bark())
print(f"犬の種：{Dog.species}")`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">プロパティとカプセル化</h2>
        <PythonPlayground
          defaultCode={`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance  # プライベート変数（慣習）

    @property
    def balance(self):
        """残高を取得するゲッター"""
        return self._balance

    @balance.setter
    def balance(self, amount):
        """残高を設定するセッター（検証付き）"""
        if amount < 0:
            raise ValueError("残高は0以上にしてください")
        self._balance = amount

    def deposit(self, amount):
        self._balance += amount
        print(f"{amount}円を入金しました。残高: {self._balance}円")

account = BankAccount("田中", 10000)
print(f"残高: {account.balance}円")
account.deposit(5000)
account.balance = 20000
print(f"設定後: {account.balance}円")`}
        />
      </section>

      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
