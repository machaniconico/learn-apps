import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NODEJS_LESSONS } from "@/lib/lessons-data";

export default function NodejsModulesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">Node.js レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モジュールシステム</h1>
        <p className="text-gray-400">CommonJS、ESModules、npmでコードを整理しよう</p>
      </div>

      {/* CommonJSモジュール */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">CommonJS（require / module.exports）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsのデフォルトのモジュールシステムは<strong className="text-red-400">CommonJS</strong>です。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">require()</code>で他のファイルを読み込み、
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">module.exports</code>で公開します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === math.js（モジュールを作成） ===
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

// 複数の関数をエクスポート
module.exports = { add, subtract, multiply };

// または個別にエクスポート
// exports.add = add;
// exports.subtract = subtract;

// === app.js（モジュールを使用） ===
const math = require('./math');

console.log(math.add(2, 3));       // 5
console.log(math.subtract(10, 4)); // 6
console.log(math.multiply(3, 7));  // 21

// 分割代入で必要な関数だけ取り出す
const { add, multiply } = require('./math');
console.log(add(1, 2));      // 3
console.log(multiply(4, 5)); // 20`}</code>
        </pre>
      </section>

      {/* ESModules */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ESModules（import / export）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          モダンなJavaScriptでは<strong className="text-red-400">ESModules</strong>が標準です。
          Node.jsでESModulesを使うには、ファイル拡張子を<code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">.mjs</code>にするか、
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">package.json</code>に
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">&quot;type&quot;: &quot;module&quot;</code>を追加します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === utils.mjs（名前付きエクスポート） ===
export function formatDate(date) {
  return date.toLocaleDateString('ja-JP');
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// デフォルトエクスポート
export default class Logger {
  log(message) {
    console.log(\`[\${new Date().toISOString()}] \${message}\`);
  }
}

// === app.mjs（モジュールを使用） ===
// デフォルトインポート + 名前付きインポート
import Logger, { formatDate, capitalize } from './utils.mjs';

const logger = new Logger();
logger.log('アプリ起動');

console.log(formatDate(new Date()));  // 2026/3/29
console.log(capitalize('hello'));      // Hello

// すべてをまとめてインポート
import * as utils from './utils.mjs';
console.log(utils.formatDate(new Date()));`}</code>
        </pre>
        <div className="mt-4 p-4 rounded-lg bg-gray-800 border border-gray-700">
          <h3 className="font-semibold text-white mb-2">CommonJS vs ESModules</h3>
          <ul className="text-gray-300 list-disc list-inside space-y-1 text-sm">
            <li><code className="text-red-400">require()</code>は同期的に読み込む / <code className="text-red-400">import</code>は非同期的</li>
            <li><code className="text-red-400">require()</code>は条件分岐内で使える / <code className="text-red-400">import</code>はトップレベルのみ</li>
            <li>ESModulesはTree Shaking（未使用コードの除去）に対応</li>
            <li>新しいプロジェクトではESModulesが推奨</li>
          </ul>
        </div>
      </section>

      {/* 組み込みモジュール */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">組み込みモジュール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsにはインストール不要で使える<strong className="text-red-400">組み込みモジュール</strong>が
          多数用意されています。ファイル操作、パス操作、HTTP通信など、サーバー開発に必要な機能が揃っています。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// fs: ファイルシステム操作
const fs = require('fs');

// ファイルの読み書き
fs.writeFileSync('hello.txt', 'こんにちは！');
const content = fs.readFileSync('hello.txt', 'utf8');
console.log(content); // こんにちは！

// path: パス操作
const path = require('path');

console.log(path.join('/users', 'docs', 'file.txt'));
// => /users/docs/file.txt
console.log(path.basename('/users/docs/file.txt'));
// => file.txt
console.log(path.extname('image.png'));
// => .png

// os: OS情報
const os = require('os');

console.log(os.platform());  // darwin / linux / win32
console.log(os.homedir());   // /Users/username
console.log(os.cpus().length); // CPUコア数

// url: URL解析
const { URL } = require('url');

const myUrl = new URL('https://example.com/path?name=taro&age=25');
console.log(myUrl.hostname);              // example.com
console.log(myUrl.pathname);              // /path
console.log(myUrl.searchParams.get('name')); // taro`}</code>
        </pre>
      </section>

      {/* npm入門 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">npm入門</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">npm（Node Package Manager）</strong>は、Node.jsのパッケージ管理ツールです。
          世界中の開発者が公開したライブラリを簡単にインストールして使えます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# プロジェクトの初期化（package.json を生成）
$ npm init -y

# パッケージのインストール
$ npm install express        # 本番用の依存関係
$ npm install -D nodemon     # 開発用の依存関係（-D = --save-dev）

# グローバルインストール（CLIツール等）
$ npm install -g typescript

# パッケージの削除
$ npm uninstall express

# インストール済みパッケージの更新
$ npm update

# 脆弱性チェック
$ npm audit`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4 mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">package.json</code>は
          プロジェクトの設定ファイルです。依存関係やスクリプトが記録されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`{
  "name": "my-app",
  "version": "1.0.0",
  "description": "私のNode.jsアプリ",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^29.7.0"
  }
}`}</code>
        </pre>
      </section>

      {/* 人気のnpmパッケージ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">人気のnpmパッケージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsの強みは豊富なエコシステムです。よく使われるパッケージを紹介します。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">Webフレームワーク</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li><code className="text-red-400">express</code> — 定番のWebフレームワーク</li>
              <li><code className="text-red-400">fastify</code> — 高速なWebフレームワーク</li>
              <li><code className="text-red-400">koa</code> — Express作者の新フレームワーク</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">データベース</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li><code className="text-red-400">prisma</code> — モダンなORM</li>
              <li><code className="text-red-400">mongoose</code> — MongoDB用ODM</li>
              <li><code className="text-red-400">pg</code> — PostgreSQLクライアント</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">ユーティリティ</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li><code className="text-red-400">dotenv</code> — 環境変数の管理</li>
              <li><code className="text-red-400">zod</code> — バリデーション</li>
              <li><code className="text-red-400">dayjs</code> — 日付操作</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">開発ツール</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li><code className="text-red-400">nodemon</code> — ファイル変更時に自動再起動</li>
              <li><code className="text-red-400">jest</code> — テストフレームワーク</li>
              <li><code className="text-red-400">eslint</code> — コードの静的解析</li>
            </ul>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>CommonJS（<code className="text-red-400">require/module.exports</code>）はNode.jsのデフォルトモジュール形式</li>
          <li>ESModules（<code className="text-red-400">import/export</code>）はモダンなJavaScript標準で、新規プロジェクトに推奨</li>
          <li><code className="text-red-400">fs</code>、<code className="text-red-400">path</code>、<code className="text-red-400">os</code>などの組み込みモジュールはインストール不要で使える</li>
          <li>npmでパッケージを管理し、<code className="text-red-400">package.json</code>で依存関係を記録する</li>
          <li><code className="text-red-400">node_modules</code>フォルダにはインストールしたパッケージが保存される（Gitには含めない）</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nodejs" lessonId="modules" color="red" />
      <LessonNav lessons={NODEJS_LESSONS} currentId="modules" basePath="/learn/nodejs" color="red" />
    </div>
  );
}
