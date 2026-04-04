import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function ReactLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">React入門</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400">コンポーネントベースのUIライブラリで、モダンなWebアプリを構築しよう</p>
      </div>

      <ProgressBar categoryId="react" totalLessons={10} color="green" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={REACT_LESSONS} basePath="/learn/react" color="green" />
      </section>

      {/* Reactとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Reactとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">React</strong>は、Meta（旧Facebook）が開発した
          JavaScriptのUIライブラリです。「コンポーネント」という小さな部品を組み合わせて、
          複雑なユーザーインターフェースを効率的に構築できます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          仮想DOM（Virtual DOM）という仕組みにより、必要な部分だけを効率的に更新するため、
          高速でスムーズなUIを実現できます。現在、世界中の多くのWebアプリケーションで採用されています。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9889;</div>
            <h3 className="font-semibold text-white mb-1">コンポーネント指向</h3>
            <p className="text-sm text-gray-400">UIを再利用可能な部品に分割して開発</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128260;</div>
            <h3 className="font-semibold text-white mb-1">宣言的UI</h3>
            <p className="text-sm text-gray-400">状態に応じてUIが自動的に更新される</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#127760;</div>
            <h3 className="font-semibold text-white mb-1">巨大なエコシステム</h3>
            <p className="text-sm text-gray-400">Next.js、React Nativeなど豊富な周辺ツール</p>
          </div>
        </div>
      </section>

      {/* Reactの基本概念 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Reactの基本概念</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Reactを学ぶ前に、主要な概念を押さえましょう。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">JSX</code> — HTMLに似た構文でUIを記述する</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">コンポーネント</code> — UIの再利用可能な部品</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Props</code> — 親から子へデータを渡す仕組み</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">State</code> — コンポーネント内部の状態管理</li>
          <li><code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Hooks</code> — 関数コンポーネントで状態や副作用を扱う仕組み</li>
        </ul>
      </section>

      {/* 最初のReactコード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">最初のReactコード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Reactでは、関数がUIの部品（コンポーネント）になります。以下は最もシンプルなReactコンポーネントです。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`function App() {
  return (
    <div>
      <h1>こんにちは、React！</h1>
      <p>はじめてのReactアプリです。</p>
    </div>
  );
}

export default App;`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          各レッスンで、この基本構造の上にさまざまな機能を積み上げていきます。
        </p>
      </section>
    </div>
  );
}
