import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "optionals")!.lessons;

export default function OptionalChainingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">Optional型 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オプショナルチェーン</h1>
        <p className="text-gray-400">?.による連鎖アクセス</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">オプショナルチェーンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オプショナルチェーンは、nilの可能性があるOptional型の値に対して、<code className="text-pink-300">?.</code>を使ってプロパティやメソッドに安全にアクセスする機能です。
          チェーンの途中でnilが見つかった場合、残りの評価がスキップされてnilが返されます。
          アンラップせずに簡潔にアクセスできるため、ネストしたオブジェクトに対して特に有効です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">optional?.property</code> — プロパティへの連鎖アクセス</li>
          <li><code className="text-pink-300">optional?.method()</code> — メソッドの連鎖呼び出し</li>
          <li><code className="text-pink-300">optional?.property?.subProperty</code> — 多段チェーン</li>
          <li>チェーンの結果は常にOptional型になる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">チェーンの結果型</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オプショナルチェーンを経由したアクセスの結果は、元の型が何であれ常にOptional型になります。
          例えば、<code className="text-pink-300">String</code>を返すプロパティでも、チェーンを経由すると<code className="text-pink-300">String?</code>になります。
          したがって、チェーンの結果を使うには<code className="text-pink-300">if let</code>や<code className="text-pink-300">??</code>でアンラップする必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">String</code>を返すプロパティも<code className="text-pink-300">?.property</code>経由では<code className="text-pink-300">String?</code></li>
          <li><code className="text-pink-300">Void</code>を返すメソッドも<code className="text-pink-300">?.method()</code>では<code className="text-pink-300">Void?</code></li>
          <li>チェーンに成功した場合は値がラップされて返る</li>
          <li>いずれかがnilなら結果全体がnilになる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">添字アクセスとオプショナルチェーン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列や辞書などの添字アクセスもオプショナルチェーンと組み合わせることができます。
          Optional型の配列への添字アクセスは<code className="text-pink-300">optArray?[0]</code>のように書きます。
          ディクショナリの値はもともとOptionalを返すため、チェーンと組み合わせると二重のOptionalになることに注意が必要です。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: プロパティとメソッドへの連鎖アクセス</h2>
        <SwiftEditor
          defaultCode={`class Address {
    var city: String
    var zipCode: String

    init(city: String, zipCode: String) {
        self.city = city
        self.zipCode = zipCode
    }
}

class Person {
    var name: String
    var address: Address?

    init(name: String) {
        self.name = name
    }
}

let alice = Person(name: "Alice")
alice.address = Address(city: "東京", zipCode: "100-0001")

let bob = Person(name: "Bob")
// bobのaddressはnil

// オプショナルチェーンでアクセス
if let city = alice.address?.city {
    print("Aliceの都市: \\(city)")
}

// nilの場合はnilが返る
let bobCity = bob.address?.city
print("Bobの都市: \\(bobCity ?? "不明")")`}
          expectedOutput={`Aliceの都市: 東京
Bobの都市: 不明`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: メソッド呼び出しの連鎖</h2>
        <SwiftEditor
          defaultCode={`class Dog {
    var name: String
    var tricks: [String]

    init(name: String) {
        self.name = name
        self.tricks = []
    }

    func learn(trick: String) {
        tricks.append(trick)
    }

    func perform() -> String {
        if tricks.isEmpty {
            return "\\(name)は何も知りません"
        }
        return "\\(name)が\\(tricks.joined(separator: "と"))を披露！"
    }
}

class Owner {
    var name: String
    var pet: Dog?

    init(name: String) {
        self.name = name
    }
}

let owner = Owner(name: "田中")
owner.pet = Dog(name: "ポチ")
owner.pet?.learn(trick: "おすわり")
owner.pet?.learn(trick: "おて")

// メソッドの結果もOptionalになる
let result = owner.pet?.perform()
print(result ?? "ペットがいません")

let owner2 = Owner(name: "鈴木")
let result2 = owner2.pet?.perform()
print(result2 ?? "ペットがいません")`}
          expectedOutput={`ポチがおすわりとおてを披露！
ペットがいません`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 多段オプショナルチェーン</h2>
        <SwiftEditor
          defaultCode={`class Engine {
    var horsepower: Int
    init(hp: Int) { self.horsepower = hp }

    func describe() -> String {
        return "\\(horsepower)馬力"
    }
}

class Car {
    var model: String
    var engine: Engine?
    init(model: String) { self.model = model }
}

class Garage {
    var car: Car?
}

let garage = Garage()
garage.car = Car(model: "スポーツカー")
garage.car?.engine = Engine(hp: 300)

// 多段チェーン
if let hp = garage.car?.engine?.horsepower {
    print("エンジン出力: \\(hp)馬力")
}

// メソッドまでチェーン
let desc = garage.car?.engine?.describe()
print("エンジン: \\(desc ?? "不明")")

// engineがnilの場合
let garage2 = Garage()
garage2.car = Car(model: "電気自動車")
let desc2 = garage2.car?.engine?.describe()
print("エンジン: \\(desc2 ?? "なし（電気自動車）")")`}
          expectedOutput={`エンジン出力: 300馬力
エンジン: 300馬力
エンジン: なし（電気自動車）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="optionals" lessonId="optional-chaining" />
      </div>
      <LessonNav lessons={lessons} currentId="optional-chaining" basePath="/learn/optionals" />
    </div>
  );
}
