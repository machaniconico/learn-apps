import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "memory")!.lessons;

export default function StrongWeakUnownedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">メモリ管理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">strong / weak / unowned</h1>
        <p className="text-gray-400">3種類の参照の違いと適切な使い分けを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">参照の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftには3種類の参照があります。デフォルトは<code className="text-pink-300">strong</code>で参照カウントを増加させます。
          <code className="text-pink-300">weak</code>と<code className="text-pink-300">unowned</code>は参照カウントを増やさず、循環参照を防ぐために使います。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300 border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 pr-4 text-gray-400">種類</th>
                <th className="text-left py-2 pr-4 text-gray-400">参照カウント</th>
                <th className="text-left py-2 pr-4 text-gray-400">型</th>
                <th className="text-left py-2 text-gray-400">用途</th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              <tr className="border-b border-gray-800">
                <td className="py-2 pr-4 text-pink-300 font-mono">strong</td>
                <td className="py-2 pr-4">増える</td>
                <td className="py-2 pr-4">通常型</td>
                <td className="py-2">デフォルト。所有権あり</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 pr-4 text-pink-300 font-mono">weak</td>
                <td className="py-2 pr-4">増えない</td>
                <td className="py-2 pr-4">オプショナル (T?)</td>
                <td className="py-2">参照先がnilになる可能性あり</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-pink-300 font-mono">unowned</td>
                <td className="py-2 pr-4">増えない</td>
                <td className="py-2 pr-4">非オプショナル (T)</td>
                <td className="py-2">参照先が必ず存在する前提</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strong参照（デフォルト）</h2>
        <p className="text-gray-400 mb-4">
          通常のプロパティはすべてstrong参照です。参照カウントを増加させ、インスタンスの生存を保証します。
        </p>
        <SwiftEditor
          defaultCode={`class House {
    let address: String
    // strong参照（デフォルト）
    var owner: Person?

    init(address: String) { self.address = address }
    deinit { print("家 '\\(address)' 解放") }
}

class Person {
    let name: String
    // strong参照（デフォルト）
    var house: House?

    init(name: String) { self.name = name }
    deinit { print("人 '\\(name)' 解放") }
}

var person: Person? = Person(name: "田中")
var house: House? = House(address: "東京都")

// 両方がstrongで互いを参照 → 循環参照！
person?.house = house
house?.owner = person

person = nil  // 解放されない（循環参照）
house = nil   // 解放されない（循環参照）
print("メモリリーク発生中")`}
          expectedOutput={`メモリリーク発生中
// deinitが呼ばれていない = メモリリーク`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">weak参照で循環参照を解決</h2>
        <p className="text-gray-400 mb-4">
          一方の参照を<code className="text-pink-300">weak</code>にすると循環参照を防げます。
          weakは必ずオプショナル型になります。
        </p>
        <SwiftEditor
          defaultCode={`class Owner {
    let name: String
    var pet: Pet?
    init(name: String) { self.name = name }
    deinit { print("\\(name) 解放") }
}

class Pet {
    let name: String
    // weakで循環参照を防ぐ
    weak var owner: Owner?
    init(name: String) { self.name = name }
    deinit { print("\\(name) 解放") }
}

var owner: Owner? = Owner(name: "田中")
var pet: Pet? = Pet(name: "ポチ")

owner?.pet = pet
pet?.owner = owner

print("オーナー名:", pet?.owner?.name ?? "なし")

owner = nil  // → ownerが解放される
// weakなのでpet?.ownerはnilになる
print("解放後のオーナー名:", pet?.owner?.name ?? "nil")

pet = nil    // → petも解放される`}
          expectedOutput={`オーナー名: 田中
田中 解放
解放後のオーナー名: nil
ポチ 解放`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">unowned参照</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">unowned</code>は参照先が必ず存在することが保証される場合に使います。
          nilにならないので非オプショナル型ですが、解放後にアクセスするとクラッシュします。
        </p>
        <SwiftEditor
          defaultCode={`class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) { self.name = name }
    deinit { print("顧客 '\\(name)' 解放") }
}

class CreditCard {
    let number: String
    // カードは必ず顧客に紐づく → unowned
    unowned let customer: Customer

    init(number: String, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit { print("カード '\\(number)' 解放") }
}

var customer: Customer? = Customer(name: "山田")
customer?.card = CreditCard(number: "1234-5678", customer: customer!)

print("カード保有者:", customer?.card?.customer.name ?? "不明")

customer = nil  // 顧客とカード両方が解放される`}
          expectedOutput={`カード保有者: 山田
顧客 '山田' 解放
カード '1234-5678' 解放`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="strong-weak-unowned" />
      </div>
      <LessonNav lessons={lessons} currentId="strong-weak-unowned" basePath="/learn/memory" />
    </div>
  );
}
