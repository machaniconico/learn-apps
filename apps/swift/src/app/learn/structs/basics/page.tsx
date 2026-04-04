import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "structs")!.lessons;

export default function StructBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">構造体 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造体の基本</h1>
        <p className="text-gray-400">structキーワードを使って構造体を定義し、値型の特徴を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体はSwiftの基本的な型のひとつで、<code className="text-orange-300">struct</code>キーワードを使って定義します。
          データ（プロパティ）と振る舞い（メソッド）をひとまとめにできます。
          クラスと似ていますが、構造体は<strong className="text-white">値型</strong>であり、変数に代入したり関数に渡したりすると<strong className="text-white">コピー</strong>が作られます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">struct 構造体名 &#123; &#125;</code> — 構造体の定義</li>
          <li><code className="text-orange-300">var / let</code> — プロパティの宣言</li>
          <li><code className="text-orange-300">func</code> — メソッドの定義</li>
          <li>構造体は<strong className="text-white">値型</strong>（クラスは参照型）</li>
          <li>Swiftの標準型（Int, String, Array等）はすべて構造体</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">値型と参照型の違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体（値型）をコピーすると、それぞれが独立したデータを持ちます。一方のデータを変更しても、もう一方には影響しません。
          これにより予測しやすい動作が保証され、安全なコードが書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>値型: コピー時に独立したデータが作られる</li>
          <li>参照型（クラス）: コピー時に同じオブジェクトへの参照が共有される</li>
          <li>Swiftは構造体（値型）の使用を推奨している</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インスタンスの生成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体のインスタンスは<code className="text-orange-300">構造体名()</code>のように呼び出して生成します。
          イニシャライザを定義しなくても、Swiftは自動的に全プロパティを引数に取る<strong className="text-white">メンバーワイズイニシャライザ</strong>を提供します。
          生成したインスタンスのプロパティには<code className="text-orange-300">.</code>（ドット記法）でアクセスします。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">let p = Point(x: 1, y: 2)</code> — インスタンス生成</li>
          <li><code className="text-orange-300">p.x</code> — プロパティアクセス</li>
          <li><code className="text-orange-300">var</code>で宣言したインスタンスのみプロパティ変更可能</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: シンプルな構造体の定義</h2>
        <SwiftEditor
          defaultCode={`struct Point {
    var x: Double
    var y: Double
}

// メンバーワイズイニシャライザを使ってインスタンスを生成
let origin = Point(x: 0, y: 0)
let p1 = Point(x: 3.0, y: 4.0)

print("原点: (\\(origin.x), \\(origin.y))")
print("点P1: (\\(p1.x), \\(p1.y))")

// 距離の計算
let distance = (p1.x * p1.x + p1.y * p1.y).squareRoot()
print("原点からの距離: \\(distance)")`}
          expectedOutput={`原点: (0.0, 0.0)
点P1: (3.0, 4.0)
原点からの距離: 5.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 値型のコピー動作</h2>
        <SwiftEditor
          defaultCode={`struct Temperature {
    var celsius: Double
}

var temp1 = Temperature(celsius: 20.0)
var temp2 = temp1  // コピーが作られる

// temp2を変更してもtemp1は変わらない
temp2.celsius = 30.0

print("temp1: \\(temp1.celsius)°C")
print("temp2: \\(temp2.celsius)°C")
print("それぞれ独立したデータを持っています")`}
          expectedOutput={`temp1: 20.0°C
temp2: 30.0°C
それぞれ独立したデータを持っています`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 複数のプロパティを持つ構造体</h2>
        <SwiftEditor
          defaultCode={`struct Book {
    let title: String
    let author: String
    var pageCount: Int
    var isRead: Bool
}

var book1 = Book(title: "Swift入門", author: "田中太郎", pageCount: 300, isRead: false)
var book2 = Book(title: "アルゴリズム", author: "鈴木花子", pageCount: 450, isRead: true)

print("書籍1: \\(book1.title) by \\(book1.author)")
print("ページ数: \\(book1.pageCount)ページ")
print("読了: \\(book1.isRead ? "済み" : "未読")")

// 読了に変更
book1.isRead = true
print("読了状態を更新: \\(book1.isRead ? "済み" : "未読")")

print("")
print("書籍2: \\(book2.title)")
print("読了: \\(book2.isRead ? "済み" : "未読")")`}
          expectedOutput={`書籍1: Swift入門 by 田中太郎
ページ数: 300ページ
読了: 未読
読了状態を更新: 済み

書籍2: アルゴリズム
読了: 済み`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/structs" />
    </div>
  );
}
