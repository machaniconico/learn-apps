import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function SliceTricksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・スライス レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スライステクニック</h1>
        <p className="text-gray-400">削除、挿入、フィルタなどのスライス操作パターンを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スライスの一般的なパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goにはスライスを操作するための組み込み関数が限られていますが、
          <code className="text-cyan-300">append</code> とスライシングを組み合わせることで、
          削除、挿入、フィルタなど様々な操作を実現できます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">要素の削除</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    s := []int{1, 2, 3, 4, 5}

    // インデックス2の要素を削除（順序を保持）
    i := 2
    s = append(s[:i], s[i+1:]...)
    fmt.Println("削除後:", s)

    // 順序を保持しない高速削除
    s2 := []int{10, 20, 30, 40, 50}
    j := 1  // 20を削除
    s2[j] = s2[len(s2)-1]  // 最後の要素で上書き
    s2 = s2[:len(s2)-1]    // 長さを1減らす
    fmt.Println("高速削除後:", s2)
}`}
          expectedOutput={`削除後: [1 2 4 5]
高速削除後: [10 50 30 40]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">要素の挿入</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func insert(s []int, index int, value int) []int {
    s = append(s, 0)           // 長さを1増やす
    copy(s[index+1:], s[index:]) // 要素を右にずらす
    s[index] = value             // 値を設定
    return s
}

func main() {
    s := []int{1, 2, 4, 5}
    fmt.Println("挿入前:", s)

    // インデックス2に3を挿入
    s = insert(s, 2, 3)
    fmt.Println("挿入後:", s)

    // 先頭に0を挿入
    s = insert(s, 0, 0)
    fmt.Println("先頭挿入:", s)
}`}
          expectedOutput={`挿入前: [1 2 4 5]
挿入後: [1 2 3 4 5]
先頭挿入: [0 1 2 3 4 5]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィルタパターン</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func filter(s []int, fn func(int) bool) []int {
    result := s[:0]  // 同じバッキング配列を再利用
    for _, v := range s {
        if fn(v) {
            result = append(result, v)
        }
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

    // 偶数のみ
    evens := filter(append([]int(nil), nums...), func(n int) bool {
        return n%2 == 0
    })
    fmt.Println("偶数:", evens)

    // 5より大きい
    big := filter(append([]int(nil), nums...), func(n int) bool {
        return n > 5
    })
    fmt.Println("5より大きい:", big)

    // 重複を除去
    unique := []int{1, 2, 2, 3, 3, 3, 4}
    seen := make(map[int]bool)
    result := unique[:0]
    for _, v := range unique {
        if !seen[v] {
            seen[v] = true
            result = append(result, v)
        }
    }
    fmt.Println("重複除去:", result)
}`}
          expectedOutput={`偶数: [2 4 6 8 10]
5より大きい: [6 7 8 9 10]
重複除去: [1 2 3 4]`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="slice-tricks" />
      </div>
      <LessonNav lessons={lessons} currentId="slice-tricks" basePath="/learn/arrays" />
    </div>
  );
}
