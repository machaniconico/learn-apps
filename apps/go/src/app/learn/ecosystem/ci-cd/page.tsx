import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function CiCdPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Goエコシステム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CI/CD</h1>
        <p className="text-gray-400">GitHub ActionsでGoプロジェクトのテスト・ビルド・デプロイを自動化する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CI/CDとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">CI</code>（Continuous Integration）は自動テストとビルド、
          <code className="text-cyan-300">CD</code>（Continuous Delivery/Deployment）は自動デプロイを行う仕組みです。
          GitHub Actionsを使うとYAMLファイルでパイプラインを定義できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なGitHub Actionsワークフロー</h2>
        <p className="text-gray-400 mb-4">
          Goプロジェクトの基本的なCI設定です。テスト、ビルド、リンターを実行します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    workflow := ` + "`" + `
# .github/workflows/ci.yml
name: Go CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'

      - name: Download dependencies
        run: go mod download

      - name: Run tests
        run: go test -v -race -coverprofile=coverage.out ./...

      - name: Build
        run: go build -v ./...
` + "`" + `

    fmt.Println("=== 基本CI設定 ===")
    fmt.Println(workflow)
}`}
          expectedOutput={`=== 基本CI設定 ===

# .github/workflows/ci.yml
name: Go CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'

      - name: Download dependencies
        run: go mod download

      - name: Run tests
        run: go test -v -race -coverprofile=coverage.out ./...

      - name: Build
        run: go build -v ./...
`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リンターとセキュリティチェック</h2>
        <p className="text-gray-400 mb-4">
          CIパイプラインにリンターとセキュリティスキャンを追加します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    lintJob := ` + "`" + `
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: golangci-lint
        uses: golangci/golangci-lint-action@v4
        with:
          version: latest

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: Run govulncheck
        run: |
          go install golang.org/x/vuln/cmd/govulncheck@latest
          govulncheck ./...
` + "`" + `

    fmt.Println("=== リンター・セキュリティジョブ ===")
    fmt.Println(lintJob)

    checks := []struct {
        tool string
        desc string
    }{
        {"golangci-lint", "統合リンター（コード品質）"},
        {"govulncheck", "既知の脆弱性チェック"},
        {"go vet", "静的解析"},
        {"-race フラグ", "データ競合の検出"},
        {"-coverprofile", "テストカバレッジ計測"},
    }

    fmt.Println("=== CIで実行すべきチェック ===")
    for _, c := range checks {
        fmt.Printf("  %-20s %s\\n", c.tool, c.desc)
    }
}`}
          expectedOutput={`=== リンター・セキュリティジョブ ===

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: golangci-lint
        uses: golangci/golangci-lint-action@v4
        with:
          version: latest

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: Run govulncheck
        run: |
          go install golang.org/x/vuln/cmd/govulncheck@latest
          govulncheck ./...

=== CIで実行すべきチェック ===
  golangci-lint        統合リンター（コード品質）
  govulncheck          既知の脆弱性チェック
  go vet               静的解析
  -race フラグ          データ競合の検出
  -coverprofile        テストカバレッジ計測`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Docker ビルド & デプロイ</h2>
        <p className="text-gray-400 mb-4">
          Dockerイメージのビルドとコンテナレジストリへのプッシュを自動化します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

func main() {
    deployJob := ` + "`" + `
  deploy:
    needs: [test, lint]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: secrets.DOCKER_USERNAME
          password: secrets.DOCKER_PASSWORD

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: myapp:latest,myapp:sha-short
` + "`" + `

    fmt.Println("=== デプロイジョブ ===")
    fmt.Println(deployJob)

    pipeline := []string{
        "1. push/PR -> CI開始",
        "2. テスト実行（go test -race ./...）",
        "3. リンター実行（golangci-lint）",
        "4. ビルド確認（go build）",
        "5. mainブランチの場合 -> Docker build & push",
        "6. デプロイ（Cloud Run / ECS / k8s）",
    }

    fmt.Println("=== CI/CDパイプライン全体像 ===")
    for _, step := range pipeline {
        fmt.Printf("  %s\\n", step)
    }
}`}
          expectedOutput={`=== デプロイジョブ ===

  deploy:
    needs: [test, lint]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: secrets.DOCKER_USERNAME
          password: secrets.DOCKER_PASSWORD

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: myapp:latest,myapp:sha-short

=== CI/CDパイプライン全体像 ===
  1. push/PR -> CI開始
  2. テスト実行（go test -race ./...）
  3. リンター実行（golangci-lint）
  4. ビルド確認（go build）
  5. mainブランチの場合 -> Docker build & push
  6. デプロイ（Cloud Run / ECS / k8s）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="ci-cd" />
      </div>
      <LessonNav lessons={lessons} currentId="ci-cd" basePath="/learn/ecosystem" />
    </div>
  );
}
