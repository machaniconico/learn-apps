import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function AssertionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">アサーション</h1>
        <p className="text-gray-400">assert文を使った開発時の条件チェックを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">assertとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="text-orange-300">assert</code>文は開発中にプログラムの前提条件を検証します。
          条件が<code className="text-orange-300">false</code>の場合は<code className="text-orange-300">AssertionError</code>をスローします。
          <strong className="text-gray-200">リリースビルドでは無視</strong>されるため、パフォーマンスに影響しません。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-orange-300">assert(condition)</code> 条件がfalseならエラー</li>
          <li>• <code className="text-orange-300">assert(condition, message)</code> エラーメッセージ付き</li>
          <li>• デバッグモードでのみ実行される（リリースビルドでは無視）</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">assertの基本的な使い方</h2>
        <p className="text-gray-400 mb-4">
          クラスの前提条件検証にassertを使います。
        </p>
        <DartEditor
          defaultCode={`class Rectangle {
  final double width;
  final double height;

  Rectangle(this.width, this.height) {
    assert(width > 0, '幅は正の数である必要があります (width=\$width)');
    assert(height > 0, '高さは正の数である必要があります (height=\$height)');
  }

  double get area => width * height;
  double get perimeter => 2 * (width + height);
}

class Stack<T> {
  final List<T> _items = [];

  void push(T item) {
    _items.add(item);
  }

  T pop() {
    assert(_items.isNotEmpty, 'スタックが空です');
    return _items.removeLast();
  }

  T peek() {
    assert(_items.isNotEmpty, 'スタックが空です');
    return _items.last;
  }

  bool get isEmpty => _items.isEmpty;
  int get size => _items.length;
}

void main() {
  final rect = Rectangle(5, 3);
  print('面積: \${rect.area}');
  print('周長: \${rect.perimeter}');

  final stack = Stack<int>();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  print('\\nスタックサイズ: \${stack.size}');
  print('先頭: \${stack.peek()}');
  print('取り出し: \${stack.pop()}');
  print('取り出し後サイズ: \${stack.size}');
}`}
          expectedOutput={`面積: 15.0\n周長: 16.0\n\nスタックサイズ: 3\n先頭: 3\n取り出し: 3\n取り出し後サイズ: 2`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">不変条件（invariant）の検証</h2>
        <p className="text-gray-400 mb-4">
          クラスの不変条件をassertで継続的に検証するパターンです。
        </p>
        <DartEditor
          defaultCode={`class SortedList {
  final List<int> _items;

  SortedList(List<int> items) : _items = List.from(items)..sort() {
    assert(_isSorted(), '内部状態エラー: リストがソートされていません');
  }

  bool _isSorted() {
    for (int i = 0; i < _items.length - 1; i++) {
      if (_items[i] > _items[i + 1]) return false;
    }
    return true;
  }

  void add(int value) {
    // 二分探索で挿入位置を見つける
    int low = 0, high = _items.length;
    while (low < high) {
      final mid = (low + high) ~/ 2;
      if (_items[mid] < value) low = mid + 1;
      else high = mid;
    }
    _items.insert(low, value);
    assert(_isSorted(), '追加後にソート順が崩れました');
  }

  @override
  String toString() => _items.toString();
}

void main() {
  final sorted = SortedList([5, 2, 8, 1, 9]);
  print('初期: \$sorted');

  sorted.add(4);
  print('4追加後: \$sorted');

  sorted.add(0);
  print('0追加後: \$sorted');

  sorted.add(10);
  print('10追加後: \$sorted');
}`}
          expectedOutput={`初期: [1, 2, 5, 8, 9]\n4追加後: [1, 2, 4, 5, 8, 9]\n0追加後: [0, 1, 2, 4, 5, 8, 9]\n10追加後: [0, 1, 2, 4, 5, 8, 9, 10]`}
        />
      </section>
      <LessonCompleteButton lessonId="assertions" categoryId="debug" />
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/debug" />
    </div>
  );
}
