import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function FormattingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フォーマット</h1>
        <p className="text-gray-400">fmt.Sprintfとフォーマット動詞を使った文字列のフォーマットを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">フォーマット動詞</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">fmt.Sprintf</code> はフォーマット動詞を使って文字列を組み立てます。
          主な動詞: <code className="text-cyan-300">%s</code>（文字列）、<code className="text-cyan-300">%d</code>（整数）、
          <code className="text-cyan-300">%f</code>（浮動小数点）、<code className="text-cyan-300">%v</code>（汎用）、
          <code className="text-cyan-300">%T</code>（型名）、<code className="text-cyan-300">%t</code>（真偽値）です。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なフォーマット</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    name := "Gopher"
    age := 12
    height := 1.75
    active := true

    // 各種フォーマット動詞
    fmt.Printf("文字列: %s\\n", name)
    fmt.Printf("整数: %d\\n", age)
    fmt.Printf("浮動小数: %f\\n", height)
    fmt.Printf("小数2桁: %.2f\\n", height)
    fmt.Printf("真偽値: %t\\n", active)
    fmt.Printf("型名: %T\\n", height)
    fmt.Printf("汎用: %v\\n", age)
}`}
          expectedOutput={`文字列: Gopher
整数: 12
浮動小数: 1.750000
小数2桁: 1.75
真偽値: true
型名: float64
汎用: 12`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Sprintfで文字列を組み立てる</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

type User struct {
    Name  string
    Email string
    Age   int
}

func main() {
    user := User{Name: "太郎", Email: "taro@example.com", Age: 30}

    // Sprintf で文字列を作成（出力しない）
    msg := fmt.Sprintf("ユーザー: %s (%d歳)", user.Name, user.Age)
    fmt.Println(msg)

    // 構造体のフォーマット
    fmt.Printf("%%v:  %v\\n", user)
    fmt.Printf("%%+v: %+v\\n", user)   // フィールド名付き
    fmt.Printf("%%#v: %#v\\n", user)   // Go構文形式

    // パディング
    fmt.Printf("[%10s]\\n", "right")    // 右寄せ
    fmt.Printf("[%-10s]\\n", "left")     // 左寄せ
    fmt.Printf("[%05d]\\n", 42)          // ゼロ埋め
}`}
          expectedOutput={`ユーザー: 太郎 (30歳)
%v:  {太郎 taro@example.com 30}
%+v: {Name:太郎 Email:taro@example.com Age:30}
%#v: main.User{Name:"太郎", Email:"taro@example.com", Age:30}
[     right]
[left      ]
[00042]`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">数値のフォーマット</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    n := 255

    // 各種数値フォーマット
    fmt.Printf("10進: %d\\n", n)
    fmt.Printf("2進: %b\\n", n)
    fmt.Printf("8進: %o\\n", n)
    fmt.Printf("16進: %x\\n", n)
    fmt.Printf("16進(大): %X\\n", n)
    fmt.Printf("文字: %c\\n", 65)    // 'A'
    fmt.Printf("Unicode: %U\\n", 'あ')

    // 浮動小数点
    pi := 3.14159265358979
    fmt.Printf("デフォルト: %f\\n", pi)
    fmt.Printf("桁指定: %.4f\\n", pi)
    fmt.Printf("科学表記: %e\\n", pi)
    fmt.Printf("幅指定: %10.2f\\n", pi)
}`}
          expectedOutput={`10進: 255
2進: 11111111
8進: 377
16進: ff
16進(大): FF
文字: A
Unicode: U+3042
デフォルト: 3.141593
桁指定: 3.1416
科学表記: 3.141593e+00
幅指定:       3.14`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="formatting" />
      </div>
      <LessonNav lessons={lessons} currentId="formatting" basePath="/learn/strings" />
    </div>
  );
}
