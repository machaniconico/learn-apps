import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SECURITY_LESSONS } from "@/lib/lessons-data";

export default function WebAttacksLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">セキュリティ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Webアプリの脆弱性</h1>
        <p className="text-gray-400">XSS、CSRF、SQLインジェクションの仕組みと対策を学ぼう</p>
      </div>

      {/* XSS */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">XSS（クロスサイトスクリプティング）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">XSS</strong>とは、攻撃者が悪意のあるJavaScriptをWebページに注入し、
          他のユーザーのブラウザで実行させる攻撃です。Cookie窃取、セッションハイジャック、
          ページの改ざんなどの被害が発生します。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">反射型XSS（Reflected）</h3>
            <p className="text-sm text-gray-400">URLパラメータに埋め込まれたスクリプトがそのままHTMLに出力される</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">格納型XSS（Stored）</h3>
            <p className="text-sm text-gray-400">データベースに保存されたスクリプトが他のユーザーに表示される</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-1">DOM-based XSS</h3>
            <p className="text-sm text-gray-400">クライアント側のJavaScriptが安全でない方法でDOMを操作する</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// 危険な例：ユーザー入力をそのままHTMLに挿入
// 攻撃者が name に <script>alert('XSS')</script> を入力すると実行される
document.getElementById("greeting").innerHTML = "こんにちは、" + userName;

// 安全な方法1: textContent を使う（HTMLとして解釈されない）
document.getElementById("greeting").textContent = "こんにちは、" + userName;

// 安全な方法2: エスケープ関数を使う
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Reactでは自動的にエスケープされるが、dangerouslySetInnerHTMLは危険
// 危険: <div dangerouslySetInnerHTML={{ __html: userInput }} />
// 安全: <div>{userInput}</div>  ← 自動エスケープ`}</code>
        </pre>
      </section>

      {/* SQLインジェクション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">SQLインジェクション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">SQLインジェクション</strong>とは、ユーザー入力をSQLクエリに直接埋め込むことで、
          データベースを不正に操作される攻撃です。データの漏洩、改ざん、削除などの被害が起きます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// 危険な例：ユーザー入力をそのままSQLに埋め込む
const query = "SELECT * FROM users WHERE email = '" + email + "'";
// 攻撃者が email に  ' OR '1'='1  と入力すると:
// SELECT * FROM users WHERE email = '' OR '1'='1'
// → 全ユーザーのデータが漏洩！

// さらに危険:  '; DROP TABLE users; --  と入力すると:
// SELECT * FROM users WHERE email = ''; DROP TABLE users; --'
// → テーブルが削除される！`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 安全な方法: プリペアドステートメント（パラメータ化クエリ）
// Node.js + PostgreSQL の例
const result = await pool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]  // パラメータとして渡す（エスケープ自動化）
);

// Prisma（ORM）を使えば自動的に安全
const user = await prisma.user.findUnique({
  where: { email: email },
});`}</code>
        </pre>
      </section>

      {/* CSRF */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">CSRF（クロスサイトリクエストフォージェリ）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">CSRF</strong>は、ログイン中のユーザーに気づかれないうちに、
          意図しないリクエストを送信させる攻撃です。例えば、罠サイトにアクセスしただけで
          送金やパスワード変更が実行される可能性があります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`<!-- 攻撃者のサイトに仕込まれた罠 -->
<!-- ユーザーがログイン中の銀行サイトに自動送信される -->
<img src="https://bank.example.com/transfer?to=attacker&amount=100000" />

<!-- またはフォーム自動送信 -->
<form action="https://bank.example.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="100000" />
</form>
<script>document.forms[0].submit();</script>`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 対策1: CSRFトークン
// サーバー側でランダムなトークンを生成し、フォームに埋め込む
// リクエスト時にトークンを検証する

// 対策2: SameSite Cookie
// Set-Cookie: session=abc123; SameSite=Strict; Secure; HttpOnly

// 対策3: Originヘッダーの検証
app.post("/transfer", (req, res) => {
  const origin = req.headers.origin;
  if (origin !== "https://bank.example.com") {
    return res.status(403).json({ error: "不正なリクエスト" });
  }
  // 処理を続行...
});`}</code>
        </pre>
      </section>

      {/* その他の脆弱性 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">その他の主要な脆弱性</h2>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">パストラバーサル</h3>
            <p className="text-sm text-gray-400 mb-2">ファイルパスを操作してサーバー上の任意のファイルにアクセスする攻撃</p>
            <pre className="bg-gray-950 rounded-lg p-3 text-xs overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`// 危険: ユーザー入力をファイルパスにそのまま使う
// GET /file?name=../../../etc/passwd
const filePath = path.join(__dirname, "uploads", req.query.name);

// 安全: パスを正規化して検証
const safePath = path.resolve(__dirname, "uploads", req.query.name);
if (!safePath.startsWith(path.resolve(__dirname, "uploads"))) {
  return res.status(403).send("不正なパス");
}`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">オープンリダイレクト</h3>
            <p className="text-sm text-gray-400 mb-2">リダイレクト先URLを操作してフィッシングサイトに誘導する攻撃</p>
            <pre className="bg-gray-950 rounded-lg p-3 text-xs overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`// 危険: リダイレクト先を検証しない
// /login?redirect=https://evil.com
res.redirect(req.query.redirect);

// 安全: 許可リストで検証
const allowed = ["/dashboard", "/profile", "/settings"];
const target = req.query.redirect || "/dashboard";
if (allowed.includes(target)) {
  res.redirect(target);
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 入力バリデーション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">入力バリデーションの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべてのセキュリティ対策の基本は<strong className="text-red-400">入力のバリデーション</strong>です。
          クライアント側とサーバー側の両方で検証を行いましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// サーバー側バリデーションの例
function validateInput(data) {
  const errors = [];

  // 型チェック
  if (typeof data.email !== "string") {
    errors.push("メールアドレスが不正です");
  }

  // フォーマットチェック
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.push("メールアドレスの形式が不正です");
  }

  // 長さチェック
  if (data.name.length > 100) {
    errors.push("名前は100文字以内にしてください");
  }

  // サニタイズ（不要な文字を除去）
  data.name = data.name.trim();

  return { isValid: errors.length === 0, errors };
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>XSS は出力のエスケープとCSP（Content Security Policy）で防ぐ</li>
          <li>SQLインジェクションはプリペアドステートメントやORMで防ぐ</li>
          <li>CSRF はトークンとSameSite Cookieで防ぐ</li>
          <li>ユーザー入力は常に信頼せず、サーバー側で必ずバリデーションする</li>
          <li>Reactなどのフレームワークは自動エスケープ機能を持つが、過信は禁物</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="security" lessonId="web-attacks" color="red" />
      <LessonNav lessons={SECURITY_LESSONS} currentId="web-attacks" basePath="/learn/security" color="red" />
    </div>
  );
}
