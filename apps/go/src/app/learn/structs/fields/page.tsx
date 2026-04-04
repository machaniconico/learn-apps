import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function FieldsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">構造体 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フィールド</h1>
        <p className="text-gray-400">フィールドのアクセスと初期化を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フィールドアクセス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体のフィールドには <code className="text-cyan-300">.</code> でアクセスします。
          大文字で始まるフィールドはエクスポートされ、小文字は非公開です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィールドの読み書き</h2>
        <p className="text-gray-400 mb-4">
          ドット記法でフィールドを読み書きします。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Book struct {
    Title  string
    Author string
    Pages  int
    Price  float64
}

func main() {
    book := Book{
        Title:  "Go入門",
        Author: "山田太郎",
        Pages:  300,
        Price:  2800,
    }

    // 読み取り
    fmt.Println("タイトル:", book.Title)
    fmt.Println("著者:", book.Author)

    // 書き込み
    book.Price = 2500
    fmt.Printf("値下げ後: %.0f円\\n", book.Price)
}`}
          expectedOutput={`タイトル: Go入門
著者: 山田太郎
値下げ後: 2500円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体のスライス</h2>
        <p className="text-gray-400 mb-4">
          構造体のスライスを使ってデータのリストを管理できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Student struct {
    Name  string
    Score int
}

func main() {
    students := []Student{
        {Name: "太郎", Score: 85},
        {Name: "花子", Score: 92},
        {Name: "次郎", Score: 78},
    }

    for _, s := range students {
        status := "不合格"
        if s.Score >= 80 {
            status = "合格"
        }
        fmt.Printf("%s: %d点 (%s)\\n", s.Name, s.Score, status)
    }
}`}
          expectedOutput={`太郎: 85点 (合格)
花子: 92点 (合格)
次郎: 78点 (不合格)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="fields" />
      </div>
      <LessonNav lessons={lessons} currentId="fields" basePath="/learn/structs" />
    </div>
  );
}
