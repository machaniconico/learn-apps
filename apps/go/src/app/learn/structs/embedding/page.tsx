import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function EmbeddingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">構造体 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">埋め込み</h1>
        <p className="text-gray-400">構造体の埋め込みによる再利用を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">構造体の埋め込み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フィールド名を省略して型名だけ書くと、その型のフィールドとメソッドが昇格されます。
          継承ではなく「合成（コンポジション）」です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な埋め込み</h2>
        <p className="text-gray-400 mb-4">
          埋め込まれた構造体のフィールドに直接アクセスできます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Address struct {
    City    string
    Country string
}

type Employee struct {
    Name string
    Age  int
    Address // 埋め込み（フィールド名なし）
}

func main() {
    emp := Employee{
        Name: "太郎",
        Age:  30,
        Address: Address{
            City:    "東京",
            Country: "日本",
        },
    }

    // 直接アクセス（昇格されたフィールド）
    fmt.Println("名前:", emp.Name)
    fmt.Println("都市:", emp.City)    // emp.Address.City と同じ
    fmt.Println("国:", emp.Country)
}`}
          expectedOutput={`名前: 太郎
都市: 東京
国: 日本`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドの昇格</h2>
        <p className="text-gray-400 mb-4">
          埋め込まれた型のメソッドも昇格され、外側の構造体から直接呼べます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Logger struct {
    Prefix string
}

func (l Logger) Log(msg string) {
    fmt.Printf("[%s] %s\\n", l.Prefix, msg)
}

type Server struct {
    Host string
    Port int
    Logger // メソッドも昇格
}

func main() {
    s := Server{
        Host:   "localhost",
        Port:   8080,
        Logger: Logger{Prefix: "SERVER"},
    }

    // Loggerのメソッドを直接呼べる
    s.Log("サーバー起動")
    s.Log(fmt.Sprintf("ポート %d で待機中", s.Port))
}`}
          expectedOutput={`[SERVER] サーバー起動
[SERVER] ポート 8080 で待機中`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="embedding" />
      </div>
      <LessonNav lessons={lessons} currentId="embedding" basePath="/learn/structs" />
    </div>
  );
}
