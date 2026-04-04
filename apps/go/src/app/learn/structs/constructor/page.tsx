import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function ConstructorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">構造体 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンストラクタパターン</h1>
        <p className="text-gray-400">New関数による初期化パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンストラクタ関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GoにはコンストラクタはありませんがConventionとして <code className="text-cyan-300">New型名</code> 関数を定義します。
          バリデーションやデフォルト値の設定を行う場所として使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">New関数パターン</h2>
        <p className="text-gray-400 mb-4">
          ポインタを返すコンストラクタ関数を定義します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Server struct {
    Host    string
    Port    int
    Timeout int
}

func NewServer(host string, port int) *Server {
    return &Server{
        Host:    host,
        Port:    port,
        Timeout: 30, // デフォルト値
    }
}

func (s *Server) String() string {
    return fmt.Sprintf("%s:%d (timeout=%ds)", s.Host, s.Port, s.Timeout)
}

func main() {
    s := NewServer("localhost", 8080)
    fmt.Println(s)
}`}
          expectedOutput={`localhost:8080 (timeout=30s)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バリデーション付きコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          エラーを返すコンストラクタで入力を検証します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type User struct {
    Name string
    Age  int
}

func NewUser(name string, age int) (*User, error) {
    if name == "" {
        return nil, fmt.Errorf("名前は必須です")
    }
    if age < 0 || age > 150 {
        return nil, fmt.Errorf("年齢が不正です: %d", age)
    }
    return &User{Name: name, Age: age}, nil
}

func main() {
    u1, err := NewUser("太郎", 25)
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Printf("作成: %+v\\n", *u1)
    }

    _, err2 := NewUser("", 25)
    if err2 != nil {
        fmt.Println("エラー:", err2)
    }
}`}
          expectedOutput={`作成: {Name:太郎 Age:25}
エラー: 名前は必須です`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="constructor" />
      </div>
      <LessonNav lessons={lessons} currentId="constructor" basePath="/learn/structs" />
    </div>
  );
}
