import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function PracticalPatternsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold">正規表現 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">実践パターン</h1>
        <p className="text-gray-400">メールアドレス・URL・日付など実務でよく使う正規表現パターンを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">よく使う正規表現パターン</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          実際の開発でよく使うパターンをまとめました。rawString（<code className="text-yellow-300">r'...'</code>）を使うとバックスラッシュを二重にしなくて済みます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• メールアドレス: <code className="text-yellow-300">r{`'^[\\w.+-]+@[\\w-]+\\.[a-z]{2,}$'`}</code></li>
          <li>• URL: <code className="text-yellow-300">r{`'^https?://[\\w./-]+'`}</code></li>
          <li>• 日本語電話番号: <code className="text-yellow-300">r{`'^0\\d{1,4}-\\d{1,4}-\\d{4}$'`}</code></li>
          <li>• 郵便番号: <code className="text-yellow-300">r{`'^\\d{3}-\\d{4}$'`}</code></li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">バリデーションユーティリティ</h2>
        <p className="text-gray-400 mb-4">
          よく使うバリデーションをまとめたユーティリティクラスです。
        </p>
        <DartEditor
          defaultCode={`class Patterns {
  static final email = RegExp(
    r'^[\\w.!#\$%&*+/=?^_\`{|}~-]+@[\\w-]+(?:\\.[\\w-]+)*\\.[a-z]{2,}\$',
    caseSensitive: false,
  );
  static final url = RegExp(
    r'^https?://[\\w\\-]+(\\.[\\w\\-]+)+(/[\\w\\-.,@?^=%&:/~+#]*)?$',
  );
  static final japanesePhone = RegExp(r'^0\\d{1,4}-\\d{1,4}-\\d{4}\$');
  static final postalCode = RegExp(r'^\\d{3}-\\d{4}\$');
  static final ipAddress = RegExp(
    r'^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\$',
  );
}

void check(String label, String value, RegExp pattern) {
  print('\$label "\$value": \${pattern.hasMatch(value) ? "✅" : "❌"}');
}

void main() {
  check('メール', 'user@example.com', Patterns.email);
  check('メール', 'invalid@', Patterns.email);
  check('URL', 'https://dart.dev', Patterns.url);
  check('URL', 'ftp://example.com', Patterns.url);
  check('電話', '03-1234-5678', Patterns.japanesePhone);
  check('電話', '090-123-456', Patterns.japanesePhone);
  check('郵便番号', '123-4567', Patterns.postalCode);
  check('IP', '192.168.1.1', Patterns.ipAddress);
  check('IP', '999.999.999.999', Patterns.ipAddress);
}`}
          expectedOutput={`メール "user@example.com": ✅\nメール "invalid@": ❌\nURL "https://dart.dev": ✅\nURL "ftp://example.com": ❌\n電話 "03-1234-5678": ✅\n電話 "090-123-456": ❌\n郵便番号 "123-4567": ✅\nIP "192.168.1.1": ✅\nIP "999.999.999.999": ❌`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">テキストからの情報抽出</h2>
        <p className="text-gray-400 mb-4">
          ログや文章から特定のパターンを抽出する実践的な例です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  const text = '''
お問い合わせ先:
  メール: support@example.com, sales@dart.dev
  電話: 03-1234-5678, 06-9876-5432
  URL: https://dart.dev, https://pub.dev/packages/http
  郵便番号: 100-0001, 530-0001
''';

  void extractAll(String label, RegExp pattern) {
    final matches = pattern.allMatches(text).map((m) => m.group(0)!).toList();
    print('\$label (\${matches.length}件): \${matches.join(", ")}');
  }

  extractAll('メール', RegExp(r'[\\w.]+@[\\w.]+'));
  extractAll('電話', RegExp(r'0\\d{1,4}-\\d{1,4}-\\d{4}'));
  extractAll('URL', RegExp(r'https?://[\\w./\\-]+'));
  extractAll('郵便番号', RegExp(r'\\d{3}-\\d{4}'));
}`}
          expectedOutput={`メール (2件): support@example.com, sales@dart.dev\n電話 (2件): 03-1234-5678, 06-9876-5432\nURL (2件): https://dart.dev, https://pub.dev/packages/http\n郵便番号 (2件): 100-0001, 530-0001`}
        />
      </section>
      <LessonCompleteButton lessonId="practical-patterns" categoryId="regex" />
      <LessonNav lessons={lessons} currentId="practical-patterns" basePath="/learn/regex" />
    </div>
  );
}
