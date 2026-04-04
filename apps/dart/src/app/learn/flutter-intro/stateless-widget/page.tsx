import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flutter-intro");

export default function StatelessWidgetPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold">Flutter入門 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">StatelessWidget</h1>
        <p className="text-gray-400">状態を持たない静的なUIコンポーネントの作り方を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">StatelessWidgetとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          StatelessWidgetは一度作成すると変化しないウィジェットです。
          表示内容はコンストラクタで渡されたプロパティのみに依存します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-blue-300">build()</code>メソッドをオーバーライドしてUIを定義</li>
          <li>• <code className="text-blue-300">const</code>コンストラクタで効率的に使用できる</li>
          <li>• プロパティは<code className="text-blue-300">final</code>で不変にする</li>
          <li>• シンプルな表示コンポーネントに最適</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">StatelessWidgetの実装パターン</h2>
        <p className="text-gray-400 mb-4">
          FlutterのStatelessWidgetの基本構造をDartの概念コードで確認します。
        </p>
        <DartEditor
          defaultCode={`// StatelessWidgetの概念コード（Flutter環境で動作）

// Flutterの実際のコード:
// class UserCard extends StatelessWidget {
//   final String name;
//   final String email;
//   final String role;
//
//   const UserCard({
//     super.key,
//     required this.name,
//     required this.email,
//     required this.role,
//   });
//
//   @override
//   Widget build(BuildContext context) {
//     return Card(
//       child: ListTile(
//         title: Text(name),
//         subtitle: Text(email),
//         trailing: Chip(label: Text(role)),
//       ),
//     );
//   }
// }

// Dartで概念を表現
class UserCard {
  final String name;
  final String email;
  final String role;

  const UserCard({
    required this.name,
    required this.email,
    required this.role,
  });

  String render() {
    return '''
┌─────────────────────────┐
│ \$name
│ \$email
│ [\$role]
└─────────────────────────┘''';
  }
}

void main() {
  final users = [
    const UserCard(name: '田中太郎', email: 'tanaka@example.com', role: 'Admin'),
    const UserCard(name: '鈴木花子', email: 'suzuki@example.com', role: 'User'),
    const UserCard(name: '佐藤一郎', email: 'sato@example.com', role: 'Editor'),
  ];

  for (final user in users) {
    print(user.render());
  }
}`}
          expectedOutput={`┌─────────────────────────┐\n│ 田中太郎\n│ tanaka@example.com\n│ [Admin]\n└─────────────────────────┘\n┌─────────────────────────┐\n│ 鈴木花子\n│ suzuki@example.com\n│ [User]\n└─────────────────────────┘\n┌─────────────────────────┐\n│ 佐藤一郎\n│ sato@example.com\n│ [Editor]\n└─────────────────────────┘`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">再利用可能なコンポーネント設計</h2>
        <p className="text-gray-400 mb-4">
          プロパティで動作をカスタマイズできる再利用可能なコンポーネントパターンです。
        </p>
        <DartEditor
          defaultCode={`enum BadgeType { info, success, warning, error }

class StatusBadge {
  final String label;
  final BadgeType type;

  const StatusBadge(this.label, this.type);

  String get icon => switch (type) {
    BadgeType.info => 'ℹ️',
    BadgeType.success => '✅',
    BadgeType.warning => '⚠️',
    BadgeType.error => '❌',
  };

  String render() => '[\$icon \$label]';
}

class TaskItem {
  final String title;
  final bool completed;
  final StatusBadge? badge;

  const TaskItem(this.title, {this.completed = false, this.badge});

  String render() {
    final check = completed ? '☑' : '☐';
    final badgeStr = badge != null ? ' \${badge!.render()}' : '';
    return '\$check \$title\$badgeStr';
  }
}

void main() {
  final tasks = [
    TaskItem('ログイン機能実装', completed: true,
      badge: const StatusBadge('完了', BadgeType.success)),
    TaskItem('DBマイグレーション',
      badge: const StatusBadge('進行中', BadgeType.warning)),
    TaskItem('テスト作成',
      badge: const StatusBadge('未着手', BadgeType.info)),
    TaskItem('本番デプロイ',
      badge: const StatusBadge('ブロック中', BadgeType.error)),
  ];

  print('=== タスク一覧 ===');
  for (final task in tasks) {
    print(task.render());
  }
}`}
          expectedOutput={`=== タスク一覧 ===\n☑ ログイン機能実装 [✅ 完了]\n☐ DBマイグレーション [⚠️ 進行中]\n☐ テスト作成 [ℹ️ 未着手]\n☐ 本番デプロイ [❌ ブロック中]`}
        />
      </section>
      <LessonCompleteButton lessonId="stateless-widget" categoryId="flutter-intro" />
      <LessonNav lessons={lessons} currentId="stateless-widget" basePath="/learn/flutter-intro" />
    </div>
  );
}
