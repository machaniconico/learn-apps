import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InterfacesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">継承・Mixin</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">インターフェース</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartでは全てのクラスが暗黙的にインターフェースとして機能します。
            <code className="text-red-300">implements</code>キーワードを使ってインターフェースを実装し、
            全てのメンバーをオーバーライドする必要があります。
            複数のインターフェースを同時に実装できるため、多重継承的な設計が可能です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">implements の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">implements</code>でインターフェースを実装すると、全メンバーの実装が必須になります。
        </p>
        <DartEditor
          defaultCode={`abstract class Printable {
  void printInfo();
}

abstract class Serializable {
  String toJson();
}

class User implements Printable, Serializable {
  String name;
  int age;
  String email;

  User(this.name, this.age, this.email);

  @override
  void printInfo() {
    print('ユーザー: \$name (年齢: \$age, メール: \$email)');
  }

  @override
  String toJson() {
    return '{"name": "\$name", "age": \$age, "email": "\$email"}';
  }
}

class Product implements Printable, Serializable {
  String id;
  String name;
  double price;

  Product(this.id, this.name, this.price);

  @override
  void printInfo() {
    print('商品: \$name (ID: \$id, 価格: \$price円)');
  }

  @override
  String toJson() {
    return '{"id": "\$id", "name": "\$name", "price": \$price}';
  }
}

void printAll(List<Printable> items) {
  for (final item in items) {
    item.printInfo();
  }
}

void main() {
  final user = User('田中太郎', 30, 'tanaka@example.com');
  final product = Product('P001', 'Dartの本', 2800.0);

  printAll([user, product]);

  print('');
  print(user.toJson());
  print(product.toJson());
}`}
          expectedOutput={`ユーザー: 田中太郎 (年齢: 30, メール: tanaka@example.com)
商品: Dartの本 (ID: P001, 価格: 2800.0円)

{"name": "田中太郎", "age": 30, "email": "tanaka@example.com"}
{"id": "P001", "name": "Dartの本", "price": 2800.0}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">extends と implements の違い</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">extends</code>は実装を継承し、<code className="text-red-300">implements</code>は契約のみを引き継ぎます。
        </p>
        <DartEditor
          defaultCode={`class Animal {
  String name;
  Animal(this.name);
  void breathe() => print('\$name が呼吸中');
  void eat() => print('\$name が食事中');
}

// extends: 実装を継承
class Dog extends Animal {
  Dog(String name) : super(name);
  void bark() => print('\$name: ワン！');
}

// implements: 全メソッドを再実装しなければならない
class Robot implements Animal {
  @override
  String name;

  Robot(this.name);

  @override
  void breathe() => print('\$name: 電力消費中');

  @override
  void eat() => print('\$name: 充電中');
}

void feedAll(List<Animal> animals) {
  for (final a in animals) {
    a.eat();
  }
}

void main() {
  final dog = Dog('ポチ');
  dog.breathe();
  dog.eat(); // 親クラスから継承
  dog.bark();

  final robot = Robot('R2-D2');
  robot.breathe();
  robot.eat();

  feedAll([dog, robot]);
}`}
          expectedOutput={`ポチ が呼吸中
ポチ が食事中
ポチ: ワン！
R2-D2: 電力消費中
R2-D2: 充電中
ポチ が食事中
R2-D2: 充電中`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">interface キーワード（Dart 3）</h2>
        <p className="text-gray-400 mb-4">
          Dart 3では<code className="text-red-300">interface class</code>を使って、implementsのみ許可するクラスを定義できます。
        </p>
        <DartEditor
          defaultCode={`// Dart 3の interface class
interface class Logger {
  void log(String message) {
    print('[LOG] \$message');
  }

  void error(String message) {
    print('[ERROR] \$message');
  }
}

// implements のみ可（extends は不可）
class ConsoleLogger implements Logger {
  @override
  void log(String message) {
    print('[CONSOLE] \$message');
  }

  @override
  void error(String message) {
    print('[CONSOLE ERROR] \$message');
  }
}

class FileLogger implements Logger {
  String filename;
  FileLogger(this.filename);

  @override
  void log(String message) {
    print('[\$filename へ書き込み] \$message');
  }

  @override
  void error(String message) {
    print('[\$filename へエラー書き込み] \$message');
  }
}

void runApp(Logger logger) {
  logger.log('アプリ起動');
  logger.error('設定ファイルが見つかりません');
  logger.log('デフォルト設定で起動');
}

void main() {
  runApp(ConsoleLogger());
  print('---');
  runApp(FileLogger('app.log'));
}`}
          expectedOutput={`[CONSOLE] アプリ起動
[CONSOLE ERROR] 設定ファイルが見つかりません
[CONSOLE] デフォルト設定で起動
---
[app.log へ書き込み] アプリ起動
[app.log へエラー書き込み] 設定ファイルが見つかりません
[app.log へ書き込み] デフォルト設定で起動`}
        />
      </section>

      <LessonCompleteButton lessonId="interfaces" categoryId="inheritance" />
      <LessonNav lessons={lessons} currentId="interfaces" basePath="/learn/inheritance" />
    </div>
  );
}
