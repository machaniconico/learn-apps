import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericClassesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">ジェネリクス</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ジェネリッククラス</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            ジェネリッククラスを使って型安全なデータ構造を実装できます。
            Dartの標準ライブラリの<code className="text-teal-300">List&lt;E&gt;</code>・<code className="text-teal-300">Map&lt;K,V&gt;</code>もジェネリッククラスです。
            独自のコレクションやコンテナクラスを作るのに役立ちます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型安全なキュー</h2>
        <p className="text-gray-400 mb-4">
          ジェネリクスを使って任意の型を格納できる型安全なキューを実装します。
        </p>
        <DartEditor
          defaultCode={`class Queue<E> {
  final List<E> _items = [];

  void enqueue(E item) => _items.add(item);

  E dequeue() {
    if (_items.isEmpty) throw StateError('キューが空です');
    return _items.removeAt(0);
  }

  E get front {
    if (_items.isEmpty) throw StateError('キューが空です');
    return _items.first;
  }

  bool get isEmpty => _items.isEmpty;
  int get length => _items.length;

  @override
  String toString() => 'Queue\$_items';
}

void main() {
  // int キュー
  final q = Queue<int>();
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  print('キュー: \$q');
  print('先頭: \${q.front}');
  print('取り出し: \${q.dequeue()}');
  print('取り出し: \${q.dequeue()}');
  print('残り: \$q');

  // String キュー
  final tasks = Queue<String>();
  tasks.enqueue('タスク1');
  tasks.enqueue('タスク2');
  tasks.enqueue('タスク3');

  while (!tasks.isEmpty) {
    print('処理: \${tasks.dequeue()}');
  }
}`}
          expectedOutput={`キュー: Queue[1, 2, 3]
先頭: 1
取り出し: 1
取り出し: 2
残り: Queue[3]
処理: タスク1
処理: タスク2
処理: タスク3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックなObservable</h2>
        <p className="text-gray-400 mb-4">
          ジェネリクスを使ってObserverパターンを型安全に実装できます。
        </p>
        <DartEditor
          defaultCode={`class Observable<T> {
  T _value;
  final List<void Function(T)> _listeners = [];

  Observable(this._value);

  T get value => _value;

  set value(T newValue) {
    _value = newValue;
    for (final listener in _listeners) {
      listener(newValue);
    }
  }

  void addListener(void Function(T) listener) {
    _listeners.add(listener);
  }

  void removeListener(void Function(T) listener) {
    _listeners.remove(listener);
  }
}

void main() {
  final counter = Observable<int>(0);
  final name = Observable<String>('');

  counter.addListener((v) => print('カウンター変化: \$v'));
  counter.addListener((v) { if (v >= 3) print('  -> 3以上に達しました!'); });

  name.addListener((v) => print('名前変化: "\$v"'));

  counter.value = 1;
  counter.value = 2;
  counter.value = 3;
  name.value = 'Dart';
  name.value = 'Flutter';
}`}
          expectedOutput={`カウンター変化: 1
カウンター変化: 2
カウンター変化: 3
  -> 3以上に達しました!
名前変化: "Dart"
名前変化: "Flutter"`}
        />
      </section>

      <LessonCompleteButton lessonId="generic-classes" categoryId="generics" />
      <LessonNav lessons={lessons} currentId="generic-classes" basePath="/learn/generics" />
    </div>
  );
}
