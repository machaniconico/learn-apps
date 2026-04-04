import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function PatternMatchingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold">正規表現 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パターンマッチング</h1>
        <p className="text-gray-400">hasMatch・firstMatch・allMatchesでパターンを検索する方法を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">マッチングメソッド</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          RegExpには3つの主要なマッチングメソッドがあります。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-yellow-300">hasMatch(str)</code> マッチするかboolで返す</li>
          <li>• <code className="text-yellow-300">firstMatch(str)</code> 最初のマッチをMatchオブジェクトで返す</li>
          <li>• <code className="text-yellow-300">allMatches(str)</code> すべてのマッチをIterableで返す</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">各マッチングメソッドの使い方</h2>
        <p className="text-gray-400 mb-4">
          3つのメソッドの使い分けを実例で確認します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  const log = '''
ERROR 2024-03-15 10:23:45 - DB接続失敗
INFO  2024-03-15 10:23:46 - リトライ中
ERROR 2024-03-15 10:24:00 - タイムアウト
INFO  2024-03-15 10:24:01 - 接続成功
''';

  final errorReg = RegExp(r'ERROR (\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2}) - (.+)');

  // hasMatch: エラーが存在するか確認
  print('エラーあり: \${errorReg.hasMatch(log)}');

  // firstMatch: 最初のエラーを取得
  final first = errorReg.firstMatch(log);
  if (first != null) {
    print('最初のエラー: \${first.group(3)} (\${first.group(1)} \${first.group(2)})');
  }

  // allMatches: すべてのエラーを取得
  final errors = errorReg.allMatches(log);
  print('エラー件数: \${errors.length}件');
  for (final m in errors) {
    print('  [\${m.group(1)} \${m.group(2)}] \${m.group(3)}');
  }
}`}
          expectedOutput={`エラーあり: true\n最初のエラー: DB接続失敗 (2024-03-15 10:23:45)\nエラー件数: 2件\n  [2024-03-15 10:23:45] DB接続失敗\n  [2024-03-15 10:24:00] タイムアウト`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">文字列の分割とマッチ位置</h2>
        <p className="text-gray-400 mb-4">
          マッチの開始・終了位置と文字列分割への応用です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  const text = 'Dart3はrecords, patterns, sealed classを導入しました';
  final keywordReg = RegExp(r'records|patterns|sealed class');

  // マッチ位置の取得
  for (final m in keywordReg.allMatches(text)) {
    print('"\${m.group(0)}" (位置: \${m.start}-\${m.end})');
  }

  print('');

  // 区切り文字で分割
  final csv = '田中,鈴木,,佐藤,   ,山田';
  final sep = RegExp(r'\\s*,\\s*');
  final fields = csv.split(sep).where((s) => s.isNotEmpty).toList();
  print('CSV分割: \$fields');
  print('フィールド数: \${fields.length}');
}`}
          expectedOutput={`"records" (位置: 6-13)\n"patterns" (位置: 15-23)\n"sealed class" (位置: 25-37)\n\nCSV分割: [田中, 鈴木, 佐藤, 山田]\nフィールド数: 4`}
        />
      </section>
      <LessonCompleteButton lessonId="pattern-matching" categoryId="regex" />
      <LessonNav lessons={lessons} currentId="pattern-matching" basePath="/learn/regex" />
    </div>
  );
}
