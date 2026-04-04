import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { STATE_MGMT_LESSONS } from "@/lib/lessons-data";

export default function ContextLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">状態管理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">useContext</h1>
        <p className="text-gray-400">React組み込みのグローバル状態管理を使いこなそう</p>
      </div>

      {/* createContext */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">createContextでコンテキストを作る</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">Context</strong>は、Props Drillingを解消するReact組み込みの仕組みです。
          まず<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">createContext</code>でコンテキストを作成します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { createContext } from "react";

// 型定義（TypeScript）
interface User {
  name: string;
  email: string;
  avatar: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// コンテキストを作成（デフォルト値を指定）
const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export default UserContext;`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">createContext</code>にはデフォルト値を渡します。
          TypeScriptではジェネリクスで型を指定すると安全です。
        </p>
      </section>

      {/* Provider パターン */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Providerパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">Provider</strong>はコンテキストの値を子コンポーネントに提供するラッパーです。
          Providerの中にあるすべてのコンポーネントがコンテキストの値にアクセスできます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useState, ReactNode } from "react";
import UserContext from "./UserContext";

// Providerコンポーネント
function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// アプリのルートでProviderを配置
function App() {
  return (
    <UserProvider>
      <Header />
      <MainContent />
      <Footer />
    </UserProvider>
  );
}

// UserProviderの中にある全コンポーネントが
// user, login, logout にアクセスできる`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          Providerの<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">value</code>に渡したオブジェクトが、
          子孫コンポーネントから参照できるようになります。
        </p>
      </section>

      {/* useContext フック */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">useContextフックで値を取得</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          子コンポーネントでは<strong className="text-purple-400">useContext</strong>フックを使って
          コンテキストの値を取得します。Propsを経由せず、どの階層からでも直接アクセスできます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { useContext } from "react";
import UserContext from "./UserContext";

// カスタムフックにするとさらに便利
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// 使用例：ヘッダーコンポーネント
function Header() {
  const { user, logout } = useUser();

  return (
    <header>
      {user ? (
        <div>
          <span>こんにちは、{user.name}さん</span>
          <button onClick={logout}>ログアウト</button>
        </div>
      ) : (
        <button>ログイン</button>
      )}
    </header>
  );
}

// 使用例：プロフィールページ（深い階層でも直接アクセス）
function ProfilePage() {
  const { user } = useUser();

  if (!user) return <p>ログインしてください</p>;

  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          カスタムフック（<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useUser</code>）にまとめると、
          エラーチェックの重複を避け、使い勝手が良くなります。
        </p>
      </section>

      {/* 複数のContextを組み合わせる */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数のContextを組み合わせる</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関心事ごとにContextを分離すると、コードが整理されます。
          複数のProviderをネストして使います。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// テーマ用のContext
const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggleTheme: () => void;
}>({ theme: "light", toggleTheme: () => {} });

// 言語用のContext
const LanguageContext = createContext<{
  lang: "ja" | "en";
  setLang: (lang: "ja" | "en") => void;
}>({ lang: "ja", setLang: () => {} });

// 複数のProviderをネスト
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <MainApp />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

// Providerが増えたら統合するヘルパーも作れる
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}`}</code>
        </pre>
      </section>

      {/* Contextの限界 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Contextの限界と注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Contextは強力ですが、万能ではありません。以下の点に注意しましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// 問題1: 不要な再レンダリング
// Contextの値が変わると、useContextを使っている
// 全コンポーネントが再レンダリングされる

const AppContext = createContext({
  user: null,
  theme: "light",
  notifications: [],
});

// user だけ変わっても、theme や notifications を
// 使っているコンポーネントも再レンダリングされる！

// 対策: Contextを分割する
const UserContext = createContext(null);    // ユーザー用
const ThemeContext = createContext("light"); // テーマ用
const NotifContext = createContext([]);      // 通知用

// 問題2: 頻繁な更新には不向き
// アニメーション、マウス位置、テキスト入力のリアルタイム追跡など
// 高頻度の更新にはContextは向かない → Zustandなどを検討

// Contextが適切なケース：
// ✅ テーマ（ダーク/ライト切り替え）
// ✅ ログインユーザー情報
// ✅ 言語設定
// ✅ ルーティング情報

// 外部ライブラリが適切なケース：
// ✅ 頻繁に更新されるデータ
// ✅ 複雑な状態遷移ロジック
// ✅ ミドルウェア（ログ、永続化）が必要
// ✅ 大規模なチーム開発`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">createContext</code>でコンテキストを作成し、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Provider</code>で値を提供する</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useContext</code>フックで、どの階層からでもコンテキストの値にアクセスできる</li>
          <li>カスタムフックにまとめるとエラーチェックが統一でき、使い勝手が向上する</li>
          <li>関心事ごとにContextを分割すると不要な再レンダリングを防げる</li>
          <li>頻繁な更新や複雑な状態ロジックには外部ライブラリの方が適している</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="state-mgmt" lessonId="context" color="purple" />
      <LessonNav lessons={STATE_MGMT_LESSONS} currentId="context" basePath="/learn/state-mgmt" color="purple" />
    </div>
  );
}
