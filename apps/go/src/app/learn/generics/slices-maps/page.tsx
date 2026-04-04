import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function SlicesMapsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ジェネリクス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">slices・mapsパッケージ</h1>
        <p className="text-gray-400">標準ライブラリのジェネリック関数 slices.Sort、maps.Keys などを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">標準ライブラリのジェネリクス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Go 1.21で <code className="text-cyan-300">slices</code> パッケージと
          <code className="text-cyan-300">maps</code> パッケージが標準ライブラリに追加されました。
          ジェネリクスを活用した便利な関数が含まれています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">slices.Sort</code> — ソート</li>
          <li><code className="text-cyan-300">slices.Contains</code> — 要素の存在チェック</li>
          <li><code className="text-cyan-300">slices.Index</code> — インデックス検索</li>
          <li><code className="text-cyan-300">maps.Keys</code> — キーのスライス</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">slices パッケージ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">slices</code> パッケージの主要な関数を紹介します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "slices"
)

func main() {
    // Sort
    nums := []int{5, 3, 1, 4, 2}
    slices.Sort(nums)
    fmt.Println("Sort:", nums)

    // Contains
    fmt.Println("Contains(3):", slices.Contains(nums, 3))
    fmt.Println("Contains(9):", slices.Contains(nums, 9))

    // Index
    fmt.Println("Index(4):", slices.Index(nums, 4))

    // Min, Max
    fmt.Println("Min:", slices.Min(nums))
    fmt.Println("Max:", slices.Max(nums))

    // Reverse
    strs := []string{"Go", "Rust", "Python"}
    slices.Reverse(strs)
    fmt.Println("Reverse:", strs)
}`}
          expectedOutput={`Sort: [1 2 3 4 5]
Contains(3): true
Contains(9): false
Index(4): 3
Min: 1
Max: 5
Reverse: [Python Rust Go]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">slices.SortFunc</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">slices.SortFunc</code> でカスタム比較関数を使ったソートができます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "cmp"
    "fmt"
    "slices"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    people := []Person{
        {"太郎", 30},
        {"花子", 25},
        {"一郎", 35},
        {"美咲", 28},
    }

    // 年齢でソート
    slices.SortFunc(people, func(a, b Person) int {
        return cmp.Compare(a.Age, b.Age)
    })

    fmt.Println("年齢順:")
    for _, p := range people {
        fmt.Printf("  %s (%d歳)\\n", p.Name, p.Age)
    }
}`}
          expectedOutput={`年齢順:
  花子 (25歳)
  美咲 (28歳)
  太郎 (30歳)
  一郎 (35歳)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">maps パッケージ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">maps</code> パッケージでマップの操作を行います。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "maps"
    "slices"
)

func main() {
    scores := map[string]int{
        "Go":     95,
        "Python": 88,
        "Rust":   92,
    }

    // Keys — キーのスライス
    keys := slices.Sorted(maps.Keys(scores))
    fmt.Println("キー（ソート済）:", keys)

    // Values — 値のスライス
    values := slices.Sorted(maps.Values(scores))
    fmt.Println("値（ソート済）:", values)

    // Equal — マップの比較
    other := map[string]int{
        "Go":     95,
        "Python": 88,
        "Rust":   92,
    }
    fmt.Println("Equal:", maps.Equal(scores, other))

    // Clone — マップのコピー
    clone := maps.Clone(scores)
    clone["Java"] = 80
    fmt.Println("元:", len(scores), "件")
    fmt.Println("クローン:", len(clone), "件")
}`}
          expectedOutput={`キー（ソート済）: [Go Python Rust]
値（ソート済）: [88 92 95]
Equal: true
元: 3 件
クローン: 4 件`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="slices-maps" />
      </div>
      <LessonNav lessons={lessons} currentId="slices-maps" basePath="/learn/generics" />
    </div>
  );
}
