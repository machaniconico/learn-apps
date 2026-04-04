import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function LateModifierPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">Nullセーフティ</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">late修飾子</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-indigo-300">late</strong>修飾子を使うと、non-nullable型の変数を宣言時に初期化せず、後から初期化できます。
            初期化前にアクセスすると<code className="text-indigo-300">LateInitializationError</code>が発生します。
            依存性注入や遅延初期化のパターンに有用です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">late変数の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">late</code>をつけると宣言時の初期化が不要になります。最初のアクセスまでに必ず初期化してください。
        </p>
        <DartEditor
          defaultCode={`class DatabaseConnection {
  late String connectionString;
  late int maxConnections;
  bool _initialized = false;

  void initialize(String host, int port, {int maxConn = 10}) {
    connectionString = 'postgresql://\$host:\$port/mydb';
    maxConnections = maxConn;
    _initialized = true;
  }

  void query(String sql) {
    if (!_initialized) {
      throw StateError('データベースが初期化されていません');
    }
    print('接続先: \$connectionString');
    print('クエリ実行: \$sql');
  }
}

void main() {
  final db = DatabaseConnection();
  db.initialize('localhost', 5432, maxConn: 20);

  print('最大接続数: \${db.maxConnections}');
  db.query('SELECT * FROM users');
}`}
          expectedOutput={`最大接続数: 20
接続先: postgresql://localhost:5432/mydb
クエリ実行: SELECT * FROM users`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">late final と遅延初期化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">late final</code>は一度だけ代入できる遅延初期化変数です。イニシャライザを持つ<code className="text-indigo-300">late</code>は最初のアクセス時に実行されます。
        </p>
        <DartEditor
          defaultCode={`class ExpensiveResource {
  final String name;
  ExpensiveResource(this.name) {
    print('\$name を初期化中...');
  }
  String process(String input) => '\$name: \$input を処理';
}

class App {
  // アクセス時に初めて初期化される（遅延初期化）
  late final ExpensiveResource _resource = ExpensiveResource('リソース');

  String run(String data) => _resource.process(data);
}

void main() {
  print('Appを作成');
  final app = App();

  print('最初のアクセス（ここで初期化される）:');
  print(app.run('データ1'));

  print('2回目のアクセス（初期化済み）:');
  print(app.run('データ2'));

  // late final は一度しか代入できない
  late final String message;
  message = '最初のメッセージ';
  print(message);
  // message = '2回目'; // エラー: late finalは再代入不可
}`}
          expectedOutput={`Appを作成
最初のアクセス（ここで初期化される）:
リソース を初期化中...
リソース: データ1 を処理
2回目のアクセス（初期化済み）:
リソース: データ2 を処理
最初のメッセージ`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">late vs nullable の選択</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">late</code>と<code className="text-indigo-300">?</code>の使い分けを理解しましょう。
        </p>
        <DartEditor
          defaultCode={`// late: 必ず初期化されるが時期が後
// ?: nullが有効な値として存在する場合

class FormValidator {
  // エラーメッセージは検証後に設定 -> late
  late String lastError;

  // オプションのコールバック -> nullable
  void Function(String)? onError;

  bool validate(String input) {
    if (input.isEmpty) {
      lastError = '入力が空です';
      onError?.call(lastError);
      return false;
    }
    if (input.length < 3) {
      lastError = '3文字以上入力してください';
      onError?.call(lastError);
      return false;
    }
    lastError = ''; // 成功時もlastErrorをリセット
    return true;
  }
}

void main() {
  final validator = FormValidator();
  validator.onError = (msg) => print('コールバック: \$msg');

  print(validator.validate(''));
  print(validator.validate('ab'));
  print(validator.validate('Dart'));
  print('最後のエラー: "\${validator.lastError}"');
}`}
          expectedOutput={`コールバック: 入力が空です
false
コールバック: 3文字以上入力してください
false
true
最後のエラー: ""`}
        />
      </section>

      <LessonCompleteButton lessonId="late-modifier" categoryId="null-safety" />
      <LessonNav lessons={lessons} currentId="late-modifier" basePath="/learn/null-safety" />
    </div>
  );
}
