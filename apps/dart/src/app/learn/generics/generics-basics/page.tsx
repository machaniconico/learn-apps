import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericsBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">ジェネリクス</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ジェネリクスの基本</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-teal-300">ジェネリクス</strong>は型パラメータを使って、異なる型で動作する汎用コードを書く機能です。
            <code className="text-teal-300">List&lt;T&gt;</code>や<code className="text-teal-300">Map&lt;K, V&gt;</code>はジェネリクスの代表例です。
            型安全性を保ちながらコードの再利用性を高めます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型パラメータの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">&lt;T&gt;</code>で型パラメータを宣言します。慣習的にT（Type）、K（Key）、V（Value）、E（Element）が使われます。
        </p>
        <DartEditor
          defaultCode={`// ジェネリッククラス
class Box<T> {
  T? _value;

  void put(T value) => _value = value;
  T? get() => _value;
  bool get isEmpty => _value == null;

  @override
  String toString() => 'Box<\${T}>(\${_value ?? 'empty'})';
}

// ジェネリック関数
T identity<T>(T value) => value;

T? firstOrNull<T>(List<T> list) =>
    list.isEmpty ? null : list.first;

void main() {
  // 型を指定して使用
  final intBox = Box<int>();
  intBox.put(42);
  print(intBox);
  print('値: \${intBox.get()}');

  final strBox = Box<String>();
  strBox.put('Dart');
  print(strBox);

  // 型推論
  final autoBox = Box<List<int>>();
  autoBox.put([1, 2, 3]);
  print(autoBox);

  // ジェネリック関数
  print(identity(42));
  print(identity('hello'));
  print(firstOrNull([10, 20, 30]));
  print(firstOrNull(<int>[]));
}`}
          expectedOutput={`Box<int>(42)
値: 42
Box<String>(Dart)
Box<List<int>>([1, 2, 3])
42
hello
10
null`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数の型パラメータ</h2>
        <p className="text-gray-400 mb-4">
          複数の型パラメータを使って、キーと値の型を独立して指定できます。
        </p>
        <DartEditor
          defaultCode={`class Pair<A, B> {
  final A first;
  final B second;

  const Pair(this.first, this.second);

  Pair<B, A> swap() => Pair(second, first);

  @override
  String toString() => '(\$first, \$second)';
}

class Either<L, R> {
  final L? _left;
  final R? _right;

  Either.left(L value) : _left = value, _right = null;
  Either.right(R value) : _left = null, _right = value;

  bool get isLeft => _left != null;
  bool get isRight => _right != null;

  T fold<T>(T Function(L) onLeft, T Function(R) onRight) =>
      isLeft ? onLeft(_left as L) : onRight(_right as R);
}

void main() {
  final pair = Pair('Dart', 42);
  print('ペア: \$pair');
  print('スワップ: \${pair.swap()}');

  final results = [
    Either<String, int>.right(42),
    Either<String, int>.left('エラー発生'),
    Either<String, int>.right(100),
  ];

  for (final r in results) {
    final msg = r.fold(
      (err) => 'エラー: \$err',
      (val) => '成功: \$val',
    );
    print(msg);
  }
}`}
          expectedOutput={`ペア: (Dart, 42)
スワップ: (42, Dart)
成功: 42
エラー: エラー発生
成功: 100`}
        />
      </section>

      <LessonCompleteButton lessonId="generics-basics" categoryId="generics" />
      <LessonNav lessons={lessons} currentId="generics-basics" basePath="/learn/generics" />
    </div>
  );
}
