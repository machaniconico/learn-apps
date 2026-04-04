import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NODEJS_LESSONS } from "@/lib/lessons-data";

export default function NodejsRestApiLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">Node.js レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">REST API設計</h1>
        <p className="text-gray-400">CRUD操作とHTTPメソッドでAPIを設計しよう</p>
      </div>

      {/* RESTとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">RESTとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">REST（Representational State Transfer）</strong>は、
          Web APIを設計するためのアーキテクチャスタイルです。
          HTTPメソッドとURLの組み合わせでリソース（データ）を操作します。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">RESTの原則</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>&#x2022; URLはリソース（名詞）を表す</li>
              <li>&#x2022; HTTPメソッドで操作（動詞）を表す</li>
              <li>&#x2022; ステートレス（状態を持たない）</li>
              <li>&#x2022; 統一されたインターフェース</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">URL設計の例</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li><code className="text-red-400">GET /api/books</code> — 一覧取得</li>
              <li><code className="text-red-400">GET /api/books/1</code> — 詳細取得</li>
              <li><code className="text-red-400">POST /api/books</code> — 新規作成</li>
              <li><code className="text-red-400">PUT /api/books/1</code> — 更新</li>
              <li><code className="text-red-400">DELETE /api/books/1</code> — 削除</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HTTPメソッドとステータスコード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">HTTPメソッドとステータスコード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          REST APIでは、<strong className="text-red-400">HTTPメソッド</strong>で操作の種類を、
          <strong className="text-red-400">ステータスコード</strong>で結果を表現します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === HTTPメソッド ===
// GET     - リソースの取得（べき等・安全）
// POST    - リソースの作成
// PUT     - リソースの全体更新（べき等）
// PATCH   - リソースの部分更新
// DELETE  - リソースの削除（べき等）

// === よく使うステータスコード ===
// 200 OK              - リクエスト成功
// 201 Created         - リソース作成成功
// 204 No Content      - 成功（レスポンスボディなし）
// 400 Bad Request     - クライアントのリクエストが不正
// 401 Unauthorized    - 認証が必要
// 403 Forbidden       - アクセス権限がない
// 404 Not Found       - リソースが見つからない
// 409 Conflict        - リソースの競合
// 422 Unprocessable   - バリデーションエラー
// 500 Internal Error  - サーバー内部エラー`}</code>
        </pre>
      </section>

      {/* CRUD操作の実装 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">CRUD操作の実装</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          書籍管理APIを例に、<strong className="text-red-400">CRUD（Create, Read, Update, Delete）</strong>
          操作を実装してみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`const express = require('express');
const app = express();

app.use(express.json());

// 仮のデータベース（メモリ上）
let books = [
  { id: 1, title: 'JavaScript入門', author: '山田太郎', price: 2800 },
  { id: 2, title: 'Node.js実践ガイド', author: '鈴木花子', price: 3200 },
  { id: 3, title: 'Web開発の教科書', author: '田中一郎', price: 2500 },
];
let nextId = 4;

// CREATE: 書籍を新規作成
app.post('/api/books', (req, res) => {
  const { title, author, price } = req.body;

  // バリデーション
  if (!title || !author) {
    return res.status(400).json({
      error: 'title と author は必須です',
    });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
    price: price || 0,
  };
  books.push(newBook);

  res.status(201).json(newBook);
});

// READ: 書籍一覧を取得
app.get('/api/books', (req, res) => {
  // クエリパラメータでフィルタリング
  const { author, minPrice } = req.query;

  let result = books;
  if (author) {
    result = result.filter(b => b.author.includes(author));
  }
  if (minPrice) {
    result = result.filter(b => b.price >= Number(minPrice));
  }

  res.json(result);
});

// READ: 書籍を1件取得
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));

  if (!book) {
    return res.status(404).json({ error: '書籍が見つかりません' });
  }

  res.json(book);
});

// UPDATE: 書籍を更新
app.put('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: '書籍が見つかりません' });
  }

  const { title, author, price } = req.body;
  books[index] = {
    ...books[index],
    title: title ?? books[index].title,
    author: author ?? books[index].author,
    price: price ?? books[index].price,
  };

  res.json(books[index]);
});

// DELETE: 書籍を削除
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: '書籍が見つかりません' });
  }

  books.splice(index, 1);
  res.status(204).send();
});

app.listen(3000);`}</code>
        </pre>
      </section>

      {/* リクエストボディのパースとバリデーション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">リクエストボディのパースとバリデーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          POSTやPUTリクエストではクライアントからデータを受け取ります。
          不正なデータからアプリを守るために<strong className="text-red-400">バリデーション</strong>が重要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// express.json() でJSONボディをパース
app.use(express.json());

// URLエンコードされたデータもパース（フォーム送信等）
app.use(express.urlencoded({ extended: true }));

// 手動バリデーションの例
function validateBook(data) {
  const errors = [];

  if (!data.title || typeof data.title !== 'string') {
    errors.push('title は文字列で必須です');
  }
  if (!data.author || typeof data.author !== 'string') {
    errors.push('author は文字列で必須です');
  }
  if (data.price !== undefined && typeof data.price !== 'number') {
    errors.push('price は数値で指定してください');
  }
  if (data.price !== undefined && data.price < 0) {
    errors.push('price は0以上で指定してください');
  }

  return errors;
}

app.post('/api/books', (req, res) => {
  const errors = validateBook(req.body);

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  // バリデーション通過 → 作成処理
  const newBook = {
    id: nextId++,
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    price: req.body.price || 0,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});`}</code>
        </pre>
      </section>

      {/* API設計のベストプラクティス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">API設計のベストプラクティス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          使いやすく、保守しやすいAPIを作るためのポイントを押さえましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 1. URLは名詞・複数形を使う
// Good:  /api/users, /api/books
// Bad:   /api/getUsers, /api/book

// 2. ネストでリレーションを表現
// GET /api/users/1/posts     ← ユーザー1の投稿一覧
// GET /api/posts/5/comments  ← 投稿5のコメント一覧

// 3. ページネーション
app.get('/api/books', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;

  const paginatedBooks = books.slice(start, start + limit);

  res.json({
    data: paginatedBooks,
    pagination: {
      page,
      limit,
      total: books.length,
      totalPages: Math.ceil(books.length / limit),
    },
  });
});

// 4. 統一されたエラーレスポンス
// {
//   "error": {
//     "code": "NOT_FOUND",
//     "message": "書籍が見つかりません"
//   }
// }

// 5. APIバージョニング
// /api/v1/users
// /api/v2/users`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>RESTはHTTPメソッド（GET/POST/PUT/DELETE）でリソースを操作するアーキテクチャ</li>
          <li>適切なステータスコード（200, 201, 404, 500等）で結果を伝える</li>
          <li>CRUD操作はWebアプリの基本パターン</li>
          <li>バリデーションで不正なデータからアプリを守る</li>
          <li>URL設計はリソース名（名詞・複数形）を使い、ページネーションやバージョニングを考慮する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nodejs" lessonId="rest-api" color="red" />
      <LessonNav lessons={NODEJS_LESSONS} currentId="rest-api" basePath="/learn/nodejs" color="red" />
    </div>
  );
}
