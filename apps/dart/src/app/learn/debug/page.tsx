import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

const quizQuestions: QuizQuestion[] = [
  {
    question: "debugPrint()とprint()の違いは何ですか？",
    options: [
      "debugPrint()はリリースビルドでも出力される",
      "debugPrint()は長い文字列を自動的に分割して出力する",
      "debugPrint()はエラーのみ出力する",
      "違いはない",
    ],
    answer: 1,
    explanation: "debugPrint()はFlutterで使われる関数で、長い文字列をAndroidのlogcatが扱える単位に自動分割します。",
  },
  {
    question: "assert文が実行されるのはいつですか？",
    options: [
      "常に実行される",
      "リリースビルドでのみ実行される",
      "デバッグモードでのみ実行される",
      "テスト実行時のみ",
    ],
    answer: 2,
    explanation: "assert文はデバッグモード（開発時）でのみ評価されます。リリースビルドでは無視されます。",
  },
  {
    question: "Dart DevToolsの主な機能は何ですか？",
    options: [
      "コードの自動生成",
      "メモリ・パフォーマンス・ウィジェットツリーの可視化",
      "パッケージの自動インストール",
      "コードの自動フォーマット",
    ],
    answer: 1,
    explanation: "Dart DevToolsはメモリ使用量・パフォーマンス・ネットワーク・ウィジェットツリーなどを可視化するデバッグツールです。",
  },
  {
    question: "dart:developerのlog()の利点は何ですか？",
    options: [
      "print()より高速",
      "ログレベル・名前・タイムスタンプなど構造化された情報を出力できる",
      "ファイルに自動保存される",
      "エラーを自動修正する",
    ],
    answer: 1,
    explanation: "dart:developerのlog()はログレベル・名前・エラー情報・スタックトレースなど構造化された情報を付加できます。",
  },
];

export default function DebugPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">デバッグ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartアプリケーションのデバッグ手法を学びましょう。print文による基本的なデバッグから、Dart DevToolsを使った高度なプロファイリング、assertによる開発時チェックまで、効率的なデバッグスキルを習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="debug" totalLessons={5} color="orange" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/debug" color="orange" categoryId="debug" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">print・debugPrintの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">print()</code>と<code className="text-teal-300">debugPrint()</code>を使った基本的なデバッグ出力です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 基本的なprint
  print('アプリ起動');

  // 変数の内容確認
  final user = {'name': '田中', 'age': 25, 'role': 'admin'};
  print('ユーザー情報: \$user');

  // 計算結果の確認
  final prices = [1200, 850, 3400, 920];
  final total = prices.fold(0, (sum, p) => sum + p);
  print('合計金額: \$total 円');

  // 型の確認
  final value = 42;
  print('型: \${value.runtimeType}, 値: \$value');

  // オブジェクトのデバッグ出力
  final list = [1, 2, 3, 4, 5];
  print('リスト: \$list');
  print('長さ: \${list.length}');
}`}
          expectedOutput={`アプリ起動\nユーザー情報: {name: 田中, age: 25, role: admin}\n合計金額: 6370 円\n型: int, 値: 42\nリスト: [1, 2, 3, 4, 5]\n長さ: 5`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">assertの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">assert</code>文を使った開発時の条件チェックです。
        </p>
        <DartEditor
          defaultCode={`class BankAccount {
  String owner;
  double _balance;

  BankAccount(this.owner, double initialBalance)
      : _balance = initialBalance {
    assert(initialBalance >= 0, '初期残高は0以上である必要があります');
  }

  void deposit(double amount) {
    assert(amount > 0, '入金額は正の数である必要があります');
    _balance += amount;
    print('\$amount 円入金。残高: \$_balance 円');
  }

  void withdraw(double amount) {
    assert(amount > 0, '出金額は正の数である必要があります');
    assert(amount <= _balance, '残高が不足しています');
    _balance -= amount;
    print('\$amount 円出金。残高: \$_balance 円');
  }

  double get balance => _balance;
}

void main() {
  final account = BankAccount('山田太郎', 10000);
  account.deposit(5000);
  account.withdraw(3000);
  print('最終残高: \${account.balance} 円');
}`}
          expectedOutput={`5000.0 円入金。残高: 15000.0 円\n3000.0 円出金。残高: 12000.0 円\n最終残高: 12000.0 円`}
        />
      </section>
      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
