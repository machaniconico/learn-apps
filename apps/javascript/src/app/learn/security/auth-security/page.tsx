import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SECURITY_LESSONS } from "@/lib/lessons-data";

export default function AuthSecurityLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">セキュリティ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">認証とセキュリティ</h1>
        <p className="text-gray-400">パスワード管理、JWT、OAuth 2.0、多要素認証を学ぼう</p>
      </div>

      {/* パスワードの安全な管理 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">パスワードの安全な管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パスワードは<strong className="text-red-400">絶対に平文で保存してはいけません</strong>。
          データベースが漏洩した場合、全ユーザーのパスワードが即座に流出します。
          <strong className="text-red-400">bcrypt</strong> などのハッシュ関数を使ってハッシュ化して保存します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// 危険: 平文で保存
// INSERT INTO users (email, password) VALUES ('user@example.com', 'mypassword123')

// 安全: bcrypt でハッシュ化
import bcrypt from "bcrypt";

// ユーザー登録時：パスワードをハッシュ化して保存
async function register(email, password) {
  const saltRounds = 12; // ストレッチング回数
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // hashedPassword → "$2b$12$LJ3m4ys..." のような文字列

  await db.user.create({
    data: { email, password: hashedPassword },
  });
}

// ログイン時：入力パスワードとハッシュを比較
async function login(email, password) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          bcrypt は内部でソルト（ランダムな文字列）を自動追加するため、
          同じパスワードでも異なるハッシュ値が生成されます。
        </p>
      </section>

      {/* JWT */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">JWT（JSON Web Token）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">JWT</strong> はステートレスな認証に使われるトークンです。
          サーバーにセッション状態を保持せず、トークン自体にユーザー情報を含みます。
          Header、Payload、Signature の3つの部分で構成されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// JWTの構造
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.xxxxx
// |--- Header ---|.|----- Payload ------|.|- Signature -|

// Header:  { "alg": "HS256", "typ": "JWT" }
// Payload: { "userId": 1, "email": "user@example.com", "exp": 1700000000 }
// Signature: HMAC-SHA256(header + payload, secret)`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET; // 環境変数で管理

// トークン生成（ログイン成功時）
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    SECRET,
    { expiresIn: "1h" } // 有効期限1時間
  );
}

// トークン検証（APIリクエスト時）
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null; // 無効または期限切れ
  }
}

// ミドルウェアで保護されたルートを守る
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "認証が必要です" });
  }
  req.user = decoded;
  next();
}`}</code>
        </pre>
      </section>

      {/* OAuth 2.0 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">OAuth 2.0</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">OAuth 2.0</strong> は、サードパーティアプリケーションに
          ユーザーのリソースへのアクセスを安全に委任するための認可フレームワークです。
          「Googleでログイン」「GitHubでログイン」などに使われています。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`OAuth 2.0 認可コードフローの流れ:

1. ユーザーが「Googleでログイン」をクリック
   → アプリがGoogleの認可エンドポイントにリダイレクト

2. ユーザーがGoogleでログインし、アクセスを許可
   → Googleが認可コードをアプリにリダイレクト

3. アプリが認可コードをGoogleのトークンエンドポイントに送信
   → アクセストークンを取得

4. アプリがアクセストークンでGoogle APIにアクセス
   → ユーザー情報（名前、メール等）を取得`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// Next.js での OAuth 実装例（NextAuth.js）
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST };`}</code>
        </pre>
      </section>

      {/* 多要素認証 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">多要素認証（MFA）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">多要素認証（Multi-Factor Authentication）</strong>は、
          2つ以上の認証要素を組み合わせてセキュリティを強化する方法です。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">知識要素</h3>
            <p className="text-sm text-gray-400">パスワード、PIN、セキュリティの質問</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">所有要素</h3>
            <p className="text-sm text-gray-400">スマートフォン、セキュリティキー、ICカード</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">生体要素</h3>
            <p className="text-sm text-gray-400">指紋、顔認証、虹彩認証</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// TOTP（Time-based One-Time Password）の仕組み
// Google Authenticator 等で使われる

// 1. ユーザーがMFAを有効にする際に秘密鍵を共有
// 2. アプリとサーバーが同じアルゴリズムで6桁コードを生成
// 3. 30秒ごとにコードが変わる

import { authenticator } from "otplib";

// 秘密鍵の生成（MFA設定時）
const secret = authenticator.generateSecret();
// → QRコードとしてユーザーに表示

// コードの検証（ログイン時）
function verifyTOTP(token, userSecret) {
  return authenticator.verify({ token, secret: userSecret });
}

// 使い方
const isValid = verifyTOTP("123456", userSecret);`}</code>
        </pre>
      </section>

      {/* セッション管理のベストプラクティス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">セッション管理のベストプラクティス</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li><strong className="text-red-400">HttpOnly Cookie</strong>：JavaScriptからCookieにアクセスできないようにする</li>
          <li><strong className="text-red-400">Secure フラグ</strong>：HTTPS 接続でのみCookieを送信する</li>
          <li><strong className="text-red-400">SameSite 属性</strong>：クロスサイトリクエストでのCookie送信を制限する</li>
          <li><strong className="text-red-400">有効期限</strong>：セッションに適切な有効期限を設定する</li>
          <li><strong className="text-red-400">ログアウト時の無効化</strong>：セッションIDを確実に破棄する</li>
        </ul>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mt-4">
          <code className="text-gray-300 font-mono">{`// 安全なCookie設定
res.cookie("session", sessionId, {
  httpOnly: true,    // JSからアクセス不可
  secure: true,      // HTTPSのみ
  sameSite: "strict", // クロスサイト送信禁止
  maxAge: 3600000,   // 1時間
  path: "/",
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>パスワードは bcrypt でハッシュ化して保存する（平文保存は厳禁）</li>
          <li>JWT はステートレスな認証に使えるが、有効期限とシークレット管理が重要</li>
          <li>OAuth 2.0 はサードパーティログインの標準的な仕組み</li>
          <li>多要素認証（MFA）で知識・所有・生体の複数要素を組み合わせる</li>
          <li>Cookie は HttpOnly, Secure, SameSite を適切に設定する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="security" lessonId="auth-security" color="red" />
      <LessonNav lessons={SECURITY_LESSONS} currentId="auth-security" basePath="/learn/security" color="red" />
    </div>
  );
}
