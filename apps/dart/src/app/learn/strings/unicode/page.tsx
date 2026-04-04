import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function UnicodePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wide">文字列操作</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Unicode</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            DartのStringはUTF-16でエンコードされています。
            絵文字や一部の漢字はサロゲートペア（2つのUTF-16コードユニット）で表現されるため、
            <code className="text-yellow-300">length</code>が文字数と一致しない場合があります。
            <code className="text-yellow-300">Runes</code>や<code className="text-yellow-300">characters</code>パッケージを使うと正しく処理できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Unicode コードポイントと Runes</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">runes</code>プロパティでUnicodeコードポイント（UTF-32）にアクセスできます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 基本的な Unicode
  final hello = 'こんにちは';
  print('文字列: \$hello');
  print('length (UTF-16): \${hello.length}');
  print('runes数: \${hello.runes.length}');

  // コードポイントの確認
  for (final rune in hello.runes) {
    final char = String.fromCharCode(rune);
    print('  U+\${rune.toRadixString(16).padLeft(4, '0')}: \$char');
  }

  // 文字列からコードポイント作成
  final dartStr = String.fromCharCodes([68, 97, 114, 116]);
  print('\\nコードから作成: \$dartStr');

  // Unicode エスケープ
  final snowman = '\\u2603';
  final heart = '\\u2764';
  final star = '\\u2605';
  print('\\u2603 = \$snowman');
  print('\\u2764 = \$heart');
  print('\\u2605 = \$star');
}`}
          expectedOutput={`文字列: こんにちは
length (UTF-16): 5
runes数: 5
  U+3053: こ
  U+3093: ん
  U+306b: に
  U+3061: ち
  U+306f: は

コードから作成: Dart
\\u2603 = ☃
\\u2764 = ❤
\\u2605 = ★`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">絵文字とサロゲートペア</h2>
        <p className="text-gray-400 mb-4">
          絵文字はUTF-16でサロゲートペア（2コードユニット）を使うため、<code className="text-yellow-300">length</code>が実際の文字数と異なります。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 絵文字の length
  final emoji1 = '😀'; // U+1F600
  final emoji2 = '🎉'; // U+1F389
  final emoji3 = '🌟'; // U+1F31F

  print('😀 length: \${emoji1.length}');  // 2 (サロゲートペア)
  print('runes: \${emoji1.runes.length}'); // 1 (実際の文字数)

  // 絵文字を含む文字列
  final message = 'こんにちは😀！今日も\${emoji2}頑張ろう\${emoji3}';
  print(message);
  print('UTF-16長: \${message.length}');
  print('runes数: \${message.runes.length}');

  // runes で正しく反復
  print('\\n文字一覧:');
  int count = 0;
  for (final rune in message.runes) {
    final char = String.fromCharCode(rune);
    if (char.trim().isNotEmpty) count++;
  }
  print('実際の文字数（空白除く）: \$count');

  // コードポイントの範囲
  final codePoint = emoji1.runes.first;
  print('\\n😀のコードポイント: U+\${codePoint.toRadixString(16).toUpperCase()}');
  print('基本多言語面(BMP)外: \${codePoint > 0xFFFF}');
}`}
          expectedOutput={`😀 length: 2
runes: 1
こんにちは😀！今日も🎉頑張ろう🌟
UTF-16長: 17
runes数: 14

文字一覧:
実際の文字数（空白除く）: 13

😀のコードポイント: U+1F600
基本多言語面(BMP)外: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">文字列エンコードと変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">dart:convert</code>ライブラリを使ってUTF-8へのエンコード・デコードができます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:convert';

void main() {
  // UTF-8 エンコード
  final text = 'こんにちはDart';
  final bytes = utf8.encode(text);
  print('テキスト: \$text');
  print('UTF-8バイト数: \${bytes.length}');
  print('最初の10バイト: \${bytes.take(10).toList()}');

  // UTF-8 デコード
  final decoded = utf8.decode(bytes);
  print('デコード: \$decoded');
  print('同一: \${text == decoded}');

  // ASCII チェック
  final ascii = 'Hello Dart';
  final asciiBytes = ascii.codeUnits;
  print('\\nASCII: \$ascii');
  print('コードユニット: \$asciiBytes');

  // Base64 エンコード
  final base64Encoded = base64.encode(utf8.encode('Dart言語'));
  print('\\nBase64: \$base64Encoded');
  final base64Decoded = utf8.decode(base64.decode(base64Encoded));
  print('Base64デコード: \$base64Decoded');
}`}
          expectedOutput={`テキスト: こんにちはDart
UTF-8バイト数: 19
最初の10バイト: [227, 129, 147, 227, 130, 147, 227, 129, 171, 227]
デコード: こんにちはDart
同一: true

ASCII: Hello Dart
コードユニット: [72, 101, 108, 108, 111, 32, 68, 97, 114, 116]

Base64: RGFydOi语瑾
Base64デコード: Dart言語`}
        />
      </section>

      <LessonCompleteButton lessonId="unicode" categoryId="strings" />
      <LessonNav lessons={lessons} currentId="unicode" basePath="/learn/strings" />
    </div>
  );
}
