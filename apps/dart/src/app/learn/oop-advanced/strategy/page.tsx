import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function StrategyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ストラテジーパターン</h1>
        <p className="text-gray-400">アルゴリズムを切り替えるストラテジーパターンをDartで実装します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ストラテジーパターンとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          ストラテジーパターンはアルゴリズムをカプセル化して切り替え可能にするパターンです。
          条件分岐を減らしてコードを柔軟にし、新しいアルゴリズムを追加しやすくします。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• アルゴリズムを<code className="text-pink-300">インターフェース/抽象クラス</code>で定義</li>
          <li>• 各アルゴリズムを別々のクラスとして実装</li>
          <li>• コンテキストクラスが実行時にストラテジーを切り替える</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">割引ストラテジーの実装</h2>
        <p className="text-gray-400 mb-4">
          ショッピングカートの割引計算をストラテジーパターンで実装します。
        </p>
        <DartEditor
          defaultCode={`typedef DiscountStrategy = double Function(double price);

double noDiscount(double price) => price;
double memberDiscount(double price) => price * 0.9;
double vipDiscount(double price) => price * 0.7;
double flashSale(double price) => price * 0.5;

class ShoppingCart {
  final List<double> _items = [];
  DiscountStrategy _strategy;

  ShoppingCart(this._strategy);

  void addItem(double price) => _items.add(price);

  void setStrategy(DiscountStrategy s) => _strategy = s;

  double get total {
    final subtotal = _items.fold(0.0, (a, b) => a + b);
    return _strategy(subtotal);
  }
}

void main() {
  final cart = ShoppingCart(noDiscount);
  cart.addItem(1000);
  cart.addItem(2000);
  cart.addItem(500);

  print('通常価格: \${cart.total}円');

  cart.setStrategy(memberDiscount);
  print('会員割引(10%OFF): \${cart.total}円');

  cart.setStrategy(vipDiscount);
  print('VIP割引(30%OFF): \${cart.total}円');

  cart.setStrategy(flashSale);
  print('タイムセール(50%OFF): \${cart.total}円');
}`}
          expectedOutput={`通常価格: 3500.0円\n会員割引(10%OFF): 3150.0円\nVIP割引(30%OFF): 2450.0円\nタイムセール(50%OFF): 1750.0円`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">バリデーションストラテジー</h2>
        <p className="text-gray-400 mb-4">
          入力バリデーションをストラテジーパターンで柔軟に切り替えます。
        </p>
        <DartEditor
          defaultCode={`abstract class ValidationStrategy {
  String? validate(String value);
}

class RequiredValidator implements ValidationStrategy {
  @override
  String? validate(String value) =>
      value.trim().isEmpty ? '必須項目です' : null;
}

class EmailValidator implements ValidationStrategy {
  @override
  String? validate(String value) {
    final regex = RegExp(r'^[\\w.]+@[\\w]+\\.[a-z]{2,}\$');
    return regex.hasMatch(value) ? null : '有効なメールアドレスを入力してください';
  }
}

class MinLengthValidator implements ValidationStrategy {
  final int min;
  MinLengthValidator(this.min);

  @override
  String? validate(String value) =>
      value.length >= min ? null : '\$min文字以上入力してください';
}

void validateField(String label, String value, List<ValidationStrategy> validators) {
  for (final v in validators) {
    final error = v.validate(value);
    if (error != null) {
      print('\$label: ❌ \$error');
      return;
    }
  }
  print('\$label: ✅ OK');
}

void main() {
  validateField('メール', 'user@example.com', [RequiredValidator(), EmailValidator()]);
  validateField('メール', 'invalid', [RequiredValidator(), EmailValidator()]);
  validateField('パスワード', 'abc', [RequiredValidator(), MinLengthValidator(8)]);
  validateField('パスワード', 'securePass1', [RequiredValidator(), MinLengthValidator(8)]);
}`}
          expectedOutput={`メール: ✅ OK\nメール: ❌ 有効なメールアドレスを入力してください\nパスワード: ❌ 8文字以上入力してください\nパスワード: ✅ OK`}
        />
      </section>
      <LessonCompleteButton lessonId="strategy" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="strategy" basePath="/learn/oop-advanced" />
    </div>
  );
}
