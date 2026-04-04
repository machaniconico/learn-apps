import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "generics")!.lessons;

export default function TypeErasurePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">ジェネリクス レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">型消去</h1>
        <p className="text-gray-400">型消去パターンで具体的な型情報を隠蔽し、柔軟なAPIを設計します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">型消去とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          型消去（Type Erasure）とは、具体的な型情報をラッパーで包み、外部には抽象的な型として見せるパターンです。
          Swiftでは <code className="text-blue-300">any Protocol</code>（Existential Type）や、
          標準ライブラリの <code className="text-blue-300">AnySequence</code>・<code className="text-blue-300">AnyIterator</code> などが型消去の例です。
          関連型（associatedtype）を持つプロトコルは直接Existentialとして使えないため、型消去ラッパーが特に有効です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">AnySequence&lt;T&gt;</code> — 任意のSequenceを包む型消去型</li>
          <li><code className="text-blue-300">AnyIterator&lt;T&gt;</code> — 任意のIteratorProtocolを包む型消去型</li>
          <li>独自の <code className="text-blue-300">AnyXxx</code> ラッパーをクロージャで実装できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: AnyIteratorによる型消去</h2>
        <SwiftEditor
          defaultCode={`// カウントダウンイテレータを型消去で返す
func makeCountdown(from start: Int) -> AnyIterator<Int> {
    var current = start
    return AnyIterator {
        guard current >= 0 else { return nil }
        defer { current -= 1 }
        return current
    }
}

var countdown = makeCountdown(from: 5)
while let value = countdown.next() {
    print(value)
}`}
          expectedOutput={`5
4
3
2
1
0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 独自の型消去ラッパーを作成</h2>
        <SwiftEditor
          defaultCode={`// 関連型を持つプロトコル
protocol Animal {
    associatedtype Sound
    func makeSound() -> Sound
    var name: String { get }
}

// 型消去ラッパー
struct AnyAnimal<Sound> {
    let name: String
    private let _makeSound: () -> Sound

    init<A: Animal>(_ animal: A) where A.Sound == Sound {
        self.name = animal.name
        self._makeSound = animal.makeSound
    }

    func makeSound() -> Sound {
        _makeSound()
    }
}

struct Dog: Animal {
    var name: String
    func makeSound() -> String { "ワンワン！" }
}

struct Cat: Animal {
    var name: String
    func makeSound() -> String { "ニャーニャー！" }
}

// 異なる具体型を同じ配列に入れられる
let animals: [AnyAnimal<String>] = [
    AnyAnimal(Dog(name: "ポチ")),
    AnyAnimal(Cat(name: "タマ")),
]

for animal in animals {
    print("\\(animal.name): \\(animal.makeSound())")
}`}
          expectedOutput={`ポチ: ワンワン！
タマ: ニャーニャー！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: AnySequenceで異なるコレクション型を統一</h2>
        <SwiftEditor
          defaultCode={`// 条件に応じて異なるSequenceを返す
func getNumbers(reversed: Bool) -> AnySequence<Int> {
    let base = [1, 2, 3, 4, 5]
    if reversed {
        return AnySequence(base.reversed())
    } else {
        return AnySequence(base)
    }
}

let normal = getNumbers(reversed: false)
let reversed = getNumbers(reversed: true)

print("通常:")
for n in normal { print(n) }

print("逆順:")
for n in reversed { print(n) }`}
          expectedOutput={`通常:
1
2
3
4
5
逆順:
5
4
3
2
1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="type-erasure" />
      </div>
      <LessonNav lessons={lessons} currentId="type-erasure" basePath="/learn/generics" />
    </div>
  );
}
