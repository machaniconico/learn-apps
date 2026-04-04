import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithms");

export default function RecursionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">再帰</h1>
        <p className="text-gray-400">階乗、フィボナッチ数列を通じて再帰関数の設計を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">再帰の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">再帰</code>とは関数が自分自身を呼び出すテクニックです。
          必ず<code className="text-cyan-300">ベースケース</code>（終了条件）を設けないと無限再帰になります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ベースケース — 再帰を停止する条件</li>
          <li>再帰ケース — 自分自身を呼び出す部分</li>
          <li>問題を小さなサブ問題に分割して解く</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">階乗（Factorial）</h2>
        <p className="text-gray-400 mb-4">
          n! = n * (n-1) * ... * 1 を再帰で実装します。ベースケースは 0! = 1 です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func factorial(n int) int {
    // ベースケース
    if n <= 1 {
        return 1
    }
    // 再帰ケース
    return n * factorial(n-1)
}

func factorialVerbose(n int, depth int) int {
    indent := ""
    for i := 0; i < depth; i++ {
        indent += "  "
    }
    fmt.Printf("%sfactorial(%d) を呼び出し\\n", indent, n)

    if n <= 1 {
        fmt.Printf("%s-> 1 を返す\\n", indent)
        return 1
    }
    result := n * factorialVerbose(n-1, depth+1)
    fmt.Printf("%s-> %d を返す\\n", indent, result)
    return result
}

func main() {
    fmt.Println("=== 階乗の計算過程 ===")
    result := factorialVerbose(5, 0)
    fmt.Printf("\\n5! = %d\\n", result)
}`}
          expectedOutput={`=== 階乗の計算過程 ===
factorial(5) を呼び出し
  factorial(4) を呼び出し
    factorial(3) を呼び出し
      factorial(2) を呼び出し
        factorial(1) を呼び出し
        -> 1 を返す
      -> 2 を返す
    -> 6 を返す
  -> 24 を返す
-> 120 を返す

5! = 120`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィボナッチ数列</h2>
        <p className="text-gray-400 mb-4">
          F(n) = F(n-1) + F(n-2) で定義されるフィボナッチ数列を再帰とメモ化で実装します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// 単純な再帰（非効率）
func fib(n int) int {
    if n <= 1 {
        return n
    }
    return fib(n-1) + fib(n-2)
}

// メモ化による最適化
func fibMemo(n int, memo map[int]int) int {
    if n <= 1 {
        return n
    }
    if v, ok := memo[n]; ok {
        return v
    }
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo)
    return memo[n]
}

func main() {
    // 最初の10項を表示
    fmt.Print("フィボナッチ数列: ")
    for i := 0; i < 10; i++ {
        fmt.Printf("%d ", fib(i))
    }
    fmt.Println()

    // メモ化版で大きな値も計算可能
    memo := make(map[int]int)
    fmt.Printf("\\nF(20) = %d\\n", fibMemo(20, memo))
    fmt.Printf("F(30) = %d\\n", fibMemo(30, memo))
    fmt.Printf("F(40) = %d\\n", fibMemo(40, memo))
}`}
          expectedOutput={`フィボナッチ数列: 0 1 1 2 3 5 8 13 21 34

F(20) = 6765
F(30) = 832040
F(40) = 102334155`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">再帰によるデータ探索</h2>
        <p className="text-gray-400 mb-4">
          ネストしたデータ構造を再帰で探索する実践的な例です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type TreeNode struct {
    Value    string
    Children []*TreeNode
}

func printTree(node *TreeNode, depth int) {
    indent := ""
    for i := 0; i < depth; i++ {
        indent += "  "
    }
    fmt.Printf("%s%s\\n", indent, node.Value)
    for _, child := range node.Children {
        printTree(child, depth+1)
    }
}

func countNodes(node *TreeNode) int {
    count := 1
    for _, child := range node.Children {
        count += countNodes(child)
    }
    return count
}

func main() {
    root := &TreeNode{Value: "root", Children: []*TreeNode{
        {Value: "src", Children: []*TreeNode{
            {Value: "main.go", Children: nil},
            {Value: "utils.go", Children: nil},
        }},
        {Value: "docs", Children: []*TreeNode{
            {Value: "README.md", Children: nil},
        }},
        {Value: "go.mod", Children: nil},
    }}

    fmt.Println("ディレクトリツリー:")
    printTree(root, 0)
    fmt.Printf("\\n総ノード数: %d\\n", countNodes(root))
}`}
          expectedOutput={`ディレクトリツリー:
root
  src
    main.go
    utils.go
  docs
    README.md
  go.mod

総ノード数: 7`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="recursion" />
      </div>
      <LessonNav lessons={lessons} currentId="recursion" basePath="/learn/algorithms" />
    </div>
  );
}
