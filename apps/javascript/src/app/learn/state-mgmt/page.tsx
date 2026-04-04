import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { STATE_MGMT_LESSONS } from "@/lib/lessons-data";

export default function StateMgmtLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">状態管理入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">Reactアプリケーションの状態を効率的に管理する方法を学ぼう</p>
      </div>

      <ProgressBar categoryId="state-mgmt" totalLessons={5} color="purple" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={STATE_MGMT_LESSONS} basePath="/learn/state-mgmt" color="purple" />
      </section>

      {/* 状態管理とは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">状態管理とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">状態管理</strong>とは、アプリケーション内のデータ（状態）を
          一貫した方法で管理・更新する仕組みのことです。Reactアプリが大規模になると、
          コンポーネント間でのデータ共有が複雑になり、適切な状態管理が必要になります。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、Reactの組み込み機能から外部ライブラリまで、
          さまざまな状態管理の手法を学びます。それぞれのメリット・デメリットを理解し、
          プロジェクトに最適な選択ができるようになりましょう。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128202;</div>
            <h3 className="font-semibold text-white mb-1">予測可能な状態変化</h3>
            <p className="text-sm text-gray-400">データの流れを明確にしてバグを減らす</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128260;</div>
            <h3 className="font-semibold text-white mb-1">効率的なデータ共有</h3>
            <p className="text-sm text-gray-400">props drillingを解消してコードをシンプルに</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9889;</div>
            <h3 className="font-semibold text-white mb-1">スケーラブルな設計</h3>
            <p className="text-sm text-gray-400">アプリが成長しても管理しやすい構造を維持</p>
          </div>
        </div>
      </section>

      {/* 学べること */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">このコースで学べること</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">状態管理の基本</code> &#8212; なぜ必要か、どんな問題を解決するか</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">useContext</code> &#8212; React組み込みのグローバル状態管理</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Redux Toolkit</code> &#8212; 大規模アプリのための堅牢な状態管理</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Zustand / Jotai</code> &#8212; 軽量でモダンな状態管理ライブラリ</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">総合演習</code> &#8212; ショッピングカートで実践的に学ぶ</li>
        </ul>
      </section>

      {/* 前提知識 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">前提知識</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースを始める前に、以下の知識があると学習がスムーズです。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// React の基本を理解していること
// - コンポーネント、Props、State
// - useState、useEffect フック
// - イベント処理

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      カウント: {count}
    </button>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          Reactの基礎に不安がある場合は、先にReact入門コースを受講してください。
        </p>
      </section>
    </div>
  );
}
