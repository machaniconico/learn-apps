import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { ALGORITHM_LESSONS } from "@/lib/lessons-data";

export default function AlgorithmLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">アルゴリズム入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">効率的な問題解決の考え方とデータ構造を学びましょう</p>
      </div>

      <ProgressBar categoryId="algorithm" totalLessons={5} color="yellow" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={ALGORITHM_LESSONS} basePath="/learn/algorithm" color="yellow" />
      </section>

      {/* アルゴリズムとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">アルゴリズムとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-yellow-400">アルゴリズム</strong>とは、問題を解くための手順や方法のことです。
          プログラミングにおいては、入力を受け取り、決められたステップに従って処理し、
          正しい出力を返す一連の手続きを指します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、計算量の考え方からソート・探索アルゴリズム、
          そしてデータ構造の基礎までを段階的に学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9889;</div>
            <h3 className="font-semibold text-white mb-1">効率的な処理</h3>
            <p className="text-sm text-gray-400">計算量を理解し、最適なアルゴリズムを選択できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128200;</div>
            <h3 className="font-semibold text-white mb-1">問題解決力</h3>
            <p className="text-sm text-gray-400">複雑な問題を分割して解くスキルが身につく</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128218;</div>
            <h3 className="font-semibold text-white mb-1">技術面接対策</h3>
            <p className="text-sm text-gray-400">エンジニア採用で頻出のアルゴリズム問題に対応</p>
          </div>
        </div>
      </section>
    </div>
  );
}
