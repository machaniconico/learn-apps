import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { WEBSOCKET_LESSONS } from "@/lib/lessons-data";

export default function WebSocketLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">WebSocket入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">リアルタイム双方向通信の仕組みと実装を学びましょう</p>
      </div>

      <ProgressBar categoryId="websocket" totalLessons={5} color="violet" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={WEBSOCKET_LESSONS} basePath="/learn/websocket" color="violet" />
      </section>

      {/* WebSocketとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜWebSocketを学ぶのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">WebSocket</strong>は、クライアントとサーバー間で
          リアルタイムな双方向通信を実現するプロトコルです。
          チャットアプリ、ライブ通知、オンラインゲーム、株価ダッシュボードなど、
          即座にデータを反映する必要があるアプリケーションに不可欠な技術です。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、WebSocketの基本概念からSocket.IOを使った実践的な実装、
          認証・エラー処理まで、リアルタイムアプリ開発に必要な知識を体系的に学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9889;</div>
            <h3 className="font-semibold text-white mb-1">リアルタイム通信</h3>
            <p className="text-sm text-gray-400">HTTPポーリング不要の低遅延な双方向データ通信を実現</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128268;</div>
            <h3 className="font-semibold text-white mb-1">Socket.IO</h3>
            <p className="text-sm text-gray-400">イベント駆動の強力なライブラリでスケーラブルな通信を構築</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128736;</div>
            <h3 className="font-semibold text-white mb-1">実践プロジェクト</h3>
            <p className="text-sm text-gray-400">リアルタイムダッシュボードを作って知識を定着させる</p>
          </div>
        </div>
      </section>
    </div>
  );
}
