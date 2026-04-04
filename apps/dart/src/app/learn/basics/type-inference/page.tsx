import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function TypeInferencePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">型推論</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartは静的型付け言語ですが、<strong className="text-blue-300">var</strong>や<strong className="text-blue-300">final</strong>を使うと
            コンパイラが自動的に型を推論します。型安全性を維持しながらコードを簡潔に書けます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">var による型推論</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">var</code>で宣言すると、初期値から型が推論されます。推論後の型は変更できません。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 型推論の確認
  var integer = 42;
  var decimal = 3.14;
  var text = 'Dart';
  var flag = true;
  var list = [1, 2, 3];
  var map = {'key': 'value'};

  print('\${integer.runtimeType}: \$integer');
  print('\${decimal.runtimeType}: \$decimal');
  print('\${text.runtimeType}: \$text');
  print('\${flag.runtimeType}: \$flag');
  print('\${list.runtimeType}: \$list');
  print('\${map.runtimeType}: \$map');
}`}
          expectedOutput={`int: 42
double: 3.14
String: Dart
bool: true
List<int>: [1, 2, 3]
_Map<String, String>: {key: value}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数の戻り値型推論</h2>
        <p className="text-gray-400 mb-4">
          関数の戻り値型も推論されます。ただし、明示的に型を書くとコードが読みやすくなります。
        </p>
        <DartEditor
          defaultCode={`// 戻り値型を明示
int add(int a, int b) => a + b;

// 戻り値型を省略（推論される）
double multiply(double a, double b) => a * b;

// ジェネリクスの型推論
List<T> repeat<T>(T value, int times) {
  return List.filled(times, value);
}

void main() {
  var sum = add(3, 4);
  var product = multiply(2.5, 4.0);
  var repeated = repeat('Dart', 3);

  print('合計: \$sum (\${sum.runtimeType})');
  print('積: \$product (\${product.runtimeType})');
  print('繰り返し: \$repeated (\${repeated.runtimeType})');

  // ローカル変数の推論
  var numbers = List.generate(5, (i) => i * i);
  print('二乗リスト: \$numbers');
}`}
          expectedOutput={`合計: 7 (int)
積: 10.0 (double)
繰り返し: [Dart, Dart, Dart] (List<String>)
二乗リスト: [0, 1, 4, 9, 16]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型の明示と推論の使い分け</h2>
        <p className="text-gray-400 mb-4">
          APIの公開部分やコードの意図を明確にしたい場合は型を明示し、ローカル変数は推論を活用するのが一般的です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 推論を使う（ローカル変数）
  var items = <String>[];
  items.addAll(['Apple', 'Banana', 'Cherry']);

  // 明示的な型（コレクション操作結果）
  List<String> filtered = items.where((s) => s.length > 5).toList();
  Map<String, int> lengths = {
    for (var item in items) item: item.length
  };

  print('全アイテム: \$items');
  print('長い名前: \$filtered');
  print('文字数: \$lengths');

  // is 演算子で型チェック
  Object value = 'テスト文字列';
  if (value is String) {
    // このブロック内ではvalueはStringとして扱われる（スマートキャスト）
    print('文字列の長さ: \${value.length}');
  }
}`}
          expectedOutput={`全アイテム: [Apple, Banana, Cherry]
長い名前: [Banana, Cherry]
文字数: {Apple: 5, Banana: 6, Cherry: 6}
文字列の長さ: 6`}
        />
      </section>

      <LessonCompleteButton lessonId="type-inference" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="type-inference" basePath="/learn/basics" />
    </div>
  );
}
