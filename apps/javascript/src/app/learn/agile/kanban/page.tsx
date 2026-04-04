import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { AGILE_LESSONS } from "@/lib/lessons-data";

export default function KanbanLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 mb-4">アジャイル レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カンバンとタスク管理</h1>
        <p className="text-gray-400">カンバンボード、WIP制限、フロー効率でチームの生産性を高めよう</p>
      </div>

      {/* カンバンボード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">カンバンボードとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">カンバン（Kanban）</strong>は、トヨタ生産方式から生まれた
          タスク管理手法です。作業の流れを「見える化」し、ボトルネックを発見・解消することで
          チーム全体のフロー効率を高めます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【カンバンボードの基本構成】

┌──────────┬──────────┬──────────┬──────────┐
│ Backlog  │  To Do   │ In Progress │  Done   │
│          │  (WIP:3) │  (WIP:2)    │         │
├──────────┼──────────┼──────────┼──────────┤
│ 検索機能  │ ログイン  │ ユーザー登録│ DB設計   │
│ 通知機能  │ API設計   │ テスト追加  │ 環境構築  │
│ ダッシュ  │ UI修正   │            │ CI設定   │
│ レポート  │          │            │          │
└──────────┴──────────┴──────────┴──────────┘

カードは左から右へ流れる
→ 各列のカード数がWIP制限を超えないようにする`}</code>
        </pre>
      </section>

      {/* WIP制限 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">WIP制限（Work In Progress Limit）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">WIP制限</strong>は、各列で同時に進行できる作業の上限数です。
          マルチタスクを防ぎ、一つ一つの作業を確実に完了させることで、
          全体のスループットを向上させます。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">WIP制限なし</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>大量のタスクが同時進行</li>
              <li>コンテキストスイッチが頻発</li>
              <li>個々のタスクの完了が遅れる</li>
              <li>ボトルネックが見えにくい</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">WIP制限あり</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>少数のタスクに集中</li>
              <li>コンテキストスイッチが減少</li>
              <li>個々のタスクが早く完了</li>
              <li>ボトルネックが即座に可視化</li>
            </ul>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mt-4">
          <code className="text-gray-300 font-mono">{`【WIP制限の設定目安】
- チームメンバー数の1〜1.5倍が目安
- 例: 開発者3人なら WIP制限 = 3〜5

【WIP制限が埋まったら？】
1. 新しい作業を始めない
2. 既存の作業を完了させることに集中
3. ブロックされているタスクの障害を除去
4. 他のメンバーの作業をペアプロで手伝う`}</code>
        </pre>
      </section>

      {/* フロー効率 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">フロー効率とリードタイム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カンバンでは<strong className="text-blue-400">フロー効率</strong>を重視します。
          タスクが「作業開始」から「完了」までにかかる時間（リードタイム）を短くすることが目標です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【主要メトリクス】

リードタイム（Lead Time）
  タスクがバックログに入ってから完了するまでの時間
  例: 月曜にTo Do → 木曜にDone = リードタイム 4日

サイクルタイム（Cycle Time）
  タスクの作業を開始してから完了するまでの時間
  例: 火曜にIn Progress → 木曜にDone = サイクルタイム 3日

スループット
  一定期間に完了したタスクの数
  例: 1週間に8タスク完了 = スループット 8タスク/週

フロー効率 = 実作業時間 / リードタイム × 100
  例: リードタイム4日のうち実作業2日
      → フロー効率 = 50%（待ち時間が半分）`}</code>
        </pre>
      </section>

      {/* スクラム vs カンバン */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スクラム vs カンバン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スクラムとカンバンはどちらもアジャイルのフレームワークですが、
          アプローチが異なります。プロジェクトの特性に応じて使い分けましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【比較表】

項目            │ スクラム           │ カンバン
────────────────┼───────────────────┼──────────────────
イテレーション    │ 固定（Sprint）      │ なし（継続フロー）
ロール          │ PO, SM, Dev Team   │ 特に定めなし
計画            │ スプリント単位       │ 必要に応じて随時
変更            │ Sprint中は原則不可   │ いつでも可能
指標            │ ベロシティ          │ リードタイム
会議            │ 4つのセレモニー      │ 必要最小限
向いている場面    │ 新規開発           │ 運用・保守・サポート
WIP制限         │ Sprintの容量で制限  │ 列ごとに明示的制限

【Scrumban（スクラムバン）】
スクラムとカンバンのいいとこ取りをした手法もある
- スプリントの枠組み + WIP制限
- デイリースタンドアップ + カンバンボード`}</code>
        </pre>
      </section>

      {/* スイムレーンと累積フロー図 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">スイムレーンと累積フロー図</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          カンバンボードをさらに効果的に活用するための手法として、
          <strong className="text-blue-400">スイムレーン</strong>と
          <strong className="text-blue-400">累積フロー図（CFD）</strong>があります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【スイムレーン（横方向の区分）】

             │ To Do │ In Progress │ Done │
─────────────┼───────┼─────────────┼──────┤
Feature      │ ○○   │ ○           │ ○○○ │
─────────────┼───────┼─────────────┼──────┤
Bug Fix      │ ○    │ ○○          │ ○   │
─────────────┼───────┼─────────────┼──────┤
Urgent       │      │ ○           │ ○   │
─────────────┴───────┴─────────────┴──────┘

→ タスクの種類ごとに行を分け、優先度や担当を可視化

【累積フロー図（Cumulative Flow Diagram）】

タスク数
  30 │          ████████████████ Done
     │       ███████████████ In Progress
  20 │    ████████████████ To Do
     │  ██████████████
  10 │████████████
     │█████████
   0 └──────────────────────→ 日数
     Week1  Week2  Week3  Week4

→ 各ステータスのタスク数の推移を積み上げグラフで表示
→ 帯の幅が一定 = 安定したフロー
→ 帯が広がる = ボトルネックの発生`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>カンバンボードで作業の流れを「見える化」し、ボトルネックを発見する</li>
          <li>WIP制限で同時進行タスクを制限し、マルチタスクを防いでスループットを向上させる</li>
          <li>リードタイム・サイクルタイム・フロー効率でチームの健全性を計測する</li>
          <li>スクラムは固定スプリント、カンバンは継続フロー。プロジェクトに応じて選択する</li>
          <li>スイムレーンと累積フロー図でカンバンボードの活用をさらに深める</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="agile" lessonId="kanban" color="blue" />
      <LessonNav lessons={AGILE_LESSONS} currentId="kanban" basePath="/learn/agile" color="blue" />
    </div>
  );
}
