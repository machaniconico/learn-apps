import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { TESTING_LESSONS } from "@/lib/lessons-data";

export default function TestingLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">テスト入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">ソフトウェアの品質を守るテスト技術を基礎から実践まで学びましょう</p>
      </div>

      <ProgressBar categoryId="testing" totalLessons={5} color="pink" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={TESTING_LESSONS} basePath="/learn/testing" color="pink" />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜテストを学ぶのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-pink-400">テスト</strong>は、コードが期待通りに動作することを自動的に検証する仕組みです。
          手動で確認する代わりに、テストコードを書くことでバグの早期発見、リファクタリングの安全性確保、
          チーム開発での品質維持が可能になります。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、テストの基本概念からユニットテスト、統合テスト、E2Eテストまで、
          実践的なテスト手法を段階的に学びます。最終演習ではTODOアプリに対して包括的なテストを書きます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128737;</div>
            <h3 className="font-semibold text-white mb-1">バグの早期発見</h3>
            <p className="text-sm text-gray-400">本番環境に出る前にコードの問題を検出できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9851;</div>
            <h3 className="font-semibold text-white mb-1">安全なリファクタリング</h3>
            <p className="text-sm text-gray-400">テストがあれば既存機能を壊さずにコードを改善できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#129309;</div>
            <h3 className="font-semibold text-white mb-1">チーム開発の安心感</h3>
            <p className="text-sm text-gray-400">CI/CDと組み合わせて品質を自動的に担保する</p>
          </div>
        </div>
      </section>
    </div>
  );
}
