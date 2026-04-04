import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("interfaces");

export default function InterfaceMethodsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">インターフェース レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドセット</h1>
        <p className="text-gray-400">インターフェースのメソッド定義を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メソッドセット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インターフェースはメソッドの集合（メソッドセット）を定義します。
          型のメソッドセットがインターフェースのメソッドセットを含んでいれば、その型はインターフェースを実装しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>値レシーバのメソッド → 値型とポインタ型の両方のメソッドセットに含まれる</li>
          <li>ポインタレシーバのメソッド → ポインタ型のメソッドセットにのみ含まれる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数メソッドのインターフェース</h2>
        <p className="text-gray-400 mb-4">
          インターフェースに複数のメソッドを定義できます。すべて実装する必要があります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Animal interface {
    Name() string
    Sound() string
}

type Dog struct{ name string }
func (d Dog) Name() string  { return d.name }
func (d Dog) Sound() string { return "ワンワン" }

type Cat struct{ name string }
func (c Cat) Name() string  { return c.name }
func (c Cat) Sound() string { return "ニャー" }

func introduce(a Animal) {
    fmt.Printf("%s は「%s」と鳴きます\\n", a.Name(), a.Sound())
}

func main() {
    introduce(Dog{name: "ポチ"})
    introduce(Cat{name: "タマ"})
}`}
          expectedOutput={`ポチ は「ワンワン」と鳴きます
タマ は「ニャー」と鳴きます`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタレシーバとインターフェース</h2>
        <p className="text-gray-400 mb-4">
          ポインタレシーバでメソッドを実装した場合、ポインタ値のみがインターフェースを満たします。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Writer interface {
    Write(data string)
}

type Logger struct {
    logs []string
}

// ポインタレシーバで実装
func (l *Logger) Write(data string) {
    l.logs = append(l.logs, data)
}

func logMessage(w Writer, msg string) {
    w.Write(msg)
}

func main() {
    logger := &Logger{} // ポインタとして作成
    logMessage(logger, "メッセージ1")
    logMessage(logger, "メッセージ2")

    fmt.Println("ログ:")
    for i, log := range logger.logs {
        fmt.Printf("  %d: %s\\n", i+1, log)
    }
}`}
          expectedOutput={`ログ:
  1: メッセージ1
  2: メッセージ2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="interfaces" lessonId="methods" />
      </div>
      <LessonNav lessons={lessons} currentId="methods" basePath="/learn/interfaces" />
    </div>
  );
}
