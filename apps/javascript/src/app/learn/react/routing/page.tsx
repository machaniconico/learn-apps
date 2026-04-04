import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function RoutingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ルーティング</h1>
        <p className="text-gray-400">ページ遷移の仕組みを理解しよう</p>
      </div>

      {/* ルーティングとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ルーティングとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">ルーティング</strong>は、URLに応じて異なるページ（コンポーネント）を表示する仕組みです。
          Reactは標準ではルーティング機能を持っていないため、ライブラリを使います。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          代表的なルーティングライブラリには以下があります：
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><strong className="text-green-400">React Router</strong> — 最も広く使われるルーティングライブラリ</li>
          <li><strong className="text-green-400">Next.js</strong> — ファイルベースのルーティング（フレームワーク）</li>
          <li><strong className="text-green-400">TanStack Router</strong> — 型安全なルーティング</li>
        </ul>
      </section>

      {/* React Routerの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">React Routerの基本セットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          React Routerを使った基本的なルーティング設定を見てみましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// インストール: npm install react-router-dom

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// ページコンポーネント
function Home() {
  return <h1>ホームページ</h1>;
}

function About() {
  return <h1>概要ページ</h1>;
}

function Contact() {
  return <h1>お問い合わせ</h1>;
}

// ルーティング設定
function App() {
  return (
    <BrowserRouter>
      {/* ナビゲーション */}
      <nav>
        <Link to="/">ホーム</Link>
        <Link to="/about">概要</Link>
        <Link to="/contact">お問い合わせ</Link>
      </nav>

      {/* ルート定義 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"<Link>"}</code> は
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"<a>"}</code> タグの代わりに使います。
          ページ全体をリロードせずに、クライアントサイドで遷移します。
        </p>
      </section>

      {/* 動的ルーティング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">動的ルーティングとuseParams</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          URLにパラメータを含めて、動的なページを作ることができます。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useParams</code> で
          パラメータを取得します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import {
  BrowserRouter, Routes, Route, Link, useParams
} from "react-router-dom";

// ユーザー一覧ページ
function UserList() {
  const users = [
    { id: 1, name: "田中太郎" },
    { id: 2, name: "鈴木花子" },
    { id: 3, name: "佐藤次郎" },
  ];

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={\`/users/\${user.id}\`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ユーザー詳細ページ（動的パラメータ）
function UserDetail() {
  // URLの :userId を取得
  const { userId } = useParams();

  return (
    <div>
      <h1>ユーザー詳細</h1>
      <p>ユーザーID: {userId}</p>
      <Link to="/users">一覧に戻る</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserList />} />
        {/* :userId は動的パラメータ */}
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}`}</code>
        </pre>
      </section>

      {/* ネストされたルート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ネストされたルートとOutlet</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ルートをネストすることで、共通レイアウトの中にサブページを表示できます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import {
  BrowserRouter, Routes, Route, Link, Outlet
} from "react-router-dom";

// 共通レイアウト
function Layout() {
  return (
    <div>
      <header style={{ background: "#333", color: "#fff", padding: "16px" }}>
        <nav style={{ display: "flex", gap: "16px" }}>
          <Link to="/" style={{ color: "#fff" }}>ホーム</Link>
          <Link to="/dashboard" style={{ color: "#fff" }}>ダッシュボード</Link>
          <Link to="/settings" style={{ color: "#fff" }}>設定</Link>
        </nav>
      </header>
      <main style={{ padding: "24px" }}>
        {/* 子ルートのコンポーネントがここに表示される */}
        <Outlet />
      </main>
      <footer style={{ background: "#eee", padding: "16px" }}>
        &copy; 2025 マイアプリ
      </footer>
    </div>
  );
}

// ダッシュボードのサブレイアウト
function DashboardLayout() {
  return (
    <div>
      <h1>ダッシュボード</h1>
      <nav style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <Link to="/dashboard">概要</Link>
        <Link to="/dashboard/analytics">分析</Link>
        <Link to="/dashboard/reports">レポート</Link>
      </nav>
      <Outlet />  {/* サブルートがここに表示 */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layoutで全体を包む */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />

          {/* ネストされたルート */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* 404ページ */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`}</code>
        </pre>
      </section>

      {/* useNavigate */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プログラムでの遷移（useNavigate）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ボタンクリックやフォーム送信後など、コード上からページ遷移させたい場合は
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useNavigate</code> を使います。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ログイン処理...
    const success = await login(email, password);

    if (success) {
      // ログイン成功 → ダッシュボードに遷移
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* フォーム要素 */}
      <button type="submit">ログイン</button>
    </form>
  );
}

function ProductDetail() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>商品詳細</h1>
      {/* 戻る */}
      <button onClick={() => navigate(-1)}>戻る</button>
      {/* 別ページへ */}
      <button onClick={() => navigate("/cart")}>カートへ</button>
      {/* 置き換え（履歴に残さない） */}
      <button onClick={() => navigate("/home", { replace: true })}>
        ホームへ
      </button>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Next.jsのルーティング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Next.jsのファイルベースルーティング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsでは、ファイルの配置がそのままURLになる「ファイルベースルーティング」を採用しています。
          この学習アプリもNext.jsで作られています。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// Next.js App Router のファイル構造
// src/app/
//   page.tsx          → /
//   about/page.tsx    → /about
//   blog/page.tsx     → /blog
//   blog/[slug]/page.tsx → /blog/hello-world（動的ルート）

// --- src/app/page.tsx ---
export default function Home() {
  return <h1>ホームページ</h1>;
}

// --- src/app/blog/[slug]/page.tsx ---
// [slug] が動的パラメータ
export default function BlogPost({ params }) {
  return <h1>記事: {params.slug}</h1>;
}

// --- Next.jsでのリンク ---
import Link from "next/link";

function Navigation() {
  return (
    <nav>
      {/* Next.jsの<Link>コンポーネント */}
      <Link href="/">ホーム</Link>
      <Link href="/about">概要</Link>
      <Link href="/blog/hello-world">記事</Link>
    </nav>
  );
}

// --- プログラムでの遷移 ---
"use client";
import { useRouter } from "next/navigation";

function SearchForm() {
  const router = useRouter();

  const handleSearch = (query) => {
    router.push(\`/search?q=\${query}\`);
  };

  return <button onClick={() => handleSearch("react")}>検索</button>;
}`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>React RouterでURLに応じたページ表示を実現</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"<Link>"}</code> でクライアントサイドの遷移</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useParams</code> で動的パラメータを取得</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"<Outlet>"}</code> でネストされたルートを構成</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">useNavigate</code> でプログラムから遷移</li>
          <li>Next.jsではファイル配置がそのままルーティングになる</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="routing" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="routing" basePath="/learn/react" color="green" />
    </div>
  );
}
