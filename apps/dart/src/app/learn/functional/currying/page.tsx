import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functional");

export default function CurryingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数型プログラミング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">カリー化</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-purple-300">カリー化（Currying）</strong>は複数引数の関数を、1引数の関数のチェーンに変換する手法です。
            <strong className="text-purple-300">部分適用（Partial Application）</strong>は一部の引数を固定した新しい関数を作ります。
            再利用可能な特化した関数を作るのに役立ちます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">部分適用の基本</h2>
        <p className="text-gray-400 mb-4">
          一部の引数を固定した新しい関数を作ることで、特化した関数を再利用できます。
        </p>
        <DartEditor
          defaultCode={`// 部分適用のヘルパー
Function(B) partial<A, B, C>(C Function(A, B) fn, A a) {
  return (B b) => fn(a, b);
}

int multiply(int a, int b) => a * b;
String format(String prefix, String value) => '\$prefix: \$value';
bool isGreaterThan(int threshold, int value) => value > threshold;

void main() {
  // 部分適用で特化した関数を作成
  final double_ = partial(multiply, 2);
  final triple = partial(multiply, 3);

  print('2倍: \${[1, 2, 3, 4, 5].map(double_).toList()}');
  print('3倍: \${[1, 2, 3, 4, 5].map(triple).toList()}');

  // フォーマッター
  final nameFormat = partial(format, '名前');
  final cityFormat = partial(format, '都市');

  print(nameFormat('田中太郎'));
  print(cityFormat('東京'));

  // フィルタ
  final isAdult = partial(isGreaterThan, 17);
  final isHigh = partial(isGreaterThan, 90);

  final ages = [15, 20, 17, 25, 12, 30];
  print('成人: \${ages.where(isAdult).toList()}');

  final scores = [85, 92, 78, 96, 88];
  print('高得点: \${scores.where(isHigh).toList()}');
}`}
          expectedOutput={`2倍: [2, 4, 6, 8, 10]
3倍: [3, 6, 9, 12, 15]
名前: 田中太郎
都市: 東京
成人: [20, 25, 30]
高得点: [92, 96]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カリー化の実践</h2>
        <p className="text-gray-400 mb-4">
          カリー化によって設定を段階的に適用する柔軟な関数を作れます。
        </p>
        <DartEditor
          defaultCode={`// カリー化された関数
Function(String) Function(String) makeReplacer(String from) {
  return (String to) => (String s) => s.replaceAll(from, to);
}

// 設定可能なフォーマッター
String Function(dynamic) Function(int) makeNumberFormatter(String prefix) {
  return (int decimals) =>
      (dynamic value) => '\$prefix\${(value as double).toStringAsFixed(decimals)}';
}

void main() {
  // テキスト置換
  final replaceSpaces = makeReplacer(' ')('-');
  final replaceHyphen = makeReplacer('-')('_');

  final texts = ['Hello World', 'Dart Language', 'Null Safety'];
  print('スペース→ハイフン:');
  texts.map(replaceSpaces).forEach(print);

  print('');

  // 数値フォーマット
  final formatYen = makeNumberFormatter('¥')(0);
  final formatPercent = makeNumberFormatter('')(1);

  final prices = [1234.5, 9876.0, 500.25];
  final rates = [0.85, 0.123, 0.997];

  print('価格:');
  prices.map((p) => formatYen(p)).forEach(print);

  print('率:');
  rates.map((r) => '\${formatPercent(r * 100)}%').forEach(print);
}`}
          expectedOutput={`スペース→ハイフン:
Hello-World
Dart-Language
Null-Safety

価格:
¥1235
¥9876
¥500

率:
85.0%
12.3%
99.7%`}
        />
      </section>

      <LessonCompleteButton lessonId="currying" categoryId="functional" />
      <LessonNav lessons={lessons} currentId="currying" basePath="/learn/functional" />
    </div>
  );
}
