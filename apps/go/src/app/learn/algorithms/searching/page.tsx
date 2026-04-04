import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithms");

export default function SearchingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">探索アルゴリズム</h1>
        <p className="text-gray-400">線形探索と二分探索の実装と使い分けを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">探索アルゴリズムの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">線形探索</code>（O(n)）は先頭から順に調べる単純な方法です。
          <code className="text-cyan-300">二分探索</code>（O(log n)）はソート済みデータを半分ずつ絞り込む効率的な方法です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">線形探索</h2>
        <p className="text-gray-400 mb-4">
          先頭から順に要素を比較していく最もシンプルな探索方法です。ソート不要です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func linearSearch(arr []int, target int) int {
    for i, v := range arr {
        if v == target {
            return i
        }
    }
    return -1
}

func linearSearchAll(arr []int, target int) []int {
    var indices []int
    for i, v := range arr {
        if v == target {
            indices = append(indices, i)
        }
    }
    return indices
}

func main() {
    data := []int{4, 2, 7, 1, 9, 3, 7, 5, 7}

    // 最初に見つかった位置
    idx := linearSearch(data, 7)
    fmt.Printf("7の位置: %d\\n", idx)

    // 見つからない場合
    idx = linearSearch(data, 10)
    fmt.Printf("10の位置: %d (-1 = 見つからない)\\n", idx)

    // 全ての位置
    all := linearSearchAll(data, 7)
    fmt.Printf("7の全出現位置: %v\\n", all)
}`}
          expectedOutput={`7の位置: 2
10の位置: -1 (-1 = 見つからない)
7の全出現位置: [2 6 8]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">二分探索</h2>
        <p className="text-gray-400 mb-4">
          ソート済みデータを半分ずつ絞り込む<code className="text-cyan-300">二分探索</code>です。
          O(log n) の時間計算量で非常に高速です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func binarySearch(arr []int, target int) int {
    low, high := 0, len(arr)-1
    steps := 0

    for low <= high {
        steps++
        mid := (low + high) / 2
        fmt.Printf("  ステップ%d: arr[%d]=%d を確認\\n", steps, mid, arr[mid])

        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1
}

func main() {
    data := []int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}
    fmt.Println("データ:", data)

    fmt.Println("\\n--- 23を探索 ---")
    idx := binarySearch(data, 23)
    fmt.Printf("結果: インデックス %d\\n", idx)

    fmt.Println("\\n--- 50を探索 ---")
    idx = binarySearch(data, 50)
    fmt.Printf("結果: %d (見つからない)\\n", idx)
}`}
          expectedOutput={`データ: [2 5 8 12 16 23 38 56 72 91]

--- 23を探索 ---
  ステップ1: arr[4]=16 を確認
  ステップ2: arr[7]=56 を確認
  ステップ3: arr[5]=23 を確認
結果: インデックス 5

--- 50を探索 ---
  ステップ1: arr[4]=16 を確認
  ステップ2: arr[7]=56 を確認
  ステップ3: arr[5]=23 を確認
  ステップ4: arr[6]=38 を確認
結果: -1 (見つからない)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準ライブラリのsort.Search</h2>
        <p className="text-gray-400 mb-4">
          Goの標準ライブラリ<code className="text-cyan-300">sort.Search</code>を使った二分探索の例です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sort"
)

func main() {
    data := []int{1, 3, 5, 7, 9, 11, 13, 15}
    fmt.Println("データ:", data)

    // sort.SearchIntsで二分探索
    target := 7
    idx := sort.SearchInts(data, target)
    if idx < len(data) && data[idx] == target {
        fmt.Printf("%d はインデックス %d にあります\\n", target, idx)
    }

    // sort.Searchで汎用的な二分探索
    target2 := 11
    idx2 := sort.Search(len(data), func(i int) bool {
        return data[i] >= target2
    })
    if idx2 < len(data) && data[idx2] == target2 {
        fmt.Printf("%d はインデックス %d にあります\\n", target2, idx2)
    }

    // 存在しない値
    target3 := 6
    idx3 := sort.SearchInts(data, target3)
    fmt.Printf("%d の挿入位置: インデックス %d\\n", target3, idx3)

    // 計算量比較
    fmt.Println("\\n--- 探索の比較 ---")
    fmt.Println("線形探索: O(n)   ソート不要")
    fmt.Println("二分探索: O(log n) ソート必要")
}`}
          expectedOutput={`データ: [1 3 5 7 9 11 13 15]
7 はインデックス 3 にあります
11 はインデックス 5 にあります
6 の挿入位置: インデックス 3

--- 探索の比較 ---
線形探索: O(n)   ソート不要
二分探索: O(log n) ソート必要`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="searching" />
      </div>
      <LessonNav lessons={lessons} currentId="searching" basePath="/learn/algorithms" />
    </div>
  );
}
