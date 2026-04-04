import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CODE_REVIEW_LESSONS } from "@/lib/lessons-data";

export default function PrWritingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="bg-orange-500/20 text-orange-400 text-xs font-semibold px-2 py-1 rounded">コードレビュー レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2 mt-2">良いPRの書き方</h1>
        <p className="text-gray-400">レビューしやすいPull Requestを作成するテクニックを学ぼう</p>
      </div>

      {/* PRタイトルの書き方 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PRタイトルの書き方</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PRタイトルは、<strong className="text-orange-400">何を変更したか</strong>が一目で分かるように書きます。
          多くのチームではConventional Commitsに似たプレフィックスを使います。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">プレフィックスの種類</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div><code className="text-orange-400">feat:</code> <span className="text-gray-300">新機能</span></div>
              <div><code className="text-orange-400">fix:</code> <span className="text-gray-300">バグ修正</span></div>
              <div><code className="text-orange-400">refactor:</code> <span className="text-gray-300">リファクタリング</span></div>
              <div><code className="text-orange-400">docs:</code> <span className="text-gray-300">ドキュメント</span></div>
              <div><code className="text-orange-400">style:</code> <span className="text-gray-300">スタイル修正</span></div>
              <div><code className="text-orange-400">test:</code> <span className="text-gray-300">テスト追加</span></div>
              <div><code className="text-orange-400">chore:</code> <span className="text-gray-300">雑務</span></div>
              <div><code className="text-orange-400">perf:</code> <span className="text-gray-300">パフォーマンス改善</span></div>
              <div><code className="text-orange-400">ci:</code> <span className="text-gray-300">CI/CD変更</span></div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <h3 className="font-semibold text-green-400 mb-2">良いタイトルの例</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><code className="text-green-400">feat: ユーザープロフィール編集機能を追加</code></li>
              <li><code className="text-green-400">fix: ログインページのバリデーションエラーを修正</code></li>
              <li><code className="text-green-400">refactor: UserService のDB接続処理を共通化</code></li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <h3 className="font-semibold text-red-400 mb-2">悪いタイトルの例</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><code className="text-red-400">修正</code> <span className="text-gray-500">- 何を？</span></li>
              <li><code className="text-red-400">update files</code> <span className="text-gray-500">- どのファイルを？なぜ？</span></li>
              <li><code className="text-red-400">WIP</code> <span className="text-gray-500">- 内容が全く分からない</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* PR説明文テンプレート */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PR説明文テンプレート</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レビュアーが素早くコンテキストを理解できるよう、
          <strong className="text-orange-400">What / Why / How / Testing</strong>の4点を必ず記載しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`## What（何を変更したか）
ユーザープロフィール編集画面を新規作成しました。
名前、メールアドレス、プロフィール画像の変更が可能です。

## Why（なぜこの変更が必要か）
Issue #123 の対応。ユーザーからプロフィール編集の要望が多数あり、
MVP機能として実装しました。

## How（どのように実装したか）
- ProfileEditForm コンポーネントを新規作成
- useProfile カスタムHookでAPI通信を管理
- 画像アップロードには presigned URL を使用

## Testing（テスト方法）
- [ ] プロフィール名の変更が反映されることを確認
- [ ] バリデーションエラーが表示されることを確認
- [ ] 画像アップロード後にプレビューが表示されることを確認
- [ ] 既存のユニットテストが全てパスすることを確認

## スクリーンショット
（UI変更がある場合はここに添付）`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">チームへの導入方法</p>
          <p className="text-sm text-gray-300">
            GitHubでは <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">.github/PULL_REQUEST_TEMPLATE.md</code> に
            テンプレートを配置すると、PR作成時に自動で反映されます。
          </p>
        </div>
      </section>

      {/* 小さなPR vs 大きなPR */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">小さなPR vs 大きなPR</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PRのサイズは<strong className="text-orange-400">レビューの質</strong>に直結します。
          大きなPRほどレビューが雑になりがちで、バグが見逃されやすくなります。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <h3 className="font-semibold text-green-400 mb-2">小さなPR（推奨）</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>&#8226; 変更行数: <strong>200行以下</strong>が目安</li>
              <li>&#8226; 1つの論理的な変更に集中</li>
              <li>&#8226; レビューが速い（15-30分）</li>
              <li>&#8226; フィードバックが具体的になる</li>
              <li>&#8226; コンフリクトが起きにくい</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <h3 className="font-semibold text-red-400 mb-2">大きなPR（避けるべき）</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>&#8226; 変更行数: <strong>500行以上</strong></li>
              <li>&#8226; 複数の機能が混在</li>
              <li>&#8226; レビューに数時間かかる</li>
              <li>&#8226; 「LGTM」で済まされやすい</li>
              <li>&#8226; マージ後の問題特定が困難</li>
            </ul>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 大きな機能を小さなPRに分割する例

# PR 1: データモデルとDBマイグレーション
feat: プロフィールテーブルにavatarUrlカラムを追加

# PR 2: バックエンドAPI
feat: プロフィール画像アップロードAPIを実装

# PR 3: フロントエンドUI
feat: プロフィール画像編集UIを追加

# PR 4: テストと仕上げ
test: プロフィール画像機能のテストを追加`}</code>
        </pre>
      </section>

      {/* スクリーンショットとDraft PR */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スクリーンショットとDraft PR</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          UI変更を含むPRでは、<strong className="text-orange-400">Before/After</strong>のスクリーンショットを
          添付することでレビュアーの理解を大幅に助けます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`## スクリーンショット

| Before | After |
|--------|-------|
| ![before](url) | ![after](url) |

### 動作確認（アニメーションがある場合はGIF）
![demo](url)`}</code>
        </pre>
        <div className="mt-4 p-4 rounded-lg bg-gray-800 border border-gray-700">
          <h3 className="font-semibold text-orange-400 mb-2">Draft PRの活用</h3>
          <p className="text-gray-300 text-sm mb-2">
            実装途中でも<strong className="text-orange-400">Draft PR</strong>として公開することで、
            早い段階でフィードバックをもらうことができます。
          </p>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>&#8226; 設計方針の確認を早めに行える</li>
            <li>&#8226; 大きな手戻りを防止できる</li>
            <li>&#8226; チームメンバーに作業の進捗を共有できる</li>
            <li>&#8226; 「Ready for review」に変更するまでマージされない</li>
          </ul>
        </div>
      </section>

      {/* Issueとの紐付けとコミットメッセージ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Issueとの紐付けとコミットメッセージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PRとIssueを紐付けることで、「なぜこの変更をしたか」のトレーサビリティが確保されます。
          GitHubではキーワードを使って自動的にIssueをクローズできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`## PR説明文でIssueを紐付ける

Closes #123       <!-- マージ時にIssue #123を自動クローズ -->
Fixes #456        <!-- バグ修正の場合 -->
Resolves #789     <!-- 同じく自動クローズ -->
Related to #101   <!-- 関連はあるがクローズしない -->
Part of #202      <!-- 大きなIssueの一部の場合 -->`}</code>
        </pre>
        <div className="mt-6">
          <h3 className="font-semibold text-white mb-3">良いコミットメッセージ</h3>
          <p className="text-gray-300 text-sm mb-3">
            コミットメッセージも、将来の自分やチームメンバーのために丁寧に書きましょう。
          </p>
          <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-gray-300">{`# 良いコミットメッセージの構造
<type>: <subject>

<body>（任意）

<footer>（任意）

# 例:
feat: ユーザーアバター画像のアップロード機能を追加

- presigned URL を使用してS3に直接アップロード
- 画像サイズは最大5MBまでに制限
- WebP形式に自動変換してストレージ容量を節約

Closes #123`}</code>
          </pre>
          <div className="mt-3 grid md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm text-green-400 font-semibold mb-1">良い例</p>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>&#9989; <code>fix: カート合計金額が税込で計算されない問題を修正</code></li>
                <li>&#9989; <code>refactor: UserRepositoryをinterfaceベースに変更</code></li>
                <li>&#9989; <code>feat: 検索結果のページネーションを追加</code></li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-red-400 font-semibold mb-1">悪い例</p>
              <ul className="text-gray-300 text-xs space-y-1">
                <li>&#10060; <code>fix</code> <span className="text-gray-500">- 何を修正した？</span></li>
                <li>&#10060; <code>update</code> <span className="text-gray-500">- 何を更新した？</span></li>
                <li>&#10060; <code>aaa</code> <span className="text-gray-500">- 意味不明</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">まとめ</h2>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>&#8226; PRタイトルには<strong className="text-orange-400">プレフィックス</strong>を付けて変更内容を明確にする</li>
          <li>&#8226; 説明文は<strong className="text-orange-400">What / Why / How / Testing</strong>の構成で書く</li>
          <li>&#8226; PRは<strong className="text-orange-400">200行以下</strong>の小さな単位に分割する</li>
          <li>&#8226; UI変更には<strong className="text-orange-400">スクリーンショット</strong>を添付する</li>
          <li>&#8226; <strong className="text-orange-400">Draft PR</strong>で早期にフィードバックを得る</li>
          <li>&#8226; <strong className="text-orange-400">Issueとの紐付け</strong>でトレーサビリティを確保する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="code-review" lessonId="pr-writing" color="orange" />
      <LessonNav lessons={CODE_REVIEW_LESSONS} currentId="pr-writing" basePath="/learn/code-review" color="orange" />
    </div>
  );
}
