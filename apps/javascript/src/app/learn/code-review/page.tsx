import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { CODE_REVIEW_LESSONS } from "@/lib/lessons-data";

export default function CodeReviewLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">コードレビュー入門</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400">品質の高いコードをチームで作り上げるレビュースキルを身につけよう</p>
      </div>

      <ProgressBar categoryId="code-review" totalLessons={3} color="orange" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全3レッスン</h2>
        <LessonList lessons={CODE_REVIEW_LESSONS} basePath="/learn/code-review" color="orange" />
      </section>

      {/* コードレビューとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コードレビューとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-orange-400">コードレビュー</strong>は、開発者が書いたコードを他のチームメンバーが確認し、
          フィードバックを提供するプロセスです。バグの早期発見、コード品質の向上、
          チーム全体の技術力アップに欠かせない<strong className="text-orange-400">開発文化</strong>です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          GitHubのPull Request（PR）を通じて行われることが多く、
          現代のソフトウェア開発では必須のプラクティスとなっています。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128270;</div>
            <h3 className="font-semibold text-white mb-1">バグの早期発見</h3>
            <p className="text-sm text-gray-400">本番環境に到達する前に問題を見つけて修正できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128218;</div>
            <h3 className="font-semibold text-white mb-1">知識の共有</h3>
            <p className="text-sm text-gray-400">チーム全員がコードベースを理解し、スキルを向上できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9989;</div>
            <h3 className="font-semibold text-white mb-1">品質の統一</h3>
            <p className="text-sm text-gray-400">コーディング規約やベストプラクティスをチームで徹底できる</p>
          </div>
        </div>
      </section>

      {/* 学習の流れ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">このコースの学習の流れ</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold shrink-0">1</span>
            <div>
              <p className="text-white font-semibold">コードレビューの基本</p>
              <p className="text-gray-400">レビューの目的、観点、チェックリスト、レビュー文化を学ぶ</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold shrink-0">2</span>
            <div>
              <p className="text-white font-semibold">良いPRの書き方</p>
              <p className="text-gray-400">タイトル規約、説明テンプレート、差分の適切な分割</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-bold shrink-0">3</span>
            <div>
              <p className="text-white font-semibold">レビュー実践</p>
              <p className="text-gray-400">フィードバックの伝え方、実際のコード例で問題を見つける練習</p>
            </div>
          </div>
        </div>
      </section>

      {/* なぜコードレビューが重要か */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コードレビューが重要な理由</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-2">レビューがある場合</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>&#8226; バグが本番に到達する前に発見される</li>
              <li>&#8226; コードの一貫性が保たれる</li>
              <li>&#8226; チーム全員がコードを理解している</li>
              <li>&#8226; ジュニアエンジニアの成長が加速する</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-2">レビューがない場合</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>&#8226; バグが本番で発見されて障害が起きる</li>
              <li>&#8226; コードスタイルがバラバラになる</li>
              <li>&#8226; 特定の人しか分からないコードが増える</li>
              <li>&#8226; 技術的負債が蓄積されやすい</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
