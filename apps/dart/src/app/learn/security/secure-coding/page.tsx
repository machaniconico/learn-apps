import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function SecureCodingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">セキュアコーディング</h1>
        <p className="text-gray-400">インジェクション対策・エラー処理・機密情報管理のベストプラクティスを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セキュアコーディングの原則</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          安全なコードを書くための基本原則です。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-red-300">最小権限の原則</code>: 必要最低限の権限のみ付与</li>
          <li>• <code className="text-red-300">フェイルセーフ</code>: エラー時は安全な状態にフォールバック</li>
          <li>• <code className="text-red-300">多層防御</code>: 複数のセキュリティレイヤーを設ける</li>
          <li>• <code className="text-red-300">機密情報の隠蔽</code>: エラーメッセージに内部情報を含めない</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">安全なエラーハンドリング</h2>
        <p className="text-gray-400 mb-4">
          内部エラーの詳細をユーザーに見せない安全なエラー処理パターンです。
        </p>
        <DartEditor
          defaultCode={`// セキュアなエラーハンドリング
class AppError {
  final String userMessage;  // ユーザーに表示するメッセージ
  final String? internalDetail;  // ログに記録するが表示しない

  AppError(this.userMessage, [this.internalDetail]);
}

class UserRepository {
  final Map<String, Map<String, dynamic>> _db = {
    'user123': {'name': '田中', 'email': 'tanaka@example.com'},
  };

  // 安全なデータ取得
  Map<String, dynamic>? findUser(String id) {
    try {
      // IDのバリデーション
      if (!RegExp(r'^[a-zA-Z0-9]+\$').hasMatch(id)) {
        throw AppError('無効なIDです', 'ID validation failed: \$id');
      }
      return _db[id];
    } catch (e) {
      if (e is AppError) rethrow;
      // 内部エラーを隠蔽
      throw AppError('データ取得中にエラーが発生しました', e.toString());
    }
  }
}

void safeExecute(void Function() action, String label) {
  try {
    action();
  } on AppError catch (e) {
    print('[\$label] エラー: \${e.userMessage}');
    // e.internalDetailはログに記録するが表示しない
  }
}

void main() {
  final repo = UserRepository();

  safeExecute(() {
    final user = repo.findUser('user123');
    print('ユーザー取得: \${user?["name"]}');
  }, 'findUser');

  safeExecute(() {
    repo.findUser("'; DROP TABLE users; --");
  }, 'findUser');

  safeExecute(() {
    final user = repo.findUser('unknown999');
    print('ユーザー: \${user ?? "見つかりません"}');
  }, 'findUser');
}`}
          expectedOutput={`ユーザー取得: 田中\n[findUser] エラー: 無効なIDです\nユーザー: 見つかりません`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">機密情報の管理</h2>
        <p className="text-gray-400 mb-4">
          APIキーや認証情報を安全に管理するパターンです。
        </p>
        <DartEditor
          defaultCode={`// 機密情報を安全に扱うパターン
class SecretValue {
  final String _value;

  SecretValue(this._value);

  // toStringでは値を隠す
  @override
  String toString() => '***masked***';

  // 比較は内部でのみ行う
  bool equals(String other) => _value == other;

  // 必要な場合のみ値を取り出せる（呼び出し元を限定）
  String use() => _value;
}

class Config {
  static Config? _instance;
  late final SecretValue _apiKey;
  late final SecretValue _dbPassword;

  Config._() {
    // 実際の環境では環境変数や安全なストレージから読み込む
    _apiKey = SecretValue('sk-prod-abc123def456');
    _dbPassword = SecretValue('super_secret_password');
  }

  static Config get instance => _instance ??= Config._();

  SecretValue get apiKey => _apiKey;
  SecretValue get dbPassword => _dbPassword;
}

void main() {
  final config = Config.instance;

  // toString()で機密情報が漏れない
  print('APIキー: \${config.apiKey}');
  print('DBパスワード: \${config.dbPassword}');

  // 比較は安全に行える
  print('APIキー確認: \${config.apiKey.equals("sk-prod-abc123def456")}');
  print('誤ったキー: \${config.apiKey.equals("wrong-key")}');

  // ログに出力しても安全
  final logEntry = {'apiKey': config.apiKey.toString(), 'status': 'connected'};
  print('ログ: \$logEntry');
}`}
          expectedOutput={`APIキー: ***masked***\nDBパスワード: ***masked***\nAPIキー確認: true\n誤ったキー: false\nログ: {apiKey: ***masked***, status: connected}`}
        />
      </section>
      <LessonCompleteButton lessonId="secure-coding" categoryId="security" />
      <LessonNav lessons={lessons} currentId="secure-coding" basePath="/learn/security" />
    </div>
  );
}
