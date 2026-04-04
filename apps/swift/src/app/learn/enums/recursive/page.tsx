import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "enums")!.lessons;

export default function RecursivePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">列挙型 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰的列挙型</h1>
        <p className="text-gray-400">indirectキーワードで列挙型が自分自身を関連値に持つ再帰構造を定義します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰的列挙型とindirect</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          列挙型の関連値として自分自身の型を持つことを<strong className="text-white">再帰的列挙型</strong>と言います。
          木構造や数式の抽象構文木など、再帰的なデータ構造を表現するのに使います。
          通常、値型（enum）は自身を含めないためコンパイラが拒否しますが、
          <code className="text-indigo-300">indirect</code>キーワードを付けることでヒープ上に間接参照として格納し、再帰を実現します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">indirect case 名前(...)</code> — 特定ケースのみ間接参照</li>
          <li><code className="text-indigo-300">indirect enum 型名</code> — 全ケースを間接参照</li>
          <li>再帰的な処理は再帰関数（recursive function）で実装するのが自然</li>
          <li>ツリー、連結リスト、数式表現などに活用</li>
        </ul>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">代表的なユースケース：算術式</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          算術式（<code className="text-indigo-300">1 + 2 * 3</code>など）は再帰的な構造を持ちます。
          <code className="text-indigo-300">数値</code>と<code className="text-indigo-300">演算子（左辺・右辺）</code>という2種類のケースで表現でき、
          ケースの中にまた同じ型のケースが入ることで任意の深さの式木を構築できます。
          再帰関数で式木を評価するパターンはインタープリタやコンパイラでよく使われます。
        </p>
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">連結リストの表現</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          再帰的列挙型で連結リスト（linked list）を表現することもできます。
          <code className="text-indigo-300">empty</code>（終端）と<code className="text-indigo-300">node(値, 次のノード)</code>の2ケースで構成され、
          <code className="text-indigo-300">indirect case node</code>にすることで連鎖させられます。
          実用的には標準ライブラリのArrayを使いますが、データ構造の学習に役立ちます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 算術式の抽象構文木</h2>
        <SwiftEditor
          defaultCode={`indirect enum ArithmeticExpr {
    case number(Double)
    case add(ArithmeticExpr, ArithmeticExpr)
    case subtract(ArithmeticExpr, ArithmeticExpr)
    case multiply(ArithmeticExpr, ArithmeticExpr)
    case divide(ArithmeticExpr, ArithmeticExpr)
}

func evaluate(_ expr: ArithmeticExpr) -> Double {
    switch expr {
    case let .number(n):
        return n
    case let .add(left, right):
        return evaluate(left) + evaluate(right)
    case let .subtract(left, right):
        return evaluate(left) - evaluate(right)
    case let .multiply(left, right):
        return evaluate(left) * evaluate(right)
    case let .divide(left, right):
        return evaluate(left) / evaluate(right)
    }
}

// (3 + 4) * 2
let expr1 = ArithmeticExpr.multiply(
    .add(.number(3), .number(4)),
    .number(2)
)
print("(3 + 4) * 2 = \\(evaluate(expr1))")

// 10 - (2 * 3)
let expr2 = ArithmeticExpr.subtract(
    .number(10),
    .multiply(.number(2), .number(3))
)
print("10 - (2 * 3) = \\(evaluate(expr2))")`}
          expectedOutput={`(3 + 4) * 2 = 14.0
10 - (2 * 3) = 4.0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 再帰的な連結リスト</h2>
        <SwiftEditor
          defaultCode={`enum LinkedList {
    case empty
    indirect case node(Int, LinkedList)
}

func length(_ list: LinkedList) -> Int {
    switch list {
    case .empty:
        return 0
    case let .node(_, rest):
        return 1 + length(rest)
    }
}

func sum(_ list: LinkedList) -> Int {
    switch list {
    case .empty:
        return 0
    case let .node(value, rest):
        return value + sum(rest)
    }
}

func toArray(_ list: LinkedList) -> [Int] {
    switch list {
    case .empty:
        return []
    case let .node(value, rest):
        return [value] + toArray(rest)
    }
}

// 1 -> 2 -> 3 -> 4 -> 5 -> empty
let list = LinkedList.node(1, .node(2, .node(3, .node(4, .node(5, .empty)))))

print("長さ: \\(length(list))")
print("合計: \\(sum(list))")
print("配列: \\(toArray(list))")`}
          expectedOutput={`長さ: 5
合計: 15
配列: [1, 2, 3, 4, 5]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: 二分木の表現と探索</h2>
        <SwiftEditor
          defaultCode={`indirect enum BinaryTree {
    case leaf
    case node(value: Int, left: BinaryTree, right: BinaryTree)
}

// 中順走査（左→自→右）
func inOrder(_ tree: BinaryTree) -> [Int] {
    switch tree {
    case .leaf:
        return []
    case let .node(value, left, right):
        return inOrder(left) + [value] + inOrder(right)
    }
}

func treeDepth(_ tree: BinaryTree) -> Int {
    switch tree {
    case .leaf:
        return 0
    case let .node(_, left, right):
        return 1 + max(treeDepth(left), treeDepth(right))
    }
}

//       4
//      / \\
//     2   6
//    / \\ / \\
//   1  3 5  7
let tree = BinaryTree.node(
    value: 4,
    left: .node(value: 2, left: .node(value: 1, left: .leaf, right: .leaf),
                             right: .node(value: 3, left: .leaf, right: .leaf)),
    right: .node(value: 6, left: .node(value: 5, left: .leaf, right: .leaf),
                             right: .node(value: 7, left: .leaf, right: .leaf))
)

print("中順走査: \\(inOrder(tree))")
print("木の深さ: \\(treeDepth(tree))")`}
          expectedOutput={`中順走査: [1, 2, 3, 4, 5, 6, 7]
木の深さ: 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="enums" lessonId="recursive" />
      </div>
      <LessonNav lessons={lessons} currentId="recursive" basePath="/learn/enums" />
    </div>
  );
}
