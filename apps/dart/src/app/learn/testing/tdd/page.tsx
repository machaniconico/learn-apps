import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("testing");

export default function TddPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">テスト</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">TDD（テスト駆動開発）</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">TDD（Test-Driven Development）</strong>はテストを先に書いてから実装するアプローチです。
            <strong className="text-green-300">Red → Green → Refactor</strong>のサイクルを繰り返します。
            先にテストを書くことで、設計が明確になりバグを早期に発見できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Red → Green → Refactor サイクル</h2>
        <p className="text-gray-400 mb-4">
          TDDの基本サイクル: 失敗するテストを書き(Red)、最小限の実装をし(Green)、リファクタリングする(Refactor)。
        </p>
        <DartEditor
          defaultCode={`// TDDサイクルの例: 電卓クラスを開発する

// Step 1 (Red): まずテストを書く
// - add(2, 3) == 5
// - subtract(10, 4) == 6
// - multiply(3, 4) == 12
// - divide(10, 2) == 5
// - divide(1, 0) → 例外

// Step 2 (Green): テストが通る最小限の実装
class Calculator {
  double add(double a, double b) => a + b;
  double subtract(double a, double b) => a - b;
  double multiply(double a, double b) => a * b;
  double divide(double a, double b) {
    if (b == 0) throw ArgumentError('ゼロ除算は禁止');
    return a / b;
  }
}

// Step 3 (Refactor): 必要に応じてリファクタリング
// （この例では既にシンプルなので不要）

// テストの実行
void runTest(String name, void Function() body) {
  try {
    body();
    print('✓ \$name');
  } catch (e) {
    print('✗ \$name: \$e');
  }
}

void main() {
  final calc = Calculator();
  print('=== 電卓のTDDテスト ===\\n');

  // Red→Green: 足し算
  runTest('add(2, 3) = 5', () {
    if (calc.add(2, 3) != 5) throw AssertionError('失敗');
  });

  // Red→Green: 引き算
  runTest('subtract(10, 4) = 6', () {
    if (calc.subtract(10, 4) != 6) throw AssertionError('失敗');
  });

  // Red→Green: 掛け算
  runTest('multiply(3, 4) = 12', () {
    if (calc.multiply(3, 4) != 12) throw AssertionError('失敗');
  });

  // Red→Green: 割り算
  runTest('divide(10, 2) = 5', () {
    if (calc.divide(10, 2) != 5) throw AssertionError('失敗');
  });

  // Red→Green: ゼロ除算
  runTest('divide(1, 0) throws ArgumentError', () {
    try {
      calc.divide(1, 0);
      throw AssertionError('例外が発生すべき');
    } on ArgumentError {
      // OK
    }
  });

  print('\\n全テスト通過 → 実装完了！');
}`}
          expectedOutput={`=== 電卓のTDDテスト ===

✓ add(2, 3) = 5
✓ subtract(10, 4) = 6
✓ multiply(3, 4) = 12
✓ divide(10, 2) = 5
✓ divide(1, 0) throws ArgumentError

全テスト通過 → 実装完了！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">TDDで設計を改善する</h2>
        <p className="text-gray-400 mb-4">
          テストを先に書くことで、使いやすいインターフェースを先に設計できます。
        </p>
        <DartEditor
          defaultCode={`// TDDで設計したショッピングカート

// テストから設計を決める
// - カートにアイテムを追加できる
// - 合計金額を計算できる
// - 数量を指定できる
// - 空のカートは合計0円

class CartItem {
  final String name;
  final int price;
  final int quantity;

  CartItem(this.name, this.price, this.quantity);
}

class ShoppingCart {
  final List<CartItem> _items = [];

  void add(String name, int price, {int quantity = 1}) {
    _items.add(CartItem(name, price, quantity));
  }

  int get total => _items.fold(0, (sum, item) => sum + item.price * item.quantity);

  int get itemCount => _items.fold(0, (sum, item) => sum + item.quantity);

  bool get isEmpty => _items.isEmpty;
}

void runTest(String name, void Function() body) {
  try {
    body();
    print('✓ \$name');
  } catch (e) {
    print('✗ \$name: \$e');
  }
}

void main() {
  print('=== ショッピングカートのTDD ===\\n');

  // テスト1: 空のカート
  runTest('空のカートは合計0円', () {
    final cart = ShoppingCart();
    if (cart.total != 0) throw AssertionError('合計が0でない: \${cart.total}');
    if (!cart.isEmpty) throw AssertionError('空でない');
  });

  // テスト2: アイテム追加
  runTest('アイテム追加で合計が増える', () {
    final cart = ShoppingCart();
    cart.add('りんご', 150);
    if (cart.total != 150) throw AssertionError('合計が150でない: \${cart.total}');
  });

  // テスト3: 複数アイテム
  runTest('複数アイテムの合計', () {
    final cart = ShoppingCart();
    cart.add('りんご', 150);
    cart.add('バナナ', 100);
    cart.add('みかん', 80);
    if (cart.total != 330) throw AssertionError('合計が330でない: \${cart.total}');
  });

  // テスト4: 数量指定
  runTest('数量指定の合計', () {
    final cart = ShoppingCart();
    cart.add('りんご', 150, quantity: 3);
    if (cart.total != 450) throw AssertionError('合計が450でない: \${cart.total}');
    if (cart.itemCount != 3) throw AssertionError('個数が3でない: \${cart.itemCount}');
  });

  // テスト5: 混合
  runTest('混合カートの合計', () {
    final cart = ShoppingCart();
    cart.add('りんご', 150, quantity: 2);
    cart.add('バナナ', 100);
    // 150*2 + 100 = 400
    if (cart.total != 400) throw AssertionError('合計が400でない: \${cart.total}');
  });

  print('\\n全テスト通過！設計が完成しました');
}`}
          expectedOutput={`=== ショッピングカートのTDD ===

✓ 空のカートは合計0円
✓ アイテム追加で合計が増える
✓ 複数アイテムの合計
✓ 数量指定の合計
✓ 混合カートの合計

全テスト通過！設計が完成しました`}
        />
      </section>

      <LessonCompleteButton lessonId="tdd" categoryId="testing" />
      <LessonNav lessons={lessons} currentId="tdd" basePath="/learn/testing" />
    </div>
  );
}
