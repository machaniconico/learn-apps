import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function ReplacementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold">正規表現 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">文字列の置換</h1>
        <p className="text-gray-400">replaceAll・replaceAllMappedを使った正規表現による置換を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">置換メソッド</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Dartのstringクラスには正規表現を使った置換メソッドが用意されています。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-yellow-300">replaceAll(reg, str)</code> すべてのマッチを文字列で置換</li>
          <li>• <code className="text-yellow-300">replaceFirst(reg, str)</code> 最初のマッチのみ置換</li>
          <li>• <code className="text-yellow-300">replaceAllMapped(reg, fn)</code> マッチを関数の戻り値で置換</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">replaceAllとreplaceFirst</h2>
        <p className="text-gray-400 mb-4">
          固定文字列での置換と最初のマッチのみ置換する方法です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 不要な空白を削除
  final text = '  Hello   World   Dart  ';
  final cleaned = text.trim().replaceAll(RegExp(r'\\s+'), ' ');
  print('""\$cleaned""');

  // 電話番号のフォーマット統一
  final phones = ['090-1234-5678', '09012345678', '090 1234 5678'];
  final phoneReg = RegExp(r'[\\s-]');
  for (final phone in phones) {
    final normalized = phone.replaceAll(phoneReg, '');
    print('\$phone → \$normalized');
  }

  print('');

  // HTMLタグを除去
  const html = '<p>こんにちは<strong>Dart</strong>の世界へ</p>';
  final stripped = html.replaceAll(RegExp(r'<[^>]+>'), '');
  print(stripped);
}`}
          expectedOutput={`"Hello World Dart"\n090-1234-5678 → 09012345678\n09012345678 → 09012345678\n090 1234 5678 → 09012345678\n\nこんにちはDartの世界へ`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">replaceAllMappedによる動的置換</h2>
        <p className="text-gray-400 mb-4">
          マッチした部分をコールバック関数で動的に変換します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 数値を3桁区切りにフォーマット
  String formatNumber(String text) {
    return text.replaceAllMapped(
      RegExp(r'(\\d+)'),
      (match) {
        final num = match.group(0)!;
        // 3桁区切りに変換
        final result = StringBuffer();
        for (int i = 0; i < num.length; i++) {
          if (i > 0 && (num.length - i) % 3 == 0) result.write(',');
          result.write(num[i]);
        }
        return result.toString();
      },
    );
  }

  print(formatNumber('合計金額は1234567円です'));
  print(formatNumber('売上: 9876543, 費用: 123456'));

  // キャメルケースをスネークケースに変換
  String toSnakeCase(String camel) {
    return camel.replaceAllMapped(
      RegExp(r'([A-Z])'),
      (m) => '_\${m.group(0)!.toLowerCase()}',
    ).replaceFirst(RegExp(r'^_'), '');
  }

  print(toSnakeCase('getUserById'));
  print(toSnakeCase('calculateTotalPrice'));
}`}
          expectedOutput={`合計金額は1,234,567円です\n売上: 9,876,543, 費用: 123,456\nget_user_by_id\ncalculate_total_price`}
        />
      </section>
      <LessonCompleteButton lessonId="replacement" categoryId="regex" />
      <LessonNav lessons={lessons} currentId="replacement" basePath="/learn/regex" />
    </div>
  );
}
