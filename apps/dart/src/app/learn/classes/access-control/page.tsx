import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function AccessControlPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">クラス基礎 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">アクセス制御</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartでは<strong className="text-orange-300">アンダースコア（_）</strong>で始まる名前はライブラリプライベートになります。
            <code>private</code>、<code>public</code>などのキーワードはなく、アンダースコアのみで可視性を制御します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">プライベートメンバー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">_</code>で始まる名前は同じライブラリ内からのみアクセスできます。外部からは見えません。
        </p>
        <DartEditor
          defaultCode={`class BankAccount {
  final String owner;
  double _balance; // プライベートフィールド
  List<String> _transactions = []; // プライベートリスト

  BankAccount(this.owner, double initialBalance)
      : _balance = initialBalance;

  // パブリックゲッター（読み取りのみ）
  double get balance => _balance;
  List<String> get transactions => List.unmodifiable(_transactions);

  // パブリックメソッド
  bool deposit(double amount) {
    if (amount <= 0) return false;
    _balance += amount;
    _log('入金: +¥\${amount.toStringAsFixed(0)}');
    return true;
  }

  bool withdraw(double amount) {
    if (amount <= 0 || amount > _balance) return false;
    _balance -= amount;
    _log('出金: -¥\${amount.toStringAsFixed(0)}');
    return true;
  }

  // プライベートメソッド
  void _log(String message) {
    _transactions.add(message);
  }
}

void main() {
  var account = BankAccount('Alice', 10000);
  account.deposit(5000);
  account.withdraw(3000);
  account.withdraw(20000); // 失敗

  print('残高: ¥\${account.balance.toStringAsFixed(0)}');
  print('取引履歴: \${account.transactions}');
}`}
          expectedOutput={`残高: ¥12000
取引履歴: [入金: +¥5000, 出金: -¥3000]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カプセル化の実践</h2>
        <p className="text-gray-400 mb-4">
          プライベートフィールドとパブリックメソッドでクラスの内部実装を隠蔽し、安全なインターフェースを提供します。
        </p>
        <DartEditor
          defaultCode={`class Temperature {
  double _celsius; // 内部はセルシウスで保持

  Temperature.fromCelsius(this._celsius);
  Temperature.fromFahrenheit(double f) : _celsius = (f - 32) * 5 / 9;
  Temperature.fromKelvin(double k) : _celsius = k - 273.15;

  // 様々な単位でアクセス可能
  double get celsius => _celsius;
  double get fahrenheit => _celsius * 9 / 5 + 32;
  double get kelvin => _celsius + 273.15;

  set celsius(double value) {
    if (value < -273.15) throw ArgumentError('絶対零度以下は無効');
    _celsius = value;
  }

  String _classify() {
    if (_celsius < 0) return '氷点下';
    if (_celsius < 20) return '涼しい';
    if (_celsius < 30) return '快適';
    return '暑い';
  }

  @override
  String toString() =>
    '\${_celsius.toStringAsFixed(1)}°C / \${fahrenheit.toStringAsFixed(1)}°F [\${_classify()}]';
}

void main() {
  var t1 = Temperature.fromCelsius(25);
  var t2 = Temperature.fromFahrenheit(32);
  var t3 = Temperature.fromKelvin(373.15);
  print(t1);
  print(t2);
  print(t3);
}`}
          expectedOutput={`25.0°C / 77.0°F [快適]
0.0°C / 32.0°F [涼しい]
100.0°C / 212.0°F [暑い]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">プライベートコンストラクタ</h2>
        <p className="text-gray-400 mb-4">
          プライベートコンストラクタ（<code className="text-orange-300">クラス名._名前()</code>）でクラスの外からの直接インスタンス化を防げます。
        </p>
        <DartEditor
          defaultCode={`class Singleton {
  static Singleton? _instance;
  int _counter = 0;

  // プライベートコンストラクタ
  Singleton._();

  // シングルトンアクセサ
  static Singleton get instance {
    _instance ??= Singleton._();
    return _instance!;
  }

  void increment() => _counter++;
  int get counter => _counter;
}

void main() {
  var s1 = Singleton.instance;
  var s2 = Singleton.instance;

  s1.increment();
  s1.increment();
  s2.increment();

  print('s1のカウント: \${s1.counter}');
  print('s2のカウント: \${s2.counter}');
  print('同一インスタンス: \${identical(s1, s2)}');
}`}
          expectedOutput={`s1のカウント: 3
s2のカウント: 3
同一インスタンス: true`}
        />
      </section>

      <LessonCompleteButton lessonId="access-control" categoryId="classes" />
      <LessonNav lessons={lessons} currentId="access-control" basePath="/learn/classes" />
    </div>
  );
}
