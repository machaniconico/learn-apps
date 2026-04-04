import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { INFRA_LESSONS } from "@/lib/lessons-data";

export default function InfraLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">インフラ入門</h1>
        <DifficultyBadge difficulty="advanced" />
        <p className="text-gray-400">サーバー、ネットワーク、Linux、Nginx、Kubernetesまで本番環境を支える技術を学びましょう</p>
      </div>

      <ProgressBar categoryId="infra" totalLessons={5} color="cyan" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={INFRA_LESSONS} basePath="/learn/infra" color="cyan" />
      </section>

      {/* インフラとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インフラストラクチャとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">インフラストラクチャ（Infrastructure）</strong>とは、
          アプリケーションを動かすための基盤となる技術全体を指します。サーバー、ネットワーク、
          OS、ミドルウェアなど、ユーザーからは見えない「裏側」の仕組みです。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、サーバー・クライアントモデルの基本から、Linuxコマンド操作、Nginxによる
          Webサーバー構築、Kubernetesによるコンテナオーケストレーションまでを段階的に学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128421;</div>
            <h3 className="font-semibold text-white mb-1">サーバー管理</h3>
            <p className="text-sm text-gray-400">Linuxサーバーの構築・運用・セキュリティの基礎</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#127760;</div>
            <h3 className="font-semibold text-white mb-1">ネットワーク</h3>
            <p className="text-sm text-gray-400">IP、DNS、HTTPなど通信の仕組みを理解する</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9881;</div>
            <h3 className="font-semibold text-white mb-1">コンテナ技術</h3>
            <p className="text-sm text-gray-400">Docker・Kubernetesで本番環境をスケーラブルに</p>
          </div>
        </div>
      </section>
    </div>
  );
}
