import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GIT_LESSONS } from "@/lib/lessons-data";

export default function GitCollaborationLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Git レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">チーム開発</h1>
        <p className="text-gray-400">Pull Request、コードレビュー、コンフリクト解消の実践</p>
      </div>

      {/* Pull Requestとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Pull Request（PR）とは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">Pull Request（プルリクエスト）</strong>は、
          「このブランチの変更をメインブランチに取り込んでください」という依頼です。
          GitHubの中核的な機能で、チーム開発のワークフローに欠かせません。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          PRを通じて、コードレビュー、議論、CI（自動テスト）の確認を行い、
          品質を保ちながらコードを統合します。
        </p>
        <div className="my-6 p-4 rounded-lg bg-gray-950 font-mono text-sm overflow-x-auto">
          <pre>
            <code className="text-gray-300">{`  Pull Request のワークフロー

  1. feature ブランチで開発
  2. リモートに push
  3. GitHub で Pull Request を作成
  4. レビュアーがコードを確認
  5. フィードバックを反映（追加コミット）
  6. 承認（Approve）
  7. main にマージ
  8. feature ブランチを削除

  ┌──────┐    push    ┌──────────┐    PR     ┌──────┐
  │ local │  ──────▶  │ feature  │  ──────▶  │ main │
  │ work  │           │ (remote) │  review   │      │
  └──────┘           └──────────┘  approve  └──────┘`}</code>
          </pre>
        </div>
      </section>

      {/* PRの作り方 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Pull Requestの作成手順</h2>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 1. feature ブランチで作業
$ git switch -c feature/user-profile
# ... ファイルを編集 ...
$ git add .
$ git commit -m "feat: ユーザープロフィール画面を追加"

# 2. リモートにpush
$ git push -u origin feature/user-profile

# 3. GitHubで「Compare & pull request」ボタンをクリック
#    または GitHub CLI を使用:
$ gh pr create --title "ユーザープロフィール画面を追加" \\
               --body "## 変更内容
- プロフィール表示コンポーネントを作成
- APIからユーザー情報を取得する機能を追加

## スクリーンショット
（画像を貼る）"`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">良いPRの書き方</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <h4 className="font-semibold text-green-400 mb-2">良い例</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p><strong>タイトル:</strong> ユーザープロフィール画面を追加</p>
              <p><strong>説明:</strong></p>
              <ul className="text-gray-400 space-y-1 ml-4">
                <li>&#8226; 何を変更したか明確</li>
                <li>&#8226; なぜ変更が必要か説明</li>
                <li>&#8226; テスト方法を記載</li>
                <li>&#8226; スクリーンショット付き</li>
                <li>&#8226; 関連するIssue番号をリンク</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <h4 className="font-semibold text-red-400 mb-2">悪い例</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p><strong>タイトル:</strong> 修正</p>
              <p><strong>説明:</strong></p>
              <ul className="text-gray-400 space-y-1 ml-4">
                <li>&#8226; 何を修正したか不明</li>
                <li>&#8226; 説明なし</li>
                <li>&#8226; 変更が大きすぎる（1000行超）</li>
                <li>&#8226; 関係ない変更が混在</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* コードレビュー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コードレビュー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PRに対して他のメンバーが変更内容を確認し、フィードバックを行います。
          レビューはコードの品質向上だけでなく、知識の共有にも役立ちます。
        </p>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">レビューの3つのアクション</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h4 className="font-semibold text-green-400 mb-2">Approve</h4>
            <p className="text-sm text-gray-400">問題なし。マージしてOK。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h4 className="font-semibold text-yellow-400 mb-2">Comment</h4>
            <p className="text-sm text-gray-400">コメントのみ。承認も拒否もしない。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h4 className="font-semibold text-red-400 mb-2">Request Changes</h4>
            <p className="text-sm text-gray-400">修正が必要。対応するまでマージ不可。</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">レビューのポイント</h3>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3 items-start">
            <span className="text-red-400 font-bold shrink-0 w-6">1.</span>
            <div>
              <p className="text-white font-semibold">正確性</p>
              <p className="text-gray-400">ロジックにバグはないか？エッジケースは考慮されているか？</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-red-400 font-bold shrink-0 w-6">2.</span>
            <div>
              <p className="text-white font-semibold">可読性</p>
              <p className="text-gray-400">コードは読みやすいか？変数名・関数名は適切か？</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-red-400 font-bold shrink-0 w-6">3.</span>
            <div>
              <p className="text-white font-semibold">設計</p>
              <p className="text-gray-400">責務の分離は適切か？既存のパターンに従っているか？</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-red-400 font-bold shrink-0 w-6">4.</span>
            <div>
              <p className="text-white font-semibold">テスト</p>
              <p className="text-gray-400">テストは追加されているか？十分なカバレッジがあるか？</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-red-400 font-bold shrink-0 w-6">5.</span>
            <div>
              <p className="text-white font-semibold">セキュリティ</p>
              <p className="text-gray-400">機密情報の漏洩はないか？入力値の検証はされているか？</p>
            </div>
          </div>
        </div>
      </section>

      {/* マージコンフリクトの実践 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マージコンフリクトの解消（実践）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PRを作成した後にmainブランチが更新されると、コンフリクトが発生することがあります。
          その場合の解消手順を見てみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 1. main ブランチの最新を取得
$ git switch main
$ git pull origin main

# 2. feature ブランチに戻る
$ git switch feature/user-profile

# 3. main の変更を取り込む（ここでコンフリクト発生）
$ git merge main`}</code>
        </pre>
        <div className="mt-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-yellow-400 font-semibold mb-2">コンフリクトの表示例:</p>
          <pre className="text-sm overflow-x-auto">
            <code className="text-gray-300">{`Auto-merging src/components/Header.tsx
CONFLICT (content): Merge conflict in src/components/Header.tsx
Automatic merge failed; fix conflicts and then commit the result.`}</code>
          </pre>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm mt-4">
          <code className="text-gray-300">{`# 4. コンフリクトしたファイルを開いて解決
#    <<<<<<< ======= >>>>>>> のマーカーを削除して正しい内容にする

# コンフリクト箇所の例:
<<<<<<< HEAD (feature/user-profile)
<nav className="flex gap-4">
  <Link href="/profile">プロフィール</Link>
  <Link href="/settings">設定</Link>
</nav>
=======
<nav className="flex gap-6 items-center">
  <Link href="/dashboard">ダッシュボード</Link>
</nav>
>>>>>>> main

# 解決後（両方の変更を統合）:
<nav className="flex gap-6 items-center">
  <Link href="/dashboard">ダッシュボード</Link>
  <Link href="/profile">プロフィール</Link>
  <Link href="/settings">設定</Link>
</nav>`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm mt-4">
          <code className="text-gray-300">{`# 5. 解決したファイルをステージング
$ git add src/components/Header.tsx

# 6. マージコミットを作成
$ git commit -m "merge: main の変更を取り込み（コンフリクト解消）"

# 7. リモートにpush
$ git push origin feature/user-profile`}</code>
        </pre>
      </section>

      {/* Conventional Commits */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Conventional Commits</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">Conventional Commits</strong> は、コミットメッセージに統一ルールを
          設ける規約です。チーム開発で履歴を分かりやすくし、自動的なリリースノート生成にも活用されます。
        </p>
        <div className="my-4 p-4 rounded-lg bg-gray-950">
          <p className="text-sm text-gray-400 mb-2">形式:</p>
          <pre className="text-sm overflow-x-auto">
            <code className="text-red-400">{`<type>(<scope>): <description>

[optional body]

[optional footer]`}</code>
          </pre>
        </div>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">主なtype（種類）</h3>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3">
            <code className="text-green-400 font-mono w-20 shrink-0">feat</code>
            <span className="text-gray-300">新機能の追加</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-20 shrink-0">fix</code>
            <span className="text-gray-300">バグ修正</span>
          </div>
          <div className="flex gap-3">
            <code className="text-blue-400 font-mono w-20 shrink-0">docs</code>
            <span className="text-gray-300">ドキュメントのみの変更</span>
          </div>
          <div className="flex gap-3">
            <code className="text-yellow-400 font-mono w-20 shrink-0">style</code>
            <span className="text-gray-300">コードの意味に影響しない変更（空白、フォーマット等）</span>
          </div>
          <div className="flex gap-3">
            <code className="text-purple-400 font-mono w-20 shrink-0">refactor</code>
            <span className="text-gray-300">バグ修正でも新機能でもないコードの変更</span>
          </div>
          <div className="flex gap-3">
            <code className="text-cyan-400 font-mono w-20 shrink-0">test</code>
            <span className="text-gray-300">テストの追加・修正</span>
          </div>
          <div className="flex gap-3">
            <code className="text-gray-400 font-mono w-20 shrink-0">chore</code>
            <span className="text-gray-300">ビルドプロセスやツールの変更</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">コミットメッセージの例</h3>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 新機能
$ git commit -m "feat(auth): ログインフォームにパスワードリセット機能を追加"

# バグ修正
$ git commit -m "fix(header): モバイル表示でナビが崩れる問題を修正"

# ドキュメント
$ git commit -m "docs: READMEにセットアップ手順を追加"

# リファクタリング
$ git commit -m "refactor(api): ユーザー取得のAPIクライアントを整理"

# 破壊的変更（BREAKING CHANGE）
$ git commit -m "feat(api)!: レスポンス形式をv2に変更

BREAKING CHANGE: APIのレスポンス形式が変更されました。
クライアント側の修正が必要です。"`}</code>
        </pre>
      </section>

      {/* マージ戦略 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PRのマージ戦略</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GitHubでPRをマージする際、3つの方法を選択できます。
        </p>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">Create a merge commit</h3>
            <p className="text-sm text-gray-300 mb-2">
              マージコミットを作成して統合。すべてのコミット履歴がそのまま残る。
            </p>
            <pre className="text-xs bg-gray-950 rounded p-2 overflow-x-auto">
              <code className="text-gray-400">{`main: A ── B ── E ── M (merge commit)
               \\       /
feature:        C ── D`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">Squash and merge</h3>
            <p className="text-sm text-gray-300 mb-2">
              featureブランチの複数コミットを1つにまとめてマージ。履歴がすっきりする。
            </p>
            <pre className="text-xs bg-gray-950 rounded p-2 overflow-x-auto">
              <code className="text-gray-400">{`main: A ── B ── E ── S (squashed commit)

※ C, D が1つのコミット S にまとめられる`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-purple-400 mb-2">Rebase and merge</h3>
            <p className="text-sm text-gray-300 mb-2">
              featureのコミットをmainの先端にリベースしてから統合。直線的な履歴になる。
            </p>
            <pre className="text-xs bg-gray-950 rounded p-2 overflow-x-auto">
              <code className="text-gray-400">{`main: A ── B ── E ── C' ── D'

※ マージコミットなしの直線的な履歴`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* チーム開発のベストプラクティス */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">チーム開発のベストプラクティス</h2>
        <div className="space-y-4 text-sm">
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-white font-semibold mb-1">1. PRは小さく保つ</p>
            <p className="text-gray-400">変更は300行以下を目安に。大きな変更は分割してPRを作成する。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-white font-semibold mb-1">2. mainに直接pushしない</p>
            <p className="text-gray-400">必ずfeatureブランチを作成し、PRを通じてマージする。Branch Protection Rulesを設定する。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-white font-semibold mb-1">3. こまめにpull / fetchする</p>
            <p className="text-gray-400">最新の変更を定期的に取り込み、大きなコンフリクトを防ぐ。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-white font-semibold mb-1">4. コミットメッセージを丁寧に書く</p>
            <p className="text-gray-400">Conventional Commitsなどの規約に従い、変更の意図を明確にする。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-white font-semibold mb-1">5. CIを活用する</p>
            <p className="text-gray-400">GitHub Actionsでテスト・Lint・ビルドを自動実行し、品質を担保する。</p>
          </div>
        </div>
      </section>
      <LessonCompleteButton categoryId="git" lessonId="collaboration" color="green" />
      <LessonNav lessons={GIT_LESSONS} currentId="collaboration" basePath="/learn/git" color="green" />
    </div>
  );
}
