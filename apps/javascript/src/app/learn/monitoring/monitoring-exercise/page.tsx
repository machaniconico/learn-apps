import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { MONITORING_LESSONS } from "@/lib/lessons-data";

export default function MonitoringExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">モニタリング レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">総合演習</h1>
        <p className="text-gray-400">構造化ログ、Sentryエラー監視、カスタムメトリクスを統合した監視システムを構築しよう</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、Express APIサーバーに包括的な監視システムを構築します。
          レッスン1〜4で学んだ技術を組み合わせて、本番運用に耐えうる
          <strong className="text-teal-400">可観測性（Observability）</strong>を実装しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`演習で構築するもの:

1. 構造化ログ（Winston）
   - JSON形式のログ出力
   - Correlation IDによるリクエスト追跡
   - ログローテーション

2. エラー監視（Sentry）
   - SDKの初期化とExpress統合
   - ユーザーコンテキスト
   - カスタムブレッドクラム

3. カスタムメトリクス（Prometheus）
   - リクエスト数、エラー率
   - レイテンシー（ヒストグラム）
   - ビジネスメトリクス

4. アラート設定
   - エラー率の閾値アラート
   - レイテンシーの劣化検知`}</code>
        </pre>
      </section>

      {/* Step 1: プロジェクトのセットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 1: プロジェクトのセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず必要なパッケージをインストールし、プロジェクト構成を準備します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# プロジェクト初期化
mkdir monitoring-exercise && cd monitoring-exercise
npm init -y
npm install express typescript ts-node @types/express
npm install winston winston-daily-rotate-file
npm install @sentry/node
npm install prom-client
npm install uuid @types/uuid

# TypeScript設定
npx tsc --init

# ディレクトリ構成
monitoring-exercise/
├── src/
│   ├── index.ts           # エントリポイント
│   ├── middleware/
│   │   ├── correlation.ts # Correlation IDミドルウェア
│   │   ├── metrics.ts     # メトリクス収集ミドルウェア
│   │   └── logging.ts     # リクエストログミドルウェア
│   ├── lib/
│   │   ├── logger.ts      # Winston設定
│   │   ├── sentry.ts      # Sentry設定
│   │   └── metrics.ts     # Prometheusメトリクス定義
│   └── routes/
│       └── orders.ts      # サンプルAPIルート
├── logs/                  # ログ出力先
├── tsconfig.json
└── package.json`}</code>
        </pre>
      </section>

      {/* Step 2: ロガーの実装 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 2: 構造化ロガーの実装</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WinstonでJSON形式のログ出力を設定します。ログローテーションも含めて実装しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/lib/logger.ts
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: "monitoring-exercise",
    environment: process.env.NODE_ENV || "development",
  },
  transports: [
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    }),
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? JSON.stringify(meta, null, 2)
            : "";
          return \`\${timestamp} [\${level}] \${message} \${metaStr}\`;
        })
      ),
    })
  );
}

export default logger;`}</code>
        </pre>
      </section>

      {/* Step 3: Correlation IDミドルウェア */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 3: Correlation ID とリクエストログ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          各リクエストにCorrelation IDを付与し、リクエスト/レスポンスのログを自動出力するミドルウェアを実装します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/middleware/correlation.ts
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      correlationId: string;
    }
  }
}

export function correlationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const correlationId =
    (req.headers["x-correlation-id"] as string) || uuidv4();
  req.correlationId = correlationId;
  res.setHeader("x-correlation-id", correlationId);
  next();
}

// src/middleware/logging.ts
import { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";

export function requestLoggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = process.hrtime.bigint();

  logger.info("Incoming request", {
    correlationId: req.correlationId,
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    const logLevel = res.statusCode >= 400 ? "warn" : "info";

    logger[logLevel]("Request completed", {
      correlationId: req.correlationId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Math.round(durationMs * 100) / 100,
    });
  });

  next();
}`}</code>
        </pre>
      </section>

      {/* Step 4: Sentry統合 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 4: Sentry エラー監視の統合</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SentryをExpressアプリに統合し、エラーの自動キャプチャとカスタムコンテキストを設定します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/lib/sentry.ts
import * as Sentry from "@sentry/node";
import { Express } from "express";

export function initSentry(app: Express) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    release: "monitoring-exercise@1.0.0",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    beforeSend(event) {
      // 機密情報をフィルタリング
      if (event.request?.headers) {
        delete event.request.headers["authorization"];
        delete event.request.headers["cookie"];
      }
      return event;
    },
  });

  // Expressハンドラーの登録
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

export function setupSentryErrorHandler(app: Express) {
  app.use(Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // 4xx と 5xx エラーをキャプチャ
      const status = (error as any).status || 500;
      return status >= 400;
    },
  }));
}

// Sentryにユーザー情報を設定するミドルウェア
export function sentryUserMiddleware(req: any, res: any, next: any) {
  if (req.user) {
    Sentry.setUser({
      id: req.user.id,
      email: req.user.email,
    });
  }
  Sentry.setTag("correlationId", req.correlationId);
  next();
}`}</code>
        </pre>
      </section>

      {/* Step 5: メトリクス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 5: Prometheus メトリクスの実装</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カスタムメトリクスを定義し、リクエストごとに記録するミドルウェアを実装します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/lib/metrics.ts
import client from "prom-client";

client.collectDefaultMetrics();

export const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

export const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route"],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});

export const ordersCreated = new client.Counter({
  name: "orders_created_total",
  help: "Total orders created",
  labelNames: ["status"],
});

export const activeRequests = new client.Gauge({
  name: "active_requests",
  help: "Number of active requests",
});

export const metricsRegistry = client.register;

// src/middleware/metrics.ts
import { Request, Response, NextFunction } from "express";
import {
  httpRequestsTotal,
  httpRequestDuration,
  activeRequests,
} from "../lib/metrics";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  activeRequests.inc();
  const end = httpRequestDuration.startTimer({
    method: req.method,
    route: req.route?.path || req.path,
  });

  res.on("finish", () => {
    activeRequests.dec();
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
    end();
  });

  next();
}`}</code>
        </pre>
      </section>

      {/* Step 6: 統合 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 6: すべてを統合する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          最後に、すべてのコンポーネントを統合してExpressアプリを完成させます。
          ミドルウェアの配置順序が重要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/index.ts
import express from "express";
import * as Sentry from "@sentry/node";
import { initSentry, setupSentryErrorHandler, sentryUserMiddleware } from "./lib/sentry";
import { correlationMiddleware } from "./middleware/correlation";
import { requestLoggingMiddleware } from "./middleware/logging";
import { metricsMiddleware } from "./middleware/metrics";
import { metricsRegistry, ordersCreated } from "./lib/metrics";
import logger from "./lib/logger";

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Sentry初期化（最初に配置）
initSentry(app);

// 2. パーサー
app.use(express.json());

// 3. Correlation ID（ログの前に配置）
app.use(correlationMiddleware);

// 4. Sentryユーザー情報
app.use(sentryUserMiddleware);

// 5. リクエストログ
app.use(requestLoggingMiddleware);

// 6. メトリクス収集
app.use(metricsMiddleware);

// ── ルーティング ──

// メトリクスエンドポイント（Prometheusスクレイプ用）
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", metricsRegistry.contentType);
  res.end(await metricsRegistry.metrics());
});

// ヘルスチェック
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// サンプルAPI: 注文作成
app.post("/api/orders", async (req, res) => {
  const { items, userId } = req.body;

  Sentry.addBreadcrumb({
    category: "order",
    message: "Creating new order",
    level: "info",
    data: { userId, itemCount: items?.length },
  });

  try {
    // バリデーション
    if (!items || items.length === 0) {
      ordersCreated.inc({ status: "validation_error" });
      throw Object.assign(new Error("Items are required"), { status: 400 });
    }

    // 注文処理（シミュレーション）
    const order = {
      id: "ord-" + Date.now(),
      userId,
      items,
      total: items.reduce((sum: number, i: any) => sum + i.price, 0),
      createdAt: new Date().toISOString(),
    };

    logger.info("Order created successfully", {
      correlationId: req.correlationId,
      orderId: order.id,
      userId,
      total: order.total,
      itemCount: items.length,
    });

    ordersCreated.inc({ status: "success" });
    res.status(201).json(order);
  } catch (error: any) {
    logger.error("Failed to create order", {
      correlationId: req.correlationId,
      userId,
      error: error.message,
    });

    if (!error.status) {
      ordersCreated.inc({ status: "error" });
    }
    throw error;
  }
});

// 7. Sentryエラーハンドラー（ルーティングの後）
setupSentryErrorHandler(app);

// 8. カスタムエラーハンドラー
app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 500;
  res.status(status).json({
    error: status < 500 ? err.message : "Internal server error",
    correlationId: req.correlationId,
  });
});

// サーバー起動
app.listen(PORT, () => {
  logger.info("Server started", { port: PORT });
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Winston で構造化ログを実装し、Correlation ID でリクエストを追跡する</li>
          <li>Sentry で未処理のエラーを自動キャプチャし、コンテキスト情報を付与する</li>
          <li>Prometheus でカスタムメトリクス（リクエスト数、レイテンシー、ビジネスメトリクス）を記録する</li>
          <li>ミドルウェアの配置順序に注意する（Sentry → Correlation ID → ログ → メトリクス）</li>
          <li>ヘルスチェックエンドポイントでサービスの生存確認を行う</li>
          <li>エラーハンドリングで機密情報をレスポンスに含めない</li>
        </ul>
        <div className="mt-4 p-3 rounded-lg bg-teal-500/10 border border-teal-500/30">
          <p className="text-sm text-teal-400 font-semibold mb-1">次のステップ</p>
          <p className="text-sm text-gray-300">
            この演習を発展させて、Grafanaダッシュボードの構築、アラートルールの設定、
            OpenTelemetryによるトレーシングの導入にも挑戦してみましょう。
          </p>
        </div>
      </section>

      <LessonCompleteButton categoryId="monitoring" lessonId="monitoring-exercise" color="teal" />
      <LessonNav lessons={MONITORING_LESSONS} currentId="monitoring-exercise" basePath="/learn/monitoring" color="teal" />
    </div>
  );
}
