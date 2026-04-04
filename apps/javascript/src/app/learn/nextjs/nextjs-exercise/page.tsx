import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NEXTJS_LESSONS } from "@/lib/lessons-data";

export default function NextjsExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">Next.js レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Next.js総合演習</h1>
        <p className="text-gray-400">これまで学んだ知識を活かして、シンプルなブログサイトを構築しよう</p>
      </div>

      {/* プロジェクト概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、Next.jsの主要機能を組み合わせて<strong className="text-purple-400">シンプルなブログサイト</strong>を
          構築します。以下の機能を実装していきます。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
          <li>トップページ（記事一覧）</li>
          <li>記事詳細ページ（動的ルート）</li>
          <li>共通レイアウト（ヘッダー、フッター）</li>
          <li>記事データのAPI（Route Handlers）</li>
          <li>ローディングUI</li>
        </ul>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# 完成時のフォルダ構造
src/app/
├── layout.tsx              # ルートレイアウト
├── page.tsx                # トップページ（記事一覧）
├── globals.css
├── blog/
│   ├── page.tsx            # ブログ一覧ページ
│   ├── loading.tsx         # ローディングUI
│   └── [slug]/
│       └── page.tsx        # 記事詳細ページ
├── api/
│   └── posts/
│       ├── route.ts        # GET: 全記事取得 / POST: 記事作成
│       └── [slug]/
│           └── route.ts    # GET: 個別記事取得
└── lib/
    └── posts.ts            # 記事データ管理`}</code>
        </pre>
      </section>

      {/* Step 1: データ層 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 1: 記事データの定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず、ブログ記事のデータを管理するモジュールを作成します。
          実際のアプリではデータベースを使いますが、ここでは配列でシンプルに管理します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/app/lib/posts.ts
export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
};

// ブログ記事データ
export const posts: Post[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Next.jsをはじめよう",
    date: "2025-01-15",
    excerpt: "Next.jsの基本的なセットアップと最初のページを作成する方法を解説します。",
    content: \`
Next.jsは、Reactベースのフルスタックフレームワークです。

## なぜNext.jsを使うのか？

1. ファイルベースルーティングで設定が簡単
2. SSR/SSGで高速な初期表示
3. API Routesでバックエンドも構築可能

\\\`\\\`\\\`
npx create-next-app@latest my-blog
cd my-blog
npm run dev
\\\`\\\`\\\`

これだけで開発サーバーが起動します！
    \`,
    tags: ["Next.js", "React", "入門"],
  },
  {
    slug: "understanding-server-components",
    title: "Server Componentsを理解する",
    date: "2025-01-20",
    excerpt: "React Server Componentsの仕組みと、Next.jsでの活用方法を学びます。",
    content: \`
Server Componentsは、サーバー側で実行されるReactコンポーネントです。

## メリット

- バンドルサイズが小さくなる
- データベースに直接アクセスできる
- APIキーなどの秘密情報を安全に扱える

## 使い方

デフォルトでServer Componentです。Client Componentにするには
ファイルの先頭に "use client" を追記します。
    \`,
    tags: ["React", "Server Components"],
  },
  {
    slug: "styling-with-tailwind",
    title: "Tailwind CSSでスタイリング",
    date: "2025-01-25",
    excerpt: "Next.jsプロジェクトでTailwind CSSを使った効率的なスタイリング手法。",
    content: \`
Tailwind CSSは、ユーティリティファーストのCSSフレームワークです。

## セットアップ

create-next-appでTailwind CSSを選択すれば、自動的にセットアップされます。

## 基本的な使い方

\\\`\\\`\\\`jsx
<div className="bg-gray-900 p-4 rounded-lg">
  <h1 className="text-2xl font-bold text-white">
    タイトル
  </h1>
</div>
\\\`\\\`\\\`
    \`,
    tags: ["CSS", "Tailwind"],
  },
];

// ヘルパー関数
export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}`}</code>
        </pre>
      </section>

      {/* Step 2: レイアウト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 2: ルートレイアウトの作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          全ページに共通するヘッダーとフッターを含むレイアウトを作成します。
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">metadata</code>オブジェクトで
          SEO用のメタデータも設定します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "My Blog",
    template: "%s | My Blog", // 子ページのtitleが埋め込まれる
  },
  description: "Next.jsで作ったブログサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-950 text-gray-100 min-h-screen flex flex-col">
        {/* ヘッダー */}
        <header className="border-b border-gray-800">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-purple-400">
              My Blog
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-400 hover:text-white">
                ホーム
              </Link>
              <Link href="/blog" className="text-gray-400 hover:text-white">
                記事一覧
              </Link>
            </div>
          </nav>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {children}
        </main>

        {/* フッター */}
        <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
          <p>&copy; 2025 My Blog. Built with Next.js</p>
        </footer>
      </body>
    </html>
  );
}`}</code>
        </pre>
      </section>

      {/* Step 3: APIルート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 3: APIルートの作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          記事データを取得するためのAPIエンドポイントを作成します。
          全記事一覧と個別記事取得の2つのエンドポイントを用意します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import { getAllPosts } from "@/app/lib/posts";

// GET /api/posts — 全記事を取得
export async function GET() {
  const posts = getAllPosts();

  // 一覧ではcontentを除外（データ量を減らす）
  const summaries = posts.map(({ content, ...rest }) => rest);

  return NextResponse.json(summaries);
}

// src/app/api/posts/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/app/lib/posts";

// GET /api/posts/:slug — 個別記事を取得
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return NextResponse.json(
      { error: "記事が見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}`}</code>
        </pre>
      </section>

      {/* Step 4: ページの作成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 4: ブログページの作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          記事一覧ページと記事詳細ページを作成します。
          Server Componentでデータを直接取得し、ローディングUIも追加します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// src/app/blog/page.tsx — 記事一覧
import Link from "next/link";
import { getAllPosts } from "@/app/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事一覧",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-6 rounded-xl bg-gray-900 border border-gray-800
                       hover:border-purple-500/50 transition-colors"
          >
            <Link href={\`/blog/\${post.slug}\`}>
              <div className="flex gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full
                               bg-purple-500/20 text-purple-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm mb-2">{post.excerpt}</p>
              <time className="text-gray-500 text-xs">{post.date}</time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// src/app/blog/loading.tsx — ローディングUI
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 bg-gray-800 rounded w-1/3 animate-pulse"></div>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-6 rounded-xl bg-gray-900 border border-gray-800 animate-pulse"
        >
          <div className="h-4 bg-gray-800 rounded w-1/4 mb-3"></div>
          <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-800 rounded w-1/5"></div>
        </div>
      ))}
    </div>
  );
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/app/blog/[slug]/page.tsx — 記事詳細
import { getPostBySlug, getAllPosts } from "@/app/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

// 動的メタデータ
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "記事が見つかりません" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// ビルド時に静的ページを生成（SSG）
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  // 記事が見つからない場合は404
  if (!post) {
    notFound();
  }

  return (
    <article>
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          ← 記事一覧に戻る
        </Link>
      </div>

      <header className="mb-8">
        <div className="flex gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full
                         bg-purple-500/20 text-purple-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {post.title}
        </h1>
        <time className="text-gray-500">{post.date}</time>
      </header>

      <div className="prose prose-invert max-w-none">
        {/* 実際のアプリではMarkdownパーサーを使う */}
        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </article>
  );
}`}</code>
        </pre>
      </section>

      {/* Step 5: デプロイ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 5: ビルドとデプロイ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アプリが完成したら、ビルドして本番環境にデプロイしましょう。
          Next.jsの開発元であるVercelを使えば、GitHubリポジトリと連携するだけで自動デプロイが可能です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# 1. ビルド（本番用に最適化）
npm run build

# ビルド結果の例:
# Route (app)                    Size     First Load JS
# ┌ ○ /                          5.2 kB   89.5 kB
# ├ ○ /blog                      3.1 kB   87.4 kB
# ├ ● /blog/[slug]               1.8 kB   86.1 kB
# │   ├ /blog/getting-started-with-nextjs
# │   ├ /blog/understanding-server-components
# │   └ /blog/styling-with-tailwind
# └ ○ /api/posts                 0 B      0 B
#
# ○ 静的（SSG）  ● SSG（generateStaticParams）

# 2. ローカルで本番ビルドを確認
npm run start

# 3. Vercelにデプロイ
# 方法A: Vercel CLIを使う
npx vercel

# 方法B: GitHubリポジトリと連携（推奨）
# 1. GitHubにリポジトリをpush
# 2. vercel.com でリポジトリをインポート
# 3. 自動的にビルド・デプロイされる
# 4. pushするたびに自動で再デプロイ`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Next.jsでブログサイトを構築する一連の流れを実践した</li>
          <li>ファイルベースルーティングでページを作成し、動的ルートで記事詳細ページを実装した</li>
          <li>ルートレイアウトで共通のヘッダー・フッターを適用した</li>
          <li>Route Handlersで記事データを提供するAPIを構築した</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">generateStaticParams</code>でビルド時に静的ページを生成した</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">generateMetadata</code>で動的にSEOメタデータを設定した</li>
          <li>loading.tsxでローディングUIを追加し、ユーザー体験を向上させた</li>
          <li>Vercelで簡単にデプロイできることを確認した</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nextjs" lessonId="nextjs-exercise" color="purple" />
      <LessonNav lessons={NEXTJS_LESSONS} currentId="nextjs-exercise" basePath="/learn/nextjs" color="purple" />
    </div>
  );
}
