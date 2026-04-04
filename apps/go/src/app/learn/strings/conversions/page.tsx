import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function ConversionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変換</h1>
        <p className="text-gray-400">strconv.Itoa、strconv.Atoi、string/[]byteの変換を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">strconvパッケージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">strconv</code> パッケージは文字列と基本型の間の変換関数を提供します。
          <code className="text-cyan-300">Itoa</code>（int→string）、<code className="text-cyan-300">Atoi</code>（string→int）が最もよく使われます。
          注意: <code className="text-cyan-300">string(42)</code> は数値の42ではなく、Unicodeコードポイント42の文字 <code className="text-cyan-300">*</code> になります。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">整数と文字列の変換</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strconv"
)

func main() {
    // int → string
    n := 42
    s := strconv.Itoa(n)
    fmt.Printf("Itoa: %s (型: %T)\\n", s, s)

    // string → int
    str := "123"
    num, err := strconv.Atoi(str)
    if err != nil {
        fmt.Println("変換エラー:", err)
    } else {
        fmt.Printf("Atoi: %d (型: %T)\\n", num, num)
    }

    // 変換失敗のケース
    _, err = strconv.Atoi("abc")
    if err != nil {
        fmt.Println("エラー:", err)
    }

    // 注意: string()は文字コードを変換する
    fmt.Println("string(42):", string(42))       // * (Unicodeコードポイント42)
    fmt.Println("strconv.Itoa(42):", strconv.Itoa(42))  // "42"
}`}
          expectedOutput={`Itoa: 42 (型: string)
Atoi: 123 (型: int)
エラー: strconv.Atoi: parsing "abc": invalid syntax
string(42): *
strconv.Itoa(42): 42`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">その他の変換関数</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strconv"
)

func main() {
    // float → string
    f := 3.14159
    s1 := strconv.FormatFloat(f, 'f', 2, 64)
    fmt.Println("FormatFloat:", s1)

    // string → float
    f2, _ := strconv.ParseFloat("2.718", 64)
    fmt.Println("ParseFloat:", f2)

    // bool → string
    s2 := strconv.FormatBool(true)
    fmt.Println("FormatBool:", s2)

    // string → bool
    b, _ := strconv.ParseBool("true")
    fmt.Println("ParseBool:", b)

    // int → string（基数指定）
    s3 := strconv.FormatInt(255, 16)
    fmt.Println("16進:", s3)

    s4 := strconv.FormatInt(255, 2)
    fmt.Println("2進:", s4)
}`}
          expectedOutput={`FormatFloat: 3.14
ParseFloat: 2.718
FormatBool: true
ParseBool: true
16進: ff
2進: 11111111`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">stringとバイトスライスの変換</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // string → []byte
    s := "Hello, Go!"
    bytes := []byte(s)
    fmt.Println("bytes:", bytes)

    // []byte → string
    s2 := string(bytes)
    fmt.Println("string:", s2)

    // string → []rune
    jp := "こんにちは"
    runes := []rune(jp)
    fmt.Println("runes:", runes)
    fmt.Println("rune数:", len(runes))
    fmt.Println("byte数:", len(jp))

    // []rune → string
    s3 := string(runes)
    fmt.Println("復元:", s3)
}`}
          expectedOutput={`bytes: [72 101 108 108 111 44 32 71 111 33]
string: Hello, Go!
runes: [12371 12435 12395 12385 12399]
rune数: 5
byte数: 15
復元: こんにちは`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="conversions" />
      </div>
      <LessonNav lessons={lessons} currentId="conversions" basePath="/learn/strings" />
    </div>
  );
}
