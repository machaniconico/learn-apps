import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { PERFORMANCE_LESSONS } from "@/lib/lessons-data";

export default function PerformanceLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">パフォーマンス最適化</h1>
        <DifficultyBadge difficulty="advanced" />
        <p className="text-gray-400">Webアプリケーションの速度と効率を最大限に引き出す技術を学びましょう</p>
      </div>

      <ProgressBar categoryId="performance" totalLessons={5} color="green" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={PERFORMANCE_LESSONS} basePath="/learn/performance" color="green" />
      </section>

      {/* パフォーマンスとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜパフォーマンスを学ぶのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-green-400">パフォーマンス最適化</strong>は、ユーザー体験とビジネス成果に直結する重要なスキルです。
          ページの読み込みが1秒遅くなるだけで、コンバージョン率が7%低下するというデータもあります。
          Core Web Vitalsはseo検索ランキングにも影響を与えます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、計測ツールの使い方からアセット最適化、コード分割まで、
          実践的なパフォーマンス改善テクニックを体系的に学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9889;</div>
            <h3 className="font-semibold text-white mb-1">計測と分析</h3>
            <p className="text-sm text-gray-400">Lighthouse、Core Web Vitalsでボトルネックを発見</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128248;</div>
            <h3 className="font-semibold text-white mb-1">アセット最適化</h3>
            <p className="text-sm text-gray-400">画像・フォント・バンドルサイズの最適化</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128640;</div>
            <h3 className="font-semibold text-white mb-1">コード最適化</h3>
            <p className="text-sm text-gray-400">コード分割、メモ化、仮想化で高速化</p>
          </div>
        </div>
      </section>
    </div>
  );
}
