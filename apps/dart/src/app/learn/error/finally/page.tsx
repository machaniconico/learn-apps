import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function FinallyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">finally</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">finally</strong>ブロックは例外が発生したかどうかにかかわらず、必ず実行されるコードを書く場所です。
            ファイルのクローズ、データベース接続の解放、ロックの解除など、リソースの確実な解放に使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">finally の実行タイミング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">finally</code>はtryが正常終了しても、例外が発生しても必ず実行されます。
        </p>
        <DartEditor
          defaultCode={`String processData(String data, {bool fail = false}) {
  print('  開始: \$data');
  try {
    if (fail) throw Exception('処理失敗: \$data');
    final result = data.toUpperCase();
    print('  成功: \$result');
    return result;
  } catch (e) {
    print('  エラー: \$e');
    return '(エラー)';
  } finally {
    // 常に実行される
    print('  クリーンアップ: \$data');
  }
}

void main() {
  print('ケース1: 正常');
  processData('hello');
  print('');

  print('ケース2: 例外あり');
  processData('world', fail: true);
  print('');

  // return があってもfinallyは実行される
  print('ケース3: returnがある場合');
  String withReturn() {
    try {
      return '早期return';
    } finally {
      print('  finallyも実行される');
    }
  }
  print(withReturn());
}`}
          expectedOutput={`ケース1: 正常
  開始: hello
  成功: HELLO
  クリーンアップ: hello

ケース2: 例外あり
  開始: world
  エラー: Exception: 処理失敗: world
  クリーンアップ: world

ケース3: returnがある場合
  finallyも実行される
早期return`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">リソース管理パターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">finally</code>を使ったリソース管理の実践パターンです。
        </p>
        <DartEditor
          defaultCode={`class DbConnection {
  final String name;
  bool isOpen = false;
  int queryCount = 0;

  DbConnection(this.name);

  void open() {
    isOpen = true;
    print('[\$name] 接続開始');
  }

  String query(String sql) {
    if (!isOpen) throw StateError('接続が閉じています');
    queryCount++;
    if (sql.contains('ERROR')) throw Exception('クエリ失敗: \$sql');
    return 'Result(\$sql)';
  }

  void close() {
    if (isOpen) {
      isOpen = false;
      print('[\$name] 接続終了 (クエリ数: \$queryCount)');
    }
  }
}

void runTransaction(DbConnection db, List<String> queries) {
  db.open();
  try {
    for (final q in queries) {
      print('  実行: \${db.query(q)}');
    }
  } catch (e) {
    print('  トランザクションエラー: \$e');
  } finally {
    db.close();
  }
}

void main() {
  runTransaction(
    DbConnection('DB1'),
    ['SELECT users', 'SELECT posts'],
  );
  print('---');
  runTransaction(
    DbConnection('DB2'),
    ['SELECT users', 'ERROR query', 'SELECT posts'],
  );
}`}
          expectedOutput={`[DB1] 接続開始
  実行: Result(SELECT users)
  実行: Result(SELECT posts)
[DB1] 接続終了 (クエリ数: 2)
---
[DB2] 接続開始
  実行: Result(SELECT users)
  トランザクションエラー: Exception: クエリ失敗: ERROR query
[DB2] 接続終了 (クエリ数: 1)`}
        />
      </section>

      <LessonCompleteButton lessonId="finally" categoryId="error" />
      <LessonNav lessons={lessons} currentId="finally" basePath="/learn/error" />
    </div>
  );
}
