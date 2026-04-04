import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function StaticMembersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">クラス基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">静的メンバー</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-orange-300">static</strong>キーワードで宣言したメンバーはクラス全体で共有されます。
            インスタンスを生成せずに<code>クラス名.メンバー名</code>でアクセスできます。
            ユーティリティ関数や定数の定義によく使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">静的フィールドとメソッド</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">static</code>メンバーはクラス名でアクセスします。インスタンスからはアクセスできません。
        </p>
        <DartEditor
          defaultCode={`class MathUtils {
  // 静的定数
  static const double pi = 3.14159265358979;
  static const double e = 2.71828182845905;

  // 静的メソッド
  static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }

  static bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
      if (n % i == 0) return false;
    }
    return true;
  }

  static List<int> primes(int limit) {
    return List.generate(limit, (i) => i + 2)
        .where(isPrime)
        .toList();
  }
}

void main() {
  print('π = \${MathUtils.pi}');
  print('e = \${MathUtils.e}');
  print('5! = \${MathUtils.factorial(5)}');
  print('7は素数: \${MathUtils.isPrime(7)}');
  print('20以下の素数: \${MathUtils.primes(19)}');
}`}
          expectedOutput={`π = 3.14159265358979
e = 2.71828182845905
5! = 120
7は素数: true
20以下の素数: [2, 3, 5, 7, 11, 13, 17, 19]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">静的カウンターとインスタンス管理</h2>
        <p className="text-gray-400 mb-4">
          staticフィールドで全インスタンスで共有される状態を管理できます。
        </p>
        <DartEditor
          defaultCode={`class Employee {
  static int _nextId = 1000;
  static int _count = 0;

  final int id;
  final String name;
  final String department;

  Employee(this.name, this.department)
      : id = _nextId++ {
    _count++;
  }

  // 静的ゲッター
  static int get count => _count;
  static int get nextId => _nextId;

  @override
  String toString() => 'ID:\$id \$name (\$department)';
}

void main() {
  print('従業員数: \${Employee.count}');

  var e1 = Employee('Alice', '開発');
  var e2 = Employee('Bob', '営業');
  var e3 = Employee('Carol', '開発');

  print(e1);
  print(e2);
  print(e3);
  print('登録済み従業員数: \${Employee.count}人');
  print('次のID: \${Employee.nextId}');
}`}
          expectedOutput={`従業員数: 0
ID:1000 Alice (開発)
ID:1001 Bob (営業)
ID:1002 Carol (開発)
登録済み従業員数: 3人
次のID: 1003`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">静的ファクトリーとユーティリティクラス</h2>
        <p className="text-gray-400 mb-4">
          静的メソッドでファクトリーパターンを実装したり、全て静的メンバーだけのユーティリティクラスを作れます。
        </p>
        <DartEditor
          defaultCode={`class DateUtils {
  // インスタンス化を禁止
  DateUtils._();

  static bool isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  static int daysInMonth(int year, int month) {
    const days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month == 2 && isLeapYear(year)) return 29;
    return days[month];
  }

  static String dayOfWeek(int year, int month, int day) {
    var date = DateTime(year, month, day);
    const names = ['月', '火', '水', '木', '金', '土', '日'];
    return names[date.weekday - 1];
  }
}

void main() {
  print('2024年は閏年: \${DateUtils.isLeapYear(2024)}');
  print('2023年は閏年: \${DateUtils.isLeapYear(2023)}');
  print('2024年2月の日数: \${DateUtils.daysInMonth(2024, 2)}');
  print('2024/1/1は: \${DateUtils.dayOfWeek(2024, 1, 1)}曜日');
}`}
          expectedOutput={`2024年は閏年: true
2023年は閏年: false
2024年2月の日数: 29
2024/1/1は: 月曜日`}
        />
      </section>

      <LessonCompleteButton lessonId="static-members" categoryId="classes" />
      <LessonNav lessons={lessons} currentId="static-members" basePath="/learn/classes" />
    </div>
  );
}
