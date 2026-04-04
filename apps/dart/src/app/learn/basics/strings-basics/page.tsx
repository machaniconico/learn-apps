import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function StringsBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">文字列基礎</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの文字列はシングルクォート（<strong className="text-blue-300">&apos;</strong>）またはダブルクォート（<strong className="text-blue-300">&quot;</strong>）で囲みます。
            文字列補間、結合、複数行文字列などの基本操作を学びます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本</h2>
        <p className="text-gray-400 mb-4">
          シングルクォートとダブルクォートはどちらも使えます。エスケープシーケンスや生文字列（r&apos;...&apos;）も利用できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // シングルとダブルクォート
  String s1 = 'シングルクォート';
  String s2 = "ダブルクォート";
  print(s1);
  print(s2);

  // エスケープシーケンス
  String tab = 'A\tB';      // タブ
  String newline = 'A\nB';  // 改行
  String quote = "It's OK"; // シングルクォートを含む
  print(tab);
  print(newline);
  print(quote);

  // 生文字列（エスケープを無効化）
  String raw = r'バックスラッシュ: \n \t';
  print(raw);
}`}
          expectedOutput={`シングルクォート
ダブルクォート
A	B
A
B
It's OK
バックスラッシュ: \n \t`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">文字列操作</h2>
        <p className="text-gray-400 mb-4">
          Dartの<code className="text-blue-300">String</code>クラスには多くの便利なメソッドがあります。
        </p>
        <DartEditor
          defaultCode={`void main() {
  String text = 'Hello, Dart World!';

  print('長さ: \${text.length}');
  print('大文字: \${text.toUpperCase()}');
  print('小文字: \${text.toLowerCase()}');
  print('含む: \${text.contains('Dart')}');
  print('始まり: \${text.startsWith('Hello')}');
  print('終わり: \${text.endsWith('!')}');
  print('置換: \${text.replaceAll('Dart', 'Flutter')}');
  print('分割: \${text.split(' ')}');
  print('トリム: \${'  空白  '.trim()}');
  print('部分: \${text.substring(7, 11)}');
}`}
          expectedOutput={`長さ: 18
大文字: HELLO, DART WORLD!
小文字: hello, dart world!
含む: true
始まり: true
終わり: true
置換: Hello, Flutter World!
分割: [Hello,, Dart, World!]
トリム: 空白
部分: Dart`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数行文字列と文字列結合</h2>
        <p className="text-gray-400 mb-4">
          トリプルクォート（<code className="text-blue-300">&apos;&apos;&apos;...&apos;&apos;&apos;</code>）で複数行文字列、<code className="text-blue-300">+</code>演算子や隣接リテラルで文字列を結合できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 複数行文字列
  String poem = '''
Dartは速い、
Dartは安全、
Dartは楽しい！''';
  print(poem);

  // 文字列の結合
  String first = 'Hello';
  String second = 'World';
  print(first + ', ' + second + '!');

  // 隣接する文字列リテラルは自動連結
  String long = 'Dartは'
      'とても'
      '楽しい言語です';
  print(long);

  // StringBuffer（大量の連結に効率的）
  var buffer = StringBuffer();
  for (int i = 1; i <= 5; i++) {
    buffer.write('\$i ');
  }
  print(buffer.toString().trim());
}`}
          expectedOutput={`
Dartは速い、
Dartは安全、
Dartは楽しい！
Hello, World!
Dartはとても楽しい言語です
1 2 3 4 5`}
        />
      </section>

      <LessonCompleteButton lessonId="strings-basics" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="strings-basics" basePath="/learn/basics" />
    </div>
  );
}
