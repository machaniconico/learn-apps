import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { INFRA_LESSONS } from "@/lib/lessons-data";

export default function NginxLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">インフラ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Nginx入門</h1>
        <p className="text-gray-400">Webサーバー、リバースプロキシ、SSLの設定を学ぼう</p>
      </div>

      {/* Nginxとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Nginxとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">Nginx（エンジンエックス）</strong>は、高性能なWebサーバーソフトウェアです。
          静的ファイルの配信、リバースプロキシ、ロードバランサーとして広く使われています。
          Apache と並ぶ代表的なWebサーバーで、高い同時接続処理能力が特徴です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Nginxのインストール（Ubuntu/Debian）
$ sudo apt update
$ sudo apt install nginx

# サービスの起動・確認
$ sudo systemctl start nginx
$ sudo systemctl enable nginx
$ sudo systemctl status nginx

# 設定ファイルの場所
/etc/nginx/nginx.conf          # メイン設定ファイル
/etc/nginx/sites-available/    # サイト設定（利用可能）
/etc/nginx/sites-enabled/      # サイト設定（有効化済み）

# 設定の検証とリロード
$ sudo nginx -t                # 設定ファイルの文法チェック
$ sudo systemctl reload nginx  # 設定を再読み込み（ダウンタイムなし）`}</code>
        </pre>
      </section>

      {/* 静的ファイル配信 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">静的ファイル配信</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Nginxの最も基本的な機能は<strong className="text-cyan-400">静的ファイルの配信</strong>です。
          HTML、CSS、JavaScript、画像ファイルなどをクライアントに返します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# /etc/nginx/sites-available/mysite.conf

server {
    listen 80;
    server_name example.com www.example.com;

    # ドキュメントルート（静的ファイルの場所）
    root /var/www/mysite;
    index index.html index.htm;

    # 基本のルーティング
    location / {
        try_files $uri $uri/ =404;
    }

    # 静的アセットのキャッシュ設定
    location ~* \\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # ログファイルの設定
    access_log /var/log/nginx/mysite.access.log;
    error_log /var/log/nginx/mysite.error.log;
}

# サイトを有効化する
$ sudo ln -s /etc/nginx/sites-available/mysite.conf /etc/nginx/sites-enabled/
$ sudo nginx -t && sudo systemctl reload nginx`}</code>
        </pre>
      </section>

      {/* リバースプロキシ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">リバースプロキシ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">リバースプロキシ</strong>は、クライアントからのリクエストを
          背後のアプリケーションサーバー（Node.js、Python等）に転送する仕組みです。
          Nginxがフロントに立ち、バックエンドのサーバーを隠蔽します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Node.js アプリ（localhost:3000）へのリバースプロキシ

server {
    listen 80;
    server_name api.example.com;

    location / {
        # バックエンドのアプリケーションに転送
        proxy_pass http://localhost:3000;

        # オリジナルのリクエスト情報をヘッダーで渡す
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket対応
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# クライアント → Nginx → Node.js の流れ

  ブラウザ           Nginx (80)         Node.js (3000)
    │                  │                    │
    │  GET /api/users  │                    │
    │─────────────────▶│                    │
    │                  │  proxy_pass        │
    │                  │───────────────────▶│
    │                  │                    │ アプリが処理
    │                  │  JSON レスポンス    │
    │                  │◀───────────────────│
    │  JSON レスポンス  │                    │
    │◀─────────────────│                    │`}</code>
        </pre>
      </section>

      {/* ロードバランシング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ロードバランシング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">ロードバランシング</strong>は、リクエストを複数のサーバーに
          分散させる仕組みです。1台のサーバーに負荷が集中するのを防ぎ、可用性を高めます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# 複数のバックエンドサーバーに負荷分散

upstream app_servers {
    # デフォルトはラウンドロビン（順番に振り分け）
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;

    # 重み付け（server2 に2倍のリクエスト）
    # server 127.0.0.1:3001 weight=1;
    # server 127.0.0.1:3002 weight=2;

    # 最小接続数方式（接続が少ないサーバーに優先振り分け）
    # least_conn;

    # IPハッシュ（同じIPは同じサーバーへ → セッション維持）
    # ip_hash;
}

server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://app_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`}</code>
        </pre>
      </section>

      {/* SSL/TLS設定 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">SSL/TLS設定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">SSL/TLS</strong>を設定してHTTPS通信を有効にすることで、
          通信を暗号化しデータの盗聴や改ざんを防ぎます。
          <strong className="text-cyan-400">Let&apos;s Encrypt</strong>で無料のSSL証明書を取得できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Let's Encrypt で証明書を取得（Certbot）
$ sudo apt install certbot python3-certbot-nginx
$ sudo certbot --nginx -d example.com -d www.example.com

# 自動更新の設定確認
$ sudo certbot renew --dry-run`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# HTTPS設定（Certbot が自動生成する設定に近い例）

server {
    listen 80;
    server_name example.com www.example.com;
    # HTTP → HTTPS にリダイレクト
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    # SSL証明書
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSLセキュリティ設定
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # HSTS（Strict Transport Security）
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    root /var/www/mysite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}`}</code>
        </pre>
      </section>

      {/* サーバーブロック */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">サーバーブロック（バーチャルホスト）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">サーバーブロック</strong>を使うと、1台のNginxサーバーで
          複数のドメインやサイトをホスティングできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# サイトA: example.com（静的サイト）
# /etc/nginx/sites-available/example.conf
server {
    listen 80;
    server_name example.com;
    root /var/www/example;
    index index.html;
}

# サイトB: api.example.com（Node.jsアプリ）
# /etc/nginx/sites-available/api.conf
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }
}

# サイトC: blog.example.com（別のアプリ）
# /etc/nginx/sites-available/blog.conf
server {
    listen 80;
    server_name blog.example.com;
    root /var/www/blog;
    index index.html;
}

# 各設定を有効化
$ sudo ln -s /etc/nginx/sites-available/example.conf /etc/nginx/sites-enabled/
$ sudo ln -s /etc/nginx/sites-available/api.conf /etc/nginx/sites-enabled/
$ sudo ln -s /etc/nginx/sites-available/blog.conf /etc/nginx/sites-enabled/
$ sudo nginx -t && sudo systemctl reload nginx`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Nginxは高性能なWebサーバー・リバースプロキシ・ロードバランサー</li>
          <li>静的ファイル配信ではroot、index、try_filesを設定する</li>
          <li>リバースプロキシでバックエンドアプリケーションへリクエストを転送する</li>
          <li>upstreamブロックで複数サーバーへの負荷分散ができる</li>
          <li>Let&apos;s Encryptで無料のSSL証明書を取得しHTTPS化する</li>
          <li>サーバーブロックで1台のサーバーに複数サイトをホスティングできる</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="infra" lessonId="nginx" color="cyan" />
      <LessonNav lessons={INFRA_LESSONS} currentId="nginx" basePath="/learn/infra" color="cyan" />
    </div>
  );
}
