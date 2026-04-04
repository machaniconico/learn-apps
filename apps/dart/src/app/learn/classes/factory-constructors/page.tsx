import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function FactoryConstructorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">クラス基礎 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ファクトリコンストラクタ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-orange-300">factory</strong>キーワードのコンストラクタは必ずしも新しいインスタンスを返しません。
            キャッシュされたインスタンス、サブクラスのインスタンス、または計算された既存のインスタンスを返せます。
            シングルトンパターンやキャッシュパターンの実装に使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリコンストラクタの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">factory</code>コンストラクタはクラスのインスタンスを返す必要がありますが、新規生成は必須ではありません。
        </p>
        <DartEditor
          defaultCode={`class Logger {
  final String name;
  static final Map<String, Logger> _cache = {};

  // プライベートコンストラクタ
  Logger._internal(this.name);

  // ファクトリコンストラクタ（キャッシュから返す）
  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }

  void log(String message) {
    print('[\$name] \$message');
  }
}

void main() {
  var logger1 = Logger('App');
  var logger2 = Logger('App');   // キャッシュから返す
  var logger3 = Logger('HTTP');  // 新規作成

  logger1.log('起動');
  logger2.log('処理中');
  logger3.log('GET /api/data');

  // 同一インスタンスか確認
  print('logger1 と logger2 は同一: \${identical(logger1, logger2)}');
  print('logger1 と logger3 は同一: \${identical(logger1, logger3)}');
}`}
          expectedOutput={`[App] 起動
[App] 処理中
[HTTP] GET /api/data
logger1 と logger2 は同一: true
logger1 と logger3 は同一: false`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">JSONからのインスタンス生成</h2>
        <p className="text-gray-400 mb-4">
          ファクトリコンストラクタはJSONデータからオブジェクトを生成するパターンによく使われます。
        </p>
        <DartEditor
          defaultCode={`class User {
  final int id;
  final String name;
  final String email;
  final bool isAdmin;

  // 通常のコンストラクタ
  const User({
    required this.id,
    required this.name,
    required this.email,
    this.isAdmin = false,
  });

  // JSONからの生成（ファクトリコンストラクタ）
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String,
      isAdmin: json['isAdmin'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'email': email,
    'isAdmin': isAdmin,
  };

  @override
  String toString() => 'User(\$id: \$name, \$email, admin:\$isAdmin)';
}

void main() {
  // JSONデータ（APIレスポンスを想定）
  List<Map<String, dynamic>> jsonData = [
    {'id': 1, 'name': 'Alice', 'email': 'alice@example.com', 'isAdmin': true},
    {'id': 2, 'name': 'Bob', 'email': 'bob@example.com'},
    {'id': 3, 'name': 'Carol', 'email': 'carol@example.com', 'isAdmin': false},
  ];

  List<User> users = jsonData.map(User.fromJson).toList();
  for (var user in users) {
    print(user);
  }
}`}
          expectedOutput={`User(1: Alice, alice@example.com, admin:true)
User(2: Bob, bob@example.com, admin:false)
User(3: Carol, carol@example.com, admin:false)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">抽象クラスとファクトリコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          抽象クラスにファクトリコンストラクタを定義して、サブクラスのインスタンスを返すパターンも使われます。
        </p>
        <DartEditor
          defaultCode={`abstract class Shape {
  String get name;
  double get area;

  // ファクトリコンストラクタで適切なサブクラスを返す
  factory Shape.create(String type, List<double> params) {
    return switch (type) {
      'circle'    => _Circle(params[0]),
      'rectangle' => _Rectangle(params[0], params[1]),
      'triangle'  => _Triangle(params[0], params[1]),
      _           => throw ArgumentError('不明な図形: \$type'),
    };
  }

  @override
  String toString() => '\$name: 面積=\${area.toStringAsFixed(2)}';
}

class _Circle extends Shape {
  final double radius;
  _Circle(this.radius);
  @override String get name => '円';
  @override double get area => 3.14159 * radius * radius;
}

class _Rectangle extends Shape {
  final double width, height;
  _Rectangle(this.width, this.height);
  @override String get name => '長方形';
  @override double get area => width * height;
}

class _Triangle extends Shape {
  final double base, height;
  _Triangle(this.base, this.height);
  @override String get name => '三角形';
  @override double get area => base * height / 2;
}

void main() {
  List<Shape> shapes = [
    Shape.create('circle', [5]),
    Shape.create('rectangle', [4, 6]),
    Shape.create('triangle', [8, 3]),
  ];

  for (var shape in shapes) {
    print(shape);
  }
}`}
          expectedOutput={`円: 面積=78.54
長方形: 面積=24.00
三角形: 面積=12.00`}
        />
      </section>

      <LessonCompleteButton lessonId="factory-constructors" categoryId="classes" />
      <LessonNav lessons={lessons} currentId="factory-constructors" basePath="/learn/classes" />
    </div>
  );
}
