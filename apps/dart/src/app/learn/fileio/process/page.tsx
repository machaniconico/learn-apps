import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function ProcessPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイル・IO</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">プロセス実行</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">dart:io</strong>の<code className="text-green-300">Process</code>クラスを使って外部コマンドを実行できます。
            <code className="text-green-300">Process.run()</code>でコマンドを実行して結果を受け取り、<code className="text-green-300">Process.start()</code>でストリームとして処理できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Process.run() による外部コマンド実行</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">Process.run()</code>はコマンドを実行して終了を待ち、結果を返します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

Future<void> main() async {
  // 簡単なコマンド実行
  final result = await Process.run('echo', ['Hello, Dart!']);
  print('stdout: \${result.stdout.trim()}');
  print('exitCode: \${result.exitCode}');

  // ls コマンド（Unix系）
  final lsResult = await Process.run(
    'ls',
    ['-la', '/tmp'],
    runInShell: false,
  );

  if (lsResult.exitCode == 0) {
    final lines = (lsResult.stdout as String).split('\\n');
    print('\\n/tmp の内容（先頭3行）:');
    for (final line in lines.take(3)) {
      if (line.isNotEmpty) print('  \$line');
    }
  }

  // 失敗するコマンド
  final failResult = await Process.run('ls', ['/nonexistent']);
  print('\\n存在しないパス exitCode: \${failResult.exitCode}');
  print('stderr: \${(failResult.stderr as String).trim()}');
}`}
          expectedOutput={`stdout: Hello, Dart!
exitCode: 0

/tmp の内容（先頭3行）:
  total 0
  drwxrwxrwt  20 root  wheel  640 Jan  1 00:00 .
  drwxr-xr-x  20 root  wheel  640 Jan  1 00:00 ..

存在しないパス exitCode: 1
stderr: ls: /nonexistent: No such file or directory`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">環境変数とプロセス情報</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">Platform.environment</code>で環境変数を取得し、<code className="text-green-300">pid</code>でプロセスIDを確認できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

void main() {
  // プロセス情報
  print('プロセスID: \${pid}');
  print('OS: \${Platform.operatingSystem}');
  print('OSバージョン: \${Platform.operatingSystemVersion}');
  print('Dartバージョン: \${Platform.version}');

  // 環境変数
  final env = Platform.environment;
  print('\\n環境変数（一部）:');
  final keys = ['PATH', 'HOME', 'USER', 'SHELL'];
  for (final key in keys) {
    final value = env[key];
    if (value != null) {
      final truncated = value.length > 40 ? '\${value.substring(0, 40)}...' : value;
      print('  \$key: \$truncated');
    }
  }

  // 実行可能ファイルのパス
  print('\\n実行ファイル: \${Platform.executable}');
  print('スクリプト: \${Platform.script.path}');
}`}
          expectedOutput={`プロセスID: 12345
OS: macos
OSバージョン: Version 14.0 (Build 23A344)
Dartバージョン: 3.2.0 (stable)

環境変数（一部）:
  PATH: /usr/local/bin:/usr/bin:/bin:/usr/sbin...
  HOME: /Users/username
  USER: username
  SHELL: /bin/zsh

実行ファイル: /usr/local/bin/dart
スクリプト: /path/to/main.dart`}
        />
      </section>

      <LessonCompleteButton lessonId="process" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="process" basePath="/learn/fileio" />
    </div>
  );
}
