import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function LinkedListPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">アルゴリズム</span>
        <h1 className="text-3xl font-bold text-gray-100">連結リスト</h1>
        <p className="text-gray-400">クラスによる LinkedList の実装を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          連結リスト（Linked List）は各要素（ノード）が次のノードへの参照を持つデータ構造です。
          配列と異なり先頭への挿入がO(1)ですが、ランダムアクセスはO(n)です。
          Swiftではクラス（参照型）でノードを実装します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// 単方向連結リスト
class ListNode<T> {
    var value: T
    var next: ListNode<T>?

    init(_ value: T) {
        self.value = value
    }
}

class LinkedList<T: CustomStringConvertible> {
    private var head: ListNode<T>?
    var isEmpty: Bool { head == nil }

    // 先頭に追加 O(1)
    func prepend(_ value: T) {
        let node = ListNode(value)
        node.next = head
        head = node
    }

    // 末尾に追加 O(n)
    func append(_ value: T) {
        let node = ListNode(value)
        guard var current = head else { head = node; return }
        while current.next != nil { current = current.next! }
        current.next = node
    }

    // 値を出力
    func printList() {
        var current = head
        var parts: [String] = []
        while let node = current {
            parts.append(node.value.description)
            current = node.next
        }
        print(parts.joined(separator: " -> "))
    }
}

let list = LinkedList<Int>()
list.append(1)
list.append(2)
list.append(3)
list.prepend(0)
list.printList()  // 0 -> 1 -> 2 -> 3`}
        height="360px"
        expectedOutput="0 -> 1 -> 2 -> 3"
      />

      <SwiftEditor
        defaultCode={`// 連結リストの逆順
func reverseList<T>(_ head: ListNode<T>?) -> ListNode<T>? {
    var prev: ListNode<T>? = nil
    var current = head

    while let node = current {
        let next = node.next
        node.next = prev
        prev = node
        current = next
    }
    return prev
}

// 連結リストのサイクル検出 (Floyd's algorithm)
func hasCycle<T>(_ head: ListNode<T>?) -> Bool {
    var slow = head
    var fast = head

    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
        // 参照の同一性比較は === を使う
        if slow === fast { return true }
    }
    return false
}

// テスト用ノード作成
let n1 = ListNode(1)
let n2 = ListNode(2)
let n3 = ListNode(3)
n1.next = n2; n2.next = n3
print(hasCycle(n1))  // false

// サイクル作成（n3 -> n1）
n3.next = n1
print(hasCycle(n1))  // true`}
        height="320px"
        expectedOutput="false\ntrue"
      />

      <SwiftEditor
        defaultCode={`// 双方向連結リスト
class DoublyListNode<T> {
    var value: T
    var next: DoublyListNode<T>?
    weak var prev: DoublyListNode<T>?  // 循環参照を防ぐ weak

    init(_ value: T) { self.value = value }
}

class DoublyLinkedList<T: CustomStringConvertible> {
    private var head: DoublyListNode<T>?
    private var tail: DoublyListNode<T>?

    func append(_ value: T) {
        let node = DoublyListNode(value)
        if let t = tail {
            t.next = node
            node.prev = t
            tail = node
        } else {
            head = node
            tail = node
        }
    }

    func printReverse() {
        var current = tail
        var parts: [String] = []
        while let node = current {
            parts.append(node.value.description)
            current = node.prev
        }
        print(parts.joined(separator: " <- "))
    }
}

let dl = DoublyLinkedList<Int>()
[1, 2, 3, 4].forEach { dl.append($0) }
dl.printReverse()  // 4 <- 3 <- 2 <- 1`}
        height="320px"
        expectedOutput="4 <- 3 <- 2 <- 1"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="algorithms" lessonId="linked-list" />
      </div>
      <LessonNav lessons={lessons} currentId="linked-list" basePath="/learn/algorithms" />
    </div>
  );
}
