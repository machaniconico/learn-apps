import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタック・キュー</h1>
        <p className="text-gray-400">ArrayをスタックとキューとしてRubyで操作するパターンとQueueクラスを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックとキューの違い</h2>
        <p className="text-gray-300 mb-3">
          スタック（LIFO）とキュー（FIFO）は基本的なデータ構造です。Rubyでは配列で両方を実装できます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">スタック</code> — LIFO（push/pop）後入れ先出し</li>
          <code className="bg-gray-800 px-1 rounded text-indigo-300">キュー</code> — FIFO（push/shift）先入れ先出し
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">Thread::Queue</code> — スレッドセーフなキュー</li>
          <li>スタックの用途: 関数コール、undo機能、括弧チェック</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: スタックとキューの実装</h2>
        <RubyEditor
          defaultCode={`# スタック（LIFO）
class Stack
  def initialize
    @data = []
  end

  def push(item)
    @data.push(item)
    puts "push: #{item} -> #{@data.inspect}"
  end

  def pop
    item = @data.pop
    puts "pop: #{item} <- #{@data.inspect}"
    item
  end

  def peek = @data.last
  def empty? = @data.empty?
  def size = @data.size
end

# キュー（FIFO）
class Queue
  def initialize
    @data = []
  end

  def enqueue(item)
    @data.push(item)
    puts "enqueue: #{item} -> #{@data.inspect}"
  end

  def dequeue
    item = @data.shift
    puts "dequeue: #{item} <- #{@data.inspect}"
    item
  end

  def front = @data.first
  def empty? = @data.empty?
end

puts "=== スタック ==="
stack = Stack.new
stack.push(1)
stack.push(2)
stack.push(3)
stack.pop
stack.pop

puts "\n=== キュー ==="
queue = Queue.new
queue.enqueue("A")
queue.enqueue("B")
queue.enqueue("C")
queue.dequeue
queue.dequeue`}
          expectedOutput={`=== スタック ===
push: 1 -> [1]
push: 2 -> [1, 2]
push: 3 -> [1, 2, 3]
pop: 3 <- [1, 2]
pop: 2 <- [1]

=== キュー ===
enqueue: A -> ["A"]
enqueue: B -> ["A", "B"]
enqueue: C -> ["A", "B", "C"]
dequeue: A <- ["B", "C"]
dequeue: B <- ["C"]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: スタックで括弧チェック</h2>
        <RubyEditor
          defaultCode={`# スタックの実用例: 括弧のバランスチェック
def balanced_brackets?(str)
  stack = []
  pairs = { ')' => '(', ']' => '[', '}' => '{' }
  opens = pairs.values.to_set

  str.each_char do |char|
    if opens.include?(char)
      stack.push(char)
    elsif pairs.key?(char)
      return false if stack.empty? || stack.pop != pairs[char]
    end
  end

  stack.empty?
end

test_cases = [
  "(())",
  "()[]{}" ,
  "(]",
  "([)]",
  "{[]}",
  "(((",
]

test_cases.each do |s|
  result = balanced_brackets?(s)
  status = result ? "OK" : "NG"
  puts "#{s.ljust(8)} -> #{status}"
end`}
          expectedOutput={`(())     -> OK
()[]{}   -> OK
(]       -> NG
([)]     -> NG
{[]}     -> OK
(((      -> NG`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="stack-queue" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-queue" basePath="/learn/algorithms" />
    </div>
  );
}
