import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "structs")!.lessons;

export default function ComputedPropertiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">構造体 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">算出プロパティ</h1>
        <p className="text-gray-400">get・setを使って他のプロパティから計算される値を定義する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">算出プロパティとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          算出プロパティ（Computed Property）は、実際に値を保存せず、<strong className="text-white">他のプロパティや計算から値を導き出す</strong>プロパティです。
          <code className="text-orange-300">get</code>ブロックで値を返す処理を書き、アクセスのたびに計算されます。
          <code className="text-orange-300">set</code>ブロックを追加すると書き込みも可能になります。<code className="text-orange-300">get</code>のみの場合は読み取り専用です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">var プロパティ名: 型 &#123; get &#123; ... &#125; &#125;</code> — 読み取り専用算出プロパティ</li>
          <li><code className="text-orange-300">var プロパティ名: 型 &#123; return ... &#125;</code> — getの省略形</li>
          <li><code className="text-orange-300">get &#123; &#125; set &#123; &#125;</code> — 読み書き両用</li>
          <li>算出プロパティは必ず<code className="text-orange-300">var</code>で宣言（<code className="text-orange-300">let</code>不可）</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">getとsetの使い方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-orange-300">set</code>ブロックでは、代入された値が<code className="text-orange-300">newValue</code>という名前で自動的に使えます。
          カスタム名を使いたい場合は<code className="text-orange-300">set(カスタム名)</code>と書けます。
          <code className="text-orange-300">set</code>を使うことで、1つのプロパティへの代入が他のプロパティを更新するような双方向の変換を実装できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">set &#123; newValue &#125;</code> — 暗黙の引数<code className="text-orange-300">newValue</code></li>
          <li><code className="text-orange-300">set(value) &#123; ... &#125;</code> — カスタム名</li>
          <li>setでは元となるストアドプロパティを更新する</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ストアドプロパティとの使い分け</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          算出プロパティはアクセスのたびに再計算されるため、元のデータが変わると自動的に最新値が返ります。
          常に最新の計算結果が必要なプロパティや、他のプロパティの変換値として使いたい場合に適しています。
          一方、変更されない固定値や、計算コストが高くキャッシュしたい値はストアドプロパティが適しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>算出プロパティ: 毎回計算、常に最新値</li>
          <li>ストアドプロパティ: 値を保存、明示的な更新が必要</li>
          <li>読み取り専用の算出プロパティは<code className="text-orange-300">get</code>を省略できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 読み取り専用の算出プロパティ</h2>
        <SwiftEditor
          defaultCode={`struct Rectangle {
    var width: Double
    var height: Double

    // getのみ（省略形）
    var area: Double {
        return width * height
    }

    var perimeter: Double {
        return (width + height) * 2
    }

    var isSquare: Bool {
        return width == height
    }

    var diagonal: Double {
        return (width * width + height * height).squareRoot()
    }
}

var rect = Rectangle(width: 6.0, height: 4.0)
print("幅: \\(rect.width), 高さ: \\(rect.height)")
print("面積: \\(rect.area)")
print("周囲: \\(rect.perimeter)")
print("正方形か: \\(rect.isSquare)")
print("対角線: \\(String(format: "%.2f", rect.diagonal))")

// 元のプロパティを変更すると算出プロパティも自動更新
rect.width = 5.0
rect.height = 5.0
print("\\n変更後: 幅\\(rect.width) 高さ\\(rect.height)")
print("正方形か: \\(rect.isSquare)")
print("面積: \\(rect.area)")`}
          expectedOutput={`幅: 6.0, 高さ: 4.0
面積: 24.0
周囲: 20.0
正方形か: false
対角線: 7.21

変更後: 幅5.0 高さ5.0
正方形か: true
面積: 25.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: getとsetを持つ算出プロパティ</h2>
        <SwiftEditor
          defaultCode={`struct Temperature {
    var celsius: Double

    // celsiusをベースに華氏を読み書き
    var fahrenheit: Double {
        get {
            return celsius * 9 / 5 + 32
        }
        set {
            // 華氏を設定するとcelsiusが更新される
            celsius = (newValue - 32) * 5 / 9
        }
    }

    var kelvin: Double {
        get { celsius + 273.15 }
        set { celsius = newValue - 273.15 }
    }
}

var temp = Temperature(celsius: 0)
print("水の融点: \\(temp.celsius)°C = \\(temp.fahrenheit)°F = \\(temp.kelvin)K")

// 華氏で設定 → 摂氏も自動更新
temp.fahrenheit = 212
print("沸点（華氏212°F）: \\(temp.celsius)°C = \\(temp.kelvin)K")

// ケルビンで設定
temp.kelvin = 300
print("300K: \\(String(format: "%.2f", temp.celsius))°C = \\(String(format: "%.2f", temp.fahrenheit))°F")`}
          expectedOutput={`水の融点: 0.0°C = 32.0°F = 273.15K
沸点（華氏212°F）: 100.0°C = 373.15K
300K: 26.85°C = 80.33°F`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 算出プロパティの実践活用</h2>
        <SwiftEditor
          defaultCode={`struct ShoppingCart {
    var items: [(name: String, price: Double, quantity: Int)]

    var subtotal: Double {
        items.reduce(0) { $0 + $1.price * Double($1.quantity) }
    }

    var taxAmount: Double {
        subtotal * 0.1
    }

    var total: Double {
        subtotal + taxAmount
    }

    var itemCount: Int {
        items.reduce(0) { $0 + $1.quantity }
    }

    var isEmpty: Bool {
        items.isEmpty
    }
}

var cart = ShoppingCart(items: [
    (name: "りんご", price: 150.0, quantity: 3),
    (name: "牛乳", price: 200.0, quantity: 2),
    (name: "パン", price: 250.0, quantity: 1)
])

print("商品数: \\(cart.itemCount)個")
print("小計: \\(cart.subtotal)円")
print("消費税(10%): \\(cart.taxAmount)円")
print("合計: \\(cart.total)円")`}
          expectedOutput={`商品数: 6個
小計: 1100.0円
消費税(10%): 110.0円
合計: 1210.0円`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="computed-properties" />
      </div>
      <LessonNav lessons={lessons} currentId="computed-properties" basePath="/learn/structs" />
    </div>
  );
}
