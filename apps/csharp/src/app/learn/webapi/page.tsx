import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("webapi");

export default function WebapiPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">Web API</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          ASP.NET CoreでRESTful Web APIを構築する方法を学びます。コントローラーの設計・モデルバインディング・バリデーション・フィルター・CORS設定・JWT認証・Swaggerによるドキュメント生成まで、本格的なAPI開発に必要なすべてをカバーします。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="webapi" totalLessons={8} color="cyan" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/webapi" color="cyan" categoryId="webapi" />
      </section>
    </div>
  );
}
