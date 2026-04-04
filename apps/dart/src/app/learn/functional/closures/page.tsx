import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functional");

export default function ClosuresPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数型プログラミング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">クロージャ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-purple-300">クロージャ</strong>は定義されたスコープの変数をキャプチャして参照する関数です。
            Dartでは全ての関数はクロージャになりえます。
            外側の変数を「閉じ込める」ことで、状態を持つ関数を作成できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クロージャの基本</h2>
        <p className="text-gray-400 mb-4">
          関数が定義されたスコープの変数にアクセスし、その状態を保持します。
        </p>
        <DartEditor
          defaultCode={`// カウンターファクトリ
Function() makeCounter({int start = 0, int step = 1}) {
  int count = start;
  return () => count += step;
}

// 検証クロージャ
bool Function(String) makeValidator(int minLength, int maxLength) {
  return (String s) => s.length >= minLength && s.length <= maxLength;
}

void main() {
  // 異なる状態を持つカウンター
  final counter1 = makeCounter();
  final counter2 = makeCounter(start: 10, step: 5);

  for (int i = 0; i < 3; i++) {
    print('counter1: \${counter1()}, counter2: \${counter2()}');
  }

  print('---');

  // バリデーター
  final validateUsername = makeValidator(3, 20);
  final validatePassword = makeValidator(8, 50);

  final testCases = ['ab', 'validUser', 'a' * 25, 'short', 'validPassword123'];
  for (final s in testCases) {
    final uv = validateUsername(s);
    final pv = validatePassword(s);
    print('\$s -> ユーザー名:\$uv, パスワード:\$pv');
  }
}`}
          expectedOutput={`counter1: 1, counter2: 15
counter1: 2, counter2: 20
counter1: 3, counter2: 25
---
ab -> ユーザー名:false, パスワード:false
validUser -> ユーザー名:true, パスワード:true
aaaaaaaaaaaaaaaaaaaaaaaaa -> ユーザー名:false, パスワード:true
short -> ユーザー名:true, パスワード:false
validPassword123 -> ユーザー名:false, パスワード:true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">クロージャによる状態管理</h2>
        <p className="text-gray-400 mb-4">
          クロージャを使ってプライベートな状態を持つオブジェクト的な構造を作れます。
        </p>
        <DartEditor
          defaultCode={`Map<String, Function> createBankAccount(double initialBalance) {
  double balance = initialBalance;
  final transactions = <String>[];

  return {
    'deposit': (double amount) {
      balance += amount;
      transactions.add('+\$amount');
      print('入金: \$amount → 残高: \$balance');
    },
    'withdraw': (double amount) {
      if (amount > balance) {
        print('残高不足（残高: \$balance）');
        return;
      }
      balance -= amount;
      transactions.add('-\$amount');
      print('出金: \$amount → 残高: \$balance');
    },
    'getBalance': () => balance,
    'getHistory': () => List.unmodifiable(transactions),
  };
}

void main() {
  final account = createBankAccount(10000);

  (account['deposit'] as Function)(5000.0);
  (account['withdraw'] as Function)(3000.0);
  (account['withdraw'] as Function)(15000.0);
  (account['deposit'] as Function)(1000.0);

  print('残高: \${account['getBalance']!()}');
  print('履歴: \${account['getHistory']!()}');
}`}
          expectedOutput={`入金: 5000.0 → 残高: 15000.0
出金: 3000.0 → 残高: 12000.0
残高不足（残高: 12000.0）
入金: 1000.0 → 残高: 13000.0
残高: 13000.0
履歴: [+5000.0, -3000.0, +1000.0]`}
        />
      </section>

      <LessonCompleteButton lessonId="closures" categoryId="functional" />
      <LessonNav lessons={lessons} currentId="closures" basePath="/learn/functional" />
    </div>
  );
}
