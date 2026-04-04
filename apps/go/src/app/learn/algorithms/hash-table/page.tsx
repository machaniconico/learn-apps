import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algorithms");

export default function HashTablePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ハッシュテーブル</h1>
        <p className="text-gray-400">ハッシュマップの概念と簡単な実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ハッシュテーブルとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">ハッシュテーブル</code>はキーからハッシュ値を計算し、
          値を格納する位置を決定するデータ構造です。平均 O(1) でアクセスできます。
          Goの<code className="text-cyan-300">map</code>は内部的にハッシュテーブルで実装されています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">簡易ハッシュテーブルの実装</h2>
        <p className="text-gray-400 mb-4">
          ハッシュ関数とチェイン法（連結リスト）による衝突解決を持つ簡易ハッシュテーブルです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Entry struct {
    Key   string
    Value string
    Next  *Entry
}

type HashTable struct {
    buckets []*Entry
    size    int
}

func NewHashTable(size int) *HashTable {
    return &HashTable{
        buckets: make([]*Entry, size),
        size:    size,
    }
}

func (ht *HashTable) hash(key string) int {
    h := 0
    for _, ch := range key {
        h = (h*31 + int(ch)) % ht.size
    }
    return h
}

func (ht *HashTable) Put(key, value string) {
    idx := ht.hash(key)
    entry := ht.buckets[idx]

    // 既存キーの更新
    for entry != nil {
        if entry.Key == key {
            entry.Value = value
            return
        }
        entry = entry.Next
    }

    // 新規追加（先頭に挿入）
    newEntry := &Entry{Key: key, Value: value, Next: ht.buckets[idx]}
    ht.buckets[idx] = newEntry
}

func (ht *HashTable) Get(key string) (string, bool) {
    idx := ht.hash(key)
    entry := ht.buckets[idx]
    for entry != nil {
        if entry.Key == key {
            return entry.Value, true
        }
        entry = entry.Next
    }
    return "", false
}

func main() {
    ht := NewHashTable(8)
    ht.Put("name", "Gopher")
    ht.Put("lang", "Go")
    ht.Put("year", "2009")

    keys := []string{"name", "lang", "year", "missing"}
    for _, k := range keys {
        v, ok := ht.Get(k)
        if ok {
            fmt.Printf("%s: %s\\n", k, v)
        } else {
            fmt.Printf("%s: (見つからない)\\n", k)
        }
    }
}`}
          expectedOutput={`name: Gopher
lang: Go
year: 2009
missing: (見つからない)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ハッシュの衝突</h2>
        <p className="text-gray-400 mb-4">
          ハッシュテーブルでは異なるキーが同じバケットにマッピングされる<code className="text-cyan-300">衝突</code>が発生します。
          チェイン法では連結リストで解決します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func simpleHash(key string, size int) int {
    h := 0
    for _, ch := range key {
        h += int(ch)
    }
    return h % size
}

func main() {
    bucketSize := 8
    keys := []string{"go", "og", "apple", "banana", "cat", "dog", "egg"}

    fmt.Printf("バケットサイズ: %d\\n\\n", bucketSize)

    // 各キーのハッシュ値を表示
    buckets := make(map[int][]string)
    for _, key := range keys {
        h := simpleHash(key, bucketSize)
        buckets[h] = append(buckets[h], key)
        fmt.Printf("hash(%q) = %d\\n", key, h)
    }

    // 衝突を表示
    fmt.Println("\\nバケット状態:")
    for i := 0; i < bucketSize; i++ {
        if items, ok := buckets[i]; ok {
            fmt.Printf("  [%d]: %v", i, items)
            if len(items) > 1 {
                fmt.Print(" <- 衝突!")
            }
            fmt.Println()
        }
    }
}`}
          expectedOutput={`バケットサイズ: 8

hash("go") = 7
hash("og") = 7
hash("apple") = 2
hash("banana") = 6
hash("cat") = 0
hash("dog") = 0
hash("egg") = 5

バケット状態:
  [0]: [cat dog] <- 衝突!
  [2]: [apple]
  [5]: [egg]
  [6]: [banana]
  [7]: [go og] <- 衝突!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Goのmapとの比較</h2>
        <p className="text-gray-400 mb-4">
          Goの組み込み<code className="text-cyan-300">map</code>は最適化されたハッシュテーブルです。
          通常はmapを使い、内部の仕組みを理解しておくことが大切です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // Goのmap = 最適化されたハッシュテーブル
    scores := map[string]int{
        "Alice":   95,
        "Bob":     82,
        "Charlie": 90,
    }

    // O(1) でアクセス
    fmt.Printf("Alice: %d\\n", scores["Alice"])

    // ok idiom で存在チェック
    if v, ok := scores["Dave"]; ok {
        fmt.Printf("Dave: %d\\n", v)
    } else {
        fmt.Println("Dave: 存在しない")
    }

    // ハッシュテーブルの特徴
    features := []struct {
        op   string
        time string
    }{
        {"検索", "O(1) 平均"},
        {"挿入", "O(1) 平均"},
        {"削除", "O(1) 平均"},
        {"走査", "O(n)"},
    }

    fmt.Println("\\n--- ハッシュテーブル計算量 ---")
    for _, f := range features {
        fmt.Printf("%s: %s\\n", f.op, f.time)
    }
}`}
          expectedOutput={`Alice: 95
Dave: 存在しない

--- ハッシュテーブル計算量 ---
検索: O(1) 平均
挿入: O(1) 平均
削除: O(1) 平均
走査: O(n)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="hash-table" />
      </div>
      <LessonNav lessons={lessons} currentId="hash-table" basePath="/learn/algorithms" />
    </div>
  );
}
