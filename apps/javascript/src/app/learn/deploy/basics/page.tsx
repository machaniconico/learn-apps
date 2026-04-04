import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DEPLOY_LESSONS } from "@/lib/lessons-data";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "Next.jsで本番用の最適化されたコードを生成するコマンドはどれ？",
    options: ["npm run dev", "npm run build", "npm run start", "npm run deploy"],
    answer: 1,
    explanation: "npm run build で本番用の最適化されたコードを生成します。npm run dev は開発モード、npm run start はビルド済みコードの実行です。",
  },
  {
    question: "Next.jsでクライアント側（ブラウザ）でも使える環境変数のプレフィックスはどれ？",
    options: ["PUBLIC_", "NEXT_PUBLIC_", "CLIENT_", "BROWSER_"],
    answer: 1,
    explanation: "NEXT_PUBLIC_ プレフィックスが付いた環境変数のみがクライアント側で使えます。それ以外はサーバー側でのみアクセス可能です。",
  },
  {
    question: "ドメイン名をIPアドレスに変換する仕組みはどれ？",
    options: ["HTTP", "DNS", "SSL", "FTP"],
    answer: 1,
    explanation: "DNS（Domain Name System）はドメイン名（例：example.com）をサーバーのIPアドレスに変換する仕組みです。",
  },
];

export default function DeployBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">デプロイ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デプロイの基本</h1>
        <p className="text-gray-400">開発から本番公開までの流れを理解しよう</p>
      </div>

      {/* 開発環境と本番環境 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">開発環境と本番環境</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Webアプリケーション開発では、少なくとも<strong className="text-teal-400">開発環境（Development）</strong>と
          <strong className="text-teal-400">本番環境（Production）</strong>の2つの環境を使い分けます。
          大規模なプロジェクトでは、さらにステージング環境（Staging）を設けることもあります。
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-4 text-teal-400">環境</th>
                <th className="text-left py-2 px-4 text-teal-400">目的</th>
                <th className="text-left py-2 px-4 text-teal-400">特徴</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-4 font-semibold">Development</td>
                <td className="py-2 px-4">開発・テスト</td>
                <td className="py-2 px-4">ホットリロード、詳細なエラー表示、デバッグツール</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-4 font-semibold">Staging</td>
                <td className="py-2 px-4">リリース前の最終確認</td>
                <td className="py-2 px-4">本番に近い設定、限られたアクセス</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-semibold">Production</td>
                <td className="py-2 px-4">ユーザーへの公開</td>
                <td className="py-2 px-4">最適化済み、エラーは最小限表示、監視あり</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Next.jsの場合
# 開発モード：ホットリロード、詳細なエラー表示
npm run dev

# 本番ビルド：最適化されたコードを生成
npm run build

# 本番起動：ビルド済みコードを実行
npm run start`}</code>
        </pre>
      </section>

      {/* ビルドプロセス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ビルドプロセス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">ビルド</strong>とは、開発用のソースコードを本番環境で実行できる形に変換する処理です。
          TypeScriptのコンパイル、JavaScriptのバンドル・ミニファイ、CSSの最適化などが行われます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビルドによって以下の最適化が行われます。
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
          <li><strong className="text-white">トランスパイル</strong> — TypeScript/JSXを標準JavaScriptに変換</li>
          <li><strong className="text-white">バンドル</strong> — 複数ファイルをまとめて読み込みを高速化</li>
          <li><strong className="text-white">ミニファイ</strong> — 空白・コメントを除去してファイルサイズ削減</li>
          <li><strong className="text-white">ツリーシェイキング</strong> — 未使用コードを自動的に除外</li>
          <li><strong className="text-white">コード分割</strong> — ページごとに必要なコードだけを読み込み</li>
        </ul>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Next.jsのビルド出力例
$ npm run build

Route (app)                    Size     First Load JS
┌ ○ /                          5.2 kB        89 kB
├ ○ /about                     1.8 kB        85 kB
├ ● /blog/[slug]               3.1 kB        87 kB
└ ○ /contact                   2.4 kB        86 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)

# .next/ ディレクトリにビルド成果物が生成される`}</code>
        </pre>
      </section>

      {/* 環境変数 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">環境変数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">環境変数</strong>は、環境ごとに異なる設定値（APIキー、データベース接続先など）を
          コードの外で管理する仕組みです。秘密情報をソースコードに含めずに済むため、セキュリティ上も重要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# .env.local（開発環境用・Gitに含めない）
DATABASE_URL=postgresql://localhost:5432/myapp_dev
API_KEY=dev_key_12345
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.production（本番環境用）
DATABASE_URL=postgresql://prod-server:5432/myapp
API_KEY=prod_key_secret
NEXT_PUBLIC_APP_URL=https://myapp.com`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsでは、<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">NEXT_PUBLIC_</code>プレフィックスが付いた環境変数のみがクライアント（ブラウザ）側で使えます。
          それ以外はサーバー側でのみアクセス可能です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// サーバーサイドでのみ使える
const dbUrl = process.env.DATABASE_URL;

// クライアントサイドでも使える（NEXT_PUBLIC_プレフィックス）
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

// .env.local は .gitignore に追加しておく
// .gitignore:
// .env.local
// .env*.local`}</code>
        </pre>
      </section>

      {/* ドメインとDNS */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ドメインとDNS</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">ドメイン</strong>は、Webサイトの「住所」にあたるもの（例：<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">example.com</code>）です。
          <strong className="text-teal-400">DNS</strong>（Domain Name System）は、ドメイン名をサーバーのIPアドレスに変換する仕組みです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# ドメインの仕組み
ユーザーが example.com にアクセス
  ↓
DNSサーバーに問い合わせ
  ↓
IPアドレス 93.184.216.34 を返す
  ↓
そのIPアドレスのサーバーに接続

# よく使うDNSレコード
Aレコード    : ドメイン → IPv4アドレス
AAAAレコード : ドメイン → IPv6アドレス
CNAMEレコード: ドメイン → 別のドメイン（エイリアス）
MXレコード   : メールサーバーの指定`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          ドメインは<strong className="text-white">お名前.com</strong>、<strong className="text-white">Google Domains</strong>、<strong className="text-white">Cloudflare</strong>
          などのレジストラで取得できます。年間数百円〜数千円程度で利用可能です。
        </p>
      </section>

      {/* HTTPS/SSL */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">HTTPSとSSL/TLS</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">HTTPS</strong>は、HTTP通信を<strong className="text-teal-400">SSL/TLS</strong>で暗号化したプロトコルです。
          現代のWebサイトでは必須であり、Google検索のランキング要因にもなっています。
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
          <li><strong className="text-white">データの暗号化</strong> — 通信内容が第三者に読み取られない</li>
          <li><strong className="text-white">データの完全性</strong> — 通信内容が改ざんされていないことを保証</li>
          <li><strong className="text-white">認証</strong> — 接続先が正しいサーバーであることを証明</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-white">Let&apos;s Encrypt</strong>を使えばSSL証明書を無料で取得できます。
          Vercelやクラウドサービスでは自動的にHTTPSが設定されることが多いです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Let's Encrypt で証明書を取得する例（certbot）
sudo certbot --nginx -d example.com -d www.example.com

# Vercelの場合：自動でHTTPS証明書が発行される
# カスタムドメインを追加するだけでOK

# Nginx設定例（HTTPS対応）
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
    }
}`}</code>
        </pre>
      </section>

      {/* ホスティングの種類 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ホスティングの種類</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アプリを公開するためのホスティング方法は、用途や規模に応じていくつかの選択肢があります。
        </p>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">静的サイトホスティング</h3>
            <p className="text-sm text-gray-300 mb-1">HTML/CSS/JSのみ。サーバー処理不要。高速で安価。</p>
            <p className="text-sm text-gray-400">例：GitHub Pages、Netlify、Vercel（静的）、Cloudflare Pages</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">PaaS（Platform as a Service）</h3>
            <p className="text-sm text-gray-300 mb-1">サーバー管理をプラットフォーム側に任せる。デプロイが簡単。</p>
            <p className="text-sm text-gray-400">例：Vercel、Heroku、Railway、Render</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">IaaS（Infrastructure as a Service）</h3>
            <p className="text-sm text-gray-300 mb-1">仮想マシンを借りてすべて自分で管理。自由度が高いが手間がかかる。</p>
            <p className="text-sm text-gray-400">例：AWS EC2、GCE、さくらVPS、ConoHa</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">サーバーレス</h3>
            <p className="text-sm text-gray-300 mb-1">関数単位でデプロイ。使った分だけ課金。スケーリング自動。</p>
            <p className="text-sm text-gray-400">例：AWS Lambda、Cloudflare Workers、Vercel Edge Functions</p>
          </div>
        </div>
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="teal" />
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>開発環境と本番環境を分け、それぞれに適した設定を行う</li>
          <li>ビルドプロセスでコードを最適化し、本番向けの成果物を生成する</li>
          <li>環境変数で秘密情報や設定値をコード外で管理する</li>
          <li>ドメインとDNSでユーザーがアクセスできるURLを設定する</li>
          <li>HTTPSは必須。Let&apos;s Encryptで無料取得、またはPaaSの自動設定を利用</li>
          <li>ホスティング方法は用途に応じて選択する（静的/PaaS/IaaS/サーバーレス）</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="deploy" lessonId="basics" color="teal" />
      <LessonNav lessons={DEPLOY_LESSONS} currentId="basics" basePath="/learn/deploy" color="teal" />
    </div>
  );
}
