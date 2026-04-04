import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PERFORMANCE_LESSONS } from "@/lib/lessons-data";

export default function CodeSplittingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 mb-4">パフォーマンス レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コード分割とメモ化</h1>
        <p className="text-gray-400">dynamic import、React.memo、useMemo、useCallback、仮想化を学ぼう</p>
      </div>

      {/* コード分割の基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">コード分割（Code Splitting）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">コード分割</strong>は、JavaScriptバンドルを複数の小さなチャンクに分割し、
          必要なタイミングで必要なコードだけを読み込む手法です。初期読み込みを高速化できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`■ dynamic import（動的インポート）

// ❌ 静的インポート: すべて初期バンドルに含まれる
import { HeavyChart } from './HeavyChart';
import { PDFViewer } from './PDFViewer';

// ✅ 動的インポート: 使うときに読み込む
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>チャートを読み込み中...</p>,
});

// ■ Next.js の dynamic（推奨）
import dynamic from 'next/dynamic';

// SSR を無効にしたい場合（ブラウザ専用ライブラリ）
const MapComponent = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-800 animate-pulse" />,
});

// 条件付き読み込み
export default function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        チャートを表示
      </button>
      {showChart && <HeavyChart />}
    </div>
  );
}`}</code>
          </pre>
      </section>

      {/* React.lazy */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">React.lazy と Suspense</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">React.lazy</strong>はReact標準のコード分割機能です。
          Suspenseと組み合わせて、読み込み中のフォールバックUIを提供します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import { lazy, Suspense } from 'react';

// コンポーネントを遅延読み込み
const AdminPanel = lazy(() => import('./AdminPanel'));
const UserProfile = lazy(() => import('./UserProfile'));

// ルートレベルでの分割
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Suspense>
  );
}

// 名前付きエクスポートの遅延読み込み
const MyComponent = lazy(() =>
  import('./MyModule').then((module) => ({
    default: module.MyComponent,
  }))
);

// Suspense のネスト（セクションごとのローディング）
function Dashboard() {
  return (
    <div>
      <h1>ダッシュボード</h1>
      <Suspense fallback={<Skeleton />}>
        <ChartSection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <TableSection />
      </Suspense>
    </div>
  );
}`}</code>
          </pre>
      </section>

      {/* React.memo */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">React.memo による再レンダリング防止</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">React.memo</strong>は、propsが変わらない限り
          コンポーネントの再レンダリングをスキップする高階コンポーネントです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import { memo } from 'react';

// ❌ 親が再レンダリングするたびに毎回レンダリングされる
function UserCard({ name, avatar }: { name: string; avatar: string }) {
  console.log('UserCard rendered');
  return (
    <div>
      <img src={avatar} alt={name} />
      <p>{name}</p>
    </div>
  );
}

// ✅ props が変わらなければスキップ
const UserCard = memo(function UserCard({
  name,
  avatar,
}: {
  name: string;
  avatar: string;
}) {
  console.log('UserCard rendered');
  return (
    <div>
      <img src={avatar} alt={name} />
      <p>{name}</p>
    </div>
  );
});

// カスタム比較関数
const UserCard = memo(
  function UserCard({ user }: { user: User }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // true を返すとスキップ（再レンダリングしない）
    return prevProps.user.id === nextProps.user.id;
  }
);

// ⚠️ memo が効かないケース
// オブジェクトや関数を直接渡すと毎回新しい参照になる
<UserCard
  style={{ color: 'red' }}  // ❌ 毎回新しいオブジェクト
  onClick={() => {}}         // ❌ 毎回新しい関数
/>`}</code>
          </pre>
      </section>

      {/* useMemo / useCallback */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">useMemo と useCallback</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">useMemo</strong>は計算結果のキャッシュ、
          <strong className="text-green-400">useCallback</strong>は関数参照のキャッシュに使います。
          React.memoと組み合わせることで効果を発揮します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import { useMemo, useCallback, useState } from 'react';

function ProductList({ products, category }: Props) {
  // ✅ useMemo: 重い計算をキャッシュ
  const filteredProducts = useMemo(() => {
    console.log('filtering...');  // category が変わったときだけ実行
    return products.filter((p) => p.category === category);
  }, [products, category]);

  // ✅ useMemo: 派生データのキャッシュ
  const stats = useMemo(() => ({
    total: filteredProducts.length,
    avgPrice: filteredProducts.reduce((sum, p) => sum + p.price, 0)
      / filteredProducts.length,
  }), [filteredProducts]);

  // ✅ useCallback: 関数参照をキャッシュ
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const handleSort = useCallback(() => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  // ✅ useCallback: 子コンポーネントに渡す関数
  const handleDelete = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div>
      <p>合計: {stats.total}件 / 平均: ¥{stats.avgPrice}</p>
      <button onClick={handleSort}>並び替え</button>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDelete}  // memo と組み合わせて効果的
        />
      ))}
    </div>
  );
}

// ⚠️ 過度な最適化に注意
// 単純な計算にuseMemoは不要（メモ化自体のコストがある）
const doubled = useMemo(() => count * 2, [count]);  // ❌ 不要
const doubled = count * 2;                           // ✅ 十分速い`}</code>
          </pre>
      </section>

      {/* 仮想化 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">リスト仮想化（Virtualization）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          数千〜数万件のリストを表示する場合、
          <strong className="text-green-400">仮想化</strong>を使って画面に見えている要素だけをDOMに描画します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// react-window を使った仮想化リスト
import { FixedSizeList } from 'react-window';

interface Item {
  id: number;
  name: string;
}

function VirtualList({ items }: { items: Item[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} className="flex items-center px-4 border-b border-gray-800">
      <span className="text-gray-300">{items[index].name}</span>
    </div>
  );

  return (
    <FixedSizeList
      height={600}           // リストの高さ
      width="100%"
      itemCount={items.length}  // 10,000件あってもOK
      itemSize={50}           // 各行の高さ
    >
      {Row}
    </FixedSizeList>
  );
}

// 可変サイズの場合
import { VariableSizeList } from 'react-window';

function VariableList({ items }: { items: Item[] }) {
  const getItemSize = (index: number) => {
    return items[index].name.length > 50 ? 80 : 50;
  };

  return (
    <VariableSizeList
      height={600}
      width="100%"
      itemCount={items.length}
      itemSize={getItemSize}
    >
      {Row}
    </VariableSizeList>
  );
}

// ❌ 仮想化なし: 10,000件 → 10,000個のDOM要素
// ✅ 仮想化あり: 10,000件 → 画面に見える約20個だけ`}</code>
          </pre>
      </section>

      {/* Debounce / Throttle */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Debounce と Throttle</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          高頻度で発生するイベント（入力、スクロール、リサイズ）の処理を制御して、
          <strong className="text-green-400">不要な計算やAPIコール</strong>を減らします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ■ Debounce: 最後のイベントから一定時間後に実行
// 用途: 検索入力、フォームバリデーション

import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

function SearchInput() {
  const [query, setQuery] = useState('');

  // 300ms 入力が止まったら検索実行
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      fetch(\`/api/search?q=\${term}\`).then(/* ... */);
    }, 300),
    []
  );

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
      placeholder="検索..."
    />
  );
}

// ■ Throttle: 一定間隔で最大1回だけ実行
// 用途: スクロール、リサイズ、マウス移動

import throttle from 'lodash/throttle';

function ScrollTracker() {
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      console.log('Scroll position:', scrollY);
    }, 100);  // 100ms ごとに最大1回

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div>...</div>;
}

// ■ カスタム useDebounce フック
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// 使用例
function Search() {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    if (debouncedInput) fetchResults(debouncedInput);
  }, [debouncedInput]);
}`}</code>
          </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>dynamic import / React.lazy でバンドルを分割し、初期読み込みを軽量化する</li>
          <li>React.memo で不要な再レンダリングをスキップする</li>
          <li>useMemo は重い計算のキャッシュ、useCallback は関数参照のキャッシュに使う</li>
          <li>大量リストには react-window 等の仮想化ライブラリを活用する</li>
          <li>debounce / throttle で高頻度イベントの処理を最適化する</li>
          <li>過度な最適化は避け、計測結果に基づいて適用する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="performance" lessonId="code-splitting" color="green" />
      <LessonNav lessons={PERFORMANCE_LESSONS} currentId="code-splitting" basePath="/learn/performance" color="green" />
    </div>
  );
}
