import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { MONITORING_LESSONS } from "@/lib/lessons-data";

export default function MonitoringBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-400 mb-4">モニタリング レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モニタリングの基本</h1>
        <p className="text-gray-400">なぜ監視するのか？可観測性の3本柱とSLA/SLO/SLIを学ぼう</p>
      </div>

      {/* なぜモニタリングが必要か */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">なぜモニタリングが必要なのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アプリケーションをデプロイしたら終わりではありません。本番環境では予期しないエラー、
          パフォーマンス劣化、リソース枯渇など様々な問題が発生します。
          <strong className="text-teal-400">モニタリング</strong>なしでは、ユーザーからの苦情で初めて障害に気づくことになります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`モニタリングがない場合:
  ユーザー「サイトが表示されません...」
  開発者「え？いつから？」  ← 障害発生から数時間経過

モニタリングがある場合:
  アラート「エラー率が5%を超えました」  ← 障害発生から30秒
  開発者「すぐ確認します」
  ダッシュボード → ログ確認 → 原因特定 → 修正`}</code>
        </pre>
      </section>

      {/* Observability 3本柱 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">可観測性（Observability）の3本柱</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">可観測性</strong>とは、システムの外部出力からシステム内部の状態を
          理解できる度合いのことです。以下の3つの柱（Three Pillars）で構成されます。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">1. Logs（ログ）</h3>
            <p className="text-sm text-gray-400 mb-2">個別のイベントを時系列で記録する。「何が起きたか」を詳細に追跡できる。</p>
            <pre className="bg-gray-950 rounded-lg p-3 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`// ログの例
{"timestamp":"2024-01-15T10:30:00Z","level":"error",
 "message":"Database connection failed",
 "service":"api","host":"prod-01"}`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">2. Metrics（メトリクス）</h3>
            <p className="text-sm text-gray-400 mb-2">数値データを集約して時系列で記録する。「システムの状態」を俯瞰できる。</p>
            <pre className="bg-gray-950 rounded-lg p-3 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`// メトリクスの例
http_requests_total{method="GET", status="200"} 15234
http_request_duration_seconds{quantile="0.99"} 0.45
node_memory_usage_bytes 1073741824`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">3. Traces（トレース）</h3>
            <p className="text-sm text-gray-400 mb-2">リクエストがシステム内を通過する経路を追跡する。分散システムでのボトルネック特定に有効。</p>
            <pre className="bg-gray-950 rounded-lg p-3 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`// トレースの例（1つのリクエストの流れ）
TraceID: abc-123
├─ API Gateway     [2ms]
├─ Auth Service    [15ms]
├─ User Service    [45ms]  ← ボトルネック!
│  └─ Database     [40ms]
└─ Response        [total: 62ms]`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* SLA / SLO / SLI */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">SLA / SLO / SLI</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          サービスの信頼性を定量的に管理するための3つの概念です。
          Google SREチームが提唱し、業界標準となっています。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">SLI（Service Level Indicator）</h3>
            <p className="text-sm text-gray-400">サービスの品質を測定する具体的な指標。例：リクエスト成功率、レスポンスタイム。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">SLO（Service Level Objective）</h3>
            <p className="text-sm text-gray-400">SLIに対する目標値。例：「99.9%のリクエストが200ms以内に応答する」。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-teal-400 mb-1">SLA（Service Level Agreement）</h3>
            <p className="text-sm text-gray-400">顧客との契約。SLOを下回った場合の補償を含む。例：「稼働率99.9%未満なら返金」。</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mt-4">
          <code className="text-gray-300 font-mono">{`// SLO の具体例
可用性:
  SLI = 成功したリクエスト数 / 全リクエスト数
  SLO = 99.9%（月間ダウンタイム約43分まで許容）

レイテンシー:
  SLI = 200ms以内に応答したリクエストの割合
  SLO = 99パーセンタイルで500ms以内

エラーバジェット:
  100% - 99.9% = 0.1%（月間約43分のダウンタイムが許容される）
  エラーバジェットが残っている → 新機能リリースOK
  エラーバジェットが枯渇 → 信頼性改善を優先`}</code>
        </pre>
      </section>

      {/* アラート疲れ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">アラート疲れ（Alert Fatigue）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アラートが多すぎると、重要な通知を見逃してしまいます。
          <strong className="text-teal-400">アラート疲れ</strong>を防ぐために、適切なアラート設計が重要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`アラート設計のベストプラクティス:

1. アクション可能なアラートだけを送る
   NG: CPU使用率が50%を超えた（対応不要なことが多い）
   OK: エラー率が5%を超えた（調査が必要）

2. 重要度でレベル分けする
   Critical: サービス停止 → 即座に対応（PagerDuty）
   Warning:  性能劣化 → 営業時間内に対応（Slack）
   Info:     参考情報 → ダッシュボードで確認

3. アラートにランブック（対応手順）を添付する
   「このアラートが来たら、まず○○を確認し、△△を実行する」

4. 定期的にアラートを見直す
   - 1ヶ月間一度も対応しなかったアラートは削除を検討
   - 同じアラートが頻発する場合は根本原因を修正`}</code>
        </pre>
      </section>

      {/* モニタリングツールの全体像 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">モニタリングツールの全体像</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          モニタリングには様々なツールがあります。目的に応じて使い分けましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`ツールカテゴリと代表的なサービス:

ログ管理:
  - ELK Stack (Elasticsearch + Logstash + Kibana)
  - Datadog Logs
  - CloudWatch Logs (AWS)

エラー監視:
  - Sentry        ← このコースで学ぶ
  - Bugsnag
  - Rollbar

メトリクス・APM:
  - Prometheus + Grafana   ← このコースで学ぶ
  - Datadog
  - New Relic

トレーシング:
  - Jaeger
  - Zipkin
  - OpenTelemetry  ← 業界標準になりつつある

アラート:
  - PagerDuty
  - OpsGenie
  - Slack Webhook`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>モニタリングにより障害を早期に検知し、ユーザー影響を最小化できる</li>
          <li>可観測性の3本柱はLogs（ログ）、Metrics（メトリクス）、Traces（トレース）</li>
          <li>SLI/SLO/SLAでサービスの信頼性を定量的に管理する</li>
          <li>エラーバジェットでリリース速度と信頼性のバランスを取る</li>
          <li>アラート疲れを防ぐために、アクション可能なアラートだけを設定する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="monitoring" lessonId="basics" color="teal" />
      <LessonNav lessons={MONITORING_LESSONS} currentId="basics" basePath="/learn/monitoring" color="teal" />
    </div>
  );
}
