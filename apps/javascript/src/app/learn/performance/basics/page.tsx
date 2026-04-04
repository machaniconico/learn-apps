import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PERFORMANCE_LESSONS } from "@/lib/lessons-data";

export default function PerformanceBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 mb-4">パフォーマンス レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パフォーマンスの基本</h1>
        <p className="text-gray-400">Core Web Vitals、計測の重要性、パフォーマンスバジェットを理解しよう</p>
      </div>

      {/* なぜパフォーマンスが重要か */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">なぜパフォーマンスが重要なのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Webパフォーマンスは<strong className="text-green-400">ユーザー体験</strong>、
          <strong className="text-green-400">SEO</strong>、
          <strong className="text-green-400">ビジネス成果</strong>に直結します。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-1">ユーザー体験への影響</h3>
            <p className="text-sm text-gray-400">ページ読み込みが3秒以上かかると、53%のモバイルユーザーが離脱する（Google調査）。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-1">SEOへの影響</h3>
            <p className="text-sm text-gray-400">GoogleはCore Web Vitalsをランキング要因として使用。遅いサイトは検索順位が下がる。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-1">ビジネスへの影響</h3>
            <p className="text-sm text-gray-400">Amazonは100ms遅延するごとに売上が1%減少。Pinterestは待ち時間40%短縮でサインアップ15%増加。</p>
          </div>
        </div>
      </section>

      {/* Core Web Vitals */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Core Web Vitals</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Core Web Vitals</strong>はGoogleが定義する、
          ユーザー体験を測定するための3つの重要な指標です。
        </p>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">LCP（Largest Contentful Paint）</h3>
            <p className="text-sm text-gray-400 mb-2">ページ内の最大コンテンツが表示されるまでの時間。ユーザーが「読み込まれた」と感じるタイミング。</p>
            <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`LCP の目標値:
  良好:   2.5秒以下
  改善必要: 2.5秒 〜 4.0秒
  不良:   4.0秒以上

LCP に影響する要素:
  - <img> 要素
  - <video> のポスター画像
  - background-image を持つ要素
  - テキストブロック（<h1>, <p> など）`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">FID / INP（First Input Delay / Interaction to Next Paint）</h3>
            <p className="text-sm text-gray-400 mb-2">ユーザーが最初に操作してから、ブラウザが応答するまでの遅延。2024年3月からINPがFIDに代わる指標になりました。</p>
            <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`INP（Interaction to Next Paint）の目標値:
  良好:   200ms以下
  改善必要: 200ms 〜 500ms
  不良:   500ms以上

INP が悪化する原因:
  - 重い JavaScript の実行
  - メインスレッドのブロック
  - 大量のDOM操作
  - 長いイベントハンドラ`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">CLS（Cumulative Layout Shift）</h3>
            <p className="text-sm text-gray-400 mb-2">ページのレイアウトがどれだけ予期せずずれるかの指標。読み込み中にボタンが動くなどの問題を検出。</p>
            <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`CLS の目標値:
  良好:   0.1以下
  改善必要: 0.1 〜 0.25
  不良:   0.25以上

CLS が悪化する原因:
  - サイズ未指定の画像・動画
  - 動的に挿入されるコンテンツ（広告など）
  - Web フォントの読み込み（FOIT / FOUT）
  - DOM を動的に変更する処理`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 計測ツールの概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">主要な計測ツール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パフォーマンスを改善するには、まず<strong className="text-green-400">正確に計測する</strong>ことが重要です。
          代表的なツールを紹介します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`■ ラボデータ（開発者ツール）
  - Lighthouse: Chrome DevTools に内蔵。スコア形式で総合評価
  - WebPageTest: 様々な条件でのテストが可能（回線速度、地域）
  - Chrome DevTools Performance タブ: 詳細なプロファイリング

■ フィールドデータ（実ユーザー計測）
  - Google Search Console: Core Web Vitals の実測レポート
  - Chrome UX Report (CrUX): 実ユーザーデータの集計
  - web-vitals ライブラリ: 自サイトで RUM を実装

■ 使い分けのポイント
  - 開発中 → Lighthouse で素早くチェック
  - 詳細分析 → Performance タブでプロファイリング
  - 本番 → フィールドデータで実ユーザーの体験を監視`}</code>
        </pre>
      </section>

      {/* web-vitals ライブラリ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">web-vitals ライブラリで計測する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Googleが提供する <strong className="text-green-400">web-vitals</strong> ライブラリを使うと、
          実ユーザーのCore Web Vitalsを簡単に計測できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// web-vitals ライブラリのインストール
npm install web-vitals

// 計測コード
import { onLCP, onINP, onCLS } from 'web-vitals';

// LCP を計測
onLCP((metric) => {
  console.log('LCP:', metric.value, 'ms');
  // 分析サービスに送信
  sendToAnalytics({ name: 'LCP', value: metric.value });
});

// INP を計測
onINP((metric) => {
  console.log('INP:', metric.value, 'ms');
  sendToAnalytics({ name: 'INP', value: metric.value });
});

// CLS を計測
onCLS((metric) => {
  console.log('CLS:', metric.value);
  sendToAnalytics({ name: 'CLS', value: metric.value });
});

// 分析サービスへの送信例
function sendToAnalytics(data: { name: string; value: number }) {
  // Google Analytics, Datadog, 自前APIなどに送信
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}`}</code>
        </pre>
      </section>

      {/* パフォーマンスバジェット */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">パフォーマンスバジェット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">パフォーマンスバジェット</strong>とは、
          サイトのパフォーマンスに設ける「予算」です。この上限を超えないようにチームで管理します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// パフォーマンスバジェットの例
{
  "budgets": [
    {
      "resourceType": "script",
      "budget": 300,        // JS は 300KB まで
      "unit": "kb"
    },
    {
      "resourceType": "image",
      "budget": 500,        // 画像は 500KB まで
      "unit": "kb"
    },
    {
      "resourceType": "total",
      "budget": 1500,       // ページ全体で 1.5MB まで
      "unit": "kb"
    },
    {
      "metric": "lcp",
      "budget": 2500,       // LCP は 2.5秒以内
      "unit": "ms"
    },
    {
      "metric": "cls",
      "budget": 0.1         // CLS は 0.1 以下
    }
  ]
}

// Lighthouse CI でバジェットを自動チェック
// lighthouserc.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-byte-weight': ['warn', { maxNumericValue: 1500000 }],
      },
    },
  },
};`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>パフォーマンスはUX、SEO、ビジネス成果に直結する重要な要素</li>
          <li>Core Web Vitals（LCP、INP、CLS）の3指標を理解する</li>
          <li>ラボデータ（Lighthouse）とフィールドデータ（web-vitals）を使い分ける</li>
          <li>web-vitalsライブラリで実ユーザーの体験を計測できる</li>
          <li>パフォーマンスバジェットを設定してチームで品質を維持する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="performance" lessonId="basics" color="green" />
      <LessonNav lessons={PERFORMANCE_LESSONS} currentId="basics" basePath="/learn/performance" color="green" />
    </div>
  );
}
