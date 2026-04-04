import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { AGILE_LESSONS } from "@/lib/lessons-data";

export default function AgileToolsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 mb-4">アジャイル レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">開発ツールと運用</h1>
        <p className="text-gray-400">Jira、Linear、GitHub Projectsなど現場で使われるツールを学ぼう</p>
      </div>

      {/* Jira */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Jira の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">Jira</strong>は Atlassian が提供するプロジェクト管理ツールで、
          アジャイル開発の現場で最も広く使われています。
          スクラムボード、カンバンボード、バックログ管理を包括的にサポートします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【Jira の主要概念】

プロジェクト
  └── エピック（大きな機能単位）
       └── ストーリー（ユーザーストーリー）
            └── サブタスク（細かい作業）

【課題タイプ（Issue Type）】
  - Epic:    大きな機能のまとまり（例: ユーザー認証機能）
  - Story:   ユーザーストーリー（例: ログインフォームの実装）
  - Task:    技術タスク（例: CI/CDパイプラインの構築）
  - Bug:     バグ修正（例: ログイン時のエラーハンドリング）
  - Sub-task: 親タスクの細分化（例: バリデーション実装）

【ワークフロー】
  To Do → In Progress → In Review → Done

【Jira のボードビュー】
  - スクラムボード: スプリント単位でタスクを管理
  - カンバンボード: 継続フローでタスクを管理`}</code>
        </pre>
      </section>

      {/* Linear */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Linear</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">Linear</strong>は、モダンなUIとキーボードショートカットが特徴の
          プロジェクト管理ツールです。スタートアップや開発者主導のチームで人気があります。
          Jiraよりシンプルで高速な操作性が魅力です。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">Linear の特徴</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>キーボードファーストの高速な操作</li>
              <li>GitHub/GitLab との深い連携</li>
              <li>サイクル（スプリント相当）管理</li>
              <li>自動ワークフロー（Triage → Active → Done）</li>
              <li>プロジェクトとロードマップ機能</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">Jira vs Linear</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
              <li>Jira: 機能が豊富、大企業向け、カスタマイズ性高い</li>
              <li>Linear: シンプル・高速、開発者向け、セットアップが簡単</li>
              <li>Jira: Confluenceなどとの連携が強力</li>
              <li>Linear: Slack/GitHub連携がスムーズ</li>
            </ul>
          </div>
        </div>
      </section>

      {/* GitHub Projects */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">GitHub Projects</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">GitHub Projects</strong>は、GitHubに組み込まれた
          プロジェクト管理機能です。Issue や Pull Request と直接連携でき、
          コードと管理を一つのプラットフォームで完結できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【GitHub Projects の活用】

1. Issue テンプレートを作成
   .github/ISSUE_TEMPLATE/feature.yml
   .github/ISSUE_TEMPLATE/bug.yml

2. ラベルで分類
   - feature, bug, enhancement, documentation
   - priority: high, medium, low
   - size: S, M, L, XL

3. マイルストーンでリリース管理
   - v1.0 (Sprint 1-3)
   - v1.1 (Sprint 4-5)

4. Projects ボードでカンバン管理
   ┌─────────┬──────────┬────────┐
   │ Todo    │ In Progress│ Done  │
   │ #12     │ #8        │ #3    │
   │ #15     │ #11       │ #5    │
   └─────────┴──────────┴────────┘

5. 自動化ルール
   - Issue作成時 → Todoに自動追加
   - PR マージ時 → Doneに自動移動`}</code>
        </pre>
      </section>

      {/* Issue テンプレートとストーリーポイント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Issue テンプレートとストーリーポイント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          チームで統一されたフォーマットでIssueを作成することで、情報の抜け漏れを防ぎます。
          また、<strong className="text-blue-400">ストーリーポイント</strong>でタスクの相対的な大きさを見積もります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【Issue テンプレートの例】

## 概要
ユーザーがメールアドレスでログインできるようにする

## ユーザーストーリー
一般ユーザーとして、メールとパスワードでログインしたい

## 受け入れ条件（Acceptance Criteria）
- [ ] メールアドレスとパスワードの入力フォーム
- [ ] バリデーション（メール形式、パスワード8文字以上）
- [ ] ログイン成功時にダッシュボードへリダイレクト
- [ ] ログイン失敗時にエラーメッセージ表示

## ストーリーポイント: 5

---

【ストーリーポイントの見積もり（フィボナッチ数列）】

 1点: 数時間で終わる小さな変更（テキスト修正など）
 2点: 半日〜1日程度の作業
 3点: 1〜2日の作業
 5点: 2〜3日の作業
 8点: 3〜5日の作業（分割を検討）
13点: 1週間以上（必ず分割する）

※ ポイントは「時間」ではなく「複雑さ・不確実性」を表す
※ プランニングポーカーでチーム全員で見積もる`}</code>
        </pre>
      </section>

      {/* バーンダウンチャートとレトロスペクティブ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">バーンダウンチャートとレトロスペクティブ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-blue-400">バーンダウンチャート</strong>はスプリントの進捗を可視化するグラフです。
          残作業量が計画通りに減っているかを一目で確認できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`【バーンダウンチャート】

残SP
  30 │●
     │  ●─ ─ ─ 理想線（直線的に減少）
  20 │    ○
     │      ○      ● 実績線
  10 │        ○  ●
     │          ●
   0 └──────────────────→
     Day1  3   5   7   9  10

● = 理想の進捗
○ = 実際の進捗

理想線より上 → 遅れている（スコープ調整が必要）
理想線より下 → 順調（追加タスクを検討可能）

---

【レトロスペクティブのフォーマット】

1. KPT法
   Keep:    継続すべき良い取り組み
   Problem: 改善が必要な問題点
   Try:     次に試してみること

2. Start / Stop / Continue
   Start:    新しく始めること
   Stop:     やめること
   Continue: 続けること

3. 4Ls
   Liked:   良かったこと
   Learned: 学んだこと
   Lacked:  足りなかったこと
   Longed:  欲しかったこと`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Jiraは機能豊富でエンタープライズ向け、Linearはシンプルで開発者フレンドリー</li>
          <li>GitHub Projectsはコードとタスク管理を一元化でき、小〜中規模チームに最適</li>
          <li>Issueテンプレートで情報の抜け漏れを防ぎ、チームの共通認識を作る</li>
          <li>ストーリーポイントで相対見積もりし、フィボナッチ数列でサイズを表現する</li>
          <li>バーンダウンチャートで進捗を可視化し、レトロスペクティブで継続的に改善する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="agile" lessonId="tools" color="blue" />
      <LessonNav lessons={AGILE_LESSONS} currentId="tools" basePath="/learn/agile" color="blue" />
    </div>
  );
}
