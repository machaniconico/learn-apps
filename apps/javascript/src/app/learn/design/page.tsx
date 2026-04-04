import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { DESIGN_LESSONS } from "@/lib/lessons-data";

export default function DesignLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">設計パターン入門</h1>
        <DifficultyBadge difficulty="advanced" />
        <p className="text-gray-400">保守性・拡張性の高いコードを書くための設計原則とパターンを学びましょう</p>
      </div>

      <ProgressBar categoryId="design" totalLessons={5} color="violet" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={DESIGN_LESSONS} basePath="/learn/design" color="violet" />
      </section>

      {/* 設計パターンとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">設計パターンとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">設計パターン</strong>とは、ソフトウェア開発で繰り返し発生する問題に対する
          <strong className="text-violet-400">再利用可能な解決策</strong>のことです。
          先人たちの知恵を体系化したもので、コードの品質・保守性・チーム開発の効率を大幅に向上させます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          「動くコード」を書くだけでなく、「良いコード」を書くためのスキルは、
          プロのエンジニアとして成長するために不可欠です。このコースでは、
          基本原則からアーキテクチャまで段階的に学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128736;</div>
            <h3 className="font-semibold text-white mb-1">保守性の向上</h3>
            <p className="text-sm text-gray-400">変更・修正がしやすい、読みやすいコードを書ける</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128640;</div>
            <h3 className="font-semibold text-white mb-1">拡張性の確保</h3>
            <p className="text-sm text-gray-400">新機能の追加が既存コードに影響しにくい設計</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#129309;</div>
            <h3 className="font-semibold text-white mb-1">チーム開発の効率化</h3>
            <p className="text-sm text-gray-400">共通の設計言語でコミュニケーションがスムーズに</p>
          </div>
        </div>
      </section>

      {/* 学習の流れ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">このコースの学習の流れ</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm font-bold shrink-0">1</span>
            <div>
              <p className="text-white font-semibold">設計の基本原則</p>
              <p className="text-gray-400">DRY、KISS、YAGNI など、良いコードの基礎を学ぶ</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm font-bold shrink-0">2</span>
            <div>
              <p className="text-white font-semibold">SOLID原則</p>
              <p className="text-gray-400">オブジェクト指向設計の5大原則を理解する</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm font-bold shrink-0">3</span>
            <div>
              <p className="text-white font-semibold">よく使うデザインパターン</p>
              <p className="text-gray-400">Singleton、Observer、Factory など実践的パターン</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm font-bold shrink-0">4</span>
            <div>
              <p className="text-white font-semibold">アーキテクチャパターン</p>
              <p className="text-gray-400">MVC、クリーンアーキテクチャ、DDDの基礎</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm font-bold shrink-0">5</span>
            <div>
              <p className="text-white font-semibold">設計パターン総合演習</p>
              <p className="text-gray-400">リファクタリングを通して学んだ知識を実践</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
