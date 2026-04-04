import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goのソースコードを自動フォーマットするコマンドは？",
    options: ["go lint", "go fmt", "go format", "go style"],
    answer: 1,
    explanation: "go fmt はGoのソースコードを公式スタイルに自動フォーマットします。gofmtコマンドも同等です。",
  },
  {
    question: "golangci-lintの主な役割は？",
    options: ["テスト実行", "複数のリンターの統合実行", "ビルド最適化", "パッケージ管理"],
    answer: 1,
    explanation: "golangci-lintは多数のリンターを統合して実行できるメタリンターです。設定ファイルでルールをカスタマイズできます。",
  },
  {
    question: "Dockerでマルチステージビルドを使う主な利点は？",
    options: ["ビルド速度の向上", "最終イメージサイズの削減", "セキュリティの向上", "デバッグの容易さ"],
    answer: 1,
    explanation: "マルチステージビルドではビルドツールを含まないスリムなランタイムイメージを作成でき、最終イメージサイズを大幅に削減できます。",
  },
  {
    question: "GitHub Actionsでgo testを実行するために必要なステップは？",
    options: ["actions/setup-goだけ", "checkout + setup-go + go test", "dockerコンテナの起動", "手動でGoをインストール"],
    answer: 1,
    explanation: "典型的にはactions/checkoutでコードを取得し、actions/setup-goでGoをセットアップし、go testでテストを実行します。",
  },
];

export default function EcosystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">Goエコシステム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Go開発を取り巻くツールやエコシステムを学びます。Goの標準ツール群、リンター設定、
          Dockerイメージ作成、CI/CDパイプライン構築、コミュニティ情報をカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="ecosystem" totalLessons={5} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/ecosystem" color="green" categoryId="ecosystem" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Goツールチェーンの概要</h2>
        <p className="text-gray-400 mb-4">
          Goは充実した標準ツールを持っています。<code className="text-cyan-300">go build</code>、
          <code className="text-cyan-300">go run</code>、<code className="text-cyan-300">go vet</code>、
          <code className="text-cyan-300">go fmt</code>で開発を効率化しましょう。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// go vet が検出する問題の例
// fmt.Printf の書式と引数の不一致など

func main() {
    name := "Go"
    version := 1.21
    fmt.Printf("言語: %s\\n", name)
    fmt.Printf("バージョン: %.2f\\n", version)

    // go fmt が自動整形するコード例
    result := map[string]string{
        "build": "バイナリをコンパイル",
        "run":   "コンパイル+実行",
        "vet":   "静的解析",
        "fmt":   "コード整形",
    }
    for cmd, desc := range result {
        fmt.Printf("go %s: %s\\n", cmd, desc)
    }
}`}
          expectedOutput={`言語: Go
バージョン: 1.21
go build: バイナリをコンパイル
go run: コンパイル+実行
go vet: 静的解析
go fmt: コード整形`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Docker マルチステージビルド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">マルチステージビルド</code>でGoアプリの軽量なDockerイメージを作成できます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// Dockerfile例（マルチステージビルド）:
// FROM golang:1.21 AS builder
// WORKDIR /app
// COPY . .
// RUN CGO_ENABLED=0 go build -o myapp .
//
// FROM alpine:latest
// COPY --from=builder /app/myapp /myapp
// CMD ["/myapp"]

func main() {
    stages := []struct {
        name string
        size string
    }{
        {"golang:1.21（ビルドステージ）", "~800MB"},
        {"alpine（実行ステージ）", "~10MB"},
    }
    for _, s := range stages {
        fmt.Printf("ステージ: %s - サイズ: %s\\n", s.name, s.size)
    }
    fmt.Println("\\nマルチステージビルドで最終イメージを大幅に削減！")
}`}
          expectedOutput={`ステージ: golang:1.21（ビルドステージ） - サイズ: ~800MB
ステージ: alpine（実行ステージ） - サイズ: ~10MB

マルチステージビルドで最終イメージを大幅に削減！`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
