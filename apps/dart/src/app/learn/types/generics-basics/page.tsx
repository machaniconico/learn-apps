import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function GenericsBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">型システム</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ジェネリクス基礎</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-teal-300">ジェネリクス</strong>は型をパラメータとして受け取る機能で、型安全な汎用コードを書けます。
            <code className="text-teal-300">List&lt;T&gt;</code>・<code className="text-teal-300">Map&lt;K, V&gt;</code>のように型引数を指定します。
            ジェネリクスを使うと、同じロジックを異なる型に対して安全に再利用できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリクスの基本</h2>
        <p className="text-gray-400 mb-4">
          型パラメータ<code className="text-teal-300">T</code>を使って、あらゆる型に対応する汎用的なクラスや関数を定義します。
        </p>
        <DartEditor
          defaultCode={`// ジェネリクスクラス
class Box<T> {
  T value;
  Box(this.value);

  T get contents => value;
  void set contents(T newValue) => value = newValue;

  @override
  String toString() => 'Box<\${T}>(\$value)';
}

// ジェネリクス関数
T identity<T>(T value) => value;

List<T> repeat<T>(T item, int times) =>
    List.generate(times, (_) => item);

T? findFirst<T>(List<T> list, bool Function(T) predicate) {
  for (final item in list) {
    if (predicate(item)) return item;
  }
  return null;
}

void main() {
  final intBox = Box<int>(42);
  final strBox = Box<String>('Dart');
  final listBox = Box<List<int>>([1, 2, 3]);

  print(intBox);
  print(strBox);
  print(listBox);

  print(identity<String>('Hello'));
  print(identity<int>(100));

  print(repeat('⭐', 5));
  print(repeat(0, 4));

  final numbers = [1, 3, 5, 8, 12, 15];
  print(findFirst(numbers, (n) => n > 10));
}`}
          expectedOutput={`Box<int>(42)
Box<String>(Dart)
Box<List<int>>([1, 2, 3])
Hello
100
[⭐, ⭐, ⭐, ⭐, ⭐]
[0, 0, 0, 0]
12`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型制約（extends）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">T extends SomeClass</code>で型パラメータに制約を付け、特定のメソッドを使えるようにします。
        </p>
        <DartEditor
          defaultCode={`abstract class Comparable<T> {
  int compareTo(T other);
}

class SortedList<T extends Comparable<T>> {
  final List<T> _items = [];

  void add(T item) {
    _items.add(item);
    _items.sort((a, b) => a.compareTo(b));
  }

  T get min => _items.first;
  T get max => _items.last;
  List<T> get items => List.unmodifiable(_items);
}

class Score implements Comparable<Score> {
  String player;
  int points;

  Score(this.player, this.points);

  @override
  int compareTo(Score other) => points.compareTo(other.points);

  @override
  String toString() => '\$player: \$points';
}

void main() {
  final scores = SortedList<Score>();
  scores.add(Score('Alice', 95));
  scores.add(Score('Bob', 72));
  scores.add(Score('Carol', 88));
  scores.add(Score('Dave', 61));

  print('ランキング:');
  for (int i = 0; i < scores.items.length; i++) {
    print('  \${i + 1}位: \${scores.items[i]}');
  }
  print('最高スコア: \${scores.max}');
  print('最低スコア: \${scores.min}');
}`}
          expectedOutput={`ランキング:
  1位: Dave: 61
  2位: Bob: 72
  3位: Carol: 88
  4位: Alice: 95
最高スコア: Alice: 95
最低スコア: Dave: 61`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数の型パラメータ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">Pair&lt;A, B&gt;</code>のように複数の型パラメータを持つクラスも定義できます。
        </p>
        <DartEditor
          defaultCode={`class Pair<A, B> {
  final A first;
  final B second;

  const Pair(this.first, this.second);

  Pair<B, A> get swapped => Pair(second, first);

  @override
  String toString() => '(\$first, \$second)';
}

class Result<T, E> {
  final T? value;
  final E? error;
  final bool isSuccess;

  const Result.success(T value)
      : value = value,
        error = null,
        isSuccess = true;

  const Result.failure(E error)
      : value = null,
        error = error,
        isSuccess = false;

  @override
  String toString() => isSuccess
      ? 'Success(\$value)'
      : 'Failure(\$error)';
}

Result<int, String> divide(int a, int b) {
  if (b == 0) return Result.failure('ゼロ除算エラー');
  return Result.success(a ~/ b);
}

void main() {
  final pair = Pair<String, int>('Alice', 95);
  print(pair);
  print(pair.swapped);

  print(divide(10, 3));
  print(divide(10, 0));

  final pairs = [
    Pair('A', 1),
    Pair('B', 2),
    Pair('C', 3),
  ];
  for (final p in pairs) {
    print('\${p.first} -> \${p.second}');
  }
}`}
          expectedOutput={`(Alice, 95)
(95, Alice)
Success(3)
Failure(ゼロ除算エラー)
A -> 1
B -> 2
C -> 3`}
        />
      </section>

      <LessonCompleteButton lessonId="generics-basics" categoryId="types" />
      <LessonNav lessons={lessons} currentId="generics-basics" basePath="/learn/types" />
    </div>
  );
}
