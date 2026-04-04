import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithms");

export default function LinkedListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">連結リスト</h1>
        <p className="text-gray-400">ポインタを使った単方向連結リストの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">連結リスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">連結リスト</code>は各ノードが値と次のノードへのポインタを持つデータ構造です。
          配列と違い、メモリ上で連続している必要がなく、挿入・削除が O(1) で行えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ノード: 値 + 次のノードへのポインタ</li>
          <li>先頭挿入・削除: O(1)</li>
          <li>要素アクセス: O(n)（先頭から辿る必要あり）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">単方向連結リスト</h2>
        <p className="text-gray-400 mb-4">
          基本的な単方向連結リストの実装です。追加、表示、長さ取得を実装します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Node struct {
    Value int
    Next  *Node
}

type LinkedList struct {
    Head *Node
    Size int
}

func (ll *LinkedList) Prepend(value int) {
    newNode := &Node{Value: value, Next: ll.Head}
    ll.Head = newNode
    ll.Size++
}

func (ll *LinkedList) Append(value int) {
    newNode := &Node{Value: value}
    if ll.Head == nil {
        ll.Head = newNode
    } else {
        current := ll.Head
        for current.Next != nil {
            current = current.Next
        }
        current.Next = newNode
    }
    ll.Size++
}

func (ll *LinkedList) Print() {
    current := ll.Head
    for current != nil {
        fmt.Printf("%d", current.Value)
        if current.Next != nil {
            fmt.Print(" -> ")
        }
        current = current.Next
    }
    fmt.Println()
}

func main() {
    list := &LinkedList{}

    list.Append(10)
    list.Append(20)
    list.Append(30)
    list.Prepend(5)

    fmt.Print("リスト: ")
    list.Print()
    fmt.Printf("サイズ: %d\\n", list.Size)
}`}
          expectedOutput={`リスト: 5 -> 10 -> 20 -> 30
サイズ: 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">検索と削除</h2>
        <p className="text-gray-400 mb-4">
          連結リストでの要素検索と削除の実装です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Node struct {
    Value int
    Next  *Node
}

type LinkedList struct {
    Head *Node
}

func (ll *LinkedList) Append(value int) {
    newNode := &Node{Value: value}
    if ll.Head == nil {
        ll.Head = newNode
        return
    }
    curr := ll.Head
    for curr.Next != nil {
        curr = curr.Next
    }
    curr.Next = newNode
}

func (ll *LinkedList) Find(value int) bool {
    curr := ll.Head
    for curr != nil {
        if curr.Value == value {
            return true
        }
        curr = curr.Next
    }
    return false
}

func (ll *LinkedList) Delete(value int) bool {
    if ll.Head == nil {
        return false
    }
    if ll.Head.Value == value {
        ll.Head = ll.Head.Next
        return true
    }
    curr := ll.Head
    for curr.Next != nil {
        if curr.Next.Value == value {
            curr.Next = curr.Next.Next
            return true
        }
        curr = curr.Next
    }
    return false
}

func (ll *LinkedList) Print() {
    curr := ll.Head
    for curr != nil {
        fmt.Printf("%d", curr.Value)
        if curr.Next != nil {
            fmt.Print(" -> ")
        }
        curr = curr.Next
    }
    fmt.Println()
}

func main() {
    list := &LinkedList{}
    for _, v := range []int{1, 2, 3, 4, 5} {
        list.Append(v)
    }

    fmt.Print("初期: ")
    list.Print()

    fmt.Printf("3を検索: %v\\n", list.Find(3))
    fmt.Printf("9を検索: %v\\n", list.Find(9))

    list.Delete(3)
    fmt.Print("3を削除: ")
    list.Print()

    list.Delete(1)
    fmt.Print("1を削除: ")
    list.Print()
}`}
          expectedOutput={`初期: 1 -> 2 -> 3 -> 4 -> 5
3を検索: true
9を検索: false
3を削除: 1 -> 2 -> 4 -> 5
1を削除: 2 -> 4 -> 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リストの反転</h2>
        <p className="text-gray-400 mb-4">
          連結リストを反転する古典的なアルゴリズムです。3つのポインタを使って実装します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Node struct {
    Value int
    Next  *Node
}

func createList(values []int) *Node {
    if len(values) == 0 {
        return nil
    }
    head := &Node{Value: values[0]}
    curr := head
    for _, v := range values[1:] {
        curr.Next = &Node{Value: v}
        curr = curr.Next
    }
    return head
}

func printList(head *Node) {
    curr := head
    for curr != nil {
        fmt.Printf("%d", curr.Value)
        if curr.Next != nil {
            fmt.Print(" -> ")
        }
        curr = curr.Next
    }
    fmt.Println()
}

func reverse(head *Node) *Node {
    var prev *Node
    curr := head
    for curr != nil {
        next := curr.Next  // 次を保存
        curr.Next = prev   // リンクを反転
        prev = curr        // prevを進める
        curr = next        // currを進める
    }
    return prev
}

func main() {
    head := createList([]int{1, 2, 3, 4, 5})
    fmt.Print("元のリスト: ")
    printList(head)

    reversed := reverse(head)
    fmt.Print("反転後:     ")
    printList(reversed)
}`}
          expectedOutput={`元のリスト: 1 -> 2 -> 3 -> 4 -> 5
反転後:     5 -> 4 -> 3 -> 2 -> 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="linked-list" />
      </div>
      <LessonNav lessons={lessons} currentId="linked-list" basePath="/learn/algorithms" />
    </div>
  );
}
