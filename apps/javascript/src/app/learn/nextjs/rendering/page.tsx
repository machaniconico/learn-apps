import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NEXTJS_LESSONS } from "@/lib/lessons-data";

export default function NextjsRenderingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">Next.js レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">レンダリング戦略</h1>
        <p className="text-gray-400">SSR、SSG、ISR、CSRの違いを理解し、最適なレンダリング方法を選択しよう</p>
      </div>

      {/* レンダリングとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">4つのレンダリング戦略</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsでは、ページやコンポーネントごとに異なるレンダリング戦略を選択できます。
          それぞれの特徴を理解し、コンテンツの性質に合わせて最適な方法を選びましょう。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">SSG（静的サイト生成）</h3>
            <p className="text-sm text-gray-300 mb-2">ビルド時にHTMLを事前生成。CDNから配信でき最も高速。</p>
            <p className="text-xs text-gray-500">適用例: ブログ記事、ドキュメント、ランディングページ</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">SSR（サーバーサイドレンダリング）</h3>
            <p className="text-sm text-gray-300 mb-2">リクエストごとにサーバーでHTMLを生成。常に最新データ。</p>
            <p className="text-xs text-gray-500">適用例: ダッシュボード、検索結果、ユーザー固有のページ</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">ISR（増分静的再生成）</h3>
            <p className="text-sm text-gray-300 mb-2">静的生成 + 定期的な再生成。速度と鮮度のバランス。</p>
            <p className="text-xs text-gray-500">適用例: ECサイトの商品ページ、ニュースサイト</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">CSR（クライアントサイドレンダリング）</h3>
            <p className="text-sm text-gray-300 mb-2">ブラウザ側でJSを実行してUIを構築。高インタラクティブ。</p>
            <p className="text-xs text-gray-500">適用例: リアルタイムチャット、地図アプリ、管理画面の一部</p>
          </div>
        </div>
      </section>

      {/* SSG: 静的サイト生成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">SSG（静的サイト生成）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsのApp Routerでは、データ取得がないか、キャッシュされたfetchを使う場合、
          自動的に静的レンダリング（SSG）になります。ビルド時にHTMLが生成され、CDNから配信されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 静的レンダリング（SSG）の例
// fetchがない、または cache: "force-cache" の場合、自動でSSGになる

// 例1: データ取得なし → 自動的に静的
export default function AboutPage() {
  return (
    <div>
      <h1>会社について</h1>
      <p>私たちは...</p>
    </div>
  );
}

// 例2: キャッシュありのfetch → ビルド時に1回だけ取得
export default async function BlogPage() {
  // デフォルトでキャッシュされる（静的レンダリング）
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  return (
    <ul>
      {posts.map((post: { id: number; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// 例3: 動的ルートで静的ページを事前生成
// generateStaticParams で、ビルド時に生成するページを指定
export async function generateStaticParams() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  // 各記事のslugを返す → ビルド時にすべてのページが生成される
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    \`https://api.example.com/posts/\${params.slug}\`
  );
  const post = await res.json();

  return <article><h1>{post.title}</h1></article>;
}`}</code>
        </pre>
      </section>

      {/* SSR: サーバーサイドレンダリング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">SSR（サーバーサイドレンダリング）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リクエストごとに最新のデータが必要な場合は、動的レンダリング（SSR）を使います。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">cache: &quot;no-store&quot;</code>を指定するか、
          動的関数（cookies、headersなど）を使うと自動的にSSRになります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 動的レンダリング（SSR）の例

// 方法1: cache: "no-store" を指定
export default async function DashboardPage() {
  // リクエストごとに最新データを取得
  const res = await fetch("https://api.example.com/dashboard", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div>
      <h1>ダッシュボード</h1>
      <p>売上: {data.revenue}円</p>
      <p>注文数: {data.orders}件</p>
    </div>
  );
}

// 方法2: 動的関数を使う（自動的にSSRになる）
import { cookies, headers } from "next/headers";

export default async function ProfilePage() {
  // cookies() を呼ぶだけで動的レンダリングになる
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");

  const res = await fetch("https://api.example.com/me", {
    headers: { Authorization: \`Bearer \${token?.value}\` },
  });
  const user = await res.json();

  return <div>こんにちは、{user.name}さん</div>;
}

// 方法3: ページ単位で強制的に動的レンダリング
export const dynamic = "force-dynamic";

export default async function RealtimePage() {
  // ...
}`}</code>
        </pre>
      </section>

      {/* ISR: 増分静的再生成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ISR（増分静的再生成）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ISRは、SSGの高速さとSSRのデータ鮮度を両立させる戦略です。
          一定時間はキャッシュを使い、期限が切れたら裏側で再生成します。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">next: {`{ revalidate: 秒数 }`}</code>で設定します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ISR（増分静的再生成）の例

export default async function NewsPage() {
  // 60秒ごとに再検証（再生成）
  const res = await fetch("https://api.example.com/news", {
    next: { revalidate: 60 },
  });
  const articles = await res.json();

  return (
    <div>
      <h1>ニュース</h1>
      {articles.map((article: { id: number; title: string; summary: string }) => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </article>
      ))}
    </div>
  );
}

// ISRの動作フロー:
// 1. 最初のアクセス: 静的HTMLを生成してキャッシュ
// 2. 60秒以内のアクセス: キャッシュされたHTMLを返す（超高速）
// 3. 60秒後のアクセス:
//    - まずキャッシュされたHTMLを返す（ユーザーは待たない）
//    - 裏側で新しいHTMLを再生成
// 4. 次のアクセス: 新しいHTMLが返される

// ページ単位でrevalidateを設定することも可能
export const revalidate = 60; // ページ内の全fetchに適用

// オンデマンド再検証（タグベース）
// route.ts やServer Actionから手動で再検証をトリガー
import { revalidateTag } from "next/cache";

// データ取得時にタグを付ける
const res = await fetch("https://api.example.com/products", {
  next: { tags: ["products"] },
});

// 商品が更新されたときに手動で再検証
// （API RouteやServer Actionから呼ぶ）
revalidateTag("products");`}</code>
        </pre>
      </section>

      {/* ストリーミング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ストリーミングとSuspense</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ストリーミングは、サーバーからクライアントにHTMLを段階的に送信する仕組みです。
          ページの一部がまだ読み込み中でも、準備ができた部分から順に表示されます。
          これにより、ユーザーは早い段階でページの内容を見始めることができます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import { Suspense } from "react";

// 遅いAPI（3秒かかる）
async function SlowRecommendations() {
  const res = await fetch("https://api.example.com/recommendations", {
    cache: "no-store",
  });
  const items = await res.json();
  return (
    <ul>
      {items.map((item: { id: number; name: string }) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// 速いAPI（0.1秒で返る）
async function ProductInfo({ id }: { id: string }) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  const product = await res.json();
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}円</p>
    </div>
  );
}

// ページコンポーネント
export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      {/* 商品情報は即座に表示 */}
      <Suspense fallback={<p>商品情報を読み込み中...</p>}>
        <ProductInfo id={params.id} />
      </Suspense>

      {/* おすすめは遅いので、スケルトンを表示して待つ */}
      <Suspense
        fallback={
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        }
      >
        <SlowRecommendations />
      </Suspense>
    </div>
  );
}

// 従来のSSR: 全データが揃うまでページ全体が表示されない
// ストリーミング: 準備できた部分から順にHTMLが送信される
// → ユーザー体験が大幅に向上`}</code>
        </pre>
      </section>

      {/* 使い分けガイド */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">レンダリング戦略の使い分け</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          どのレンダリング戦略を使うかは、データの更新頻度とパフォーマンス要件で決まります。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-purple-400">戦略</th>
                <th className="text-left py-3 px-4 text-purple-400">速度</th>
                <th className="text-left py-3 px-4 text-purple-400">データ鮮度</th>
                <th className="text-left py-3 px-4 text-purple-400">適したコンテンツ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 font-semibold">SSG</td>
                <td className="py-3 px-4">最速</td>
                <td className="py-3 px-4">ビルド時のみ</td>
                <td className="py-3 px-4">ブログ、ドキュメント、LP</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 font-semibold">ISR</td>
                <td className="py-3 px-4">高速</td>
                <td className="py-3 px-4">定期更新</td>
                <td className="py-3 px-4">ECサイト、ニュース</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 font-semibold">SSR</td>
                <td className="py-3 px-4">やや遅い</td>
                <td className="py-3 px-4">常に最新</td>
                <td className="py-3 px-4">ダッシュボード、検索結果</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">CSR</td>
                <td className="py-3 px-4">初期表示遅い</td>
                <td className="py-3 px-4">リアルタイム</td>
                <td className="py-3 px-4">チャット、リッチUI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>SSGはビルド時にHTMLを生成し、最も高速に配信できる</li>
          <li>SSRはリクエストごとにサーバーで生成し、常に最新データを表示できる</li>
          <li>ISRはSSGとSSRの中間で、定期的にページを再生成する</li>
          <li>CSRはブラウザ側でレンダリングし、高いインタラクティブ性を実現する</li>
          <li>Suspenseを使ったストリーミングで、段階的にUIを表示できる</li>
          <li>コンテンツの性質に応じて、適切なレンダリング戦略を選択することが重要</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nextjs" lessonId="rendering" color="purple" />
      <LessonNav lessons={NEXTJS_LESSONS} currentId="rendering" basePath="/learn/nextjs" color="purple" />
    </div>
  );
}
