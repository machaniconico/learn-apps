import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function InterpolationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wide">文字列操作</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">文字列補間</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの<strong className="text-yellow-300">文字列補間</strong>は<code className="text-yellow-300">$変数</code>や<code className="text-yellow-300">{"${式}"}</code>で文字列内に値を埋め込む機能です。
            文字列連結より読みやすく、任意のDart式を埋め込めます。
            <code className="text-yellow-300">toString()</code>が自動的に呼ばれます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な文字列補間</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">$変数名</code>で変数を、<code className="text-yellow-300">{"${式}"}</code>で任意の式を埋め込めます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final name = '太郎';
  final age = 25;
  final height = 175.5;
  final isStudent = true;

  // 変数の埋め込み
  print('名前: \$name');
  print('年齢: \$age歳');

  // 式の埋め込み（\${...}）
  print('来年は\${age + 1}歳');
  print('身長: \${height.toStringAsFixed(1)}cm');
  print('学生: \${isStudent ? "はい" : "いいえ"}');

  // メソッド呼び出し
  print('\${name.toUpperCase()} さん、こんにちは！');
  print('名前の長さ: \${name.length}文字');

  // 計算式
  final price = 1000;
  final tax = 0.1;
  final total = price * (1 + tax);
  print('価格: \$price円');
  print('税込: \${total.toInt()}円');

  // コレクションの埋め込み
  final items = ['りんご', 'バナナ', 'みかん'];
  print('果物: \$items');
  print('個数: \${items.length}個');
  print('最初: \${items.first}');
}`}
          expectedOutput={`名前: 太郎
年齢: 25歳
来年は26歳
身長: 175.5cm
学生: はい
太郎 さん、こんにちは！
名前の長さ: 2文字
価格: 1000円
税込: 1100円
果物: [りんご, バナナ, みかん]
個数: 3個
最初: りんご`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">オブジェクトの埋め込み</h2>
        <p className="text-gray-400 mb-4">
          オブジェクトを埋め込むと<code className="text-yellow-300">toString()</code>が自動的に呼ばれます。
        </p>
        <DartEditor
          defaultCode={`class Point {
  double x, y;
  Point(this.x, this.y);

  @override
  String toString() => '(\$x, \$y)';

  double get distance =>
      (x * x + y * y);
}

class Product {
  String name;
  double price;
  int stock;

  Product(this.name, this.price, this.stock);

  @override
  String toString() => '\$name (¥\${price.toInt()})';

  String get status => stock > 0 ? '在庫あり(\${stock}個)' : '在庫切れ';
}

void main() {
  final p = Point(3.0, 4.0);
  print('座標: \$p');
  print('距離の二乗: \${p.distance}');

  final products = [
    Product('りんご', 150, 50),
    Product('バナナ', 100, 0),
    Product('みかん', 80, 30),
  ];

  for (final prod in products) {
    print('\$prod - \${prod.status}');
  }

  // 複雑な埋め込み
  final total = products
      .where((p) => p.stock > 0)
      .fold(0.0, (sum, p) => sum + p.price);
  print('在庫ありの合計: ¥\${total.toInt()}');
}`}
          expectedOutput={`座標: (3.0, 4.0)
距離の二乗: 25.0
りんご (¥150) - 在庫あり(50個)
バナナ (¥100) - 在庫切れ
みかん (¥80) - 在庫あり(30個)
在庫ありの合計: ¥230`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">フォーマット出力</h2>
        <p className="text-gray-400 mb-4">
          数値フォーマットメソッドと組み合わせて、見やすい出力を作れます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 数値フォーマット
  final pi = 3.14159265;
  print('円周率: \${pi.toStringAsFixed(2)}');
  print('科学記数法: \${pi.toStringAsExponential(3)}');
  print('有効桁数: \${pi.toStringAsPrecision(4)}');

  // 左詰め・右詰め
  final items = [
    ('りんご', 150, 30),
    ('バナナ', 100, 50),
    ('メロン', 2000, 5),
  ];

  print('商品名            価格    在庫');
  print('-' * 36);
  for (final (name, price, stock) in items) {
    final namePad = name.padRight(10);
    final pricePad = '¥\$price'.padLeft(8);
    final stockPad = '\${stock}個'.padLeft(6);
    print('\$namePad\$pricePad\$stockPad');
  }

  // 進数表示
  final n = 255;
  print('10進数: \$n');
  print('16進数: \${n.toRadixString(16)}');
  print('2進数: \${n.toRadixString(2)}');
}`}
          expectedOutput={`円周率: 3.14
科学記数法: 3.142e+0
有効桁数: 3.142
商品名            価格    在庫
------------------------------------
りんご              ¥150    30個
バナナ              ¥100    50個
メロン             ¥2000     5個
10進数: 255
16進数: ff
2進数: 11111111`}
        />
      </section>

      <LessonCompleteButton lessonId="interpolation" categoryId="strings" />
      <LessonNav lessons={lessons} currentId="interpolation" basePath="/learn/strings" />
    </div>
  );
}
