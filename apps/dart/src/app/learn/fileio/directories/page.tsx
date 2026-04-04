import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function DirectoriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイル・IO</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ディレクトリ操作</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">Directory</strong>クラスを使ってディレクトリの作成・一覧取得・削除などの操作が行えます。
            <code className="text-green-300">list()</code>でディレクトリ内のエントリを列挙し、<code className="text-green-300">create(recursive: true)</code>でネストしたディレクトリを一度に作成できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ディレクトリの作成と一覧</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">Directory</code>クラスでディレクトリを作成・列挙します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

Future<void> main() async {
  final base = Directory('/tmp/dart_dir_demo');

  // ネストしたディレクトリを一度に作成
  await Directory('\${base.path}/src/lib').create(recursive: true);
  await Directory('\${base.path}/src/test').create(recursive: true);
  await Directory('\${base.path}/docs').create(recursive: true);

  // ファイルを作成
  await File('\${base.path}/README.md').writeAsString('# Project');
  await File('\${base.path}/src/lib/main.dart').writeAsString('void main() {}');
  await File('\${base.path}/src/test/main_test.dart').writeAsString('// tests');

  print('ディレクトリ構造:');
  await for (final entity in base.list(recursive: true)) {
    final rel = entity.path.replaceFirst(base.path, '');
    final type = entity is Directory ? '📁' : '📄';
    print('  \$type \$rel');
  }

  // クリーンアップ
  await base.delete(recursive: true);
  print('\\nクリーンアップ完了');
}`}
          expectedOutput={`ディレクトリ構造:
  📄 /README.md
  📁 /docs
  📁 /src
  📁 /src/lib
  📄 /src/lib/main.dart
  📁 /src/test
  📄 /src/test/main_test.dart

クリーンアップ完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">一時ディレクトリと特殊パス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">Directory.systemTemp</code>でシステムの一時ディレクトリを取得できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

Future<void> main() async {
  // システムの一時ディレクトリ
  final sysTemp = Directory.systemTemp;
  print('システムTEMP: \${sysTemp.path}');

  // 一時ディレクトリの作成
  final tempDir = await sysTemp.createTemp('dart_demo_');
  print('一時ディレクトリ: \${tempDir.path}');

  // 一時ファイルを作成
  final tempFile = File('\${tempDir.path}/temp.txt');
  await tempFile.writeAsString('一時データ');

  // ファイルのフィルタリング（拡張子で絞り込み）
  await File('\${tempDir.path}/data.json').writeAsString('{}');
  await File('\${tempDir.path}/config.yaml').writeAsString('key: value');

  final dartFiles = await tempDir
      .list()
      .where((e) => e.path.endsWith('.txt'))
      .toList();
  print('.txtファイル: \${dartFiles.map((f) => f.uri.pathSegments.last).toList()}');

  // カレントディレクトリ
  print('カレント: \${Directory.current.path}');

  await tempDir.delete(recursive: true);
  print('一時ディレクトリ削除完了');
}`}
          expectedOutput={`システムTEMP: /tmp
一時ディレクトリ: /tmp/dart_demo_XXXXXX
.txtファイル: [temp.txt]
カレント: /path/to/project
一時ディレクトリ削除完了`}
        />
      </section>

      <LessonCompleteButton lessonId="directories" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="directories" basePath="/learn/fileio" />
    </div>
  );
}
