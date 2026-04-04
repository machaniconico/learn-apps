import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functional");

export default function FunctionObjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数型プログラミング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">関数オブジェクト</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartでは関数は<strong className="text-purple-300">ファーストクラスオブジェクト</strong>です。
            変数に代入したり、引数として渡したり、戻り値として返したりできます。
            <code className="text-purple-300">Function</code>型や型指定した関数型を使って型安全に扱えます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数を変数に代入</h2>
        <p className="text-gray-400 mb-4">
          関数を変数に代入して、異なる実装を切り替えることができます。
        </p>
        <DartEditor
          defaultCode={`// typedef で関数型に名前をつける
typedef Transformer = String Function(String);
typedef Predicate<T> = bool Function(T);

String toUpperCase(String s) => s.toUpperCase();
String toLowerCase(String s) => s.toLowerCase();
String reverse(String s) => s.split('').reversed.join();

void applyAndPrint(String text, Transformer fn) {
  print('\${fn(text)}');
}

void main() {
  // 関数を変数に代入
  Transformer transform = toUpperCase;
  print(transform('hello'));

  transform = toLowerCase;
  print(transform('WORLD'));

  transform = reverse;
  print(transform('Dart'));

  print('---');

  // 高階関数に渡す
  final words = ['Dart', 'Flutter', 'Async', 'Stream'];
  for (final fn in [toUpperCase, toLowerCase, reverse]) {
    print(words.map(fn).toList());
  }

  // Predicateの使用
  Predicate<int> isEven = (n) => n % 2 == 0;
  Predicate<String> isLong = (s) => s.length > 5;

  print([1, 2, 3, 4, 5].where(isEven).toList());
  print(words.where(isLong).toList());
}`}
          expectedOutput={`HELLO
world
traD
---
[DART, FLUTTER, ASYNC, STREAM]
[dart, flutter, async, stream]
[traD, rettuF, cnysA, maertS]
[2, 4]
[Flutter]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数を返す関数（ファクトリ）</h2>
        <p className="text-gray-400 mb-4">
          関数を返す関数でコンポーネントの動作をカスタマイズできます。
        </p>
        <DartEditor
          defaultCode={`typedef StringMapper = String Function(String);

StringMapper makePrefix(String prefix) =>
    (s) => '\$prefix\$s';

StringMapper makeSuffix(String suffix) =>
    (s) => '\$s\$suffix';

StringMapper makeTruncate(int maxLength) =>
    (s) => s.length > maxLength ? '\${s.substring(0, maxLength)}...' : s;

void main() {
  final addBracket = makePrefix('[');
  final addIcon = makePrefix('★ ');
  final addEllipsis = makeTruncate(8);

  final items = ['Dart言語', 'Flutter開発', 'async/await', 'Null Safety'];

  print('ブラケット:');
  items.map(addBracket).forEach(print);

  print('アイコン付き:');
  items.map(addIcon).forEach(print);

  print('省略:');
  items.map(addEllipsis).forEach(print);
}`}
          expectedOutput={`ブラケット:
[Dart言語
[Flutter開発
[async/await
[Null Safety
アイコン付き:
★ Dart言語
★ Flutter開発
★ async/await
★ Null Safety
省略:
Dart言語
Flutter...
async/aw...
Null Saf...`}
        />
      </section>

      <LessonCompleteButton lessonId="function-objects" categoryId="functional" />
      <LessonNav lessons={lessons} currentId="function-objects" basePath="/learn/functional" />
    </div>
  );
}
