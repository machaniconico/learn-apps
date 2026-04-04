import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { DEPLOY_LESSONS } from "@/lib/lessons-data";

export default function DeployLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">デプロイ・CI/CD入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">開発したアプリを本番環境に公開し、自動化で効率的に運用しよう</p>
      </div>

      <ProgressBar categoryId="deploy" totalLessons={5} color="teal" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={DEPLOY_LESSONS} basePath="/learn/deploy" color="teal" />
      </section>

      {/* デプロイとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デプロイ・CI/CDとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">デプロイ</strong>とは、開発したアプリケーションをサーバーやクラウドに配置し、
          ユーザーがアクセスできる状態にすることです。<strong className="text-teal-400">CI/CD</strong>（継続的インテグレーション/継続的デリバリー）は、
          テストやデプロイを自動化し、開発サイクルを高速かつ安全にする手法です。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Dockerでアプリの実行環境を統一し、GitHub Actionsで自動テスト・自動デプロイを構築し、
          Vercelやクラウドサービスで本番環境を運用する方法を学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128230;</div>
            <h3 className="font-semibold text-white mb-1">Docker</h3>
            <p className="text-sm text-gray-400">コンテナ技術で「どこでも同じ」環境を実現</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9881;</div>
            <h3 className="font-semibold text-white mb-1">CI/CD自動化</h3>
            <p className="text-sm text-gray-400">GitHub Actionsでテストとデプロイを自動実行</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9729;</div>
            <h3 className="font-semibold text-white mb-1">クラウドサービス</h3>
            <p className="text-sm text-gray-400">Vercel・AWS・GCPで本番運用</p>
          </div>
        </div>
      </section>

      {/* 学習の流れ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">学習の流れ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まずデプロイの基本概念を理解し、Docker・CI/CD・クラウドサービスの順に学んでいきます。
          最後の総合演習で、実際にNext.jsアプリを本番公開するまでの一連の流れを体験します。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">デプロイの基本</code> — 開発環境と本番環境、ビルド、ドメイン、HTTPS</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">Docker入門</code> — コンテナの仕組み、Dockerfile、docker-compose</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">CI/CD入門</code> — GitHub Actions、自動テスト、自動デプロイ</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">クラウドサービス</code> — Vercel、AWS、GCP、プラットフォーム選定</li>
          <li><code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">デプロイ総合演習</code> — Next.jsアプリの本番公開を実践</li>
        </ul>
      </section>

      {/* 前提知識 */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">前提知識</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          このカテゴリの学習には、以下の基礎知識があるとスムーズです。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>HTML/CSS/JavaScriptの基本</li>
          <li>Gitの基本操作（commit、push、ブランチ）</li>
          <li>ターミナル（コマンドライン）の基本的な操作</li>
          <li>Node.jsの基礎知識（推奨）</li>
        </ul>
      </section>
    </div>
  );
}
