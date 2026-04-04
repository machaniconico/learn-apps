import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { WEBSOCKET_LESSONS } from "@/lib/lessons-data";

export default function WebSocketExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">WebSocket レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">WebSocket総合演習</h1>
        <p className="text-gray-400">Socket.IOでリアルタイムダッシュボードを作ろう</p>
      </div>

      {/* プロジェクト概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクト概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、<strong className="text-violet-400">リアルタイムダッシュボード</strong>を
          Socket.IOで構築します。サーバーがランダムにデータを生成し、
          接続中のクライアントにリアルタイムで表示するアプリケーションです。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">機能一覧</h3>
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              <li>サーバーからのリアルタイムデータ配信</li>
              <li>接続状態の表示（接続中/切断中）</li>
              <li>ライブデータのグラフ表示</li>
              <li>接続ユーザー数の表示</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">使用技術</h3>
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              <li>Socket.IO（サーバー + クライアント）</li>
              <li>Express（HTTPサーバー）</li>
              <li>React（フロントエンド）</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </div>
      </section>

      {/* サーバー実装 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 1: サーバーのイベント配信</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          サーバー側で定期的にダッシュボードデータを生成し、
          接続中の全クライアントに配信します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// server.ts
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

// ダッシュボードデータを生成
function generateMetrics() {
  return {
    cpu: Math.round(Math.random() * 100),
    memory: Math.round(40 + Math.random() * 50),
    requests: Math.round(Math.random() * 500),
    errors: Math.round(Math.random() * 10),
    responseTime: Math.round(50 + Math.random() * 200),
    timestamp: Date.now(),
  };
}

// 接続ユーザー数を管理
let connectedUsers = 0;

io.on("connection", (socket) => {
  connectedUsers++;
  console.log(\`接続: \${socket.id} (合計: \${connectedUsers})\`);

  // 接続ユーザー数を全員に通知
  io.emit("dashboard:users", { count: connectedUsers });

  // 初回データを送信
  socket.emit("dashboard:metrics", generateMetrics());

  // 切断時
  socket.on("disconnect", () => {
    connectedUsers--;
    io.emit("dashboard:users", { count: connectedUsers });
    console.log(\`切断: \${socket.id} (合計: \${connectedUsers})\`);
  });
});

// 2秒ごとにメトリクスを全員に配信
setInterval(() => {
  const metrics = generateMetrics();
  io.emit("dashboard:metrics", metrics);
}, 2000);

// アラートイベントをランダムに配信
setInterval(() => {
  if (Math.random() > 0.7) {
    const alerts = [
      { level: "warning", message: "CPU使用率が80%を超えました" },
      { level: "error", message: "APIレスポンスタイムが遅延しています" },
      { level: "info", message: "新しいデプロイが完了しました" },
    ];
    const alert = alerts[Math.floor(Math.random() * alerts.length)];
    io.emit("dashboard:alert", {
      ...alert,
      timestamp: Date.now(),
    });
  }
}, 5000);

httpServer.listen(3001, () => {
  console.log("ダッシュボードサーバー起動: http://localhost:3001");
});`}</code>
        </pre>
      </section>

      {/* Reactクライアント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 2: Reactクライアント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          React側でSocket.IOに接続し、受信したデータをリアルタイムで表示します。
          カスタムフックでSocket.IOの接続を管理します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// hooks/useSocket.ts
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(url: string) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(url, {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.disconnect();
    };
  }, [url]);

  return { socket: socketRef.current, isConnected };
}

// hooks/useDashboard.ts
import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

interface Metrics {
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
  responseTime: number;
  timestamp: number;
}

interface Alert {
  level: "info" | "warning" | "error";
  message: string;
  timestamp: number;
}

export function useDashboard() {
  const { socket, isConnected } = useSocket("http://localhost:3001");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<Metrics[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("dashboard:metrics", (data: Metrics) => {
      setMetrics(data);
      setMetricsHistory((prev) => [...prev.slice(-29), data]);
    });

    socket.on("dashboard:users", (data) => {
      setUserCount(data.count);
    });

    socket.on("dashboard:alert", (data: Alert) => {
      setAlerts((prev) => [data, ...prev].slice(0, 10));
    });

    return () => {
      socket.off("dashboard:metrics");
      socket.off("dashboard:users");
      socket.off("dashboard:alert");
    };
  }, [socket]);

  return { metrics, metricsHistory, userCount, alerts, isConnected };
}`}</code>
        </pre>
      </section>

      {/* ダッシュボードUI */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 3: ライブデータの可視化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          受信したメトリクスデータをカード形式で表示し、
          履歴データをシンプルなバーチャートで可視化します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// components/Dashboard.tsx
import { useDashboard } from "../hooks/useDashboard";

export function Dashboard() {
  const { metrics, metricsHistory, userCount, alerts, isConnected } =
    useDashboard();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          リアルタイムダッシュボード
        </h1>
        <ConnectionStatus isConnected={isConnected} />
      </div>

      {/* メトリクスカード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="CPU使用率"
          value={\`\${metrics?.cpu ?? 0}%\`}
          color={metrics?.cpu ?? 0 > 80 ? "red" : "green"}
        />
        <MetricCard
          label="メモリ使用率"
          value={\`\${metrics?.memory ?? 0}%\`}
          color={metrics?.memory ?? 0 > 80 ? "red" : "yellow"}
        />
        <MetricCard
          label="リクエスト/s"
          value={\`\${metrics?.requests ?? 0}\`}
          color="blue"
        />
        <MetricCard
          label="接続ユーザー"
          value={\`\${userCount}\`}
          color="purple"
        />
      </div>

      {/* CPUヒストリーチャート */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">
          CPU使用率（直近30件）
        </h2>
        <div className="flex items-end gap-1 h-32">
          {metricsHistory.map((m, i) => (
            <div
              key={i}
              className="flex-1 bg-violet-500 rounded-t"
              style={{ height: \`\${m.cpu}%\` }}
              title={\`\${m.cpu}%\`}
            />
          ))}
        </div>
      </div>

      {/* アラート一覧 */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">アラート</h2>
        {alerts.length === 0 ? (
          <p className="text-gray-500 text-sm">
            アラートはありません
          </p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((alert, i) => (
              <AlertItem key={i} alert={alert} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* 接続状態コンポーネント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 4: 接続状態の表示</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ユーザーに接続状態を視覚的に伝えることで、
          リアルタイムデータが正しく受信できているか確認できるようにします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// components/ConnectionStatus.tsx
interface ConnectionStatusProps {
  isConnected: boolean;
}

export function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={\`w-3 h-3 rounded-full \${
          isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
        }\`}
      />
      <span className="text-sm text-gray-400">
        {isConnected ? "接続中" : "切断中"}
      </span>
    </div>
  );
}

// components/MetricCard.tsx
interface MetricCardProps {
  label: string;
  value: string;
  color: string;
}

export function MetricCard({ label, value, color }: MetricCardProps) {
  const colorMap: Record<string, string> = {
    red: "border-red-500/30 text-red-400",
    green: "border-green-500/30 text-green-400",
    blue: "border-blue-500/30 text-blue-400",
    yellow: "border-yellow-500/30 text-yellow-400",
    purple: "border-violet-500/30 text-violet-400",
  };

  return (
    <div className={\`p-4 rounded-lg border bg-gray-900 \${
      colorMap[color] ?? colorMap.blue
    }\`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// components/AlertItem.tsx
interface Alert {
  level: "info" | "warning" | "error";
  message: string;
  timestamp: number;
}

export function AlertItem({ alert }: { alert: Alert }) {
  const levelStyles = {
    info: "border-blue-500/30 text-blue-400",
    warning: "border-yellow-500/30 text-yellow-400",
    error: "border-red-500/30 text-red-400",
  };

  const levelLabels = {
    info: "INFO",
    warning: "WARN",
    error: "ERROR",
  };

  const time = new Date(alert.timestamp).toLocaleTimeString("ja-JP");

  return (
    <li className={\`flex items-center gap-3 p-2 rounded border \${
      levelStyles[alert.level]
    } bg-gray-900\`}>
      <span className="text-xs font-bold w-12">
        {levelLabels[alert.level]}
      </span>
      <span className="text-sm flex-1">{alert.message}</span>
      <span className="text-xs text-gray-500">{time}</span>
    </li>
  );
}`}</code>
        </pre>
      </section>

      {/* 発展課題 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">発展課題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          基本のダッシュボードが完成したら、以下の機能を追加して発展させてみましょう。
        </p>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-1">1. アラートのフィルタリング</h3>
            <p className="text-sm text-gray-400">レベル（info/warning/error）でアラートを絞り込める機能を追加する。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-1">2. メトリクスの一時停止</h3>
            <p className="text-sm text-gray-400">データ受信の一時停止/再開ボタンを実装する。socket.off/onを切り替える。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-1">3. ルーム別ダッシュボード</h3>
            <p className="text-sm text-gray-400">複数のサーバーをルームで分離し、切り替えて表示できるようにする。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-1">4. JWT認証の追加</h3>
            <p className="text-sm text-gray-400">レッスン4で学んだJWT認証をダッシュボードに組み込む。</p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Socket.IOサーバーで定期的にメトリクスデータを生成し全クライアントに配信</li>
          <li>Reactカスタムフックで接続管理とデータの状態管理を分離</li>
          <li>メトリクスカード、バーチャート、アラート一覧でデータをリアルタイム可視化</li>
          <li>接続状態インジケーターでユーザーに接続状況をフィードバック</li>
          <li>ルーム、認証、フィルタリングなどの発展課題で実践力を高める</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="websocket" lessonId="websocket-exercise" color="violet" />
      <LessonNav lessons={WEBSOCKET_LESSONS} currentId="websocket-exercise" basePath="/learn/websocket" color="violet" />
    </div>
  );
}
