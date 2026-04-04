import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { MONITORING_LESSONS } from "@/lib/lessons-data";

export default function MonitoringLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">モニタリング入門</h1>
        <DifficultyBadge difficulty="advanced" />
        <p className="text-gray-400">本番環境の健全性を守るための監視・可観測性技術を学びましょう</p>
      </div>

      <ProgressBar categoryId="monitoring" totalLessons={5} color="teal" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={MONITORING_LESSONS} basePath="/learn/monitoring" color="teal" />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜモニタリングを学ぶのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-teal-400">モニタリング</strong>は、アプリケーションが本番環境で正常に動作しているかを
          継続的に確認する仕組みです。障害の早期検知、パフォーマンスの可視化、ユーザー影響の最小化のために
          不可欠なスキルです。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、可観測性の基本概念からログ設計、エラー監視、メトリクス収集まで、
          実践的なモニタリング手法を段階的に学びます。最終演習では包括的な監視システムを構築します。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128270;</div>
            <h3 className="font-semibold text-white mb-1">障害の早期検知</h3>
            <p className="text-sm text-gray-400">ユーザーより先に問題を発見し、迅速に対応できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128200;</div>
            <h3 className="font-semibold text-white mb-1">パフォーマンスの可視化</h3>
            <p className="text-sm text-gray-400">レスポンスタイムやエラー率をダッシュボードで把握</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128276;</div>
            <h3 className="font-semibold text-white mb-1">適切なアラート設計</h3>
            <p className="text-sm text-gray-400">重要な異常だけを通知し、アラート疲れを防ぐ</p>
          </div>
        </div>
      </section>
    </div>
  );
}
