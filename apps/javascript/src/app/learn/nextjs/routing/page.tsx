import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NEXTJS_LESSONS } from "@/lib/lessons-data";

export default function NextjsRoutingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">Next.js レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイルベースルーティング</h1>
        <p className="text-gray-400">App Routerの仕組みを理解し、動的ルートやレイアウトを使いこなそう</p>
      </div>

      {/* App Routerの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">App Routerの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsのApp Routerでは、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">app</code>ディレクトリ内の
          フォルダ構造がそのままURLのルーティングになります。React Routerのように設定ファイルを書く必要はありません。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# フォルダ構造 → URL の対応
app/
├── page.tsx                    # → /
├── about/
│   └── page.tsx                # → /about
├── blog/
│   ├── page.tsx                # → /blog
│   └── [slug]/
│       └── page.tsx            # → /blog/my-first-post など
├── dashboard/
│   ├── layout.tsx              # → /dashboard/* の共通レイアウト
│   ├── page.tsx                # → /dashboard
│   └── settings/
│       └── page.tsx            # → /dashboard/settings
└── (marketing)/
    ├── pricing/
    │   └── page.tsx            # → /pricing （グループ名はURLに含まれない）
    └── contact/
        └── page.tsx            # → /contact`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4">
          ルーティングに関わるのは特定の名前を持つファイルだけです。
          それ以外のファイル（ユーティリティ関数、コンポーネントなど）を同じフォルダに置いても、URLには影響しません。
        </p>
      </section>

      {/* 特殊ファイルの規約 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">特殊ファイルの規約</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          App Routerでは、ファイル名に特別な意味があります。それぞれの役割を理解しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// page.tsx — ページのUIを定義（これがないとURLにアクセスできない）
export default function BlogPage() {
  return <h1>ブログ一覧</h1>;
}

// layout.tsx — 子ページに共通するレイアウト
// ページ遷移してもレイアウトは再レンダリングされない（状態が保持される）
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside>サイドバー</aside>
      <main>{children}</main>
    </div>
  );
}

// loading.tsx — ページ読み込み中に表示されるUI
export default function Loading() {
  return <div>読み込み中...</div>;
}

// error.tsx — エラー発生時に表示されるUI（"use client" が必要）
"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button onClick={reset}>再試行</button>
    </div>
  );
}

// not-found.tsx — 404ページ
export default function NotFound() {
  return <h2>ページが見つかりません</h2>;
}`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          これらのファイルは自動的にNext.jsに認識され、適切なタイミングで表示されます。
          特に<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">loading.tsx</code>と
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">error.tsx</code>は、
          内部的にReactの<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Suspense</code>と
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">ErrorBoundary</code>でラップされます。
        </p>
      </section>

      {/* 動的ルート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">動的ルート（Dynamic Routes）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          URLの一部が可変になるページには、フォルダ名を角括弧で囲みます。
          例えばブログ記事ページでは、記事ごとに異なるURLが必要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// app/blog/[slug]/page.tsx
// /blog/hello-world → params.slug = "hello-world"
// /blog/nextjs-intro → params.slug = "nextjs-intro"

type Props = {
  params: { slug: string };
};

export default function BlogPost({ params }: Props) {
  return (
    <article>
      <h1>記事: {params.slug}</h1>
      <p>この記事のスラッグは「{params.slug}」です。</p>
    </article>
  );
}

// --- 複数のセグメントをキャッチする場合 ---

// app/docs/[...slug]/page.tsx（Catch-all）
// /docs/a → params.slug = ["a"]
// /docs/a/b/c → params.slug = ["a", "b", "c"]

type DocsProps = {
  params: { slug: string[] };
};

export default function DocsPage({ params }: DocsProps) {
  return <p>パス: {params.slug.join("/")}</p>;
}

// app/shop/[[...slug]]/page.tsx（Optional Catch-all）
// /shop → params.slug = undefined
// /shop/clothes → params.slug = ["clothes"]
// /shop/clothes/tops → params.slug = ["clothes", "tops"]`}</code>
        </pre>
      </section>

      {/* ネストされたレイアウト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ネストされたレイアウト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レイアウトは入れ子にできます。各フォルダに<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">layout.tsx</code>を
          置くことで、そのフォルダ配下の全ページに共通のUIを追加できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/layout.tsx（ルートレイアウト）
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header>グローバルヘッダー</header>
        {children}
      </body>
    </html>
  );
}

// app/dashboard/layout.tsx（ダッシュボード用レイアウト）
// ルートレイアウトの中にネストされる
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <nav className="w-64 bg-gray-100">
        <ul>
          <li><a href="/dashboard">概要</a></li>
          <li><a href="/dashboard/analytics">分析</a></li>
          <li><a href="/dashboard/settings">設定</a></li>
        </ul>
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

// 最終的なHTML構造:
// <html>
//   <body>
//     <header>グローバルヘッダー</header>
//     <div class="flex">
//       <nav>サイドバー</nav>
//       <main>ページの内容</main>
//     </div>
//   </body>
// </html>`}</code>
        </pre>
      </section>

      {/* Linkコンポーネントとナビゲーション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Linkコンポーネントとナビゲーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ページ間のナビゲーションには、Next.jsの
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Link</code>コンポーネントと
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useRouter</code>フックを使います。
          通常の<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">{`<a>`}</code>タグと違い、
          ページ全体をリロードせずにクライアントサイドで遷移します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// Linkコンポーネント（宣言的ナビゲーション）
import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">ホーム</Link>
      <Link href="/about">アバウト</Link>
      <Link href="/blog">ブログ</Link>

      {/* 動的ルートへのリンク */}
      <Link href="/blog/my-first-post">最初の記事</Link>

      {/* prefetch を無効にする（大きなページの場合） */}
      <Link href="/heavy-page" prefetch={false}>重いページ</Link>
    </nav>
  );
}

// useRouter（プログラム的ナビゲーション）
"use client"; // useRouterはClient Componentでのみ使用可能
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = async () => {
    // ログイン処理...
    const success = true;

    if (success) {
      router.push("/dashboard");    // ページ遷移
      // router.replace("/dashboard"); // 履歴を置き換える遷移
      // router.back();               // 前のページに戻る
      // router.refresh();            // 現在のページを再読み込み
    }
  };

  return <button onClick={handleLogin}>ログイン</button>;
}`}</code>
        </pre>
      </section>

      {/* ルートグループ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ルートグループ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          フォルダ名を括弧で囲むと、URLに影響しない「ルートグループ」を作れます。
          ルートを論理的に整理したり、グループごとに異なるレイアウトを適用したい場合に便利です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# ルートグループの例
app/
├── (marketing)/
│   ├── layout.tsx         # マーケティングページ用レイアウト
│   ├── about/
│   │   └── page.tsx       # → /about （"marketing" はURLに含まれない）
│   └── pricing/
│       └── page.tsx       # → /pricing
├── (app)/
│   ├── layout.tsx         # アプリページ用レイアウト（サイドバー付き）
│   ├── dashboard/
│   │   └── page.tsx       # → /dashboard
│   └── settings/
│       └── page.tsx       # → /settings
└── layout.tsx             # ルートレイアウト

# メリット:
# - マーケティングページとアプリページで異なるレイアウトを使える
# - フォルダを論理的に整理できる
# - URLの構造に影響しない`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>App Routerではフォルダ構造がそのままURLのルーティングになる</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">page.tsx</code>、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">layout.tsx</code>、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">loading.tsx</code>、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">error.tsx</code>などの特殊ファイルがある</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">[slug]</code>で動的ルート、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">[...slug]</code>でキャッチオールルートを作成できる</li>
          <li>レイアウトはネストでき、ページ遷移時も状態が保持される</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Link</code>コンポーネントでクライアントサイドナビゲーション、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useRouter</code>でプログラム的な遷移が可能</li>
          <li>ルートグループ<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">(group)</code>でURLに影響せずフォルダを整理できる</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nextjs" lessonId="routing" color="purple" />
      <LessonNav lessons={NEXTJS_LESSONS} currentId="routing" basePath="/learn/nextjs" color="purple" />
    </div>
  );
}
