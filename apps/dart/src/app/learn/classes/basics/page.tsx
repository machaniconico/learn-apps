import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">クラス基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">クラスの基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-orange-300">class</strong>キーワードでクラスを定義します。
            クラスはフィールド（データ）とメソッド（処理）をまとめたテンプレートです。
            Dart 2以降は<code>new</code>キーワードなしでインスタンスを生成できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クラスの定義とインスタンス生成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">class クラス名 &#123; フィールド・メソッド &#125;</code>でクラスを定義し、<code className="text-orange-300">クラス名()</code>でインスタンスを作ります。
        </p>
        <DartEditor
          defaultCode={`class Dog {
  // フィールド（インスタンス変数）
  String name;
  String breed;
  int age;

  // コンストラクタ
  Dog(this.name, this.breed, this.age);

  // メソッド
  void bark() {
    print('\$name: ワン！');
  }

  void describe() {
    print('\$name (\$breed、\$age歳)');
  }

  @override
  String toString() => 'Dog(\$name, \$breed, \$age)';
}

void main() {
  // インスタンス生成（newは不要）
  Dog pochi = Dog('ポチ', '柴犬', 3);
  Dog hana = Dog('ハナ', 'トイプードル', 5);

  pochi.describe();
  hana.describe();
  pochi.bark();

  // フィールドへのアクセス
  print('名前: \${pochi.name}');
  pochi.age = 4; // フィールドを更新
  print('誕生日後: \$pochi');
}`}
          expectedOutput={`ポチ (柴犬、3歳)
ハナ (トイプードル、5歳)
ポチ: ワン！
名前: ポチ
誕生日後: Dog(ポチ, 柴犬, 4)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">メソッドとthis</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">this</code>はクラスの現在のインスタンスを参照します。通常は省略できますが、名前の衝突がある場合に必要です。
        </p>
        <DartEditor
          defaultCode={`class BankAccount {
  String owner;
  double balance;

  BankAccount(this.owner, this.balance);

  void deposit(double amount) {
    if (amount <= 0) {
      print('無効な金額です');
      return;
    }
    balance += amount;
    print('\$ownerの口座に ¥\${amount.toStringAsFixed(0)} 入金。残高: ¥\${balance.toStringAsFixed(0)}');
  }

  bool withdraw(double amount) {
    if (amount > balance) {
      print('残高不足です（残高: ¥\${balance.toStringAsFixed(0)}）');
      return false;
    }
    balance -= amount;
    print('\$ownerの口座から ¥\${amount.toStringAsFixed(0)} 出金。残高: ¥\${balance.toStringAsFixed(0)}');
    return true;
  }
}

void main() {
  var account = BankAccount('Alice', 10000);
  account.deposit(5000);
  account.withdraw(3000);
  account.withdraw(20000);
}`}
          expectedOutput={`Aliceの口座に ¥5000 入金。残高: ¥15000
Aliceの口座から ¥3000 出金。残高: ¥12000
残高不足です（残高: ¥12000）`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クラスとオブジェクトの比較</h2>
        <p className="text-gray-400 mb-4">
          Dartでは<code className="text-orange-300">==</code>演算子はデフォルトで参照比較です。値の比較には<code className="text-orange-300">==</code>をオーバーライドします。
        </p>
        <DartEditor
          defaultCode={`class Point {
  final double x;
  final double y;

  const Point(this.x, this.y);

  double get distanceFromOrigin =>
      (x * x + y * y);

  Point translate(double dx, double dy) =>
      Point(x + dx, y + dy);

  @override
  bool operator ==(Object other) =>
      other is Point && x == other.x && y == other.y;

  @override
  int get hashCode => Object.hash(x, y);

  @override
  String toString() => 'Point(\$x, \$y)';
}

void main() {
  var p1 = Point(3, 4);
  var p2 = Point(3, 4);
  var p3 = Point(1, 2);

  print(p1);
  print('距離の二乗: \${p1.distanceFromOrigin}');
  print('p1 == p2: \${p1 == p2}');  // true（値が同じ）
  print('p1 == p3: \${p1 == p3}');  // false

  var p4 = p1.translate(2, -1);
  print('移動後: \$p4');
}`}
          expectedOutput={`Point(3.0, 4.0)
距離の二乗: 25.0
p1 == p2: true
p1 == p3: false
移動後: Point(5.0, 3.0)`}
        />
      </section>

      <LessonCompleteButton lessonId="basics" categoryId="classes" />
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/classes" />
    </div>
  );
}
