import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { SECURITY_LESSONS } from "@/lib/lessons-data";

export default function SecurityLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">セキュリティ入門</h1>
        <DifficultyBadge difficulty="intermediate" />
        <p className="text-gray-400">Webアプリケーションを安全に守るための知識を学びましょう</p>
      </div>

      <ProgressBar categoryId="security" totalLessons={5} color="red" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={SECURITY_LESSONS} basePath="/learn/security" color="red" />
      </section>

      {/* セキュリティとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">なぜセキュリティを学ぶのか？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">セキュリティ</strong>は、Webアプリケーション開発において最も重要なスキルの1つです。
          ユーザーの個人情報やデータを守り、サービスの信頼性を確保するために、
          攻撃の手法と防御の方法を理解する必要があります。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          このコースでは、脅威の基本概念からWebアプリの脆弱性、
          認証・通信の暗号化まで実践的なセキュリティ知識を学びます。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128737;</div>
            <h3 className="font-semibold text-white mb-1">攻撃を知る</h3>
            <p className="text-sm text-gray-400">XSS、CSRF、SQLインジェクションなどの攻撃手法を理解</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128274;</div>
            <h3 className="font-semibold text-white mb-1">防御を実装</h3>
            <p className="text-sm text-gray-400">適切な対策をコードに組み込むスキルを習得</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#9989;</div>
            <h3 className="font-semibold text-white mb-1">安全な設計</h3>
            <p className="text-sm text-gray-400">セキュリティを考慮したアーキテクチャ設計</p>
          </div>
        </div>
      </section>
    </div>
  );
}
