import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { INFRA_LESSONS } from "@/lib/lessons-data";

export default function InfraExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">インフラ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インフラ総合演習</h1>
        <p className="text-gray-400">本番環境を構築しよう - Linux、Nginx、Docker、監視の実践</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、これまでに学んだ知識を総合して、
          <strong className="text-cyan-400">本番環境に近いインフラ構成</strong>を構築します。
          Linuxサーバーの初期設定からNginxリバースプロキシ、Docker Composeでのアプリケーション運用、
          基本的なモニタリングまでを段階的に実装します。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">構築する環境</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>Ubuntu Linux サーバー</li>
              <li>Nginx リバースプロキシ（SSL対応）</li>
              <li>Docker Compose でアプリ+DB</li>
              <li>基本的なログ監視とヘルスチェック</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">学習のゴール</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>サーバーのセキュリティ初期設定ができる</li>
              <li>NginxでHTTPS通信を構成できる</li>
              <li>Docker Composeで複数サービスを管理できる</li>
              <li>ログ監視と自動再起動を設定できる</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ステップ1: Linuxサーバー初期設定 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ1: Linuxサーバーの初期設定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          新しいサーバーを立てたら、まずセキュリティとユーザーの初期設定を行います。
          rootユーザーでの直接ログインを禁止し、SSH鍵認証のみ許可します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# 1. システムを最新に更新
$ sudo apt update && sudo apt upgrade -y

# 2. 作業用ユーザーを作成
$ sudo adduser deploy
$ sudo usermod -aG sudo deploy

# 3. SSH鍵を設定（ローカルマシンで実行）
$ ssh-keygen -t ed25519 -C "deploy@myserver"
$ ssh-copy-id deploy@your-server-ip

# 4. SSH設定を強化 (/etc/ssh/sshd_config)
$ sudo vi /etc/ssh/sshd_config`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# /etc/ssh/sshd_config の変更箇所

# rootでのSSHログインを禁止
PermitRootLogin no

# パスワード認証を無効化（鍵認証のみ）
PasswordAuthentication no

# SSHポートを変更（オプション）
Port 2222`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# 5. ファイアウォール設定（UFW）
$ sudo ufw allow 2222/tcp    # SSH（ポート変更した場合）
$ sudo ufw allow 80/tcp      # HTTP
$ sudo ufw allow 443/tcp     # HTTPS
$ sudo ufw enable
$ sudo ufw status

Status: active

To                         Action      From
--                         ------      ----
2222/tcp                   ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere

# 6. SSHサービスを再起動
$ sudo systemctl restart sshd`}</code>
        </pre>
      </section>

      {/* ステップ2: Nginxリバースプロキシ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ2: Nginxリバースプロキシの構成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Nginxをリバースプロキシとして設定し、バックエンドのDockerコンテナにリクエストを転送します。
          SSL証明書も設定してHTTPS化します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Nginxのインストール
$ sudo apt install nginx -y
$ sudo systemctl enable nginx

# SSL証明書の取得
$ sudo apt install certbot python3-certbot-nginx -y
$ sudo certbot --nginx -d myapp.example.com`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# /etc/nginx/sites-available/myapp.conf

# HTTPはHTTPSにリダイレクト
server {
    listen 80;
    server_name myapp.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name myapp.example.com;

    # SSL証明書（Let's Encrypt）
    ssl_certificate /etc/letsencrypt/live/myapp.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.example.com/privkey.pem;

    # セキュリティヘッダー
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # アクセスログ・エラーログ
    access_log /var/log/nginx/myapp.access.log;
    error_log /var/log/nginx/myapp.error.log;

    # アプリケーション（Docker コンテナ）へリバースプロキシ
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 静的ファイルは直接Nginxから配信
    location /_next/static/ {
        alias /var/www/myapp/.next/static/;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # ヘルスチェックエンドポイント
    location /health {
        proxy_pass http://127.0.0.1:3000/api/health;
        access_log off;
    }
}

# 設定を有効化
$ sudo ln -s /etc/nginx/sites-available/myapp.conf /etc/nginx/sites-enabled/
$ sudo nginx -t && sudo systemctl reload nginx`}</code>
        </pre>
      </section>

      {/* ステップ3: Docker Composeでアプリ運用 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ3: Docker Composeでアプリケーション運用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Docker Composeを使って、アプリケーションとデータベースを一括管理します。
          環境変数の管理、ボリュームの永続化、ネットワーク分離を行います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# docker-compose.yml

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: myapp
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://appuser:secretpass@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: postgres:16-alpine
    container_name: myapp-db
    restart: always
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: secretpass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "127.0.0.1:5432:5432"    # ローカルからのみアクセス
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Dockerfile（Next.jsアプリの例）

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

# デプロイコマンド
$ docker compose build
$ docker compose up -d
$ docker compose ps
$ docker compose logs -f app`}</code>
        </pre>
      </section>

      {/* ステップ4: 基本的な監視 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ4: 基本的なモニタリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          本番環境では、アプリケーションの稼働状況を監視し、問題があれば素早く検知する仕組みが必要です。
          ログ監視、ヘルスチェック、ディスク使用量チェックの基本を設定します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# ヘルスチェックスクリプト
# /opt/scripts/health-check.sh

#!/bin/bash
HEALTH_URL="http://localhost:3000/api/health"
LOG_FILE="/var/log/health-check.log"

response=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ "$response" != "200" ]; then
    echo "$(date): ALERT - Health check failed (HTTP $response)" >> $LOG_FILE
    # Docker Compose で再起動
    cd /opt/myapp && docker compose restart app
    echo "$(date): App restarted" >> $LOG_FILE
else
    echo "$(date): OK" >> $LOG_FILE
fi`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# crontabでヘルスチェックを定期実行
$ crontab -e

# 5分おきにヘルスチェック
*/5 * * * * /opt/scripts/health-check.sh

# 毎日ログをローテーション
0 0 * * * find /var/log -name "*.log" -mtime +30 -delete

# SSL証明書の自動更新（月2回）
0 3 1,15 * * certbot renew --quiet --post-hook "systemctl reload nginx"`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# ディスク使用量チェックスクリプト
# /opt/scripts/disk-check.sh

#!/bin/bash
THRESHOLD=80
USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')

if [ "$USAGE" -gt "$THRESHOLD" ]; then
    echo "$(date): WARNING - Disk usage is $USAGE%"
    # Docker の不要イメージを削除
    docker system prune -f
fi

# リソース確認コマンド
$ df -h                     # ディスク使用量
$ free -h                   # メモリ使用量
$ docker stats              # コンテナのリソース使用量
$ docker system df          # Dockerのディスク使用量
$ journalctl -u nginx -f    # Nginxのsystemdログ`}</code>
        </pre>
      </section>

      {/* 本番運用チェックリスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">本番運用チェックリスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          本番環境を運用する前に、以下の項目を確認しましょう。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">セキュリティ</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>SSH鍵認証のみ、パスワード認証は無効</li>
              <li>ファイアウォール（UFW）で必要なポートのみ開放</li>
              <li>HTTPS（SSL/TLS）を有効化</li>
              <li>セキュリティヘッダーを設定</li>
              <li>定期的なOSアップデート</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">可用性</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>Docker restart: always で自動再起動</li>
              <li>ヘルスチェックの定期実行</li>
              <li>ログローテーションでディスク枯渇を防止</li>
              <li>データベースのバックアップ設定</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">運用</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>デプロイ手順のドキュメント化</li>
              <li>ロールバック手順の確認</li>
              <li>監視アラートの通知先設定</li>
              <li>障害時の対応フローを決めておく</li>
            </ul>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>サーバーの初期設定ではSSH鍵認証とファイアウォールが最重要</li>
          <li>NginxリバースプロキシでHTTPS化し、セキュリティヘッダーを設定する</li>
          <li>Docker Composeでアプリケーションとデータベースを一括管理する</li>
          <li>ヘルスチェックとcronで基本的な監視と自動復旧を実現する</li>
          <li>本番運用前にセキュリティ・可用性・運用のチェックリストを確認する</li>
          <li>インフラの知識はアプリ開発者にとっても不可欠なスキル</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="infra" lessonId="infra-exercise" color="cyan" />
      <LessonNav lessons={INFRA_LESSONS} currentId="infra-exercise" basePath="/learn/infra" color="cyan" />
    </div>
  );
}
