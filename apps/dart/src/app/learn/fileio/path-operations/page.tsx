import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function PathOperationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイル・IO</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パス操作</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            ファイルパスの操作には<strong className="text-green-300">path</strong>パッケージまたは<code className="text-green-300">dart:io</code>のFileSystemEntityを使います。
            プラットフォーム独立なパス操作のために、文字列結合よりもpathパッケージの使用を推奨します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">dart:io でのパス操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">File</code>クラスの<code className="text-green-300">path</code>プロパティと<code className="text-green-300">uri</code>でパス情報を取得できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

void main() {
  // パスの分解
  final file = File('/home/user/documents/report.txt');

  print('フルパス: \${file.path}');
  print('ファイル名: \${file.uri.pathSegments.last}');
  print('親ディレクトリ: \${file.parent.path}');

  // 拡張子の取得
  final fileName = file.uri.pathSegments.last;
  final dotIndex = fileName.lastIndexOf('.');
  final extension = dotIndex >= 0 ? fileName.substring(dotIndex) : '';
  final baseName = dotIndex >= 0 ? fileName.substring(0, dotIndex) : fileName;

  print('ベース名: \$baseName');
  print('拡張子: \$extension');

  // パスの結合（手動）
  final dir = '/var/data';
  final subPath = 'logs/app.log';
  final combined = '\$dir/\$subPath';
  print('結合パス: \$combined');

  // プラットフォームのセパレータ
  print('セパレータ: \${Platform.pathSeparator}');
  print('OS: \${Platform.operatingSystem}');
}`}
          expectedOutput={`フルパス: /home/user/documents/report.txt
ファイル名: report.txt
親ディレクトリ: /home/user/documents
ベース名: report
拡張子: .txt
結合パス: /var/data/logs/app.log
セパレータ: /
OS: macos`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファイルの存在確認と操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">exists()</code>でファイルやディレクトリの存在を確認してから操作します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

Future<void> ensureDir(String path) async {
  final dir = Directory(path);
  if (!await dir.exists()) {
    await dir.create(recursive: true);
    print('ディレクトリ作成: \$path');
  } else {
    print('ディレクトリ既存: \$path');
  }
}

Future<void> safeDelete(String path) async {
  final file = File(path);
  if (await file.exists()) {
    await file.delete();
    print('削除: \$path');
  } else {
    print('ファイルなし: \$path');
  }
}

Future<void> main() async {
  const tmpDir = '/tmp/dart_path_demo';
  const filePath = '\$tmpDir/test.txt';

  await ensureDir(tmpDir);

  final file = File(filePath);
  await file.writeAsString('テスト内容');
  print('ファイル作成: \$filePath');
  print('存在確認: \${await file.exists()}');

  // ファイル名変更
  final renamed = await file.rename('\$tmpDir/renamed.txt');
  print('リネーム後: \${renamed.path}');

  // コピー
  await renamed.copy('\$tmpDir/copy.txt');
  print('コピー完了');

  // 削除
  await Directory(tmpDir).delete(recursive: true);
  print('ディレクトリ削除完了');
}`}
          expectedOutput={`ディレクトリ作成: /tmp/dart_path_demo
ファイル作成: /tmp/dart_path_demo/test.txt
存在確認: true
リネーム後: /tmp/dart_path_demo/renamed.txt
コピー完了
ディレクトリ削除完了`}
        />
      </section>

      <LessonCompleteButton lessonId="path-operations" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="path-operations" basePath="/learn/fileio" />
    </div>
  );
}
