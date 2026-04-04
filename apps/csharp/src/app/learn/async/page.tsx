import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("async");

export default function AsyncPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">非同期処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          非同期処理はモダンなC#開発に不可欠な技術です。async/awaitパターンを使ったノンブロッキングI/O、Taskによる並列処理、CancellationTokenによるキャンセル制御、そしてIAsyncEnumerableを使った非同期ストリームまでを体系的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="async" totalLessons={6} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/async" color="red" categoryId="async" />
      </section>
    </div>
  );
}
