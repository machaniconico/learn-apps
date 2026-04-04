import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "classes")!.lessons;

export default function InitializersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">イニシャライザ</h1>
        <p className="text-gray-400">指定イニシャライザとコンビニエンスイニシャライザの違いと使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">指定イニシャライザ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">指定イニシャライザ（Designated Initializer）</strong>はクラスの主要な初期化処理を行うイニシャライザです。
          クラスのすべての格納プロパティを初期化し、親クラスがある場合は<code className="text-red-300">super.init()</code>を呼び出す必要があります。
          クラスには少なくとも1つの指定イニシャライザが必要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>すべてのプロパティを初期化する責任がある</li>
          <li>継承チェーン上の<code className="text-red-300">super.init()</code>を必ず呼ぶ</li>
          <li>1つのクラスに複数の指定イニシャライザを持てる</li>
          <li>キーワードなしで<code className="text-red-300">init()</code>と書く</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンビニエンスイニシャライザ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">コンビニエンスイニシャライザ（Convenience Initializer）</strong>は補助的なイニシャライザです。
          <code className="text-red-300">convenience</code>キーワードを付けて定義し、最終的には同じクラスの指定イニシャライザを<code className="text-red-300">self.init()</code>で呼び出す必要があります。
          よく使うデフォルト値の組み合わせを簡単に使えるようにするために利用します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">convenience init()</code> と書く</li>
          <li>必ず同じクラスの<code className="text-red-300">self.init()</code>を呼ぶ</li>
          <li>直接プロパティを初期化できない（指定イニシャライザに委譲する）</li>
          <li>よく使うパターンを簡略化するのに便利</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">失敗可能イニシャライザ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">init?()</code>のように<code className="text-red-300">?</code>を付けると、初期化に失敗した場合に<code className="text-red-300">nil</code>を返せる<strong className="text-white">失敗可能イニシャライザ</strong>を定義できます。
          入力値の検証が必要な場合に便利です。戻り値はオプショナル型になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">init?(...)</code> — 失敗可能イニシャライザの定義</li>
          <li>失敗時は<code className="text-red-300">return nil</code>で初期化を中断</li>
          <li>呼び出し元ではオプショナルバインディングで結果を受け取る</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 指定イニシャライザとコンビニエンスイニシャライザ</h2>
        <SwiftEditor
          defaultCode={`class Coffee {
    var name: String
    var size: String
    var milk: Bool
    var sugar: Int  // 砂糖の数

    // 指定イニシャライザ
    init(name: String, size: String, milk: Bool, sugar: Int) {
        self.name = name
        self.size = size
        self.milk = milk
        self.sugar = sugar
    }

    // コンビニエンスイニシャライザ（ブラックコーヒー用）
    convenience init(blackCoffee name: String) {
        self.init(name: name, size: "M", milk: false, sugar: 0)
    }

    // コンビニエンスイニシャライザ（カフェラテ用）
    convenience init(latte name: String, size: String = "M") {
        self.init(name: name, size: size, milk: true, sugar: 1)
    }

    func describe() {
        let milkStr = milk ? "ミルクあり" : "ブラック"
        print("\\(name) (\\(size)) - \\(milkStr), 砂糖\\(sugar)個")
    }
}

let americano = Coffee(blackCoffee: "アメリカーノ")
let latte = Coffee(latte: "カフェラテ", size: "L")
let custom = Coffee(name: "カプチーノ", size: "S", milk: true, sugar: 2)

americano.describe()
latte.describe()
custom.describe()`}
          expectedOutput={`アメリカーノ (M) - ブラック, 砂糖0個
カフェラテ (L) - ミルクあり, 砂糖1個
カプチーノ (S) - ミルクあり, 砂糖2個`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 継承とイニシャライザの連鎖</h2>
        <SwiftEditor
          defaultCode={`class Person {
    var name: String
    var age: Int

    init(name: String, age: Int) {
        self.name = name
        self.age = age
        print("Person init: \\(name), \\(age)歳")
    }

    convenience init(name: String) {
        self.init(name: name, age: 0)
        print("Person convenience init: \\(name)")
    }
}

class Student: Person {
    var studentId: String
    var grade: Int

    // 指定イニシャライザ：親のsuper.init()を呼ぶ
    init(name: String, age: Int, studentId: String, grade: Int) {
        self.studentId = studentId
        self.grade = grade
        super.init(name: name, age: age)
        print("Student init: \\(studentId), \\(grade)年生")
    }

    convenience init(name: String, studentId: String) {
        self.init(name: name, age: 18, studentId: studentId, grade: 1)
        print("Student convenience init")
    }
}

print("=== 大学生を作成 ===")
let student = Student(name: "田中", studentId: "S001", grade: 2)
print("名前: \\(student.name), 学籍番号: \\(student.studentId)")`}
          expectedOutput={`=== 大学生を作成 ===
Person init: 田中, 18歳
Student init: S001, 1年生
Student convenience init
名前: 田中, 学籍番号: S001`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 失敗可能イニシャライザ</h2>
        <SwiftEditor
          defaultCode={`class Temperature {
    var celsius: Double

    // 失敗可能イニシャライザ（絶対零度より低い値は不可）
    init?(celsius: Double) {
        if celsius < -273.15 {
            return nil  // 初期化失敗
        }
        self.celsius = celsius
    }

    var fahrenheit: Double {
        return celsius * 9 / 5 + 32
    }

    func describe() {
        print("\\(celsius)°C (\\(fahrenheit)°F)")
    }
}

// 正常な初期化
if let temp1 = Temperature(celsius: 100.0) {
    temp1.describe()
}

if let temp2 = Temperature(celsius: -10.0) {
    temp2.describe()
}

// 失敗する初期化
if let temp3 = Temperature(celsius: -300.0) {
    temp3.describe()
} else {
    print("無効な温度: -300°Cは絶対零度以下です")
}

// オプショナルチェーン
let boiling = Temperature(celsius: 100.0)
print("沸点: \\(boiling?.celsius ?? 0)°C")`}
          expectedOutput={`100.0°C (212.0°F)
-10.0°C (14.0°F)
無効な温度: -300°Cは絶対零度以下です
沸点: 100.0°C`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="initializers" />
      </div>
      <LessonNav lessons={lessons} currentId="initializers" basePath="/learn/classes" />
    </div>
  );
}
