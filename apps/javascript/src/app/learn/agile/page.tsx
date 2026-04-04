import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { AGILE_LESSONS } from "@/lib/lessons-data";

export default function AgileLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">アジャイル開発入門</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400">チーム開発の現場で使われるアジャイル・スクラムの基礎を学びましょう</p>
      </div>

      <ProgressBar categoryId="agile" totalLessons={5} color="blue" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={AGILE_LESSONS} basePath="/learn/agile" color="blue" />
      </section>

      {/* なぜアジャイルを学ぶのか */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜアジャイルを学ぶのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">アジャイル開発</strong>は、変化に素早く対応しながら
          価値あるソフトウェアを継続的に届けるための開発手法です。
          現代のソフトウェア開発チームの多くがアジャイルの考え方を採用しており、
          エンジニアとして働く上で必須の知識となっています。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、アジャイルの基本理念からスクラム・カンバンの実践、
          開発ツールの活用まで、チーム開発に必要な知識を体系的に学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128640;</div>
            <h3 className="font-semibold text-white mb-1">反復型開発</h3>
            <p className="text-sm text-gray-400">短いサイクルで開発・フィードバック・改善を繰り返し、素早く価値を届ける</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#129309;</div>
            <h3 className="font-semibold text-white mb-1">チームワーク</h3>
            <p className="text-sm text-gray-400">スクラムやカンバンでチームの協力体制を構築し、生産性を最大化する</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128736;</div>
            <h3 className="font-semibold text-white mb-1">実践ツール</h3>
            <p className="text-sm text-gray-400">Jira・Linear・GitHub Projectsなど現場で使われるツールの活用法を習得</p>
          </div>
        </div>
      </section>
    </div>
  );
}
