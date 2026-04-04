import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">連結リスト</h1>
        <p className="text-gray-400">NodeクラスとLinkedListクラスをRubyで実装して連結リストを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">連結リストとは</h2>
        <p className="text-gray-300 mb-3">
          連結リストはノードが次のノードへの参照を持つデータ構造です。配列と異なり、挿入・削除がO(1)で行えます。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>各ノードは<code className="bg-gray-800 px-1 rounded text-indigo-300">value</code>と<code className="bg-gray-800 px-1 rounded text-indigo-300">next</code>を持つ</li>
          <li>先頭への挿入 O(1)、末尾への挿入 O(n)</li>
          <li>インデックスアクセスが O(n)（配列はO(1)）</li>
          <li>双方向連結リストは<code className="bg-gray-800 px-1 rounded text-indigo-300">prev</code>も持つ</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 連結リストの実装</h2>
        <RubyEditor
          defaultCode={`# ノードクラス
class Node
  attr_accessor :value, :next_node

  def initialize(value)
    @value = value
    @next_node = nil
  end
end

# 連結リストクラス
class LinkedList
  def initialize
    @head = nil
    @size = 0
  end

  def prepend(value)
    node = Node.new(value)
    node.next_node = @head
    @head = node
    @size += 1
  end

  def append(value)
    node = Node.new(value)
    if @head.nil?
      @head = node
    else
      current = @head
      current = current.next_node until current.next_node.nil?
      current.next_node = node
    end
    @size += 1
  end

  def delete(value)
    return if @head.nil?
    if @head.value == value
      @head = @head.next_node
      @size -= 1
      return
    end
    current = @head
    while current.next_node
      if current.next_node.value == value
        current.next_node = current.next_node.next_node
        @size -= 1
        return
      end
      current = current.next_node
    end
  end

  def to_a
    result = []
    current = @head
    until current.nil?
      result << current.value
      current = current.next_node
    end
    result
  end

  def size = @size
end

list = LinkedList.new
list.append(1)
list.append(2)
list.append(3)
list.prepend(0)
puts "リスト: #{list.to_a.inspect}"
puts "サイズ: #{list.size}"

list.delete(2)
puts "2を削除後: #{list.to_a.inspect}"`}
          expectedOutput={`リスト: [0, 1, 2, 3]
サイズ: 4
2を削除後: [0, 1, 3]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: 連結リストの反転と検索</h2>
        <RubyEditor
          defaultCode={`class Node
  attr_accessor :value, :next_node
  def initialize(v) = (@value = v; @next_node = nil)
end

# 連結リストを反転
def reverse_list(head)
  prev = nil
  current = head
  while current
    next_node = current.next_node
    current.next_node = prev
    prev = current
    current = next_node
  end
  prev
end

# リストを配列に変換
def to_array(head)
  result = []
  current = head
  until current.nil?
    result << current.value
    current = current.next_node
  end
  result
end

# リストを構築
nodes = (1..5).map { |i| Node.new(i) }
nodes.each_with_index { |n, i| n.next_node = nodes[i + 1] if i < nodes.length - 1 }
head = nodes.first

puts "元のリスト: #{to_array(head).inspect}"

reversed = reverse_list(head)
puts "反転後: #{to_array(reversed).inspect}"

# サイクル検出（フロイドのアルゴリズム）
def has_cycle?(head)
  slow = fast = head
  while fast && fast.next_node
    slow = slow.next_node
    fast = fast.next_node.next_node
    return true if slow == fast
  end
  false
end

puts "\nサイクルなし: #{!has_cycle?(reversed)}"
puts "リストサイズ: #{to_array(reversed).length}"`}
          expectedOutput={`元のリスト: [1, 2, 3, 4, 5]
反転後: [5, 4, 3, 2, 1]

サイクルなし: true
リストサイズ: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="linked-list" />
      </div>
      <LessonNav lessons={lessons} currentId="linked-list" basePath="/learn/algorithms" />
    </div>
  );
}
