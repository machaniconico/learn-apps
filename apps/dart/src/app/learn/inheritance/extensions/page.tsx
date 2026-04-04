import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function ExtensionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">継承・Mixin</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">拡張メソッド</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">拡張メソッド（Extension Methods）</strong>は、既存のクラスを変更せずに新しいメソッドを追加する機能です。
            <code className="text-red-300">extension</code>キーワードで定義し、標準ライブラリのクラスや外部パッケージのクラスにも機能を追加できます。
            Dart 2.7から導入されました。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">extension の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">extension 名前 on 型</code>の形式で定義します。メソッド・ゲッターを追加できます。
        </p>
        <DartEditor
          defaultCode={`extension StringExtension on String {
  // メソッドの追加
  String capitalize() {
    if (isEmpty) return this;
    return '\${this[0].toUpperCase()}\${substring(1)}';
  }

  String truncate(int maxLength) {
    if (length <= maxLength) return this;
    return '\${substring(0, maxLength)}...';
  }

  bool get isPalindrome {
    final cleaned = toLowerCase().replaceAll(' ', '');
    return cleaned == cleaned.split('').reversed.join();
  }

  int get wordCount =>
      trim().isEmpty ? 0 : trim().split(RegExp(r'\\s+')).length;
}

void main() {
  print('hello'.capitalize());
  print('Dart Programming Language'.truncate(10));
  print('racecar'.isPalindrome);
  print('hello'.isPalindrome);
  print('Hello Dart World'.wordCount);

  // メソッドチェーンも可能
  print('  hello world  '.trim().capitalize());
}`}
          expectedOutput={`Hello
Dart Pro...
true
false
3
Hello world`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">数値・リストへの拡張</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">int</code>や<code className="text-red-300">List</code>などの組み込み型にも拡張メソッドを追加できます。
        </p>
        <DartEditor
          defaultCode={`extension IntExtension on int {
  bool get isEven => this % 2 == 0;
  bool get isOdd => this % 2 != 0;
  int get factorial {
    if (this <= 1) return 1;
    return this * (this - 1).factorial;
  }
  String get paddedString => toString().padLeft(3, '0');
}

extension ListExtension<T> on List<T> {
  List<T> get shuffled {
    final copy = List<T>.from(this);
    copy.sort((a, b) => DateTime.now().millisecond % 2 == 0 ? -1 : 1);
    return copy;
  }

  T? get secondOrNull => length >= 2 ? this[1] : null;

  List<List<T>> chunks(int size) {
    final result = <List<T>>[];
    for (int i = 0; i < length; i += size) {
      result.add(sublist(i, i + size > length ? length : i + size));
    }
    return result;
  }
}

void main() {
  print(5.isEven);
  print(7.isOdd);
  print(5.factorial);
  print(42.paddedString);

  final list = [1, 2, 3, 4, 5, 6, 7];
  print(list.secondOrNull);
  print(list.chunks(3));
}`}
          expectedOutput={`false
true
120
042
2
[[1, 2, 3], [4, 5, 6], [7]]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">拡張メソッドとジェネリクス</h2>
        <p className="text-gray-400 mb-4">
          型パラメータを持つ拡張メソッドで、汎用的な機能を既存の型に追加できます。
        </p>
        <DartEditor
          defaultCode={`extension NullableExtension<T> on T? {
  T orDefault(T defaultValue) => this ?? defaultValue;

  bool get isNull => this == null;
  bool get isNotNull => this != null;

  T? takeIf(bool Function(T) predicate) {
    if (this != null && predicate(this as T)) {
      return this;
    }
    return null;
  }
}

extension MapExtension<K, V> on Map<K, V> {
  Map<K, V> where(bool Function(K, V) predicate) {
    return Map.fromEntries(
      entries.where((e) => predicate(e.key, e.value)),
    );
  }

  void forEachEntry(void Function(K, V) action) {
    forEach(action);
  }
}

void main() {
  String? maybeNull;
  print(maybeNull.orDefault('デフォルト値'));
  print(maybeNull.isNull);

  String? hasValue = 'Dart';
  print(hasValue.orDefault('なし'));
  print(hasValue.takeIf((s) => s.length > 2));
  print(hasValue.takeIf((s) => s.length > 10));

  final scores = {'Alice': 95, 'Bob': 60, 'Carol': 88, 'Dave': 45};
  final passing = scores.where((k, v) => v >= 70);
  print('合格者: \${passing.keys.toList()}');
}`}
          expectedOutput={`デフォルト値
true
Dart
Dart
null
合格者: [Alice, Carol]`}
        />
      </section>

      <LessonCompleteButton lessonId="extensions" categoryId="inheritance" />
      <LessonNav lessons={lessons} currentId="extensions" basePath="/learn/inheritance" />
    </div>
  );
}
