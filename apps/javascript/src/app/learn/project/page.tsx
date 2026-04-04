import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { PROJECT_LESSONS } from "@/lib/lessons-data";

export default function ProjectLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">実践プロジェクト</h1>
        <DifficultyBadge difficulty="advanced" />
        <p className="text-gray-400">学んだ知識を使って実際にアプリケーションを作りましょう</p>
      </div>

      <ProgressBar categoryId="project" totalLessons={5} color="blue" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={PROJECT_LESSONS} basePath="/learn/project" color="indigo" />
      </section>

      {/* 実践プロジェクトとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜ実践プロジェクトが大切なのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プログラミングは<strong className="text-indigo-400">作ることで身につく</strong>スキルです。
          個々の技術を学んだだけでは、実際のアプリケーションを作る力は十分ではありません。
          このコースでは、段階的に難易度の上がるプロジェクトを通して、
          設計から実装、デプロイまでの一連のスキルを磨きます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128736;</div>
            <h3 className="font-semibold text-white mb-1">実装力の向上</h3>
            <p className="text-sm text-gray-400">要件を理解し、ゼロからコードを書く力が身につく</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128640;</div>
            <h3 className="font-semibold text-white mb-1">ポートフォリオ</h3>
            <p className="text-sm text-gray-400">就職活動で見せられる作品を作れる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#127891;</div>
            <h3 className="font-semibold text-white mb-1">技術の統合</h3>
            <p className="text-sm text-gray-400">フロント・バック・DB・デプロイを一気通貫で経験</p>
          </div>
        </div>
      </section>
    </div>
  );
}
