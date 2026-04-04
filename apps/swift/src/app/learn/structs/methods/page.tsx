import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "structs")!.lessons;

export default function StructMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">構造体 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッド</h1>
        <p className="text-gray-400">構造体にメソッド（関数）を追加して、データと振る舞いをまとめる方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インスタンスメソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体の中に<code className="text-orange-300">func</code>キーワードで定義した関数を<strong className="text-white">インスタンスメソッド</strong>と呼びます。
          メソッドはインスタンスのプロパティにアクセスでき、<code className="text-orange-300">self</code>で自分自身のインスタンスを参照できます。
          引数名と同じ名前のプロパティがある場合は<code className="text-orange-300">self.プロパティ名</code>で区別します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">func メソッド名() &#123; &#125;</code> — 戻り値なしメソッド</li>
          <li><code className="text-orange-300">func メソッド名() -&gt; 戻り値型 &#123; &#125;</code> — 戻り値ありメソッド</li>
          <li><code className="text-orange-300">self</code> — 自分自身のインスタンスへの参照</li>
          <li>メソッド内でプロパティを読み取ることは自由に行える</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">selfの使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">self</code>はメソッド内でインスタンス自身を指します。
          多くの場合、プロパティ名が引数名と重複しない限りは<code className="text-orange-300">self</code>を省略できます。
          プロパティ名と引数名が同じ場合は<code className="text-orange-300">self.プロパティ名</code>で区別が必要です。
          なお、通常のメソッドではプロパティの値を変更することはできません（mutatingが必要）。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>引数名と重複しない場合: <code className="text-orange-300">self</code>省略可能</li>
          <li>引数名と重複する場合: <code className="text-orange-300">self.name</code>で区別</li>
          <li>プロパティ変更には<code className="text-orange-300">mutating</code>修飾子が必要</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">タイプメソッド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">static</code>キーワードを付けると、インスタンスではなく型自体に属する<strong className="text-white">タイプメソッド</strong>を定義できます。
          タイプメソッドはインスタンスを生成せずに<code className="text-orange-300">型名.メソッド名()</code>で呼び出せます。
          ファクトリーメソッドやユーティリティ関数に便利です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">static func メソッド名()</code> — タイプメソッドの定義</li>
          <li><code className="text-orange-300">型名.メソッド名()</code> — タイプメソッドの呼び出し</li>
          <li>タイプメソッド内では<code className="text-orange-300">self</code>は型自体を指す</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: インスタンスメソッドの定義</h2>
        <SwiftEditor
          defaultCode={`struct Circle {
    var radius: Double

    func area() -> Double {
        return Double.pi * radius * radius
    }

    func circumference() -> Double {
        return 2 * Double.pi * radius
    }

    func describe() {
        print("半径: \\(radius)")
        print("面積: \\(String(format: "%.2f", area()))")
        print("周囲: \\(String(format: "%.2f", circumference()))")
    }
}

let c1 = Circle(radius: 5.0)
c1.describe()

print("")
let c2 = Circle(radius: 3.0)
print("円の面積: \\(String(format: "%.2f", c2.area()))")`}
          expectedOutput={`半径: 5.0
面積: 78.54
周囲: 31.42

円の面積: 28.27`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 引数を受け取るメソッド</h2>
        <SwiftEditor
          defaultCode={`struct BankAccount {
    let ownerName: String
    var balance: Double

    func currentBalance() -> String {
        return "\\(ownerName)の残高: \\(balance)円"
    }

    func canWithdraw(amount: Double) -> Bool {
        return balance >= amount
    }

    func summary() {
        print("口座名義: \\(ownerName)")
        print("残高: \\(balance)円")
        print("10000円の出金: \\(canWithdraw(amount: 10000) ? "可能" : "不可")")
    }
}

let account = BankAccount(ownerName: "山田花子", balance: 50000)
print(account.currentBalance())
account.summary()
print("")
print("100000円の出金: \\(account.canWithdraw(amount: 100000) ? "可能" : "不可")")`}
          expectedOutput={`山田花子の残高: 50000.0円
口座名義: 山田花子
残高: 50000.0円
10000円の出金: 可能

100000円の出金: 不可`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: タイプメソッド（staticメソッド）</h2>
        <SwiftEditor
          defaultCode={`struct Temperature {
    var celsius: Double

    func toFahrenheit() -> Double {
        return celsius * 9 / 5 + 32
    }

    func toKelvin() -> Double {
        return celsius + 273.15
    }

    // タイプメソッド: 華氏から摂氏を作るファクトリー
    static func fromFahrenheit(_ f: Double) -> Temperature {
        return Temperature(celsius: (f - 32) * 5 / 9)
    }

    // タイプメソッド: 絶対零度を返す
    static func absoluteZero() -> Temperature {
        return Temperature(celsius: -273.15)
    }
}

let boiling = Temperature(celsius: 100)
print("沸点: \\(boiling.celsius)°C = \\(boiling.toFahrenheit())°F")

let bodyTemp = Temperature.fromFahrenheit(98.6)
print("体温: \\(String(format: "%.1f", bodyTemp.celsius))°C")

let zero = Temperature.absoluteZero()
print("絶対零度: \\(zero.celsius)°C")`}
          expectedOutput={`沸点: 100.0°C = 212.0°F
体温: 37.0°C
絶対零度: -273.15°C`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/structs" />
    </div>
  );
}
