import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wide">文字列操作</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">文字列基礎</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの<strong className="text-yellow-300">String</strong>はUTF-16エンコードされた不変の文字列です。
            シングルクォートとダブルクォートのどちらでも作成できます。
            <code className="text-yellow-300">r''</code>の生文字列ではエスケープシーケンスが無効になります。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">文字列リテラルの種類</h2>
        <p className="text-gray-400 mb-4">
          シングルクォート・ダブルクォート・トリプルクォート・生文字列の4種類があります。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // シングルクォートとダブルクォート
  final s1 = 'シングルクォート';
  final s2 = "ダブルクォート";
  print(s1);
  print(s2);

  // エスケープシーケンス
  print('タブ:\\t区切り');
  print('改行:\\n次の行');
  print('バックスラッシュ: \\\\');
  print('ダブルクォート: "引用"');

  // 生文字列（r prefix）: エスケープ無効
  final rawStr = r'C:\\Users\\user\\file.txt';
  print(rawStr);

  final regex = r'\\d+\\.\\d+';
  print('正規表現パターン: \$regex');

  // 文字列の連結
  final hello = 'Hello' + ', ' + 'Dart!';
  print(hello);

  // 隣接リテラルの自動連結
  final long = 'これは'
      '長い'
      '文字列です';
  print(long);
}`}
          expectedOutput={`シングルクォート
ダブルクォート
タブ:	区切り
改行:
次の行
バックスラッシュ: \\
ダブルクォート: "引用"
C:\\Users\\user\\file.txt
正規表現パターン: \\d+\\.\\d+
Hello, Dart!
これは長い文字列です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">文字列の不変性とプロパティ</h2>
        <p className="text-gray-400 mb-4">
          Dartの文字列は不変（immutable）です。操作メソッドは常に新しい文字列を返します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final str = 'Hello, Dart Programming!';

  // 基本プロパティ
  print('長さ: \${str.length}');
  print('空か: \${str.isEmpty}');
  print('空でないか: \${str.isNotEmpty}');

  // 文字へのアクセス
  print('最初の文字: \${str[0]}');
  print('最後の文字: \${str[str.length - 1]}');

  // 文字コード
  print('Hの文字コード: \${str.codeUnitAt(0)}');
  print('コードリスト(先頭5): \${str.codeUnits.take(5).toList()}');

  // 不変性の確認
  String original = 'hello';
  String upper = original.toUpperCase();
  print('元: \$original');  // 変わらない
  print('大文字: \$upper');

  // 文字列の比較
  print('比較: \${'apple'.compareTo('banana')}');
  print('同一: \${'dart' == 'dart'}');
  print('大文字無視比較: \${'Dart'.toLowerCase() == 'dart'}');
}`}
          expectedOutput={`長さ: 24
空か: false
空でないか: true
最初の文字: H
最後の文字: !
Hの文字コード: 72
コードリスト(先頭5): [72, 101, 108, 108, 111]
元: hello
大文字: HELLO
比較: -1
同一: true
大文字無視比較: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数行文字列</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">{"'''"}</code>や<code className="text-yellow-300">{'"""'}</code>で複数行の文字列を書けます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 複数行文字列
  final haiku = '''
古池や
蛙飛び込む
水の音''';
  print(haiku);
  print('行数: \${haiku.split('\\n').length}');

  // ダブルクォートのトリプル
  final html = """
<div class="card">
  <h1>タイトル</h1>
  <p>本文テキスト</p>
</div>""";
  print(html);

  // 複数行 + 生文字列
  final multiRaw = r'''
パターン1: \d+
パターン2: [a-z]+
パターン3: .*
''';
  print(multiRaw);
}`}
          expectedOutput={`
古池や
蛙飛び込む
水の音
行数: 4

<div class="card">
  <h1>タイトル</h1>
  <p>本文テキスト</p>
</div>

パターン1: \\d+
パターン2: [a-z]+
パターン3: .*
`}
        />
      </section>

      <LessonCompleteButton lessonId="string-basics" categoryId="strings" />
      <LessonNav lessons={lessons} currentId="string-basics" basePath="/learn/strings" />
    </div>
  );
}
