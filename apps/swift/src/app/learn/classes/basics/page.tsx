import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "classes")!.lessons;

export default function ClassBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラスの基本</h1>
        <p className="text-gray-400">classキーワードを使ってクラスを定義し、プロパティとメソッドの基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クラスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラスはオブジェクト指向プログラミングの基本的な構成要素です。データ（プロパティ）と振る舞い（メソッド）をひとまとめにした設計図です。
          Swiftでは<code className="text-red-300">class</code>キーワードを使ってクラスを定義します。
          クラスは<strong className="text-white">参照型</strong>であり、インスタンスを変数に代入すると同じオブジェクトへの参照が共有されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">class クラス名 &#123; &#125;</code> — クラスの定義</li>
          <li><code className="text-red-300">var / let</code> — プロパティの宣言</li>
          <li><code className="text-red-300">func</code> — メソッドの定義</li>
          <li><code className="text-red-300">init()</code> — イニシャライザ（初期化処理）</li>
          <li><code className="text-red-300">self</code> — 自分自身のインスタンスへの参照</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロパティの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラスのプロパティには、値を保持する<strong className="text-white">格納プロパティ</strong>と、他のプロパティから計算して値を返す<strong className="text-white">算出プロパティ</strong>があります。
          格納プロパティは<code className="text-red-300">var</code>（変数）または<code className="text-red-300">let</code>（定数）で宣言します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">var name: String</code> — 変更可能な格納プロパティ</li>
          <li><code className="text-red-300">let id: Int</code> — 変更不可の格納プロパティ</li>
          <li><code className="text-red-300">var fullInfo: String &#123; get &#123; ... &#125; &#125;</code> — 算出プロパティ</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドの定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メソッドはクラスに属する関数です。インスタンスのプロパティにアクセスしたり、動作を定義したりできます。
          クラスのメソッドは<code className="text-red-300">self</code>を使って同じインスタンスの他のプロパティやメソッドにアクセスできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">func メソッド名(引数) -&gt; 戻り値型</code> — メソッドの定義</li>
          <li>クラス内では<code className="text-red-300">self</code>は省略可能な場合が多い</li>
          <li>プロパティと引数名が同じ場合は<code className="text-red-300">self</code>で区別する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: シンプルなクラスの定義</h2>
        <SwiftEditor
          defaultCode={`class Person {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }

    func greet() -> String {
        return "こんにちは、\\(name)です。\\(age)歳です。"
    }
}

let person = Person(name: "田中太郎", age: 25)
print(person.greet())

// プロパティへのアクセス
print("名前: \\(person.name)")
print("年齢: \\(person.age)")

// プロパティの変更（varなので変更可能）
person.age = 26
print("誕生日後: \\(person.age)歳")`}
          expectedOutput={`こんにちは、田中太郎です。25歳です。
名前: 田中太郎
年齢: 25
誕生日後: 26歳`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 算出プロパティとメソッドの活用</h2>
        <SwiftEditor
          defaultCode={`class Rectangle {
    var width: Double
    var height: Double

    init(width: Double, height: Double) {
        self.width = width
        self.height = height
    }

    // 算出プロパティ
    var area: Double {
        return width * height
    }

    var perimeter: Double {
        return (width + height) * 2
    }

    func describe() {
        print("幅: \\(width), 高さ: \\(height)")
        print("面積: \\(area)")
        print("周囲: \\(perimeter)")
    }

    func scale(by factor: Double) {
        width *= factor
        height *= factor
    }
}

let rect = Rectangle(width: 5.0, height: 3.0)
rect.describe()

print("---2倍に拡大---")
rect.scale(by: 2.0)
rect.describe()`}
          expectedOutput={`幅: 5.0, 高さ: 3.0
面積: 15.0
周囲: 16.0
---2倍に拡大---
幅: 10.0, 高さ: 6.0
面積: 60.0
周囲: 32.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: クラスのインスタンスを複数作成</h2>
        <SwiftEditor
          defaultCode={`class BankAccount {
    let accountNumber: String
    var balance: Double

    init(accountNumber: String, initialBalance: Double) {
        self.accountNumber = accountNumber
        self.balance = initialBalance
    }

    func deposit(amount: Double) {
        balance += amount
        print("入金: \\(amount)円 → 残高: \\(balance)円")
    }

    func withdraw(amount: Double) -> Bool {
        if balance >= amount {
            balance -= amount
            print("出金: \\(amount)円 → 残高: \\(balance)円")
            return true
        } else {
            print("残高不足: 残高\\(balance)円")
            return false
        }
    }
}

let account1 = BankAccount(accountNumber: "001", initialBalance: 10000)
let account2 = BankAccount(accountNumber: "002", initialBalance: 5000)

account1.deposit(amount: 3000)
account1.withdraw(amount: 2000)
account2.withdraw(amount: 8000)`}
          expectedOutput={`入金: 3000.0円 → 残高: 13000.0円
出金: 2000.0円 → 残高: 11000.0円
残高不足: 残高5000.0円`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/classes" />
    </div>
  );
}
