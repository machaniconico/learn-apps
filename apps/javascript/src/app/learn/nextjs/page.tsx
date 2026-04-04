import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { NEXTJS_LESSONS } from "@/lib/lessons-data";

export default function NextjsLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">Next.js入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">Reactベースのフルスタックフレームワークで、本格的なWebアプリを構築しよう</p>
      </div>

      <ProgressBar categoryId="nextjs" totalLessons={6} color="purple" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={NEXTJS_LESSONS} basePath="/learn/nextjs" color="purple" />
      </section>

      {/* Next.jsとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Next.jsとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-purple-400">Next.js</strong>は、Vercel社が開発した
          Reactベースのフルスタックフレームワークです。Reactだけでは難しいサーバーサイドレンダリング（SSR）、
          静的サイト生成（SSG）、ファイルベースルーティング、APIルートなどの機能が標準で組み込まれています。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          App Routerという新しいアーキテクチャにより、Server Componentsやストリーミングなど
          最新のReact機能をフルに活用でき、高速でSEOに強いWebアプリケーションを効率的に開発できます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9889;</div>
            <h3 className="font-semibold text-white mb-1">ファイルベースルーティング</h3>
            <p className="text-sm text-gray-400">フォルダ構造がそのままURLになる直感的なルーティング</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128640;</div>
            <h3 className="font-semibold text-white mb-1">サーバーサイドレンダリング</h3>
            <p className="text-sm text-gray-400">SSR・SSG・ISRを自在に使い分けて高速表示</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128295;</div>
            <h3 className="font-semibold text-white mb-1">フルスタック開発</h3>
            <p className="text-sm text-gray-400">フロントエンドとAPIを1つのプロジェクトで管理</p>
          </div>
        </div>
      </section>

      {/* Next.jsの基本概念 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Next.jsの基本概念</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsを学ぶ前に、主要な概念を押さえましょう。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">App Router</code> — フォルダ構造でルーティングを定義</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Server Components</code> — サーバー側で実行されるコンポーネント</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">Route Handlers</code> — APIエンドポイントの作成</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">レンダリング戦略</code> — SSR、SSG、ISR、CSRの使い分け</li>
          <li><code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">データ取得</code> — サーバーでのfetchとキャッシュ制御</li>
        </ul>
      </section>

      {/* はじめてのNext.jsコード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">はじめてのNext.jsコード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsでは、<code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">app</code>ディレクトリ内に
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">page.tsx</code>ファイルを置くだけでページが作れます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>ようこそ、Next.jsへ！</h1>
      <p>はじめてのNext.jsアプリです。</p>
    </main>
  );
}`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          各レッスンで、この基本構造の上にルーティング、データ取得、API作成などの機能を積み上げていきます。
        </p>
      </section>
    </div>
  );
}
