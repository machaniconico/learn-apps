import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegates");

export default function DelegatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">デリゲート・イベント</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          デリゲートはメソッドへの参照を保持する型です。Action・Func・ラムダ式などの組み込みデリゲートから、eventキーワードを使ったイベント駆動プログラミング、さらにIObservable/IObserverによるリアクティブパターンまでを学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="delegates" totalLessons={6} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/delegates" color="orange" categoryId="delegates" />
      </section>
    </div>
  );
}
