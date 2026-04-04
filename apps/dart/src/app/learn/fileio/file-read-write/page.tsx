import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileReadWritePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">ファイル・IO</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ファイル読み書き</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの<strong className="text-green-300">dart:io</strong>ライブラリのFileクラスを使ってファイルを読み書きします。
            非同期API（readAsString、writeAsString）と同期API（readAsStringSync）の両方があります。
            通常は非同期APIを使いましょう。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファイルの書き込みと読み込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">writeAsString()</code>で書き込み、<code className="text-green-300">readAsString()</code>で読み込みます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

Future<void> main() async {
  final file = File('/tmp/dart_sample.txt');

  // 書き込み（上書き）
  await file.writeAsString('1行目: Dartファイル操作\\n');
  print('書き込み完了');

  // 追記
  await file.writeAsString('2行目: 追記されたデータ\\n',
      mode: FileMode.append);
  await file.writeAsString('3行目: さらに追記\\n',
      mode: FileMode.append);

  // 全体を読み込み
  final content = await file.readAsString();
  print('--- ファイル内容 ---');
  print(content);

  // 行ごとに読み込み
  final lines = await file.readAsLines();
  print('行数: \${lines.length}');
  for (int i = 0; i < lines.length; i++) {
    print('  [\${i+1}] \${lines[i]}');
  }

  // ファイル情報
  final stat = await file.stat();
  print('サイズ: \${stat.size} bytes');

  await file.delete();
  print('削除完了');
}`}
          expectedOutput={`書き込み完了
--- ファイル内容 ---
1行目: Dartファイル操作
2行目: 追記されたデータ
3行目: さらに追記

行数: 3
  [1] 1行目: Dartファイル操作
  [2] 2行目: 追記されたデータ
  [3] 3行目: さらに追記
サイズ: 72 bytes
削除完了`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">バイナリファイルの操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">readAsBytes()</code>・<code className="text-green-300">writeAsBytes()</code>でバイナリデータを扱います。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';
import 'dart:typed_data';

Future<void> main() async {
  final file = File('/tmp/binary_sample.bin');

  // バイナリ書き込み
  final data = Uint8List.fromList([72, 101, 108, 108, 111]); // "Hello"
  await file.writeAsBytes(data);
  print('バイナリ書き込み: \${data.length} bytes');

  // バイナリ読み込み
  final bytes = await file.readAsBytes();
  print('読み込んだバイト: \$bytes');

  // ASCII文字列として解釈
  final str = String.fromCharCodes(bytes);
  print('文字列として: \$str');

  // ストリームで読み込み（大きなファイル向け）
  int totalBytes = 0;
  await for (final chunk in file.openRead()) {
    totalBytes += chunk.length;
  }
  print('ストリーム読み込み: \$totalBytes bytes');

  await file.delete();
}`}
          expectedOutput={`バイナリ書き込み: 5 bytes
読み込んだバイト: [72, 101, 108, 108, 111]
文字列として: Hello
ストリーム読み込み: 5 bytes`}
        />
      </section>

      <LessonCompleteButton lessonId="file-read-write" categoryId="fileio" />
      <LessonNav lessons={lessons} currentId="file-read-write" basePath="/learn/fileio" />
    </div>
  );
}
