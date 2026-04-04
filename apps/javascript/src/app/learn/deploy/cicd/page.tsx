import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DEPLOY_LESSONS } from "@/lib/lessons-data";

export default function CicdLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">デプロイ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CI/CD入門</h1>
        <p className="text-gray-400">GitHub Actionsでテストとデプロイを自動化しよう</p>
      </div>

      {/* CI/CDとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">CI/CDとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">CI（Continuous Integration / 継続的インテグレーション）</strong>は、
          コードの変更を頻繁にメインブランチに統合し、自動でテストを実行する手法です。
          <strong className="text-teal-400">CD（Continuous Delivery / 継続的デリバリー）</strong>は、
          テストに通ったコードを自動的に本番環境にデプロイする仕組みです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`CI/CDの流れ

コード変更 → push → 自動テスト → 自動ビルド → 自動デプロイ
   ↑                    ↓
   └──── 失敗通知 ←─── テスト失敗で停止

CI（継続的インテグレーション）:
  1. 開発者がコードをpush
  2. 自動でリント・テスト・ビルドを実行
  3. 問題があれば開発者に通知

CD（継続的デリバリー/デプロイ）:
  4. テスト通過後、ステージング環境に自動デプロイ
  5. 承認後（または自動で）本番環境にデプロイ`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          CI/CDを導入することで、バグの早期発見、デプロイの高速化、手動作業によるミスの防止が実現できます。
        </p>
      </section>

      {/* GitHub Actions 基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">GitHub Actionsの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">GitHub Actions</strong>は、GitHubに組み込まれたCI/CDサービスです。
          リポジトリの<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">.github/workflows/</code>
          ディレクトリにYAMLファイルを置くだけで自動化が設定できます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          パブリックリポジトリでは無料、プライベートリポジトリでも月2,000分の無料枠があります。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 text-sm mb-1">Workflow（ワークフロー）</h3>
            <p className="text-sm text-gray-300">自動化の全体定義。YAMLファイル1つが1ワークフロー。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 text-sm mb-1">Event（イベント/トリガー）</h3>
            <p className="text-sm text-gray-300">ワークフローを起動する条件（push、PR作成、スケジュールなど）。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 text-sm mb-1">Job（ジョブ）</h3>
            <p className="text-sm text-gray-300">ワークフロー内の処理グループ。並列または順次実行が可能。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 text-sm mb-1">Step（ステップ）</h3>
            <p className="text-sm text-gray-300">ジョブ内の個々のタスク。コマンド実行やアクションの利用。</p>
          </div>
        </div>
      </section>

      {/* Workflow YAMLの書き方 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ワークフローYAMLの書き方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実際のワークフローファイルを見てみましょう。Next.jsアプリのCI設定例です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# .github/workflows/ci.yml
name: CI

# トリガー：mainブランチへのpushとPR
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # リント・型チェック・テスト
  test:
    runs-on: ubuntu-latest

    steps:
      # リポジトリのコードを取得
      - name: Checkout code
        uses: actions/checkout@v4

      # Node.jsのセットアップ
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      # 依存関係のインストール
      - name: Install dependencies
        run: npm ci

      # リント
      - name: Run linter
        run: npm run lint

      # 型チェック
      - name: Type check
        run: npx tsc --noEmit

      # テスト
      - name: Run tests
        run: npm test

      # ビルド確認
      - name: Build
        run: npm run build`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">uses</code>で公開されたアクション（再利用可能な処理）を利用し、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">run</code>でシェルコマンドを実行します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">cache: &quot;npm&quot;</code>で依存関係のキャッシュが効き、2回目以降のインストールが高速になります。
        </p>
      </section>

      {/* トリガー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">トリガー（イベント）の種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ワークフローを起動するトリガーはさまざまな種類があります。
          用途に応じて適切なトリガーを選びましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# pushトリガー（特定ブランチ）
on:
  push:
    branches: [main, develop]
    paths:
      - "src/**"        # srcディレクトリの変更時のみ
      - "!*.md"         # Markdownの変更は除外

# PRトリガー
on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

# スケジュールトリガー（cron式）
on:
  schedule:
    - cron: "0 9 * * 1"  # 毎週月曜の9:00 UTC

# 手動トリガー
on:
  workflow_dispatch:
    inputs:
      environment:
        description: "デプロイ先"
        required: true
        default: "staging"
        type: choice
        options:
          - staging
          - production

# タグトリガー（リリース時）
on:
  push:
    tags:
      - "v*"  # v1.0.0 のようなタグ`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">paths</code>フィルターを使えば、
          変更されたファイルに応じてワークフローを実行するかどうかを制御できます。
          ドキュメントの変更でCIが走るのを防ぐ場合などに便利です。
        </p>
      </section>

      {/* 自動テスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">自動テストの実行</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CI環境でテストを自動実行し、問題があればPRにフィードバックを返す設定例です。
          複数のNode.jsバージョンでテストを実行する<strong className="text-teal-400">マトリックス戦略</strong>も活用できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# .github/workflows/test.yml
name: Test

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    # マトリックス戦略：複数バージョンでテスト
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: "npm"

      - run: npm ci
      - run: npm test -- --coverage

      # テストカバレッジをPRにコメント
      - name: Upload coverage
        if: matrix.node-version == 20
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  # E2Eテスト（テスト完了後に実行）
  e2e:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npx playwright test`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">needs</code>キーワードでジョブ間の依存関係を定義し、
          ユニットテストが通ってからE2Eテストを実行するという順序制御ができます。
        </p>
      </section>

      {/* 自動デプロイ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">自動デプロイの設定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テストが通ったら自動的に本番環境にデプロイするワークフローを構築しましょう。
          以下はVercelへの自動デプロイの例です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: test  # テスト成功後にデプロイ
    runs-on: ubuntu-latest

    # 環境（GitHub上でシークレットを管理）
    environment:
      name: production
      url: https://myapp.vercel.app

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">シークレット</strong>はGitHubリポジトリの Settings &gt; Secrets and variables &gt; Actions
          から設定します。コードに直接書かないようにしましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# シークレットの使い方
# リポジトリ設定で以下を登録：
#   VERCEL_TOKEN      : Vercelのアクセストークン
#   VERCEL_ORG_ID     : Vercelの組織ID
#   VERCEL_PROJECT_ID : VercelのプロジェクトID

# ワークフロー内でシークレットを参照
\${{ secrets.VERCEL_TOKEN }}

# 環境変数として使う場合
env:
  DATABASE_URL: \${{ secrets.DATABASE_URL }}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>CIはコード変更ごとに自動テスト、CDは自動デプロイを実現する手法</li>
          <li>GitHub Actionsはリポジトリ内のYAMLファイルでCI/CDを定義できる</li>
          <li>Workflow、Job、Stepの階層構造でパイプラインを構成する</li>
          <li>push、PR、スケジュール、手動など多様なトリガーが利用できる</li>
          <li>マトリックス戦略で複数バージョンのテストを並列実行できる</li>
          <li>シークレットでAPIキーやトークンを安全に管理する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="deploy" lessonId="cicd" color="teal" />
      <LessonNav lessons={DEPLOY_LESSONS} currentId="cicd" basePath="/learn/deploy" color="teal" />
    </div>
  );
}
