import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "structs")!.lessons;

export default function MemberwiseInitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">構造体 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メンバーワイズイニシャライザ</h1>
        <p className="text-gray-400">Swiftが自動生成するメンバーワイズイニシャライザの仕組みと活用方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">自動生成されるイニシャライザ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体にカスタムイニシャライザを定義しない場合、Swiftはすべてのストアドプロパティを引数として受け取る<strong className="text-white">メンバーワイズイニシャライザ</strong>を自動的に生成します。
          引数の順序はプロパティの宣言順と同じです。これにより、多くの場合イニシャライザを明示的に書く必要がありません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>カスタム<code className="text-orange-300">init</code>がない場合に自動生成</li>
          <li>引数名はプロパティ名と同じ</li>
          <li>引数の順序はプロパティの宣言順</li>
          <li>カスタム<code className="text-orange-300">init</code>を定義すると自動生成は無効になる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト値との組み合わせ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロパティにデフォルト値が設定されている場合、メンバーワイズイニシャライザでその引数を省略できます。
          デフォルト値のあるプロパティは、明示的に値を渡すことも、省略してデフォルト値を使うこともできます。
          これにより、様々なパターンでインスタンスを生成できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>デフォルト値あり → 引数省略可能</li>
          <li>デフォルト値なし → 引数必須</li>
          <li>オプショナル型はデフォルト値<code className="text-orange-300">nil</code>で省略可能</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムinitとの共存</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カスタムイニシャライザを本体に定義すると、メンバーワイズイニシャライザは生成されなくなります。
          しかし、カスタムイニシャライザを<code className="text-orange-300">extension</code>に定義することで、両方を共存させることができます。
          これはSwiftのよく使われるパターンです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>本体にカスタム<code className="text-orange-300">init</code> → メンバーワイズ無効</li>
          <li><code className="text-orange-300">extension</code>にカスタム<code className="text-orange-300">init</code> → メンバーワイズ有効のまま共存</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: メンバーワイズイニシャライザの自動生成</h2>
        <SwiftEditor
          defaultCode={`struct Product {
    let id: Int
    var name: String
    var price: Double
    var stock: Int
}

// イニシャライザを定義しなくても使える
let apple = Product(id: 1, name: "りんご", price: 150.0, stock: 100)
let banana = Product(id: 2, name: "バナナ", price: 80.0, stock: 250)

print("\\(apple.name): \\(apple.price)円 (在庫: \\(apple.stock)個)")
print("\\(banana.name): \\(banana.price)円 (在庫: \\(banana.stock)個)")

// 合計金額の計算
let total = apple.price * Double(apple.stock) + banana.price * Double(banana.stock)
print("在庫総額: \\(total)円")`}
          expectedOutput={`りんご: 150.0円 (在庫: 100個)
バナナ: 80.0円 (在庫: 250個)
在庫総額: 35000.0円`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: デフォルト値と省略可能な引数</h2>
        <SwiftEditor
          defaultCode={`struct Config {
    var host: String
    var port: Int = 8080          // デフォルト値
    var isSecure: Bool = false     // デフォルト値
    var timeout: Double = 30.0    // デフォルト値
}

// hostのみ必須、残りはデフォルト値
let config1 = Config(host: "localhost")
print("\\(config1.host):\\(config1.port) secure=\\(config1.isSecure)")

// portを上書き
let config2 = Config(host: "example.com", port: 443)
print("\\(config2.host):\\(config2.port) secure=\\(config2.isSecure)")

// すべて指定
let config3 = Config(host: "api.example.com", port: 443, isSecure: true, timeout: 60.0)
print("\\(config3.host):\\(config3.port) secure=\\(config3.isSecure) timeout=\\(config3.timeout)s")`}
          expectedOutput={`localhost:8080 secure=false
example.com:443 secure=false
api.example.com:443 secure=true timeout=60.0s`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: extensionでカスタムinitと共存</h2>
        <SwiftEditor
          defaultCode={`struct Color {
    var red: Double    // 0.0〜1.0
    var green: Double
    var blue: Double
    var alpha: Double = 1.0
}

// extensionにカスタムinitを定義 → メンバーワイズも使える
extension Color {
    // 16進数文字列から生成（例: "FF8800"）
    init(hex: Int) {
        self.red   = Double((hex >> 16) & 0xFF) / 255.0
        self.green = Double((hex >> 8) & 0xFF) / 255.0
        self.blue  = Double(hex & 0xFF) / 255.0
        self.alpha = 1.0
    }

    // グレースケール
    init(gray: Double) {
        self.init(red: gray, green: gray, blue: gray, alpha: 1.0)
    }
}

// メンバーワイズイニシャライザ（本体に定義していないので使える）
let red = Color(red: 1.0, green: 0.0, blue: 0.0)
print("赤: R=\\(red.red) G=\\(red.green) B=\\(red.blue)")

// カスタムイニシャライザ
let orange = Color(hex: 0xFF8800)
print("オレンジ: R=\\(String(format: "%.2f", orange.red)) G=\\(String(format: "%.2f", orange.green)) B=\\(String(format: "%.2f", orange.blue))")

let gray = Color(gray: 0.5)
print("グレー: R=\\(gray.red) G=\\(gray.green) B=\\(gray.blue)")`}
          expectedOutput={`赤: R=1.0 G=0.0 B=0.0
オレンジ: R=1.00 G=0.53 B=0.00
グレー: R=0.5 G=0.5 B=0.5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="memberwise-init" />
      </div>
      <LessonNav lessons={lessons} currentId="memberwise-init" basePath="/learn/structs" />
    </div>
  );
}
