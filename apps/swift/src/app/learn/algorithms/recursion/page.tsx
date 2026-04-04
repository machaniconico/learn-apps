import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function RecursionPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">アルゴリズム</span>
        <h1 className="text-3xl font-bold text-gray-100">再帰</h1>
        <p className="text-gray-400">再帰関数とスタックオーバーフロー対策を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          再帰（Recursion）とは関数が自分自身を呼び出すことです。
          問題を小さな同種の問題に分割できる場合に有効です。
          再帰には必ず<strong>基底ケース（base case）</strong>が必要で、これがないと無限ループになります。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// 基本的な再帰 - 階乗
func factorial(_ n: Int) -> Int {
    // 基底ケース
    if n <= 1 { return 1 }
    // 再帰ケース
    return n * factorial(n - 1)
}

print(factorial(5))   // 120
print(factorial(10))  // 3628800

// フィボナッチ数列（単純な再帰 - 非効率）
func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

print(fibonacci(10))  // 55
// ※ fibonacci(40) は指数時間のためとても遅い`}
        height="240px"
        expectedOutput="120\n3628800\n55"
      />

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <h2 className="text-xl font-semibold text-gray-100">メモ化で最適化</h2>
        <p>
          再帰の重複計算はメモ化（Memoization）でキャッシュすることでO(n)まで削減できます。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// メモ化による最適化
var memo: [Int: Int] = [:]

func fibMemo(_ n: Int) -> Int {
    if n <= 1 { return n }
    if let cached = memo[n] { return cached }
    let result = fibMemo(n - 1) + fibMemo(n - 2)
    memo[n] = result
    return result
}

print(fibMemo(40))   // 102334155（高速）
print(fibMemo(50))   // 12586269025

// 末尾再帰（Tail Recursion）最適化
// Swiftは末尾再帰の自動最適化は保証されていないが
// 反復で書き換えることでスタックを節約できる
func factorialIterative(_ n: Int) -> Int {
    var result = 1
    for i in 2...max(2, n) {
        result *= i
    }
    return result
}
print(factorialIterative(10))  // 3628800`}
        height="280px"
        expectedOutput="102334155\n12586269025\n3628800"
      />

      <SwiftEditor
        defaultCode={`// ツリー構造の再帰トラバーサル
class TreeNode {
    let value: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ value: Int) { self.value = value }
}

// 前順（pre-order）走査
func preOrder(_ node: TreeNode?) -> [Int] {
    guard let node = node else { return [] }
    return [node.value] + preOrder(node.left) + preOrder(node.right)
}

// ツリー構築
//       4
//      / \\
//     2   6
//    / \\ / \\
//   1  3 5  7
let root = TreeNode(4)
root.left = TreeNode(2); root.right = TreeNode(6)
root.left?.left = TreeNode(1); root.left?.right = TreeNode(3)
root.right?.left = TreeNode(5); root.right?.right = TreeNode(7)

print(preOrder(root))  // [4, 2, 1, 3, 6, 5, 7]`}
        height="280px"
        expectedOutput="[4, 2, 1, 3, 6, 5, 7]"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="algorithms" lessonId="recursion" />
      </div>
      <LessonNav lessons={lessons} currentId="recursion" basePath="/learn/algorithms" />
    </div>
  );
}
