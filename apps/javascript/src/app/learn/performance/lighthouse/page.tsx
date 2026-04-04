import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PERFORMANCE_LESSONS } from "@/lib/lessons-data";

export default function LighthouseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 mb-4">パフォーマンス レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Lighthouse</h1>
        <p className="text-gray-400">パフォーマンス監査の実行方法、スコアの読み方、DevToolsでの詳細分析を学ぼう</p>
      </div>

      {/* Lighthouseとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Lighthouseとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Lighthouse</strong>はGoogleが開発したオープンソースの自動監査ツールです。
          パフォーマンス、アクセシビリティ、SEO、ベストプラクティスなど
          複数の観点からWebページを評価し、スコアと改善提案を提供します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`Lighthouse の実行方法:

1. Chrome DevTools
   - F12 でDevToolsを開く
   - 「Lighthouse」タブを選択
   - 「Analyze page load」をクリック

2. コマンドライン（CLI）
   npm install -g lighthouse
   lighthouse https://example.com --output html --output-path report.html

3. Node.js API
   import lighthouse from 'lighthouse';
   import * as chromeLauncher from 'chrome-launcher';

   const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
   const result = await lighthouse('https://example.com', {
     port: chrome.port,
     output: 'json',
   });
   console.log(result.lhr.categories.performance.score * 100);
   await chrome.kill();

4. PageSpeed Insights（オンライン）
   https://pagespeed.web.dev/
   → ラボデータ + フィールドデータの両方を確認可能`}</code>
          </pre>
      </section>

      {/* スコアの理解 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スコアの読み方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Lighthouseは5つのカテゴリで0〜100のスコアを算出します。
          各カテゴリのスコアは<strong className="text-green-400">重み付き平均</strong>で計算されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`■ 5つのカテゴリ
  Performance:     読み込み速度・応答性・視覚的安定性
  Accessibility:   アクセシビリティ（WCAG準拠）
  Best Practices:  セキュリティ、モダンAPI使用
  SEO:             検索エンジン最適化
  PWA:             Progressive Web App 対応

■ スコアの色分け
  🟢 90-100:  良好（Green）
  🟠 50-89:   改善が必要（Orange）
  🔴 0-49:    不良（Red）

■ Performance スコアの内訳（重み）
  LCP:              25%   最大コンテンツの表示時間
  TBT:              30%   Total Blocking Time（メインスレッド占有）
  CLS:              25%   レイアウトシフト
  FCP:              10%   First Contentful Paint
  Speed Index:      10%   コンテンツ表示速度

※ TBT はラボ指標で、フィールドの INP に相当`}</code>
          </pre>
      </section>

      {/* Performance タブ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Chrome DevTools Performance タブ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          より詳細な分析には<strong className="text-green-400">Performance タブ</strong>を使います。
          タイムラインの記録と解析で、ボトルネックを正確に特定できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`Performance タブの使い方:

1. 記録を開始
   - DevTools → Performance タブ
   - ⚙️ で CPU 4x slowdown、Fast 3G をシミュレーション
   - 🔴 Record ボタン → ページを操作 → Stop

2. タイムラインの読み方
   ┌─────────────────────────────────────────────┐
   │ Network    ████░░░░████░░████               │ ← リソース取得
   │ Main       ██JS██░░██JS██░░░░               │ ← メインスレッド
   │ Compositor ░░░░░░██Paint██░░░░              │ ← 描画
   │ GPU        ░░░░░░░░░░██GPU██░               │ ← GPU処理
   └─────────────────────────────────────────────┘

   赤い三角マーク = Long Task（50ms以上のタスク）
   → これがINP悪化の原因

3. 主要なセクション
   - Summary: CPU時間の内訳（Scripting, Rendering, Painting）
   - Bottom-Up: 関数ごとの実行時間
   - Call Tree: コールスタック
   - Event Log: イベントの時系列`}</code>
          </pre>
      </section>

      {/* ウォーターフォールチャート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ウォーターフォールチャートの解釈</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Network タブ</strong>のウォーターフォールは
          各リソースの取得タイミングと所要時間を可視化します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`ウォーターフォールの色分け:

  ■ DNS Lookup      （緑）: ドメイン名解決
  ■ Initial Connection（オレンジ）: TCP接続確立
  ■ SSL              （紫）: TLS ハンドシェイク
  ■ Waiting (TTFB)   （緑）: サーバー応答待ち
  ■ Content Download （青）: コンテンツダウンロード

よくあるボトルネックと対策:

1. TTFB が長い
   原因: サーバー処理が遅い
   対策: キャッシュ、CDN、サーバーサイド最適化

2. ダウンロード時間が長い
   原因: リソースが大きい
   対策: 圧縮（gzip/Brotli）、画像最適化

3. リクエストが直列になっている
   原因: リソース間の依存関係
   対策: preload、prefetch、HTTP/2

4. 不要なリクエストが多い
   原因: 未使用のCSS/JSの読み込み
   対策: tree shaking、コード分割`}</code>
          </pre>
      </section>

      {/* Lighthouse CI */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Lighthouse CI で自動化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Lighthouse CI</strong>をCI/CDパイプラインに組み込むことで、
          デプロイ前にパフォーマンスの劣化を自動検出できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// インストール
npm install -D @lhci/cli

// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/about'],
      numberOfRuns: 3,    // 3回実行して中央値を採用
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',  // レポートをアップロード
    },
  },
};

// GitHub Actions での実行例
// .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - run: npm start &
      - run: npx lhci autorun`}</code>
          </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>LighthouseはDevTools、CLI、Node.js API、PageSpeed Insightsで実行可能</li>
          <li>Performance スコアはLCP(25%)、TBT(30%)、CLS(25%)、FCP(10%)、SI(10%)で構成</li>
          <li>Chrome DevTools Performance タブでタイムラインを詳細にプロファイリングできる</li>
          <li>ウォーターフォールチャートでネットワークのボトルネックを特定する</li>
          <li>Lighthouse CIをCI/CDに組み込んでパフォーマンス劣化を自動検出する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="performance" lessonId="lighthouse" color="green" />
      <LessonNav lessons={PERFORMANCE_LESSONS} currentId="lighthouse" basePath="/learn/performance" color="green" />
    </div>
  );
}
