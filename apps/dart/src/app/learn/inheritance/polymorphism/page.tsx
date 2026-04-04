import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function PolymorphismPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">継承・Mixin</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ポリモーフィズム</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">ポリモーフィズム（多態性）</strong>は、同じインターフェースを通じて異なる型のオブジェクトを統一的に扱える性質です。
            継承とオーバーライドにより、同じメソッド呼び出しが実行時の型に応じた動作をします。
            これにより、新しい型を追加しても既存のコードを変更しなくて済む柔軟な設計が可能になります。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ポリモーフィズムの基本</h2>
        <p className="text-gray-400 mb-4">
          親クラス型の変数で子クラスのインスタンスを保持し、実行時の型に応じたメソッドが呼ばれます。
        </p>
        <DartEditor
          defaultCode={`abstract class Payment {
  String get name;
  bool process(double amount);
  void receipt(double amount) {
    if (process(amount)) {
      print('\${name}で \$amount 円の支払い完了');
    } else {
      print('\${name}での支払い失敗');
    }
  }
}

class CreditCard extends Payment {
  String cardNumber;
  double limit;

  CreditCard(this.cardNumber, this.limit);

  @override
  String get name => 'クレジットカード';

  @override
  bool process(double amount) {
    if (amount <= limit) {
      limit -= amount;
      return true;
    }
    return false;
  }
}

class Cash extends Payment {
  double balance;
  Cash(this.balance);

  @override
  String get name => '現金';

  @override
  bool process(double amount) {
    if (amount <= balance) {
      balance -= amount;
      return true;
    }
    return false;
  }
}

void main() {
  final List<Payment> payments = [
    CreditCard('**** 1234', 50000),
    Cash(10000),
    CreditCard('**** 5678', 3000),
  ];

  final amounts = [15000.0, 8000.0, 5000.0];

  for (int i = 0; i < payments.length; i++) {
    payments[i].receipt(amounts[i]);
  }
}`}
          expectedOutput={`クレジットカードで 15000.0 円の支払い完了
現金で 8000.0 円の支払い完了
クレジットカードでの支払い失敗`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ランタイム多態性</h2>
        <p className="text-gray-400 mb-4">
          実行時に実際の型に基づいてメソッドが選択されます。<code className="text-red-300">runtimeType</code>で実際の型を確認できます。
        </p>
        <DartEditor
          defaultCode={`abstract class Renderer {
  void render(String content);
}

class HtmlRenderer extends Renderer {
  @override
  void render(String content) {
    print('<p>\$content</p>');
  }
}

class MarkdownRenderer extends Renderer {
  @override
  void render(String content) {
    print('**\$content**');
  }
}

class PlainTextRenderer extends Renderer {
  @override
  void render(String content) {
    print(content);
  }
}

class Document {
  String title;
  List<String> sections;

  Document(this.title, this.sections);

  void export(Renderer renderer) {
    print('--- \$title (\${renderer.runtimeType}) ---');
    for (final section in sections) {
      renderer.render(section);
    }
  }
}

void main() {
  final doc = Document('Dartガイド', [
    '概要: Dartは型安全な言語です',
    '特徴: Null Safetyをサポート',
    '用途: Flutter, サーバー, CLI',
  ]);

  doc.export(HtmlRenderer());
  print('');
  doc.export(MarkdownRenderer());
  print('');
  doc.export(PlainTextRenderer());
}`}
          expectedOutput={`--- Dartガイド (HtmlRenderer) ---
<p>概要: Dartは型安全な言語です</p>
<p>特徴: Null Safetyをサポート</p>
<p>用途: Flutter, サーバー, CLI</p>

--- Dartガイド (MarkdownRenderer) ---
**概要: Dartは型安全な言語です**
**特徴: Null Safetyをサポート**
**用途: Flutter, サーバー, CLI**

--- Dartガイド (PlainTextRenderer) ---
概要: Dartは型安全な言語です
特徴: Null Safetyをサポート
用途: Flutter, サーバー, CLI`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型チェックと型の絞り込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">is</code>演算子でポリモーフィックなオブジェクトの実際の型を確認し、特有の機能にアクセスできます。
        </p>
        <DartEditor
          defaultCode={`abstract class Vehicle {
  String brand;
  Vehicle(this.brand);
  void move();
}

class Car extends Vehicle {
  int doors;
  Car(String brand, this.doors) : super(brand);

  @override
  void move() => print('\$brand が走行中');

  void honk() => print('\$brand: プップー！');
}

class Boat extends Vehicle {
  double draft; // 喫水
  Boat(String brand, this.draft) : super(brand);

  @override
  void move() => print('\$brand が航行中');

  void anchor() => print('\$brand が錨を降ろしました');
}

void processVehicle(Vehicle v) {
  v.move(); // ポリモーフィック呼び出し

  // 型チェックによる特有の操作
  if (v is Car) {
    print('  ドア数: \${v.doors}');
    v.honk();
  } else if (v is Boat) {
    print('  喫水: \${v.draft}m');
    v.anchor();
  }
}

void main() {
  final vehicles = <Vehicle>[
    Car('トヨタ', 4),
    Boat('ヤマハ', 1.2),
    Car('ホンダ', 2),
  ];

  for (final v in vehicles) {
    processVehicle(v);
    print('');
  }
}`}
          expectedOutput={`トヨタ が走行中
  ドア数: 4
  トヨタ: プップー！

ヤマハ が航行中
  喫水: 1.2m
  ヤマハ が錨を降ろしました

ホンダ が走行中
  ドア数: 2
  ホンダ: プップー！
`}
        />
      </section>

      <LessonCompleteButton lessonId="polymorphism" categoryId="inheritance" />
      <LessonNav lessons={lessons} currentId="polymorphism" basePath="/learn/inheritance" />
    </div>
  );
}
