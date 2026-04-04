import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { STATE_MGMT_LESSONS } from "@/lib/lessons-data";

export default function StateMgmtBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">状態管理 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">状態管理の基本</h1>
        <p className="text-gray-400">なぜ状態管理が必要なのか？問題と解決策を理解しよう</p>
      </div>

      {/* なぜ状態管理が必要か */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜ状態管理が必要か？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          小さなReactアプリでは、<strong className="text-purple-400">useState</strong>だけで十分に状態を管理できます。
          しかし、アプリが大きくなると次のような問題が発生します。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
          <li>複数のコンポーネントで同じデータを共有したい</li>
          <li>状態の更新ロジックが複雑になる</li>
          <li>データの流れが追いにくくなる</li>
          <li>コンポーネントの再レンダリングが増えてパフォーマンスが低下する</li>
        </ul>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// 小さなアプリ：useStateで十分
function SimpleApp() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

// 大きなアプリ：状態の共有が複雑になる
// ユーザー情報、テーマ、通知、カートの中身...
// これらを複数のページ・コンポーネントで共有するには？`}</code>
        </pre>
      </section>

      {/* Props Drilling問題 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Props Drilling問題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">Props Drilling</strong>とは、深くネストされたコンポーネントにデータを渡すために、
          中間のコンポーネントが不要なpropsをバケツリレーのように受け渡す問題です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// Props Drilling の悪い例
// App → Layout → Sidebar → UserMenu → Avatar
// userデータが4階層も受け渡される

function App() {
  const [user, setUser] = useState({ name: "太郎", avatar: "/img.png" });
  return <Layout user={user} />;        // 1階層目
}

function Layout({ user }) {
  return (
    <div>
      <Sidebar user={user} />           {/* 2階層目（Layoutはuserを使わない） */}
      <main>コンテンツ</main>
    </div>
  );
}

function Sidebar({ user }) {
  return <UserMenu user={user} />;      {/* 3階層目（Sidebarもuserを使わない） */}
}

function UserMenu({ user }) {
  return <Avatar src={user.avatar} />;  {/* 4階層目：やっと使う */}
}

function Avatar({ src }) {
  return <img src={src} alt="avatar" />;
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          LayoutやSidebarは<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">user</code>を使わないのに、
          下の階層に渡すためだけにpropsを受け取っています。これがProps Drillingです。
        </p>
      </section>

      {/* Lifting State Up */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Lifting State Up（状態の引き上げ）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          複数のコンポーネントで状態を共有する最も基本的な方法が
          <strong className="text-purple-400">Lifting State Up</strong>（状態の引き上げ）です。
          共通の親コンポーネントに状態を配置し、子コンポーネントにpropsとして渡します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// 状態の引き上げの例
// 2つの入力フィールドの値を同期させる

function TemperatureConverter() {
  // 共通の親で状態を管理
  const [celsius, setCelsius] = useState(0);

  const fahrenheit = celsius * 9 / 5 + 32;

  return (
    <div>
      <TemperatureInput
        label="摂氏（°C）"
        value={celsius}
        onChange={(val) => setCelsius(val)}
      />
      <TemperatureInput
        label="華氏（°F）"
        value={fahrenheit}
        onChange={(val) => setCelsius((val - 32) * 5 / 9)}
      />
    </div>
  );
}

function TemperatureInput({ label, value, onChange }) {
  return (
    <label>
      {label}:
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          状態の引き上げはシンプルですが、コンポーネント階層が深くなるとProps Drillingにつながります。
        </p>
      </section>

      {/* グローバル状態が必要なとき */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">グローバル状態が必要なとき</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべての状態をグローバルにする必要はありません。
          以下の基準で<strong className="text-purple-400">ローカル状態</strong>と
          <strong className="text-purple-400">グローバル状態</strong>を使い分けましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// ローカル状態（useState）で十分なケース
// - フォームの入力値
// - モーダルの開閉状態
// - ドロップダウンの選択値
// - アコーディオンの展開状態

function SearchBar() {
  const [query, setQuery] = useState(""); // ローカルで十分
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

// グローバル状態が必要なケース
// - ログインユーザー情報（多くのコンポーネントで参照）
// - テーマ設定（ダーク/ライトモード）
// - 言語設定（i18n）
// - ショッピングカートの中身
// - 通知の一覧

// 判断基準：
// 1. 複数の離れたコンポーネントが同じデータを必要とする
// 2. ページ遷移しても状態を保持したい
// 3. Props Drillingが3階層以上になる`}</code>
        </pre>
      </section>

      {/* 状態管理ソリューションの全体像 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">状態管理ソリューションの全体像</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Reactの状態管理には多くの選択肢があります。それぞれの特徴を把握しましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// 1. React組み込み
//    useState    → コンポーネントローカルの状態
//    useReducer  → 複雑なローカル状態
//    useContext  → 軽量なグローバル状態

// 2. 外部ライブラリ（中〜大規模向け）
//    Redux Toolkit → 最も採用実績が多い、強力なDevTools
//    Zustand       → 軽量でシンプル、ボイラープレート少ない
//    Jotai         → アトミックな状態管理、React的な設計
//    Recoil        → Meta製、実験的（開発停滞中）

// 3. サーバー状態管理
//    TanStack Query（React Query） → API通信の状態管理
//    SWR                          → Vercel製、シンプル
//    RTK Query                    → Redux Toolkitの一部

// 選び方の目安：
// 小規模アプリ       → useState + useContext
// 中規模アプリ       → Zustand or Jotai
// 大規模・チーム開発  → Redux Toolkit
// API通信がメイン    → TanStack Query + 軽量な状態管理`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>アプリが大きくなると<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useState</code>だけでは管理が難しくなる</li>
          <li><strong className="text-purple-400">Props Drilling</strong>は中間コンポーネントが不要なpropsを受け渡す問題</li>
          <li><strong className="text-purple-400">Lifting State Up</strong>は状態共有の基本だが、深い階層では限界がある</li>
          <li>グローバル状態は「複数の離れたコンポーネントが同じデータを必要とする」場合に使う</li>
          <li>useContext、Redux Toolkit、Zustand、Jotaiなど目的に応じた選択肢がある</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="state-mgmt" lessonId="basics" color="purple" />
      <LessonNav lessons={STATE_MGMT_LESSONS} currentId="basics" basePath="/learn/state-mgmt" color="purple" />
    </div>
  );
}
