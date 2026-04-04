import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithms");

export default function StackQueuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタック・キュー</h1>
        <p className="text-gray-400">スライスを使ったスタックとキューの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックとキュー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">スタック</code>はLIFO(Last In, First Out)、
          <code className="text-cyan-300">キュー</code>はFIFO(First In, First Out)のデータ構造です。
          Goではスライスを使って簡単に実装できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタック（LIFO）</h2>
        <p className="text-gray-400 mb-4">
          最後に追加した要素が最初に取り出されるスタックをスライスで実装します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, error) {
    var zero T
    if len(s.items) == 0 {
        return zero, errors.New("スタックが空です")
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, nil
}

func (s *Stack[T]) Peek() (T, error) {
    var zero T
    if len(s.items) == 0 {
        return zero, errors.New("スタックが空です")
    }
    return s.items[len(s.items)-1], nil
}

func (s *Stack[T]) Size() int {
    return len(s.items)
}

func main() {
    stack := &Stack[int]{}

    // Push
    stack.Push(10)
    stack.Push(20)
    stack.Push(30)
    fmt.Printf("サイズ: %d\\n", stack.Size())

    // Peek
    top, _ := stack.Peek()
    fmt.Printf("先頭: %d\\n", top)

    // Pop
    for stack.Size() > 0 {
        val, _ := stack.Pop()
        fmt.Printf("Pop: %d\\n", val)
    }
}`}
          expectedOutput={`サイズ: 3
先頭: 30
Pop: 30
Pop: 20
Pop: 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キュー（FIFO）</h2>
        <p className="text-gray-400 mb-4">
          最初に追加した要素が最初に取り出されるキューを実装します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

type Queue[T any] struct {
    items []T
}

func (q *Queue[T]) Enqueue(item T) {
    q.items = append(q.items, item)
}

func (q *Queue[T]) Dequeue() (T, error) {
    var zero T
    if len(q.items) == 0 {
        return zero, errors.New("キューが空です")
    }
    item := q.items[0]
    q.items = q.items[1:]
    return item, nil
}

func (q *Queue[T]) Size() int {
    return len(q.items)
}

func (q *Queue[T]) IsEmpty() bool {
    return len(q.items) == 0
}

func main() {
    queue := &Queue[string]{}

    // Enqueue
    queue.Enqueue("タスクA")
    queue.Enqueue("タスクB")
    queue.Enqueue("タスクC")
    fmt.Printf("キューサイズ: %d\\n\\n", queue.Size())

    // Dequeue（FIFO順）
    fmt.Println("処理順序:")
    for !queue.IsEmpty() {
        task, _ := queue.Dequeue()
        fmt.Printf("  処理: %s\\n", task)
    }
}`}
          expectedOutput={`キューサイズ: 3

処理順序:
  処理: タスクA
  処理: タスクB
  処理: タスクC`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックの応用: 括弧の対応チェック</h2>
        <p className="text-gray-400 mb-4">
          スタックの実用例として、括弧が正しく対応しているかチェックします。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func isValidParentheses(s string) bool {
    stack := []rune{}
    pairs := map[rune]rune{
        ')': '(',
        ']': '[',
        '}': '{',
    }

    for _, ch := range s {
        switch ch {
        case '(', '[', '{':
            stack = append(stack, ch)
        case ')', ']', '}':
            if len(stack) == 0 || stack[len(stack)-1] != pairs[ch] {
                return false
            }
            stack = stack[:len(stack)-1]
        }
    }
    return len(stack) == 0
}

func main() {
    tests := []string{
        "()()",
        "([{}])",
        "(()",
        "([)]",
        "{[()]}",
    }

    for _, test := range tests {
        result := isValidParentheses(test)
        status := "有効"
        if !result {
            status = "無効"
        }
        fmt.Printf("%s -> %s\\n", test, status)
    }
}`}
          expectedOutput={`()() -> 有効
([{}]) -> 有効
(() -> 無効
([)] -> 無効
{[()]} -> 有効`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="stack-queue" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-queue" basePath="/learn/algorithms" />
    </div>
  );
}
