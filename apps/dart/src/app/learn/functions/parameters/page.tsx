import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ParametersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パラメータ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの関数パラメータには<strong className="text-purple-300">位置パラメータ</strong>（順序で渡す）があります。
            複数のパラメータを受け取り、型安全に処理できます。
            パラメータはすべてNullセーフです。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">位置パラメータ</h2>
        <p className="text-gray-400 mb-4">
          通常のパラメータは位置で識別されます。呼び出し側は定義された順序で引数を渡す必要があります。
        </p>
        <DartEditor
          defaultCode={`// 単一パラメータ
double square(double n) => n * n;

// 複数パラメータ
double rectangle(double width, double height) => width * height;

// 同じ型の複数パラメータ
String repeat(String text, int times) {
  return text * times;
}

void main() {
  print('3の二乗: \${square(3)}');
  print('4の二乗: \${square(4)}');

  print('長方形の面積 (5x3): \${rectangle(5, 3)}');
  print('長方形の面積 (10x2.5): \${rectangle(10, 2.5)}');

  print(repeat('Dart ', 3));
  print(repeat('★', 5));
}`}
          expectedOutput={`3の二乗: 9.0
4の二乗: 16.0
長方形の面積 (5x3): 15.0
長方形の面積 (10x2.5): 25.0
Dart Dart Dart
★★★★★`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パラメータの型</h2>
        <p className="text-gray-400 mb-4">
          パラメータには様々な型を指定できます。リスト、マップ、関数なども渡せます。
        </p>
        <DartEditor
          defaultCode={`// Listパラメータ
int sum(List<int> numbers) {
  int total = 0;
  for (int n in numbers) total += n;
  return total;
}

// Mapパラメータ
void printInfo(Map<String, dynamic> info) {
  info.forEach((key, value) => print('  \$key: \$value'));
}

// 複数の型を混在
String formatItem(String name, int quantity, double price) {
  double total = quantity * price;
  return '\$name × \$quantity = ¥\${total.toStringAsFixed(0)}';
}

void main() {
  print('合計: \${sum([1, 2, 3, 4, 5])}');
  print('合計: \${sum([10, 20, 30])}');

  print('情報:');
  printInfo({'名前': 'Alice', '年齢': 30, '言語': 'Dart'});

  print(formatItem('りんご', 3, 150));
  print(formatItem('バナナ', 5, 80));
}`}
          expectedOutput={`合計: 15
合計: 60
情報:
  名前: Alice
  年齢: 30
  言語: Dart
りんご × 3 = ¥450
バナナ × 5 = ¥400`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">可変長引数とスプレッド演算子</h2>
        <p className="text-gray-400 mb-4">
          Dartには可変長引数はありませんが、Listを使って同様の動作を実現できます。スプレッド演算子（<code className="text-purple-300">...</code>）も活用できます。
        </p>
        <DartEditor
          defaultCode={`// Listで可変長引数の代替
double average(List<num> values) {
  if (values.isEmpty) return 0;
  return values.reduce((a, b) => a + b) / values.length;
}

// 名前付き型パラメータ
String joinStrings(List<String> parts, {String separator = ', '}) {
  return parts.join(separator);
}

void main() {
  print('平均: \${average([80, 90, 70, 85])}');
  print('平均: \${average([100, 60])}');

  List<String> fruits = ['りんご', 'バナナ', 'みかん'];
  print(joinStrings(fruits));
  print(joinStrings(fruits, separator: ' / '));
  print(joinStrings(fruits, separator: '・'));

  // スプレッド演算子でリストを結合
  List<int> a = [1, 2, 3];
  List<int> b = [4, 5, 6];
  List<int> combined = [...a, ...b];
  print('結合: \$combined');
}`}
          expectedOutput={`平均: 81.25
平均: 80.0
りんご, バナナ, みかん
りんご / バナナ / みかん
りんご・バナナ・みかん
結合: [1, 2, 3, 4, 5, 6]`}
        />
      </section>

      <LessonCompleteButton lessonId="parameters" categoryId="functions" />
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/functions" />
    </div>
  );
}
