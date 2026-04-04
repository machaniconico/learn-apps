import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("security");

export default function DependencyManagementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold">セキュリティ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">依存パッケージ管理</h1>
        <p className="text-gray-400">pub.devの脆弱性チェックと安全な依存関係管理を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">依存パッケージのリスク</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          サードパーティのパッケージには既知の脆弱性が含まれる場合があります。
          定期的なチェックと更新が重要です。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-red-300">dart pub outdated</code> で更新可能なパッケージを確認</li>
          <li>• <code className="text-red-300">dart pub upgrade</code> でパッケージを更新</li>
          <li>• pub.devのセキュリティアドバイザリを定期確認</li>
          <li>• 不必要なパッケージは削除する</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">安全なバージョン制約の設定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">pubspec.yaml</code>での適切なバージョン制約の書き方です。
        </p>
        <DartEditor
          defaultCode={`// pubspec.yaml のベストプラクティス（概念コード）

// 推奨: ^ (キャレット) を使ったセマンティックバージョニング
const goodPubspec = """
dependencies:
  http: ^1.1.0         # 1.1.0以上2.0.0未満（推奨）
  json_annotation: ^4.8.1

dev_dependencies:
  test: ^1.24.0
  lints: ^3.0.0
""";

// 非推奨: バージョン固定（セキュリティ更新を受けられない）
const badPubspec = """
dependencies:
  http: 1.1.0          # 固定（更新されない）
  old_package: any     # anyは危険
""";

// パッケージの信頼性チェック観点
void checkPackage(String name, Map<String, dynamic> info) {
  final score = info['score'] as int;
  final publisher = info['publisher'] as String;
  final likes = info['likes'] as int;
  final maintained = info['maintained'] as bool;

  print('パッケージ: \$name');
  print('  スコア: \$score/130');
  print('  Publisher: \$publisher');
  print('  いいね: \$likes');
  print('  メンテナンス中: \${maintained ? "✅" : "❌"}');
  print('  推奨: \${score >= 100 && maintained ? "✅ 使用可" : "⚠️ 要確認"}');
}

void main() {
  checkPackage('http', {
    'score': 130, 'publisher': 'dart.dev',
    'likes': 5000, 'maintained': true,
  });
  print('');
  checkPackage('unknown_old_pkg', {
    'score': 45, 'publisher': 'unknown',
    'likes': 12, 'maintained': false,
  });
}`}
          expectedOutput={`パッケージ: http\n  スコア: 130/130\n  Publisher: dart.dev\n  いいね: 5000\n  メンテナンス中: ✅\n  推奨: ✅ 使用可\n\nパッケージ: unknown_old_pkg\n  スコア: 45/130\n  Publisher: unknown\n  いいね: 12\n  メンテナンス中: ❌\n  推奨: ⚠️ 要確認`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">依存関係の監査フロー</h2>
        <p className="text-gray-400 mb-4">
          定期的な依存パッケージ監査のワークフローです。
        </p>
        <DartEditor
          defaultCode={`// 依存関係監査の自動化概念
class DependencyAudit {
  final List<Map<String, dynamic>> packages;

  DependencyAudit(this.packages);

  void runAudit() {
    print('=== 依存パッケージ監査 ===\\n');

    final outdated = <String>[];
    final vulnerable = <String>[];
    final unused = <String>[];

    for (final pkg in packages) {
      final name = pkg['name'] as String;
      final current = pkg['current'] as String;
      final latest = pkg['latest'] as String;
      final hasVuln = pkg['vulnerability'] as bool;
      final isUsed = pkg['used'] as bool;

      if (current != latest) outdated.add('\$name: \$current → \$latest');
      if (hasVuln) vulnerable.add(name);
      if (!isUsed) unused.add(name);
    }

    print('⚠️  脆弱性あり (\${vulnerable.length}件):');
    for (final v in vulnerable) print('  ❌ \$v');

    print('\\n📦 更新可能 (\${outdated.length}件):');
    for (final o in outdated) print('  🔄 \$o');

    print('\\n🗑️  未使用 (\${unused.length}件):');
    for (final u in unused) print('  ➖ \$u');
  }
}

void main() {
  final audit = DependencyAudit([
    {'name': 'http', 'current': '1.1.0', 'latest': '1.2.0', 'vulnerability': false, 'used': true},
    {'name': 'old_crypto', 'current': '2.0.0', 'latest': '3.1.0', 'vulnerability': true, 'used': true},
    {'name': 'unused_pkg', 'current': '1.0.0', 'latest': '1.0.0', 'vulnerability': false, 'used': false},
  ]);
  audit.runAudit();
}`}
          expectedOutput={`=== 依存パッケージ監査 ===\n\n⚠️  脆弱性あり (1件):\n  ❌ old_crypto\n\n📦 更新可能 (2件):\n  🔄 http: 1.1.0 → 1.2.0\n  🔄 old_crypto: 2.0.0 → 3.1.0\n\n🗑️  未使用 (1件):\n  ➖ unused_pkg`}
        />
      </section>
      <LessonCompleteButton lessonId="dependency-management" categoryId="security" />
      <LessonNav lessons={lessons} currentId="dependency-management" basePath="/learn/security" />
    </div>
  );
}
