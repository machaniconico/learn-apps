import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NEXTJS_LESSONS } from "@/lib/lessons-data";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "Next.jsはどのような位置づけのツール？",
    options: [
      "JavaScriptのテストフレームワーク",
      "CSSのプリプロセッサ",
      "Reactベースのフルスタックフレームワーク",
      "データベース管理ツール",
    ],
    answer: 2,
    explanation: "Next.jsはReactをベースにしたフルスタックフレームワークで、ルーティング、SSR、API機能などを標準搭載しています。",
  },
  {
    question: "Next.jsのApp Routerで、/about ページを作るにはどこにファイルを置く？",
    options: [
      "pages/about.tsx",
      "app/about/page.tsx",
      "routes/about.tsx",
      "views/about/index.tsx",
    ],
    answer: 1,
    explanation: "App Routerではappディレクトリ内のフォルダ構造がそのままURLパスになります。app/about/page.tsx は /about でアクセスできます。",
  },
  {
    question: "Next.jsのlayout.tsxの役割はどれ？",
    options: [
      "APIエンドポイントを定義する",
      "データベースの接続設定を行う",
      "すべてのページに共通するHTML構造を定義する",
      "CSSスタイルをグローバルに適用する",
    ],
    answer: 2,
    explanation: "layout.tsxはページの「枠」として、ヘッダーやフッターなど全ページ共通のHTML構造を定義します。page.tsxの内容が{children}に差し込まれます。",
  },
];

export default function NextjsBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">Next.js レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Next.jsの基本</h1>
        <p className="text-gray-400">Reactフレームワークの特徴を理解し、開発環境を構築しよう</p>
      </div>

      {/* Next.jsとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Next.jsとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">Next.js</strong>は、Vercel社が開発・メンテナンスしている
          Reactベースのフルスタックフレームワークです。Reactはあくまで「UIライブラリ」ですが、
          Next.jsはそこにルーティング、サーバーサイドレンダリング、API機能などを追加し、
          本番環境に必要な機能をすべて備えた「フレームワーク」として提供しています。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Reactだけでアプリを作る場合、ルーティングライブラリの選定、ビルド設定、SSRの実装など
          多くの判断が必要です。Next.jsはこれらの「ベストプラクティス」をフレームワークとして
          標準化し、開発者が本質的なアプリ開発に集中できるようにしています。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><strong className="text-purple-400">React単体</strong> — UIライブラリ。ルーティングやSSRは自分で設定が必要</li>
          <li><strong className="text-purple-400">Next.js</strong> — Reactを含むフルスタックフレームワーク。すぐに本番利用可能</li>
        </ul>
      </section>

      {/* Next.jsの主要機能 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Next.jsの主要機能</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsには、モダンなWeb開発に必要な機能が豊富に用意されています。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">ファイルベースルーティング</h3>
            <p className="text-sm text-gray-300">フォルダ構造がそのままURLパスになります。設定ファイルなしでページを追加でき、動的ルートやネストされたレイアウトにも対応します。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">サーバーサイドレンダリング（SSR）</h3>
            <p className="text-sm text-gray-300">ページをサーバー側でHTMLに変換してから送信します。初期表示が高速になり、SEOにも有利です。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">静的サイト生成（SSG）</h3>
            <p className="text-sm text-gray-300">ビルド時にHTMLを事前生成します。CDNから配信できるため、最も高速なページ表示が可能です。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">APIルート（Route Handlers）</h3>
            <p className="text-sm text-gray-300">フロントエンドと同じプロジェクト内にAPIエンドポイントを作成できます。別途バックエンドサーバーを用意する必要がありません。</p>
          </div>
        </div>
      </section>

      {/* プロジェクトの作成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクトの作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsプロジェクトは<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">create-next-app</code>コマンドで
          簡単に作成できます。TypeScript、ESLint、Tailwind CSSなどの設定も対話形式で選択できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Next.jsプロジェクトを作成
npx create-next-app@latest my-app

# 対話形式で以下を選択:
# ✔ Would you like to use TypeScript? → Yes
# ✔ Would you like to use ESLint? → Yes
# ✔ Would you like to use Tailwind CSS? → Yes
# ✔ Would you like to use \`src/\` directory? → Yes
# ✔ Would you like to use App Router? → Yes
# ✔ Would you like to customize the default import alias? → No

# プロジェクトに移動して開発サーバーを起動
cd my-app
npm run dev

# http://localhost:3000 でアプリが表示される`}</code>
        </pre>
      </section>

      {/* プロジェクト構造 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクト構造（App Router）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">create-next-app</code>で作成された
          プロジェクトの基本構造を見てみましょう。App Routerでは
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">app</code>ディレクトリが
          ルーティングの中心になります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`my-app/
├── src/
│   └── app/
│       ├── layout.tsx      # ルートレイアウト（全ページ共通のHTML構造）
│       ├── page.tsx         # トップページ（ / ）
│       ├── globals.css      # グローバルCSS
│       ├── about/
│       │   └── page.tsx     # /about ページ
│       └── blog/
│           ├── page.tsx     # /blog ページ（記事一覧）
│           └── [slug]/
│               └── page.tsx # /blog/記事名 ページ（動的ルート）
├── public/                  # 静的ファイル（画像など）
├── next.config.js           # Next.jsの設定ファイル
├── tsconfig.json            # TypeScriptの設定
├── tailwind.config.ts       # Tailwind CSSの設定
└── package.json             # 依存パッケージ`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">app</code>ディレクトリ内のフォルダ名が
          そのままURLのパスになります。例えば<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">app/about/page.tsx</code>は
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">/about</code>というURLでアクセスできます。
        </p>
      </section>

      {/* 最初のページを作る */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">最初のページを作る</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsの<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">layout.tsx</code>と
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">page.tsx</code>の基本を見てみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// app/layout.tsx — ルートレイアウト
// すべてのページに共通するHTML構造を定義します
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "はじめてのNext.jsアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header>
          <nav>サイトナビゲーション</nav>
        </header>
        <main>{children}</main>
        <footer>フッター</footer>
      </body>
    </html>
  );
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// app/page.tsx — トップページ
// このコンポーネントはデフォルトでServer Componentです
export default function Home() {
  return (
    <div>
      <h1>ようこそ！</h1>
      <p>これはNext.jsで作ったトップページです。</p>
      <p>サーバー側でレンダリングされています。</p>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">layout.tsx</code>はページの「枠」、
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">page.tsx</code>はページの「中身」です。
          layoutの<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">{`{children}`}</code>の部分に
          page.tsxの内容が差し込まれます。
        </p>
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="purple" />
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Next.jsはReactベースのフルスタックフレームワーク</li>
          <li>SSR、SSG、ファイルベースルーティング、APIルートなどが標準搭載</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">create-next-app</code>で簡単にプロジェクトを作成できる</li>
          <li>App Routerでは<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">app</code>ディレクトリがルーティングの中心</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">layout.tsx</code>が共通レイアウト、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">page.tsx</code>がページの内容</li>
          <li>デフォルトでServer Componentとして動作する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nextjs" lessonId="basics" color="purple" />
      <LessonNav lessons={NEXTJS_LESSONS} currentId="basics" basePath="/learn/nextjs" color="purple" />
    </div>
  );
}
