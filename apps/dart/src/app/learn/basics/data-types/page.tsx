import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function DataTypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">データ型</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの主なデータ型には<strong className="text-blue-300">int</strong>（整数）、<strong className="text-blue-300">double</strong>（浮動小数点）、
            <strong className="text-blue-300">String</strong>（文字列）、<strong className="text-blue-300">bool</strong>（論理値）、
            <strong className="text-blue-300">List</strong>（リスト）、<strong className="text-blue-300">Map</strong>（マップ）があります。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本データ型</h2>
        <p className="text-gray-400 mb-4">
          Dartの組み込みデータ型を確認します。全ての値はオブジェクトであり、nullを除いてnullになりません（Null Safety）。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 数値型
  int integer = 42;
  double decimal = 3.14;
  num number = 100; // intもdoubleも代入可能

  // 文字列型
  String text = 'Dartプログラミング';

  // 論理型
  bool isTrue = true;
  bool isFalse = false;

  print('int: \$integer');
  print('double: \$decimal');
  print('num: \$number (\${number.runtimeType})');
  print('String: \$text');
  print('bool: \$isTrue, \$isFalse');
}`}
          expectedOutput={`int: 42
double: 3.14
num: 100 (int)
String: Dartプログラミング
bool: true, false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">List と Map</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">List</code>は順序付きコレクション、<code className="text-blue-300">Map</code>はキーと値のペアを格納します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // List（配列）
  List<String> fruits = ['りんご', 'バナナ', 'みかん'];
  print('フルーツ: \$fruits');
  print('最初: \${fruits[0]}, 長さ: \${fruits.length}');

  // Map（辞書）
  Map<String, int> scores = {
    'Alice': 90,
    'Bob': 85,
    'Carol': 92,
  };
  print('スコア: \$scores');
  print('Aliceのスコア: \${scores['Alice']}');

  // Set（重複なし）
  Set<int> uniqueNumbers = {1, 2, 3, 2, 1};
  print('ユニーク数: \$uniqueNumbers');
}`}
          expectedOutput={`フルーツ: [りんご, バナナ, みかん]
最初: りんご, 長さ: 3
スコア: {Alice: 90, Bob: 85, Carol: 92}
Aliceのスコア: 90
ユニーク数: {1, 2, 3}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型変換</h2>
        <p className="text-gray-400 mb-4">
          Dartでは明示的な型変換メソッドを使います。暗黙の型変換は基本的に行われません。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 数値から文字列
  int n = 42;
  String s = n.toString();
  print('int → String: "\$s" (\${s.runtimeType})');

  // 文字列から数値
  String numStr = '123';
  int parsed = int.parse(numStr);
  double parsedDouble = double.parse('3.14');
  print('String → int: \$parsed');
  print('String → double: \$parsedDouble');

  // intとdoubleの変換
  int i = 10;
  double d = i.toDouble();
  double d2 = 9.9;
  int i2 = d2.toInt(); // 小数点以下切り捨て
  print('int → double: \$d');
  print('double → int: \$i2');
}`}
          expectedOutput={`int → String: "42" (String)
String → int: 123
String → double: 3.14
int → double: 10.0
double → int: 9`}
        />
      </section>

      <LessonCompleteButton lessonId="data-types" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="data-types" basePath="/learn/basics" />
    </div>
  );
}
