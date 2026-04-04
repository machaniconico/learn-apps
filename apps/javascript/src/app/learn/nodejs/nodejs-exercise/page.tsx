import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NODEJS_LESSONS } from "@/lib/lessons-data";

export default function NodejsExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">Node.js レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Node.js総合演習</h1>
        <p className="text-gray-400">REST APIサーバーを作ろう -- タスク管理APIの構築</p>
      </div>

      {/* プロジェクト概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクト概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          これまでに学んだNode.js、Express、REST API設計、ミドルウェアの知識を総動員して、
          <strong className="text-red-400">タスク管理REST API</strong>を構築します。
          以下の機能を持つサーバーを作りましょう。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">機能一覧</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>&#x2022; タスクのCRUD操作（作成・取得・更新・削除）</li>
              <li>&#x2022; ステータスによるフィルタリング</li>
              <li>&#x2022; バリデーション</li>
              <li>&#x2022; エラーハンドリング</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">使用する技術</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>&#x2022; Express（Webフレームワーク）</li>
              <li>&#x2022; express.Router（ルート分割）</li>
              <li>&#x2022; ミドルウェア（ログ・CORS・エラー処理）</li>
              <li>&#x2022; バリデーション関数</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step 1: プロジェクトセットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 1: プロジェクトセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず、プロジェクトのディレクトリ構造を作成し、必要なパッケージをインストールします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# プロジェクト作成
$ mkdir task-api && cd task-api
$ npm init -y
$ npm install express cors
$ npm install -D nodemon

# ディレクトリ構造
# task-api/
# ├── package.json
# ├── server.js          ← エントリーポイント
# ├── routes/
# │   └── tasks.js       ← タスクルーター
# ├── middleware/
# │   ├── logger.js      ← ログミドルウェア
# │   ├── validator.js   ← バリデーション
# │   └── errorHandler.js← エラーハンドラ
# └── data/
#     └── tasks.js       ← データ（仮のDB）`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4 mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">package.json</code>にスクリプトを追加します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`{
  "name": "task-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}`}</code>
        </pre>
      </section>

      {/* Step 2: データとミドルウェア */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 2: データとミドルウェアの作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          データ管理モジュールとミドルウェアを作成します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === data/tasks.js ===
let tasks = [
  {
    id: 1,
    title: 'Express を学ぶ',
    description: 'ルーティングとミドルウェアを理解する',
    status: 'done',
    createdAt: '2026-03-01T10:00:00.000Z',
  },
  {
    id: 2,
    title: 'REST API を設計する',
    description: 'CRUD操作を実装する',
    status: 'in-progress',
    createdAt: '2026-03-15T10:00:00.000Z',
  },
  {
    id: 3,
    title: 'データベースを接続する',
    description: 'PostgreSQL と Prisma を使う',
    status: 'todo',
    createdAt: '2026-03-29T10:00:00.000Z',
  },
];
let nextId = 4;

module.exports = {
  getAll: () => tasks,
  getById: (id) => tasks.find((t) => t.id === id),
  create: (data) => {
    const task = {
      id: nextId++,
      ...data,
      status: data.status || 'todo',
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  },
  update: (id, data) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data };
    return tasks[index];
  },
  remove: (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mt-4">
          <code className="text-gray-300 font-mono">{`// === middleware/logger.js ===
function logger(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      \`[\${timestamp}] \${req.method} \${req.originalUrl} \` +
      \`→ \${res.statusCode} (\${duration}ms)\`
    );
  });

  next();
}

module.exports = logger;

// === middleware/validator.js ===
function validateTask(req, res, next) {
  const { title } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('title は空でない文字列で必須です');
  }

  if (req.body.status) {
    const validStatuses = ['todo', 'in-progress', 'done'];
    if (!validStatuses.includes(req.body.status)) {
      errors.push(
        \`status は \${validStatuses.join(', ')} のいずれかです\`
      );
    }
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  next();
}

module.exports = { validateTask };

// === middleware/errorHandler.js ===
class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

function notFoundHandler(req, res, next) {
  next(new AppError(404, \`\${req.method} \${req.url} は存在しません\`));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'サーバー内部エラー';

  console.error(\`[ERROR] \${statusCode}: \${message}\`);

  res.status(statusCode).json({
    error: {
      code: statusCode,
      message,
    },
  });
}

module.exports = { AppError, notFoundHandler, errorHandler };`}</code>
        </pre>
      </section>

      {/* Step 3: ルーター */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 3: タスクルーターの作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          タスクのCRUD操作をルーターとして実装します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === routes/tasks.js ===
const express = require('express');
const router = express.Router();
const taskDB = require('../data/tasks');
const { validateTask } = require('../middleware/validator');
const { AppError } = require('../middleware/errorHandler');

// GET /api/tasks - タスク一覧（フィルタリング対応）
router.get('/', (req, res) => {
  let tasks = taskDB.getAll();

  // ステータスでフィルタリング
  if (req.query.status) {
    tasks = tasks.filter((t) => t.status === req.query.status);
  }

  // 検索キーワード
  if (req.query.q) {
    const q = req.query.q.toLowerCase();
    tasks = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }

  res.json({
    data: tasks,
    count: tasks.length,
  });
});

// GET /api/tasks/:id - タスク詳細
router.get('/:id', (req, res, next) => {
  const task = taskDB.getById(Number(req.params.id));

  if (!task) {
    return next(new AppError(404, 'タスクが見つかりません'));
  }

  res.json(task);
});

// POST /api/tasks - タスク作成
router.post('/', validateTask, (req, res) => {
  const { title, description, status } = req.body;
  const newTask = taskDB.create({
    title: title.trim(),
    description: description?.trim() || '',
    status,
  });

  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - タスク更新
router.put('/:id', validateTask, (req, res, next) => {
  const { title, description, status } = req.body;
  const updated = taskDB.update(Number(req.params.id), {
    title: title.trim(),
    description: description?.trim() || '',
    status,
  });

  if (!updated) {
    return next(new AppError(404, 'タスクが見つかりません'));
  }

  res.json(updated);
});

// PATCH /api/tasks/:id/status - ステータスのみ更新
router.patch('/:id/status', (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['todo', 'in-progress', 'done'];

  if (!validStatuses.includes(status)) {
    return res.status(422).json({
      errors: [\`status は \${validStatuses.join(', ')} のいずれかです\`],
    });
  }

  const updated = taskDB.update(Number(req.params.id), { status });

  if (!updated) {
    return next(new AppError(404, 'タスクが見つかりません'));
  }

  res.json(updated);
});

// DELETE /api/tasks/:id - タスク削除
router.delete('/:id', (req, res, next) => {
  const deleted = taskDB.remove(Number(req.params.id));

  if (!deleted) {
    return next(new AppError(404, 'タスクが見つかりません'));
  }

  res.status(204).send();
});

module.exports = router;`}</code>
        </pre>
      </section>

      {/* Step 4: サーバー本体 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 4: サーバー本体の作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべてのパーツを組み合わせて、サーバーを完成させます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === server.js ===
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// === ミドルウェア ===
app.use(cors());
app.use(logger);
app.use(express.json());

// === ルーティング ===
// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// タスクAPI
app.use('/api/tasks', tasksRouter);

// === エラーハンドリング ===
app.use(notFoundHandler);
app.use(errorHandler);

// === サーバー起動 ===
app.listen(PORT, () => {
  console.log(\`タスク管理APIサーバー起動: http://localhost:\${PORT}\`);
  console.log('利用可能なエンドポイント:');
  console.log('  GET    /api/health');
  console.log('  GET    /api/tasks');
  console.log('  GET    /api/tasks/:id');
  console.log('  POST   /api/tasks');
  console.log('  PUT    /api/tasks/:id');
  console.log('  PATCH  /api/tasks/:id/status');
  console.log('  DELETE /api/tasks/:id');
});`}</code>
        </pre>
      </section>

      {/* Step 5: テスト方法 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 5: APIをテストする</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          curlコマンドやHTTPクライアントを使って、作成したAPIをテストしましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# サーバー起動
$ npm run dev

# === curlでテスト ===

# ヘルスチェック
$ curl http://localhost:3000/api/health
# → {"status":"ok","timestamp":"2026-03-29T..."}

# タスク一覧取得
$ curl http://localhost:3000/api/tasks
# → {"data":[...],"count":3}

# ステータスでフィルタリング
$ curl "http://localhost:3000/api/tasks?status=todo"

# キーワード検索
$ curl "http://localhost:3000/api/tasks?q=Express"

# タスク詳細取得
$ curl http://localhost:3000/api/tasks/1

# タスク作成
$ curl -X POST http://localhost:3000/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title":"テストを書く","description":"Jestでユニットテスト"}'
# → {"id":4,"title":"テストを書く",...,"status":"todo"}

# タスク更新
$ curl -X PUT http://localhost:3000/api/tasks/4 \\
  -H "Content-Type: application/json" \\
  -d '{"title":"テストを書く（更新）","status":"in-progress"}'

# ステータスのみ更新
$ curl -X PATCH http://localhost:3000/api/tasks/4/status \\
  -H "Content-Type: application/json" \\
  -d '{"status":"done"}'

# タスク削除
$ curl -X DELETE http://localhost:3000/api/tasks/4
# → (204 No Content)

# 存在しないタスク
$ curl http://localhost:3000/api/tasks/999
# → {"error":{"code":404,"message":"タスクが見つかりません"}}

# バリデーションエラー
$ curl -X POST http://localhost:3000/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title":""}'
# → {"errors":["title は空でない文字列で必須です"]}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Express + Router でルーティングを整理し、関心ごとにファイルを分割した</li>
          <li>ログ、バリデーション、エラーハンドリングのミドルウェアを実装した</li>
          <li>CRUD操作（GET/POST/PUT/PATCH/DELETE）でタスクを管理するAPIを構築した</li>
          <li>クエリパラメータによるフィルタリング・検索機能を追加した</li>
          <li>統一されたエラーレスポンス形式で、クライアントにわかりやすいエラー情報を返した</li>
          <li>curlコマンドでAPIのテストを行い、各エンドポイントの動作を確認した</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nodejs" lessonId="nodejs-exercise" color="red" />
      <LessonNav lessons={NODEJS_LESSONS} currentId="nodejs-exercise" basePath="/learn/nodejs" color="red" />
    </div>
  );
}
