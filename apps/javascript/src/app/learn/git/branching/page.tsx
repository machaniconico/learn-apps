import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GIT_LESSONS } from "@/lib/lessons-data";

export default function GitBranchingLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Git レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ブランチ</h1>
        <p className="text-gray-400">並行して作業を進めるブランチの概念と操作を学ぼう</p>
      </div>

      {/* ブランチとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ブランチとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">ブランチ（branch）</strong>は、コミット履歴の「分岐」です。
          メインのコードに影響を与えずに、新しい機能の開発やバグ修正を独立して進められます。
          完成したら、メインのブランチに統合（マージ）します。
        </p>
        <div className="my-6 p-4 rounded-lg bg-gray-950 font-mono text-sm overflow-x-auto">
          <pre>
            <code className="text-gray-300">{`  main:       A ── B ── C ── D ── E ── F（マージコミット）
                          \\             /
  feature:                 C1 ── C2 ──

  ※ main から分岐して feature ブランチで開発
  ※ 完成したら main にマージ`}</code>
          </pre>
        </div>
        <p className="text-gray-300 leading-relaxed">
          ブランチを使うことで、「本番コードを壊さずに開発できる」「複数人が同時に別機能を開発できる」
          という大きなメリットがあります。
        </p>
      </section>

      {/* ブランチの作成と切り替え */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ブランチの作成と切り替え</h2>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# ブランチの一覧を表示（* が現在のブランチ）
$ git branch
* main
  feature/login

# 新しいブランチを作成
$ git branch feature/header

# ブランチを切り替え（switch が推奨）
$ git switch feature/header

# 作成と切り替えを同時に行う
$ git switch -c feature/header

# 古い書き方（checkout でも可能）
$ git checkout feature/header
$ git checkout -b feature/header    # 作成 + 切り替え`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">ブランチ名の慣習</p>
          <p className="text-sm text-gray-300">
            ブランチ名にはプレフィックスをつけると分かりやすくなります：
          </p>
          <ul className="text-sm text-gray-400 mt-2 space-y-1">
            <li><code className="text-red-400">feature/</code> - 新機能の開発（例: feature/login-form）</li>
            <li><code className="text-red-400">fix/</code> - バグ修正（例: fix/header-layout）</li>
            <li><code className="text-red-400">hotfix/</code> - 緊急修正（例: hotfix/security-patch）</li>
            <li><code className="text-red-400">refactor/</code> - リファクタリング（例: refactor/api-client）</li>
          </ul>
        </div>
      </section>

      {/* ブランチの削除 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ブランチの削除</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マージ完了後の不要なブランチは削除してリポジトリを整理しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# マージ済みのブランチを削除
$ git branch -d feature/header

# マージされていないブランチを強制削除
$ git branch -D feature/experimental

# リモートのブランチを削除
$ git push origin --delete feature/header`}</code>
        </pre>
      </section>

      {/* マージ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git merge - ブランチの統合</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          あるブランチの変更を別のブランチに取り込みます。
          通常は <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">main</code> ブランチに
          機能ブランチをマージします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# まず main ブランチに切り替え
$ git switch main

# feature ブランチを main にマージ
$ git merge feature/header`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">マージの種類</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h4 className="font-semibold text-green-400 mb-2">Fast-forward マージ</h4>
            <p className="text-sm text-gray-300 mb-3">
              main が分岐後に変更されていない場合。ポインタを進めるだけで済みます。
            </p>
            <pre className="text-xs overflow-x-auto">
              <code className="text-gray-400">{`Before:
main:    A ── B
                \\
feature:         C ── D

After (fast-forward):
main:    A ── B ── C ── D`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">3-way マージ</h4>
            <p className="text-sm text-gray-300 mb-3">
              両方のブランチに変更がある場合。マージコミットが作成されます。
            </p>
            <pre className="text-xs overflow-x-auto">
              <code className="text-gray-400">{`Before:
main:    A ── B ── E
                \\
feature:         C ── D

After (merge commit):
main:    A ── B ── E ── M
                \\       /
feature:         C ── D`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* コンフリクト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">マージコンフリクト（競合）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          同じファイルの同じ部分が両方のブランチで変更された場合、Gitは自動でマージできず、
          <strong className="text-red-400">コンフリクト（競合）</strong>が発生します。
          手動で解決する必要があります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# コンフリクトが発生したファイルの中身
<<<<<<< HEAD
<h1>メインブランチの変更</h1>
=======
<h1>featureブランチの変更</h1>
>>>>>>> feature/header`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mt-4 mb-3">
          コンフリクトの解決手順：
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 1. コンフリクトしたファイルを編集して正しい内容にする
#    （<<<<<<< ======= >>>>>>> のマーカーをすべて削除）

# 2. 解決したファイルをステージング
$ git add index.html

# 3. マージコミットを作成
$ git commit -m "feature/header をマージ（コンフリクト解消）"`}</code>
        </pre>
      </section>

      {/* リベース */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git rebase - 履歴を整理する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">rebase</code> は、
          ブランチの起点を別のコミットに移動させる操作です。
          マージと似ていますが、履歴が直線的になるのが特徴です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# feature ブランチで作業中に main の最新を取り込む
$ git switch feature/header
$ git rebase main`}</code>
        </pre>
        <div className="my-4 p-4 rounded-lg bg-gray-950 font-mono text-sm overflow-x-auto">
          <pre>
            <code className="text-gray-300">{`Before rebase:
main:    A ── B ── E
                \\
feature:         C ── D

After rebase:
main:    A ── B ── E
                     \\
feature:              C' ── D'

※ C, D が E の後ろに移動（C', D' は新しいコミット）`}</code>
          </pre>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-sm text-red-400 font-semibold mb-1">注意</p>
          <p className="text-sm text-gray-300">
            <strong>すでにリモートにpushしたコミットにはrebaseしない</strong>のが原則です。
            rebaseはコミットを書き換えるため、他の開発者の作業と衝突する原因になります。
            ローカルの作業ブランチでのみ使いましょう。
          </p>
        </div>
      </section>

      {/* ブランチ戦略 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ブランチ戦略</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          チームでの開発では、ブランチの使い方にルールを設けることが一般的です。
          代表的な戦略を紹介します。
        </p>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">GitHub Flow（シンプル）</h3>
        <p className="text-gray-300 text-sm mb-3">小規模チームや継続的デプロイ向け。シンプルで分かりやすい。</p>
        <div className="p-4 rounded-lg bg-gray-950 font-mono text-sm overflow-x-auto mb-6">
          <pre>
            <code className="text-gray-300">{`main ─────────────────────────────────▶ (常にデプロイ可能)
      \\                    /
       feature ── PR ── merge

1. main から feature ブランチを作成
2. 開発・コミット
3. Pull Request を作成
4. レビュー・承認
5. main にマージ → 自動デプロイ`}</code>
          </pre>
        </div>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">Git Flow（本格的）</h3>
        <p className="text-gray-300 text-sm mb-3">リリースサイクルが明確なプロジェクト向け。</p>
        <div className="p-4 rounded-lg bg-gray-950 font-mono text-sm overflow-x-auto">
          <pre>
            <code className="text-gray-300">{`main ─────────────────────────▶ (リリース版)
  │
develop ──────────────────────▶ (開発版)
  │      \\            /
  │    feature ── merge
  │
  ├── release/1.0 ── merge → main
  │
  └── hotfix ── merge → main + develop`}</code>
          </pre>
        </div>
        <div className="mt-3 text-sm text-gray-400 space-y-1">
          <p><code className="text-red-400">main</code> - 本番リリース用。常に安定版。</p>
          <p><code className="text-red-400">develop</code> - 開発統合用。feature はここにマージ。</p>
          <p><code className="text-red-400">feature/*</code> - 個別の機能開発。develop から分岐。</p>
          <p><code className="text-red-400">release/*</code> - リリース準備。develop から分岐して main にマージ。</p>
          <p><code className="text-red-400">hotfix/*</code> - 緊急修正。main から分岐。</p>
        </div>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">よく使うブランチコマンドまとめ</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git branch</code>
            <span className="text-gray-300">ブランチ一覧を表示</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git switch -c ブランチ名</code>
            <span className="text-gray-300">ブランチを作成して切り替え</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git switch ブランチ名</code>
            <span className="text-gray-300">ブランチを切り替え</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git merge ブランチ名</code>
            <span className="text-gray-300">指定ブランチを現在のブランチにマージ</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git rebase ブランチ名</code>
            <span className="text-gray-300">現在のブランチの起点を移動</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git branch -d ブランチ名</code>
            <span className="text-gray-300">マージ済みブランチを削除</span>
          </div>
        </div>
      </section>
      <LessonCompleteButton categoryId="git" lessonId="branching" color="green" />
      <LessonNav lessons={GIT_LESSONS} currentId="branching" basePath="/learn/git" color="green" />
    </div>
  );
}
