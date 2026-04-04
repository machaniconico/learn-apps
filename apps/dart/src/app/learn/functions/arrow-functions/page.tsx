import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function ArrowFunctionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">アロー関数</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-purple-300">=&gt;</strong>構文（アロー関数）は、単一式の関数を簡潔に書けます。
            <code>&#123; return expr; &#125;</code>を<code>=&gt; expr</code>と省略できます。
            コレクション操作のコールバックによく使われます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">アロー関数の基本</h2>
        <p className="text-gray-400 mb-4">
          関数本体が単一の式である場合、<code className="text-purple-300">=&gt;</code>を使って簡潔に書けます。
        </p>
        <DartEditor
          defaultCode={`// 通常の関数
int addNormal(int a, int b) {
  return a + b;
}

// アロー関数（同等）
int addArrow(int a, int b) => a + b;

// 様々なアロー関数
bool isEven(int n) => n % 2 == 0;
String shout(String s) => s.toUpperCase() + '!';
double hypotenuse(double a, double b) => (a * a + b * b);

// voidも使える
void greet(String name) => print('Hello, \$name!');

void main() {
  print(addNormal(3, 4));
  print(addArrow(3, 4));

  print(isEven(6));
  print(isEven(7));
  print(shout('hello'));
  print(hypotenuse(3, 4));

  greet('Dart');
  greet('Flutter');
}`}
          expectedOutput={`7
7
true
false
HELLO!
25.0
Hello, Dart!
Hello, Flutter!`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コレクション操作でのアロー関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">map</code>、<code className="text-purple-300">where</code>、<code className="text-purple-300">reduce</code>などのコレクション操作でアロー関数が活躍します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // map: 各要素を変換
  List<int> doubled = numbers.map((n) => n * 2).toList();
  print('2倍: \$doubled');

  // where: 条件でフィルタリング
  List<int> evens = numbers.where((n) => n % 2 == 0).toList();
  print('偶数: \$evens');

  // reduce: 集約
  int sum = numbers.reduce((acc, n) => acc + n);
  print('合計: \$sum');

  // 組み合わせ
  int sumOfSquaredEvens = numbers
      .where((n) => n % 2 == 0)
      .map((n) => n * n)
      .reduce((acc, n) => acc + n);
  print('偶数の二乗和: \$sumOfSquaredEvens');

  // sort
  List<String> words = ['banana', 'apple', 'cherry', 'date'];
  words.sort((a, b) => a.compareTo(b));
  print('ソート: \$words');
}`}
          expectedOutput={`2倍: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
偶数: [2, 4, 6, 8, 10]
合計: 55
偶数の二乗和: 220
ソート: [apple, banana, cherry, date]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">無名関数とアロー関数</h2>
        <p className="text-gray-400 mb-4">
          名前のない関数（ラムダ式）も定義できます。変数に代入して使います。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 変数に代入する無名関数
  var multiply = (int a, int b) => a * b;
  var greet = (String name) => 'Hello, \$name!';

  print(multiply(3, 7));
  print(greet('World'));

  // 関数型の変数
  int Function(int, int) operation;

  operation = (a, b) => a + b;
  print('加算: \${operation(10, 5)}');

  operation = (a, b) => a * b;
  print('乗算: \${operation(10, 5)}');

  // リストに関数を格納
  List<int Function(int)> transforms = [
    (n) => n * 2,
    (n) => n + 10,
    (n) => n * n,
  ];

  int value = 5;
  for (var transform in transforms) {
    print('変換: \${transform(value)}');
  }
}`}
          expectedOutput={`21
Hello, World!
加算: 15
乗算: 50
変換: 10
変換: 15
変換: 25`}
        />
      </section>

      <LessonCompleteButton lessonId="arrow-functions" categoryId="functions" />
      <LessonNav lessons={lessons} currentId="arrow-functions" basePath="/learn/functions" />
    </div>
  );
}
