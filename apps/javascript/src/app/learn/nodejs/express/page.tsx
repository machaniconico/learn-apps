import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NODEJS_LESSONS } from "@/lib/lessons-data";

export default function NodejsExpressLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">Node.js レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Express入門</h1>
        <p className="text-gray-400">Webフレームワークでサーバーを作ろう</p>
      </div>

      {/* Expressとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Expressとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">Express</strong>は、Node.jsで最も広く使われている
          Webアプリケーションフレームワークです。シンプルで柔軟なAPIを持ち、
          ルーティング、ミドルウェア、テンプレートエンジンなどの機能を提供します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Expressのインストール
$ mkdir my-server && cd my-server
$ npm init -y
$ npm install express

# 開発用にnodemonもインストール
$ npm install -D nodemon`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4 mb-4">
          最小限のExpressサーバーを作ってみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`const express = require('express');
const app = express();
const PORT = 3000;

// ルートへのGETリクエスト
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// サーバー起動
app.listen(PORT, () => {
  console.log(\`サーバー起動: http://localhost:\${PORT}\`);
});

// $ node app.js
// ブラウザで http://localhost:3000 にアクセス`}</code>
        </pre>
      </section>

      {/* ルーティング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ルーティング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">ルーティング</strong>は、URLとHTTPメソッドに応じて
          処理を振り分ける仕組みです。ExpressではHTTPメソッドに対応したメソッドでルートを定義します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`const express = require('express');
const app = express();

// JSON ボディのパース（POSTリクエスト用）
app.use(express.json());

// GET: データの取得
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: '太郎' },
    { id: 2, name: '花子' },
  ]);
});

// GET: パラメータ付き（/api/users/1）
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: '太郎' });
});

// POST: データの作成
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  console.log('新規ユーザー:', name, email);
  res.status(201).json({ id: 3, name, email });
});

// PUT: データの更新（全体）
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({ id, name, email, updated: true });
});

// DELETE: データの削除
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: \`ユーザー \${id} を削除しました\` });
});

app.listen(3000);`}</code>
        </pre>
      </section>

      {/* リクエストとレスポンス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">リクエストとレスポンス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Expressのコールバック関数は、
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">req</code>（リクエスト）と
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">res</code>（レスポンス）の
          2つのオブジェクトを受け取ります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === req（リクエスト）オブジェクト ===
app.get('/api/search', (req, res) => {
  // クエリパラメータ: /api/search?q=nodejs&page=2
  console.log(req.query.q);       // 'nodejs'
  console.log(req.query.page);    // '2'

  // リクエストヘッダー
  console.log(req.headers['content-type']);
  console.log(req.headers['authorization']);

  // HTTPメソッド
  console.log(req.method);  // 'GET'

  // URL情報
  console.log(req.path);    // '/api/search'
  console.log(req.url);     // '/api/search?q=nodejs&page=2'

  res.json({ query: req.query });
});

// === res（レスポンス）オブジェクト ===
app.get('/api/demo', (req, res) => {
  // JSON レスポンス
  res.json({ message: 'こんにちは' });

  // ステータスコード付き
  // res.status(201).json({ created: true });

  // テキストレスポンス
  // res.send('Hello!');

  // HTMLレスポンス
  // res.send('<h1>Hello</h1>');

  // リダイレクト
  // res.redirect('/new-url');

  // ファイルダウンロード
  // res.download('./file.pdf');

  // ステータスコードのみ
  // res.sendStatus(204);  // No Content
});`}</code>
        </pre>
      </section>

      {/* ルーターの分割 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ルーターの分割</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アプリが大きくなると、ルーティングをファイルごとに分割すると管理しやすくなります。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">express.Router()</code>を使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === routes/users.js ===
const express = require('express');
const router = express.Router();

// /api/users のルート
router.get('/', (req, res) => {
  res.json([{ id: 1, name: '太郎' }]);
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: '太郎' });
});

router.post('/', (req, res) => {
  res.status(201).json({ ...req.body, id: Date.now() });
});

module.exports = router;

// === routes/posts.js ===
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, title: '初投稿' }]);
});

module.exports = router;

// === app.js（メインファイル） ===
const express = require('express');
const app = express();

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use(express.json());

// ルーターをマウント
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.listen(3000, () => {
  console.log('サーバー起動: http://localhost:3000');
});`}</code>
        </pre>
      </section>

      {/* 静的ファイルの配信 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">静的ファイルの配信</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          HTML、CSS、画像などの静的ファイルを配信するには、
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">express.static()</code>ミドルウェアを使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`const express = require('express');
const path = require('path');
const app = express();

// publicフォルダの中身を静的ファイルとして配信
app.use(express.static('public'));

// プレフィックス付き: /static/style.css → public/style.css
app.use('/static', express.static('public'));

// 絶対パスを使う場合（推奨）
app.use(express.static(path.join(__dirname, 'public')));

// ディレクトリ構成の例:
// my-server/
// ├── app.js
// └── public/
//     ├── index.html
//     ├── style.css
//     ├── script.js
//     └── images/
//         └── logo.png

// http://localhost:3000/index.html
// http://localhost:3000/style.css
// http://localhost:3000/images/logo.png

app.listen(3000);`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Expressは<code className="text-red-400">npm install express</code>で簡単にインストールできる</li>
          <li><code className="text-red-400">app.get()</code>、<code className="text-red-400">app.post()</code>等でHTTPメソッドごとにルートを定義</li>
          <li><code className="text-red-400">req.params</code>、<code className="text-red-400">req.query</code>、<code className="text-red-400">req.body</code>でリクエストデータを取得</li>
          <li><code className="text-red-400">res.json()</code>、<code className="text-red-400">res.status()</code>、<code className="text-red-400">res.send()</code>でレスポンスを返す</li>
          <li><code className="text-red-400">express.Router()</code>でルーティングをファイル分割して整理する</li>
          <li><code className="text-red-400">express.static()</code>で静的ファイルを簡単に配信できる</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nodejs" lessonId="express" color="red" />
      <LessonNav lessons={NODEJS_LESSONS} currentId="express" basePath="/learn/nodejs" color="red" />
    </div>
  );
}
