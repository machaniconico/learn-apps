import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">関数の基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの関数は<strong className="text-purple-300">戻り値型 関数名(引数) &#123; 処理 &#125;</strong>の形式で定義します。
            関数はコードの再利用性を高め、プログラムを分かりやすく構造化します。
            Dartでは関数も第一級オブジェクトです。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数の定義と呼び出し</h2>
        <p className="text-gray-400 mb-4">
          関数は<code className="text-purple-300">戻り値型 関数名(引数リスト)</code>で定義します。戻り値がない場合は<code className="text-purple-300">void</code>を使います。
        </p>
        <DartEditor
          defaultCode={`// 戻り値なし（void）
void greet(String name) {
  print('こんにちは、\${name}さん！');
}

// 戻り値あり
int add(int a, int b) {
  return a + b;
}

// 複数の値を計算する関数
double circleArea(double radius) {
  return 3.14159 * radius * radius;
}

void main() {
  greet('Alice');
  greet('Bob');

  int result = add(5, 3);
  print('5 + 3 = \$result');

  double area = circleArea(7.0);
  print('半径7の円の面積: \${area.toStringAsFixed(2)}');
}`}
          expectedOutput={`こんにちは、Aliceさん！
こんにちは、Bobさん！
5 + 3 = 8
半径7の円の面積: 153.94`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数のスコープと再帰</h2>
        <p className="text-gray-400 mb-4">
          関数内で定義した変数はその関数内でのみ有効です。関数が自分自身を呼び出す「再帰」も使えます。
        </p>
        <DartEditor
          defaultCode={`// 再帰関数: 階乗
int factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// 再帰関数: フィボナッチ
int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

void main() {
  // 階乗
  for (int i = 0; i <= 6; i++) {
    print('\$i! = \${factorial(i)}');
  }

  // フィボナッチ数列
  print('フィボナッチ:');
  for (int i = 0; i < 8; i++) {
    print('F(\$i) = \${fibonacci(i)}');
  }
}`}
          expectedOutput={`0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
フィボナッチ:
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ローカル関数</h2>
        <p className="text-gray-400 mb-4">
          関数の中に関数を定義することもできます（ローカル関数）。スコープを限定した補助関数に便利です。
        </p>
        <DartEditor
          defaultCode={`void processNumbers(List<int> numbers) {
  // ローカル関数
  bool isValid(int n) => n >= 0 && n <= 100;
  String format(int n) => '[\$n]';

  List<String> results = [];
  for (int n in numbers) {
    if (isValid(n)) {
      results.add(format(n));
    } else {
      results.add('(無効: \$n)');
    }
  }
  print(results.join(', '));
}

void main() {
  processNumbers([42, -5, 78, 150, 30, 99]);
}`}
          expectedOutput={`[42], (無効: -5), [78], (無効: 150), [30], [99]`}
        />
      </section>

      <LessonCompleteButton lessonId="basics" categoryId="functions" />
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/functions" />
    </div>
  );
}
