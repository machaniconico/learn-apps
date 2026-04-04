import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function TreePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">木構造</h1>
        <p className="text-gray-400">二分木・二分探索木の実装と走査アルゴリズムを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">木構造とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-300">木構造（Tree）</code>は階層的なデータを表現するデータ構造です。
          各ノードは値と子ノードへの参照を持ちます。<code className="text-indigo-300">二分木（Binary Tree）</code>は
          各ノードが最大2つの子（左・右）を持つ特殊な木です。
          <code className="text-indigo-300">二分探索木（BST）</code>は左子が親より小さく、右子が親より大きいという制約を持ち、効率的な探索が可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">挿入・探索: O(log n)</code> — 平均ケース（バランス木の場合）</li>
          <li><code className="text-blue-300">中順走査（in-order）</code> — ソート済み順序でノードを訪問</li>
          <li><code className="text-blue-300">前順走査（pre-order）</code> — 根→左→右の順序</li>
          <li><code className="text-blue-300">後順走査（post-order）</code> — 左→右→根の順序</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: 二分探索木の実装</h2>
        <SwiftEditor
          defaultCode={`// 二分探索木（BST）の実装

class BSTNode<T: Comparable> {
    var value: T
    var left: BSTNode<T>?
    var right: BSTNode<T>?

    init(_ value: T) {
        self.value = value
    }
}

class BST<T: Comparable> {
    var root: BSTNode<T>?

    // 挿入: O(log n) 平均
    func insert(_ value: T) {
        root = insertNode(root, value)
    }

    private func insertNode(_ node: BSTNode<T>?, _ value: T) -> BSTNode<T> {
        guard let node = node else { return BSTNode(value) }
        if value < node.value {
            node.left = insertNode(node.left, value)
        } else if value > node.value {
            node.right = insertNode(node.right, value)
        }
        return node
    }

    // 探索: O(log n) 平均
    func contains(_ value: T) -> Bool {
        var current = root
        while let node = current {
            if value == node.value { return true }
            current = value < node.value ? node.left : node.right
        }
        return false
    }

    // 中順走査（ソート順）
    func inOrder() -> [T] {
        var result: [T] = []
        inOrderTraversal(root, &result)
        return result
    }

    private func inOrderTraversal(_ node: BSTNode<T>?, _ result: inout [T]) {
        guard let node = node else { return }
        inOrderTraversal(node.left, &result)
        result.append(node.value)
        inOrderTraversal(node.right, &result)
    }
}

let bst = BST<Int>()
[5, 3, 7, 1, 4, 6, 8].forEach { bst.insert($0) }

print("中順走査（ソート済み）:", bst.inOrder())
print("contains(4):", bst.contains(4))
print("contains(9):", bst.contains(9))`}
          expectedOutput={`中順走査（ソート済み）: [1, 3, 4, 5, 6, 7, 8]
contains(4): true
contains(9): false`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">木の走査アルゴリズム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          木の走査には再帰的なアプローチが自然に適合します。
          <code className="text-indigo-300">前順（pre-order）</code>はファイルシステムのコピーや木の複製に、
          <code className="text-indigo-300">後順（post-order）</code>はファイルシステムの削除や木の解放に使われます。
          <code className="text-indigo-300">幅優先探索（BFS）</code>はキューを使ってレベル順に走査します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: 複数の走査方法</h2>
        <SwiftEditor
          defaultCode={`class TreeNode {
    var value: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ value: Int) { self.value = value }
}

// ツリーを構築:
//       5
//      / \\
//     3   7
//    / \\ / \\
//   1  4 6  8

func buildTree() -> TreeNode {
    let root = TreeNode(5)
    root.left = TreeNode(3)
    root.right = TreeNode(7)
    root.left?.left = TreeNode(1)
    root.left?.right = TreeNode(4)
    root.right?.left = TreeNode(6)
    root.right?.right = TreeNode(8)
    return root
}

// 前順走査: 根→左→右
func preOrder(_ node: TreeNode?) -> [Int] {
    guard let node = node else { return [] }
    return [node.value] + preOrder(node.left) + preOrder(node.right)
}

// 中順走査: 左→根→右
func inOrder(_ node: TreeNode?) -> [Int] {
    guard let node = node else { return [] }
    return inOrder(node.left) + [node.value] + inOrder(node.right)
}

// 後順走査: 左→右→根
func postOrder(_ node: TreeNode?) -> [Int] {
    guard let node = node else { return [] }
    return postOrder(node.left) + postOrder(node.right) + [node.value]
}

// 幅優先探索（レベル順）
func levelOrder(_ root: TreeNode?) -> [[Int]] {
    guard let root = root else { return [] }
    var result: [[Int]] = []
    var queue: [TreeNode] = [root]
    while !queue.isEmpty {
        let levelSize = queue.count
        var level: [Int] = []
        for _ in 0..<levelSize {
            let node = queue.removeFirst()
            level.append(node.value)
            if let left = node.left { queue.append(left) }
            if let right = node.right { queue.append(right) }
        }
        result.append(level)
    }
    return result
}

let tree = buildTree()
print("前順:", preOrder(tree))
print("中順:", inOrder(tree))
print("後順:", postOrder(tree))
print("レベル順:", levelOrder(tree))`}
          expectedOutput={`前順: [5, 3, 1, 4, 7, 6, 8]
中順: [1, 3, 4, 5, 6, 7, 8]
後順: [1, 4, 3, 6, 8, 7, 5]
レベル順: [[5], [3, 7], [1, 4, 6, 8]]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例3: 木の高さと最大値</h2>
        <SwiftEditor
          defaultCode={`class TreeNode {
    var value: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ value: Int) { self.value = value }
}

// 木の高さ（深さ）を計算
func height(_ node: TreeNode?) -> Int {
    guard let node = node else { return 0 }
    return 1 + max(height(node.left), height(node.right))
}

// 木の最大値を取得
func maxValue(_ node: TreeNode?) -> Int? {
    guard let node = node else { return nil }
    let leftMax = maxValue(node.left)
    let rightMax = maxValue(node.right)
    let childMax = [leftMax, rightMax].compactMap { $0 }.max()
    return max(node.value, childMax ?? node.value)
}

// ノード数を数える
func countNodes(_ node: TreeNode?) -> Int {
    guard let node = node else { return 0 }
    return 1 + countNodes(node.left) + countNodes(node.right)
}

// 左右対称かチェック
func isSymmetric(_ root: TreeNode?) -> Bool {
    func isMirror(_ left: TreeNode?, _ right: TreeNode?) -> Bool {
        if left == nil && right == nil { return true }
        guard let l = left, let r = right else { return false }
        return l.value == r.value &&
               isMirror(l.left, r.right) &&
               isMirror(l.right, r.left)
    }
    return isMirror(root?.left, root?.right)
}

// テスト木を構築
let root = TreeNode(5)
root.left = TreeNode(3)
root.right = TreeNode(7)
root.left?.left = TreeNode(1)
root.left?.right = TreeNode(4)
root.right?.left = TreeNode(6)
root.right?.right = TreeNode(8)
root.left?.left?.left = TreeNode(0)

print("木の高さ:", height(root))
print("ノード数:", countNodes(root))
print("最大値:", maxValue(root) ?? "なし")
print("対称?:", isSymmetric(root))

// 対称な木
let symRoot = TreeNode(1)
symRoot.left = TreeNode(2)
symRoot.right = TreeNode(2)
symRoot.left?.left = TreeNode(3)
symRoot.left?.right = TreeNode(4)
symRoot.right?.left = TreeNode(4)
symRoot.right?.right = TreeNode(3)
print("対称な木?:", isSymmetric(symRoot))`}
          expectedOutput={`木の高さ: 4
ノード数: 8
最大値: 8
対称?: false
対称な木?: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="tree" />
      </div>
      <LessonNav lessons={lessons} currentId="tree" basePath="/learn/algorithms" />
    </div>
  );
}
