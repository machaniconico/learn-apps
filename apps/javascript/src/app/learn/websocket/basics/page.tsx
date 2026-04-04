import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { WEBSOCKET_LESSONS } from "@/lib/lessons-data";

export default function WebSocketBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">WebSocket レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">WebSocketの基本</h1>
        <p className="text-gray-400">HTTPとの違い、ハンドシェイク、全二重通信の仕組みを学ぼう</p>
      </div>

      {/* HTTP vs WebSocket */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">HTTP vs WebSocket</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">HTTP</strong>はリクエスト/レスポンス型のプロトコルです。
          クライアントがリクエストを送り、サーバーが応答を返します。サーバーからクライアントへ
          自発的にデータを送ることはできません。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          一方、<strong className="text-violet-400">WebSocket</strong>は一度接続を確立すると、
          クライアントとサーバーの両方から自由にデータを送受信できる<strong className="text-violet-400">全二重通信</strong>が可能です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【HTTP通信】
クライアント → リクエスト → サーバー
クライアント ← レスポンス ← サーバー
（毎回接続を張り直す / サーバーから送れない）

【WebSocket通信】
クライアント ←→ 双方向データ ←→ サーバー
（常時接続 / どちらからでも送信可能）

【ポーリング vs WebSocket】
ポーリング: 定期的にHTTPリクエストを送って新しいデータを確認
  → 無駄なリクエストが大量発生、遅延が大きい

WebSocket: 接続を維持し、データが発生したら即座に送信
  → リアルタイム性が高く、オーバーヘッドが小さい`}</code>
        </pre>
      </section>

      {/* ハンドシェイクプロセス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ハンドシェイクプロセス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WebSocket接続は<strong className="text-violet-400">HTTPアップグレードリクエスト</strong>から始まります。
          最初にHTTPでハンドシェイクを行い、成功するとプロトコルがWebSocketに切り替わります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 1. クライアントからのアップグレードリクエスト
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

// 2. サーバーからのアップグレードレスポンス
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

// 3. ここからWebSocketフレームで双方向通信開始
// HTTPヘッダーのオーバーヘッドが不要になる`}</code>
        </pre>
      </section>

      {/* 全二重通信 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">全二重通信（Full-Duplex）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WebSocketの最大の特徴は<strong className="text-violet-400">全二重通信</strong>です。
          クライアントとサーバーが同時にデータを送受信できます。
          これにより、リアルタイム性の高いアプリケーションを構築できます。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">半二重通信（HTTP）</h3>
            <p className="text-sm text-gray-400">一度に一方向のみ通信可能。リクエストを送ったら、レスポンスが返るまで待つ必要がある。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">全二重通信（WebSocket）</h3>
            <p className="text-sm text-gray-400">同時に双方向の通信が可能。サーバーはいつでもクライアントにデータをプッシュできる。</p>
          </div>
        </div>
      </section>

      {/* ユースケース */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">WebSocketのユースケース</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          WebSocketは以下のようなリアルタイム性が求められるアプリケーションで活躍します。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">チャットアプリ</h3>
            <p className="text-sm text-gray-400">メッセージの即座な送受信。Slack、Discord、LINEなどが代表例。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">オンラインゲーム</h3>
            <p className="text-sm text-gray-400">プレイヤー間のリアルタイム同期。位置情報やアクションの即時反映。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">ライブ更新</h3>
            <p className="text-sm text-gray-400">株価、スポーツスコア、SNSフィードなどのリアルタイム更新。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">共同編集</h3>
            <p className="text-sm text-gray-400">Google Docsのような複数人同時編集。変更の即時反映が必要。</p>
          </div>
        </div>
      </section>

      {/* ネイティブWebSocket API */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ブラウザのWebSocket API</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ブラウザには<strong className="text-violet-400">ネイティブWebSocket API</strong>が組み込まれています。
          ライブラリなしでWebSocket通信を実装できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// WebSocket接続の作成
const ws = new WebSocket("ws://localhost:3001");

// 接続が開いたとき
ws.addEventListener("open", () => {
  console.log("接続成功！");
  ws.send("こんにちは、サーバー！");
});

// メッセージを受信したとき
ws.addEventListener("message", (event) => {
  console.log("受信:", event.data);
});

// エラーが発生したとき
ws.addEventListener("error", (error) => {
  console.error("WebSocketエラー:", error);
});

// 接続が閉じたとき
ws.addEventListener("close", (event) => {
  console.log("接続終了:", event.code, event.reason);
});

// メッセージの送信
ws.send(JSON.stringify({ type: "chat", text: "Hello!" }));

// 接続を閉じる
ws.close(1000, "正常終了");`}</code>
        </pre>
      </section>

      {/* Node.jsサーバー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Node.jsでWebSocketサーバー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">ws</strong>パッケージを使ってNode.jsでWebSocketサーバーを作成できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// npm install ws
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("クライアントが接続しました");

  // メッセージ受信
  ws.on("message", (data) => {
    const message = data.toString();
    console.log("受信:", message);

    // 全クライアントにブロードキャスト
    wss.clients.forEach((client) => {
      if (client.readyState === 1) { // OPEN状態
        client.send(message);
      }
    });
  });

  // 接続終了
  ws.on("close", () => {
    console.log("クライアントが切断しました");
  });

  // ウェルカムメッセージ
  ws.send("サーバーに接続しました！");
});

console.log("WebSocketサーバー起動: ws://localhost:3001");`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>WebSocketはHTTPと異なり、常時接続の全二重通信を実現するプロトコル</li>
          <li>HTTPアップグレードリクエストでハンドシェイクを行い接続を確立する</li>
          <li>チャット、ゲーム、ライブ更新など、リアルタイム性が求められる場面で活躍</li>
          <li>ブラウザにはネイティブWebSocket APIが組み込まれている</li>
          <li>Node.jsではwsパッケージでWebSocketサーバーを簡単に構築できる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="websocket" lessonId="basics" color="violet" />
      <LessonNav lessons={WEBSOCKET_LESSONS} currentId="basics" basePath="/learn/websocket" color="violet" />
    </div>
  );
}
