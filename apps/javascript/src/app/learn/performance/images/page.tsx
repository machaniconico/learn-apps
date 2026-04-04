import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PERFORMANCE_LESSONS } from "@/lib/lessons-data";

export default function ImagesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 mb-4">パフォーマンス レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">画像・アセット最適化</h1>
        <p className="text-gray-400">WebP/AVIF、レスポンシブ画像、lazy loading、フォント最適化を学ぼう</p>
      </div>

      {/* 画像フォーマット */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">モダンな画像フォーマット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          画像はWebページの転送量の大部分を占めます。
          <strong className="text-green-400">WebP</strong>や<strong className="text-green-400">AVIF</strong>などの
          モダンフォーマットを使うことで、画質を維持しつつファイルサイズを大幅に削減できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`■ フォーマット比較（同じ画質での圧縮率目安）

  フォーマット    サイズ    ブラウザ対応    用途
  ─────────────────────────────────────────────
  JPEG           100%     全ブラウザ      写真
  PNG            120%     全ブラウザ      透過画像、スクリーンショット
  WebP           70%      95%以上         写真・イラスト全般
  AVIF           50%      85%以上         写真（最高圧縮率）
  SVG            -        全ブラウザ      アイコン、ロゴ（ベクター）

■ <picture> 要素でフォールバック対応

<picture>
  <!-- AVIF対応ブラウザ向け -->
  <source srcset="/hero.avif" type="image/avif" />
  <!-- WebP対応ブラウザ向け -->
  <source srcset="/hero.webp" type="image/webp" />
  <!-- フォールバック -->
  <img src="/hero.jpg" alt="ヒーロー画像" />
</picture>`}</code>
          </pre>
      </section>

      {/* レスポンシブ画像 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">レスポンシブ画像（srcset）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">srcset</strong>を使うと、デバイスの画面サイズやピクセル密度に応じて
          適切なサイズの画像を配信できます。モバイルに巨大な画像を送るのを防ぎます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`<!-- 画面幅に応じた画像切り替え -->
<img
  srcset="
    /photo-400w.webp 400w,
    /photo-800w.webp 800w,
    /photo-1200w.webp 1200w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="/photo-800w.webp"
  alt="写真"
  width="800"
  height="600"
/>

<!-- ピクセル密度に応じた切り替え（Retinaディスプレイ対応）-->
<img
  srcset="
    /logo.png 1x,
    /logo@2x.png 2x,
    /logo@3x.png 3x
  "
  src="/logo.png"
  alt="ロゴ"
  width="200"
  height="50"
/>

<!-- 重要: width と height を必ず指定する -->
<!-- → ブラウザが事前にスペースを確保し、CLS を防げる -->`}</code>
          </pre>
      </section>

      {/* Lazy Loading */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Lazy Loading</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">Lazy Loading</strong>は、ビューポートに近づいたときに初めて
          画像を読み込む手法です。初期読み込みのデータ量を大幅に削減できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`<!-- ネイティブ Lazy Loading（推奨） -->
<img
  src="/photo.webp"
  alt="写真"
  loading="lazy"
  width="800"
  height="600"
/>

<!-- 注意: ファーストビューの画像には loading="lazy" を付けない -->
<!-- LCP 要素が遅延読み込みされるとスコアが悪化する -->
<img
  src="/hero.webp"
  alt="ヒーロー画像"
  loading="eager"
  fetchpriority="high"
  width="1200"
  height="600"
/>

<!-- iframe の Lazy Loading -->
<iframe
  src="https://www.youtube.com/embed/..."
  loading="lazy"
  title="動画"
></iframe>

<!-- Intersection Observer による手動実装 -->
<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { rootMargin: '200px' });  // 200px手前で読み込み開始

document.querySelectorAll('img[data-src]').forEach((img) => {
  observer.observe(img);
});
</script>`}</code>
          </pre>
      </section>

      {/* next/image */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Next.js の Image コンポーネント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsの<strong className="text-green-400">{`<Image>`}</strong>コンポーネントは、
          画像最適化のベストプラクティスを自動で適用してくれます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import Image from 'next/image';

// 基本的な使い方
export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="ヒーロー画像"
      width={1200}
      height={600}
      priority              // LCP要素にはpriorityを指定
      placeholder="blur"    // ぼかしプレースホルダー
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}

// fill モード（親要素いっぱいに広がる）
export function BackgroundImage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Image
        src="/bg.jpg"
        alt="背景"
        fill
        style={{ objectFit: 'cover' }}
        sizes="100vw"
      />
    </div>
  );
}

// next/image が自動で行うこと:
// ✅ WebP/AVIF への自動変換
// ✅ リクエストに応じたリサイズ
// ✅ lazy loading（デフォルト有効）
// ✅ CLS 防止（width/height の必須指定）
// ✅ srcset の自動生成`}</code>
          </pre>
      </section>

      {/* フォント最適化とTree Shaking */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">フォント最適化とTree Shaking</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Webフォントとバンドルサイズの最適化も重要な<strong className="text-green-400">パフォーマンス改善ポイント</strong>です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`■ フォント最適化

// Next.js の next/font（推奨）
import { Inter, Noto_Sans_JP } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',          // FOIT を防ぐ
  preload: true,
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],   // 必要なウェイトのみ
  display: 'swap',
});

// CSS での font-display 設定
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont.woff2') format('woff2');
  font-display: swap;       /* テキストを先に表示 */
  unicode-range: U+0000-00FF; /* 必要な文字だけ読み込み */
}

■ Tree Shaking（未使用コードの除去）

// ❌ ライブラリ全体をインポート（バンドルサイズ大）
import _ from 'lodash';
_.debounce(fn, 300);

// ✅ 必要な関数だけインポート（Tree Shaking 対応）
import debounce from 'lodash/debounce';
debounce(fn, 300);

// ❌ アイコンライブラリ全体（数百KB）
import { FaHome } from 'react-icons/fa';

// ✅ 個別インポート
import { FaHome } from 'react-icons/fa';
// → バンドラーが未使用アイコンを除去

// バンドル分析ツール
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});
// 実行: ANALYZE=true npm run build`}</code>
          </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>WebP/AVIFを使い、pictureタグでフォールバックを提供する</li>
          <li>srcset と sizes で画面サイズに合った画像を配信する</li>
          <li>ファーストビュー外の画像には loading=&quot;lazy&quot; を適用する</li>
          <li>Next.jsのImageコンポーネントが多くの最適化を自動で行う</li>
          <li>font-display: swap でフォント読み込み中もテキストを表示する</li>
          <li>Tree Shakingを活用し、バンドルサイズを最小限に保つ</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="performance" lessonId="images" color="green" />
      <LessonNav lessons={PERFORMANCE_LESSONS} currentId="images" basePath="/learn/performance" color="green" />
    </div>
  );
}
