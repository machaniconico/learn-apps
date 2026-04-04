import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { WEBSOCKET_LESSONS } from "@/lib/lessons-data";

export default function SocketIOLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">WebSocket レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Socket.IO入門</h1>
        <p className="text-gray-400">イベント駆動のリアルタイム通信ライブラリを使いこなそう</p>
      </div>

      {/* なぜSocket.IOか */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">なぜSocket.IOを使うのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ネイティブWebSocket APIはシンプルですが、実際のアプリケーション開発では
          多くの課題があります。<strong className="text-violet-400">Socket.IO</strong>はそれらを解決してくれます。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-1">自動再接続</h3>
            <p className="text-sm text-gray-400">接続が切れた場合に自動的に再接続を試みる。ネイティブWSにはこの機能がない。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-1">イベントベース</h3>
            <p className="text-sm text-gray-400">カスタムイベント名でデータを送受信できる。メッセージの種類を簡単に区別できる。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-1">フォールバック</h3>
            <p className="text-sm text-gray-400">WebSocketが使えない環境ではHTTPロングポーリングに自動的にフォールバックする。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-1">ルーム・名前空間</h3>
            <p className="text-sm text-gray-400">グループ通信やチャネル分離の仕組みが組み込まれている。</p>
          </div>
        </div>
      </section>

      {/* サーバーセットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">サーバーのセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">socket.io</strong>パッケージをインストールして、
          Express と組み合わせてサーバーを構築します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install express socket.io
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("ユーザー接続:", socket.id);

  // クライアントからのイベントを受信
  socket.on("chat:message", (data) => {
    console.log("メッセージ:", data);
  });

  // 切断時
  socket.on("disconnect", (reason) => {
    console.log("ユーザー切断:", socket.id, reason);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket.IOサーバー起動: http://localhost:3001");
});`}</code>
        </pre>
      </section>

      {/* クライアントセットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">クライアントのセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">socket.io-client</strong>パッケージを使って、
          ブラウザからSocket.IOサーバーに接続します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install socket.io-client
import { io } from "socket.io-client";

// サーバーに接続
const socket = io("http://localhost:3001", {
  autoConnect: true,          // 自動接続
  reconnection: true,         // 自動再接続
  reconnectionAttempts: 5,    // 再接続試行回数
  reconnectionDelay: 1000,    // 再接続間隔（ミリ秒）
});

// 接続成功
socket.on("connect", () => {
  console.log("接続成功:", socket.id);
});

// 接続エラー
socket.on("connect_error", (error) => {
  console.error("接続エラー:", error.message);
});

// 切断
socket.on("disconnect", (reason) => {
  console.log("切断:", reason);
});`}</code>
        </pre>
      </section>

      {/* emit/on イベント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">emit / on でイベント通信</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Socket.IOの通信は<strong className="text-violet-400">イベント駆動</strong>です。
          <code className="text-violet-400">emit</code>でイベントを送信し、
          <code className="text-violet-400">on</code>でイベントを受信します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ===== クライアント側 =====

// イベントを送信（文字列）
socket.emit("chat:message", "こんにちは！");

// イベントを送信（オブジェクト）
socket.emit("chat:message", {
  user: "田中",
  text: "こんにちは！",
  timestamp: Date.now(),
});

// イベントを受信
socket.on("chat:message", (data) => {
  console.log(\`\${data.user}: \${data.text}\`);
});

// ===== サーバー側 =====

io.on("connection", (socket) => {
  // 特定のクライアントからのイベント受信
  socket.on("chat:message", (data) => {
    console.log("受信:", data);

    // 送信元を含む全員に送信
    io.emit("chat:message", data);
  });
});`}</code>
        </pre>
      </section>

      {/* ブロードキャスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ブロードキャスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メッセージの送信先にはいくつかのパターンがあります。
          用途に応じて使い分けましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`io.on("connection", (socket) => {

  // 1. 全員に送信（送信者を含む）
  io.emit("notification", "全員へのお知らせ");

  // 2. 送信者以外の全員に送信
  socket.broadcast.emit("notification", "他の全員へ");

  // 3. 送信者のみに送信
  socket.emit("notification", "あなただけに");

  // 4. 特定のソケットIDに送信
  io.to(targetSocketId).emit("private", "個別メッセージ");

  // 5. 複数の宛先に送信
  io.to(socketId1).to(socketId2).emit("group", "グループメッセージ");
});`}</code>
        </pre>
      </section>

      {/* Acknowledgments */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Acknowledgments（確認応答）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">Acknowledgment</strong>を使うと、
          イベントの送信後にサーバーからの応答を受け取ることができます。
          HTTPのリクエスト/レスポンスに似た挙動を実現できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ===== クライアント側 =====

// コールバックで応答を受け取る
socket.emit("chat:message", { text: "Hello!" }, (response) => {
  if (response.status === "ok") {
    console.log("メッセージ送信成功:", response.id);
  } else {
    console.error("送信失敗:", response.error);
  }
});

// async/await スタイル（Socket.IO v4.6+）
const response = await socket.emitWithAck("chat:message", {
  text: "Hello!",
});
console.log("応答:", response);

// ===== サーバー側 =====

socket.on("chat:message", (data, callback) => {
  try {
    // メッセージを保存
    const id = saveMessage(data);
    // 成功を応答
    callback({ status: "ok", id });
  } catch (error) {
    // エラーを応答
    callback({ status: "error", error: error.message });
  }
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Socket.IOは自動再接続、フォールバック、ルーム機能などを提供するライブラリ</li>
          <li>サーバーはExpress + socket.io、クライアントはsocket.io-clientで構築</li>
          <li>emit/onのイベント駆動モデルで直感的にリアルタイム通信が書ける</li>
          <li>ブロードキャストのパターンを使い分けて適切な宛先にデータを送る</li>
          <li>Acknowledgmentで送信の成功/失敗を確認できる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="websocket" lessonId="socketio" color="violet" />
      <LessonNav lessons={WEBSOCKET_LESSONS} currentId="socketio" basePath="/learn/websocket" color="violet" />
    </div>
  );
}
