import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { AGILE_LESSONS } from "@/lib/lessons-data";

export default function AgileBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 mb-4">アジャイル レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アジャイル開発とは</h1>
        <p className="text-gray-400">ウォーターフォールとの違い、アジャイル宣言の価値と原則を理解しよう</p>
      </div>

      {/* ウォーターフォール vs アジャイル */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ウォーターフォール vs アジャイル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">ウォーターフォール</strong>は、要件定義→設計→実装→テスト→リリースを
          順番に進める従来型の開発手法です。各工程が完了してから次に進むため、
          途中での仕様変更が困難でコストが高くなります。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          一方、<strong className="text-blue-400">アジャイル</strong>は短い反復サイクル（イテレーション）で
          開発を進め、各サイクルで動くソフトウェアをリリースします。
          フィードバックを素早く取り入れ、変化に柔軟に対応できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【ウォーターフォール】
要件定義 → 設計 → 実装 → テスト → リリース
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━→ 数ヶ月〜数年
  ・全工程が完了するまで動くものが見えない
  ・途中変更のコストが非常に高い
  ・大規模な要件が明確なプロジェクト向き

【アジャイル】
[計画→開発→テスト→リリース] → [計画→開発→テスト→リリース] → ...
━━━ Sprint 1 (2週間) ━━━   ━━━ Sprint 2 (2週間) ━━━
  ・毎スプリントで動くソフトウェアを提供
  ・フィードバックを次のスプリントに反映
  ・変化の多いプロジェクト向き`}</code>
        </pre>
      </section>

      {/* アジャイルソフトウェア開発宣言 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">アジャイルソフトウェア開発宣言（4つの価値）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          2001年、17人のソフトウェア開発者が集まり
          <strong className="text-blue-400">アジャイルソフトウェア開発宣言（Agile Manifesto）</strong>を発表しました。
          以下の4つの価値を重視します。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">1. 個人と対話</h3>
            <p className="text-sm text-gray-400">プロセスやツールよりも、<strong className="text-white">個人と対話</strong>を重視する。チーム内のコミュニケーションが最も大切。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">2. 動くソフトウェア</h3>
            <p className="text-sm text-gray-400">包括的なドキュメントよりも、<strong className="text-white">動くソフトウェア</strong>を重視する。実際に動くものが最良の進捗指標。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">3. 顧客との協調</h3>
            <p className="text-sm text-gray-400">契約交渉よりも、<strong className="text-white">顧客との協調</strong>を重視する。顧客と密接に連携し、本当に必要なものを作る。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">4. 変化への対応</h3>
            <p className="text-sm text-gray-400">計画に従うことよりも、<strong className="text-white">変化への対応</strong>を重視する。市場やユーザーの変化に柔軟に対応する。</p>
          </div>
        </div>
      </section>

      {/* アジャイルの12の原則 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">アジャイルの12の原則</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アジャイル宣言には、4つの価値を支える<strong className="text-blue-400">12の原則</strong>が定められています。
          特に重要な原則をいくつか紹介します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【アジャイルの12の原則（抜粋）】

1. 顧客満足を最優先し、価値のあるソフトウェアを
   早く継続的に提供する

2. 要求の変更を歓迎する。たとえ開発の後期であっても
   変化を味方につけて顧客の競争力を引き上げる

3. 動くソフトウェアを2〜3週間から2〜3ヶ月の
   間隔で頻繁にリリースする

4. ビジネス側の人と開発者は、プロジェクトを通して
   日々一緒に働く

5. 最良の設計や要求は、自己組織的なチームから生まれる

6. チーム内の情報伝達の最も効果的な方法は
   直接の対話（フェイス・トゥ・フェイス）である

7. 動くソフトウェアが進捗の最も重要な尺度である

8. 持続可能な開発ペースを維持する`}</code>
        </pre>
      </section>

      {/* 反復型開発のメリット */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">反復型開発（イテレーティブ開発）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アジャイルの核となるのが<strong className="text-blue-400">反復型開発</strong>です。
          短いサイクル（通常1〜4週間）で計画・開発・テスト・リリースを繰り返します。
          各イテレーションの終わりには、動作するソフトウェアのインクリメント（増分）が生まれます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【反復型開発のサイクル】

  ┌─────────────────────────────────┐
  │  1. 計画（Plan）                │
  │     - 今回のイテレーションの目標を決める │
  │     - ユーザーストーリーを選択する     │
  ├─────────────────────────────────┤
  │  2. 開発（Develop）             │
  │     - 機能を実装する              │
  │     - コードレビューを行う          │
  ├─────────────────────────────────┤
  │  3. テスト（Test）              │
  │     - 動作確認・品質検証           │
  │     - バグを修正する              │
  ├─────────────────────────────────┤
  │  4. レビュー（Review）           │
  │     - ステークホルダーにデモする      │
  │     - フィードバックを収集する       │
  ├─────────────────────────────────┤
  │  5. 振り返り（Retrospective）    │
  │     - 改善点を話し合う            │
  │     - 次のイテレーションに反映する    │
  └─────────────────────────────────┘
          ↓ 次のイテレーションへ ↓`}</code>
        </pre>
      </section>

      {/* メリットと課題 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">アジャイルのメリットと課題</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">メリット</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>変化に素早く対応できる</li>
              <li>早い段階でフィードバックを得られる</li>
              <li>リスクを早期に発見・軽減できる</li>
              <li>チームのモチベーションが高まりやすい</li>
              <li>顧客にとって価値あるものを優先的に届けられる</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">課題</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>全体のスコープが見えにくい</li>
              <li>チームの自律性・スキルが求められる</li>
              <li>ドキュメントが不足しがち</li>
              <li>ステークホルダーの積極的な参加が必要</li>
              <li>大規模プロジェクトでのスケーリングが難しい</li>
            </ul>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>ウォーターフォールは順次進行、アジャイルは反復型で変化に強い</li>
          <li>アジャイル宣言は「個人と対話」「動くソフトウェア」「顧客との協調」「変化への対応」の4つの価値を掲げる</li>
          <li>12の原則が、アジャイルの実践を支える指針となる</li>
          <li>反復型開発で短いサイクルごとに動くソフトウェアを届ける</li>
          <li>メリットは多いが、チームの成熟度やステークホルダーの協力が成功の鍵</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="agile" lessonId="basics" color="blue" />
      <LessonNav lessons={AGILE_LESSONS} currentId="basics" basePath="/learn/agile" color="blue" />
    </div>
  );
}
