import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringMethodsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wide">文字列操作</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">文字列メソッド</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            DartのStringクラスには豊富なメソッドが用意されています。
            <code className="text-yellow-300">contains</code>・<code className="text-yellow-300">split</code>・<code className="text-yellow-300">trim</code>・
            <code className="text-yellow-300">replaceAll</code>・<code className="text-yellow-300">substring</code>など頻繁に使うメソッドを習得しましょう。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">検索・判定メソッド</h2>
        <p className="text-gray-400 mb-4">
          文字列の内容を調べる<code className="text-yellow-300">contains</code>・<code className="text-yellow-300">startsWith</code>・<code className="text-yellow-300">endsWith</code>・<code className="text-yellow-300">indexOf</code>を確認します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final text = 'Hello, Dart Programming Language!';

  // 含む確認
  print(text.contains('Dart'));       // true
  print(text.contains('Python'));     // false
  print(text.contains('dart'));       // false (大文字小文字区別)

  // 先頭・末尾確認
  print(text.startsWith('Hello'));    // true
  print(text.endsWith('!'));          // true
  print(text.startsWith('hello'));    // false

  // インデックス検索
  print(text.indexOf('Dart'));        // 7
  print(text.indexOf('a'));           // 1 (最初の 'a')
  print(text.lastIndexOf('a'));       // 29 (最後の 'a')
  print(text.indexOf('xyz'));         // -1 (存在しない)

  // 大文字小文字を無視して検索
  final lower = text.toLowerCase();
  print(lower.contains('dart'));      // true

  // 空白・空確認
  print(''.isEmpty);                 // true
  print('  '.isEmpty);               // false
  print('  '.trim().isEmpty);        // true
}`}
          expectedOutput={`true
false
false
true
true
false
7
1
29
-1
true
true
false
true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">変換・加工メソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">toUpperCase</code>・<code className="text-yellow-300">toLowerCase</code>・<code className="text-yellow-300">trim</code>・<code className="text-yellow-300">replaceAll</code>で文字列を変換します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 大文字・小文字変換
  print('hello'.toUpperCase());
  print('HELLO'.toLowerCase());

  // trim: 空白除去
  print('  hello  '.trim());
  print('  hello  '.trimLeft());
  print('  hello  '.trimRight());

  // padLeft / padRight: パディング
  print('42'.padLeft(5));
  print('42'.padLeft(5, '0'));
  print('hello'.padRight(10, '-'));

  // replaceAll: 全置換
  final text = 'foo bar foo baz foo';
  print(text.replaceAll('foo', 'qux'));

  // replaceFirst: 最初の1件のみ
  print(text.replaceFirst('foo', 'qux'));

  // replaceRange: 範囲指定の置換
  final str = 'Hello World';
  print(str.replaceRange(6, 11, 'Dart'));
}`}
          expectedOutput={`HELLO
hello
hello
hello
  hello
   42
00042
hello-----
qux bar qux baz qux
qux bar foo baz foo
Hello Dart`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">分割・結合・部分文字列</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">split</code>・<code className="text-yellow-300">join</code>・<code className="text-yellow-300">substring</code>でテキストを分割・結合・抽出します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // split: 分割
  final csv = 'Alice,30,Tokyo,Engineer';
  final parts = csv.split(',');
  print(parts);
  print('名前: \${parts[0]}, 年齢: \${parts[1]}');

  // 空文字で分割（文字単位）
  final chars = 'Dart'.split('');
  print(chars);

  // join: リストを結合
  final words = ['Hello', 'Dart', 'World'];
  print(words.join(' '));
  print(words.join('-'));
  print(words.join(''));

  // substring: 部分文字列
  final str = 'Hello, Dart!';
  print(str.substring(7));      // インデックス7から末尾
  print(str.substring(7, 11)); // インデックス7から11

  // characters を使った日本語対応
  final ja = 'こんにちは';
  print(ja.length);              // UTF-16単位の長さ
  print(ja.substring(0, 3));    // 最初の3文字
}`}
          expectedOutput={`[Alice, 30, Tokyo, Engineer]
名前: Alice, 年齢: 30
[D, a, r, t]
Hello Dart World
Hello-Dart-World
HelloDartWorld
Dart!
Dart
5
こんに`}
        />
      </section>

      <LessonCompleteButton lessonId="string-methods" categoryId="strings" />
      <LessonNav lessons={lessons} currentId="string-methods" basePath="/learn/strings" />
    </div>
  );
}
