import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GIT_LESSONS } from "@/lib/lessons-data";
import { Quiz, type QuizQuestion } from "@/components/quiz";

const quizQuestions: QuizQuestion[] = [
  {
    question: "Gitの3つのエリアの正しい流れはどれ？",
    options: [
      "リポジトリ → ステージング → ワーキングディレクトリ",
      "ワーキングディレクトリ → リポジトリ → ステージング",
      "ワーキングディレクトリ → ステージング → リポジトリ",
      "ステージング → ワーキングディレクトリ → リポジトリ",
    ],
    answer: 2,
    explanation: "ファイルを編集（ワーキングディレクトリ）→ git addでステージング → git commitでリポジトリに記録、という流れです。",
  },
  {
    question: "変更したファイルをステージングエリアに追加するコマンドはどれ？",
    options: ["git commit", "git add", "git push", "git stage"],
    answer: 1,
    explanation: "git add でファイルをステージングエリアに追加します。ステージングに追加しないと、git commitに含まれません。",
  },
  {
    question: ".gitignore ファイルの役割はどれ？",
    options: [
      "Gitのバージョンを管理する",
      "コミットメッセージのテンプレートを設定する",
      "Gitが追跡しないファイルを指定する",
      "リモートリポジトリのURLを設定する",
    ],
    answer: 2,
    explanation: ".gitignore にパターンを記述すると、パスワードファイルや一時ファイル、node_modulesなどをGitの追跡対象から除外できます。",
  },
  {
    question: "コミット履歴を1行ずつ簡潔に表示するコマンドはどれ？",
    options: ["git log --short", "git log --oneline", "git log --brief", "git log --simple"],
    answer: 1,
    explanation: "git log --oneline はコミットのハッシュとメッセージを1行ずつ表示する便利なオプションです。",
  },
];

export default function GitBasicsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Git レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Gitの基本</h1>
        <p className="text-gray-400">バージョン管理の基礎となるコマンドを覚えよう</p>
      </div>

      {/* Gitの仕組み */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Gitの3つのエリア</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Gitでは、ファイルの変更は3つのエリアを通じて管理されます。
          この流れを理解することが、Git操作の基本です。
        </p>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 my-6">
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center flex-1 w-full">
            <p className="text-blue-400 font-bold text-sm">ワーキングディレクトリ</p>
            <p className="text-gray-400 text-xs mt-1">実際にファイルを編集する場所</p>
          </div>
          <div className="text-gray-500 text-2xl">&#8594;</div>
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-center flex-1 w-full">
            <p className="text-yellow-400 font-bold text-sm">ステージングエリア</p>
            <p className="text-gray-400 text-xs mt-1">コミットする変更を準備する場所</p>
          </div>
          <div className="text-gray-500 text-2xl">&#8594;</div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-center flex-1 w-full">
            <p className="text-green-400 font-bold text-sm">リポジトリ</p>
            <p className="text-gray-400 text-xs mt-1">変更履歴が保存される場所</p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`  編集  ──  git add  ──▶  ステージング  ──  git commit  ──▶  リポジトリ
  (作業)                    (準備)                          (記録)`}</code>
        </pre>
      </section>

      {/* git init */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git init - リポジトリの初期化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          新しいプロジェクトでGit管理を始めるには、
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">git init</code> を実行します。
          これにより <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">.git</code> ディレクトリが作成され、
          バージョン管理が有効になります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 新しいプロジェクトを作成してGitを初期化
$ mkdir my-project
$ cd my-project
$ git init`}</code>
        </pre>
        <div className="mt-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="text-yellow-400 font-semibold">出力例:</span>{" "}
            <code className="text-green-400">Initialized empty Git repository in /home/user/my-project/.git/</code>
          </p>
        </div>
      </section>

      {/* git add */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git add - ステージングに追加</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変更したファイルをコミット対象として登録します。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">git add</code> で
          ステージングエリアに追加しないと、コミットに含まれません。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 特定のファイルをステージング
$ git add index.html

# 複数ファイルをステージング
$ git add index.html style.css

# カレントディレクトリの全変更をステージング
$ git add .

# 変更の一部だけをステージング（対話モード）
$ git add -p`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">ポイント</p>
          <p className="text-sm text-gray-300">
            <code className="text-red-400">git add .</code> は便利ですが、意図しないファイル（パスワードや一時ファイルなど）
            も追加してしまう可能性があります。<code className="text-red-400">.gitignore</code> を設定するか、
            ファイル名を個別に指定する習慣をつけましょう。
          </p>
        </div>
      </section>

      {/* git commit */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git commit - 変更を記録</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ステージングエリアの変更をリポジトリに記録します。
          各コミットには一意のハッシュ値（ID）が割り当てられ、後から参照できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# メッセージ付きでコミット
$ git commit -m "初期ページを作成"

# 詳細なメッセージをエディタで書く
$ git commit

# add と commit を同時に（追跡済みファイルのみ）
$ git commit -am "ヘッダーのスタイルを修正"`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="text-yellow-400 font-semibold">良いコミットメッセージの例:</span>
          </p>
          <ul className="text-sm text-gray-400 mt-2 space-y-1">
            <li>&#9989; <code className="text-green-400">&quot;ログインフォームのバリデーションを追加&quot;</code></li>
            <li>&#9989; <code className="text-green-400">&quot;ユーザー一覧のページネーションを修正&quot;</code></li>
            <li>&#10060; <code className="text-red-400">&quot;修正&quot;</code> - 何を修正したか分からない</li>
            <li>&#10060; <code className="text-red-400">&quot;update&quot;</code> - 何を更新したか分からない</li>
          </ul>
        </div>
      </section>

      {/* git status */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git status - 状態の確認</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          現在のリポジトリの状態を確認します。どのファイルが変更されたか、
          ステージングに追加されたか、未追跡かを一目で把握できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`$ git status`}</code>
        </pre>
        <div className="mt-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-yellow-400 font-semibold mb-2">出力例:</p>
          <pre className="text-sm overflow-x-auto">
            <code className="text-gray-300">{`On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        `}<span className="text-green-400">modified:   index.html</span>{`

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        `}<span className="text-red-400">modified:   style.css</span>{`

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        `}<span className="text-red-400">script.js</span></code>
          </pre>
        </div>
        <div className="mt-3 text-sm text-gray-400 space-y-1">
          <p><span className="text-green-400">緑色</span> = ステージング済み（コミットに含まれる）</p>
          <p><span className="text-red-400">赤色</span> = 変更はあるがステージング未追加</p>
        </div>
      </section>

      {/* git log */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git log - コミット履歴の確認</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          これまでのコミット履歴を確認します。各コミットのハッシュ、作者、日時、メッセージが表示されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 基本のログ表示
$ git log

# 1行表示（見やすい）
$ git log --oneline

# グラフ付き（ブランチの分岐が視覚的に分かる）
$ git log --oneline --graph --all

# 最新3件だけ表示
$ git log -3`}</code>
        </pre>
        <div className="mt-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-yellow-400 font-semibold mb-2">--oneline の出力例:</p>
          <pre className="text-sm overflow-x-auto">
            <code className="text-gray-300">{`a1b2c3d ヘッダーのスタイルを修正
e4f5g6h ログインフォームを追加
i7j8k9l 初期ページを作成`}</code>
          </pre>
        </div>
      </section>

      {/* git diff */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git diff - 差分の確認</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファイルの変更内容を詳細に確認できます。何を変更したかをコミット前にチェックする習慣をつけましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# ワーキングディレクトリの変更を確認
$ git diff

# ステージング済みの変更を確認
$ git diff --staged

# 特定のファイルの差分
$ git diff index.html

# 2つのコミット間の差分
$ git diff a1b2c3d e4f5g6h`}</code>
        </pre>
        <div className="mt-3 p-3 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm text-yellow-400 font-semibold mb-2">出力例:</p>
          <pre className="text-sm overflow-x-auto">
            <code className="text-gray-300">{`diff --git a/index.html b/index.html
--- a/index.html
+++ b/index.html
@@ -1,3 +1,4 @@
 <h1>Hello</h1>
-<p>古いテキスト</p>
`}<span className="text-green-400">{`+<p>新しいテキスト</p>
+<p>追加された行</p>`}</span></code>
          </pre>
          <p className="text-sm text-gray-400 mt-2">
            <span className="text-red-400">-（赤）</span>は削除された行、
            <span className="text-green-400">+（緑）</span>は追加された行を示します。
          </p>
        </div>
      </section>

      {/* .gitignore */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">.gitignore - 追跡しないファイルの指定</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">.gitignore</code> ファイルに
          パターンを記述すると、Gitが追跡しないファイルを指定できます。
          パスワードや一時ファイル、ビルド成果物などを除外するのに使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# .gitignore の例

# 環境変数ファイル（パスワードなどが入る）
.env
.env.local

# 依存パッケージ（npm install で復元できる）
node_modules/

# ビルド成果物
dist/
build/
.next/

# OS のシステムファイル
.DS_Store
Thumbs.db

# ログファイル
*.log

# エディタの設定ファイル
.vscode/
.idea/`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">重要</p>
          <p className="text-sm text-gray-300">
            一度コミットしたファイルは <code className="text-red-400">.gitignore</code> に追加しても追跡が解除されません。
            <code className="text-red-400">git rm --cached ファイル名</code> で追跡を解除してからコミットする必要があります。
          </p>
        </div>
      </section>

      {/* 基本的な作業フロー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">基本的な作業フロー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          日常的なGit操作の流れをまとめます。この一連の流れを繰り返してコードを管理します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 1. 現在の状態を確認
$ git status

# 2. ファイルを編集（エディタで作業）

# 3. 変更内容を確認
$ git diff

# 4. 変更をステージングに追加
$ git add index.html style.css

# 5. ステージングの内容を確認
$ git diff --staged

# 6. コミット
$ git commit -m "ナビゲーションバーを追加"

# 7. 履歴を確認
$ git log --oneline`}</code>
        </pre>
      </section>

      {/* その他の便利なコマンド */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">その他の便利なコマンド</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-48 shrink-0">git restore ファイル名</code>
            <span className="text-gray-300">ワーキングディレクトリの変更を取り消す</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-48 shrink-0">git restore --staged ファイル名</code>
            <span className="text-gray-300">ステージングを取り消す（変更は残る）</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-48 shrink-0">git show コミットID</code>
            <span className="text-gray-300">特定のコミットの詳細を表示</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-48 shrink-0">git stash</code>
            <span className="text-gray-300">変更を一時退避する</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-48 shrink-0">git stash pop</code>
            <span className="text-gray-300">退避した変更を復元する</span>
          </div>
        </div>
      </section>

      {/* クイズ */}
      <section className="mb-10">
        <Quiz questions={quizQuestions} color="green" />
      </section>
      <LessonCompleteButton categoryId="git" lessonId="basics" color="green" />
      <LessonNav lessons={GIT_LESSONS} currentId="basics" basePath="/learn/git" color="green" />
    </div>
  );
}
