import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { STORYBOOK_LESSONS } from "@/lib/lessons-data";

export default function StorybookLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">Storybook入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">コンポーネントカタログを活用して、UIの開発・テスト・ドキュメント化を効率化しましょう</p>
      </div>

      <ProgressBar categoryId="storybook" totalLessons={3} color="pink" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全3レッスン</h2>
        <LessonList lessons={STORYBOOK_LESSONS} basePath="/learn/storybook" color="pink" />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜStorybookを学ぶのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">Storybook</strong>は、UIコンポーネントを独立した環境で開発・テスト・ドキュメント化できるツールです。
          アプリケーション全体を起動せずに個々のコンポーネントを確認できるため、
          コンポーネント駆動開発（CDD）の中核を担います。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、Storybookの基本的なセットアップからストーリーの書き方、
          アドオンやビジュアルテストを使った実践的な活用方法まで段階的に学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128218;</div>
            <h3 className="font-semibold text-white mb-1">コンポーネントカタログ</h3>
            <p className="text-sm text-gray-400">UIコンポーネントを一覧で確認・操作できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128065;</div>
            <h3 className="font-semibold text-white mb-1">ビジュアルテスト</h3>
            <p className="text-sm text-gray-400">UIの見た目の変更を自動で検出・レビューできる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128196;</div>
            <h3 className="font-semibold text-white mb-1">自動ドキュメント生成</h3>
            <p className="text-sm text-gray-400">コンポーネントのpropsやバリエーションを自動で文書化</p>
          </div>
        </div>
      </section>
    </div>
  );
}
