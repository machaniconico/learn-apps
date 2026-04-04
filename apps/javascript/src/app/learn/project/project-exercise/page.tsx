import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PROJECT_LESSONS } from "@/lib/lessons-data";

export default function ProjectExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 mb-4">実践プロジェクト レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オリジナルアプリ企画</h1>
        <p className="text-gray-400">自分だけのWebアプリを設計・実装しよう</p>
      </div>

      {/* プロジェクトの企画 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ1: アイデアの発想</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まずは作りたいアプリのアイデアを考えましょう。
          <strong className="text-indigo-400">自分が日常で「こんなアプリがあったら便利」と思うもの</strong>が
          最も良いテーマです。以下のカテゴリを参考にしてください。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">生産性ツール</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              <li>習慣トラッカー（毎日の達成を記録）</li>
              <li>ポモドーロタイマー（集中力管理）</li>
              <li>メモ・ナレッジベース（Notion風）</li>
              <li>家計簿アプリ</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-indigo-400 mb-2">コミュニティ</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
              <li>レシピ共有サイト</li>
              <li>読書記録・レビューアプリ</li>
              <li>質問掲示板（Stack Overflow風）</li>
              <li>イベント管理・募集アプリ</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 要件定義 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ2: 要件定義</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          アイデアが決まったら、具体的な要件を整理します。
          最初から完璧を目指さず、<strong className="text-indigo-400">MVP（Minimum Viable Product）</strong>として
          最小限の機能から始めましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`## 要件定義テンプレート（例: 習慣トラッカー）

### アプリ名: HabitFlow

### ターゲットユーザー
- 毎日の習慣を身につけたい社会人
- プログラミング学習の進捗を管理したい人

### MVP（最低限の機能）
- [ ] ユーザー登録・ログイン
- [ ] 習慣の登録（名前、頻度、カテゴリ）
- [ ] 日ごとの達成チェック
- [ ] 連続達成日数の表示
- [ ] 週間/月間のカレンダービュー

### 将来的に追加したい機能
- 統計グラフ（達成率の推移）
- リマインダー通知
- 友達との共有・ランキング
- データのエクスポート

### 技術スタック
- フロントエンド: Next.js + Tailwind CSS
- バックエンド: Next.js API Routes / Server Actions
- データベース: PostgreSQL + Prisma
- 認証: NextAuth.js
- デプロイ: Vercel`}</code>
        </pre>
      </section>

      {/* ワイヤーフレーム */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ3: ワイヤーフレーム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コードを書く前に、画面の構成を簡単なスケッチで整理しましょう。
          紙やFigma、Excalidraw などのツールが使えます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`画面構成（ページ一覧）:

1. / (ランディングページ)
   - アプリの説明
   - 「始める」ボタン → ログインへ

2. /login (ログインページ)
   - メール + パスワード
   - Googleログインボタン

3. /dashboard (ダッシュボード)
   - 今日の習慣一覧 + チェックボックス
   - 連続達成日数
   - 週間カレンダー

4. /habits/new (習慣の追加)
   - 名前、頻度（毎日/週n回）、カテゴリ

5. /habits/[id] (習慣の詳細)
   - 月間カレンダー
   - 達成率
   - 編集・削除ボタン

6. /settings (設定)
   - プロフィール編集
   - アカウント削除`}</code>
        </pre>
      </section>

      {/* データベース設計 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ4: データベース設計</h2>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// prisma/schema.prisma（習慣トラッカーの例）

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  habits    Habit[]
  createdAt DateTime @default(now())
}

model Habit {
  id        String    @id @default(cuid())
  name      String
  category  String    @default("general")
  frequency String    @default("daily") // daily, weekly
  user      User      @relation(fields: [userId], references: [id])
  userId    String
  records   Record[]
  createdAt DateTime  @default(now())
}

model Record {
  id        String   @id @default(cuid())
  habit     Habit    @relation(fields: [habitId], references: [id])
  habitId   String
  date      DateTime
  completed Boolean  @default(true)

  @@unique([habitId, date])
}

// 設計のポイント:
// - Record テーブルで「いつ達成したか」を記録
// - habitId + date の複合ユニーク制約で重複を防止
// - frequency で「毎日」「週N回」など柔軟に対応`}</code>
        </pre>
      </section>

      {/* 開発の進め方 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ステップ5: 開発の進め方</h2>
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">1</span>
            <div>
              <p className="text-white font-semibold">プロジェクトのセットアップ</p>
              <p className="text-gray-400 text-sm">Next.js プロジェクト作成、Prisma 初期化、Git リポジトリ作成</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">2</span>
            <div>
              <p className="text-white font-semibold">データベースとAPIの構築</p>
              <p className="text-gray-400 text-sm">スキーマ定義、マイグレーション、基本的なCRUD操作</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">3</span>
            <div>
              <p className="text-white font-semibold">UIの実装</p>
              <p className="text-gray-400 text-sm">ページの作成、コンポーネント分割、スタイリング</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">4</span>
            <div>
              <p className="text-white font-semibold">認証の追加</p>
              <p className="text-gray-400 text-sm">NextAuth.js でログイン機能を実装</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">5</span>
            <div>
              <p className="text-white font-semibold">テストとデプロイ</p>
              <p className="text-gray-400 text-sm">動作確認、バグ修正、Vercel にデプロイして公開</p>
            </div>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>自分が使いたいアプリをテーマに選ぶとモチベーションが続く</li>
          <li>MVP（最低限の機能）を定義し、小さく始めて段階的に拡張する</li>
          <li>ワイヤーフレームで画面構成を整理してからコードを書く</li>
          <li>データベース設計はリレーションを意識して正規化する</li>
          <li>Git でバージョン管理し、こまめにコミットする習慣をつける</li>
          <li>完成したら GitHub で公開し、ポートフォリオに加えよう</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="project" lessonId="project-exercise" color="blue" />
      <LessonNav lessons={PROJECT_LESSONS} currentId="project-exercise" basePath="/learn/project" color="blue" />
    </div>
  );
}
