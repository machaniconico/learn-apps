import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DEPLOY_LESSONS } from "@/lib/lessons-data";

export default function CloudLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">デプロイ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラウドサービス</h1>
        <p className="text-gray-400">Vercel、AWS、GCP、Cloudflareを比較し、最適なプラットフォームを選ぼう</p>
      </div>

      {/* Vercel */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Vercel（Next.jsに最適）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Vercel</strong>はNext.jsの開発元が提供するホスティングプラットフォームです。
          Next.jsとの相性が抜群で、GitHubリポジトリと連携するだけで自動デプロイが完了します。
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
          <li><strong className="text-white">ゼロ設定デプロイ</strong> — GitHubにpushするだけで自動ビルド・デプロイ</li>
          <li><strong className="text-white">プレビューデプロイ</strong> — PRごとに独立したプレビューURLを自動生成</li>
          <li><strong className="text-white">Edge Network</strong> — 世界中のCDNで高速配信</li>
          <li><strong className="text-white">サーバーレス関数</strong> — APIルートが自動的にサーバーレスで動作</li>
          <li><strong className="text-white">自動HTTPS</strong> — SSL証明書の自動発行・更新</li>
        </ul>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Vercel CLIでのデプロイ
npm i -g vercel

# 初回セットアップ（対話式で設定）
vercel

# 本番デプロイ
vercel --prod

# 環境変数の設定
vercel env add DATABASE_URL production
vercel env add NEXT_PUBLIC_API_URL production

# プロジェクト設定の確認
vercel project ls`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// vercel.json（オプション：カスタム設定）
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["hnd1"],  // 東京リージョン
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ],
  "redirects": [
    { "source": "/old-page", "destination": "/new-page", "permanent": true }
  ]
}`}</code>
        </pre>
      </section>

      {/* AWS */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">AWS（Amazon Web Services）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">AWS</strong>は世界最大のクラウドプラットフォームで、200以上のサービスを提供しています。
          Web開発でよく使う主要サービスを紹介します。
        </p>
        <div className="space-y-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">EC2（Elastic Compute Cloud）</h3>
            <p className="text-sm text-gray-300 mb-2">仮想サーバー。好きなOSとソフトウェアをインストールして使える。最も自由度が高い。</p>
            <p className="text-sm text-gray-400">用途：Node.jsサーバー、Dockerコンテナ実行、データベースサーバー</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">S3（Simple Storage Service）</h3>
            <p className="text-sm text-gray-300 mb-2">オブジェクトストレージ。ファイルの保存・配信に使う。静的サイトのホスティングも可能。</p>
            <p className="text-sm text-gray-400">用途：画像/動画の保存、静的サイトホスティング、バックアップ</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">Lambda</h3>
            <p className="text-sm text-gray-300 mb-2">サーバーレス関数。コードをアップロードするだけで実行環境が不要。従量課金。</p>
            <p className="text-sm text-gray-400">用途：APIエンドポイント、画像処理、定期実行タスク</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-2">その他の主要サービス</h3>
            <p className="text-sm text-gray-300">RDS（マネージドDB）、CloudFront（CDN）、Route 53（DNS）、ECS/EKS（コンテナ）</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# AWS CLIの基本操作例

# S3にファイルをアップロード
aws s3 cp ./build s3://my-bucket/ --recursive

# S3バケットの静的サイトホスティング設定
aws s3 website s3://my-bucket/ \\
  --index-document index.html \\
  --error-document 404.html

# Lambda関数のデプロイ
aws lambda update-function-code \\
  --function-name my-api \\
  --zip-file fileb://function.zip

# EC2インスタンスの一覧
aws ec2 describe-instances \\
  --query "Reservations[*].Instances[*].[InstanceId,State.Name]" \\
  --output table`}</code>
        </pre>
      </section>

      {/* GCP */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">GCP（Google Cloud Platform）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">GCP</strong>はGoogleが提供するクラウドプラットフォームです。
          データ分析やML/AIに強みがあり、Firebase統合でフロントエンド開発との相性も良いです。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">Cloud Run</h3>
            <p className="text-sm text-gray-300">Dockerコンテナをサーバーレスで実行。スケーリング自動。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">Cloud Functions</h3>
            <p className="text-sm text-gray-300">AWS Lambdaと同等のサーバーレス関数。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">Firebase</h3>
            <p className="text-sm text-gray-300">認証、DB（Firestore）、ホスティング、Storageなどフロントエンド向け統合サービス。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">Cloud Storage / BigQuery</h3>
            <p className="text-sm text-gray-300">大規模データの保存と分析に特化。</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Cloud RunにDockerコンテナをデプロイ

# イメージをビルドしてArtifact Registryにプッシュ
gcloud builds submit --tag gcr.io/my-project/my-app

# Cloud Runにデプロイ
gcloud run deploy my-app \\
  --image gcr.io/my-project/my-app \\
  --platform managed \\
  --region asia-northeast1 \\
  --allow-unauthenticated \\
  --set-env-vars DATABASE_URL=\$DATABASE_URL

# Firebase CLIでホスティング
firebase init hosting
firebase deploy --only hosting`}</code>
        </pre>
      </section>

      {/* Cloudflare */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Cloudflare</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Cloudflare</strong>はCDN・セキュリティのリーダーで、
          エッジコンピューティングやDNS、静的サイトホスティングなど開発者向けサービスを拡充しています。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">Cloudflare Pages</h3>
            <p className="text-sm text-gray-300">静的サイト＋サーバーレス関数。GitHubと連携して自動デプロイ。無料枠が充実。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">Cloudflare Workers</h3>
            <p className="text-sm text-gray-300">エッジで動作するサーバーレス関数。世界中のPoPで超低レイテンシー。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">D1 / R2 / KV</h3>
            <p className="text-sm text-gray-300">D1はSQLiteベースのDB、R2はS3互換ストレージ、KVはKey-Valueストア。</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Cloudflare Pagesでデプロイ

# Wrangler CLIのインストール
npm install -g wrangler

# ログイン
wrangler login

# Next.jsアプリをCloudflare Pagesにデプロイ
# (next.config.jsでedgeランタイムを設定)
npx @cloudflare/next-on-pages
wrangler pages deploy .vercel/output/static

# Cloudflare Workers の例
// src/worker.ts
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/hello") {
      return new Response(
        JSON.stringify({ message: "Hello from the edge!" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("Not found", { status: 404 });
  },
};`}</code>
        </pre>
      </section>

      {/* プラットフォーム選定 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プラットフォームの選び方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロジェクトの要件に応じて最適なプラットフォームを選びましょう。
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-teal-400">ユースケース</th>
                <th className="text-left py-2 px-3 text-teal-400">おすすめ</th>
                <th className="text-left py-2 px-3 text-teal-400">理由</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-3">Next.jsアプリ</td>
                <td className="py-2 px-3 font-semibold">Vercel</td>
                <td className="py-2 px-3">Next.js開発元。最小限の設定で最適な動作</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-3">静的サイト・ブログ</td>
                <td className="py-2 px-3 font-semibold">Cloudflare Pages</td>
                <td className="py-2 px-3">無料枠が大きく、CDN配信が高速</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-3">フルスタック（DB付き）</td>
                <td className="py-2 px-3 font-semibold">Railway / Render</td>
                <td className="py-2 px-3">DB込みでワンクリックデプロイ</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 px-3">大規模・エンタープライズ</td>
                <td className="py-2 px-3 font-semibold">AWS / GCP</td>
                <td className="py-2 px-3">豊富なサービスとスケーラビリティ</td>
              </tr>
              <tr>
                <td className="py-2 px-3">エッジ処理・低レイテンシー</td>
                <td className="py-2 px-3 font-semibold">Cloudflare Workers</td>
                <td className="py-2 px-3">世界300以上のPoPで超低遅延</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* コスト管理 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">コスト管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラウドサービスは使った分だけ課金されるため、予期せぬ高額請求を防ぐための対策が重要です。
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
          <li><strong className="text-white">無料枠を活用</strong> — 各サービスの無料枠を把握する（AWS Free Tier、Vercel Hobby等）</li>
          <li><strong className="text-white">予算アラートの設定</strong> — 月額の上限を設定し、超過前に通知を受ける</li>
          <li><strong className="text-white">不要リソースの削除</strong> — 使わなくなったインスタンスやストレージは速やかに削除</li>
          <li><strong className="text-white">適切なインスタンスサイズ</strong> — 初めは小さいサイズから始めてスケールアップ</li>
          <li><strong className="text-white">リザーブドインスタンス</strong> — 長期利用が決まっていれば予約で割引を受ける</li>
        </ul>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# 各プラットフォームの無料枠（目安）

Vercel (Hobby):
  - 帯域幅: 100GB/月
  - サーバーレス関数: 100GB-時間/月
  - ビルド: 6,000分/月

Cloudflare Pages:
  - 帯域幅: 無制限
  - ビルド: 500回/月
  - Workers: 100,000リクエスト/日（無料）

AWS Free Tier（12ヶ月）:
  - EC2: t2.micro 750時間/月
  - S3: 5GB
  - Lambda: 100万リクエスト/月
  - RDS: db.t2.micro 750時間/月

GCP Free Tier:
  - Cloud Run: 200万リクエスト/月
  - Cloud Functions: 200万呼び出し/月
  - Firestore: 1GB ストレージ`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>VercelはNext.jsに最適で、ゼロ設定の自動デプロイとプレビュー機能が強力</li>
          <li>AWSは最大規模のクラウドで、EC2・S3・Lambdaなど豊富なサービスを提供</li>
          <li>GCPはCloud RunやFirebaseなど、コンテナとフロントエンド開発に強い</li>
          <li>Cloudflareはエッジコンピューティングと無料枠の充実が魅力</li>
          <li>プロジェクトの規模・要件・チームのスキルに応じてプラットフォームを選定する</li>
          <li>無料枠の活用と予算アラートの設定で、コストを適切に管理する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="deploy" lessonId="cloud" color="teal" />
      <LessonNav lessons={DEPLOY_LESSONS} currentId="cloud" basePath="/learn/deploy" color="teal" />
    </div>
  );
}
