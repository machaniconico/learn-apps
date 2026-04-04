import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function ComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">構造体 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">比較</h1>
        <p className="text-gray-400">構造体の比較と等価性を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体の比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべてのフィールドが比較可能な型であれば、構造体は <code className="text-cyan-300">==</code> で比較できます。
          スライスやマップを含む構造体は比較できません。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">等価比較</h2>
        <p className="text-gray-400 mb-4">
          全フィールドが一致すれば等しいと判定されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Point struct {
    X, Y int
}

func main() {
    p1 := Point{1, 2}
    p2 := Point{1, 2}
    p3 := Point{3, 4}

    fmt.Println("p1 == p2:", p1 == p2) // true
    fmt.Println("p1 == p3:", p1 == p3) // false
    fmt.Println("p1 != p3:", p1 != p3) // true
}`}
          expectedOutput={`p1 == p2: true
p1 == p3: false
p1 != p3: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">比較不可能な構造体</h2>
        <p className="text-gray-400 mb-4">
          スライスやマップを含む構造体は <code className="text-cyan-300">==</code> で比較できません。
          <code className="text-cyan-300">reflect.DeepEqual</code> を使うか、独自の比較メソッドを書きます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "reflect"
)

type Team struct {
    Name    string
    Members []string // スライスを含むので == は使えない
}

func (t Team) Equal(other Team) bool {
    if t.Name != other.Name {
        return false
    }
    return reflect.DeepEqual(t.Members, other.Members)
}

func main() {
    t1 := Team{Name: "Alpha", Members: []string{"太郎", "花子"}}
    t2 := Team{Name: "Alpha", Members: []string{"太郎", "花子"}}
    t3 := Team{Name: "Beta", Members: []string{"次郎"}}

    fmt.Println("t1 == t2:", t1.Equal(t2))
    fmt.Println("t1 == t3:", t1.Equal(t3))
}`}
          expectedOutput={`t1 == t2: true
t1 == t3: false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="comparison" basePath="/learn/structs" />
    </div>
  );
}
