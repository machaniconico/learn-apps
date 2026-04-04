import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold">エコシステム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">コミュニティ</h1>
        <p className="text-gray-400">Dartコミュニティへの参加方法とリソースの活用を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dartコミュニティ</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Dartには活発なコミュニティがあり、公式リソースから非公式の情報まで多くの学習リソースがあります。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-indigo-300">dart.dev</code>: 公式ドキュメント・チュートリアル</li>
          <li>• <code className="text-indigo-300">GitHub</code>: ソースコード・Issue追跡</li>
          <li>• <code className="text-indigo-300">Stack Overflow</code>: Q&A（タグ: dart, flutter）</li>
          <li>• <code className="text-indigo-300">Discord</code>: リアルタイムコミュニティ</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">公式リソース一覧</h2>
        <p className="text-gray-400 mb-4">
          Dart学習に役立つ公式リソースをまとめました。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final resources = {
    '公式ドキュメント': [
      ('https://dart.dev/guides',        'Dart言語ガイド'),
      ('https://dart.dev/codelabs',      'インタラクティブなコードラボ'),
      ('https://dart.dev/tutorials',     'チュートリアル集'),
      ('https://api.dart.dev',           'Dart APIリファレンス'),
      ('https://pub.dev',                'パッケージリポジトリ'),
    ],
    'コミュニティ・Q&A': [
      ('https://stackoverflow.com/questions/tagged/dart', 'Stack Overflow'),
      ('https://www.reddit.com/r/dartlang',               'Reddit r/dartlang'),
      ('https://discord.gg/Qt6DgfAWWx',                  'Discord Flutter/Dart'),
    ],
    'ニュース・ブログ': [
      ('https://medium.com/dartlang', 'Dart公式Mediumブログ'),
      ('https://flutter.dev/community', 'Flutterコミュニティ'),
    ],
    'コード例・練習': [
      ('https://dartpad.dev',           'DartPad（ブラウザで実行）'),
      ('https://github.com/dart-lang',  'Dart公式GitHub'),
    ],
  };

  resources.forEach((category, links) {
    print('■ \$category');
    for (final (url, desc) in links) {
      print('  • \$desc');
      print('    \$url');
    }
    print('');
  });
}`}
          expectedOutput={`■ 公式ドキュメント\n  • Dart言語ガイド\n    https://dart.dev/guides\n  • インタラクティブなコードラボ\n    https://dart.dev/codelabs\n  • チュートリアル集\n    https://dart.dev/tutorials\n  • Dart APIリファレンス\n    https://api.dart.dev\n  • パッケージリポジトリ\n    https://pub.dev\n\n■ コミュニティ・Q&A\n  • Stack Overflow\n    https://stackoverflow.com/questions/tagged/dart\n  • Reddit r/dartlang\n    https://www.reddit.com/r/dartlang\n  • Discord Flutter/Dart\n    https://discord.gg/Qt6DgfAWWx\n\n■ ニュース・ブログ\n  • Dart公式Mediumブログ\n    https://medium.com/dartlang\n  • Flutterコミュニティ\n    https://flutter.dev/community\n\n■ コード例・練習\n  • DartPad（ブラウザで実行）\n    https://dartpad.dev\n  • Dart公式GitHub\n    https://github.com/dart-lang\n`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">コントリビューションの仕方</h2>
        <p className="text-gray-400 mb-4">
          Dartエコシステムへのコントリビューション（貢献）の方法です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  print('=== Dart エコシステムへの貢献方法 ===\\n');

  final contributions = [
    (
      'バグレポート',
      'github.com/dart-lang でIssueを作成',
      [
        '再現手順を明確に記載',
        '期待する動作と実際の動作を説明',
        '環境情報（Dartバージョン・OS）を記載',
      ],
    ),
    (
      'パッケージ公開',
      'pub.devに独自パッケージを公開',
      [
        'dart pub publishでパッケージを公開',
        'README・CHANGELOG・LICENSEを整備',
        'テストカバレッジ80%以上を目指す',
      ],
    ),
    (
      'ドキュメント改善',
      '公式ドキュメントのPRを送る',
      [
        '誤字・誤訳を修正',
        'サンプルコードを追加',
        '説明をわかりやすく改善',
      ],
    ),
    (
      'コードレビュー',
      'GitHubのPRにフィードバックを送る',
      [
        '建設的なフィードバックを心がける',
        'コードスタイルより設計に着目',
        '参考資料やリンクを提示する',
      ],
    ),
  ];

  for (final (title, desc, steps) in contributions) {
    print('【\$title】\$desc');
    for (final step in steps) {
      print('  • \$step');
    }
    print('');
  }
}`}
          expectedOutput={`=== Dart エコシステムへの貢献方法 ===\n\n【バグレポート】github.com/dart-lang でIssueを作成\n  • 再現手順を明確に記載\n  • 期待する動作と実際の動作を説明\n  • 環境情報（Dartバージョン・OS）を記載\n\n【パッケージ公開】pub.devに独自パッケージを公開\n  • dart pub publishでパッケージを公開\n  • README・CHANGELOG・LICENSEを整備\n  • テストカバレッジ80%以上を目指す\n\n【ドキュメント改善】公式ドキュメントのPRを送る\n  • 誤字・誤訳を修正\n  • サンプルコードを追加\n  • 説明をわかりやすく改善\n\n【コードレビュー】GitHubのPRにフィードバックを送る\n  • 建設的なフィードバックを心がける\n  • コードスタイルより設計に着目\n  • 参考資料やリンクを提示する\n`}
        />
      </section>
      <LessonCompleteButton lessonId="community" categoryId="ecosystem" />
      <LessonNav lessons={lessons} currentId="community" basePath="/learn/ecosystem" />
    </div>
  );
}
