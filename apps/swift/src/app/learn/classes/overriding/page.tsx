import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "classes")!.lessons;

export default function OverridingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オーバーライド</h1>
        <p className="text-gray-400">overrideキーワードを使って親クラスのメソッドやプロパティを子クラスで再定義する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オーバーライドとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オーバーライドとは、親クラスで定義されたメソッドやプロパティを子クラスで独自の実装に置き換えることです。
          Swiftでは<code className="text-red-300">override</code>キーワードを必ず付けることでオーバーライドを明示します。
          これにより、誤って親クラスのメソッドを上書きしてしまうミスをコンパイラが検出できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">override func</code> — メソッドのオーバーライド</li>
          <li><code className="text-red-300">override var</code> — プロパティのオーバーライド</li>
          <li><code className="text-red-300">super.メソッド()</code> — 親クラスの実装を呼び出す</li>
          <li><code className="text-red-300">final</code> — オーバーライドを禁止するキーワード</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロパティのオーバーライド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロパティもオーバーライドできます。親クラスの格納プロパティを算出プロパティとしてオーバーライドしたり、
          プロパティオブザーバを追加したりすることができます。ただし、算出プロパティを格納プロパティにオーバーライドすることはできません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>読み取り専用プロパティを読み書き可能プロパティにオーバーライド可能</li>
          <li>読み書き可能プロパティを読み取り専用にオーバーライドは不可</li>
          <li><code className="text-red-300">override var</code> に <code className="text-red-300">willSet / didSet</code> を追加できる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">finalキーワード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">final</code>キーワードをクラス・メソッド・プロパティに付けると、それ以上のオーバーライドや継承を禁止できます。
          これはセキュリティや設計意図の明示、パフォーマンス最適化のために使用されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">final class</code> — クラスの継承を禁止</li>
          <li><code className="text-red-300">final func</code> — メソッドのオーバーライドを禁止</li>
          <li><code className="text-red-300">final var</code> — プロパティのオーバーライドを禁止</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: メソッドのオーバーライド</h2>
        <SwiftEditor
          defaultCode={`class Animal {
    var name: String

    init(name: String) {
        self.name = name
    }

    func makeSound() {
        print("\\(name): ...（無音）")
    }

    func move() {
        print("\\(name)が移動します")
    }
}

class Dog: Animal {
    override func makeSound() {
        print("\\(name): ワンワン！")
    }

    // 親の実装を呼び出してから追加処理
    override func move() {
        super.move()
        print("\\(name)は走っています！")
    }
}

class Cat: Animal {
    override func makeSound() {
        print("\\(name): ニャーニャー")
    }
}

class Fish: Animal {
    override func move() {
        print("\\(name)が泳いでいます")
    }
}

let animals: [Animal] = [
    Dog(name: "ポチ"),
    Cat(name: "タマ"),
    Fish(name: "金魚"),
]

for animal in animals {
    animal.makeSound()
}

print("---移動---")
let dog = Dog(name: "ポチ")
dog.move()`}
          expectedOutput={`ポチ: ワンワン！
タマ: ニャーニャー
金魚: ...（無音）
---移動---
ポチが移動します
ポチは走っています！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 算出プロパティのオーバーライド</h2>
        <SwiftEditor
          defaultCode={`class Employee {
    var name: String
    var baseSalary: Double

    init(name: String, baseSalary: Double) {
        self.name = name
        self.baseSalary = baseSalary
    }

    var totalSalary: Double {
        return baseSalary
    }

    func printSalary() {
        print("\\(name) の給与: \\(totalSalary)円")
    }
}

class Manager: Employee {
    var bonus: Double

    init(name: String, baseSalary: Double, bonus: Double) {
        self.bonus = bonus
        super.init(name: name, baseSalary: baseSalary)
    }

    override var totalSalary: Double {
        return baseSalary + bonus
    }
}

class PartTimer: Employee {
    var hoursWorked: Double
    var hourlyRate: Double

    init(name: String, hoursWorked: Double, hourlyRate: Double) {
        self.hoursWorked = hoursWorked
        self.hourlyRate = hourlyRate
        super.init(name: name, baseSalary: 0)
    }

    override var totalSalary: Double {
        return hoursWorked * hourlyRate
    }
}

let employees: [Employee] = [
    Employee(name: "田中", baseSalary: 300000),
    Manager(name: "鈴木部長", baseSalary: 400000, bonus: 100000),
    PartTimer(name: "佐藤", hoursWorked: 80, hourlyRate: 1200),
]

for emp in employees {
    emp.printSalary()
}`}
          expectedOutput={`田中 の給与: 300000.0円
鈴木部長 の給与: 500000.0円
佐藤 の給与: 96000.0円`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: finalキーワードの使用</h2>
        <SwiftEditor
          defaultCode={`class BaseLogger {
    var prefix: String

    init(prefix: String) {
        self.prefix = prefix
    }

    // オーバーライド可能なメソッド
    func formatMessage(_ message: String) -> String {
        return "[\\(prefix)] \\(message)"
    }

    // オーバーライド禁止メソッド
    final func log(_ message: String) {
        print(formatMessage(message))
    }
}

class TimestampLogger: BaseLogger {
    init() {
        super.init(prefix: "LOG")
    }

    // formatMessageはオーバーライド可能
    override func formatMessage(_ message: String) -> String {
        return "[\\(prefix)][2024-01-01] \\(message)"
    }

    // log()はfinalなのでオーバーライド不可
    // override func log(_ message: String) { } // コンパイルエラー
}

class ErrorLogger: BaseLogger {
    init() {
        super.init(prefix: "ERROR")
    }

    override func formatMessage(_ message: String) -> String {
        return "🚨 [\\(prefix)] \\(message) 🚨"
    }
}

let loggers: [BaseLogger] = [
    BaseLogger(prefix: "INFO"),
    TimestampLogger(),
    ErrorLogger(),
]

for logger in loggers {
    logger.log("アプリケーション起動")
}`}
          expectedOutput={`[INFO] アプリケーション起動
[LOG][2024-01-01] アプリケーション起動
🚨 [ERROR] アプリケーション起動 🚨`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="overriding" />
      </div>
      <LessonNav lessons={lessons} currentId="overriding" basePath="/learn/classes" />
    </div>
  );
}
