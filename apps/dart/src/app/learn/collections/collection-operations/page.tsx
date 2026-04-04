import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function CollectionOperationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">コレクション</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">コレクション操作</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartのコレクションリテラル内では<strong className="text-cyan-300">if</strong>・<strong className="text-cyan-300">for</strong>を使って条件付き要素追加や反復要素の追加ができます。
            これによりリストの構築が宣言的かつ簡潔に書けます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コレクション内の if</h2>
        <p className="text-gray-400 mb-4">
          リテラル内で<code className="text-cyan-300">if</code>を使い、条件によって要素を含めるか決められます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  bool isAdmin = true;
  bool isPremium = false;
  String? promoCode = 'SALE20';

  // コレクション内の if
  final menu = [
    'ホーム',
    'プロフィール',
    if (isAdmin) '管理パネル',
    if (isPremium) 'プレミアムコンテンツ',
    '設定',
    'ログアウト',
  ];
  print('メニュー: \$menu');

  // if-else
  final label = [
    if (isAdmin) '管理者' else '一般ユーザー',
  ];
  print('ラベル: \$label');

  // null チェック
  final items = [
    'デフォルト商品',
    if (promoCode != null) '割引: \$promoCode',
    '送料無料',
  ];
  print('カート: \$items');

  // Map の if
  final config = {
    'host': 'localhost',
    'port': 3000,
    if (isAdmin) 'adminKey': 'secret',
    if (isPremium) 'premiumFeatures': true,
  };
  print('設定: \$config');
}`}
          expectedOutput={`メニュー: [ホーム, プロフィール, 管理パネル, 設定, ログアウト]
ラベル: [管理者]
カート: [デフォルト商品, 割引: SALE20, 送料無料]
設定: {host: localhost, port: 3000, adminKey: secret}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コレクション内の for</h2>
        <p className="text-gray-400 mb-4">
          リテラル内で<code className="text-cyan-300">for</code>を使い、繰り返しで要素を追加できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final categories = ['果物', '野菜', '肉'];
  final numbers = [1, 2, 3, 4, 5];

  // コレクション内の for
  final labels = [
    for (final cat in categories) 'カテゴリ: \$cat',
  ];
  print('ラベル: \$labels');

  // for と計算
  final squares = [
    for (int i = 1; i <= 5; i++) i * i,
  ];
  print('二乗: \$squares');

  // ネストした for
  final pairs = [
    for (int i = 1; i <= 3; i++)
      for (int j = 1; j <= 3; j++)
        '\$i x \$j = \${i * j}',
  ];
  for (final p in pairs.take(6)) {
    print(p);
  }

  // for と if の組み合わせ
  final evenSquares = [
    for (int i = 1; i <= 10; i++)
      if (i % 2 == 0) i * i,
  ];
  print('偶数の二乗: \$evenSquares');
}`}
          expectedOutput={`ラベル: [カテゴリ: 果物, カテゴリ: 野菜, カテゴリ: 肉]
二乗: [1, 4, 9, 16, 25]
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
偶数の二乗: [4, 16, 36, 64, 100]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">組み合わせパターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">if</code>・<code className="text-cyan-300">for</code>・スプレッドを組み合わせた実用的なコレクション構築です。
        </p>
        <DartEditor
          defaultCode={`class Product {
  String name;
  double price;
  bool inStock;
  String category;

  Product(this.name, this.price, this.inStock, this.category);
}

void main() {
  final products = [
    Product('りんご', 150, true, '果物'),
    Product('バナナ', 100, true, '果物'),
    Product('にんじん', 80, false, '野菜'),
    Product('じゃがいも', 120, true, '野菜'),
    Product('メロン', 2000, true, '果物'),
  ];

  bool showOutOfStock = false;
  double maxPrice = 200.0;

  final filtered = [
    for (final p in products)
      if (p.price <= maxPrice)
        if (showOutOfStock || p.inStock)
          '\${p.name}(¥\${p.price.toInt()})',
  ];
  print('フィルタ結果: \$filtered');

  // カテゴリ別のMap
  final byCategory = {
    for (final cat in ['果物', '野菜'])
      cat: [
        for (final p in products)
          if (p.category == cat && p.inStock) p.name,
      ],
  };
  byCategory.forEach((cat, items) => print('\$cat: \$items'));
}`}
          expectedOutput={`フィルタ結果: [りんご(¥150), バナナ(¥100), じゃがいも(¥120)]
果物: [りんご, バナナ, メロン]
野菜: [じゃがいも]`}
        />
      </section>

      <LessonCompleteButton lessonId="collection-operations" categoryId="collections" />
      <LessonNav lessons={lessons} currentId="collection-operations" basePath="/learn/collections" />
    </div>
  );
}
