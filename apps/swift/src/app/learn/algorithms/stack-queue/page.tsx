import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function StackQueuePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">アルゴリズム</span>
        <h1 className="text-3xl font-bold text-gray-100">スタックとキュー</h1>
        <p className="text-gray-400">配列を使った Stack・Queue の実装を学びましょう。</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
        <p>
          <strong>スタック（Stack）</strong>はLIFO（後入れ先出し）、<strong>キュー（Queue）</strong>はFIFO（先入れ先出し）
          のデータ構造です。Swiftの配列をベースにジェネリクスで実装します。
        </p>
      </div>

      <SwiftEditor
        defaultCode={`// スタック (LIFO - Last In First Out)
struct Stack<T> {
    private var storage: [T] = []

    var isEmpty: Bool { storage.isEmpty }
    var count: Int { storage.count }
    var top: T? { storage.last }

    mutating func push(_ element: T) {
        storage.append(element)
    }

    @discardableResult
    mutating func pop() -> T? {
        storage.popLast()
    }
}

var stack = Stack<Int>()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.top ?? -1)   // 3
print(stack.pop() ?? -1) // 3
print(stack.pop() ?? -1) // 2
print(stack.count)       // 1`}
        height="280px"
        expectedOutput="3\n3\n2\n1"
      />

      <SwiftEditor
        defaultCode={`// キュー (FIFO - First In First Out)
struct Queue<T> {
    private var enqueueStack: [T] = []
    private var dequeueStack: [T] = []

    var isEmpty: Bool { enqueueStack.isEmpty && dequeueStack.isEmpty }
    var count: Int { enqueueStack.count + dequeueStack.count }

    mutating func enqueue(_ element: T) {
        enqueueStack.append(element)
    }

    // 2スタック法でO(1)償却コストのdequeue
    mutating func dequeue() -> T? {
        if dequeueStack.isEmpty {
            dequeueStack = enqueueStack.reversed()
            enqueueStack.removeAll()
        }
        return dequeueStack.popLast()
    }

    var front: T? {
        dequeueStack.last ?? enqueueStack.first
    }
}

var queue = Queue<String>()
queue.enqueue("Alice")
queue.enqueue("Bob")
queue.enqueue("Charlie")
print(queue.dequeue() ?? "")  // Alice
print(queue.dequeue() ?? "")  // Bob
print(queue.front ?? "")      // Charlie`}
        height="320px"
        expectedOutput="Alice\nBob\nCharlie"
      />

      <SwiftEditor
        defaultCode={`// スタックの応用: 括弧の対応チェック
func isBalanced(_ s: String) -> Bool {
    var stack: [Character] = []
    let pairs: [Character: Character] = [")": "(", "]": "[", "}": "{"]

    for ch in s {
        if "([{".contains(ch) {
            stack.append(ch)
        } else if let open = pairs[ch] {
            if stack.last != open { return false }
            stack.removeLast()
        }
    }
    return stack.isEmpty
}

print(isBalanced("({[]})"))  // true
print(isBalanced("([)]"))    // false
print(isBalanced("{"))       // false`}
        height="240px"
        expectedOutput="true\nfalse\nfalse"
      />

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <LessonCompleteButton categoryId="algorithms" lessonId="stack-queue" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-queue" basePath="/learn/algorithms" />
    </div>
  );
}
