import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { MONITORING_LESSONS } from "@/lib/lessons-data";

export default function MetricsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">モニタリング レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メトリクスとダッシュボード</h1>
        <p className="text-gray-400">Prometheus、Grafana、Datadogによるメトリクス収集とAPMを学ぼう</p>
      </div>

      {/* カスタムメトリクス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">カスタムメトリクスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">メトリクス</strong>とは、システムの状態を数値で表した指標です。
          CPUやメモリなどのインフラメトリクスに加えて、アプリケーション固有の
          <strong className="text-teal-400">カスタムメトリクス</strong>を定義することで、
          ビジネスの健全性も監視できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`メトリクスの4つのタイプ:

1. Counter（カウンター）
   - 単調増加する値。リセットされない。
   - 例: リクエスト総数、エラー総数、注文総数

2. Gauge（ゲージ）
   - 上下する値。現在の状態を表す。
   - 例: アクティブ接続数、キューの長さ、メモリ使用量

3. Histogram（ヒストグラム）
   - 値の分布を記録。パーセンタイル計算に使う。
   - 例: リクエストレイテンシー、レスポンスサイズ

4. Summary（サマリー）
   - ヒストグラムに似ているが、クライアント側で集計。
   - 例: リクエスト所要時間の中央値/99パーセンタイル`}</code>
        </pre>
      </section>

      {/* Prometheusの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Prometheus の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Prometheus</strong>は、オープンソースのメトリクス収集・保存・クエリシステムです。
          Pull型でメトリクスを収集し、PromQLというクエリ言語で分析できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install prom-client

import client from "prom-client";
import express from "express";

const app = express();

// デフォルトメトリクス（CPU、メモリ等）を収集
client.collectDefaultMetrics();

// カスタムメトリクスの定義
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "path", "status"],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "path"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
});

const activeConnections = new client.Gauge({
  name: "active_connections",
  help: "Number of active connections",
});

// ミドルウェアでメトリクスを記録
app.use((req, res, next) => {
  activeConnections.inc();
  const end = httpRequestDuration.startTimer({
    method: req.method,
    path: req.route?.path || req.path,
  });

  res.on("finish", () => {
    activeConnections.dec();
    httpRequestsTotal.inc({
      method: req.method,
      path: req.route?.path || req.path,
      status: res.statusCode,
    });
    end();
  });

  next();
});

// Prometheusがスクレイプするエンドポイント
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});`}</code>
        </pre>
      </section>

      {/* PromQL */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">PromQL クエリの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">PromQL</strong>はPrometheusのクエリ言語です。
          メトリクスの集計やフィルタリングに使います。Grafanaのダッシュボードでも使用します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# 基本的なクエリ

# リクエスト数のレート（1分間あたり）
rate(http_requests_total[5m])

# ステータスコード別のリクエスト数
sum by (status) (rate(http_requests_total[5m]))

# エラー率（4xx + 5xx）
sum(rate(http_requests_total{status=~"[45].."}[5m]))
/ sum(rate(http_requests_total[5m])) * 100

# 99パーセンタイルのレイテンシー
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)

# 平均レスポンスタイム
rate(http_request_duration_seconds_sum[5m])
/ rate(http_request_duration_seconds_count[5m])

# アクティブ接続数
active_connections`}</code>
        </pre>
      </section>

      {/* Grafanaダッシュボード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Grafana ダッシュボード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Grafana</strong>は、Prometheusなどのデータソースから
          メトリクスを可視化するダッシュボードツールです。リアルタイムのグラフやアラートを作成できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`Grafana ダッシュボード設計のベストプラクティス:

1. RED メソッド（サービスレベル）
   - Rate:     リクエスト数/秒
   - Errors:   エラー率
   - Duration: レスポンスタイム

2. USE メソッド（インフラレベル）
   - Utilization: リソース使用率（CPU、メモリ）
   - Saturation:  キュー長、待ち状態
   - Errors:      エラー数

推奨ダッシュボード構成:
┌─────────────────────────────────────┐
│  [概要] リクエスト数 / エラー率 / P99  │
├──────────────┬──────────────────────┤
│ リクエスト数   │ レスポンスタイム      │
│ (時系列グラフ) │ (時系列グラフ)        │
├──────────────┼──────────────────────┤
│ エラー率      │ ステータスコード分布    │
│ (時系列グラフ) │ (円グラフ)            │
├──────────────┴──────────────────────┤
│ CPU / メモリ / ディスク使用率         │
└─────────────────────────────────────┘`}</code>
        </pre>
      </section>

      {/* Datadog と APM */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Datadog と APM</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">Datadog</strong>は、メトリクス、ログ、トレースを統合管理できる
          フルスタック監視プラットフォームです。
          <strong className="text-teal-400">APM（Application Performance Monitoring）</strong>では、
          リクエスト単位でのパフォーマンス分析が可能です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install dd-trace

// dd-traceの初期化（アプリのエントリポイントの最初に）
import tracer from "dd-trace";

tracer.init({
  service: "my-api",
  env: process.env.NODE_ENV,
  version: "1.2.3",
  logInjection: true,  // ログにトレースIDを自動注入
});

// カスタムメトリクスの送信
import { StatsD } from "hot-shots";

const statsd = new StatsD({
  host: "localhost",
  port: 8125,
  prefix: "myapp.",
});

// カウンター
statsd.increment("orders.created", 1, { region: "jp" });

// ゲージ
statsd.gauge("queue.length", 42);

// ヒストグラム（レイテンシー計測）
const start = Date.now();
await processOrder(order);
statsd.histogram("order.processing_time", Date.now() - start);

// カスタムスパン（処理の詳細計測）
const span = tracer.startSpan("payment.process");
span.setTag("payment.method", "credit_card");
try {
  await processPayment(order);
  span.setTag("payment.success", true);
} catch (error) {
  span.setTag("error", true);
  span.setTag("error.message", error.message);
  throw error;
} finally {
  span.finish();
}`}</code>
        </pre>
      </section>

      {/* リクエストレイテンシーの追跡 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">リクエストレイテンシーの追跡</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パフォーマンス監視で最も重要な指標の1つが<strong className="text-teal-400">レイテンシー</strong>です。
          平均値だけでなく、パーセンタイル（P50、P95、P99）で計測しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// なぜ平均値だけではダメなのか？
//
// 100リクエスト:
//   98件 → 50ms
//    2件 → 5000ms（タイムアウト寸前）
//   平均 → 149ms（問題なさそうに見える！）
//   P99  → 5000ms（2%のユーザーが5秒待っている！）

// Express ミドルウェアでレイテンシーを計測
import { Histogram } from "prom-client";

const httpDuration = new Histogram({
  name: "http_request_duration_ms",
  help: "HTTP request duration in milliseconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [10, 50, 100, 200, 500, 1000, 2000, 5000],
});

app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    httpDuration.observe(
      {
        method: req.method,
        route: req.route?.path || "unknown",
        status_code: res.statusCode,
      },
      durationMs
    );
  });

  next();
});

// Grafana/PromQLでの可視化クエリ
// P50: histogram_quantile(0.5, rate(http_request_duration_ms_bucket[5m]))
// P95: histogram_quantile(0.95, rate(http_request_duration_ms_bucket[5m]))
// P99: histogram_quantile(0.99, rate(http_request_duration_ms_bucket[5m]))`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>メトリクスには Counter、Gauge、Histogram、Summary の4タイプがある</li>
          <li>Prometheusでメトリクスを収集し、PromQLで集計・分析する</li>
          <li>GrafanaでREDメソッド/USEメソッドに基づくダッシュボードを作成する</li>
          <li>Datadogはメトリクス・ログ・トレースを統合的に管理できる</li>
          <li>APMでリクエスト単位のパフォーマンスをトレースする</li>
          <li>レイテンシーは平均値でなくパーセンタイル（P50/P95/P99）で計測する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="monitoring" lessonId="metrics" color="teal" />
      <LessonNav lessons={MONITORING_LESSONS} currentId="metrics" basePath="/learn/monitoring" color="teal" />
    </div>
  );
}
