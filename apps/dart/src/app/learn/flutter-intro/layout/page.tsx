import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flutter-intro");

export default function LayoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold">Flutter入門 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">レイアウト</h1>
        <p className="text-gray-400">Row・Column・Containerなど基本レイアウトウィジェットを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Flutterのレイアウト</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Flutterのレイアウトはウィジェットをネストすることで構築します。
          CSSのFlexboxに似た概念ですが、すべてウィジェットとして表現します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-blue-300">Column</code>: 縦方向に並べる（mainAxis: 縦）</li>
          <li>• <code className="text-blue-300">Row</code>: 横方向に並べる（mainAxis: 横）</li>
          <li>• <code className="text-blue-300">MainAxisAlignment</code>: 主軸方向の整列</li>
          <li>• <code className="text-blue-300">CrossAxisAlignment</code>: 交差軸方向の整列</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">レイアウトの概念</h2>
        <p className="text-gray-400 mb-4">
          ColumnとRowの整列オプションをテキストで可視化します。
        </p>
        <DartEditor
          defaultCode={`// Flutterレイアウトの概念をテキストで表現

void visualizeColumn(String alignment, List<String> items) {
  final width = 20;
  print('Column (\$alignment):');
  print('┌\${'─' * width}┐');
  for (final item in items) {
    final padding = switch (alignment) {
      'start' => item.padRight(width),
      'center' => item.padLeft((width + item.length) ~/ 2).padRight(width),
      'end' => item.padLeft(width),
      _ => item.padRight(width),
    };
    print('│\$padding│');
  }
  print('└\${'─' * width}┘');
  print('');
}

void visualizeRow(List<String> items) {
  print('Row (spaceEvenly):');
  final totalWidth = items.length * 8 + (items.length + 1) * 2;
  print('┌\${'─' * totalWidth}┐');
  final row = items.map((i) => ' \${i.padRight(6)} ').join('│');
  print('│\$row│');
  print('└\${'─' * totalWidth}┘');
  print('');
}

void main() {
  final items = ['ボタン', 'テキスト', 'アイコン'];

  visualizeColumn('start', items);
  visualizeColumn('center', items);
  visualizeColumn('end', items);
  visualizeRow(items);
}`}
          expectedOutput={`Column (start):\n┌────────────────────┐\n│ボタン              │\n│テキスト            │\n│アイコン            │\n└────────────────────┘\n\nColumn (center):\n┌────────────────────┐\n│        ボタン      │\n│      テキスト      │\n│      アイコン      │\n└────────────────────┘\n\nColumn (end):\n┌────────────────────┐\n│              ボタン│\n│            テキスト│\n│            アイコン│\n└────────────────────┘\n\nRow (spaceEvenly):\n┌──────────────────────────┐\n│ ボタン │テキスト│アイコン│\n└──────────────────────────┘\n`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Expanded・Flexible・Spacer</h2>
        <p className="text-gray-400 mb-4">
          ColumnやRow内で柔軟にスペースを分配するウィジェットです。
        </p>
        <DartEditor
          defaultCode={`// Expanded / Flexible の概念
class LayoutItem {
  final String name;
  final int flex;
  final bool expanded;

  const LayoutItem(this.name, {this.flex = 1, this.expanded = false});
}

void renderFlexLayout(List<LayoutItem> items, int totalWidth) {
  final totalFlex = items.fold(0, (sum, i) => sum + i.flex);
  print('Row (totalWidth: \$totalWidth):');

  final parts = items.map((item) {
    final width = (totalWidth * item.flex / totalFlex).round();
    final label = item.expanded ? 'Exp(\${item.name})' : item.name;
    return label.substring(0, label.length.clamp(0, width - 1)).padRight(width - 1);
  }).join('|');

  print('|\$parts|');
  print('');

  for (final item in items) {
    final pct = (item.flex / totalFlex * 100).round();
    print('  \${item.name}: flex=\${item.flex} → \$pct%');
  }
}

void main() {
  print('=== Expanded レイアウト ===');
  renderFlexLayout([
    const LayoutItem('左', flex: 1, expanded: true),
    const LayoutItem('中', flex: 2, expanded: true),
    const LayoutItem('右', flex: 1, expanded: true),
  ], 40);

  print('\\n=== 固定 + Expanded ===');
  renderFlexLayout([
    const LayoutItem('固定'),
    const LayoutItem('Expanded', flex: 3, expanded: true),
    const LayoutItem('固定'),
  ], 40);
}`}
          expectedOutput={`=== Expanded レイアウト ===\n|左        |中                   |右        |\n\n  左: flex=1 → 25%\n  中: flex=2 → 50%\n  右: flex=1 → 25%\n\n=== 固定 + Expanded ===\n|固定      |Expanded             |固定      |\n\n  固定: flex=1 → 20%\n  Expanded: flex=3 → 60%\n  固定: flex=1 → 20%`}
        />
      </section>
      <LessonCompleteButton lessonId="layout" categoryId="flutter-intro" />
      <LessonNav lessons={lessons} currentId="layout" basePath="/learn/flutter-intro" />
    </div>
  );
}
