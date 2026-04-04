import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function VersionManagementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold">エコシステム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">バージョン管理</h1>
        <p className="text-gray-400">Dart SDKのバージョン管理とpubspec.yamlの制約設定を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セマンティックバージョニング</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Dartのパッケージはセマンティックバージョニング（SemVer）を採用しています。
          バージョン番号の意味を理解して適切な制約を設定しましょう。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-indigo-300">MAJOR.MINOR.PATCH</code>（例: 2.1.3）</li>
          <li>• <code className="text-indigo-300">MAJOR</code>: 破壊的変更（後方互換なし）</li>
          <li>• <code className="text-indigo-300">MINOR</code>: 後方互換な機能追加</li>
          <li>• <code className="text-indigo-300">PATCH</code>: 後方互換なバグ修正</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">バージョン制約の書き方</h2>
        <p className="text-gray-400 mb-4">
          pubspec.yamlでのバージョン制約構文の使い方です。
        </p>
        <DartEditor
          defaultCode={`// バージョン制約の解説

class VersionConstraint {
  final String pattern;
  final String description;
  final List<String> examples;

  const VersionConstraint(this.pattern, this.description, this.examples);
}

void main() {
  final constraints = [
    VersionConstraint(
      '^1.2.3',
      '1.2.3以上2.0.0未満（推奨）',
      ['✅ 1.2.3', '✅ 1.9.9', '❌ 2.0.0', '❌ 1.2.2'],
    ),
    VersionConstraint(
      '>=1.0.0 <2.0.0',
      '範囲指定（^と同等）',
      ['✅ 1.0.0', '✅ 1.5.0', '❌ 2.0.0'],
    ),
    VersionConstraint(
      '>=1.0.0',
      '1.0.0以上すべて（非推奨）',
      ['✅ 1.0.0', '✅ 2.0.0', '✅ 99.0.0'],
    ),
    VersionConstraint(
      '1.2.3',
      'バージョン完全固定（非推奨）',
      ['✅ 1.2.3のみ', '❌ 1.2.4'],
    ),
    VersionConstraint(
      'any',
      'すべてのバージョン（危険）',
      ['✅ 何でも通る（本番非推奨）'],
    ),
  ];

  print('=== pubspec.yaml バージョン制約 ===\\n');
  for (final c in constraints) {
    print('■ \${c.pattern}');
    print('  → \${c.description}');
    for (final ex in c.examples) {
      print('    \$ex');
    }
    print('');
  }
}`}
          expectedOutput={`=== pubspec.yaml バージョン制約 ===\n\n■ ^1.2.3\n  → 1.2.3以上2.0.0未満（推奨）\n    ✅ 1.2.3\n    ✅ 1.9.9\n    ❌ 2.0.0\n    ❌ 1.2.2\n\n■ >=1.0.0 <2.0.0\n  → 範囲指定（^と同等）\n    ✅ 1.0.0\n    ✅ 1.5.0\n    ❌ 2.0.0\n\n■ >=1.0.0\n  → 1.0.0以上すべて（非推奨）\n    ✅ 1.0.0\n    ✅ 2.0.0\n    ✅ 99.0.0\n\n■ 1.2.3\n  → バージョン完全固定（非推奨）\n    ✅ 1.2.3のみ\n    ❌ 1.2.4\n\n■ any\n  → すべてのバージョン（危険）\n    ✅ 何でも通る（本番非推奨）\n`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart SDKバージョン管理</h2>
        <p className="text-gray-400 mb-4">
          複数のDartバージョンを管理するためのツールと戦略です。
        </p>
        <DartEditor
          defaultCode={`// Dart SDKバージョン管理の戦略

void main() {
  print('=== Dart SDK バージョン管理 ===\\n');

  // pubspec.yaml のSDK制約
  const sdkConstraints = [
    ("'>=3.0.0 <4.0.0'", 'Dart 3.x（推奨）'),
    ("'>=2.19.0 <4.0.0'", 'Dart 2.19以上（Dart 2/3両対応）'),
    ("'>=3.2.0 <4.0.0'", 'Dart 3.2以上（新機能使用時）'),
  ];

  print('pubspec.yaml SDK制約の例:');
  for (final (constraint, desc) in sdkConstraints) {
    print('  environment:');
    print('    sdk: \$constraint  # \$desc');
    print('');
  }

  // バージョン確認コマンド
  print('バージョン確認・管理コマンド:');
  final commands = [
    ('dart --version',             '現在のDartバージョンを確認'),
    ('dart pub outdated',          '更新可能なパッケージ一覧'),
    ('dart pub upgrade',           'すべてのパッケージを更新'),
    ('dart pub upgrade --major-versions', 'メジャーバージョンも含めて更新'),
    ('dart pub downgrade',         'パッケージを最低バージョンに下げる'),
  ];

  for (final (cmd, desc) in commands) {
    print('  \$ \$cmd');
    print('    → \$desc');
  }

  print('\\npubspec.lock の役割:');
  print('  • 実際に使用されたバージョンを記録');
  print('  • チームメンバー間でバージョンを統一');
  print('  • Gitにコミットして再現性を確保');
  print('  • dart pub get で lockファイルと同じバージョンを取得');
}`}
          expectedOutput={`=== Dart SDK バージョン管理 ===\n\npubspec.yaml SDK制約の例:\n  environment:\n    sdk: '>=3.0.0 <4.0.0'  # Dart 3.x（推奨）\n\n  environment:\n    sdk: '>=2.19.0 <4.0.0'  # Dart 2.19以上（Dart 2/3両対応）\n\n  environment:\n    sdk: '>=3.2.0 <4.0.0'  # Dart 3.2以上（新機能使用時）\n\nバージョン確認・管理コマンド:\n  $ dart --version\n    → 現在のDartバージョンを確認\n  $ dart pub outdated\n    → 更新可能なパッケージ一覧\n  $ dart pub upgrade\n    → すべてのパッケージを更新\n  $ dart pub upgrade --major-versions\n    → メジャーバージョンも含めて更新\n  $ dart pub downgrade\n    → パッケージを最低バージョンに下げる\n\npubspec.lock の役割:\n  • 実際に使用されたバージョンを記録\n  • チームメンバー間でバージョンを統一\n  • Gitにコミットして再現性を確保\n  • dart pub get で lockファイルと同じバージョンを取得`}
        />
      </section>
      <LessonCompleteButton lessonId="version-management" categoryId="ecosystem" />
      <LessonNav lessons={lessons} currentId="version-management" basePath="/learn/ecosystem" />
    </div>
  );
}
