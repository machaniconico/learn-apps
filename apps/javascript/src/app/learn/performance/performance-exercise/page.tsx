import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PERFORMANCE_LESSONS } from "@/lib/lessons-data";

export default function PerformanceExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 mb-4">パフォーマンス レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パフォーマンス総合演習</h1>
        <p className="text-gray-400">遅いページを分析し、学んだテクニックを使って高速化しよう</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習：遅いECサイトを最適化せよ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          以下の<strong className="text-green-400">パフォーマンスに問題のあるページ</strong>を分析し、
          段階的に改善していきましょう。まず問題点を特定し、それぞれに適切な最適化を適用します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ❌ 最適化前: 問題だらけのECサイトトップページ
import _ from 'lodash';                    // 問題1: lodash 全体をインポート
import moment from 'moment';               // 問題2: 重いライブラリ
import { AllIcons } from 'react-icons';    // 問題3: アイコン全体
import HeavyChart from './HeavyChart';     // 問題4: 不要な初期読み込み

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  // 問題5: 毎レンダリングでフィルタリング
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // 問題6: 入力のたびにAPI呼び出し
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    fetch(\`/api/search?q=\${e.target.value}\`);
  };

  return (
    <div>
      {/* 問題7: 巨大な未最適化画像 */}
      <img src="/hero-4000x2000.png" />

      {/* 問題8: width/height 未指定（CLS発生） */}
      <img src="/banner.jpg" />

      <input onChange={handleSearch} />

      <HeavyChart data={products} />

      {/* 問題9: 10,000件を全部レンダリング */}
      {filtered.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={() => addToCart(product)}  // 問題10: 毎回新しい関数
          style={{ margin: 8 }}             // 問題11: 毎回新しいオブジェクト
        />
      ))}
    </div>
  );
}`}</code>
          </pre>
      </section>

      {/* Step 1: ボトルネックの特定 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 1: ボトルネックを特定する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まずLighthouseと DevTools を使って<strong className="text-green-400">問題を数値で把握</strong>します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`■ Lighthouse 結果（最適化前）

  Performance:   32 🔴
  LCP:           6.8s  → 目標 2.5s以下
  TBT:           1200ms → 目標 200ms以下
  CLS:           0.45  → 目標 0.1以下
  FCP:           3.2s
  Speed Index:   5.1s

■ 問題の分類

  バンドルサイズ:
    - lodash 全体 (72KB gzip)
    - moment.js (67KB gzip)
    - react-icons 全体 (200KB+)
    - HeavyChart 初期バンドルに含まれる

  画像:
    - hero画像: 4000x2000px, PNG, 2.3MB → LCP悪化
    - banner画像: width/height未指定 → CLS発生

  レンダリング:
    - 10,000件のリストを全件DOM化
    - フィルタリングが毎レンダリングで実行
    - 子コンポーネントへの関数/オブジェクト参照が毎回新規

  ネットワーク:
    - 入力のたびにAPI呼び出し（debounce なし）`}</code>
          </pre>
      </section>

      {/* Step 2: バンドルサイズ最適化 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 2: バンドルサイズを削減する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          不要なコードを減らし、必要なタイミングで必要なコードだけ読み込むようにします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ✅ 修正1: lodash → 個別インポート
// Before: import _ from 'lodash';         // 72KB
// After:
import debounce from 'lodash/debounce';    // 1KB

// ✅ 修正2: moment → dayjs に置換
// Before: import moment from 'moment';     // 67KB
// After:
import dayjs from 'dayjs';                 // 2KB
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
// moment().format('YYYY-MM-DD') → dayjs().format('YYYY-MM-DD')

// ✅ 修正3: アイコンの個別インポート
// Before: import { AllIcons } from 'react-icons';  // 200KB+
// After:
import { FaShoppingCart } from 'react-icons/fa';    // 数KB
import { FiSearch } from 'react-icons/fi';

// ✅ 修正4: HeavyChart を dynamic import
// Before: import HeavyChart from './HeavyChart';
// After:
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-800 animate-pulse rounded-lg" />
  ),
});

// バンドルサイズ改善:
// Before: 初期JS 540KB (gzip)
// After:  初期JS 180KB (gzip) → 67%削減`}</code>
          </pre>
      </section>

      {/* Step 3: 画像最適化 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 3: 画像を最適化する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          画像フォーマット、サイズ、読み込みタイミングを最適化してLCPとCLSを改善します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import Image from 'next/image';

// ✅ 修正5: ヒーロー画像の最適化
// Before:
//   <img src="/hero-4000x2000.png" />  // 2.3MB, PNG, サイズ未指定
// After:
<Image
  src="/hero.jpg"
  alt="ストアのヒーロー画像"
  width={1200}
  height={600}
  priority                    // LCP要素にはpriority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
  sizes="100vw"
/>
// → 自動でWebP変換、リサイズ: 2.3MB → 85KB

// ✅ 修正6: バナー画像のCLS修正
// Before:
//   <img src="/banner.jpg" />  // width/height なし → CLS
// After:
<Image
  src="/banner.jpg"
  alt="セールバナー"
  width={800}
  height={200}
  loading="lazy"              // ファーストビュー外はlazy
/>

// ✅ 商品画像の最適化
{filtered.map((product) => (
  <Image
    key={product.id}
    src={product.image}
    alt={product.name}
    width={300}
    height={300}
    loading="lazy"
    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  />
))}

// 画像改善結果:
// LCP: 6.8s → 2.1s
// CLS: 0.45 → 0.02`}</code>
          </pre>
      </section>

      {/* Step 4: レンダリング最適化 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 4: レンダリングを最適化する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メモ化、仮想化、debounceを適用して<strong className="text-green-400">INP/TBT</strong>を改善します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import debounce from 'lodash/debounce';

// ✅ 修正7: ProductCard をメモ化
const ProductCard = memo(function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (id: string) => void;
}) {
  return (
    <div className="p-4 border border-gray-800 rounded-lg">
      <Image src={product.image} alt={product.name} width={300} height={300} />
      <h3>{product.name}</h3>
      <p>¥{product.price.toLocaleString()}</p>
      <button onClick={() => onAdd(product.id)}>カートに追加</button>
    </div>
  );
});

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  // ✅ 修正8: フィルタリングをメモ化
  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // ✅ 修正9: コールバック関数をメモ化
  const handleAdd = useCallback((id: string) => {
    addToCart(id);
  }, []);

  // ✅ 修正10: 検索をdebounce
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      fetch(\`/api/search?q=\${term}\`);
    }, 300),
    []
  );

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  // ✅ 修正11: 仮想化リストで大量商品を表示
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ProductCard
        product={filtered[index]}
        onAdd={handleAdd}
      />
    </div>
  );

  return (
    <div>
      <Image src="/hero.jpg" alt="ヒーロー" width={1200} height={600} priority />
      <input onChange={handleSearchInput} placeholder="商品を検索..." />

      <HeavyChart data={products} />

      <FixedSizeList
        height={800}
        width="100%"
        itemCount={filtered.length}
        itemSize={320}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}`}</code>
          </pre>
      </section>

      {/* 改善結果 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">改善結果のビフォー・アフター</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべての最適化を適用した結果を比較しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`■ Lighthouse スコア比較

                Before    After     改善率
  ─────────────────────────────────────────
  Performance    32 🔴    94 🟢    +194%
  LCP            6.8s     2.1s     -69%
  TBT            1200ms   120ms    -90%
  CLS            0.45     0.02     -96%
  FCP            3.2s     1.1s     -66%

■ バンドルサイズ

  初期JS:  540KB → 180KB  (-67%)
  画像:    2.8MB → 210KB  (-92%)
  合計:    3.5MB → 450KB  (-87%)

■ 適用したテクニック一覧

  バンドル最適化:
    ✅ lodash → 個別インポート
    ✅ moment → dayjs に置換
    ✅ react-icons 個別インポート
    ✅ HeavyChart の dynamic import

  画像最適化:
    ✅ next/image で自動WebP変換
    ✅ priority で LCP 要素を優先
    ✅ width/height 指定で CLS 防止
    ✅ lazy loading で初期読み込み削減

  レンダリング最適化:
    ✅ React.memo で不要な再レンダリング防止
    ✅ useMemo でフィルタリング結果キャッシュ
    ✅ useCallback で関数参照安定化
    ✅ react-window で仮想化リスト
    ✅ debounce でAPI呼び出し制御`}</code>
          </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>パフォーマンス改善は「計測 → 分析 → 改善 → 再計測」のサイクルで行う</li>
          <li>まずLighthouseでボトルネックを特定してから、優先度の高い問題から対処する</li>
          <li>バンドルサイズ削減（Tree Shaking、dynamic import）は即効性が高い</li>
          <li>画像最適化はLCPとCLSの両方に大きく影響する</li>
          <li>メモ化と仮想化はレンダリングパフォーマンス（INP/TBT）の改善に効果的</li>
          <li>debounce/throttleでネットワークとCPUの無駄遣いを防ぐ</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="performance" lessonId="performance-exercise" color="green" />
      <LessonNav lessons={PERFORMANCE_LESSONS} currentId="performance-exercise" basePath="/learn/performance" color="green" />
    </div>
  );
}
