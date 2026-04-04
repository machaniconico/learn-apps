import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { INFRA_LESSONS } from "@/lib/lessons-data";

export default function LinuxLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 mb-4">インフラ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Linux基礎</h1>
        <p className="text-gray-400">コマンドライン、ファイル操作、権限管理を学ぼう</p>
      </div>

      {/* ファイルシステム */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Linuxファイルシステム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Linuxではすべてのファイルが<strong className="text-cyan-400">ルートディレクトリ（/）</strong>を
          起点としたツリー構造で管理されています。Windowsのようなドライブレター（C:、D:）はありません。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`/                   ← ルートディレクトリ
├── bin/            ← 基本コマンド（ls, cp, mv 等）
├── etc/            ← 設定ファイル（nginx.conf, hosts 等）
├── home/           ← ユーザーのホームディレクトリ
│   ├── tanaka/
│   └── suzuki/
├── var/            ← ログ、データ（/var/log, /var/www）
├── tmp/            ← 一時ファイル
├── usr/            ← ユーザー用プログラム
│   ├── bin/
│   └── local/
├── opt/            ← オプションソフトウェア
└── proc/           ← プロセス情報（仮想ファイルシステム）`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          重要なディレクトリの役割を把握しておくと、設定ファイルの場所やログの確認がスムーズになります。
        </p>
      </section>

      {/* 基本コマンド */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">基本コマンド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Linuxの操作はターミナル（コマンドライン）から行います。ファイルやディレクトリの操作は
          最も基本的で頻繁に使うスキルです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# ファイル・ディレクトリの一覧表示
$ ls              # 現在のディレクトリの内容を表示
$ ls -la          # 隠しファイル含む詳細表示
$ ls -lh          # ファイルサイズを読みやすく表示

# ディレクトリの移動
$ cd /var/log     # 絶対パスで移動
$ cd ..           # 一つ上のディレクトリに移動
$ cd ~            # ホームディレクトリに移動
$ pwd             # 現在のディレクトリのパスを表示

# ディレクトリの作成・削除
$ mkdir myproject           # ディレクトリを作成
$ mkdir -p a/b/c            # 深い階層を一度に作成
$ rmdir empty_dir           # 空のディレクトリを削除`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# ファイルのコピー・移動・削除
$ cp file.txt backup.txt          # ファイルをコピー
$ cp -r src/ dest/                # ディレクトリを再帰的にコピー
$ mv old.txt new.txt              # ファイル名を変更（移動）
$ mv file.txt /tmp/               # ファイルを別の場所に移動
$ rm file.txt                     # ファイルを削除
$ rm -rf directory/               # ディレクトリを強制的に再帰削除（注意！）

# ファイルの中身を確認
$ cat file.txt                    # ファイル全体を表示
$ head -n 20 file.txt             # 先頭20行を表示
$ tail -n 20 file.txt             # 末尾20行を表示
$ tail -f /var/log/syslog         # リアルタイムでログを監視
$ less file.txt                   # ページ送りで表示（q で終了）
$ grep "error" /var/log/syslog    # 文字列を検索`}</code>
        </pre>
      </section>

      {/* パーミッション */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">パーミッション（権限管理）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Linuxではファイルごとに<strong className="text-cyan-400">所有者（owner）</strong>、
          <strong className="text-cyan-400">グループ（group）</strong>、
          <strong className="text-cyan-400">その他（others）</strong>の3つの権限を設定できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# ls -la の出力例
-rw-r--r--  1 tanaka  staff   1024 Jan 15 10:30 config.txt
drwxr-xr-x  5 tanaka  staff    160 Jan 15 10:00 myproject/

# パーミッションの読み方
# -rw-r--r--
# │ │  │  │
# │ │  │  └── others: r-- (読み取りのみ)
# │ │  └───── group:  r-- (読み取りのみ)
# │ └──────── owner:  rw- (読み取り・書き込み)
# └─────────── ファイル種類 (- = ファイル, d = ディレクトリ)

# 数値表記: r=4, w=2, x=1
# rw-r--r-- = 644
# rwxr-xr-x = 755`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# 権限を変更する (chmod)
$ chmod 755 script.sh        # rwxr-xr-x（実行可能に）
$ chmod 644 config.txt       # rw-r--r--（読み取りのみ公開）
$ chmod +x deploy.sh         # 実行権限を追加
$ chmod -w important.txt     # 書き込み権限を削除

# 所有者を変更する (chown)
$ chown www-data:www-data /var/www/html   # 所有者とグループを変更
$ chown -R tanaka:staff myproject/        # 再帰的に変更

# よく使うパーミッション
# 644 → 設定ファイル、HTMLファイル
# 755 → 実行スクリプト、ディレクトリ
# 600 → SSH秘密鍵、機密ファイル
# 700 → .ssh ディレクトリ`}</code>
        </pre>
      </section>

      {/* プロセス管理 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロセス管理</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Linuxでは実行中のプログラムを<strong className="text-cyan-400">プロセス</strong>と呼びます。
          サーバー運用ではプロセスの監視と管理が重要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# プロセスの確認
$ ps aux                      # 全プロセスを表示
$ ps aux | grep nginx         # nginx関連のプロセスを検索
$ top                         # リアルタイムでプロセスを監視
$ htop                        # より見やすいプロセスモニター

# プロセスの終了
$ kill 1234                   # PID 1234 のプロセスを終了（SIGTERM）
$ kill -9 1234                # 強制終了（SIGKILL）
$ killall nginx               # nginx の全プロセスを終了

# サービス管理 (systemd)
$ systemctl start nginx       # サービスを開始
$ systemctl stop nginx        # サービスを停止
$ systemctl restart nginx     # サービスを再起動
$ systemctl status nginx      # サービスの状態を確認
$ systemctl enable nginx      # OS起動時に自動起動
$ systemctl disable nginx     # 自動起動を無効化`}</code>
        </pre>
      </section>

      {/* SSH */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">SSH（リモート接続）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">SSH（Secure Shell）</strong>は、リモートサーバーに
          安全に接続するためのプロトコルです。公開鍵認証を使えばパスワードなしでログインできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# SSHで接続
$ ssh user@192.168.1.100         # IPアドレスで接続
$ ssh user@myserver.example.com  # ドメイン名で接続
$ ssh -p 2222 user@server.com    # ポート番号を指定

# SSH鍵ペアの生成
$ ssh-keygen -t ed25519 -C "your_email@example.com"
# → ~/.ssh/id_ed25519（秘密鍵）と ~/.ssh/id_ed25519.pub（公開鍵）が生成

# 公開鍵をサーバーに登録
$ ssh-copy-id user@server.com

# ~/.ssh/config で接続設定を簡略化
Host myserver
    HostName 192.168.1.100
    User tanaka
    Port 22
    IdentityFile ~/.ssh/id_ed25519

# 設定後は以下だけで接続可能
$ ssh myserver`}</code>
        </pre>
      </section>

      {/* 環境変数 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">環境変数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-cyan-400">環境変数</strong>はOS全体やプロセスで共有される変数です。
          アプリケーションの設定値やシークレットを管理するのに使われます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# 環境変数の確認
$ echo $HOME            # ホームディレクトリのパス
$ echo $PATH            # コマンドの検索パス
$ env                   # 全環境変数を表示
$ printenv NODE_ENV     # 特定の環境変数を表示

# 環境変数の設定
$ export NODE_ENV=production      # 現在のセッションに設定
$ export DATABASE_URL="postgres://user:pass@localhost:5432/mydb"

# 永続化（~/.bashrc または ~/.zshrc に追記）
$ echo 'export NODE_ENV=production' >> ~/.bashrc
$ source ~/.bashrc                # 設定を再読み込み

# コマンド実行時のみ環境変数を設定
$ NODE_ENV=production npm start

# .env ファイルでの管理（アプリケーション側で読み込む）
# .env
DATABASE_URL=postgres://localhost:5432/mydb
API_KEY=your-secret-key
PORT=3000`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Linuxのファイルシステムはルート（/）を起点としたツリー構造</li>
          <li>ls、cd、cp、mv、rm などの基本コマンドでファイルを操作する</li>
          <li>chmod / chown でファイルの権限と所有者を管理する</li>
          <li>ps、kill、systemctl でプロセスとサービスを管理する</li>
          <li>SSHで安全にリモートサーバーに接続する（公開鍵認証推奨）</li>
          <li>環境変数でアプリケーションの設定値を管理する</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="infra" lessonId="linux" color="cyan" />
      <LessonNav lessons={INFRA_LESSONS} currentId="linux" basePath="/learn/infra" color="cyan" />
    </div>
  );
}
