import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DEPLOY_LESSONS } from "@/lib/lessons-data";

export default function DockerLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">デプロイ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Docker入門</h1>
        <p className="text-gray-400">コンテナ技術でアプリの実行環境を統一しよう</p>
      </div>

      {/* Dockerとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Dockerとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Docker</strong>は、アプリケーションとその実行環境をまとめて
          <strong className="text-teal-400">コンテナ</strong>という軽量な仮想環境にパッケージ化するツールです。
          「自分のPCでは動くのに、サーバーでは動かない」という問題を解決します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          コンテナにはOS、ランタイム、ライブラリ、アプリケーションコードがすべて含まれているため、
          どの環境でも全く同じように動作します。開発・テスト・本番で一貫した環境が保証されます。
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">環境の統一</h3>
            <p className="text-sm text-gray-300">開発・テスト・本番で同一環境を保証</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">軽量・高速</h3>
            <p className="text-sm text-gray-300">VMと違いOS全体を仮想化しないため起動が速い</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">移植性</h3>
            <p className="text-sm text-gray-300">どのマシンでも同じコンテナが動作する</p>
          </div>
        </div>
      </section>

      {/* コンテナとVMの違い */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">コンテナと仮想マシンの違い</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コンテナと仮想マシン（VM）はどちらもアプリケーションを隔離して実行しますが、
          その仕組みは大きく異なります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`仮想マシン（VM）            コンテナ（Docker）
┌─────────────────┐      ┌─────────────────┐
│  アプリA │ アプリB │      │  アプリA │ アプリB │
│─────────│────────│      │─────────│────────│
│  ゲストOS│ ゲストOS│      │ ランタイム│ランタイム│
│─────────│────────│      │─────────────────│
│   ハイパーバイザ    │      │   Dockerエンジン   │
│─────────────────│      │─────────────────│
│     ホストOS       │      │     ホストOS       │
└─────────────────┘      └─────────────────┘

VM: 各アプリにOS全体が必要（数GB、起動に分単位）
コンテナ: ホストOSのカーネルを共有（数MB〜、起動は秒単位）`}</code>
        </pre>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-4 text-teal-400">比較項目</th>
                <th className="text-left py-2 px-4 text-teal-400">仮想マシン</th>
                <th className="text-left py-2 px-4 text-teal-400">コンテナ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-4">起動時間</td>
                <td className="py-2 px-4">数分</td>
                <td className="py-2 px-4">数秒</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-4">サイズ</td>
                <td className="py-2 px-4">数GB〜</td>
                <td className="py-2 px-4">数MB〜数百MB</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-4">リソース効率</td>
                <td className="py-2 px-4">低い</td>
                <td className="py-2 px-4">高い</td>
              </tr>
              <tr>
                <td className="py-2 px-4">分離レベル</td>
                <td className="py-2 px-4">完全（OS単位）</td>
                <td className="py-2 px-4">プロセス単位</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Dockerfile */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Dockerfile</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Dockerfile</strong>は、Dockerイメージの設計図です。
          ベースイメージの選択、ファイルのコピー、依存関係のインストール、起動コマンドなどを記述します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Next.jsアプリのDockerfile例

# ステージ1: 依存関係のインストール
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ステージ2: ビルド
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ステージ3: 本番イメージ
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# セキュリティ：non-rootユーザーで実行
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          <strong className="text-white">マルチステージビルド</strong>を使うことで、ビルドに必要なツールを最終イメージに含めず、
          軽量な本番イメージを作成できます。上の例では最終イメージにはビルド成果物だけが含まれます。
        </p>
      </section>

      {/* docker build / run */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">docker build と docker run</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Dockerfileからイメージを作成し、そのイメージからコンテナを起動する基本的なコマンドを学びましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# イメージをビルド（-t でタグ名を指定）
docker build -t my-nextjs-app .

# イメージ一覧を確認
docker images

# コンテナを起動
# -d: バックグラウンド実行
# -p: ポートマッピング（ホスト:コンテナ）
docker run -d -p 3000:3000 --name my-app my-nextjs-app

# 実行中のコンテナを確認
docker ps

# コンテナのログを表示
docker logs my-app
docker logs -f my-app  # リアルタイムで追跡

# コンテナに入る（デバッグ用）
docker exec -it my-app sh

# コンテナを停止・削除
docker stop my-app
docker rm my-app

# イメージを削除
docker rmi my-nextjs-app`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">.dockerignore</code>ファイルを作成して、
          不要なファイル（node_modules、.git など）がイメージに含まれないようにしましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mt-4">
          <code className="text-gray-300 font-mono">{`# .dockerignore
node_modules
.next
.git
.gitignore
*.md
.env.local`}</code>
        </pre>
      </section>

      {/* docker-compose */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Docker Compose</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Docker Compose</strong>は、複数のコンテナをまとめて管理するツールです。
          Webアプリ + データベース + キャッシュなど、複数のサービスを一括で起動・停止できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# docker-compose.yml
version: "3.8"

services:
  # Next.jsアプリ
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules

  # PostgreSQLデータベース
  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Redis（キャッシュ）
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Docker Compose コマンド
docker compose up          # 全サービスを起動
docker compose up -d       # バックグラウンドで起動
docker compose down        # 全サービスを停止・削除
docker compose logs        # ログを表示
docker compose ps          # 稼働中のサービスを確認
docker compose exec app sh # appコンテナに入る`}</code>
        </pre>
      </section>

      {/* ボリュームとネットワーク */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ボリュームとネットワーク</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">ボリューム</strong>はコンテナのデータを永続化する仕組みです。
          コンテナを削除してもデータベースのデータは保持されます。
          <strong className="text-teal-400">ネットワーク</strong>はコンテナ間の通信を管理します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# ボリュームの種類

# 1. 名前付きボリューム（Dockerが管理、データの永続化に使う）
volumes:
  postgres_data:

# 2. バインドマウント（ホストのディレクトリをコンテナに接続）
volumes:
  - ./src:/app/src  # 開発時のホットリロード用

# ボリューム管理コマンド
docker volume ls              # ボリューム一覧
docker volume inspect db_data # 詳細確認
docker volume rm db_data      # 削除`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# ネットワーク
# Docker Composeは自動的にネットワークを作成し、
# サービス名で他のコンテナにアクセスできる

# 例: appコンテナからdbコンテナに接続
DATABASE_URL=postgresql://postgres:password@db:5432/myapp
#                                           ^^
#                            サービス名がホスト名になる

# カスタムネットワークの定義
networks:
  frontend:
  backend:

services:
  app:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend  # dbはbackendネットワークのみ`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Dockerはアプリと実行環境をコンテナにパッケージ化し、どこでも同じ動作を保証する</li>
          <li>コンテナはVMより軽量で高速に起動でき、リソース効率が高い</li>
          <li>Dockerfileでイメージの設計図を定義し、マルチステージビルドで軽量化する</li>
          <li>docker build でイメージ作成、docker run でコンテナ起動</li>
          <li>Docker Composeで複数コンテナ（アプリ+DB+キャッシュ等）を一括管理する</li>
          <li>ボリュームでデータ永続化、ネットワークでコンテナ間通信を制御する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="deploy" lessonId="docker" color="teal" />
      <LessonNav lessons={DEPLOY_LESSONS} currentId="docker" basePath="/learn/deploy" color="teal" />
    </div>
  );
}
