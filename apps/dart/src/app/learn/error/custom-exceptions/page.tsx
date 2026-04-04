import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function CustomExceptionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">カスタム例外</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            独自のドメインに特化した例外クラスを作成すると、エラーの種類を明確に分類できます。
            DartではExceptionインターフェースを実装するか、<strong className="text-red-300">Exception</strong>クラスを実装してカスタム例外を作成します。
            toStringをオーバーライドして分かりやすいエラーメッセージを提供しましょう。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外クラスの作成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">implements Exception</code>でカスタム例外を作成します。
        </p>
        <DartEditor
          defaultCode={`class AppException implements Exception {
  final String message;
  final String? code;

  const AppException(this.message, {this.code});

  @override
  String toString() => code != null
      ? '[\$code] \$message'
      : 'AppException: \$message';
}

class AuthException extends AppException {
  AuthException(String message) : super(message, code: 'AUTH');
}

class ValidationException extends AppException {
  final Map<String, String> fieldErrors;

  ValidationException(this.fieldErrors)
      : super('バリデーションエラー', code: 'VALIDATION');

  @override
  String toString() {
    final errors = fieldErrors.entries
        .map((e) => '  \${e.key}: \${e.value}')
        .join('\\n');
    return 'ValidationException:\\n\$errors';
  }
}

void login(String? email, String? password) {
  final errors = <String, String>{};
  if (email == null || email.isEmpty) errors['email'] = '必須です';
  if (password == null || password.length < 6) errors['password'] = '6文字以上';
  if (errors.isNotEmpty) throw ValidationException(errors);
  if (email != 'admin@example.com') throw AuthException('ユーザーが見つかりません');
  print('ログイン成功: \$email');
}

void main() {
  for (final creds in [
    (null, null),
    ('user@example.com', 'pass123'),
    ('admin@example.com', 'secret123'),
  ]) {
    try {
      login(creds.\$1, creds.\$2);
    } on ValidationException catch (e) {
      print(e);
    } on AuthException catch (e) {
      print(e);
    }
    print('---');
  }
}`}
          expectedOutput={`ValidationException:
  email: 必須です
  password: 6文字以上
---
[AUTH] ユーザーが見つかりません
---
ログイン成功: admin@example.com
---`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">例外の階層設計</h2>
        <p className="text-gray-400 mb-4">
          継承を使ってドメイン固有の例外階層を設計できます。
        </p>
        <DartEditor
          defaultCode={`abstract class DatabaseException implements Exception {
  String get message;
  @override
  String toString() => 'DatabaseException: \$message';
}

class ConnectionException extends DatabaseException {
  final String host;
  @override
  String get message => 'ホスト \$host への接続に失敗';
  ConnectionException(this.host);
}

class QueryException extends DatabaseException {
  final String sql;
  @override
  String get message => 'クエリエラー: \$sql';
  QueryException(this.sql);
}

void runQuery(String host, String sql) {
  if (host.isEmpty) throw ConnectionException(host);
  if (sql.isEmpty) throw QueryException('(空のSQL)');
  print('クエリ実行: \$sql @ \$host');
}

void main() {
  final scenarios = [
    ('', 'SELECT 1'),
    ('localhost', ''),
    ('localhost', 'SELECT * FROM users'),
  ];

  for (final (host, sql) in scenarios) {
    try {
      runQuery(host, sql);
    } on ConnectionException catch (e) {
      print('接続エラー: \$e');
    } on QueryException catch (e) {
      print('クエリエラー: \$e');
    }
  }
}`}
          expectedOutput={`接続エラー: DatabaseException: ホスト  への接続に失敗
クエリエラー: DatabaseException: クエリエラー: (空のSQL)
クエリ実行: SELECT * FROM users @ localhost`}
        />
      </section>

      <LessonCompleteButton lessonId="custom-exceptions" categoryId="error" />
      <LessonNav lessons={lessons} currentId="custom-exceptions" basePath="/learn/error" />
    </div>
  );
}
