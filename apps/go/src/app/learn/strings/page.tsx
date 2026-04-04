import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goの文字列は変更可能（ミュータブル）ですか？",
    options: ["はい", "いいえ、イミュータブルです", "条件による", "ポインタで変更可能"],
    answer: 1,
    explanation: "Goの文字列はイミュータブルです。変更するにはバイトスライスに変換します。",
  },
  {
    question: "文字列に特定の部分文字列が含まれるか確認する関数はどれですか？",
    options: ["strings.Has()", "strings.Find()", "strings.Contains()", "strings.Search()"],
    answer: 2,
    explanation: "strings.Contains(s, substr) で部分文字列の存在を確認します。",
  },
  {
    question: "整数を文字列に変換する関数はどれですか？",
    options: ["string(42)", "strconv.Itoa(42)", "fmt.String(42)", "int.String(42)"],
    answer: 1,
    explanation: "strconv.Itoa(42) は整数を文字列に変換します。string(42)はUnicodeコードポイントの文字になります。",
  },
  {
    question: "効率的に文字列を結合するにはどの型を使いますか？",
    options: ["string", "[]byte", "strings.Builder", "bytes.Buffer"],
    answer: 2,
    explanation: "strings.Builderは文字列結合に最適化されており、不要なメモリコピーを避けます。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">文字列操作</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          文字列はプログラミングで最も頻繁に扱うデータ型の一つです。
          Goでは文字列はイミュータブルなバイト列で、UTF-8エンコーディングをネイティブにサポートします。
          このカテゴリでは、文字列の基本からstringsパッケージの活用、Unicode対応まで学びます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="purple" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="purple" categoryId="strings" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本例</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, Go!"
    fmt.Println("文字列:", s)
    fmt.Println("長さ:", len(s))

    // stringsパッケージ
    fmt.Println("大文字:", strings.ToUpper(s))
    fmt.Println("含む:", strings.Contains(s, "Go"))

    // 分割と結合
    parts := strings.Split("a,b,c", ",")
    fmt.Println("分割:", parts)
    fmt.Println("結合:", strings.Join(parts, "-"))
}`}
          expectedOutput={`文字列: Hello, Go!
長さ: 10
大文字: HELLO, GO!
含む: true
分割: [a b c]
結合: a-b-c`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォーマットとルーンの例</h2>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // フォーマット
    name := "Gopher"
    age := 12
    msg := fmt.Sprintf("%sは%d歳です", name, age)
    fmt.Println(msg)

    // ルーン（Unicode文字）
    s := "こんにちは"
    fmt.Println("バイト数:", len(s))
    fmt.Println("文字数:", len([]rune(s)))

    for i, r := range s {
        fmt.Printf("index=%d, rune=%c\\n", i, r)
    }
}`}
          expectedOutput={`Gopherは12歳です
バイト数: 15
文字数: 5
index=0, rune=こ
index=3, rune=ん
index=6, rune=に
index=9, rune=ち
index=12, rune=は`}
        />
      </section>
      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
