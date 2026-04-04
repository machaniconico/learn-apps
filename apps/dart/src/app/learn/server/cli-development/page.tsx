import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("server");

export default function CliDevelopmentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold">サーバー開発 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">CLIアプリ開発</h1>
        <p className="text-gray-400">dart:ioを使ったコマンドラインツールの開発方法を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">DartでCLIツールを作る</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          DartはCLI（コマンドラインインターフェース）ツールの開発にも適しています。
          <code className="text-cyan-300">args</code>パッケージで引数解析、<code className="text-cyan-300">dart:io</code>で標準I/Oを処理できます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-cyan-300">main(List&lt;String&gt; args)</code>でコマンドライン引数を受け取る</li>
          <li>• <code className="text-cyan-300">args</code>パッケージでサブコマンドとオプションを解析</li>
          <li>• <code className="text-cyan-300">dart compile exe</code>でネイティブバイナリを生成</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">CLIツールの基本構造</h2>
        <p className="text-gray-400 mb-4">
          コマンドとオプションを処理するCLIアプリの構造です。
        </p>
        <DartEditor
          defaultCode={`// CLIアプリの基本構造
class CliOption {
  final String name;
  final String abbr;
  final String help;
  final String? defaultValue;

  const CliOption({
    required this.name,
    required this.abbr,
    required this.help,
    this.defaultValue,
  });
}

class CliCommand {
  final String name;
  final String description;
  final List<CliOption> options;
  final void Function(Map<String, String?>) handler;

  const CliCommand({
    required this.name,
    required this.description,
    this.options = const [],
    required this.handler,
  });
}

class Cli {
  final String name;
  final String version;
  final List<CliCommand> commands;

  Cli({required this.name, required this.version, required this.commands});

  void printHelp() {
    print('使い方: \$name <command> [options]');
    print('バージョン: \$version\\n');
    print('コマンド:');
    for (final cmd in commands) {
      print('  \${cmd.name.padRight(15)} \${cmd.description}');
    }
  }

  void run(List<String> args) {
    if (args.isEmpty || args[0] == '--help' || args[0] == '-h') {
      printHelp();
      return;
    }

    final cmdName = args[0];
    final cmd = commands.firstWhere(
      (c) => c.name == cmdName,
      orElse: () => throw ArgumentError('不明なコマンド: \$cmdName'),
    );

    // 簡易引数解析
    final options = <String, String?>{};
    for (int i = 1; i < args.length; i += 2) {
      if (args[i].startsWith('--') && i + 1 < args.length) {
        options[args[i].substring(2)] = args[i + 1];
      }
    }
    cmd.handler(options);
  }
}

void main() {
  final cli = Cli(
    name: 'mytool',
    version: '1.0.0',
    commands: [
      CliCommand(
        name: 'greet',
        description: '挨拶を表示',
        handler: (opts) {
          final name = opts['name'] ?? '世界';
          final lang = opts['lang'] ?? 'ja';
          final msg = lang == 'en' ? 'Hello, \$name!' : 'こんにちは、\$name！';
          print(msg);
        },
      ),
      CliCommand(
        name: 'count',
        description: 'カウントダウン',
        handler: (opts) {
          final from = int.tryParse(opts['from'] ?? '5') ?? 5;
          for (int i = from; i >= 1; i--) print(i);
          print('完了！');
        },
      ),
    ],
  );

  print('=== --help ===');
  cli.run(['--help']);

  print('\\n=== greet ===');
  cli.run(['greet', '--name', 'Dart']);

  print('\\n=== count --from 3 ===');
  cli.run(['count', '--from', '3']);
}`}
          expectedOutput={`=== --help ===\n使い方: mytool <command> [options]\nバージョン: 1.0.0\n\nコマンド:\n  greet           挨拶を表示\n  count           カウントダウン\n\n=== greet ===\nこんにちは、Dart！\n\n=== count --from 3 ===\n3\n2\n1\n完了！`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">進捗表示とインタラクティブCLI</h2>
        <p className="text-gray-400 mb-4">
          CLIツールでの進捗バーとスピナーの実装パターンです。
        </p>
        <DartEditor
          defaultCode={`import 'dart:math';

// プログレスバーの表示
void printProgress(String label, int current, int total, {int width = 30}) {
  final pct = (current / total * 100).round();
  final filled = (current / total * width).round();
  final bar = '█' * filled + '░' * (width - filled);
  print('\$label [\$bar] \$pct% (\$current/\$total)');
}

// ファイル処理のシミュレーション
void processFiles(List<String> files) {
  print('処理開始: \${files.length}ファイル\\n');

  for (int i = 0; i < files.length; i++) {
    printProgress('処理中', i + 1, files.length);
    // 実際の処理をここで行う
    print('  ✅ \${files[i]}');
  }

  print('\\n完了！');
}

void main() {
  final files = [
    'config.json',
    'users.csv',
    'products.csv',
    'orders.csv',
    'reports.pdf',
  ];

  processFiles(files);
}`}
          expectedOutput={`処理開始: 5ファイル\n\n処理中 [██████░░░░░░░░░░░░░░░░░░░░░░░░] 20% (1/5)\n  ✅ config.json\n処理中 [████████████░░░░░░░░░░░░░░░░░░] 40% (2/5)\n  ✅ users.csv\n処理中 [██████████████████░░░░░░░░░░░░] 60% (3/5)\n  ✅ products.csv\n処理中 [████████████████████████░░░░░░] 80% (4/5)\n  ✅ orders.csv\n処理中 [██████████████████████████████] 100% (5/5)\n  ✅ reports.pdf\n\n完了！`}
        />
      </section>
      <LessonCompleteButton lessonId="cli-development" categoryId="server" />
      <LessonNav lessons={lessons} currentId="cli-development" basePath="/learn/server" />
    </div>
  );
}
