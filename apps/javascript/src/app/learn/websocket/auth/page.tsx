import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { WEBSOCKET_LESSONS } from "@/lib/lessons-data";

export default function AuthLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">WebSocket レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">認証とエラー処理</h1>
        <p className="text-gray-400">接続時の認証、再接続戦略、エラーハンドリングを学ぼう</p>
      </div>

      {/* JWT認証 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">JWT認証で接続を保護する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WebSocket接続は長時間維持されるため、<strong className="text-violet-400">接続時に認証</strong>を
          行うことが重要です。JWTトークンを使って認証する一般的なパターンを見ていきましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ===== クライアント側 =====

import { io } from "socket.io-client";

// JWTトークンを接続時に送信
const socket = io("http://localhost:3001", {
  auth: {
    token: localStorage.getItem("jwt_token"),
  },
});

// 認証エラーの処理
socket.on("connect_error", (error) => {
  if (error.message === "authentication_error") {
    console.error("認証に失敗しました。再ログインしてください");
    // ログインページにリダイレクト
    window.location.href = "/login";
  }
});`}</code>
        </pre>
      </section>

      {/* Socket.IOミドルウェア */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Socket.IOミドルウェア</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Socket.IOの<strong className="text-violet-400">ミドルウェア</strong>を使うと、
          接続の前にJWTの検証やログ記録などの処理を差し込めます。
          Expressのミドルウェアと同じ考え方です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`import jwt from "jsonwebtoken";

// 認証ミドルウェア
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("authentication_error"));
  }

  try {
    // JWTを検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ソケットにユーザー情報を付与
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error("authentication_error"));
  }
});

// ログ記録ミドルウェア
io.use((socket, next) => {
  console.log(\`接続試行: \${socket.handshake.address}\`);
  console.log(\`ユーザー: \${socket.data.user?.name}\`);
  next();
});

// 認証済みユーザーの接続処理
io.on("connection", (socket) => {
  const user = socket.data.user;
  console.log(\`認証済み接続: \${user.name} (\${user.id})\`);

  // ユーザー固有のルームに自動参加
  socket.join(\`user:\${user.id}\`);

  socket.on("chat:message", (data) => {
    // socket.data.user から認証済みユーザー情報を使える
    io.emit("chat:message", {
      ...data,
      user: user.name,
      userId: user.id,
    });
  });
});`}</code>
        </pre>
      </section>

      {/* 再接続戦略 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">再接続戦略</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ネットワークの不安定さに対応するため、
          <strong className="text-violet-400">再接続戦略</strong>を適切に設定することが重要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`const socket = io("http://localhost:3001", {
  // 再接続の設定
  reconnection: true,            // 自動再接続を有効化
  reconnectionAttempts: 10,      // 最大試行回数
  reconnectionDelay: 1000,       // 初回の待機時間（ミリ秒）
  reconnectionDelayMax: 30000,   // 最大待機時間（ミリ秒）
  randomizationFactor: 0.5,      // ランダム化係数

  // タイムアウト設定
  timeout: 10000,                // 接続タイムアウト
});

// 再接続イベント
socket.io.on("reconnect_attempt", (attempt) => {
  console.log(\`再接続試行 \${attempt} 回目...\`);

  // トークンの更新が必要な場合
  socket.auth.token = getLatestToken();
});

socket.io.on("reconnect", (attempt) => {
  console.log(\`再接続成功！(\${attempt} 回目で成功)\`);

  // 再接続後にデータを再取得
  socket.emit("sync:request", {
    lastEventId: getLastEventId(),
  });
});

socket.io.on("reconnect_failed", () => {
  console.error("再接続に失敗しました");
  showReconnectButton(); // 手動再接続ボタンを表示
});

// 手動で再接続
function manualReconnect() {
  socket.connect();
}`}</code>
        </pre>
      </section>

      {/* エラーハンドリング */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">エラーハンドリング</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WebSocket通信では様々なエラーが発生し得ます。
          <strong className="text-violet-400">適切なエラーハンドリング</strong>で
          ユーザー体験を損なわないようにしましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ===== クライアント側のエラーハンドリング =====

// 接続エラー
socket.on("connect_error", (error) => {
  switch (error.message) {
    case "authentication_error":
      handleAuthError();
      break;
    case "rate_limit":
      handleRateLimit();
      break;
    default:
      console.error("接続エラー:", error.message);
  }
});

// サーバーからのエラーイベント
socket.on("error", (data) => {
  console.error("サーバーエラー:", data.message);
  showErrorNotification(data.message);
});

// ===== サーバー側のエラーハンドリング =====

io.on("connection", (socket) => {
  socket.on("chat:message", (data, callback) => {
    try {
      // バリデーション
      if (!data.text || data.text.length > 1000) {
        throw new Error("メッセージが不正です");
      }

      // 処理実行
      const result = processMessage(data);
      callback({ status: "ok", result });
    } catch (error) {
      // エラーを送信者に通知
      callback({ status: "error", message: error.message });

      // ログに記録
      console.error(\`エラー [\${socket.id}]: \${error.message}\`);
    }
  });

  // 予期しないエラーのキャッチ
  socket.on("error", (error) => {
    console.error(\`ソケットエラー [\${socket.id}]:\`, error);
  });
});`}</code>
        </pre>
      </section>

      {/* ハートビート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ハートビート（Ping/Pong）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">ハートビート</strong>は、
          接続が生きているかどうかを定期的に確認する仕組みです。
          Socket.IOには自動ハートビートが組み込まれていますが、カスタマイズも可能です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ===== サーバー側の設定 =====

const io = new Server(httpServer, {
  // ハートビート設定
  pingInterval: 25000,   // Pingを送信する間隔（ミリ秒）
  pingTimeout: 20000,    // Pongの応答を待つタイムアウト
});

// ===== カスタムハートビート =====

io.on("connection", (socket) => {
  let isAlive = true;

  // クライアントからのPongを受信
  socket.on("pong:custom", () => {
    isAlive = true;
  });

  // 定期的にPingを送信
  const heartbeat = setInterval(() => {
    if (!isAlive) {
      console.log(\`応答なし: \${socket.id} を切断\`);
      socket.disconnect(true);
      return;
    }

    isAlive = false;
    socket.emit("ping:custom");
  }, 30000);

  socket.on("disconnect", () => {
    clearInterval(heartbeat);
  });
});

// ===== クライアント側 =====

socket.on("ping:custom", () => {
  socket.emit("pong:custom");
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>WebSocket接続時にJWTトークンで認証し、不正なアクセスを防ぐ</li>
          <li>Socket.IOミドルウェアで認証・ログ記録などの共通処理を差し込める</li>
          <li>再接続戦略を適切に設定し、ネットワーク不安定時のUXを向上させる</li>
          <li>クライアント・サーバー両方でエラーハンドリングを実装する</li>
          <li>ハートビートで接続の生存確認を行い、切断を検知する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="websocket" lessonId="auth" color="violet" />
      <LessonNav lessons={WEBSOCKET_LESSONS} currentId="auth" basePath="/learn/websocket" color="violet" />
    </div>
  );
}
