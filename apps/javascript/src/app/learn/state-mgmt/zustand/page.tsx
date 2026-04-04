import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { STATE_MGMT_LESSONS } from "@/lib/lessons-data";

export default function ZustandLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 mb-4">状態管理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Zustand / Jotai</h1>
        <p className="text-gray-400">軽量でモダンな状態管理ライブラリを使いこなそう</p>
      </div>

      {/* Zustand の基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Zustandでストアを作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">Zustand</strong>（ドイツ語で「状態」の意味）は、
          極めてシンプルなAPIを持つ状態管理ライブラリです。
          Providerが不要で、フックベースで直感的に使えます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// store/useCounterStore.ts
import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (amount: number) => void;
}

// create でストアを作成（Providerは不要！）
const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
}));

export default useCounterStore;

// コンポーネントで使う（シンプル！）
function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <h2>カウント: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>リセット</button>
    </div>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          ReduxのようなProvider、dispatch、actionの概念が不要で、
          通常のフックのように使えるのがZustandの最大の特徴です。
        </p>
      </section>

      {/* セレクタによる最適化 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">セレクタによるパフォーマンス最適化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Zustandでは<strong className="text-purple-400">セレクタ</strong>を使って
          必要な値だけを取得できます。これにより不要な再レンダリングを防ぎます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// 大きなストアの例
interface AppState {
  user: { name: string; email: string } | null;
  theme: "light" | "dark";
  notifications: string[];
  cartItems: CartItem[];
  setUser: (user: AppState["user"]) => void;
  toggleTheme: () => void;
  addNotification: (msg: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  user: null,
  theme: "light",
  notifications: [],
  cartItems: [],
  setUser: (user) => set({ user }),
  toggleTheme: () => set((s) => ({
    theme: s.theme === "light" ? "dark" : "light",
  })),
  addNotification: (msg) => set((s) => ({
    notifications: [...s.notifications, msg],
  })),
}));

// 悪い例：ストア全体を取得（何が変わっても再レンダリング）
function BadComponent() {
  const store = useAppStore(); // 全部取得
  return <p>{store.user?.name}</p>;
}

// 良い例：セレクタで必要な値だけ取得
function GoodComponent() {
  const userName = useAppStore((state) => state.user?.name);
  // user.name が変わった時だけ再レンダリング
  return <p>{userName}</p>;
}

// 複数の値を取得する場合は shallow 比較を使う
import { shallow } from "zustand/shallow";

function UserInfo() {
  const { name, email } = useAppStore(
    (state) => ({ name: state.user?.name, email: state.user?.email }),
    shallow // オブジェクトの中身で比較（参照比較ではなく）
  );
  return <p>{name} ({email})</p>;
}`}</code>
        </pre>
      </section>

      {/* ミドルウェア */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Zustandのミドルウェア</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Zustandはミドルウェアで機能を拡張できます。
          <strong className="text-purple-400">永続化</strong>、<strong className="text-purple-400">DevTools連携</strong>、
          <strong className="text-purple-400">Immerサポート</strong>などが用意されています。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// localStorage に自動保存
const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "dark",
      language: "ja",
      setTheme: (theme) => set({ theme }),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "settings-storage", // localStorageのキー
    }
  )
);

// DevTools + Immer + Persist を組み合わせ
const useCartStore = create<CartState>()(
  devtools(
    persist(
      immer((set) => ({
        items: [],
        addItem: (product: Product) =>
          set((state) => {
            // Immerのおかげで直接変更できる
            const existing = state.items.find((i) => i.id === product.id);
            if (existing) {
              existing.quantity += 1;
            } else {
              state.items.push({ ...product, quantity: 1 });
            }
          }),
        removeItem: (id: string) =>
          set((state) => {
            state.items = state.items.filter((i) => i.id !== id);
          }),
      })),
      { name: "cart-storage" }
    ),
    { name: "CartStore" } // DevToolsでの表示名
  )
);`}</code>
        </pre>
      </section>

      {/* Jotai */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Jotaiのアトミックな状態管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">Jotai</strong>（日本語の「状態」が由来）は、
          <strong className="text-purple-400">atom</strong>（アトム）という最小単位で状態を管理するライブラリです。
          Recoilに影響を受けたボトムアップ型のアプローチが特徴です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

// プリミティブなatom（基本の状態単位）
const countAtom = atom(0);
const nameAtom = atom("太郎");
const darkModeAtom = atom(false);

// 派生atom（他のatomから計算される値）
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// 読み書きatom（カスタムの更新ロジック）
const uppercaseNameAtom = atom(
  (get) => get(nameAtom).toUpperCase(),       // getter
  (get, set, newName: string) => {             // setter
    set(nameAtom, newName.trim());
  }
);

// コンポーネントで使う
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom); // 読み取り専用

  return (
    <div>
      <p>カウント: {count}（2倍: {doubleCount}）</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}

function NameEditor() {
  const [name, setName] = useAtom(uppercaseNameAtom);
  const setDarkMode = useSetAtom(darkModeAtom); // 書き込み専用

  return (
    <div>
      <p>名前: {name}</p>
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setDarkMode((prev) => !prev)}>
        テーマ切替
      </button>
    </div>
  );
}

// 非同期atom
const userAtom = atom(async () => {
  const res = await fetch("/api/user");
  return res.json();
});

function UserProfile() {
  const [user] = useAtom(userAtom); // Suspenseと組み合わせ可能
  return <p>{user.name}</p>;
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          JotaiはReactの<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useState</code>に近い感覚で使えます。
          atomを必要な分だけ定義する「ボトムアップ」のアプローチが特徴です。
        </p>
      </section>

      {/* 比較 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Redux vs Zustand vs Jotai 比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          それぞれの特徴を比較して、プロジェクトに最適なライブラリを選びましょう。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// ========== 比較表 ==========
//
// 項目           | Redux Toolkit   | Zustand         | Jotai
// --------------|-----------------|-----------------|----------------
// バンドルサイズ  | 大きい（~11KB） | 小さい（~1KB）  | 小さい（~2KB）
// 学習コスト      | 高い            | 低い            | 低い
// ボイラープレート | やや多い        | 少ない          | 非常に少ない
// DevTools       | 強力            | 対応            | 対応
// ミドルウェア    | 豊富            | あり            | 限定的
// TypeScript     | 良好            | 良好            | 良好
// Provider       | 必要            | 不要            | 任意
// 設計アプローチ  | トップダウン     | トップダウン     | ボトムアップ
//
// 選び方の目安：
//
// Redux Toolkit を選ぶ場面：
// - 大規模アプリ、チーム開発
// - Redux DevToolsを活用したデバッグが必要
// - RTK Queryでサーバー状態も一元管理したい
// - 既存のReduxプロジェクトのマイグレーション
//
// Zustand を選ぶ場面：
// - シンプルさを重視
// - 小〜中規模アプリ
// - ボイラープレートを最小限にしたい
// - Providerなしで手軽に始めたい
//
// Jotai を選ぶ場面：
// - React的な設計が好み（atomはuseStateの拡張版）
// - 細粒度のリアクティビティが必要
// - Suspenseとの統合を活用したい
// - 派生状態（computed）を多用する`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><strong className="text-purple-400">Zustand</strong>は<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">create</code>でストアを作り、フックとして直接使える</li>
          <li>セレクタで必要な値だけ取得し、不要な再レンダリングを防ぐ</li>
          <li>persist、devtools、immerなどのミドルウェアで機能を拡張できる</li>
          <li><strong className="text-purple-400">Jotai</strong>は<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">atom</code>単位で状態を管理するボトムアップ型のアプローチ</li>
          <li>プロジェクトの規模・チーム・要件に応じて最適なライブラリを選択しよう</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="state-mgmt" lessonId="zustand" color="purple" />
      <LessonNav lessons={STATE_MGMT_LESSONS} currentId="zustand" basePath="/learn/state-mgmt" color="purple" />
    </div>
  );
}
