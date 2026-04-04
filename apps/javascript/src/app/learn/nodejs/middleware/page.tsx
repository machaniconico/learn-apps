import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NODEJS_LESSONS } from "@/lib/lessons-data";

export default function NodejsMiddlewareLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">Node.js レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ミドルウェア</h1>
        <p className="text-gray-400">認証、ログ、エラーハンドリングの仕組みを理解しよう</p>
      </div>

      {/* ミドルウェアとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ミドルウェアとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">ミドルウェア</strong>は、リクエストとレスポンスの間に挟まる処理関数です。
          リクエストが最終的なルートハンドラに到達する前（または後）に、
          ログ記録、認証チェック、データの変換などを行います。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Expressのミドルウェアは<code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">(req, res, next)</code>の
          3つの引数を受け取ります。<code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">next()</code>を
          呼ぶと次のミドルウェアに処理が移ります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`const express = require('express');
const app = express();

// ミドルウェアの基本形
function myMiddleware(req, res, next) {
  console.log('ミドルウェアが実行されました');
  // 次のミドルウェア or ルートハンドラへ
  next();
}

// すべてのリクエストに適用
app.use(myMiddleware);

// 特定のパスにのみ適用
app.use('/api', myMiddleware);

// 特定のルートにのみ適用
app.get('/secret', myMiddleware, (req, res) => {
  res.json({ message: '秘密のデータ' });
});

// リクエストの流れ:
// リクエスト → ミドルウェア1 → ミドルウェア2 → ルートハンドラ → レスポンス`}</code>
        </pre>
      </section>

      {/* ログミドルウェア */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ログミドルウェア</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべてのリクエストの情報を記録する<strong className="text-red-400">ログミドルウェア</strong>は、
          デバッグや監視に欠かせません。自作することも、morganなどのライブラリを使うこともできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 自作ログミドルウェア
function logger(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // レスポンス完了時にログを出力
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      \`[\${timestamp}] \${req.method} \${req.url} \` +
      \`→ \${res.statusCode} (\${duration}ms)\`
    );
  });

  next();
}

app.use(logger);

// 出力例:
// [2026-03-29T10:30:00.000Z] GET /api/books → 200 (5ms)
// [2026-03-29T10:30:01.000Z] POST /api/books → 201 (12ms)
// [2026-03-29T10:30:02.000Z] GET /api/books/999 → 404 (2ms)

// --- morgan（人気のログライブラリ）を使う場合 ---
// $ npm install morgan
const morgan = require('morgan');
app.use(morgan('dev'));
// 出力: GET /api/books 200 5.123 ms - 245`}</code>
        </pre>
      </section>

      {/* CORSミドルウェア */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">CORSミドルウェア</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">CORS（Cross-Origin Resource Sharing）</strong>は、
          異なるオリジン（ドメイン）からのAPIアクセスを制御する仕組みです。
          フロントエンド（localhost:3000）からバックエンド（localhost:4000）にアクセスする場合に必要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 自作CORSミドルウェア
function cors(req, res, next) {
  // 許可するオリジン
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // 許可するHTTPメソッド
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // 許可するヘッダー
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // プリフライトリクエスト（OPTIONS）への応答
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
}

app.use(cors);

// --- corsパッケージを使う場合（推奨） ---
// $ npm install cors
const corsLib = require('cors');

// すべてのオリジンを許可
app.use(corsLib());

// 特定のオリジンのみ許可
app.use(corsLib({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Cookie を含むリクエストを許可
}));`}</code>
        </pre>
      </section>

      {/* 認証ミドルウェア */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">認証ミドルウェア</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          保護されたAPIエンドポイントには<strong className="text-red-400">認証ミドルウェア</strong>で
          アクセス制御を行います。トークンベースの認証が一般的です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// シンプルなトークン認証ミドルウェア
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      error: '認証トークンが必要です',
    });
  }

  // "Bearer <token>" 形式からトークンを取得
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'トークンの形式が不正です',
    });
  }

  try {
    // トークンの検証（実際にはJWTライブラリを使用）
    // const decoded = jwt.verify(token, SECRET_KEY);
    const decoded = { userId: 1, role: 'admin' }; // 仮
    req.user = decoded; // リクエストにユーザー情報を追加
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'トークンが無効です',
    });
  }
}

// 権限チェックミドルウェア
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'この操作を行う権限がありません',
      });
    }
    next();
  };
}

// 公開ルート（認証不要）
app.get('/api/books', (req, res) => {
  res.json(books);
});

// 保護されたルート（認証必要）
app.post('/api/books', authenticate, (req, res) => {
  // req.user が利用可能
  res.status(201).json({ ...req.body, createdBy: req.user.userId });
});

// 管理者のみアクセス可能
app.delete('/api/books/:id',
  authenticate,
  authorize('admin'),
  (req, res) => {
    res.status(204).send();
  }
);`}</code>
        </pre>
      </section>

      {/* エラーハンドリングミドルウェア */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">エラーハンドリングミドルウェア</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Expressでは、<strong className="text-red-400">4つの引数</strong>を持つミドルウェアが
          エラーハンドラとして認識されます。アプリ全体のエラーを一箇所で処理できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// カスタムエラークラス
class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// ルートハンドラでエラーを投げる
app.get('/api/books/:id', (req, res, next) => {
  const book = books.find(b => b.id === Number(req.params.id));

  if (!book) {
    // next() にエラーを渡すとエラーハンドラへ
    return next(new AppError(404, '書籍が見つかりません'));
  }

  res.json(book);
});

// 存在しないルートのハンドリング
app.use((req, res, next) => {
  next(new AppError(404, \`\${req.method} \${req.url} は存在しません\`));
});

// エラーハンドリングミドルウェア（4つの引数）
// 必ず他のルートの後に定義する！
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'サーバー内部エラー';

  // 開発環境ではスタックトレースを出力
  console.error(\`[\${statusCode}] \${message}\`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    error: {
      code: statusCode,
      message,
      // 開発環境のみスタックを返す
      ...(process.env.NODE_ENV !== 'production' && {
        stack: err.stack,
      }),
    },
  });
});`}</code>
        </pre>
      </section>

      {/* ミドルウェアチェーン */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ミドルウェアチェーンの全体像</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実際のアプリケーションでは、複数のミドルウェアを組み合わせてリクエスト処理のパイプラインを構成します。
          <strong className="text-red-400">定義順が重要</strong>です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// === 1. 共通ミドルウェア（順番が重要！） ===
app.use(cors());                    // CORS
app.use(morgan('dev'));             // ログ
app.use(express.json());           // JSONパース
app.use(express.urlencoded({ extended: true }));

// === 2. 静的ファイル ===
app.use(express.static('public'));

// === 3. カスタムミドルウェア ===
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// === 4. ルーティング ===
app.use('/api/books', booksRouter);
app.use('/api/users', authenticate, usersRouter);

// === 5. 404ハンドラ ===
app.use((req, res, next) => {
  next(new AppError(404, 'ルートが見つかりません'));
});

// === 6. エラーハンドラ（最後に定義） ===
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: { message: err.message },
  });
});

app.listen(3000);`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>ミドルウェアは<code className="text-red-400">(req, res, next)</code>の形で、リクエスト処理のパイプラインを構成する</li>
          <li><code className="text-red-400">next()</code>を呼ぶと次のミドルウェアへ、呼ばないとそこで処理が止まる</li>
          <li>ログ、CORS、認証、バリデーションなど用途に応じたミドルウェアを作成・利用する</li>
          <li>エラーハンドリングミドルウェアは4つの引数<code className="text-red-400">(err, req, res, next)</code>で定義する</li>
          <li>ミドルウェアの定義順序は重要 -- 共通処理、ルーティング、404、エラーハンドラの順で配置する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nodejs" lessonId="middleware" color="red" />
      <LessonNav lessons={NODEJS_LESSONS} currentId="middleware" basePath="/learn/nodejs" color="red" />
    </div>
  );
}
