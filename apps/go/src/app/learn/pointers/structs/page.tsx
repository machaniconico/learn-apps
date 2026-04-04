import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function PointersStructsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ポインタ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">構造体とポインタ</h1>
        <p className="text-gray-400">構造体ポインタの操作と自動デリファレンスについて学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体ポインタの自動デリファレンス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goでは構造体のポインタからフィールドにアクセスする際、<code className="text-cyan-300">(*p).Field</code> と書く代わりに
          <code className="text-cyan-300">p.Field</code> と書けます。コンパイラが自動的にデリファレンスしてくれます。
          C言語の <code className="text-cyan-300">-&gt;</code> 演算子に相当しますが、Goではドット演算子で統一されています。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体ポインタの基本</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "太郎", Age: 25}
    ptr := &p

    // 自動デリファレンス
    fmt.Println("名前:", ptr.Name)
    fmt.Println("年齢:", ptr.Age)

    // 明示的なデリファレンスも可能
    fmt.Println("明示的:", (*ptr).Name)

    // ポインタ経由でフィールドを変更
    ptr.Age = 30
    fmt.Println("変更後:", p.Age)
}`}
          expectedOutput={`名前: 太郎
年齢: 25
明示的: 太郎
変更後: 30`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">&を使った構造体リテラル</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Point struct {
    X, Y int
}

func newPoint(x, y int) *Point {
    return &Point{X: x, Y: y}
}

func main() {
    // &で直接ポインタを作成
    p1 := &Point{X: 10, Y: 20}
    fmt.Printf("p1: (%d, %d)\\n", p1.X, p1.Y)

    // コンストラクタ関数
    p2 := newPoint(30, 40)
    fmt.Printf("p2: (%d, %d)\\n", p2.X, p2.Y)

    // 関数で構造体を変更
    moveRight(p2, 10)
    fmt.Printf("移動後: (%d, %d)\\n", p2.X, p2.Y)
}

func moveRight(p *Point, dx int) {
    p.X += dx
}`}
          expectedOutput={`p1: (10, 20)
p2: (30, 40)
移動後: (40, 40)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体のスライスとポインタ</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Student struct {
    Name  string
    Score int
}

func addBonus(students []*Student, bonus int) {
    for _, s := range students {
        s.Score += bonus
    }
}

func main() {
    students := []*Student{
        {Name: "Alice", Score: 80},
        {Name: "Bob", Score: 65},
        {Name: "Carol", Score: 92},
    }

    fmt.Println("ボーナス前:")
    for _, s := range students {
        fmt.Printf("  %s: %d点\\n", s.Name, s.Score)
    }

    addBonus(students, 10)

    fmt.Println("ボーナス後:")
    for _, s := range students {
        fmt.Printf("  %s: %d点\\n", s.Name, s.Score)
    }
}`}
          expectedOutput={`ボーナス前:
  Alice: 80点
  Bob: 65点
  Carol: 92点
ボーナス後:
  Alice: 90点
  Bob: 75点
  Carol: 102点`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="structs" />
      </div>
      <LessonNav lessons={lessons} currentId="structs" basePath="/learn/pointers" />
    </div>
  );
}
