import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { GIT_LESSONS } from "@/lib/lessons-data";

export default function GitLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">Git / GitHub 入門</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400">バージョン管理とチーム開発の基礎を学びましょう</p>
      </div>

      <ProgressBar categoryId="git" totalLessons={5} color="green" />

      {/* Lesson List */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={GIT_LESSONS} basePath="/learn/git" color="green" />
      </section>

      {/* Gitとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Gitとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">Git</strong>は、ソースコードの変更履歴を追跡・管理するための
          <strong className="text-red-400">分散型バージョン管理システム</strong>です。
          Linus Torvalds（Linuxの作者）が2005年に開発しました。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Gitを使うことで、コードの変更を安全に記録し、過去の状態に戻したり、
          複数人で同時に開発したりすることができます。現代のソフトウェア開発において必須のツールです。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128220;</div>
            <h3 className="font-semibold text-white mb-1">変更履歴の管理</h3>
            <p className="text-sm text-gray-400">誰が・いつ・何を変更したかを正確に記録する</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128101;</div>
            <h3 className="font-semibold text-white mb-1">チーム開発</h3>
            <p className="text-sm text-gray-400">複数人で同じプロジェクトを同時に開発できる</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128260;</div>
            <h3 className="font-semibold text-white mb-1">安全なバックアップ</h3>
            <p className="text-sm text-gray-400">いつでも過去の状態に戻せる安心感</p>
          </div>
        </div>
      </section>

      {/* GitとGitHubの違い */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Git と GitHub の違い</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">Git</h3>
            <p className="text-gray-300 text-sm mb-2">バージョン管理の<strong>ツール</strong>そのもの。ローカルのPC上で動作する。</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>&#8226; コマンドラインツール</li>
              <li>&#8226; ローカルで履歴を管理</li>
              <li>&#8226; オフラインでも使える</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-red-400 mb-2">GitHub</h3>
            <p className="text-gray-300 text-sm mb-2">Gitリポジトリをホスティングする<strong>Webサービス</strong>。</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>&#8226; クラウド上でリポジトリを共有</li>
              <li>&#8226; Pull Request・Issue管理</li>
              <li>&#8226; CI/CD・GitHub Actions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 学習の流れ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">このコースの学習の流れ</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold shrink-0">1</span>
            <div>
              <p className="text-white font-semibold">Gitの基本</p>
              <p className="text-gray-400">init, add, commit, status, log などの基本操作を学ぶ</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold shrink-0">2</span>
            <div>
              <p className="text-white font-semibold">ブランチ</p>
              <p className="text-gray-400">並行して作業を進めるブランチの概念と操作</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold shrink-0">3</span>
            <div>
              <p className="text-white font-semibold">リモートリポジトリ</p>
              <p className="text-gray-400">GitHubとの連携、push, pull, clone</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold shrink-0">4</span>
            <div>
              <p className="text-white font-semibold">チーム開発</p>
              <p className="text-gray-400">Pull Request、コードレビュー、コンフリクト解消</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold shrink-0">5</span>
            <div>
              <p className="text-white font-semibold">Git総合演習</p>
              <p className="text-gray-400">実践的なワークフローを通して全体を復習</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
