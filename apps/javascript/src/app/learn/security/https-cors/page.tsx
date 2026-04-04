import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SECURITY_LESSONS } from "@/lib/lessons-data";

export default function HttpsCorsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">セキュリティ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">HTTPS・CORS</h1>
        <p className="text-gray-400">通信の暗号化、TLS/SSL、同一オリジンポリシーを学ぼう</p>
      </div>

      {/* HTTPSとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">HTTPSとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">HTTPS</strong>（HTTP over TLS/SSL）は、HTTP通信を暗号化したプロトコルです。
          通信内容が第三者に傍受されたり改ざんされたりすることを防ぎます。
          現在のWebでは HTTPS が標準であり、HTTP のサイトはブラウザに「安全でない」と警告されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`TLS/SSL ハンドシェイクの流れ:

1. クライアント → サーバー: ClientHello
   - 対応する暗号スイートの一覧を送信

2. サーバー → クライアント: ServerHello + 証明書
   - 使用する暗号スイートと SSL 証明書を送信

3. クライアント: 証明書の検証
   - 認証局（CA）の署名が正しいか確認
   - ドメイン名が一致するか確認

4. 鍵交換: セッション鍵の共有
   - 共通鍵暗号のための鍵を安全に共有

5. 暗号化通信の開始
   - 以降のすべての通信は共通鍵で暗号化される`}</code>
        </pre>
      </section>

      {/* SSL証明書 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">SSL証明書</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SSL証明書は、サーバーの身元を証明するデジタル証明書です。
          認証局（CA: Certificate Authority）が発行し、ブラウザはこの証明書を検証して
          通信相手が本物かどうかを確認します。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">DV（Domain Validation）証明書</h3>
            <p className="text-sm text-gray-400">ドメインの所有権のみ確認。Let&apos;s Encrypt で無料取得可能。個人サイトに最適。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">OV（Organization Validation）証明書</h3>
            <p className="text-sm text-gray-400">組織の実在確認を含む。企業サイト向け。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">EV（Extended Validation）証明書</h3>
            <p className="text-sm text-gray-400">最も厳格な審査。金融機関など高い信頼性が必要なサイト向け。</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Let's Encrypt で無料の SSL 証明書を取得（certbot）
sudo certbot --nginx -d example.com -d www.example.com

# 自動更新の設定
sudo certbot renew --dry-run

# Vercel や Netlify などのホスティングサービスでは
# HTTPS が自動的に設定される`}</code>
        </pre>
      </section>

      {/* 同一オリジンポリシー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">同一オリジンポリシー（Same-Origin Policy）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ブラウザのセキュリティ機構で、あるオリジン（プロトコル + ドメイン + ポート）から
          読み込まれたスクリプトが、<strong className="text-red-400">別のオリジンのリソースにアクセスすることを制限</strong>します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// オリジン = プロトコル + ドメイン + ポート
// https://example.com:443

// 同一オリジン（OK）
https://example.com/page1 → https://example.com/page2   // パスが違うだけ

// 異なるオリジン（ブロックされる）
https://example.com → http://example.com      // プロトコルが違う
https://example.com → https://api.example.com  // サブドメインが違う
https://example.com → https://example.com:8080 // ポートが違う`}</code>
        </pre>
      </section>

      {/* CORS */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">CORS（Cross-Origin Resource Sharing）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">CORS</strong> は、同一オリジンポリシーの制限を安全に緩和するための仕組みです。
          サーバーがHTTPヘッダーで「このオリジンからのアクセスを許可する」と明示します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// Express での CORS 設定
import cors from "cors";

// 方法1: 特定のオリジンのみ許可（推奨）
app.use(cors({
  origin: "https://myapp.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Cookie を含むリクエストを許可
}));

// 方法2: 複数のオリジンを許可
app.use(cors({
  origin: ["https://myapp.com", "https://admin.myapp.com"],
}));

// 方法3: すべてのオリジンを許可（開発時のみ！本番では非推奨）
app.use(cors({ origin: "*" }));`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// CORSレスポンスヘッダー
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400

// プリフライトリクエスト（OPTIONS）
// ブラウザがPOSTやPUTの前に自動送信して許可を確認する
// Content-Type が application/json の場合なども送信される`}</code>
        </pre>
      </section>

      {/* SameSite Cookie */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">SameSite Cookie</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">SameSite</strong> 属性は、Cookie がクロスサイトリクエストで
          送信されるかどうかを制御します。CSRF 攻撃の防止に効果的です。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">SameSite=Strict</h3>
            <p className="text-sm text-gray-400">クロスサイトリクエストでは一切 Cookie を送信しない。最も安全だが、外部リンクからのアクセス時にログアウト状態になる。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">SameSite=Lax（デフォルト）</h3>
            <p className="text-sm text-gray-400">トップレベルナビゲーション（リンククリック）では送信するが、POSTリクエスト等では送信しない。バランスが良い。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">SameSite=None</h3>
            <p className="text-sm text-gray-400">クロスサイトでも常に送信。Secure フラグ必須。サードパーティ Cookie に必要。</p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>HTTPS は TLS/SSL で通信を暗号化し、傍受・改ざんを防ぐ</li>
          <li>SSL証明書は Let&apos;s Encrypt で無料取得でき、多くのホスティングで自動設定される</li>
          <li>同一オリジンポリシーは異なるオリジンへのアクセスを制限するブラウザの防御機構</li>
          <li>CORS はサーバー側で許可するオリジンを明示する仕組み</li>
          <li>SameSite Cookie で CSRF 攻撃を効果的に防げる</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="security" lessonId="https-cors" color="red" />
      <LessonNav lessons={SECURITY_LESSONS} currentId="https-cors" basePath="/learn/security" color="red" />
    </div>
  );
}
