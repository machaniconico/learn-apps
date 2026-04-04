import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "classes")!.lessons;

export default function TypeCastingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">クラス レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型キャスト</h1>
        <p className="text-gray-400">is・as・as?・as!を使ってインスタンスの型を検査・変換する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型チェック（is）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">is</code>演算子はインスタンスが特定の型のインスタンスであるかを確認します。
          結果は<code className="text-red-300">true</code>または<code className="text-red-300">false</code>のBool値です。
          継承関係がある場合、子クラスのインスタンスは親クラスの型チェックでも<code className="text-red-300">true</code>になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">instance is SomeClass</code> — 型チェック</li>
          <li>子クラスのインスタンスは親クラスの<code className="text-red-300">is</code>チェックでもtrueになる</li>
          <li>switch文と組み合わせて型で分岐できる</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ダウンキャスト（as? / as!）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">ダウンキャスト</strong>とは、親クラス型の変数を子クラス型に変換することです。
          <code className="text-red-300">as?</code>はオプショナル型を返し、失敗した場合は<code className="text-red-300">nil</code>になります（安全）。
          <code className="text-red-300">as!</code>は強制的にキャストし、失敗するとクラッシュします（危険・確実な場合のみ使用）。
          通常は<code className="text-red-300">as?</code>を使うことが推奨されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">instance as? SubClass</code> — 安全なダウンキャスト（オプショナル）</li>
          <li><code className="text-red-300">instance as! SubClass</code> — 強制ダウンキャスト（失敗するとクラッシュ）</li>
          <li><code className="text-red-300">as?</code>はif let / guard letと組み合わせて使う</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Any と AnyObject</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-300">Any</code>はSwiftのすべての型（クラス、struct、enum、関数など）のインスタンスを保持できる特殊な型です。
          <code className="text-red-300">AnyObject</code>はクラスのインスタンスのみを保持できます。
          これらと型キャストを組み合わせることで、異なる型を同じコレクションに格納して扱えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-red-300">Any</code> — あらゆる型を保持できる（Int、String、クラスなど）</li>
          <li><code className="text-red-300">AnyObject</code> — クラスのインスタンスのみ保持できる</li>
          <li><code className="text-red-300">as?</code>で元の型に戻して使う</li>
          <li>型情報が失われるため、必要な場合のみ使用する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: isによる型チェック</h2>
        <SwiftEditor
          defaultCode={`class MediaItem {
    var title: String
    init(title: String) { self.title = title }
}

class Movie: MediaItem {
    var director: String
    init(title: String, director: String) {
        self.director = director
        super.init(title: title)
    }
}

class Song: MediaItem {
    var artist: String
    init(title: String, artist: String) {
        self.artist = artist
        super.init(title: title)
    }
}

let library: [MediaItem] = [
    Movie(title: "千と千尋の神隠し", director: "宮崎駿"),
    Song(title: "上を向いて歩こう", artist: "坂本九"),
    Movie(title: "もののけ姫", director: "宮崎駿"),
    Song(title: "さくらさくら", artist: "伝統"),
    Movie(title: "となりのトトロ", director: "宮崎駿"),
]

var movieCount = 0
var songCount = 0

for item in library {
    if item is Movie {
        movieCount += 1
    } else if item is Song {
        songCount += 1
    }
}

print("ライブラリ: \\(library.count)件")
print("映画: \\(movieCount)件")
print("曲: \\(songCount)件")`}
          expectedOutput={`ライブラリ: 5件
映画: 3件
曲: 2件`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: as? によるダウンキャスト</h2>
        <SwiftEditor
          defaultCode={`class Animal {
    var name: String
    init(name: String) { self.name = name }
    func describe() { print("動物: \\(name)") }
}

class Dog: Animal {
    var breed: String
    init(name: String, breed: String) {
        self.breed = breed
        super.init(name: name)
    }
    func bark() { print("\\(name): ワンワン！") }
}

class Bird: Animal {
    var canFly: Bool
    init(name: String, canFly: Bool) {
        self.canFly = canFly
        super.init(name: name)
    }
    func chirp() { print("\\(name): チュンチュン") }
}

let animals: [Animal] = [
    Dog(name: "ポチ", breed: "柴犬"),
    Bird(name: "ピーちゃん", canFly: true),
    Dog(name: "コロ", breed: "トイプードル"),
    Bird(name: "ペンギン", canFly: false),
]

for animal in animals {
    if let dog = animal as? Dog {
        print("犬 - \\(dog.name) (\\(dog.breed))")
        dog.bark()
    } else if let bird = animal as? Bird {
        let flyStr = bird.canFly ? "飛べる" : "飛べない"
        print("鳥 - \\(bird.name) (\\(flyStr))")
        bird.chirp()
    }
}`}
          expectedOutput={`犬 - ポチ (柴犬)
ポチ: ワンワン！
鳥 - ピーちゃん (飛べる)
ピーちゃん: チュンチュン
犬 - コロ (トイプードル)
コロ: ワンワン！
鳥 - ペンギン (飛べない)
ペンギン: チュンチュン`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: AnyとしてのコレクションとAnyへのキャスト</h2>
        <SwiftEditor
          defaultCode={`// Anyで様々な型を同じ配列に格納
let mixedArray: [Any] = [
    42,
    "こんにちは",
    3.14,
    true,
    [1, 2, 3],
]

print("=== Any配列の中身を型別に処理 ===")
for item in mixedArray {
    switch item {
    case let int as Int:
        print("整数: \\(int)")
    case let string as String:
        print("文字列: \\(string)")
    case let double as Double:
        print("小数: \\(double)")
    case let bool as Bool:
        print("真偽値: \\(bool)")
    case let array as [Int]:
        print("Int配列: \\(array)")
    default:
        print("不明な型: \\(item)")
    }
}

print("\\n=== as!の強制キャスト（確実な場合のみ使用）===")
let value: Any = "Swift"
let str = value as! String  // 確実にStringとわかっているので強制キャスト
print("強制キャスト成功: \\(str.uppercased())")`}
          expectedOutput={`=== Any配列の中身を型別に処理 ===
整数: 42
文字列: こんにちは
小数: 3.14
真偽値: true
Int配列: [1, 2, 3]

=== as!の強制キャスト（確実な場合のみ使用）===
強制キャスト成功: SWIFT`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="type-casting" />
      </div>
      <LessonNav lessons={lessons} currentId="type-casting" basePath="/learn/classes" />
    </div>
  );
}
