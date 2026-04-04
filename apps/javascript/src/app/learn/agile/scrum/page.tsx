import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { AGILE_LESSONS } from "@/lib/lessons-data";

export default function ScrumLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 mb-4">アジャイル レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スクラム入門</h1>
        <p className="text-gray-400">スクラムの3つのロール、スプリント、セレモニーを理解しよう</p>
      </div>

      {/* スクラムの3つのロール */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スクラムの3つのロール</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">スクラム</strong>はアジャイル開発で最も広く使われるフレームワークです。
          チームは以下の3つのロールで構成されます。
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">プロダクトオーナー（PO）</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>プロダクトの価値を最大化する責任者</li>
              <li>プロダクトバックログの管理・優先順位付け</li>
              <li>ステークホルダーとの橋渡し</li>
              <li>「何を作るか」を決める</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">スクラムマスター（SM）</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>スクラムプロセスの促進・障害除去</li>
              <li>チームが自律的に動けるよう支援</li>
              <li>スクラムの正しい実践を指導</li>
              <li>「どう進めるか」を支える</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">開発チーム（Dev Team）</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>プロダクトを実際に開発するメンバー</li>
              <li>自己組織化されたクロスファンクショナルチーム</li>
              <li>理想は3〜9人程度</li>
              <li>「どう作るか」を決める</li>
            </ul>
          </div>
        </div>
      </section>

      {/* スプリント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スプリントとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">スプリント</strong>は、スクラムの開発サイクルの単位です。
          通常1〜4週間（多くは2週間）の固定期間で、計画から振り返りまでを一通り行います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【スプリントの流れ（2週間の例）】

Day 1（月曜）
  ┌──────────────────────────────┐
  │  スプリントプランニング（2〜4時間） │
  │  - スプリントゴールの設定         │
  │  - バックログから項目を選択        │
  │  - タスクの分解・見積もり         │
  └──────────────────────────────┘

Day 1〜9（毎日）
  ┌──────────────────────────────┐
  │  デイリースクラム（15分）          │
  │  - 昨日やったこと              │
  │  - 今日やること               │
  │  - 困っていること（障害）         │
  └──────────────────────────────┘

Day 10（金曜）
  ┌──────────────────────────────┐
  │  スプリントレビュー（1〜2時間）     │
  │  - 成果物のデモ               │
  │  - ステークホルダーからフィードバック │
  ├──────────────────────────────┤
  │  スプリントレトロスペクティブ（1時間）│
  │  - 良かったこと / 改善したいこと   │
  │  - 次のスプリントへのアクション     │
  └──────────────────────────────┘`}</code>
        </pre>
      </section>

      {/* スクラムのセレモニー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スクラムの4つのセレモニー</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">1. スプリントプランニング</h3>
            <p className="text-sm text-gray-400 mb-2">スプリントの最初に行い、何を達成するか計画する。</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
              <li>スプリントゴールを決定</li>
              <li>プロダクトバックログから項目を選択</li>
              <li>タスクに分解して見積もる</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">2. デイリースクラム（スタンドアップ）</h3>
            <p className="text-sm text-gray-400 mb-2">毎日15分の短い同期ミーティング。</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
              <li>昨日やったこと</li>
              <li>今日やること</li>
              <li>障害になっていること</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">3. スプリントレビュー</h3>
            <p className="text-sm text-gray-400 mb-2">スプリントの成果物をデモし、フィードバックを受ける。</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
              <li>動くソフトウェアを見せる</li>
              <li>ステークホルダーと意見交換</li>
              <li>バックログの調整</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">4. スプリントレトロスペクティブ</h3>
            <p className="text-sm text-gray-400 mb-2">チームのプロセスを振り返り、改善する。</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
              <li>Keep: 良かったこと</li>
              <li>Problem: 問題だったこと</li>
              <li>Try: 次に試すこと</li>
            </ul>
          </div>
        </div>
      </section>

      {/* スプリントバックログとプロダクトバックログ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">バックログの管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スクラムでは2種類のバックログを使い分けます。
          <strong className="text-blue-400">プロダクトバックログ</strong>は全体の要望リスト、
          <strong className="text-blue-400">スプリントバックログ</strong>は今回のスプリントで取り組む項目です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【プロダクトバックログ】           【スプリントバックログ】
POが管理・優先順位付け             開発チームが管理

優先度高 ┌─────────────────┐    ┌─────────────────┐
  1.  │ ログイン機能      │ ──→│ ログイン機能      │
  2.  │ ユーザー登録      │ ──→│ ユーザー登録      │
  3.  │ プロフィール編集   │ ──→│ プロフィール編集   │
  4.  │ パスワードリセット  │    └─────────────────┘
  5.  │ 検索機能         │    ↑ 今回のスプリントで
  6.  │ 通知機能         │      取り組む項目
  7.  │ ダッシュボード     │
優先度低 └─────────────────┘

【ユーザーストーリーの形式】
「<ユーザーの種類>として、
  <達成したいこと>をしたい。
  なぜなら<理由>だからだ。」

例: 「一般ユーザーとして、
     メールアドレスでログインしたい。
     なぜならSNSアカウントを持っていないからだ。」`}</code>
        </pre>
      </section>

      {/* Definition of Done とベロシティ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Definition of Done（完了の定義）とベロシティ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">Definition of Done（DoD）</strong>は、バックログアイテムが
          「完了」と見なされる条件をチームで合意したものです。
          品質基準を統一し、「できたつもり」を防ぎます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【Definition of Done の例】
✅ コードが実装されている
✅ ユニットテストが書かれている（カバレッジ80%以上）
✅ コードレビューが完了している
✅ CIが全てパスしている
✅ ステージング環境で動作確認済み
✅ ドキュメントが更新されている

【ベロシティ（Velocity）】
チームが1スプリントで完了させるストーリーポイントの合計

Sprint 1: 18ポイント
Sprint 2: 22ポイント
Sprint 3: 20ポイント
→ 平均ベロシティ = 20ポイント/Sprint

ベロシティを使って：
- 次のスプリントで取り込む量の目安にする
- プロジェクト全体の完了見込みを予測する
- チームのキャパシティを把握する`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>スクラムは3つのロール（PO・SM・開発チーム）で構成される</li>
          <li>スプリントは1〜4週間の固定期間で、計画からレトロスペクティブまでを繰り返す</li>
          <li>4つのセレモニー（プランニング・デイリー・レビュー・レトロ）でチームを同期する</li>
          <li>プロダクトバックログとスプリントバックログで作業を管理する</li>
          <li>Definition of Doneで品質基準を統一し、ベロシティでキャパシティを把握する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="agile" lessonId="scrum" color="blue" />
      <LessonNav lessons={AGILE_LESSONS} currentId="scrum" basePath="/learn/agile" color="blue" />
    </div>
  );
}
