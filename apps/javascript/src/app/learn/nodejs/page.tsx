import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { NODEJS_LESSONS } from "@/lib/lessons-data";

export default function NodejsLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">Node.js入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">JavaScriptでサーバーサイド開発を学び、Webアプリのバックエンドを構築しよう</p>
      </div>

      <ProgressBar categoryId="nodejs" totalLessons={6} color="red" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={NODEJS_LESSONS} basePath="/learn/nodejs" color="red" />
      </section>

      {/* Node.jsとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Node.jsとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">Node.js</strong>は、ChromeのV8 JavaScriptエンジン上に構築された
          サーバーサイドのJavaScript実行環境です。ブラウザの外でJavaScriptを実行でき、
          Webサーバー、API、CLIツール、リアルタイムアプリケーションなどを構築できます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          非同期I/Oとイベント駆動アーキテクチャにより、大量の同時接続を効率的に処理できます。
          npmという世界最大のパッケージエコシステムにより、豊富なライブラリを活用できます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9889;</div>
            <h3 className="font-semibold text-white mb-1">高速な非同期I/O</h3>
            <p className="text-sm text-gray-400">イベントループによる効率的な並行処理</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128230;</div>
            <h3 className="font-semibold text-white mb-1">巨大なnpmエコシステム</h3>
            <p className="text-sm text-gray-400">200万以上のパッケージで開発を加速</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#127760;</div>
            <h3 className="font-semibold text-white mb-1">フルスタックJS</h3>
            <p className="text-sm text-gray-400">フロントもバックも同じ言語で開発</p>
          </div>
        </div>
      </section>

      {/* Node.jsの基本概念 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Node.jsの基本概念</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsを学ぶ前に、主要な概念を押さえましょう。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">イベントループ</code> — 非同期処理を効率的に管理する仕組み</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">モジュール</code> — コードを分割して再利用する仕組み</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">npm</code> — パッケージ管理ツールとレジストリ</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Express</code> — 最も人気のあるWebフレームワーク</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">ミドルウェア</code> — リクエスト処理のパイプライン</li>
        </ul>
      </section>

      {/* 最初のNode.jsコード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">最初のNode.jsコード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsでは、数行のコードでHTTPサーバーを作成できます。以下は最もシンプルなサーバーの例です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Node.js!');
});

server.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});`}</code>
        </pre>
        <p className="text-gray-400 text-sm mt-3">
          各レッスンで、この基本構造の上にさまざまな機能を積み上げていきます。
        </p>
      </section>
    </div>
  );
}
