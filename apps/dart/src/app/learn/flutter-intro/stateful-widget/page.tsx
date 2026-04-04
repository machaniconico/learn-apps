import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flutter-intro");

export default function StatefulWidgetPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold">Flutter入門 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">StatefulWidget</h1>
        <p className="text-gray-400">状態を持ちUIが変化するStatefulWidgetの仕組みを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">StatefulWidgetとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          StatefulWidgetは状態（State）を持ち、状態が変化するとUIが再構築されます。
          <code className="text-blue-300">setState()</code>を呼ぶことで状態の変化をFlutterに通知します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• ウィジェットクラスと<code className="text-blue-300">State</code>クラスの2つで構成</li>
          <li>• <code className="text-blue-300">setState(() &#123; ... &#125;)</code>で状態を更新しUIを再描画</li>
          <li>• <code className="text-blue-300">initState()</code>で初期化、<code className="text-blue-300">dispose()</code>でクリーンアップ</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">状態管理の概念</h2>
        <p className="text-gray-400 mb-4">
          StatefulWidgetの状態管理をDartで概念的に表現します。
        </p>
        <DartEditor
          defaultCode={`// StatefulWidgetの概念コード

// Flutterの実際のコード:
// class CounterWidget extends StatefulWidget {
//   @override State<CounterWidget> createState() => _CounterWidgetState();
// }
//
// class _CounterWidgetState extends State<CounterWidget> {
//   int _count = 0;
//
//   void _increment() => setState(() => _count++);
//   void _decrement() => setState(() { if (_count > 0) _count--; });
//
//   @override
//   Widget build(BuildContext context) {
//     return Column(children: [
//       Text('カウント: \$_count', style: TextStyle(fontSize: 24)),
//       Row(children: [
//         ElevatedButton(onPressed: _decrement, child: Text('-')),
//         ElevatedButton(onPressed: _increment, child: Text('+')),
//       ]),
//     ]);
//   }
// }

// Dartで状態管理の概念を表現
class Counter {
  int _count = 0;
  final List<void Function(int)> _listeners = [];

  void addListener(void Function(int) listener) {
    _listeners.add(listener);
  }

  void _setState(void Function() action) {
    action();
    for (final listener in _listeners) {
      listener(_count);
    }
  }

  void increment() => _setState(() => _count++);
  void decrement() => _setState(() { if (_count > 0) _count--; });
  void reset() => _setState(() => _count = 0);

  int get count => _count;
}

void main() {
  final counter = Counter();

  // UIの再描画をシミュレート
  counter.addListener((count) => print('UI更新: カウント = \$count'));

  print('初期状態: \${counter.count}');
  counter.increment();
  counter.increment();
  counter.increment();
  counter.decrement();
  counter.reset();
}`}
          expectedOutput={`初期状態: 0\nUI更新: カウント = 1\nUI更新: カウント = 2\nUI更新: カウント = 3\nUI更新: カウント = 2\nUI更新: カウント = 0`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ライフサイクル</h2>
        <p className="text-gray-400 mb-4">
          StatefulWidgetのライフサイクルメソッドの実行順序です。
        </p>
        <DartEditor
          defaultCode={`// StatefulWidgetのライフサイクル概念
class WidgetLifecycle {
  final String name;
  bool _mounted = false;

  WidgetLifecycle(this.name);

  void initState() {
    _mounted = true;
    print('[\$name] initState: 初期化（API呼び出し、リスナー設定など）');
  }

  void didChangeDependencies() {
    print('[\$name] didChangeDependencies: 依存関係が変化した');
  }

  void build() {
    print('[\$name] build: UIを構築');
  }

  void setState() {
    if (_mounted) {
      print('[\$name] setState: 状態更新 → build()が再呼び出し');
      build();
    }
  }

  void deactivate() {
    print('[\$name] deactivate: ツリーから一時的に取り除かれた');
  }

  void dispose() {
    _mounted = false;
    print('[\$name] dispose: クリーンアップ（リスナー解除、Timerキャンセルなど）');
  }
}

void main() {
  print('=== StatefulWidget ライフサイクル ===\\n');
  final widget = WidgetLifecycle('MyWidget');

  widget.initState();
  widget.didChangeDependencies();
  widget.build();

  print('\\n--- ユーザー操作 ---');
  widget.setState();

  print('\\n--- 画面を離れる ---');
  widget.deactivate();
  widget.dispose();
}`}
          expectedOutput={`=== StatefulWidget ライフサイクル ===\n\n[MyWidget] initState: 初期化（API呼び出し、リスナー設定など）\n[MyWidget] didChangeDependencies: 依存関係が変化した\n[MyWidget] build: UIを構築\n\n--- ユーザー操作 ---\n[MyWidget] setState: 状態更新 → build()が再呼び出し\n[MyWidget] build: UIを構築\n\n--- 画面を離れる ---\n[MyWidget] deactivate: ツリーから一時的に取り除かれた\n[MyWidget] dispose: クリーンアップ（リスナー解除、Timerキャンセルなど）`}
        />
      </section>
      <LessonCompleteButton lessonId="stateful-widget" categoryId="flutter-intro" />
      <LessonNav lessons={lessons} currentId="stateful-widget" basePath="/learn/flutter-intro" />
    </div>
  );
}
