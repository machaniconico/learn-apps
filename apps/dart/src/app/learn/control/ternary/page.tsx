import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function TernaryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">三項演算子</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">三項演算子</strong>（<code>条件 ? 真の値 : 偽の値</code>）は簡単な条件分岐を1行で書けます。
            また、<strong className="text-green-300">??</strong>（Null合体演算子）はnullの場合のデフォルト値を簡潔に書けます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">条件 ? 真の場合 : 偽の場合</code>の構文で、if-elseを式として書けます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 基本的な三項演算子
  int age = 20;
  String status = age >= 18 ? '成人' : '未成年';
  print('ステータス: \$status');

  // 文字列補間内でも使える
  int score = 75;
  print('結果: \${score >= 60 ? "合格" : "不合格"}');

  // 複数の三項演算子（可読性に注意）
  int n = 0;
  String sign = n > 0 ? '正' : n < 0 ? '負' : 'ゼロ';
  print('\$n は \$sign');

  // 関数の戻り値として
  bool isEven(int x) => x % 2 == 0 ? true : false;
  // より簡潔に書くなら: bool isEven(int x) => x % 2 == 0;
  print('4は偶数: \${isEven(4)}');
  print('7は偶数: \${isEven(7)}');
}`}
          expectedOutput={`ステータス: 成人
結果: 合格
0 は ゼロ
4は偶数: true
7は偶数: false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Null合体演算子（??）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">??</code>は左辺がnullのとき右辺を返します。<code className="text-green-300">??=</code>はnullのときだけ代入します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // ?? null合体演算子
  String? name = null;
  print(name ?? 'ゲスト');    // null なので '名前なし'

  name = 'Alice';
  print(name ?? 'ゲスト');    // 'Alice'

  // ??= null のときだけ代入
  String? title;
  title ??= 'デフォルトタイトル';
  print(title);  // 'デフォルトタイトル'

  title ??= '変わらない';
  print(title);  // まだ 'デフォルトタイトル'

  // チェーン
  String? a = null;
  String? b = null;
  String c = 'C値';
  print(a ?? b ?? c);  // c が返る

  // 実用例: 設定値のデフォルト
  Map<String, String?> config = {
    'host': null,
    'port': '8080',
    'debug': null,
  };
  print('host: \${config['host'] ?? 'localhost'}');
  print('port: \${config['port'] ?? '3000'}');
  print('debug: \${config['debug'] ?? 'false'}');
}`}
          expectedOutput={`ゲスト
Alice
デフォルトタイトル
デフォルトタイトル
C値
host: localhost
port: 8080
debug: false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子 vs if-else の使い分け</h2>
        <p className="text-gray-400 mb-4">
          単純な値の選択には三項演算子、複数の処理を実行する場合はif-elseが適しています。
        </p>
        <DartEditor
          defaultCode={`String formatPrice(double price, {bool showTax = false}) {
  double finalPrice = showTax ? price * 1.1 : price;
  String prefix = price >= 10000 ? '高額: ' : '';
  return '\$prefix¥\${finalPrice.toStringAsFixed(0)}';
}

void main() {
  List<double> prices = [500, 1500, 9800, 15000];

  for (double price in prices) {
    String withoutTax = formatPrice(price);
    String withTax = formatPrice(price, showTax: true);
    print('\${withoutTax.padRight(15)} → 税込: \$withTax');
  }

  // 条件に応じたリスト生成
  List<int> numbers = List.generate(10, (i) => i + 1);
  List<String> classified = numbers.map((n) =>
    n % 3 == 0 && n % 5 == 0 ? 'FizzBuzz' :
    n % 3 == 0 ? 'Fizz' :
    n % 5 == 0 ? 'Buzz' : '\$n'
  ).toList();
  print(classified.join(', '));
}`}
          expectedOutput={`¥500             → 税込: ¥550
¥1500            → 税込: ¥1650
¥9800            → 税込: ¥10780
高額: ¥15000      → 税込: 高額: ¥16500
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz`}
        />
      </section>

      <LessonCompleteButton lessonId="ternary" categoryId="control" />
      <LessonNav lessons={lessons} currentId="ternary" basePath="/learn/control" />
    </div>
  );
}
