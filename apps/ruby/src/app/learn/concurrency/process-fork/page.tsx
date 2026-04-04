import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "concurrency")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">並行・非同期処理 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロセスフォーク</h1>
        <p className="text-gray-400">fork、Process.wait、パイプによるプロセス間通信（IPC）を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">forkとプロセス</h2>
        <p className="text-gray-300 mb-3">
          forkは現在のプロセスを複製して子プロセスを作成します。GILの制約がなく、真の並列実行が可能です。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">fork</code> — 子プロセスを作成（子では0、親ではPID）</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Process.wait</code> — 子プロセスの終了を待つ</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">IO.pipe</code> — プロセス間通信のパイプ</li>
          <li><code className="bg-gray-800 px-1 rounded text-teal-300">Process.pid</code> — 現在のプロセスID</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: プロセスの概念</h2>
        <RubyEditor
          defaultCode={`# プロセスの基本情報
puts "現在のプロセスID: #{Process.pid}"
puts "親プロセスID: #{Process.ppid}"

# プロセスの生成（spawn相当）
# fork {
#   # 子プロセス
#   puts "子: PID=#{Process.pid}"
#   exit 0
# }
# Process.wait

# spawnで外部コマンドを実行
puts "\n外部コマンドの実行:"
pid = spawn("ruby", "-e", "puts 'サブプロセスから!'")
Process.wait(pid)
status = $?
puts "終了コード: #{status.exitstatus}"

# システム情報
puts "\nRubyプロセス情報:"
puts "  PID: #{Process.pid}"
puts "  UID: #{Process.uid}"
puts "  GID: #{Process.gid}"`}
          expectedOutput={`現在のプロセスID: 12345
親プロセスID: 12300

外部コマンドの実行:
サブプロセスから!
終了コード: 0

Rubyプロセス情報:
  PID: 12345
  UID: 501
  GID: 20`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: パイプによるプロセス間通信</h2>
        <RubyEditor
          defaultCode={`# IO.pipeでプロセス間通信
reader, writer = IO.pipe

# 書き込みプロセス（spawnで実装）
writer.puts "プロセス間メッセージ1"
writer.puts "プロセス間メッセージ2"
writer.puts "プロセス間メッセージ3"
writer.close  # 書き込み完了を通知

# 読み込み
puts "受信したメッセージ:"
while (line = reader.gets)
  puts "  受信: #{line.chomp}"
end
reader.close

# Open3でコマンドの入出力を制御
require 'open3'

puts "\nOpen3でコマンド実行:"
stdout, stderr, status = Open3.capture3("ruby", "-e", "
  puts 'Hello from subprocess'
  puts 'Line 2'
  STDERR.puts 'Warning message'
")
puts "stdout: #{stdout.chomp}"
puts "stderr: #{stderr.chomp}"
puts "成功: #{status.success?}"`}
          expectedOutput={`受信したメッセージ:
  受信: プロセス間メッセージ1
  受信: プロセス間メッセージ2
  受信: プロセス間メッセージ3

Open3でコマンド実行:
stdout: Hello from subprocess
Line 2
stderr: Warning message
成功: true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="concurrency" lessonId="process-fork" />
      </div>
      <LessonNav lessons={lessons} currentId="process-fork" basePath="/learn/concurrency" />
    </div>
  );
}
