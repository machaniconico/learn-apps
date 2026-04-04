import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { TYPESCRIPT_LESSONS } from "@/lib/lessons-data";

export default function TypeScriptLearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400 mb-2">TypeScript入門</h1>
        <DifficultyBadge difficulty="beginner" />
        <p className="text-gray-400">JavaScriptに型を加えて、より安全で生産性の高い開発を学びましょう</p>
      </div>

      <ProgressBar categoryId="typescript" totalLessons={5} color="green" />

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={TYPESCRIPT_LESSONS} basePath="/learn/typescript" color="green" />
      </section>

      {/* TypeScriptとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">TypeScriptとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">TypeScript</strong>は、
          Microsoftが開発したJavaScriptのスーパーセットです。
          JavaScriptに「型システム」を追加することで、コードの品質と開発効率を大幅に向上させます。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptのコードはコンパイル時にJavaScriptに変換されるため、
          ブラウザやNode.jsなど、JavaScriptが動く環境ならどこでも利用できます。
          現在、React、Next.js、Angular、Vueなど主要なフレームワークで標準的に採用されています。
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128737;</div>
            <h3 className="font-semibold text-white mb-1">型安全</h3>
            <p className="text-sm text-gray-400">コンパイル時にエラーを検出し、バグを未然に防ぐ</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128640;</div>
            <h3 className="font-semibold text-white mb-1">開発効率</h3>
            <p className="text-sm text-gray-400">自動補完やリファクタリング支援が充実</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="text-2xl mb-2">&#128101;</div>
            <h3 className="font-semibold text-white mb-1">チーム開発</h3>
            <p className="text-sm text-gray-400">型がドキュメント代わりになり、意思疎通がスムーズ</p>
          </div>
        </div>
      </section>

      {/* 学習の進め方 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">このコースの進め方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          TypeScriptはブラウザで直接実行できないため、このコースではTypeScriptの構文を
          コードブロックで確認しながら、対応するJavaScriptの動作をプレイグラウンドで試す形式で進めます。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>TypeScriptのコードは<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">コードブロック</code>で表示します</li>
          <li>実際に動かせるJavaScriptコードは<code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">プレイグラウンド</code>で試せます</li>
          <li>JavaScriptの知識がある前提で進めます（先にJavaScriptコースを終えましょう）</li>
        </ul>
      </section>
    </div>
  );
}
