import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function NumericTypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">数値型</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの数値型には<strong className="text-blue-300">int</strong>（整数）と<strong className="text-blue-300">double</strong>（浮動小数点）があります。
            両方の親クラスである<strong className="text-blue-300">num</strong>型も使えます。
            <strong className="text-blue-300">dart:math</strong>ライブラリで数学関数も利用できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">int と double</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">int</code>は整数値、<code className="text-blue-300">double</code>は小数を含む数値を表します。基本的な算術演算が使えます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  int a = 10;
  int b = 3;

  print('加算: \${a + b}');
  print('減算: \${a - b}');
  print('乗算: \${a * b}');
  print('除算: \${a / b}');       // double を返す
  print('整数除算: \${a ~/ b}');  // int を返す
  print('剰余: \${a % b}');

  double x = 3.14;
  double y = 2.0;
  print('double加算: \${x + y}');
  print('絶対値: \${(-5.5).abs()}');
  print('切り上げ: \${x.ceil()}');
  print('切り捨て: \${x.floor()}');
  print('四捨五入: \${x.round()}');
}`}
          expectedOutput={`加算: 13
減算: 7
乗算: 30
除算: 3.3333333333333335
整数除算: 3
剰余: 1
double加算: 5.140000000000001
絶対値: 5.5
切り上げ: 4
切り捨て: 3
四捨五入: 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">dart:math ライブラリ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">dart:math</code>ライブラリをインポートすると、数学関数や定数が使えます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:math';

void main() {
  // 数学定数
  print('π = \$pi');
  print('e = \$e');

  // 数学関数
  print('sqrt(16) = \${sqrt(16)}');
  print('pow(2, 10) = \${pow(2, 10)}');
  print('log(e) = \${log(e)}');
  print('sin(π/2) = \${sin(pi / 2)}');

  // 最大・最小
  print('max(3, 7) = \${max(3, 7)}');
  print('min(3, 7) = \${min(3, 7)}');

  // 乱数
  var rng = Random(42);
  print('乱数: \${rng.nextInt(100)}');
}`}
          expectedOutput={`π = 3.141592653589793
e = 2.718281828459045
sqrt(16) = 4.0
pow(2, 10) = 1024
log(e) = 1.0
sin(π/2) = 1.0
max(3, 7) = 7
min(3, 7) = 3
乱数: 0`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">数値のフォーマット</h2>
        <p className="text-gray-400 mb-4">
          数値を文字列として表示するときにフォーマットを指定できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  double value = 1234567.89123;

  // 小数点以下の桁数を指定
  print(value.toStringAsFixed(2));
  print(value.toStringAsFixed(0));

  // 有効数字を指定
  print(value.toStringAsPrecision(4));

  // 指数表記
  print(value.toStringAsExponential(2));

  // 16進数表記
  int hex = 255;
  print(hex.toRadixString(16));   // ff
  print(hex.toRadixString(2));    // 二進数
  print(hex.toRadixString(8));    // 八進数

  // 16進数リテラル
  int color = 0xFF5733;
  print('カラーコード: \$color');
}`}
          expectedOutput={`1234567.89
1234568
1235000.
1.23e+6
ff
11111111
377
カラーコード: 16734003`}
        />
      </section>

      <LessonCompleteButton lessonId="numeric-types" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="numeric-types" basePath="/learn/basics" />
    </div>
  );
}
