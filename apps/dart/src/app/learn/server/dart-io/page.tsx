import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("server");

export default function DartIoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold">サーバー開発 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">dart:io</h1>
        <p className="text-gray-400">dart:ioライブラリを使ったファイルI/OとHTTPの基本を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">dart:ioとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="text-cyan-300">dart:io</code>はDartのI/O操作を提供するコアライブラリです。
          ファイル・ディレクトリ・ソケット・HTTPサーバーなどの機能を含みます。
          Flutterのモバイル環境では使えませんが、Dart単体・サーバー・CLIでは利用できます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-cyan-300">File</code>: ファイルの読み書き</li>
          <li>• <code className="text-cyan-300">Directory</code>: ディレクトリ操作</li>
          <li>• <code className="text-cyan-300">HttpServer</code>: HTTPサーバー</li>
          <li>• <code className="text-cyan-300">stdin/stdout/stderr</code>: 標準I/O</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファイル操作の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">dart:io</code>のFileクラスを使ったファイル読み書きの概念です。
        </p>
        <DartEditor
          defaultCode={`// dart:io ファイル操作の概念コード
// import 'dart:io';

// 実際のコード例:
// Future<void> main() async {
//   final file = File('data.txt');
//
//   // 書き込み
//   await file.writeAsString('Hello, Dart!\\nLine 2\\nLine 3');
//   print('書き込み完了: \${file.path}');
//
//   // 読み込み
//   final content = await file.readAsString();
//   print('内容:\\n\$content');
//
//   // 行ごとに読み込み
//   final lines = await file.readAsLines();
//   print('行数: \${lines.length}');
//
//   // ファイル情報
//   final stat = await file.stat();
//   print('サイズ: \${stat.size} bytes');
// }

// Dartで概念を表現（ファイルシステムをSimulateする）
class VirtualFile {
  final String path;
  String? _content;

  VirtualFile(this.path);

  Future<void> writeAsString(String content) async {
    _content = content;
    print('書き込み完了: \$path (\${content.length}文字)');
  }

  Future<String> readAsString() async {
    if (_content == null) throw Exception('ファイルが存在しません');
    return _content!;
  }

  Future<List<String>> readAsLines() async {
    return (await readAsString()).split('\\n');
  }

  bool get existsSync => _content != null;
}

Future<void> main() async {
  final file = VirtualFile('data.txt');

  await file.writeAsString('こんにちは、Dart!\\nLine 2\\nLine 3');

  final content = await file.readAsString();
  print('内容:\\n\$content');

  final lines = await file.readAsLines();
  print('行数: \${lines.length}');
  for (int i = 0; i < lines.length; i++) {
    print('  行\${i + 1}: \${lines[i]}');
  }
}`}
          expectedOutput={`書き込み完了: data.txt (21文字)\n内容:\nこんにちは、Dart!\nLine 2\nLine 3\n行数: 3\n  行1: こんにちは、Dart!\n  行2: Line 2\n  行3: Line 3`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">環境変数とプロセス情報</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">Platform</code>クラスを使った環境情報の取得です。
        </p>
        <DartEditor
          defaultCode={`// Platform クラスの活用（概念コード）
// import 'dart:io';

// 実際のコード:
// print(Platform.operatingSystem);  // 'macos', 'linux', 'windows'
// print(Platform.numberOfProcessors);
// print(Platform.environment['PATH']);

class PlatformInfo {
  static final String os = 'macos';
  static final int processors = 8;
  static final Map<String, String> env = {
    'HOME': '/Users/user',
    'PATH': '/usr/bin:/usr/local/bin',
    'DART_SDK': '/usr/local/dart',
    'PORT': '8080',
  };
}

void main() {
  print('=== プラットフォーム情報 ===');
  print('OS: \${PlatformInfo.os}');
  print('CPU: \${PlatformInfo.processors}コア');

  print('\\n=== 環境変数 ===');
  PlatformInfo.env.forEach((key, value) {
    print('  \$key=\$value');
  });

  // 環境変数からポートを取得（デフォルト値付き）
  final port = int.tryParse(PlatformInfo.env['PORT'] ?? '') ?? 3000;
  print('\\nサーバーポート: \$port');

  // OS別の処理
  final separator = PlatformInfo.os == 'windows' ? '\\\\' : '/';
  print('パス区切り文字: "\$separator"');
}`}
          expectedOutput={`=== プラットフォーム情報 ===\nOS: macos\nCPU: 8コア\n\n=== 環境変数 ===\n  HOME=/Users/user\n  PATH=/usr/bin:/usr/local/bin\n  DART_SDK=/usr/local/dart\n  PORT=8080\n\nサーバーポート: 8080\nパス区切り文字: "/"`}
        />
      </section>
      <LessonCompleteButton lessonId="dart-io" categoryId="server" />
      <LessonNav lessons={lessons} currentId="dart-io" basePath="/learn/server" />
    </div>
  );
}
