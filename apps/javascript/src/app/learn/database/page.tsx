import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { DATABASE_LESSONS } from "@/lib/lessons-data";

export default function DatabaseLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">データベース入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">データの保存・管理・操作の基礎からORMまでを学びましょう</p>
      </div>

      <ProgressBar categoryId="database" totalLessons={5} color="cyan" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={DATABASE_LESSONS} basePath="/learn/database" color="cyan" />
      </section>

      {/* データベースとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">データベースとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">データベース（Database）</strong>は、
          データを効率的に保存・検索・更新・削除するための仕組みです。Webアプリケーションでは、
          ユーザー情報、投稿、注文履歴などあらゆるデータをデータベースで管理します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、リレーショナルデータベース（RDB）を中心に、SQLの基本からORM（Prisma）を使った
          モダンなデータベース操作までを学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128451;</div>
            <h3 className="font-semibold text-white mb-1">データの永続化</h3>
            <p className="text-sm text-gray-400">アプリを閉じてもデータが失われない安全な保存</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128269;</div>
            <h3 className="font-semibold text-white mb-1">高速な検索</h3>
            <p className="text-sm text-gray-400">インデックスを使って大量データから瞬時に検索</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128274;</div>
            <h3 className="font-semibold text-white mb-1">データの整合性</h3>
            <p className="text-sm text-gray-400">制約やトランザクションで矛盾のないデータを保証</p>
          </div>
        </div>
      </section>
    </div>
  );
}
