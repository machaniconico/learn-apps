import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DEPLOY_LESSONS } from "@/lib/lessons-data";

export default function DeployExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">デプロイ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デプロイ総合演習</h1>
        <p className="text-gray-400">Next.jsアプリをDocker化し、CI/CDパイプラインを構築してVercelにデプロイしよう</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この総合演習では、Next.jsアプリケーションを本番環境にデプロイするまでの一連の流れを実践します。
          Docker環境の構築、GitHub ActionsによるCI/CDパイプライン、Vercelへの本番デプロイ、
          環境変数の設定、カスタムドメインの接続まで行います。
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm font-bold shrink-0">1</span>
            <span className="text-gray-300">Docker環境のセットアップ</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm font-bold shrink-0">2</span>
            <span className="text-gray-300">GitHub Actions CIパイプラインの構築</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm font-bold shrink-0">3</span>
            <span className="text-gray-300">Vercelへのデプロイ</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm font-bold shrink-0">4</span>
            <span className="text-gray-300">環境変数とドメインの設定</span>
          </div>
        </div>
      </section>

      {/* Step 1: Docker */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 1: Docker環境のセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず、Next.jsアプリの開発環境をDockerで統一します。
          Dockerfileとdocker-compose.ymlを作成しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Dockerfile
FROM node:20-alpine AS base

# 依存関係のインストール
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ビルド
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 環境変数（ビルド時に必要なもの）
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 本番イメージ
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# next.config.js にstandalone出力を追加
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

module.exports = nextConfig;`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# docker-compose.yml（開発環境用）
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/myapp
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myapp
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  db_data:`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# .dockerignore
node_modules
.next
.git
.gitignore
*.md
.env.local
.env*.local
docker-compose*.yml
.dockerignore
Dockerfile

# ビルドして起動
docker compose up --build
# http://localhost:3000 で確認`}</code>
        </pre>
      </section>

      {/* Step 2: GitHub Actions CI */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 2: GitHub Actions CIパイプライン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PRが作成されたら自動でリント・型チェック・テスト・ビルドを実行するCIワークフローを作成します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: "20"

jobs:
  lint-and-typecheck:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npx tsc --noEmit

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/
          retention-days: 7

  build:
    name: Build
    needs: [lint-and-typecheck, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

  docker:
    name: Docker Build
    needs: [lint-and-typecheck, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t my-nextjs-app .

      - name: Test Docker image
        run: |
          docker run -d -p 3000:3000 --name test-app my-nextjs-app
          sleep 5
          curl -f http://localhost:3000 || exit 1
          docker stop test-app`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">lint-and-typecheck</code>と
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">test</code>は並列実行され、
          両方が成功した後に<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">build</code>と
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">docker</code>が実行されます。
        </p>
      </section>

      {/* Step 3: Vercel デプロイ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 3: Vercelへのデプロイ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          VercelにNext.jsアプリをデプロイする手順です。
          GitHubリポジトリとの連携により、pushするだけで自動デプロイが動作します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# 手順1: Vercel CLIのインストールとログイン
npm install -g vercel
vercel login

# 手順2: プロジェクトの初期設定
vercel link
# ? Set up "~/my-nextjs-app"? → Yes
# ? Which scope? → 自分のアカウントを選択
# ? Link to existing project? → No (新規作成)
# ? What's your project's name? → my-nextjs-app
# ? In which directory is your code located? → ./

# 手順3: 環境変数の設定
vercel env add DATABASE_URL production
# 値を入力: postgresql://user:password@host:5432/dbname

vercel env add NEXT_PUBLIC_APP_URL production
# 値を入力: https://my-nextjs-app.vercel.app

# 手順4: 本番デプロイ
vercel --prod`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mb-4">
          または、Vercelダッシュボード（vercel.com）からGitHubリポジトリをインポートすることもできます。
          この方法が最も簡単で推奨されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Vercel ダッシュボードからの設定手順

1. vercel.com にログイン
2. "Add New..." → "Project" をクリック
3. GitHubリポジトリを選択して "Import"
4. Framework Preset: Next.js（自動検出）
5. Environment Variables:
   - DATABASE_URL = postgresql://...
   - NEXT_PUBLIC_APP_URL = https://...
6. "Deploy" をクリック

# 以降、mainブランチへのpushで自動デプロイ
# PRを作成するとプレビューURLが自動生成

# プレビューデプロイのURL例:
# https://my-nextjs-app-abc123-username.vercel.app`}</code>
        </pre>
      </section>

      {/* Step 4: 環境変数とドメイン */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 4: 環境変数とカスタムドメイン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          本番環境の環境変数を適切に管理し、カスタムドメインを接続して公開しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# 環境変数の管理（環境ごとに分離）

# .env.local（開発環境 - Gitに含めない）
DATABASE_URL=postgresql://localhost:5432/myapp_dev
NEXT_PUBLIC_APP_URL=http://localhost:3000
API_SECRET_KEY=dev_secret_key

# Vercel（本番環境 - ダッシュボードで管理）
# Settings → Environment Variables で設定
#
# Production環境:
#   DATABASE_URL = postgresql://prod-host/myapp
#   API_SECRET_KEY = prod_secret_key_xxxxx
#
# Preview環境:
#   DATABASE_URL = postgresql://staging-host/myapp_staging
#   API_SECRET_KEY = staging_secret_key_xxxxx

# GitHub Actions（CI環境 - Secretsで管理）
# Settings → Secrets → Actions で設定
#   VERCEL_TOKEN
#   VERCEL_ORG_ID
#   VERCEL_PROJECT_ID`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# カスタムドメインの設定

# 手順1: Vercelにドメインを追加
vercel domains add example.com

# 手順2: DNSレコードを設定
# ドメインレジストラ（お名前.com、Cloudflare等）で設定:
#
# Aレコード:
#   @ → 76.76.21.21
#
# CNAMEレコード:
#   www → cname.vercel-dns.com
#
# または、ネームサーバーをVercelに向ける:
#   ns1.vercel-dns.com
#   ns2.vercel-dns.com

# 手順3: SSL証明書（自動発行）
# Vercelがドメイン確認後、自動的にLet's Encrypt証明書を発行

# 手順4: 確認
vercel domains inspect example.com
# DNS: 設定済み
# SSL: 有効`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          DNSの反映には通常数分〜数時間かかります。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">vercel domains inspect</code>
          コマンドで設定状態を確認できます。
        </p>
      </section>

      {/* 本番運用チェックリスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">本番運用チェックリスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アプリを本番公開する前に、以下の項目を確認しましょう。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">セキュリティ</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>環境変数に秘密情報を格納（コードにハードコードしない）</li>
              <li>HTTPSが有効であること</li>
              <li>不要なAPIエンドポイントに認証をかける</li>
              <li>.env.localが.gitignoreに含まれている</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">パフォーマンス</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>画像の最適化（next/imageを使用）</li>
              <li>不要なバンドルサイズの削除</li>
              <li>適切なキャッシュヘッダーの設定</li>
              <li>Lighthouse スコアの確認</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">監視・ログ</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>エラー監視サービスの導入（Sentry等）</li>
              <li>アクセスログの確認手段</li>
              <li>アップタイム監視の設定</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">CI/CD</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>テストが自動実行されること</li>
              <li>mainブランチへの直接pushを禁止（ブランチ保護）</li>
              <li>PRレビューを必須に設定</li>
              <li>デプロイの通知設定（Slack等）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Dockerfileでマルチステージビルドを行い、軽量な本番イメージを作成する</li>
          <li>docker-compose.ymlでアプリとDBを一括管理し、開発環境を統一する</li>
          <li>GitHub Actionsでリント・テスト・ビルド・Docker確認を自動化する</li>
          <li>VercelはGitHubと連携するだけでNext.jsの自動デプロイが完了する</li>
          <li>環境変数は環境ごとに分離し、秘密情報はコードに含めない</li>
          <li>本番公開前にセキュリティ・パフォーマンス・監視のチェックリストを確認する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="deploy" lessonId="deploy-exercise" color="teal" />
      <LessonNav lessons={DEPLOY_LESSONS} currentId="deploy-exercise" basePath="/learn/deploy" color="teal" />
    </div>
  );
}
