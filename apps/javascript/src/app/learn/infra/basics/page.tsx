import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { INFRA_LESSONS } from "@/lib/lessons-data";

export default function InfraBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">インフラ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インフラの基本</h1>
        <p className="text-gray-400">サーバー、ネットワーク、クラウドの全体像を学ぼう</p>
      </div>

      {/* サーバー・クライアントモデル */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">サーバー・クライアントモデル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          インターネットの通信は<strong className="text-cyan-400">クライアント（ブラウザ等）</strong>が
          <strong className="text-cyan-400">サーバー</strong>にリクエストを送り、サーバーがレスポンスを返す
          「クライアント・サーバーモデル」で成り立っています。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`┌──────────┐     リクエスト (HTTP)      ┌──────────┐
│          │  ─────────────────────▶   │          │
│ クライアント │                           │  サーバー  │
│ (ブラウザ)  │  ◀─────────────────────   │ (Nginx等) │
│          │     レスポンス (HTML等)     │          │
└──────────┘                           └──────────┘

例：ブラウザで https://example.com にアクセスすると
  1. DNSで example.com → IPアドレスに変換
  2. TCP接続を確立（3ウェイハンドシェイク）
  3. HTTPリクエストを送信
  4. サーバーがHTMLを返す
  5. ブラウザがHTMLをレンダリング`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          Webアプリケーションでは、フロントエンド（クライアント）とバックエンド（サーバー）が
          この仕組みで通信しています。サーバーは1台で複数のクライアントからのリクエストを処理します。
        </p>
      </section>

      {/* ネットワークの基礎 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ネットワークの基礎</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          サーバーとクライアントが通信するためには、いくつかの重要なプロトコルと仕組みを理解する必要があります。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">IPアドレス</h3>
            <p className="text-sm text-gray-400">ネットワーク上の機器を識別する番号。IPv4（192.168.1.1）とIPv6（2001:db8::1）がある。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">DNS（Domain Name System）</h3>
            <p className="text-sm text-gray-400">ドメイン名（example.com）をIPアドレスに変換する仕組み。インターネットの「電話帳」。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">TCP（Transmission Control Protocol）</h3>
            <p className="text-sm text-gray-400">信頼性のある通信を保証するプロトコル。データの到達確認と再送制御を行う。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">HTTP / HTTPS</h3>
            <p className="text-sm text-gray-400">Webの通信プロトコル。HTTPSはSSL/TLSで暗号化された安全な通信。</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# DNSの名前解決を確認する
$ nslookup example.com
Server:   8.8.8.8
Address:  8.8.8.8#53

Name:     example.com
Address:  93.184.216.34

# ポート番号の一般的な割り当て
HTTP   → 80
HTTPS  → 443
SSH    → 22
MySQL  → 3306
PostgreSQL → 5432`}</code>
        </pre>
      </section>

      {/* クラウド vs オンプレミス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">クラウド vs オンプレミス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          サーバーの運用形態は大きく<strong className="text-cyan-400">クラウド</strong>と
          <strong className="text-cyan-400">オンプレミス</strong>に分かれます。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">クラウド</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>AWS、GCP、Azureなどのサービスを利用</li>
              <li>初期費用が少なく、従量課金</li>
              <li>スケールアップ・ダウンが容易</li>
              <li>物理サーバーの管理が不要</li>
              <li>障害対応はプロバイダーが一部担当</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-2">オンプレミス</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>自社でサーバーを購入・管理</li>
              <li>初期費用が大きいが、長期的にはコスト最適化可能</li>
              <li>カスタマイズの自由度が高い</li>
              <li>セキュリティポリシーを完全に自社で管理</li>
              <li>障害対応はすべて自社で行う</li>
            </ul>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# AWSでEC2インスタンスを起動する例（AWS CLI）
$ aws ec2 run-instances \\
    --image-id ami-0abcdef1234567890 \\
    --instance-type t3.micro \\
    --key-name my-key-pair \\
    --security-group-ids sg-0123456789abcdef0 \\
    --subnet-id subnet-0123456789abcdef0

# GCPでVMインスタンスを作成する例
$ gcloud compute instances create my-server \\
    --zone=asia-northeast1-a \\
    --machine-type=e2-micro \\
    --image-family=ubuntu-2204-lts \\
    --image-project=ubuntu-os-cloud`}</code>
        </pre>
      </section>

      {/* IaaS / PaaS / SaaS */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">IaaS / PaaS / SaaS</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラウドサービスは提供する範囲によって3つのモデルに分類されます。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">IaaS（Infrastructure as a Service）</h3>
            <p className="text-sm text-gray-400 mb-1">仮想サーバー、ストレージ、ネットワークなどインフラを提供。OS以上は自分で管理。</p>
            <p className="text-sm text-gray-500">例: AWS EC2, GCP Compute Engine, Azure VM</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">PaaS（Platform as a Service）</h3>
            <p className="text-sm text-gray-400 mb-1">アプリケーションの実行環境を提供。サーバー管理はプロバイダーが担当。</p>
            <p className="text-sm text-gray-500">例: Heroku, AWS Elastic Beanstalk, Google App Engine, Vercel</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-cyan-400 mb-1">SaaS（Software as a Service）</h3>
            <p className="text-sm text-gray-400 mb-1">完成したソフトウェアをサービスとして利用。インフラの知識は不要。</p>
            <p className="text-sm text-gray-500">例: Gmail, Slack, GitHub, Notion</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`管理範囲の比較：

             オンプレ    IaaS      PaaS      SaaS
─────────────────────────────────────────────────
アプリ        自分      自分      自分     プロバイダ
データ        自分      自分      自分     プロバイダ
ランタイム    自分      自分     プロバイダ  プロバイダ
ミドルウェア  自分      自分     プロバイダ  プロバイダ
OS           自分      自分     プロバイダ  プロバイダ
仮想化       自分    プロバイダ  プロバイダ  プロバイダ
サーバー     自分    プロバイダ  プロバイダ  プロバイダ
ネットワーク  自分    プロバイダ  プロバイダ  プロバイダ`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Web通信はクライアント・サーバーモデルで成り立っている</li>
          <li>IPアドレス、DNS、TCP、HTTPがネットワーク通信の基礎</li>
          <li>クラウドは手軽に始められ、オンプレミスは自由度が高い</li>
          <li>IaaS / PaaS / SaaS はクラウドサービスの提供範囲が異なる</li>
          <li>現代のWeb開発ではクラウドの利用が主流</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="infra" lessonId="basics" color="cyan" />
      <LessonNav lessons={INFRA_LESSONS} currentId="basics" basePath="/learn/infra" color="cyan" />
    </div>
  );
}
