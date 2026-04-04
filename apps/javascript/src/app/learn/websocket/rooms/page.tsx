import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { WEBSOCKET_LESSONS } from "@/lib/lessons-data";

export default function RoomsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">WebSocket レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ルームと名前空間</h1>
        <p className="text-gray-400">グループ通信とチャネル分離の仕組みを学ぼう</p>
      </div>

      {/* ルームの基本 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ルーム（Room）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">ルーム</strong>は、ソケットをグループ化する仕組みです。
          チャットアプリのチャンネルや、ゲームの部屋のように、特定のグループに対してだけ
          メッセージを送信できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ===== ルームの概念 =====
//
// Room: "general"     Room: "random"
// ┌────────────┐     ┌────────────┐
// │ User A     │     │ User B     │
// │ User B     │     │ User C     │
// │ User C     │     │ User D     │
// └────────────┘     └────────────┘
//
// ※ 1人のユーザーが複数のルームに参加可能
// ※ ルームはサーバー側の概念（クライアントからは見えない）`}</code>
        </pre>
      </section>

      {/* join/leave */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ルームへの参加・退出</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">join</strong>でルームに参加し、
          <strong className="text-violet-400">leave</strong>で退出します。
          クライアントのリクエストに基づいてサーバー側で操作します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ===== サーバー側 =====

io.on("connection", (socket) => {
  // ルームに参加
  socket.on("room:join", (roomName) => {
    socket.join(roomName);
    console.log(\`\${socket.id} が \${roomName} に参加\`);

    // ルーム内の全員に通知
    io.to(roomName).emit("room:notification", {
      message: \`新しいユーザーが参加しました\`,
      room: roomName,
    });
  });

  // ルームから退出
  socket.on("room:leave", (roomName) => {
    socket.leave(roomName);
    console.log(\`\${socket.id} が \${roomName} を退出\`);

    // ルーム内の残りのメンバーに通知
    io.to(roomName).emit("room:notification", {
      message: "ユーザーが退出しました",
      room: roomName,
    });
  });

  // 参加中のルーム一覧を取得
  socket.on("room:list", (callback) => {
    const rooms = Array.from(socket.rooms);
    // rooms[0] はソケット自身のID（デフォルトルーム）
    callback(rooms.slice(1));
  });

  // 切断時は自動的に全ルームから退出される
});`}</code>
        </pre>
      </section>

      {/* ルームベースのブロードキャスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ルームベースのブロードキャスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ルームを指定してメッセージを送信することで、
          特定のグループだけにデータを届けることができます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`io.on("connection", (socket) => {

  // ルーム内チャット
  socket.on("chat:message", (data) => {
    const { room, text, user } = data;

    // そのルームの全員に送信（送信者を含む）
    io.to(room).emit("chat:message", {
      user,
      text,
      timestamp: Date.now(),
    });
  });

  // ルーム内の送信者以外に送信
  socket.on("typing:start", (room) => {
    socket.to(room).emit("typing:start", {
      user: socket.id,
    });
  });

  // 複数のルームに同時送信
  socket.on("announcement", (data) => {
    io.to("general").to("random").emit("announcement", data);
  });

  // ルーム内のメンバー数を取得
  socket.on("room:members", async (roomName, callback) => {
    const sockets = await io.in(roomName).fetchSockets();
    callback({
      room: roomName,
      count: sockets.length,
      members: sockets.map((s) => s.id),
    });
  });
});`}</code>
        </pre>
      </section>

      {/* 名前空間 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">名前空間（Namespace）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">名前空間</strong>は、Socket.IO接続を
          論理的に分離する仕組みです。異なる機能やモジュールごとに通信を分けることができます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ===== サーバー側 =====

// デフォルト名前空間 (/)
io.on("connection", (socket) => {
  console.log("メイン接続:", socket.id);
});

// /chat 名前空間
const chatNs = io.of("/chat");
chatNs.on("connection", (socket) => {
  console.log("チャット接続:", socket.id);

  socket.on("message", (data) => {
    chatNs.emit("message", data);
  });
});

// /notifications 名前空間
const notifNs = io.of("/notifications");
notifNs.on("connection", (socket) => {
  console.log("通知接続:", socket.id);

  // 5秒ごとに通知を送信
  const interval = setInterval(() => {
    socket.emit("notification", {
      type: "info",
      message: "新しい更新があります",
    });
  }, 5000);

  socket.on("disconnect", () => clearInterval(interval));
});

// ===== クライアント側 =====

// チャット名前空間に接続
const chatSocket = io("http://localhost:3001/chat");
chatSocket.on("message", (data) => {
  console.log("チャット:", data);
});

// 通知名前空間に接続
const notifSocket = io("http://localhost:3001/notifications");
notifSocket.on("notification", (data) => {
  console.log("通知:", data);
});`}</code>
        </pre>
      </section>

      {/* プライベートメッセージ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プライベートメッセージパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ルームを活用して<strong className="text-violet-400">1対1のプライベートメッセージ</strong>を
          実装するパターンです。ユーザーIDとソケットIDのマッピングを管理します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// ユーザーIDとソケットの対応を管理
const userSockets = new Map();

io.on("connection", (socket) => {
  // ユーザー登録
  socket.on("user:register", (userId) => {
    userSockets.set(userId, socket.id);

    // ユーザー固有のルームに参加
    socket.join(\`user:\${userId}\`);
    console.log(\`\${userId} を登録: \${socket.id}\`);
  });

  // プライベートメッセージ送信
  socket.on("dm:send", (data) => {
    const { to, from, text } = data;

    // 受信者のルームに送信
    io.to(\`user:\${to}\`).emit("dm:receive", {
      from,
      text,
      timestamp: Date.now(),
    });

    // 送信者にも確認を送信
    socket.emit("dm:sent", {
      to,
      text,
      timestamp: Date.now(),
    });
  });

  // 切断時にマッピングを削除
  socket.on("disconnect", () => {
    for (const [userId, socketId] of userSockets) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>ルームはソケットをグループ化し、特定のグループにだけメッセージを送る仕組み</li>
          <li>join/leaveでルームの参加・退出を管理する（切断時は自動退出）</li>
          <li>io.to(room)でルーム内ブロードキャスト、socket.to(room)で送信者を除外</li>
          <li>名前空間は通信の論理的な分離に使い、異なる機能を独立して管理できる</li>
          <li>ユーザー固有ルームのパターンでプライベートメッセージを実現できる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="websocket" lessonId="rooms" color="violet" />
      <LessonNav lessons={WEBSOCKET_LESSONS} currentId="rooms" basePath="/learn/websocket" color="violet" />
    </div>
  );
}
