import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "advanced")!.lessons;

export default function ExistentialTypesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">上級機能</span>
        <h1 className="text-3xl font-bold text-gray-100">Existential型</h1>
        <p className="text-gray-400">any Protocol による existential 型を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          Existential型（<code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">any Protocol</code>）は
          プロトコルに準拠した任意の型の値を保持できるボックス型です。
          Swift 5.7から <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">any</code> キーワードが必須になりました。
          実行時に型情報を保持するため、<code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">some</code> よりオーバーヘッドがあります。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`protocol Logger {
    func log(_ message: String)
}

struct ConsoleLogger: Logger {
    func log(_ message: String) { print("[Console] \\(message)") }
}

struct FileLogger: Logger {
    let filename: String
    func log(_ message: String) { print("[File:\\(filename)] \\(message)") }
}

struct NetworkLogger: Logger {
    let endpoint: String
    func log(_ message: String) { print("[Network:\\(endpoint)] \\(message)") }
}

// any Logger: 実行時に異なる型を保持
var logger: any Logger = ConsoleLogger()
logger.log("App started")  // [Console] App started

logger = FileLogger(filename: "app.log")
logger.log("User logged in")  // [File:app.log] User logged in

// 配列に異なる Logger を混在させる
let loggers: [any Logger] = [
    ConsoleLogger(),
    FileLogger(filename: "error.log"),
    NetworkLogger(endpoint: "https://logs.example.com"),
]

for l in loggers {
    l.log("Hello")
}`}
        height="320px"
        expectedOutput="[Console] App started\n[File:app.log] User logged in\n[Console] Hello\n[File:error.log] Hello\n[Network:https://logs.example.com] Hello"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">型チェックとキャスト</h2>
        <p>
          existential型から具体型に戻すには <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-300">as?</code> ダウンキャストを使います。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`protocol Describable {
    var description: String { get }
}

struct Cat: Describable {
    let name: String
    var description: String { "Cat: \\(name)" }
    func purr() { print("Purr...") }
}

struct Bird: Describable {
    let species: String
    var description: String { "Bird: \\(species)" }
    func chirp() { print("Tweet!") }
}

let animals: [any Describable] = [
    Cat(name: "Mochi"),
    Bird(species: "Sparrow"),
    Cat(name: "Kuro"),
]

for animal in animals {
    print(animal.description)

    // 具体型にダウンキャスト
    if let cat = animal as? Cat {
        cat.purr()
    } else if let bird = animal as? Bird {
        bird.chirp()
    }
}`}
        height="300px"
        expectedOutput="Cat: Mochi\nPurr...\nBird: Sparrow\nTweet!\nCat: Kuro\nPurr..."
      />

      <SwiftEditor
        defaultCode={`// any vs some の選択基準

// some を使うべきとき:
// - 戻り値型として、常に同じ具体型を返す
// - パフォーマンスが重要
// - SwiftUI の body など
func makeGreeter() -> some CustomStringConvertible {
    "Hello, Swift!"  // String
}

// any を使うべきとき:
// - 変数に異なる型を代入したい
// - 配列に異なる型を混在させたい
// - 実行時に型が決まる
func makeLogger(type: String) -> any TextOutputStream {
    // 実際は適切な実装を返す
    var output = ""
    return output as any TextOutputStream
}

// Swift 5.7+ では any なしの暗黙的 existential に警告が出る
// 古いコード:  let logger: Logger = ConsoleLogger()  // 警告
// 新しいコード: let logger: any Logger = ConsoleLogger()  // OK

print(makeGreeter())  // Hello, Swift!`}
        height="280px"
        expectedOutput="Hello, Swift!"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="advanced" lessonId="existential-types" />
      </div>
      <LessonNav lessons={lessons} currentId="existential-types" basePath="/learn/advanced" />
    </div>
  );
}
