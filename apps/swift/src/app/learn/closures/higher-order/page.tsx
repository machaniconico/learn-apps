import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "closures")!.lessons;

export default function HigherOrderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クロージャ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">高階関数</h1>
        <p className="text-gray-400">map・filter・reduceを使った関数型プログラミングスタイルを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">高階関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          高階関数とは、関数（クロージャ）を引数として受け取るか、関数を戻り値として返す関数です。
          Swiftの配列・コレクションには <code className="text-violet-300">map</code>、
          <code className="text-violet-300">filter</code>、<code className="text-violet-300">reduce</code> などの
          高階関数が標準で用意されており、データ変換を宣言的に書けます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">map</code> — 各要素を変換して新しい配列を作る</li>
          <li><code className="text-violet-300">filter</code> — 条件を満たす要素だけを残す</li>
          <li><code className="text-violet-300">reduce</code> — 全要素を一つの値に集約する</li>
          <li><code className="text-violet-300">flatMap</code> — mapしてネストを1段階平坦化する</li>
          <li><code className="text-violet-300">compactMap</code> — nilを除去しながら変換する</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: map・filter・reduceの基本</h2>
        <SwiftEditor
          defaultCode={`let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// map: 各要素を2乗
let squared = numbers.map { $0 * $0 }
print("2乗: \\(squared)")

// filter: 偶数のみ
let evens = numbers.filter { $0 % 2 == 0 }
print("偶数: \\(evens)")

// reduce: 合計
let sum = numbers.reduce(0) { acc, n in acc + n }
print("合計: \\(sum)")

// reduce: 最大値
let maxVal = numbers.reduce(Int.min) { max($0, $1) }
print("最大: \\(maxVal)")

// チェーン: 偶数を2乗して合計
let result = numbers
    .filter { $0 % 2 == 0 }
    .map { $0 * $0 }
    .reduce(0, +)
print("偶数の2乗の合計: \\(result)")`}
          expectedOutput={`2乗: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
偶数: [2, 4, 6, 8, 10]
合計: 55
最大: 10
偶数の2乗の合計: 220`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">flatMapとcompactMap</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">flatMap</code> はネストした配列を1段階フラットにします。
          <code className="text-violet-300">compactMap</code> は変換結果の <code className="text-violet-300">nil</code> を除去しながら
          アンラップします。これらを使うとオプショナル処理が簡潔になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">flatMap</code> — <code className="text-violet-300">[[1,2],[3,4]]</code> → <code className="text-violet-300">[1,2,3,4]</code></li>
          <li><code className="text-violet-300">compactMap</code> — <code className="text-violet-300">[Int?]</code> からnilを除いた <code className="text-violet-300">[Int]</code> を返す</li>
          <li>文字列 → Intの変換（失敗はnil）にcompactMapが便利</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: flatMapとcompactMapの活用</h2>
        <SwiftEditor
          defaultCode={`// flatMap: ネスト配列を平坦化
let nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
let flat = nested.flatMap { $0 }
print("平坦化: \\(flat)")

// flatMap: 文字列分割
let sentences = ["Hello World", "Swift is fun", "Closures rock"]
let words = sentences.flatMap { $0.split(separator: " ").map(String.init) }
print("単語: \\(words)")

// compactMap: nilを除去しながら変換
let strings = ["1", "2", "three", "4", "五", "6"]
let ints = strings.compactMap { Int($0) }
print("変換成功した数値: \\(ints)")

// compactMap: オプショナルのアンラップ
let optionals: [Int?] = [1, nil, 3, nil, 5]
let nonNils = optionals.compactMap { $0 }
print("nilを除いた: \\(nonNils)")

// チェーン組み合わせ
let data = ["10", "abc", "20", "30", "xyz"]
let doubled = data
    .compactMap { Int($0) }
    .filter { $0 > 10 }
    .map { $0 * 2 }
print("変換・フィルタ・2倍: \\(doubled)")`}
          expectedOutput={`平坦化: [1, 2, 3, 4, 5, 6, 7, 8, 9]
単語: ["Hello", "World", "Swift", "is", "fun", "Closures", "rock"]
変換成功した数値: [1, 2, 4, 6]
nilを除いた: [1, 3, 5]
変換・フィルタ・2倍: [40, 60]`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタム高階関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          自分で高階関数を作ることもできます。クロージャを引数に取る関数を定義することで、
          再利用可能な汎用的な処理を作れます。これは関数型プログラミングの核心的なパターンです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>関数を返す関数（関数ファクトリ）が作れる</li>
          <li>部分適用（Partial Application）パターン</li>
          <li>関数の合成（Composition）でパイプライン処理</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: カスタム高階関数と関数合成</h2>
        <SwiftEditor
          defaultCode={`// 関数を返す関数（部分適用）
func multiplier(_ factor: Int) -> (Int) -> Int {
    return { $0 * factor }
}

let triple = multiplier(3)
let quadruple = multiplier(4)

print(triple(5))
print(quadruple(5))

let numbers = [1, 2, 3, 4, 5]
print(numbers.map(triple))

// 関数合成
func compose<T>(_ f: @escaping (T) -> T, _ g: @escaping (T) -> T) -> (T) -> T {
    return { f(g($0)) }
}

let addOne: (Int) -> Int = { $0 + 1 }
let double: (Int) -> Int = { $0 * 2 }

let doubleThenAdd = compose(addOne, double)  // addOne(double(x))
let addThenDouble = compose(double, addOne)  // double(addOne(x))

print(doubleThenAdd(5))  // (5*2)+1 = 11
print(addThenDouble(5))  // (5+1)*2 = 12

// パイプライン処理
let pipeline: [(Int) -> Int] = [
    { $0 * 2 },
    { $0 + 10 },
    { $0 * $0 }
]

let input = 3
let output = pipeline.reduce(input) { value, transform in transform(value) }
print("パイプライン結果: \\(output)")  // ((3*2)+10)^2 = 256`}
          expectedOutput={`15
20
[3, 6, 9, 12, 15]
11
12
パイプライン結果: 256`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="closures" lessonId="higher-order" />
      </div>
      <LessonNav lessons={lessons} currentId="higher-order" basePath="/learn/closures" />
    </div>
  );
}
