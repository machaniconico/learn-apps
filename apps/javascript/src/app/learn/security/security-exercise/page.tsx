import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SECURITY_LESSONS } from "@/lib/lessons-data";

export default function SecurityExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">セキュリティ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">セキュリティ総合演習</h1>
        <p className="text-gray-400">脆弱性を見つけて修正するスキルを身につけよう</p>
      </div>

      {/* 演習1: XSSの発見と修正 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習1: XSS脆弱性を修正しよう</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          以下のコードにはXSS脆弱性があります。問題を特定し、安全なコードに修正してください。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// 脆弱なコード: コメント投稿機能
app.get("/comments", async (req, res) => {
  const comments = await db.comment.findMany();
  let html = "<h1>コメント一覧</h1>";

  for (const comment of comments) {
    // 問題: ユーザー入力をそのままHTMLに埋め込んでいる
    html += "<div class='comment'>";
    html += "<strong>" + comment.author + "</strong>";
    html += "<p>" + comment.body + "</p>";
    html += "</div>";
  }

  res.send(html);
});`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 修正版: HTMLエスケープを適用
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.get("/comments", async (req, res) => {
  const comments = await db.comment.findMany();
  let html = "<h1>コメント一覧</h1>";

  for (const comment of comments) {
    html += "<div class='comment'>";
    html += "<strong>" + escapeHtml(comment.author) + "</strong>";
    html += "<p>" + escapeHtml(comment.body) + "</p>";
    html += "</div>";
  }

  res.send(html);
});

// さらに良い方法: Reactなどのフレームワークを使えば自動エスケープ
// CSP（Content-Security-Policy）ヘッダーも設定する
// Content-Security-Policy: default-src 'self'; script-src 'self'`}</code>
        </pre>
      </section>

      {/* 演習2: SQLインジェクションの修正 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習2: SQLインジェクションを修正しよう</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          以下のログイン処理にはSQLインジェクション脆弱性があります。安全な実装に書き換えてください。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// 脆弱なコード: ログイン処理
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 問題: 文字列結合でSQLを構築
  const query = "SELECT * FROM users WHERE email = '" + email
    + "' AND password = '" + password + "'";

  const user = await db.raw(query);

  if (user.length > 0) {
    res.json({ message: "ログイン成功" });
  } else {
    res.status(401).json({ error: "認証失敗" });
  }
});
// 攻撃: email に  ' OR '1'='1' --  と入力すると全ユーザーでログイン可能`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 修正版: プリペアドステートメント + パスワードハッシュ
import bcrypt from "bcrypt";

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 入力バリデーション
  if (!email || !password) {
    return res.status(400).json({ error: "入力が不足しています" });
  }

  // パラメータ化クエリ（SQLインジェクション対策）
  const user = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (user.rows.length === 0) {
    return res.status(401).json({ error: "認証失敗" });
  }

  // bcrypt でパスワード検証（平文比較はNG）
  const isValid = await bcrypt.compare(password, user.rows[0].password);

  if (isValid) {
    // セッション or JWTを発行
    res.json({ message: "ログイン成功" });
  } else {
    res.status(401).json({ error: "認証失敗" });
  }
});`}</code>
        </pre>
      </section>

      {/* 演習3: 安全なAPIエンドポイント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習3: 安全なAPIを設計しよう</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          以下の要件を満たす安全なユーザー情報更新APIを設計してください。
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
          <li>認証されたユーザーのみアクセス可能</li>
          <li>自分のデータのみ更新可能（認可チェック）</li>
          <li>入力値のバリデーション</li>
          <li>レートリミット</li>
        </ul>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken";

// レートリミット: 15分に100リクエストまで
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "リクエスト回数制限を超えました" },
});

// 認証ミドルウェア
function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "認証が必要です" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "トークンが無効です" });
  }
}

// バリデーション
function validateUpdate(data) {
  const errors = [];
  if (data.name && (typeof data.name !== "string" || data.name.length > 50)) {
    errors.push("名前は50文字以内の文字列にしてください");
  }
  if (data.email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)) {
    errors.push("メールアドレスの形式が不正です");
  }
  return errors;
}

// 安全なAPI
app.put("/api/users/:id", limiter, authenticate, async (req, res) => {
  // 認可: 自分のデータのみ更新可能
  if (req.user.id !== parseInt(req.params.id)) {
    return res.status(403).json({ error: "権限がありません" });
  }

  // バリデーション
  const errors = validateUpdate(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // 更新（ORMで安全にクエリ）
  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: { name: req.body.name, email: req.body.email },
  });

  res.json(updated);
});`}</code>
        </pre>
      </section>

      {/* セキュリティチェックリスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">開発時のセキュリティチェックリスト</h2>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">入力・出力</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>すべてのユーザー入力をサーバー側でバリデーション</li>
              <li>HTMLの出力にはエスケープを適用</li>
              <li>SQL はプリペアドステートメントを使用</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">認証・認可</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>パスワードは bcrypt でハッシュ化</li>
              <li>セッションCookie に HttpOnly, Secure, SameSite を設定</li>
              <li>APIに認証・認可チェックを実装</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">通信・インフラ</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>HTTPS を強制</li>
              <li>CORS を適切に設定</li>
              <li>レートリミットを導入</li>
              <li>環境変数でシークレットを管理</li>
            </ul>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>脆弱なコードを見つけたら、攻撃シナリオを想定して修正する</li>
          <li>XSS にはエスケープ、SQLインジェクションにはパラメータ化クエリで対応</li>
          <li>認証・認可・バリデーション・レートリミットを組み合わせて多層防御する</li>
          <li>セキュリティは機能追加後ではなく、設計段階から考慮する</li>
          <li>定期的にセキュリティチェックリストを確認し、漏れがないか検証する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="security" lessonId="security-exercise" color="red" />
      <LessonNav lessons={SECURITY_LESSONS} currentId="security-exercise" basePath="/learn/security" color="red" />
    </div>
  );
}
