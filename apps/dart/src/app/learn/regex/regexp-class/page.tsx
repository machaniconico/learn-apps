import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function RegexpClassPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold">正規表現 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">RegExpクラス</h1>
        <p className="text-gray-400">DartのRegExpクラスの使い方とオプション設定を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">RegExpクラスの主なプロパティ</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          DartのRegExpクラスはコンストラクタのオプションで動作を変更できます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-yellow-300">caseSensitive: false</code> 大文字小文字を無視</li>
          <li>• <code className="text-yellow-300">multiLine: true</code> 複数行モード（^と$が各行に適用）</li>
          <li>• <code className="text-yellow-300">dotAll: true</code> .が改行文字にもマッチ</li>
          <li>• <code className="text-yellow-300">unicode: true</code> Unicodeパターンを有効化</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">RegExpのオプション</h2>
        <p className="text-gray-400 mb-4">
          各オプションの動作を確認します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // caseSensitive: false
  final caseInsensitive = RegExp(r'dart', caseSensitive: false);
  ['Dart', 'DART', 'dart', 'java'].forEach((s) {
    print('\$s: \${caseInsensitive.hasMatch(s)}');
  });

  print('');

  // multiLine: true
  const multiText = 'line1\\nline2\\nline3';
  final multiReg = RegExp(r'^line\\d\$', multiLine: true);
  final matches = multiReg.allMatches(multiText);
  print('複数行マッチ: \${matches.length}件');
  for (final m in matches) {
    print('  マッチ: "\${m.group(0)}"');
  }
}`}
          expectedOutput={`Dart: true\nDART: true\ndart: true\njava: false\n\n複数行マッチ: 3件\n  マッチ: "line1"\n  マッチ: "line2"\n  マッチ: "line3"`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">キャプチャグループ</h2>
        <p className="text-gray-400 mb-4">
          括弧を使ったキャプチャグループとgroup()メソッドの使い方です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // キャプチャグループ
  final dateReg = RegExp(r'(\\d{4})年(\\d{1,2})月(\\d{1,2})日');
  final text = '今日は2024年3月15日です。昨日は2024年3月14日でした。';

  for (final match in dateReg.allMatches(text)) {
    final year = match.group(1);
    final month = match.group(2);
    final day = match.group(3);
    print('日付: \$year/\$month/\$day');
  }

  print('');

  // 名前付きキャプチャグループ
  final emailReg = RegExp(
    r'(?<user>[\\w.]+)@(?<domain>[\\w.]+)',
  );
  final emails = ['user@example.com', 'admin@dart.dev'];
  for (final email in emails) {
    final m = emailReg.firstMatch(email);
    if (m != null) {
      print('ユーザー: \${m.namedGroup("user")}, ドメイン: \${m.namedGroup("domain")}');
    }
  }
}`}
          expectedOutput={`日付: 2024/3/15\n日付: 2024/3/14\n\nユーザー: user, ドメイン: example.com\nユーザー: admin, ドメイン: dart.dev`}
        />
      </section>
      <LessonCompleteButton lessonId="regexp-class" categoryId="regex" />
      <LessonNav lessons={lessons} currentId="regexp-class" basePath="/learn/regex" />
    </div>
  );
}
