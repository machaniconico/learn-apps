import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functional");

export default function MapWhereReducePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数型プログラミング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">map・where・reduce</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-purple-300">map</strong>（変換）・<strong className="text-purple-300">where</strong>（フィルタ）・<strong className="text-purple-300">reduce</strong>（集約）は
            関数型プログラミングの核心です。
            これらを組み合わせてデータ変換パイプラインを構築します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">map・where・reduce の基本</h2>
        <p className="text-gray-400 mb-4">
          各メソッドの動作と組み合わせ方を理解しましょう。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // map: 各要素を変換
  final doubled = numbers.map((n) => n * 2).toList();
  print('doubled: \$doubled');

  // where: 条件を満たす要素を抽出
  final evens = numbers.where((n) => n.isEven).toList();
  print('evens: \$evens');

  // reduce: 集約（初期値なし、リストが空だとエラー）
  final sum = numbers.reduce((acc, n) => acc + n);
  print('sum: \$sum');

  final product = numbers.reduce((acc, n) => acc * n);
  print('product: \$product');

  // チェーン: 偶数の二乗の合計
  final result = numbers
      .where((n) => n.isEven)
      .map((n) => n * n)
      .reduce((acc, n) => acc + n);
  print('偶数の二乗の合計: \$result');

  // 最大値・最小値
  print('最大: \${numbers.reduce((a, b) => a > b ? a : b)}');
  print('最小: \${numbers.reduce((a, b) => a < b ? a : b)}');
}`}
          expectedOutput={`doubled: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
evens: [2, 4, 6, 8, 10]
sum: 55
product: 3628800
偶数の二乗の合計: 220
最大: 10
最小: 1`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">実践的なデータ処理</h2>
        <p className="text-gray-400 mb-4">
          実際のデータ処理でmap/where/reduceをどう使うか見てみましょう。
        </p>
        <DartEditor
          defaultCode={`class Sale {
  final String product;
  final int quantity;
  final double price;

  Sale(this.product, this.quantity, this.price);

  double get total => quantity * price;
}

void main() {
  final sales = [
    Sale('Dart本', 3, 2800),
    Sale('Flutter本', 5, 3200),
    Sale('キーボード', 1, 15000),
    Sale('マウス', 2, 5000),
    Sale('モニター', 1, 40000),
  ];

  // 売上合計
  final totalRevenue = sales
      .map((s) => s.total)
      .reduce((a, b) => a + b);
  print('売上合計: ¥\${totalRevenue.toInt()}');

  // 1万円以上の商品名
  final expensive = sales
      .where((s) => s.price >= 10000)
      .map((s) => s.product)
      .toList();
  print('高額商品: \$expensive');

  // 平均単価
  final avgPrice = sales
      .map((s) => s.price)
      .reduce((a, b) => a + b) / sales.length;
  print('平均単価: ¥\${avgPrice.toInt()}');

  // 最高売上商品
  final topSale = sales.reduce((a, b) => a.total > b.total ? a : b);
  print('最高売上: \${topSale.product} (¥\${topSale.total.toInt()})');
}`}
          expectedOutput={`売上合計: ¥88400
高額商品: [キーボード, モニター]
平均単価: ¥13200
最高売上: モニター (¥40000)`}
        />
      </section>

      <LessonCompleteButton lessonId="map-where-reduce" categoryId="functional" />
      <LessonNav lessons={lessons} currentId="map-where-reduce" basePath="/learn/functional" />
    </div>
  );
}
