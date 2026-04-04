import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithms");

export default function SortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソートアルゴリズム</h1>
        <p className="text-gray-400">バブルソート、クイックソート、マージソートの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ソートアルゴリズムの比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ソートはデータを整列させる基本的なアルゴリズムです。
          <code className="text-cyan-300">バブルソート</code>（O(n^2)）は簡単ですが遅く、
          <code className="text-cyan-300">クイックソート</code>やマージソート（O(n log n)）は効率的です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バブルソート</h2>
        <p className="text-gray-400 mb-4">
          隣接する要素を比較し交換する最も基本的なソートです。時間計算量は O(n^2) です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func bubbleSort(arr []int) []int {
    result := make([]int, len(arr))
    copy(result, arr)
    n := len(result)

    for i := 0; i < n-1; i++ {
        swapped := false
        for j := 0; j < n-i-1; j++ {
            if result[j] > result[j+1] {
                result[j], result[j+1] = result[j+1], result[j]
                swapped = true
            }
        }
        // 交換がなければソート済み
        if !swapped {
            break
        }
        fmt.Printf("パス%d: %v\\n", i+1, result)
    }
    return result
}

func main() {
    data := []int{64, 34, 25, 12, 22}
    fmt.Println("入力:", data)
    fmt.Println()
    result := bubbleSort(data)
    fmt.Println("\\n結果:", result)
}`}
          expectedOutput={`入力: [64 34 25 12 22]

パス1: [34 25 12 22 64]
パス2: [25 12 22 34 64]
パス3: [12 22 25 34 64]

結果: [12 22 25 34 64]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クイックソート</h2>
        <p className="text-gray-400 mb-4">
          ピボットを基準に分割統治法で並べ替える効率的なソートです。平均 O(n log n) です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func quickSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }

    pivot := arr[len(arr)/2]
    var left, middle, right []int

    for _, v := range arr {
        switch {
        case v < pivot:
            left = append(left, v)
        case v == pivot:
            middle = append(middle, v)
        case v > pivot:
            right = append(right, v)
        }
    }

    result := quickSort(left)
    result = append(result, middle...)
    result = append(result, quickSort(right)...)
    return result
}

func main() {
    data := []int{38, 27, 43, 3, 9, 82, 10}
    fmt.Println("入力:", data)
    result := quickSort(data)
    fmt.Println("結果:", result)

    // 文字列もソート可能
    words := []string{"go", "python", "java", "c", "rust"}
    fmt.Println("\\n文字列ソート前:", words)
    // 標準ライブラリ: sort.Strings(words)
}`}
          expectedOutput={`入力: [38 27 43 3 9 82 10]
結果: [3 9 10 27 38 43 82]

文字列ソート前: [go python java c rust]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マージソート</h2>
        <p className="text-gray-400 mb-4">
          配列を半分に分割し、再帰的にソートしてからマージする安定ソートです。常に O(n log n) です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func merge(left, right []int) []int {
    result := make([]int, 0, len(left)+len(right))
    i, j := 0, 0

    for i < len(left) && j < len(right) {
        if left[i] <= right[j] {
            result = append(result, left[i])
            i++
        } else {
            result = append(result, right[j])
            j++
        }
    }
    result = append(result, left[i:]...)
    result = append(result, right[j:]...)
    return result
}

func mergeSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }

    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    return merge(left, right)
}

func main() {
    data := []int{38, 27, 43, 3, 9, 82, 10}
    fmt.Println("入力:", data)
    result := mergeSort(data)
    fmt.Println("結果:", result)

    // 計算量の比較
    fmt.Println("\\n--- 計算量比較 ---")
    fmt.Println("バブルソート: O(n^2)")
    fmt.Println("クイックソート: O(n log n) 平均")
    fmt.Println("マージソート: O(n log n) 常時")
}`}
          expectedOutput={`入力: [38 27 43 3 9 82 10]
結果: [3 9 10 27 38 43 82]

--- 計算量比較 ---
バブルソート: O(n^2)
クイックソート: O(n log n) 平均
マージソート: O(n log n) 常時`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/algorithms" />
    </div>
  );
}
