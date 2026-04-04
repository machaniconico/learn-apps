import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function ComponentsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コンポーネント</h1>
        <p className="text-gray-400">UIの部品を作って組み合わせよう</p>
      </div>

      {/* コンポーネントとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンポーネントとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">コンポーネント</strong>は、ReactにおけるUIの基本単位です。
          ボタン、ヘッダー、カード、フォームなど、UIの各パーツをコンポーネントとして定義し、
          それらを組み合わせてアプリケーション全体を構築します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Reactでは主に<strong className="text-green-400">関数コンポーネント</strong>を使います。
          これはJSXを返す関数で、名前は必ず<strong>大文字で始める</strong>のがルールです。
        </p>
      </section>

      {/* 関数コンポーネントの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">関数コンポーネントの基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          最もシンプルなコンポーネントは、JSXを返す関数です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// シンプルなコンポーネント
function Welcome() {
  return <h1>ようこそ！</h1>;
}

// アロー関数でも書ける
const Goodbye = () => {
  return <h1>さようなら！</h1>;
};

// 複数の要素を返す場合
function Header() {
  return (
    <header>
      <h1>マイアプリ</h1>
      <nav>
        <a href="/">ホーム</a>
        <a href="/about">概要</a>
      </nav>
    </header>
  );
}

// 他のコンポーネントから使う
function App() {
  return (
    <div>
      <Header />
      <Welcome />
      <Goodbye />
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          コンポーネント名は必ず大文字で始めます。小文字だとHTMLの標準タグとして扱われます。
        </p>
      </section>

      {/* コンポーネントの組み合わせ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンポーネントの組み合わせ（コンポジション）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          小さなコンポーネントを組み合わせて、大きなUIを作るのがReactの基本思想です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// 小さなコンポーネント
function Avatar() {
  return <img src="/avatar.png" alt="アバター" className="avatar" />;
}

function UserName() {
  return <span className="username">田中太郎</span>;
}

function UserBio() {
  return <p>Webエンジニア。React大好き。</p>;
}

// 小さなコンポーネントを組み合わせる
function UserCard() {
  return (
    <div className="user-card">
      <Avatar />
      <UserName />
      <UserBio />
    </div>
  );
}

// さらに組み合わせてページを作る
function ProfilePage() {
  return (
    <div className="profile-page">
      <h1>プロフィール</h1>
      <UserCard />
      <UserCard />  {/* 同じコンポーネントを何度でも使える */}
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* children */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">childrenプロパティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コンポーネントのタグの間に書いた内容は、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">children</code> として
          受け取ることができます。これにより、汎用的なレイアウトコンポーネントを作れます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// childrenを受け取るコンポーネント
function Card({ children }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      margin: "8px 0",
    }}>
      {children}
    </div>
  );
}

// レイアウトコンポーネント
function PageLayout({ children }) {
  return (
    <div className="page">
      <header>
        <h1>マイサイト</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2025 マイサイト</p>
      </footer>
    </div>
  );
}

// 使い方
function App() {
  return (
    <PageLayout>
      <Card>
        <h2>お知らせ</h2>
        <p>新機能がリリースされました。</p>
      </Card>
      <Card>
        <h2>メンテナンス</h2>
        <p>明日10時からメンテナンスを行います。</p>
      </Card>
    </PageLayout>
  );
}`}</code>
        </pre>
      </section>

      {/* ファイル分割 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファイル分割とインポート</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          実際の開発では、コンポーネントをファイルごとに分割して管理します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// --- Button.jsx ---
export default function Button({ label }) {
  return (
    <button className="btn">{label}</button>
  );
}

// --- Header.jsx ---
import Button from "./Button";

export default function Header() {
  return (
    <header>
      <h1>マイアプリ</h1>
      <Button label="ログイン" />
    </header>
  );
}

// --- App.jsx ---
import Header from "./Header";
import Button from "./Button";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>ようこそ！</h2>
        <Button label="始める" />
      </main>
    </div>
  );
}

// 名前付きエクスポートも可能
// export function Button() { ... }
// import { Button } from "./Button";`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>コンポーネントはJSXを返す関数（名前は大文字始まり）</li>
          <li>小さなコンポーネントを組み合わせてUIを構築する</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">children</code> で汎用的なラッパーコンポーネントを作れる</li>
          <li>ファイルを分割して <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">import</code> / <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">export</code> で管理する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="components" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="components" basePath="/learn/react" color="green" />
    </div>
  );
}
