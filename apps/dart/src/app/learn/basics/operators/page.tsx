import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function OperatorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">演算子</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartには算術、比較、論理、代入、ビット演算子などが揃っています。
            また、<strong className="text-blue-300">??</strong>（null合体）や<strong className="text-blue-300">?.</strong>（null安全アクセス）など、
            Dart固有の便利な演算子もあります。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">算術・代入演算子</h2>
        <p className="text-gray-400 mb-4">
          基本的な算術演算子と、複合代入演算子（<code className="text-blue-300">+=</code>、<code className="text-blue-300">-=</code>など）を学びます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 算術演算子
  int a = 10, b = 3;
  print('+ : \${a + b}');
  print('- : \${a - b}');
  print('* : \${a * b}');
  print('/ : \${a / b}');
  print('~/ : \${a ~/ b}');  // 整数除算
  print('% : \${a % b}');    // 剰余

  // 複合代入演算子
  int x = 100;
  x += 10;  print('+=: \$x');
  x -= 20;  print('-=: \$x');
  x *= 2;   print('*=: \$x');
  x ~/= 3;  print('~/=: \$x');
  x %= 7;   print('%=: \$x');

  // インクリメント・デクリメント
  int n = 5;
  print('n++: \${n++}');  // 後置（使用後に増加）
  print('++n: \${++n}');  // 前置（増加後に使用）
}`}
          expectedOutput={`+ : 13
- : 7
* : 30
/ : 3.3333333333333335
~/ : 3
% : 1
+=: 110
-=: 90
*=: 180
~/=: 60
%=: 4
n++: 5
++n: 7`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart特有の演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">??</code>（null合体）、<code className="text-blue-300">??=</code>（null代入）、<code className="text-blue-300">?.</code>（null安全アクセス）はDartの強力な機能です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // ?? null合体演算子
  String? name = null;
  String result = name ?? 'デフォルト名';
  print(result);

  // ??= nullのときだけ代入
  String? title;
  title ??= 'タイトルなし';
  print(title);
  title ??= '変わらない'; // すでに値があるので無視
  print(title);

  // ?. null安全アクセス
  String? maybeNull = null;
  print(maybeNull?.length);        // null（エラーにならない）
  print(maybeNull?.toUpperCase()); // null

  String definite = 'hello';
  print(definite?.toUpperCase());  // HELLO

  // カスケード演算子 (..)
  List<int> numbers = []
    ..add(1)
    ..add(2)
    ..add(3)
    ..addAll([4, 5]);
  print(numbers);
}`}
          expectedOutput={`デフォルト名
タイトルなし
タイトルなし
null
null
HELLO
[1, 2, 3, 4, 5]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ビット演算子と型演算子</h2>
        <p className="text-gray-400 mb-4">
          ビット演算子は低レベルな操作に使います。<code className="text-blue-300">is</code>と<code className="text-blue-300">as</code>は型チェックとキャストに使います。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // ビット演算子
  int a = 0xF0; // 11110000
  int b = 0x0F; // 00001111

  print('AND: \${(a & b).toRadixString(16)}');   // 00
  print('OR:  \${(a | b).toRadixString(16)}');   // ff
  print('XOR: \${(a ^ b).toRadixString(16)}');   // ff
  print('NOT: \${(~a).toRadixString(16)}');       // -f1
  print('左シフト: \${(1 << 4)}');               // 16
  print('右シフト: \${(256 >> 4)}');             // 16

  // 型演算子
  Object value = 42;
  print('is int: \${value is int}');
  print('is String: \${value is String}');
  print('is! String: \${value is! String}');

  // as でキャスト
  num n = 3.14;
  double d = n as double;
  print('キャスト: \$d');
}`}
          expectedOutput={`AND: 0
OR:  ff
XOR: ff
NOT: -f1
左シフト: 16
右シフト: 16
is int: true
is String: false
is! String: true
キャスト: 3.14`}
        />
      </section>

      <LessonCompleteButton lessonId="operators" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="operators" basePath="/learn/basics" />
    </div>
  );
}
