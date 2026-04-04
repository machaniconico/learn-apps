import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function PropertiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">クラス基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">プロパティ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            クラスのフィールドは<strong className="text-orange-300">インスタンス変数</strong>とも呼ばれます。
            <strong className="text-orange-300">var</strong>、型名、<strong className="text-orange-300">final</strong>で宣言できます。
            <strong className="text-orange-300">late</strong>で遅延初期化フィールドを作れます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">フィールドの宣言</h2>
        <p className="text-gray-400 mb-4">
          フィールドは型とデフォルト値を持てます。<code className="text-orange-300">final</code>フィールドはコンストラクタで一度だけ設定できます。
        </p>
        <DartEditor
          defaultCode={`class Student {
  // 通常フィールド（変更可能）
  String name;
  int grade;

  // finalフィールド（一度だけ設定）
  final String studentId;

  // デフォルト値付きフィールド
  double gpa = 0.0;
  List<String> courses = [];

  // null許容フィールド
  String? nickname;

  Student(this.name, this.studentId, {this.grade = 1});

  void addCourse(String course) {
    courses.add(course);
  }

  @override
  String toString() {
    String nick = nickname != null ? ' (\$nickname)' : '';
    return '\$name\$nick [ID:\$studentId, \$grade年生, GPA:\$gpa]';
  }
}

void main() {
  var s = Student('Alice', 'S001', grade: 2);
  s.gpa = 3.8;
  s.nickname = 'Ali';
  s.addCourse('数学');
  s.addCourse('英語');

  print(s);
  print('履修科目: \${s.courses}');
}`}
          expectedOutput={`Alice (Ali) [ID:S001, 2年生, GPA:3.8]
履修科目: [数学, 英語]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">late フィールドと遅延初期化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">late</code>キーワードで、コンストラクタ後に初期化されるフィールドを宣言できます。
        </p>
        <DartEditor
          defaultCode={`class Config {
  final String environment;

  // lateフィールド：後で初期化
  late String databaseUrl;
  late int maxConnections;

  // late + final：一度だけ初期化
  late final String appName;

  Config(this.environment) {
    // コンストラクタ本体で初期化
    _initialize();
  }

  void _initialize() {
    if (environment == 'production') {
      databaseUrl = 'db.prod.example.com';
      maxConnections = 100;
    } else {
      databaseUrl = 'localhost:5432';
      maxConnections = 10;
    }
    appName = 'MyApp-\$environment';
  }

  @override
  String toString() =>
    '\$appName: \$databaseUrl (最大\$maxConnections接続)';
}

void main() {
  var dev = Config('development');
  var prod = Config('production');
  print(dev);
  print(prod);
}`}
          expectedOutput={`MyApp-development: localhost:5432 (最大10接続)
MyApp-production: db.prod.example.com (最大100接続)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">フィールドの初期化パターン</h2>
        <p className="text-gray-400 mb-4">
          フィールドの初期化方法には複数のパターンがあります。場面に応じて使い分けましょう。
        </p>
        <DartEditor
          defaultCode={`class Vector2D {
  final double x;
  final double y;

  // 通常の初期化
  const Vector2D(this.x, this.y);

  // 計算されたプロパティ（フィールドではない）
  double get length => (x * x + y * y);
  double get angle => x == 0 && y == 0 ? 0 : y / x;

  // 演算子オーバーロード
  Vector2D operator +(Vector2D other) =>
    Vector2D(x + other.x, y + other.y);
  Vector2D operator *(double scalar) =>
    Vector2D(x * scalar, y * scalar);

  @override
  String toString() => 'Vec(\$x, \$y)';
}

void main() {
  var v1 = Vector2D(3, 4);
  var v2 = Vector2D(1, 2);

  print('v1: \$v1, 長さの二乗: \${v1.length}');
  print('v2: \$v2, 長さの二乗: \${v2.length}');
  print('v1 + v2: \${v1 + v2}');
  print('v1 * 2: \${v1 * 2}');
}`}
          expectedOutput={`v1: Vec(3.0, 4.0), 長さの二乗: 25.0
v2: Vec(1.0, 2.0), 長さの二乗: 5.0
v1 + v2: Vec(4.0, 6.0)
v1 * 2: Vec(6.0, 8.0)`}
        />
      </section>

      <LessonCompleteButton lessonId="properties" categoryId="classes" />
      <LessonNav lessons={lessons} currentId="properties" basePath="/learn/classes" />
    </div>
  );
}
