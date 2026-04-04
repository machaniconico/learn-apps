import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { MONITORING_LESSONS } from "@/lib/lessons-data";

export default function LoggingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">モニタリング レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ログ設計</h1>
        <p className="text-gray-400">構造化ログ、ログレベル、Winstonによる実践的なログ設計を学ぼう</p>
      </div>

      {/* 構造化ログ vs 非構造化ログ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">構造化ログ（Structured Logging）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">構造化ログ</strong>とは、ログをJSON形式で出力することで、
          機械的に検索・集計しやすくする手法です。従来のテキストログと比較してみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 非構造化ログ（従来のスタイル）
console.log("2024-01-15 10:30:00 ERROR User login failed for user@example.com from 192.168.1.1");
// → 検索しにくい、パースが困難

// 構造化ログ（推奨）
logger.error("User login failed", {
  email: "user@example.com",
  ip: "192.168.1.1",
  reason: "invalid_password",
  attemptCount: 3,
});
// 出力:
// {"timestamp":"2024-01-15T10:30:00Z","level":"error",
//  "message":"User login failed","email":"user@example.com",
//  "ip":"192.168.1.1","reason":"invalid_password","attemptCount":3}`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-teal-500/10 border border-teal-500/30">
          <p className="text-sm text-teal-400 font-semibold mb-1">構造化ログのメリット</p>
          <p className="text-sm text-gray-300">
            JSON形式なので「email=&quot;user@example.com&quot;のエラーログだけ検索」のようなフィルタリングが容易になります。
            ELKやDatadogなどのログ管理ツールとの連携も簡単です。
          </p>
        </div>
      </section>

      {/* ログレベル */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ログレベル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ログには重要度に応じた<strong className="text-teal-400">レベル</strong>を設定します。
          適切なレベルを使い分けることで、必要な情報だけを効率的に確認できます。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">error</h3>
            <p className="text-sm text-gray-400">アプリケーションの正常動作を妨げるエラー。即座に対応が必要。</p>
            <p className="text-xs text-gray-500 mt-1">例: DB接続失敗、外部API障害、未処理の例外</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-1">warn</h3>
            <p className="text-sm text-gray-400">問題の予兆や、想定外だが動作は継続できる状態。</p>
            <p className="text-xs text-gray-500 mt-1">例: ディスク容量80%超え、APIレスポンスが遅い、リトライ発生</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-1">info</h3>
            <p className="text-sm text-gray-400">アプリケーションの正常な動作を記録。ビジネスイベントの追跡に有用。</p>
            <p className="text-xs text-gray-500 mt-1">例: ユーザーログイン、注文完了、サーバー起動</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-gray-400 mb-1">debug</h3>
            <p className="text-sm text-gray-400">開発・デバッグ時に詳細な情報を出力。本番環境では通常無効にする。</p>
            <p className="text-xs text-gray-500 mt-1">例: 関数の引数・戻り値、SQLクエリ、リクエスト/レスポンスの詳細</p>
          </div>
        </div>
      </section>

      {/* Winstonのセットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Winston によるログ設定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Winston</strong> はNode.jsで最も人気のあるロギングライブラリです。
          複数の出力先（トランスポート）、ログレベル、フォーマットを柔軟に設定できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install winston

import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: "my-api",
    environment: process.env.NODE_ENV,
  },
  transports: [
    // エラーログは別ファイルに出力
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // 全レベルのログを出力
    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// 開発環境ではコンソールにも出力
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;`}</code>
        </pre>
      </section>

      {/* Correlation ID */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Correlation ID（相関ID）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          1つのリクエストに関連するすべてのログを紐づけるために、
          <strong className="text-teal-400">Correlation ID</strong>（リクエストID）を付与します。
          マイクロサービス環境では特に重要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";

// Correlation ID ミドルウェア
function correlationMiddleware(req: Request, res: Response, next: NextFunction) {
  // クライアントから送られたIDがあればそれを使う
  const correlationId = req.headers["x-correlation-id"] as string
    || randomUUID();

  // リクエストオブジェクトに付与
  req.correlationId = correlationId;

  // レスポンスヘッダーにも含める
  res.setHeader("x-correlation-id", correlationId);

  next();
}

// ログ出力時にCorrelation IDを含める
app.get("/api/users/:id", async (req, res) => {
  const correlationId = req.correlationId;

  logger.info("Fetching user", {
    correlationId,
    userId: req.params.id,
  });

  try {
    const user = await userService.findById(req.params.id);
    logger.info("User found", { correlationId, userId: user.id });
    res.json(user);
  } catch (error) {
    logger.error("Failed to fetch user", {
      correlationId,
      userId: req.params.id,
      error: error.message,
    });
    res.status(500).json({ error: "Internal server error" });
  }
});`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-teal-500/10 border border-teal-500/30">
          <p className="text-sm text-teal-400 font-semibold mb-1">ログの検索例</p>
          <p className="text-sm text-gray-300">
            Correlation IDで検索すると、1つのリクエストに関連する全てのログが時系列で取得できます。
            障害調査の時間を大幅に短縮できます。
          </p>
        </div>
      </section>

      {/* ログローテーション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ログローテーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ログファイルを放置するとディスクを圧迫します。
          <strong className="text-teal-400">ログローテーション</strong>で定期的にファイルを切り替え、古いログを削除しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install winston-daily-rotate-file

import DailyRotateFile from "winston-daily-rotate-file";

const rotateTransport = new DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",       // 1ファイル最大20MB
  maxFiles: "14d",      // 14日分保持
  zippedArchive: true,  // 古いファイルはgzip圧縮
});

rotateTransport.on("rotate", (oldFilename, newFilename) => {
  logger.info("Log file rotated", { oldFilename, newFilename });
});

// Winstonに追加
logger.add(rotateTransport);`}</code>
        </pre>
      </section>

      {/* 何をログに記録するか */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">何をログに記録するか</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          適切な情報をログに記録することで、障害調査やビジネス分析に活用できます。
          ただし、機密情報のログ出力には注意が必要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 記録すべき情報
logger.info("Order created", {
  orderId: "ord-12345",
  userId: "usr-67890",
  totalAmount: 4980,
  itemCount: 3,
  paymentMethod: "credit_card",
  correlationId: req.correlationId,
});

// 記録してはいけない情報（セキュリティリスク）
// NG: パスワード、クレジットカード番号、個人情報の詳細
logger.info("User login", {
  email: "user@example.com",
  password: "secret123",       // 絶対にNG!
  creditCard: "4242-xxxx-xxxx", // 絶対にNG!
});

// OK: 機密情報をマスキング
logger.info("User login", {
  email: "u***@example.com",   // マスキング
  hasPassword: true,            // 存在の有無だけ記録
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>構造化ログ（JSON形式）を使うことで検索・集計が容易になる</li>
          <li>ログレベル（error/warn/info/debug）を適切に使い分ける</li>
          <li>Winstonで柔軟なログ設定を行い、環境ごとに出力を切り替える</li>
          <li>Correlation IDでリクエスト単位のログ追跡を可能にする</li>
          <li>ログローテーションでディスク容量を管理する</li>
          <li>パスワードやカード番号などの機密情報はログに含めない</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="monitoring" lessonId="logging" color="teal" />
      <LessonNav lessons={MONITORING_LESSONS} currentId="logging" basePath="/learn/monitoring" color="teal" />
    </div>
  );
}
