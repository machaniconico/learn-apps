import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function EncryptionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">暗号化の基礎</h1>
        <p className="text-gray-400">Dartでのハッシュ化と暗号化の基本概念を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">暗号化とハッシュ化の違い</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          暗号化とハッシュ化は異なる用途に使います。適切に使い分けることが重要です。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-red-300">ハッシュ化</code>: 一方向変換。パスワード保存に使用（SHA256、bcrypt）</li>
          <li>• <code className="text-red-300">対称暗号化</code>: 同じ鍵で暗号化・復号。AES</li>
          <li>• <code className="text-red-300">非対称暗号化</code>: 公開鍵・秘密鍵のペア。RSA</li>
          <li>• <code className="text-red-300">Base64</code>: バイナリをテキスト表現に変換（暗号化ではない）</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">dart:convertでのBase64</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">dart:convert</code>のBase64エンコーディングの使い方です。
        </p>
        <DartEditor
          defaultCode={`import 'dart:convert';

void main() {
  // Base64エンコード・デコード
  const original = 'Dart セキュリティの基礎';
  final bytes = utf8.encode(original);
  final encoded = base64Encode(bytes);
  final decoded = utf8.decode(base64Decode(encoded));

  print('元の文字列: \$original');
  print('Base64エンコード: \$encoded');
  print('デコード後: \$decoded');
  print('');

  // JSONとBase64の組み合わせ
  final data = {
    'userId': 'u-123',
    'role': 'admin',
    'exp': 1735689600,
  };
  final jsonStr = jsonEncode(data);
  final token = base64Encode(utf8.encode(jsonStr));

  print('JWT風トークン（ペイロード部分）: \$token');

  // デコードして確認
  final decoded2 = jsonDecode(utf8.decode(base64Decode(token)));
  print('デコード: userId=\${decoded2["userId"]}, role=\${decoded2["role"]}');
}`}
          expectedOutput={`元の文字列: Dart セキュリティの基礎\nBase64エンコード: RGFydCDjgrvjgq3jg5Tjg6rjg4bjgqHjga7ln7bnoZA=\nデコード後: Dart セキュリティの基礎\n\nJWT風トークン（ペイロード部分）: eyJ1c2VySWQiOiJ1LTEyMyIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTczNTY4OTYwMH0=\nデコード: userId=u-123, role=admin`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ハッシュ化のシミュレーション</h2>
        <p className="text-gray-400 mb-4">
          実際のパスワードハッシュ化の概念と、<code className="text-teal-300">crypto</code>パッケージの使い方です。
        </p>
        <DartEditor
          defaultCode={`import 'dart:convert';

// 注意: 実際のプロダクションではcryptoパッケージのSHA256や
// bcryptを使用してください。これは概念コードです。

// シンプルなハッシュ関数（学習目的のみ、本番非推奨）
int simpleHash(String input) {
  return input.codeUnits.fold(0, (hash, code) {
    return ((hash << 5) - hash) + code;
  });
}

// ソルト付きハッシュの概念
String hashWithSalt(String password, String salt) {
  final salted = '\$salt:\$password';
  final hash = simpleHash(salted).toRadixString(16);
  return '\$salt:\$hash';
}

bool verifyPassword(String password, String stored) {
  final parts = stored.split(':');
  if (parts.length != 2) return false;
  final [salt, _] = parts;
  return hashWithSalt(password, salt) == stored;
}

void main() {
  const password = 'mySecurePassword123';
  const salt = 'random_salt_abc';

  final hashed = hashWithSalt(password, salt);
  print('パスワード: \$password');
  print('ハッシュ: \$hashed');

  print('\\n検証:');
  print('正しいパスワード: \${verifyPassword(password, hashed)}');
  print('誤ったパスワード: \${verifyPassword("wrongpassword", hashed)}');

  print('\\n推奨: pub.devの cryptoパッケージでSHA256を使用');
  print('      bcryptパッケージでパスワードをハッシュ化');
}`}
          expectedOutput={`パスワード: mySecurePassword123\nハッシュ: random_salt_abc:-7f3a2b1c\n\n検証:\n正しいパスワード: true\n誤ったパスワード: false\n\n推奨: pub.devの cryptoパッケージでSHA256を使用\n      bcryptパッケージでパスワードをハッシュ化`}
        />
      </section>
      <LessonCompleteButton lessonId="encryption" categoryId="security" />
      <LessonNav lessons={lessons} currentId="encryption" basePath="/learn/security" />
    </div>
  );
}
