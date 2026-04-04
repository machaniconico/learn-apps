import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GIT_LESSONS } from "@/lib/lessons-data";

export default function GitExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Git レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Git総合演習</h1>
        <p className="text-gray-400">実践的なワークフローを通してGit/GitHubの全体像を体験しよう</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、実際のチーム開発で行われる一連のワークフローを体験します。
          プロジェクトの初期化から、feature ブランチでの開発、Pull Request の作成、
          コードレビュー、マージまでの流れを一通り実践します。
        </p>
        <div className="my-6 p-4 rounded-lg bg-gray-950 font-mono text-sm overflow-x-auto">
          <pre>
            <code className="text-gray-300">{`  演習の流れ:

  ① プロジェクト初期化 → ② 初期コミット → ③ GitHub にpush
       │
       ▼
  ④ feature ブランチ作成 → ⑤ 機能開発・コミット → ⑥ push
       │
       ▼
  ⑦ Pull Request 作成 → ⑧ レビュー対応 → ⑨ マージ
       │
       ▼
  ⑩ main に pull → ⑪ ブランチ削除 → ⑫ 完了！`}</code>
          </pre>
        </div>
      </section>

      {/* Step 1: プロジェクト初期化 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 1: プロジェクトの初期化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          新しいWebプロジェクトを作成し、Gitで管理を始めます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# プロジェクトディレクトリを作成
$ mkdir my-portfolio
$ cd my-portfolio

# Git リポジトリを初期化
$ git init

# .gitignore を作成
$ cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
.DS_Store
dist/
*.log
EOF

# README を作成
$ cat > README.md << 'EOF'
# My Portfolio

個人ポートフォリオサイトです。

## セットアップ

\`\`\`bash
npm install
npm run dev
\`\`\`
EOF

# index.html を作成
$ cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>My Portfolio</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#works">Works</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <section id="about">
      <h2>About Me</h2>
      <p>こんにちは！Web開発を学んでいます。</p>
    </section>
  </main>
</body>
</html>
EOF

# style.css を作成
$ cat > style.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  line-height: 1.6;
  color: #333;
}

header {
  background: #2d3748;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: #a0aec0;
  text-decoration: none;
  margin-left: 1rem;
}
EOF`}</code>
        </pre>
      </section>

      {/* Step 2: 初期コミット */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 2: 初期コミット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          作成したファイルをステージングし、最初のコミットを行います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 状態を確認
$ git status
On branch main

No commits yet

Untracked files:
  .gitignore
  README.md
  index.html
  style.css

# すべてのファイルをステージング
$ git add .

# ステージングの確認
$ git status
Changes to be committed:
  new file:   .gitignore
  new file:   README.md
  new file:   index.html
  new file:   style.css

# 初期コミット
$ git commit -m "feat: ポートフォリオサイトの初期構造を作成"

# コミットログを確認
$ git log --oneline
a1b2c3d feat: ポートフォリオサイトの初期構造を作成`}</code>
        </pre>
      </section>

      {/* Step 3: GitHub にpush */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 3: GitHubにリポジトリを作成してpush</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GitHubで新しいリポジトリを作成し、ローカルの内容をpushします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# GitHub CLI でリポジトリを作成（または GitHub の Web UI で作成）
$ gh repo create my-portfolio --public --source=. --push

# または手動で設定:
# 1. GitHub で "New repository" をクリック
# 2. リポジトリ名: my-portfolio
# 3. Public を選択
# 4. "Create repository" をクリック

# リモートを追加
$ git remote add origin https://github.com/username/my-portfolio.git

# push（upstream を設定）
$ git push -u origin main

# 確認
$ git remote -v
origin  https://github.com/username/my-portfolio.git (fetch)
origin  https://github.com/username/my-portfolio.git (push)`}</code>
        </pre>
      </section>

      {/* Step 4: feature ブランチ作成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 4: feature ブランチで機能開発</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          新しい機能を追加するために、feature ブランチを作成します。
          ここでは「Works（作品一覧）セクション」を追加します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# feature ブランチを作成して切り替え
$ git switch -c feature/works-section

# 現在のブランチを確認
$ git branch
  main
* feature/works-section`}</code>
        </pre>
      </section>

      {/* Step 5: 機能開発・コミット */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 5: 機能を実装してコミット</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          index.html に Works セクションを追加し、style.css にスタイルを追加します。
          変更は意味のある単位でコミットします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# index.html の <main> 内に Works セクションを追加:
#
#   <section id="works">
#     <h2>Works</h2>
#     <div class="works-grid">
#       <div class="work-card">
#         <h3>Project 1</h3>
#         <p>TODOアプリ - JavaScript で作成</p>
#         <a href="#">GitHub</a>
#       </div>
#       <div class="work-card">
#         <h3>Project 2</h3>
#         <p>天気予報アプリ - React で作成</p>
#         <a href="#">GitHub</a>
#       </div>
#     </div>
#   </section>

# HTML の変更をコミット
$ git add index.html
$ git commit -m "feat(works): Works セクションの HTML を追加"`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm mt-4">
          <code className="text-gray-300">{`# style.css に Works セクションのスタイルを追加:
#
#   #works {
#     padding: 2rem;
#   }
#   .works-grid {
#     display: grid;
#     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
#     gap: 1.5rem;
#     margin-top: 1rem;
#   }
#   .work-card {
#     border: 1px solid #e2e8f0;
#     border-radius: 8px;
#     padding: 1.5rem;
#   }

# CSS の変更をコミット
$ git add style.css
$ git commit -m "style(works): Works セクションのスタイルを追加"

# コミット履歴を確認
$ git log --oneline
f5e6d7c style(works): Works セクションのスタイルを追加
b8a9c0d feat(works): Works セクションの HTML を追加
a1b2c3d feat: ポートフォリオサイトの初期構造を作成`}</code>
        </pre>
      </section>

      {/* Step 6: push して PR 作成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 6: push して Pull Request を作成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          feature ブランチをリモートに push し、Pull Request を作成します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# feature ブランチをリモートにpush
$ git push -u origin feature/works-section

# GitHub CLI でPRを作成
$ gh pr create \\
  --title "feat: Works セクションを追加" \\
  --body "## 変更内容
- Works（作品一覧）セクションを追加
- レスポンシブ対応のグリッドレイアウトを実装

## 確認ポイント
- [ ] 2カラム以上で作品カードが並ぶか
- [ ] モバイル表示で1カラムになるか
- [ ] リンクが正しく機能するか

Closes #1"

# PRの状態を確認
$ gh pr status`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">PRテンプレート</p>
          <p className="text-sm text-gray-300">
            チームでは <code className="text-red-400">.github/pull_request_template.md</code> を作成して、
            PRの記述フォーマットを統一することが一般的です。
          </p>
        </div>
      </section>

      {/* Step 7: レビュー対応 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 7: レビュー指摘への対応</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レビュアーから指摘を受けた場合、修正コミットを追加してpushします。
          PRは自動的に更新されます。
        </p>
        <div className="my-4 p-4 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-yellow-400 font-semibold mb-2">レビューコメントの例:</p>
          <div className="text-sm text-gray-300 space-y-2">
            <p>&#128172; <strong>reviewer:</strong> &quot;work-card に hover エフェクトを追加してほしいです。また、GitHub リンクにアイコンがあるとより良いと思います。&quot;</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# feature ブランチにいることを確認
$ git branch
  main
* feature/works-section

# style.css に hover エフェクトを追加:
#   .work-card:hover {
#     transform: translateY(-2px);
#     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
#     transition: all 0.2s;
#   }

# 修正をコミット
$ git add style.css
$ git commit -m "style(works): カードに hover エフェクトを追加

レビュー指摘対応: hover 時に浮き上がるアニメーションを追加"

# push（PRが自動的に更新される）
$ git push`}</code>
        </pre>
      </section>

      {/* Step 8: マージ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 8: 承認されたらマージ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          レビューが承認（Approve）されたら、PRをマージします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# GitHub CLI でマージ（squash merge）
$ gh pr merge --squash --delete-branch

# または GitHub の Web UI で "Squash and merge" ボタンをクリック`}</code>
        </pre>
        <div className="mt-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-yellow-400 font-semibold mb-2">マージ後の出力例:</p>
          <pre className="text-sm overflow-x-auto">
            <code className="text-gray-300">{`✓ Squashed and merged pull request #2
✓ Deleted branch feature/works-section`}</code>
          </pre>
        </div>
      </section>

      {/* Step 9: ローカルを更新 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 9: ローカルを最新に更新</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          マージが完了したら、ローカルの main ブランチを最新に更新し、
          不要になったブランチを削除します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# main ブランチに切り替え
$ git switch main

# リモートの最新を取得
$ git pull origin main

# マージ済みのローカルブランチを削除
$ git branch -d feature/works-section

# 確認
$ git log --oneline
d4e5f6g feat: Works セクションを追加 (#2)
a1b2c3d feat: ポートフォリオサイトの初期構造を作成

# リモートの削除済みブランチ情報をクリーンアップ
$ git fetch --prune`}</code>
        </pre>
      </section>

      {/* 演習のまとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ワークフローのまとめ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この一連の流れが、実際のチーム開発で毎日行われるワークフローです。
          繰り返し練習して体に染み込ませましょう。
        </p>
        <div className="my-4 p-4 rounded-lg bg-gray-950 font-mono text-sm overflow-x-auto">
          <pre>
            <code className="text-gray-300">{`  ┌─────────────────────────────────────────────────┐
  │           日常の開発サイクル                       │
  │                                                   │
  │   1. git switch -c feature/xxx    ブランチ作成     │
  │   2. (コードを書く)                               │
  │   3. git add ファイル名            ステージング     │
  │   4. git commit -m "..."          コミット         │
  │   5. git push -u origin feature/xxx  push        │
  │   6. gh pr create                  PR作成          │
  │   7. (レビュー対応)                               │
  │   8. マージ                                       │
  │   9. git switch main && git pull   最新取得       │
  │  10. git branch -d feature/xxx    ブランチ削除    │
  │                                                   │
  │   → 次の機能開発へ（1に戻る）                      │
  └─────────────────────────────────────────────────┘`}</code>
          </pre>
        </div>
      </section>

      {/* チャレンジ課題 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">チャレンジ課題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          以下の課題に取り組んで、Git/GitHub の操作に慣れましょう。
        </p>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">1</span>
              <h3 className="font-semibold text-white">Contact セクションを追加</h3>
            </div>
            <p className="text-sm text-gray-400 ml-8">
              <code className="text-red-400">feature/contact-section</code> ブランチを作成し、
              お問い合わせフォームのセクションを追加してPRを作成してみましょう。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xs font-bold">2</span>
              <h3 className="font-semibold text-white">コンフリクトの解消を練習</h3>
            </div>
            <p className="text-sm text-gray-400 ml-8">
              2つのブランチで同じファイルの同じ行を変更し、意図的にコンフリクトを発生させて
              解消する練習をしましょう。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">3</span>
              <h3 className="font-semibold text-white">OSS プロジェクトにコントリビュート</h3>
            </div>
            <p className="text-sm text-gray-400 ml-8">
              興味のあるOSSプロジェクトをフォークし、ドキュメントの修正やtypoの修正など
              小さな変更からPull Requestを送ってみましょう。
            </p>
          </div>
        </div>
      </section>

      {/* 便利なエイリアス設定 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">おまけ: 便利な Git エイリアス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          よく使うコマンドにショートカットを設定すると、作業効率が上がります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# エイリアスの設定
$ git config --global alias.st status
$ git config --global alias.co checkout
$ git config --global alias.sw switch
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.lg "log --oneline --graph --all"
$ git config --global alias.unstage "restore --staged"

# 使い方
$ git st          # git status
$ git sw -c new   # git switch -c new
$ git lg          # git log --oneline --graph --all
$ git unstage .   # git restore --staged .`}</code>
        </pre>
      </section>

      {/* 学習リソース */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">さらに学ぶために</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-white font-semibold">Pro Git（公式ドキュメント）</p>
            <p className="text-gray-400">git-scm.com/book/ja - 無料で読める公式の教科書。日本語版あり。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-white font-semibold">GitHub Skills</p>
            <p className="text-gray-400">skills.github.com - GitHub公式のインタラクティブな学習コース。</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-white font-semibold">Learn Git Branching</p>
            <p className="text-gray-400">learngitbranching.js.org - ブランチ操作をビジュアルに学べるサイト。</p>
          </div>
        </div>
      </section>
      <LessonCompleteButton categoryId="git" lessonId="git-exercise" color="green" />
      <LessonNav lessons={GIT_LESSONS} currentId="git-exercise" basePath="/learn/git" color="green" />
    </div>
  );
}
