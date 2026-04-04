import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("maps");

export default function MapsOperationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">マップ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">操作</h1>
        <p className="text-gray-400">マップへの追加、取得、削除の操作を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本操作</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マップの基本操作は、<code className="text-cyan-300">m[key] = value</code>（追加/更新）、
          <code className="text-cyan-300">m[key]</code>（取得）、<code className="text-cyan-300">delete(m, key)</code>（削除）の3つです。
          存在しないキーを取得するとゼロ値が返ります。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">追加と更新</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    m := make(map[string]int)

    // 追加
    m["apple"] = 3
    m["banana"] = 5
    m["cherry"] = 2
    fmt.Println("追加後:", m)

    // 更新（同じキーに代入）
    m["apple"] = 10
    fmt.Println("更新後:", m)

    // カウンターとして使用
    word := "hello"
    counter := make(map[rune]int)
    for _, ch := range word {
        counter[ch]++
    }
    fmt.Println("文字カウント:", counter)
}`}
          expectedOutput={`追加後: map[apple:3 banana:5 cherry:2]
更新後: map[apple:10 banana:5 cherry:2]
文字カウント: map[101:1 104:1 108:2 111:1]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">削除</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    fruits := map[string]int{
        "apple":  3,
        "banana": 5,
        "cherry": 2,
        "date":   7,
    }
    fmt.Println("削除前:", fruits)
    fmt.Println("要素数:", len(fruits))

    // 削除
    delete(fruits, "banana")
    fmt.Println("banana削除後:", fruits)
    fmt.Println("要素数:", len(fruits))

    // 存在しないキーのdeleteはエラーにならない
    delete(fruits, "grape")
    fmt.Println("grape削除後:", fruits)
}`}
          expectedOutput={`削除前: map[apple:3 banana:5 cherry:2 date:7]
要素数: 4
banana削除後: map[apple:3 cherry:2 date:7]
要素数: 3
grape削除後: map[apple:3 cherry:2 date:7]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用例：単語カウンター</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func wordCount(text string) map[string]int {
    counts := make(map[string]int)
    words := strings.Fields(text)
    for _, word := range words {
        lower := strings.ToLower(word)
        counts[lower]++
    }
    return counts
}

func main() {
    text := "Go is great Go is fast Go is fun"
    counts := wordCount(text)

    for word, count := range counts {
        fmt.Printf("%s: %d回\\n", word, count)
    }
}`}
          expectedOutput={`go: 3回
is: 3回
great: 1回
fast: 1回
fun: 1回`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="maps" lessonId="operations" />
      </div>
      <LessonNav lessons={lessons} currentId="operations" basePath="/learn/maps" />
    </div>
  );
}
