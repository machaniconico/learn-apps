import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("aspnet");

export default function AspnetPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">ASP.NET Core基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          ASP.NET CoreはMicrosoftのオープンソースWebフレームワークです。プロジェクト構成・ミドルウェアパイプライン・ルーティング・依存性注入・設定管理・ログ・環境設定・デプロイまで、本番対応のWebアプリ開発に必要な基礎を体系的に学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="aspnet" totalLessons={8} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/aspnet" color="blue" categoryId="aspnet" />
      </section>
    </div>
  );
}
