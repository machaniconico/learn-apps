import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("interfaces");

export default function CompositionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">インターフェース レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">合成</h1>
        <p className="text-gray-400">インターフェースの合成を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースの合成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数のインターフェースを埋め込んで、新しいインターフェースを作れます。
          標準ライブラリの <code className="text-cyan-300">io.ReadWriter</code> は
          <code className="text-cyan-300">io.Reader</code> と <code className="text-cyan-300">io.Writer</code> の合成です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースの埋め込み</h2>
        <p className="text-gray-400 mb-4">
          小さなインターフェースを組み合わせて大きなインターフェースを作ります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Reader interface {
    Read() string
}

type Writer interface {
    Write(data string)
}

// ReaderとWriterを合成
type ReadWriter interface {
    Reader
    Writer
}

type File struct {
    name    string
    content string
}

func (f *File) Read() string {
    return f.content
}

func (f *File) Write(data string) {
    f.content = data
}

func process(rw ReadWriter) {
    rw.Write("Hello, Go!")
    fmt.Println("読み取り:", rw.Read())
}

func main() {
    f := &File{name: "test.txt"}
    process(f)
}`}
          expectedOutput={`読み取り: Hello, Go!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">実用的な合成パターン</h2>
        <p className="text-gray-400 mb-4">
          小さなインターフェースを組み合わせることで、柔軟な設計ができます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Namer interface {
    Name() string
}

type Pricer interface {
    Price() int
}

type Displayer interface {
    Display() string
}

// 3つのインターフェースを合成
type Product interface {
    Namer
    Pricer
    Displayer
}

type Book struct {
    title  string
    price  int
    author string
}

func (b Book) Name() string    { return b.title }
func (b Book) Price() int      { return b.price }
func (b Book) Display() string {
    return fmt.Sprintf("📖 %s by %s - %d円", b.title, b.author, b.price)
}

func showProduct(p Product) {
    fmt.Println(p.Display())
}

// 小さなインターフェースで受け取ることもできる
func showPrice(p Pricer) {
    fmt.Printf("価格: %d円\\n", p.Price())
}

func main() {
    book := Book{title: "Go入門", price: 2800, author: "太郎"}
    showProduct(book)
    showPrice(book)
}`}
          expectedOutput={`📖 Go入門 by 太郎 - 2800円
価格: 2800円`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="interfaces" lessonId="composition" />
      </div>
      <LessonNav lessons={lessons} currentId="composition" basePath="/learn/interfaces" />
    </div>
  );
}
