import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "closures")!.lessons;

export default function ShorthandPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">クロージャ レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">省略記法</h1>
        <p className="text-gray-400">$0・$1による引数の省略と、クロージャをさらに簡潔に書く方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">省略引数名 $0、$1、$2...</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftでは、クロージャの引数に自動的に <code className="text-violet-300">$0</code>、
          <code className="text-violet-300">$1</code>、<code className="text-violet-300">$2</code>... という名前が付きます。
          これを使うと、引数名の宣言と <code className="text-violet-300">in</code> キーワードを完全に省略できます。
          短い処理を書くときに特に有効です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">$0</code> — 1番目の引数</li>
          <li><code className="text-violet-300">$1</code> — 2番目の引数</li>
          <li><code className="text-violet-300">$2</code> — 3番目の引数（以降も同様）</li>
          <li>省略引数を使うと <code className="text-violet-300">in</code> も不要になる</li>
          <li>処理が1行の場合は <code className="text-violet-300">return</code> も省略できる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 段階的な省略</h2>
        <SwiftEditor
          defaultCode={`let numbers = [3, 1, 4, 1, 5, 9, 2, 6]

// 完全形
let v1 = numbers.sorted(by: { (a: Int, b: Int) -> Bool in
    return a < b
})

// 型推論で型を省略
let v2 = numbers.sorted(by: { a, b in
    return a < b
})

// 暗黙のreturn（単一式）
let v3 = numbers.sorted(by: { a, b in a < b })

// 末尾クロージャ
let v4 = numbers.sorted { a, b in a < b }

// 省略引数名 $0、$1
let v5 = numbers.sorted { $0 < $1 }

// 演算子関数（最終形）
let v6 = numbers.sorted(by: <)

print(v1)
print(v5)
print(v6)
print(v1 == v6)`}
          expectedOutput={`[1, 1, 2, 3, 4, 5, 6, 9]
[1, 1, 2, 3, 4, 5, 6, 9]
[1, 1, 2, 3, 4, 5, 6, 9]
true`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演算子関数の直接渡し</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swiftの演算子（<code className="text-violet-300">+</code>、<code className="text-violet-300">{"<"}</code>、
          <code className="text-violet-300">{">"}</code>、<code className="text-violet-300">==</code> など）は関数として扱えます。
          クロージャが期待される場所に直接演算子名を渡すことができ、コードが非常に簡潔になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">reduce(0, +)</code> — <code className="text-violet-300">{"{ $0 + $1 }"}</code> と等価</li>
          <li><code className="text-violet-300">sorted(by: {"<"})</code> — 昇順ソート</li>
          <li><code className="text-violet-300">sorted(by: {">"})</code> — 降順ソート</li>
          <li><code className="text-violet-300">filter(by: {">"}0)</code> のようなpartial applicationは不可</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 演算子関数の活用</h2>
        <SwiftEditor
          defaultCode={`let nums = [5, 2, 8, 1, 9, 3]

// 演算子を直接渡す
let ascending = nums.sorted(by: <)
let descending = nums.sorted(by: >)
print("昇順: \\(ascending)")
print("降順: \\(descending)")

// reduceに演算子を渡す
let sum = nums.reduce(0, +)
let product = nums.reduce(1, *)
print("合計: \\(sum)")
print("積: \\(product)")

// 文字列でも同様
let words = ["banana", "apple", "cherry"]
let sorted = words.sorted(by: <)
print("アルファベット順: \\(sorted)")

// 等値チェック
let a = [1, 2, 3]
let b = [1, 2, 3]
let c = [1, 2, 4]

print(zip(a, b).allSatisfy(==))
print(zip(a, c).allSatisfy(==))`}
          expectedOutput={`昇順: [1, 2, 3, 5, 8, 9]
降順: [9, 8, 5, 3, 2, 1]
合計: 28
積: 2160
アルファベット順: ["apple", "banana", "cherry"]
true
false`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">省略記法の使い分け</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          省略記法は強力ですが、読みやすさとのバランスが大切です。
          処理が単純で意図が明確なときは省略が有効ですが、
          複雑な処理では明示的な引数名を使う方がコードの意図が伝わりやすいです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">$0</code> が適切: 短い変換・比較（1行処理）</li>
          <li>引数名が適切: 複数行・複雑なロジック・引数の意味が重要な場合</li>
          <li>チームの規約に合わせて一貫性を保つのがベスト</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 省略記法の実践的な活用</h2>
        <SwiftEditor
          defaultCode={`struct Student {
    let name: String
    let score: Int
    let grade: String
}

let students = [
    Student(name: "太郎", score: 85, grade: "A"),
    Student(name: "花子", score: 92, grade: "A"),
    Student(name: "次郎", score: 71, grade: "B"),
    Student(name: "三郎", score: 88, grade: "A"),
    Student(name: "四郎", score: 65, grade: "C"),
]

// $0を使った簡潔な処理
let aGrade = students.filter { $0.grade == "A" }
print("A評価: \\(aGrade.map { $0.name })")

// スコアでソート
let byScore = students.sorted { $0.score > $1.score }
print("スコア上位: \\(byScore.prefix(3).map { "\\($0.name):\\($0.score)" })")

// 平均点
let average = students.map { $0.score }.reduce(0, +) / students.count
print("平均点: \\(average)")

// 合格者（70点以上）の名前を取得
let passed = students
    .filter { $0.score >= 70 }
    .map { $0.name }
    .sorted()
print("合格者: \\(passed)")`}
          expectedOutput={`A評価: ["太郎", "花子", "三郎"]
スコア上位: ["花子:92", "三郎:88", "太郎:85"]
平均点: 80
合格者: ["三郎", "太郎", "次郎", "花子"]`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="closures" lessonId="shorthand" />
      </div>
      <LessonNav lessons={lessons} currentId="shorthand" basePath="/learn/closures" />
    </div>
  );
}
