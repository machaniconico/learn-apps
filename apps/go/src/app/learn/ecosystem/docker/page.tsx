import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function DockerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Goエコシステム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Docker</h1>
        <p className="text-gray-400">GoアプリのDockerイメージ作成とマルチステージビルドを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">GoとDocker</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goは静的リンクされたシングルバイナリを生成するため、Dockerとの相性が抜群です。
          <code className="text-cyan-300">マルチステージビルド</code>を使うことで、
          ビルド環境を含まない超軽量なイメージを作成できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なDockerfile</h2>
        <p className="text-gray-400 mb-4">
          シンプルなGoアプリのDockerfileです。シングルステージだとイメージが大きくなります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    // シンプルなDockerfile
    dockerfile := ` + "`" + `
# --- シンプルなDockerfile ---
FROM golang:1.22

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server .

EXPOSE 8080
CMD ["./server"]
# イメージサイズ: ~800MB（Go SDKを含む）
` + "`" + `

    fmt.Println("=== シンプルなDockerfile ===")
    fmt.Println(dockerfile)

    fmt.Println("問題点:")
    fmt.Println("  - Go SDKがイメージに含まれる（~800MB）")
    fmt.Println("  - 不要なビルドツールが残る")
    fmt.Println("  - セキュリティリスクが増大")
}`}
          expectedOutput={`=== シンプルなDockerfile ===

# --- シンプルなDockerfile ---
FROM golang:1.22

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server .

EXPOSE 8080
CMD ["./server"]
# イメージサイズ: ~800MB（Go SDKを含む）

問題点:
  - Go SDKがイメージに含まれる（~800MB）
  - 不要なビルドツールが残る
  - セキュリティリスクが増大`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マルチステージビルド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">マルチステージビルド</code>でビルドと実行を分離し、
          最終イメージを大幅に軽量化します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    dockerfile := ` + "`" + `
# --- マルチステージビルド ---

# ステージ1: ビルド
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# ステージ2: 実行（超軽量）
FROM alpine:3.19
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/server /server
EXPOSE 8080
CMD ["/server"]
# イメージサイズ: ~15MB
` + "`" + `

    fmt.Println("=== マルチステージDockerfile ===")
    fmt.Println(dockerfile)

    // サイズ比較
    fmt.Println("=== イメージサイズ比較 ===")
    images := []struct {
        name string
        size string
    }{
        {"golang:1.22", "~800MB"},
        {"alpine:3.19", "~7MB"},
        {"マルチステージ最終イメージ", "~15MB"},
        {"scratch（空イメージ）", "~5MB"},
    }
    for _, img := range images {
        fmt.Printf("  %-30s %s\\n", img.name, img.size)
    }
}`}
          expectedOutput={`=== マルチステージDockerfile ===

# --- マルチステージビルド ---

# ステージ1: ビルド
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# ステージ2: 実行（超軽量）
FROM alpine:3.19
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/server /server
EXPOSE 8080
CMD ["/server"]
# イメージサイズ: ~15MB

=== イメージサイズ比較 ===
  golang:1.22                    ~800MB
  alpine:3.19                    ~7MB
  マルチステージ最終イメージ             ~15MB
  scratch（空イメージ）               ~5MB`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">本番用Dockerfileのベストプラクティス</h2>
        <p className="text-gray-400 mb-4">
          セキュリティとパフォーマンスを考慮した本番用Dockerfileのポイントです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    practices := []struct {
        practice string
        reason   string
    }{
        {
            "CGO_ENABLED=0",
            "静的リンクで外部依存なし",
        },
        {
            "非rootユーザーで実行",
            "セキュリティ向上（権限最小化）",
        },
        {
            ".dockerignore を設定",
            "不要ファイルをイメージに含めない",
        },
        {
            "go mod download を先にCOPY",
            "依存関係のキャッシュを活用",
        },
        {
            "scratchまたはdistroless",
            "最小限の実行環境",
        },
        {
            "HEALTHCHECK を追加",
            "コンテナの健全性チェック",
        },
    }

    fmt.Println("=== Dockerベストプラクティス ===")
    for i, p := range practices {
        fmt.Printf("\\n%d. %s\\n   理由: %s\\n", i+1, p.practice, p.reason)
    }
}`}
          expectedOutput={`=== Dockerベストプラクティス ===

1. CGO_ENABLED=0
   理由: 静的リンクで外部依存なし

2. 非rootユーザーで実行
   理由: セキュリティ向上（権限最小化）

3. .dockerignore を設定
   理由: 不要ファイルをイメージに含めない

4. go mod download を先にCOPY
   理由: 依存関係のキャッシュを活用

5. scratchまたはdistroless
   理由: 最小限の実行環境

6. HEALTHCHECK を追加
   理由: コンテナの健全性チェック`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="docker" />
      </div>
      <LessonNav lessons={lessons} currentId="docker" basePath="/learn/ecosystem" />
    </div>
  );
}
