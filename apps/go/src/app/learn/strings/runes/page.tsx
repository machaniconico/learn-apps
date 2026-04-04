import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function RunesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ルーン</h1>
        <p className="text-gray-400">rune型、Unicode、for rangeでの文字列走査を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">runeとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">rune</code> は <code className="text-cyan-300">int32</code> のエイリアスで、
          Unicodeコードポイント1つを表します。Goの文字列はUTF-8でエンコードされているため、
          マルチバイト文字（日本語など）は1文字が複数バイトになります。
          <code className="text-cyan-300">for range</code> で文字列を走査すると、バイトではなくルーン単位で取得できます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バイトとルーンの違い</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    s := "Go言語"

    // バイトで走査
    fmt.Println("バイト走査:")
    for i := 0; i < len(s); i++ {
        fmt.Printf("  s[%d] = %d (0x%x)\\n", i, s[i], s[i])
    }

    // ルーンで走査（for range）
    fmt.Println("ルーン走査:")
    for i, r := range s {
        fmt.Printf("  index=%d, rune=%c (U+%04X)\\n", i, r, r)
    }

    fmt.Println("バイト数:", len(s))
    fmt.Println("ルーン数:", len([]rune(s)))
}`}
          expectedOutput={`バイト走査:
  s[0] = 71 (0x47)
  s[1] = 111 (0x6f)
  s[2] = 232 (0xe8)
  s[3] = 168 (0xa8)
  s[4] = 128 (0x80)
  s[5] = 232 (0xe8)
  s[6] = 170 (0xaa)
  s[7] = 158 (0x9e)
ルーン走査:
  index=0, rune=G (U+0047)
  index=1, rune=o (U+006F)
  index=2, rune=言 (U+8A00)
  index=5, rune=語 (U+8A9E)
バイト数: 8
ルーン数: 4`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ルーンの操作</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "unicode"
)

func main() {
    // シングルクォートでルーンリテラル
    r := 'あ'
    fmt.Printf("ルーン: %c\\n", r)
    fmt.Printf("コードポイント: %d\\n", r)
    fmt.Printf("Unicode: %U\\n", r)

    // unicodeパッケージ
    fmt.Println("数字?:", unicode.IsDigit('5'))
    fmt.Println("文字?:", unicode.IsLetter('A'))
    fmt.Println("空白?:", unicode.IsSpace(' '))
    fmt.Println("大文字?:", unicode.IsUpper('A'))

    // 文字列を1文字ずつ処理
    text := "Hello 世界 123"
    letters := 0
    digits := 0
    spaces := 0
    for _, r := range text {
        switch {
        case unicode.IsLetter(r):
            letters++
        case unicode.IsDigit(r):
            digits++
        case unicode.IsSpace(r):
            spaces++
        }
    }
    fmt.Printf("文字=%d, 数字=%d, 空白=%d\\n", letters, digits, spaces)
}`}
          expectedOutput={`ルーン: あ
コードポイント: 12354
Unicode: U+3042
数字?: true
文字?: true
空白?: true
大文字?: true
文字=7, 数字=3, 空白=2`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の反転</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func reverseString(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}

func main() {
    // ASCII文字列
    fmt.Println(reverseString("Hello"))

    // 日本語を含む文字列（ルーン単位で正しく反転）
    fmt.Println(reverseString("こんにちは"))
    fmt.Println(reverseString("Go言語"))
}`}
          expectedOutput={`olleH
はちにんこ
語言oG`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="runes" />
      </div>
      <LessonNav lessons={lessons} currentId="runes" basePath="/learn/strings" />
    </div>
  );
}
