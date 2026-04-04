import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function NewMakePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">ポインタ レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">newとmake</h1>
        <p className="text-gray-400">new()とmake()の違いとそれぞれの使い分けを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">newとmakeの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">new(T)</code> はT型のゼロ値を割り当て、そのポインタ <code className="text-cyan-300">*T</code> を返します。
          あらゆる型に使えます。一方、<code className="text-cyan-300">make(T, ...)</code> はスライス、マップ、チャネルの3種類のみに使え、
          初期化された（ゼロ値ではない）T型の値を返します。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">new()の使い方</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // new()はゼロ値のポインタを返す
    p := new(int)
    fmt.Println("new(int):", *p)

    s := new(string)
    fmt.Println("new(string):", *s, "(空文字)")

    b := new(bool)
    fmt.Println("new(bool):", *b)

    // 値を設定
    *p = 42
    fmt.Println("設定後:", *p)

    // 構造体にも使える
    type Point struct {
        X, Y int
    }
    pt := new(Point)
    fmt.Printf("new(Point): %+v\\n", *pt)
    pt.X = 10
    pt.Y = 20
    fmt.Printf("設定後: %+v\\n", *pt)
}`}
          expectedOutput={`new(int): 0
new(string):  (空文字)
new(bool): false
設定後: 42
new(Point): {X:0 Y:0}
設定後: {X:10 Y:20}`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">make()の使い方</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // スライスの作成
    s := make([]int, 3, 5)
    fmt.Printf("スライス: %v (長さ=%d, 容量=%d)\\n", s, len(s), cap(s))

    // マップの作成
    m := make(map[string]int)
    m["Go"] = 2009
    fmt.Println("マップ:", m)

    // チャネルの作成
    ch := make(chan string, 1)
    ch <- "Hello"
    msg := <-ch
    fmt.Println("チャネル:", msg)
}`}
          expectedOutput={`スライス: [0 0 0] (長さ=3, 容量=5)
マップ: map[Go:2009]
チャネル: Hello`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">newとmakeの使い分け</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Server struct {
    Host    string
    Port    int
    clients map[string]bool
}

func NewServer(host string, port int) *Server {
    // new()で構造体を作り、make()で内部マップを初期化
    s := new(Server)
    s.Host = host
    s.Port = port
    s.clients = make(map[string]bool)
    return s
}

// または &リテラルで同等のことを行う
func NewServerAlt(host string, port int) *Server {
    return &Server{
        Host:    host,
        Port:    port,
        clients: make(map[string]bool),
    }
}

func main() {
    srv := NewServer("localhost", 8080)
    srv.clients["user1"] = true
    srv.clients["user2"] = true
    fmt.Printf("サーバー: %s:%d\\n", srv.Host, srv.Port)
    fmt.Println("クライアント数:", len(srv.clients))
}`}
          expectedOutput={`サーバー: localhost:8080
クライアント数: 2`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="new-make" />
      </div>
      <LessonNav lessons={lessons} currentId="new-make" basePath="/learn/pointers" />
    </div>
  );
}
