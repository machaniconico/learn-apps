import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("blazor");

export default function BlazorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">Blazor</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          BlazorはC#でインタラクティブなWebUIを構築するMicrosoftのフレームワークです。WebAssemblyとServerの2モードの違い・Razorコンポーネント・データバインディング・イベント処理・ルーティング・状態管理・JS相互運用まで包括的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="blazor" totalLessons={7} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/blazor" color="purple" categoryId="blazor" />
      </section>
    </div>
  );
}
