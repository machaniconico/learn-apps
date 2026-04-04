import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("maps");

export default function CheckExistencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">マップ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">存在チェック</h1>
        <p className="text-gray-400">val, ok := m[key] のok idiomでキーの存在を確認する方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ok idiomとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マップからゼロ値が返された場合、「キーが存在しない」のか「値がゼロ値」なのか区別できません。
          <code className="text-cyan-300">val, ok := m[key]</code> の形式で受け取ると、
          <code className="text-cyan-300">ok</code>が<code className="text-cyan-300">true</code>ならキーが存在し、
          <code className="text-cyan-300">false</code>なら存在しないことがわかります。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な存在チェック</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    ages := map[string]int{
        "Alice": 25,
        "Bob":   0,  // 意図的にゼロ値
    }

    // ok idiomで存在チェック
    val1, ok1 := ages["Alice"]
    fmt.Printf("Alice: val=%d, ok=%t\\n", val1, ok1)

    val2, ok2 := ages["Bob"]
    fmt.Printf("Bob: val=%d, ok=%t\\n", val2, ok2)

    val3, ok3 := ages["Carol"]
    fmt.Printf("Carol: val=%d, ok=%t\\n", val3, ok3)

    // Bobは存在する（値が0でもok=true）
    // Carolは存在しない（ok=false）
}`}
          expectedOutput={`Alice: val=25, ok=true
Bob: val=0, ok=true
Carol: val=0, ok=false`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">if文と組み合わせる</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    config := map[string]string{
        "host": "localhost",
        "port": "8080",
    }

    // if文の中で宣言して使う
    if host, ok := config["host"]; ok {
        fmt.Println("ホスト:", host)
    } else {
        fmt.Println("ホストが設定されていません")
    }

    if db, ok := config["database"]; ok {
        fmt.Println("DB:", db)
    } else {
        fmt.Println("データベースが設定されていません")
    }

    // デフォルト値パターン
    timeout := "30s"
    if v, ok := config["timeout"]; ok {
        timeout = v
    }
    fmt.Println("タイムアウト:", timeout)
}`}
          expectedOutput={`ホスト: localhost
データベースが設定されていません
タイムアウト: 30s`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用例：セットの実装</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type StringSet map[string]struct{}

func NewStringSet(items ...string) StringSet {
    s := make(StringSet)
    for _, item := range items {
        s[item] = struct{}{}
    }
    return s
}

func (s StringSet) Contains(item string) bool {
    _, ok := s[item]
    return ok
}

func (s StringSet) Add(item string) {
    s[item] = struct{}{}
}

func main() {
    fruits := NewStringSet("apple", "banana", "cherry")

    fmt.Println("apple含む:", fruits.Contains("apple"))
    fmt.Println("grape含む:", fruits.Contains("grape"))

    fruits.Add("grape")
    fmt.Println("追加後 grape含む:", fruits.Contains("grape"))
}`}
          expectedOutput={`apple含む: true
grape含む: false
追加後 grape含む: true`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="maps" lessonId="check-existence" />
      </div>
      <LessonNav lessons={lessons} currentId="check-existence" basePath="/learn/maps" />
    </div>
  );
}
