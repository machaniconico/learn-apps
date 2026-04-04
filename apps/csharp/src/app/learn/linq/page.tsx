import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("linq");

export default function LinqPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">LINQ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          LINQ（Language Integrated Query）はC#に統合されたクエリ機能です。配列・リスト・データベースなど様々なデータソースを一貫した構文で操作できます。メソッド構文とクエリ構文の両方を学び、遅延実行やパフォーマンス最適化まで深く理解しましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="linq" totalLessons={8} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/linq" color="pink" categoryId="linq" />
      </section>
    </div>
  );
}
