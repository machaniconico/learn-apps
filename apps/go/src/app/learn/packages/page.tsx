import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goでエクスポートされる識別子の条件は？",
    options: ["export キーワードを付ける", "先頭が大文字", "public 修飾子を付ける", "先頭が _ で始まらない"],
    answer: 1,
    explanation: "Goでは識別子の先頭が大文字であれば自動的にエクスポート（公開）されます。",
  },
  {
    question: "go.modファイルを初期化するコマンドは？",
    options: ["go init mod", "go mod init", "go new module", "go create mod"],
    answer: 1,
    explanation: "go mod init <module-path> でgo.modファイルを初期化します。",
  },
  {
    question: "init() 関数について正しいものは？",
    options: ["引数を取れる", "戻り値を返せる", "自動的に呼ばれる", "複数定義できない"],
    answer: 2,
    explanation: "init() 関数はパッケージの初期化時に自動的に呼ばれ、引数も戻り値もありません。",
  },
  {
    question: "internal/ ディレクトリの役割は？",
    options: ["テスト用ファイル置き場", "親パッケージからのみアクセス可能", "自動生成コード置き場", "設定ファイル置き場"],
    answer: 1,
    explanation: "internal/ 配下のパッケージは、そのinternalの親ディレクトリのサブツリーからのみインポートできます。",
  },
];

export default function PackagesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">パッケージ・モジュール</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Goのパッケージシステムとモジュール管理を学びます。package宣言とimport文の基本から、
          go mod によるモジュール管理、エクスポートルール（可視性）、init関数、
          internalパッケージ、go.workによるワークスペースまでカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="packages" totalLessons={6} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/packages" color="green" categoryId="packages" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パッケージの宣言とインポート</h2>
        <p className="text-gray-400 mb-4">
          すべてのGoファイルは <code className="text-cyan-300">package</code> 宣言で始まります。
          他のパッケージの機能を使うには <code className="text-cyan-300">import</code> 文を使います。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
    "math"
)

func main() {
    // stringsパッケージ
    fmt.Println(strings.ToUpper("hello"))

    // mathパッケージ
    fmt.Printf("π = %.4f\\n", math.Pi)
    fmt.Printf("√16 = %.0f\\n", math.Sqrt(16))
}`}
          expectedOutput={`HELLO
π = 3.1416
√16 = 4`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">可視性（エクスポート）ルール</h2>
        <p className="text-gray-400 mb-4">
          Goでは大文字で始まる識別子がエクスポート（公開）され、小文字で始まるものは非公開です。
          <code className="text-cyan-300">Println</code> は公開、
          <code className="text-cyan-300">internal</code> は非公開です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// PublicFunc は大文字で始まるのでエクスポートされる
func PublicFunc() string {
    return "公開関数です"
}

// privateFunc は小文字で始まるのでパッケージ内のみ
func privateFunc() string {
    return "非公開関数です"
}

func main() {
    fmt.Println(PublicFunc())
    fmt.Println(privateFunc()) // 同じパッケージ内なのでOK
}`}
          expectedOutput={`公開関数です
非公開関数です`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
