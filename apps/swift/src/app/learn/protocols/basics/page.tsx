import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "protocols")!.lessons;

export default function ProtocolBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プロトコル レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロトコルの基本</h1>
        <p className="text-gray-400">protocolキーワードを使ってメソッドやプロパティの要件を定義しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロトコルとは</h2>
        <p className="text-gray-300 mb-3">
          プロトコルは型が実装すべきメソッド・プロパティ・その他の要件のブループリント（設計図）です。
          <code className="text-teal-300">protocol</code> キーワードで定義し、
          構造体・クラス・列挙型が <code className="text-teal-300">:</code> で準拠を宣言します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-300">protocol Name {"{ }"}</code> — プロトコルの定義</li>
          <li>プロパティ要件には <code className="text-teal-300">{"{ get }"}</code> または <code className="text-teal-300">{"{ get set }"}</code> を指定</li>
          <li>メソッド要件はボディなしで宣言する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: プロトコルの定義と準拠</h2>
        <SwiftEditor
          defaultCode={`protocol Animal {
    var name: String { get }
    var sound: String { get }
    func makeSound()
}

struct Dog: Animal {
    var name: String
    var sound: String = "ワン"
    func makeSound() {
        print("\\(name): \\(sound)！")
    }
}

struct Cat: Animal {
    var name: String
    var sound: String = "ニャー"
    func makeSound() {
        print("\\(name): \\(sound)！")
    }
}

let dog = Dog(name: "ポチ")
let cat = Cat(name: "タマ")
dog.makeSound()
cat.makeSound()`}
          expectedOutput={`ポチ: ワン！
タマ: ニャー！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: プロトコルを型として使う</h2>
        <SwiftEditor
          defaultCode={`protocol Drawable {
    func draw() -> String
}

struct Circle: Drawable {
    var radius: Double
    func draw() -> String { "円(半径\\(radius))" }
}

struct Rectangle: Drawable {
    var width: Double
    var height: Double
    func draw() -> String { "矩形(\\(width)x\\(height))" }
}

// プロトコルを型として配列に格納
let shapes: [any Drawable] = [
    Circle(radius: 5),
    Rectangle(width: 3, height: 4),
    Circle(radius: 1),
]

for shape in shapes {
    print(shape.draw())
}`}
          expectedOutput={`円(半径5.0)
矩形(3.0x4.0)
円(半径1.0)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="protocols" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/protocols" />
    </div>
  );
}
