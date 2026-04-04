import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function RegexBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wide">文字列操作</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">正規表現基礎</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの<strong className="text-yellow-300">RegExp</strong>クラスで正規表現を使ったパターンマッチングができます。
            <code className="text-yellow-300">hasMatch</code>・<code className="text-yellow-300">firstMatch</code>・<code className="text-yellow-300">allMatches</code>で検索し、
            <code className="text-yellow-300">replaceAll</code>と組み合わせて文字列を変換できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">RegExp の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">RegExp('パターン')</code>で正規表現を作成し、<code className="text-yellow-300">hasMatch</code>・<code className="text-yellow-300">firstMatch</code>で検索します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // hasMatch: パターンが含まれるか
  final emailRegex = RegExp(r'^[\\w.+-]+@[\\w-]+\\.[\\w.]+\$');
  print(emailRegex.hasMatch('user@example.com'));   // true
  print(emailRegex.hasMatch('invalid-email'));       // false

  // firstMatch: 最初のマッチ
  final numberRegex = RegExp(r'\\d+');
  final text = 'I have 3 cats and 12 dogs';
  final match = numberRegex.firstMatch(text);
  print('最初の数字: \${match?.group(0)}');

  // allMatches: 全マッチ
  final allMatches = numberRegex.allMatches(text);
  final numbers = allMatches.map((m) => m.group(0)).toList();
  print('全ての数字: \$numbers');

  // キャプチャグループ
  final dateRegex = RegExp(r'(\\d{4})-(\\d{2})-(\\d{2})');
  final dateMatch = dateRegex.firstMatch('今日は 2024-01-15 です');
  if (dateMatch != null) {
    print('年: \${dateMatch.group(1)}');
    print('月: \${dateMatch.group(2)}');
    print('日: \${dateMatch.group(3)}');
  }
}`}
          expectedOutput={`true
false
最初の数字: 3
全ての数字: [3, 12]
年: 2024
月: 01
日: 15`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">正規表現による置換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-300">replaceAll(RegExp, replacement)</code>でパターンにマッチした部分を置換できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 数字の除去
  final mixed = 'abc123def456ghi';
  print(mixed.replaceAll(RegExp(r'\\d'), ''));

  // 空白の正規化
  final text = 'hello   world   dart';
  print(text.replaceAll(RegExp(r'\\s+'), ' '));

  // HTMLタグの除去
  final html = '<p>これは<strong>重要</strong>なテキストです</p>';
  print(html.replaceAll(RegExp(r'<[^>]+>'), ''));

  // キャメルケースをスネークケースに変換
  String toSnakeCase(String camel) {
    return camel
        .replaceAllMapped(
          RegExp(r'([A-Z])'),
          (m) => '_\${m.group(0)!.toLowerCase()}',
        )
        .replaceFirst(RegExp(r'^_'), '');
  }

  print(toSnakeCase('helloWorld'));
  print(toSnakeCase('myVariableName'));
  print(toSnakeCase('APIResponse'));

  // 電話番号のマスク
  final phone = '090-1234-5678';
  final masked = phone.replaceAll(RegExp(r'\\d{4}-\\d{4}'), '****-****');
  print('マスク: \$masked');
}`}
          expectedOutput={`abcdefghi
hello world dart
これは重要なテキストです
hello_world
my_variable_name
_a_p_i_response
マスク: 090-****-****`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">よく使う正規表現パターン</h2>
        <p className="text-gray-400 mb-4">
          実際のアプリでよく使うバリデーション用の正規表現パターンをまとめます。
        </p>
        <DartEditor
          defaultCode={`class Validator {
  static final _email = RegExp(
    r'^[\\w.+-]+@[\\w-]+\\.[\\w.]{2,}$',
  );
  static final _phone = RegExp(r'^0\\d{1,4}-\\d{1,4}-\\d{4}\$');
  static final _url = RegExp(
    r'^https?://[\\w-]+(\\.[\\w-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?\$',
  );
  static final _postcode = RegExp(r'^\\d{3}-\\d{4}\$');

  static bool isEmail(String s) => _email.hasMatch(s);
  static bool isPhone(String s) => _phone.hasMatch(s);
  static bool isUrl(String s) => _url.hasMatch(s);
  static bool isPostcode(String s) => _postcode.hasMatch(s);
}

void check(String label, bool result) {
  print('\$label: \${result ? '✓ 有効' : '✗ 無効'}');
}

void main() {
  check('メール(正常)', Validator.isEmail('user@example.com'));
  check('メール(異常)', Validator.isEmail('not-an-email'));

  check('電話(正常)', Validator.isPhone('090-1234-5678'));
  check('電話(異常)', Validator.isPhone('12345'));

  check('URL(正常)', Validator.isUrl('https://example.com'));
  check('URL(異常)', Validator.isUrl('not-a-url'));

  check('郵便番号(正常)', Validator.isPostcode('123-4567'));
  check('郵便番号(異常)', Validator.isPostcode('1234567'));
}`}
          expectedOutput={`メール(正常): ✓ 有効
メール(異常): ✗ 無効
電話(正常): ✓ 有効
電話(異常): ✗ 無効
URL(正常): ✓ 有効
URL(異常): ✗ 無効
郵便番号(正常): ✓ 有効
郵便番号(異常): ✗ 無効`}
        />
      </section>

      <LessonCompleteButton lessonId="regex-basics" categoryId="strings" />
      <LessonNav lessons={lessons} currentId="regex-basics" basePath="/learn/strings" />
    </div>
  );
}
