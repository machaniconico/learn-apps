import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

const quizQuestions: QuizQuestion[] = [
  {
    question: "入力バリデーションが重要な理由は何ですか？",
    options: [
      "コードが短くなるから",
      "インジェクション攻撃やデータ破損を防ぐため",
      "実行速度が上がるから",
      "メモリ使用量が減るから",
    ],
    answer: 1,
    explanation: "入力バリデーションにより、SQLインジェクション・XSS・その他の攻撃や不正データによるシステム障害を防ぎます。",
  },
  {
    question: "パスワードを安全に保存する正しい方法はどれですか？",
    options: [
      "平文で保存する",
      "Base64でエンコードして保存する",
      "ソルト付きハッシュ（bcryptなど）で保存する",
      "AES暗号化して保存する",
    ],
    answer: 2,
    explanation: "パスワードはbcryptなどのソルト付きハッシュアルゴリズムで保存します。平文や可逆な暗号化は危険です。",
  },
  {
    question: "HTTPSを使う主な理由は何ですか？",
    options: [
      "通信速度が上がる",
      "通信内容を暗号化して盗聴・改ざんを防ぐ",
      "サーバーの負荷が下がる",
      "コードが短くなる",
    ],
    answer: 1,
    explanation: "HTTPSはTLS/SSLで通信を暗号化し、中間者攻撃による盗聴や改ざんを防ぎます。",
  },
  {
    question: "依存パッケージのセキュリティ管理で重要なことは何ですか？",
    options: [
      "できるだけ多くのパッケージを使う",
      "定期的に脆弱性チェックと更新を行う",
      "常に最新版より1つ古いバージョンを使う",
      "パッケージを使わない",
    ],
    answer: 1,
    explanation: "依存パッケージは定期的にdart pub outdatedで確認し、既知の脆弱性がある場合は速やかに更新します。",
  },
];

export default function SecurityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">セキュリティ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartアプリケーションのセキュリティを学びましょう。入力バリデーション・暗号化・HTTPセキュリティ・セキュアコーディングの実践、そして依存パッケージの安全な管理まで、セキュアなアプリ開発に必要な知識を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="security" totalLessons={5} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/security" color="red" categoryId="security" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">入力バリデーションの例</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">RegExp</code>と型チェックを使った安全な入力バリデーションです。
        </p>
        <DartEditor
          defaultCode={`class Validator {
  static bool isValidEmail(String email) {
    final regex = RegExp(r'^[\\w.+-]+@[\\w-]+\\.[a-z]{2,}\$');
    return regex.hasMatch(email.trim());
  }

  static bool isValidPassword(String password) {
    if (password.length < 8) return false;
    final hasUpper = RegExp(r'[A-Z]').hasMatch(password);
    final hasLower = RegExp(r'[a-z]').hasMatch(password);
    final hasDigit = RegExp(r'\\d').hasMatch(password);
    return hasUpper && hasLower && hasDigit;
  }

  static String sanitize(String input) {
    return input
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .trim();
  }
}

void main() {
  print(Validator.isValidEmail('user@example.com') ? 'メール: 有効' : 'メール: 無効');
  print(Validator.isValidEmail('invalid-email') ? 'メール: 有効' : 'メール: 無効');
  print(Validator.isValidPassword('Passw0rd') ? 'パスワード: 有効' : 'パスワード: 無効');
  print(Validator.isValidPassword('weak') ? 'パスワード: 有効' : 'パスワード: 無効');
  print(Validator.sanitize('<script>alert("XSS")</script>'));
}`}
          expectedOutput={`メール: 有効\nメール: 無効\nパスワード: 有効\nパスワード: 無効\n&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">セキュアコーディングの実践</h2>
        <p className="text-gray-400 mb-4">
          例外の適切な処理と機密情報を含まないエラーメッセージの実装例です。
        </p>
        <DartEditor
          defaultCode={`class SecureResult<T> {
  final T? data;
  final String? errorMessage;
  final bool isSuccess;

  SecureResult.success(this.data)
      : errorMessage = null,
        isSuccess = true;

  SecureResult.failure(this.errorMessage)
      : data = null,
        isSuccess = false;
}

SecureResult<Map<String, dynamic>> authenticateUser(
  String username,
  String password,
) {
  // 内部エラーの詳細を外部に漏らさない
  if (username.isEmpty || password.isEmpty) {
    return SecureResult.failure('認証情報が無効です');
  }

  if (username == 'admin' && password == 'correct_password') {
    return SecureResult.success({'id': 1, 'role': 'admin'});
  }

  // 詳細を隠す（ユーザー名/パスワードどちらが間違いか教えない）
  return SecureResult.failure('認証情報が無効です');
}

void main() {
  final result1 = authenticateUser('admin', 'correct_password');
  print(result1.isSuccess ? '認証成功: \${result1.data}' : 'エラー: \${result1.errorMessage}');

  final result2 = authenticateUser('admin', 'wrong');
  print(result2.isSuccess ? '認証成功' : 'エラー: \${result2.errorMessage}');
}`}
          expectedOutput={`認証成功: {id: 1, role: admin}\nエラー: 認証情報が無効です`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
