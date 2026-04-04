import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flutter-intro");

export default function WidgetBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold">Flutter入門 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ウィジェットの基本</h1>
        <p className="text-gray-400">Flutterの「すべてはウィジェット」という設計思想を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ウィジェットとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Flutterでは「すべてがウィジェット」です。ボタン・テキスト・画像だけでなく、
          パディング・整列・レイアウトもすべてウィジェットとして表現します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-blue-300">StatelessWidget</code>: 状態を持たない不変のウィジェット</li>
          <li>• <code className="text-blue-300">StatefulWidget</code>: 状態を持ち動的に変化するウィジェット</li>
          <li>• <code className="text-blue-300">InheritedWidget</code>: ツリー全体にデータを伝播</li>
          <li>• ウィジェットツリーが構造化されたUIを表現</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ウィジェットツリーの概念</h2>
        <p className="text-gray-400 mb-4">
          Flutterのウィジェットツリー構造をDartで表現します。
        </p>
        <DartEditor
          defaultCode={`// ウィジェットツリーの概念をDartで表現

abstract class Widget {
  const Widget();
  String render(int indent);
  String get indent => '  ';
}

class TextWidget extends Widget {
  final String text;
  const TextWidget(this.text);

  @override
  String render(int depth) => '\${indent * depth}Text("\$text")';
}

class ContainerWidget extends Widget {
  final Widget child;
  final String? color;
  const ContainerWidget({required this.child, this.color});

  @override
  String render(int depth) {
    final colorStr = color != null ? ' color=\$color' : '';
    return '\${indent * depth}Container(\$colorStr\n\${child.render(depth + 1)}\n\${indent * depth})';
  }
}

class ColumnWidget extends Widget {
  final List<Widget> children;
  const ColumnWidget({required this.children});

  @override
  String render(int depth) {
    final childStr = children.map((c) => c.render(depth + 1)).join('\n');
    return '\${indent * depth}Column(\n\$childStr\n\${indent * depth})';
  }
}

void main() {
  const tree = ColumnWidget(children: [
    ContainerWidget(color: 'blue', child: TextWidget('タイトル')),
    TextWidget('説明文1'),
    TextWidget('説明文2'),
  ]);

  print('=== ウィジェットツリー ===');
  print(tree.render(0));
}`}
          expectedOutput={`=== ウィジェットツリー ===\nColumn(\n  Container( color=blue\n    Text("タイトル")\n  )\n  Text("説明文1")\n  Text("説明文2")\n)`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">主要なFlutterウィジェット</h2>
        <p className="text-gray-400 mb-4">
          よく使うFlutterウィジェットの一覧と役割です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final widgets = {
    'レイアウト系': [
      'Column    - 縦方向に子を並べる',
      'Row       - 横方向に子を並べる',
      'Stack     - 子を重ねて配置',
      'Container - パディング・マージン・色',
      'Padding   - 余白を追加',
      'Center    - 中央に配置',
    ],
    '表示系': [
      'Text      - テキスト表示',
      'Image     - 画像表示',
      'Icon      - アイコン表示',
      'Card      - カード風の枠',
      'ListTile  - リストの1行',
    ],
    'インタラクション系': [
      'ElevatedButton - 立体的なボタン',
      'TextButton     - テキストボタン',
      'GestureDetector - タップ・スワイプ検出',
      'TextField      - テキスト入力',
      'Switch         - オン/オフスイッチ',
    ],
  };

  widgets.forEach((category, list) {
    print('■ \$category');
    for (final w in list) {
      print('  • \$w');
    }
    print('');
  });
}`}
          expectedOutput={`■ レイアウト系\n  • Column    - 縦方向に子を並べる\n  • Row       - 横方向に子を並べる\n  • Stack     - 子を重ねて配置\n  • Container - パディング・マージン・色\n  • Padding   - 余白を追加\n  • Center    - 中央に配置\n\n■ 表示系\n  • Text      - テキスト表示\n  • Image     - 画像表示\n  • Icon      - アイコン表示\n  • Card      - カード風の枠\n  • ListTile  - リストの1行\n\n■ インタラクション系\n  • ElevatedButton - 立体的なボタン\n  • TextButton     - テキストボタン\n  • GestureDetector - タップ・スワイプ検出\n  • TextField      - テキスト入力\n  • Switch         - オン/オフスイッチ\n`}
        />
      </section>
      <LessonCompleteButton lessonId="widget-basics" categoryId="flutter-intro" />
      <LessonNav lessons={lessons} currentId="widget-basics" basePath="/learn/flutter-intro" />
    </div>
  );
}
