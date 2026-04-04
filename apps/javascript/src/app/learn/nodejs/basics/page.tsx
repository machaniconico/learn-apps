import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { NODEJS_LESSONS } from "@/lib/lessons-data";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "Node.jsが使用しているJavaScriptエンジンはどれ？",
    options: ["SpiderMonkey", "V8", "JavaScriptCore", "Chakra"],
    answer: 1,
    explanation: "Node.jsはGoogle Chromeで使われているV8エンジンをベースにしています。V8はJavaScriptを直接マシンコードにコンパイル（JIT）します。",
  },
  {
    question: "Node.jsの最大の特徴はどれ？",
    options: [
      "マルチスレッドによる並列処理",
      "非同期・ノンブロッキングI/O",
      "GUIアプリケーションの開発",
      "静的型付けのサポート",
    ],
    answer: 1,
    explanation: "Node.jsはシングルスレッドでイベントループを使い、非同期・ノンブロッキングI/Oにより大量の同時接続を効率的に処理します。",
  },
  {
    question: "Node.jsでカレントディレクトリの絶対パスを取得するグローバル変数はどれ？",
    options: ["process.cwd()", "__dirname", "__filepath", "global.path"],
    answer: 1,
    explanation: "__dirname は現在のファイルがあるディレクトリの絶対パスを返すNode.js固有のグローバル変数です。process.cwd()はプロセスの作業ディレクトリを返します。",
  },
];

export default function NodejsBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 mb-4">Node.js レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Node.jsの基本</h1>
        <p className="text-gray-400">サーバーサイドJavaScriptの世界へようこそ</p>
      </div>

      {/* Node.jsとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Node.jsとは何か？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsは、GoogleのV8 JavaScriptエンジンをベースにした、サーバーサイドのJavaScript実行環境です。
          2009年にRyan Dahlによって開発されました。ブラウザでしか動かなかったJavaScriptを、
          サーバーやコマンドラインでも実行できるようにした革命的なプラットフォームです。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsの特徴は、<strong className="text-red-400">非同期・ノンブロッキングI/O</strong>モデルです。
          従来のサーバー（Apache等）はリクエストごとにスレッドを生成しますが、
          Node.jsはシングルスレッドでイベントループを使い、大量の同時接続を効率的に処理します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// Node.jsのバージョン確認
// ターミナルで実行:
// $ node --version
// v20.11.0

// Node.jsの対話モード（REPL）を起動:
// $ node
// > 1 + 2
// 3
// > 'Hello' + ' World'
// 'Hello World'
// > .exit`}</code>
        </pre>
      </section>

      {/* V8エンジンとイベントループ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">V8エンジンとイベントループ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">V8エンジン</strong>は、Google Chromeで使われている
          高速なJavaScriptエンジンです。JavaScriptコードを直接マシンコードにコンパイル（JIT）するため、
          非常に高いパフォーマンスを発揮します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">イベントループ</strong>は、Node.jsの心臓部です。
          シングルスレッドでありながら、非同期I/O操作をキューで管理し、
          完了した処理のコールバックを順次実行していきます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// イベントループの動作を理解する例
console.log('1: 同期処理 - 最初に実行');

setTimeout(() => {
  console.log('2: タイマー - イベントループで後から実行');
}, 0);

Promise.resolve().then(() => {
  console.log('3: マイクロタスク - タイマーより先に実行');
});

console.log('4: 同期処理 - 2番目に実行');

// 出力順序:
// 1: 同期処理 - 最初に実行
// 4: 同期処理 - 2番目に実行
// 3: マイクロタスク - タイマーより先に実行
// 2: タイマー - イベントループで後から実行`}</code>
        </pre>
      </section>

      {/* ノンブロッキングI/O */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ノンブロッキングI/O</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsの最大の特徴は、I/O操作（ファイル読み書き、ネットワーク通信、データベースアクセス）が
          <strong className="text-red-400">ノンブロッキング</strong>であることです。
          処理の完了を待たずに次の処理に進み、完了時にコールバックで結果を受け取ります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`const fs = require('fs');

// ブロッキング（同期）- 読み込みが完了するまで次に進めない
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
console.log('同期: ファイル読み込み後に実行');

// ノンブロッキング（非同期）- 読み込み中も次の処理に進める
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('エラー:', err.message);
    return;
  }
  console.log(data);
});
console.log('非同期: ファイル読み込み前に実行される！');

// async/await を使ったモダンな書き方
const fsPromises = require('fs').promises;

async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('エラー:', err.message);
  }
}`}</code>
        </pre>
      </section>

      {/* スクリプトの実行とREPL */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スクリプトの実行とREPL</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsでJavaScriptを実行するには、主に2つの方法があります。
          <strong className="text-red-400">スクリプトファイルの実行</strong>と、
          <strong className="text-red-400">REPL（対話モード）</strong>です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// === スクリプトファイルの実行 ===
// app.js を作成して実行する

// app.js
function greet(name) {
  return \`こんにちは、\${name}さん！\`;
}

const message = greet('太郎');
console.log(message);  // こんにちは、太郎さん！

// ターミナルで実行:
// $ node app.js
// こんにちは、太郎さん！

// === REPL（Read-Eval-Print Loop） ===
// ターミナルで 'node' と入力すると対話モードに入る
// $ node
// > const x = 10;
// undefined
// > x * 2
// 20
// > [1, 2, 3].map(n => n ** 2)
// [ 1, 4, 9 ]
// > .help     // コマンド一覧
// > .exit     // 終了`}</code>
        </pre>
      </section>

      {/* グローバルオブジェクト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">グローバルオブジェクト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Node.jsには、ブラウザの<code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">window</code>の代わりに、
          サーバーサイド固有のグローバルオブジェクトが用意されています。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// __dirname: 現在のファイルがあるディレクトリの絶対パス
console.log(__dirname);
// 例: /Users/user/projects/my-app

// __filename: 現在のファイルの絶対パス
console.log(__filename);
// 例: /Users/user/projects/my-app/app.js

// process: Node.jsプロセスの情報と制御
console.log(process.version);    // v20.11.0
console.log(process.platform);   // darwin, linux, win32
console.log(process.cwd());      // カレントディレクトリ
console.log(process.env.HOME);   // 環境変数にアクセス
console.log(process.argv);       // コマンドライン引数

// process.exit() でプロセスを終了
// process.exit(0);  // 正常終了
// process.exit(1);  // エラー終了

// global: グローバルオブジェクト（ブラウザのwindowに相当）
console.log(global === globalThis); // true

// console: おなじみのコンソール出力
console.log('通常のログ');
console.error('エラーログ');
console.warn('警告ログ');
console.time('timer');
// ...処理...
console.timeEnd('timer'); // timer: 〇〇ms

// Buffer: バイナリデータを扱う
const buf = Buffer.from('こんにちは', 'utf8');
console.log(buf);           // <Buffer e3 81 93 ...>
console.log(buf.toString()); // こんにちは`}</code>
        </pre>
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="red" />
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Node.jsはV8エンジン上で動くサーバーサイドJavaScript実行環境</li>
          <li>イベントループとノンブロッキングI/Oにより、高い並行処理性能を持つ</li>
          <li>同期処理と非同期処理の違いを理解することが重要</li>
          <li><code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">process</code>、<code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">__dirname</code>、<code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">Buffer</code>などNode.js固有のグローバルオブジェクトがある</li>
          <li>REPLで気軽に試し、スクリプトファイルで本格的なアプリを構築する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="nodejs" lessonId="basics" color="red" />
      <LessonNav lessons={NODEJS_LESSONS} currentId="basics" basePath="/learn/nodejs" color="red" />
    </div>
  );
}
