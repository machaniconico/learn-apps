import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GIT_LESSONS } from "@/lib/lessons-data";

export default function GitRemoteLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">Git レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リモートリポジトリ</h1>
        <p className="text-gray-400">GitHubとの連携でコードをクラウドに管理しよう</p>
      </div>

      {/* リモートリポジトリとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リモートリポジトリとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">リモートリポジトリ</strong>は、インターネット上（またはネットワーク上）に
          ホスティングされたGitリポジトリです。ローカルのリポジトリと同期することで、
          バックアップやチームでの共有が可能になります。
        </p>
        <div className="my-6 p-4 rounded-lg bg-gray-950 font-mono text-sm overflow-x-auto">
          <pre>
            <code className="text-gray-300">{`  ┌─────────────────┐          ┌─────────────────┐
  │  ローカルリポジトリ  │  push →  │  リモートリポジトリ  │
  │  (あなたのPC)      │  ← pull  │  (GitHub)        │
  └─────────────────┘          └─────────────────┘
         │                              │
    git commit                    他の開発者も
    git branch                    アクセス可能`}</code>
          </pre>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">GitHub</h3>
            <p className="text-sm text-gray-400">最も人気のあるホスティングサービス。OSS開発の中心地。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">GitLab</h3>
            <p className="text-sm text-gray-400">CI/CDが統合されたプラットフォーム。セルフホスト可能。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">Bitbucket</h3>
            <p className="text-sm text-gray-400">Atlassian製。Jiraとの連携が強力。</p>
          </div>
        </div>
      </section>

      {/* GitHubでリポジトリを作成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">GitHubでリポジトリを作成する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          GitHubでリポジトリを作成したら、ローカルリポジトリと接続します。
          2つのパターンがあります。
        </p>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">パターン1: ローカルから始める場合</h3>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# ローカルでプロジェクトを作成済みの場合
$ git init
$ git add .
$ git commit -m "初期コミット"

# GitHubのリポジトリをリモートとして登録
$ git remote add origin https://github.com/username/my-project.git

# ローカルの内容をリモートにアップロード
$ git push -u origin main`}</code>
        </pre>

        <h3 className="text-lg font-semibold text-white mt-6 mb-3">パターン2: GitHubから始める場合</h3>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# GitHubでリポジトリを作成した後、ローカルにコピー
$ git clone https://github.com/username/my-project.git

# clone したディレクトリに移動
$ cd my-project

# origin（リモート）は自動的に設定されている
$ git remote -v
origin  https://github.com/username/my-project.git (fetch)
origin  https://github.com/username/my-project.git (push)`}</code>
        </pre>
      </section>

      {/* git remote */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git remote - リモートの管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">origin</code> はリモートリポジトリの
          デフォルト名です。複数のリモートを登録することもできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# リモートの一覧を表示
$ git remote -v

# リモートを追加
$ git remote add origin https://github.com/username/repo.git

# リモートのURLを変更
$ git remote set-url origin https://github.com/username/new-repo.git

# リモートを削除
$ git remote remove origin

# リモートの詳細情報
$ git remote show origin`}</code>
        </pre>
      </section>

      {/* git push */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git push - リモートに送信</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ローカルのコミットをリモートリポジトリにアップロードします。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 基本のpush（main ブランチ）
$ git push origin main

# -u でupstreamを設定（初回のみ。以降は git push だけでOK）
$ git push -u origin main

# upstream設定後は省略可能
$ git push

# 新しいブランチをリモートにpush
$ git push -u origin feature/login

# タグをpush
$ git push origin v1.0.0
$ git push --tags    # すべてのタグ`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-sm text-red-400 font-semibold mb-1">注意: force push</p>
          <p className="text-sm text-gray-300">
            <code className="text-red-400">git push --force</code> はリモートの履歴を上書きするため、
            チーム開発では原則使用禁止です。他のメンバーの作業を壊す可能性があります。
            やむを得ない場合は <code className="text-red-400">--force-with-lease</code> を使いましょう。
          </p>
        </div>
      </section>

      {/* git pull / fetch */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git pull / git fetch - リモートから取得</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リモートリポジトリの最新の変更をローカルに取り込みます。
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">fetch</code> と
          <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">pull</code> には重要な違いがあります。
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">git fetch</h3>
            <p className="text-sm text-gray-300 mb-2">
              リモートの変更をダウンロードするが、ローカルのブランチにはマージ<strong>しない</strong>。
              安全に差分を確認できる。
            </p>
            <pre className="text-xs bg-gray-950 rounded p-2 overflow-x-auto">
              <code className="text-gray-400">{`$ git fetch origin
$ git log origin/main
# 確認してからマージ
$ git merge origin/main`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">git pull</h3>
            <p className="text-sm text-gray-300 mb-2">
              fetch + merge を一度に行う。手軽だが、コンフリクトに注意が必要。
            </p>
            <pre className="text-xs bg-gray-950 rounded p-2 overflow-x-auto">
              <code className="text-gray-400">{`# fetch + merge を同時実行
$ git pull origin main

# upstream設定後は省略可能
$ git pull

# rebaseで取り込む（履歴が綺麗になる）
$ git pull --rebase`}</code>
            </pre>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">おすすめ</p>
          <p className="text-sm text-gray-300">
            慣れるまでは <code className="text-red-400">git fetch</code> →{" "}
            <code className="text-red-400">git log origin/main</code> で確認 →{" "}
            <code className="text-red-400">git merge origin/main</code> の手順が安全です。
          </p>
        </div>
      </section>

      {/* git clone */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">git clone - リポジトリの複製</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リモートリポジトリの完全なコピーをローカルに作成します。
          履歴やブランチもすべて含まれます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# HTTPS でクローン
$ git clone https://github.com/username/repo.git

# SSH でクローン（SSH鍵の設定が必要）
$ git clone git@github.com:username/repo.git

# ディレクトリ名を指定してクローン
$ git clone https://github.com/username/repo.git my-folder

# 特定のブランチだけクローン
$ git clone -b develop https://github.com/username/repo.git

# 浅いクローン（最新の履歴だけ。大きなリポジトリ向け）
$ git clone --depth 1 https://github.com/username/repo.git`}</code>
        </pre>
      </section>

      {/* Fork */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Fork（フォーク）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-red-400">Fork</strong> は、他の人のリポジトリを自分のGitHubアカウントに
          コピーする機能です。オープンソースプロジェクトに貢献する際の基本的な流れです。
        </p>
        <div className="my-6 p-4 rounded-lg bg-gray-950 font-mono text-sm overflow-x-auto">
          <pre>
            <code className="text-gray-300">{`  元のリポジトリ (upstream)        あなたのフォーク (origin)
  ┌──────────────────────┐    Fork    ┌──────────────────────┐
  │ user-a/awesome-lib   │  ──────▶  │ your-name/awesome-lib│
  └──────────────────────┘           └──────────────────────┘
                                               │
                                          git clone
                                               │
                                     ┌──────────────────┐
                                     │ ローカルリポジトリ   │
                                     └──────────────────┘`}</code>
          </pre>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 1. GitHubでForkボタンをクリック

# 2. 自分のフォークをクローン
$ git clone https://github.com/your-name/awesome-lib.git
$ cd awesome-lib

# 3. 元のリポジトリをupstreamとして登録
$ git remote add upstream https://github.com/user-a/awesome-lib.git

# 4. upstreamの最新を取得
$ git fetch upstream
$ git merge upstream/main

# 5. 変更を加えてPull Requestを送る`}</code>
        </pre>
      </section>

      {/* SSH鍵の設定 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SSH鍵の設定（推奨）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SSH鍵を設定すると、push/pullの度にパスワードを入力する必要がなくなります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{`# 1. SSH鍵を生成
$ ssh-keygen -t ed25519 -C "your-email@example.com"

# 2. 公開鍵の内容をコピー
$ cat ~/.ssh/id_ed25519.pub

# 3. GitHubの Settings → SSH and GPG keys → New SSH key に貼り付け

# 4. 接続テスト
$ ssh -T git@github.com
Hi username! You've successfully authenticated.

# 5. リモートURLをSSHに変更
$ git remote set-url origin git@github.com:username/repo.git`}</code>
        </pre>
      </section>

      {/* コマンドまとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リモート関連コマンドまとめ</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git clone URL</code>
            <span className="text-gray-300">リモートリポジトリをローカルに複製</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git remote -v</code>
            <span className="text-gray-300">登録されているリモートの一覧</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git remote add 名前 URL</code>
            <span className="text-gray-300">リモートを追加</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git push -u origin main</code>
            <span className="text-gray-300">ローカルの変更をリモートに送信</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git fetch origin</code>
            <span className="text-gray-300">リモートの変更をダウンロード（マージなし）</span>
          </div>
          <div className="flex gap-3">
            <code className="text-red-400 font-mono w-52 shrink-0">git pull origin main</code>
            <span className="text-gray-300">fetch + merge を一度に実行</span>
          </div>
        </div>
      </section>
      <LessonCompleteButton categoryId="git" lessonId="remote" color="green" />
      <LessonNav lessons={GIT_LESSONS} currentId="remote" basePath="/learn/git" color="green" />
    </div>
  );
}
