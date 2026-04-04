import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function InputValidationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">入力バリデーション</h1>
        <p className="text-gray-400">ユーザー入力の検証と安全なデータ処理の基本を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">入力バリデーションの重要性</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          ユーザーからの入力はすべて信頼できないデータとして扱います。
          バリデーションにより、インジェクション攻撃・データ破損・システムクラッシュを防ぎます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-red-300">ホワイトリスト</code>方式: 許可する値のみを定義</li>
          <li>• <code className="text-red-300">型チェック</code>: 期待する型かどうかを確認</li>
          <li>• <code className="text-red-300">範囲チェック</code>: 値が許可範囲内かを確認</li>
          <li>• <code className="text-red-300">サニタイズ</code>: 危険な文字をエスケープ</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">バリデーションの実装</h2>
        <p className="text-gray-400 mb-4">
          フォーム入力を検証するバリデーターの実装例です。
        </p>
        <DartEditor
          defaultCode={`class ValidationError {
  final String field;
  final String message;
  ValidationError(this.field, this.message);

  @override
  String toString() => '\$field: \$message';
}

class UserFormValidator {
  List<ValidationError> validate(Map<String, dynamic> data) {
    final errors = <ValidationError>[];

    // 名前の検証
    final name = data['name'];
    if (name == null || name.toString().trim().isEmpty) {
      errors.add(ValidationError('name', '名前は必須です'));
    } else if (name.toString().length > 50) {
      errors.add(ValidationError('name', '名前は50文字以内にしてください'));
    }

    // 年齢の検証
    final age = data['age'];
    if (age == null) {
      errors.add(ValidationError('age', '年齢は必須です'));
    } else {
      final ageInt = int.tryParse(age.toString());
      if (ageInt == null) {
        errors.add(ValidationError('age', '年齢は整数で入力してください'));
      } else if (ageInt < 0 || ageInt > 150) {
        errors.add(ValidationError('age', '年齢は0〜150の範囲で入力してください'));
      }
    }

    return errors;
  }
}

void main() {
  final validator = UserFormValidator();

  final validData = {'name': '田中太郎', 'age': '25'};
  final errors1 = validator.validate(validData);
  print('有効なデータ: \${errors1.isEmpty ? "✅ OK" : errors1}');

  final invalidData = {'name': '', 'age': '200'};
  final errors2 = validator.validate(invalidData);
  print('無効なデータ: \${errors2.map((e) => e.toString()).join(", ")}');
}`}
          expectedOutput={`有効なデータ: ✅ OK\n無効なデータ: name: 名前は必須です, age: 年齢は0〜150の範囲で入力してください`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">サニタイズとエスケープ</h2>
        <p className="text-gray-400 mb-4">
          XSS対策のためのHTMLエスケープとSQLインジェクション対策の概念です。
        </p>
        <DartEditor
          defaultCode={`class Sanitizer {
  // HTMLエスケープ（XSS対策）
  static String escapeHtml(String input) {
    return input
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#x27;');
  }

  // 危険な文字を除去
  static String stripDangerous(String input) {
    return input.replaceAll(RegExp(r'[;\\-\\/\\*]'), '');
  }

  // 長さ制限
  static String truncate(String input, int maxLength) {
    return input.length > maxLength
        ? input.substring(0, maxLength)
        : input;
  }
}

void main() {
  final userInput = '<script>alert("XSS")</script>';
  print('入力: \$userInput');
  print('エスケープ後: \${Sanitizer.escapeHtml(userInput)}');

  final sqlInput = "'; DROP TABLE users; --";
  print('\\nSQL入力: \$sqlInput');
  print('サニタイズ後: \${Sanitizer.stripDangerous(sqlInput)}');

  final longText = 'あいうえおかきくけこさしすせそたちつてと'; // 20文字
  print('\\n長文: \$longText (\${longText.length}文字)');
  print('切り詰め(10): \${Sanitizer.truncate(longText, 10)}');
}`}
          expectedOutput={`入力: <script>alert("XSS")</script>\nエスケープ後: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;\n\nSQL入力: '; DROP TABLE users; --\nサニタイズ後: ' DROP TABLE users \n\n長文: あいうえおかきくけこさしすせそたちつてと (20文字)\n切り詰め(10): あいうえおかきくけこ`}
        />
      </section>
      <LessonCompleteButton lessonId="input-validation" categoryId="security" />
      <LessonNav lessons={lessons} currentId="input-validation" basePath="/learn/security" />
    </div>
  );
}
