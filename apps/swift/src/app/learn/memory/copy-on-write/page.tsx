import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "memory")!.lessons;

export default function CopyOnWritePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">メモリ管理 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Copy-on-Write</h1>
        <p className="text-gray-400">値型を効率よくコピーする Copy-on-Write（CoW）戦略の仕組みと実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Copy-on-Write とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-300">Copy-on-Write（CoW）</code>は、値型を代入した際に即座にコピーを作らず、
          実際に変更が発生した時点で初めてコピーする最適化戦略です。
          Swift の <code className="text-pink-300">Array・Dictionary・Set・String</code> などの標準コレクションはすべて CoW を採用しており、
          不要なコピーを避けてメモリと処理効率を高めています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>代入時はバッファを共有（コピーしない）</li>
          <li>どちらかの変数が変更されたとき初めてコピーが発生</li>
          <li><code className="text-pink-300">isKnownUniquelyReferenced(_:)</code> で参照の唯一性を確認</li>
          <li>カスタム型にも CoW を実装できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: Array の Copy-on-Write 動作</h2>
        <SwiftEditor
          defaultCode={`import Foundation

var array1 = [1, 2, 3, 4, 5]
var array2 = array1  // この時点ではコピーされていない（バッファ共有）

print("変更前")
print("array1:", array1)
print("array2:", array2)

// array2 を変更した時点で初めてコピーが発生
array2.append(6)

print("\\narray2 変更後")
print("array1:", array1)  // 影響を受けない
print("array2:", array2)  // 変更されている

// 変更しなければコピーされないことを確認
var array3 = array1
var array4 = array3
// array3, array4 はまだ同じバッファを参照
print("\\n変更なし: array3 ==", array3)
print("変更なし: array4 ==", array4)`}
          expectedOutput={`変更前
array1: [1, 2, 3, 4, 5]
array2: [1, 2, 3, 4, 5]

array2 変更後
array1: [1, 2, 3, 4, 5]
array2: [1, 2, 3, 4, 5, 6]

変更なし: array3 == [1, 2, 3, 4, 5]
変更なし: array4 == [1, 2, 3, 4, 5]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: カスタム型に CoW を実装</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// CoW のバッキングストレージ（クラスで実装）
final class DataStorage {
    var values: [Int]
    init(_ values: [Int]) { self.values = values }
    init(copying other: DataStorage) { self.values = other.values }
}

// CoW を実装した値型
struct DataBuffer {
    private var storage: DataStorage

    init(_ values: [Int] = []) {
        storage = DataStorage(values)
    }

    // 変更前に唯一の参照でなければコピー
    private mutating func ensureUnique() {
        if !isKnownUniquelyReferenced(&storage) {
            storage = DataStorage(copying: storage)
            print("  [CoWコピー発生]")
        }
    }

    mutating func append(_ value: Int) {
        ensureUnique()
        storage.values.append(value)
    }

    var values: [Int] { storage.values }
}

var buf1 = DataBuffer([1, 2, 3])
var buf2 = buf1  // バッファ共有、コピーなし

print("buf2 に追加:")
buf2.append(4)  // ここで CoW コピー発生

print("buf1:", buf1.values)
print("buf2:", buf2.values)`}
          expectedOutput={`buf2 に追加:
  [CoWコピー発生]
buf1: [1, 2, 3]
buf2: [1, 2, 3, 4]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: パフォーマンスへの影響</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// CoW の恩恵: 大きな配列の代入でも低コスト
func demonstrateCoWEfficiency() {
    var original = Array(1...10)

    // 1万回代入しても、変更しない限りコピーは発生しない
    var copies: [[Int]] = []
    for _ in 0..<10 {
        copies.append(original)  // CoW: 実際のコピーなし
    }

    print("コピー数:", copies.count)
    print("全て同じ内容:", copies.allSatisfy { $0 == original })

    // 最初の変更時だけコピーが発生
    copies[0].append(999)
    print("copies[0] 変更後:", copies[0].suffix(2))
    print("copies[1] 変更なし:", copies[1].suffix(2))

    // String も CoW
    var str1 = "Swift は CoW を多用します"
    var str2 = str1
    str2 += "！"
    print("\\nstr1:", str1)
    print("str2:", str2)
}

demonstrateCoWEfficiency()`}
          expectedOutput={`コピー数: 10
全て同じ内容: true
copies[0] 変更後: [10, 999]
copies[1] 変更なし: [9, 10]

str1: Swift は CoW を多用します
str2: Swift は CoW を多用します！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="copy-on-write" />
      </div>
      <LessonNav lessons={lessons} currentId="copy-on-write" basePath="/learn/memory" />
    </div>
  );
}
