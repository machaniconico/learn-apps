import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericFunctionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">ジェネリクス</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ジェネリック関数</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-teal-300">ジェネリック関数</strong>は型パラメータを持つ関数で、異なる型に対して同じアルゴリズムを適用できます。
            呼び出し時に型を推論するか、明示的に<code className="text-teal-300">func&lt;Type&gt;()</code>と指定します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリック関数の定義と呼び出し</h2>
        <p className="text-gray-400 mb-4">
          関数名の後に<code className="text-teal-300">&lt;T&gt;</code>を書いて型パラメータを宣言します。
        </p>
        <DartEditor
          defaultCode={`// 型パラメータを持つ汎用関数
T? safeGet<T>(List<T> list, int index) {
  if (index < 0 || index >= list.length) return null;
  return list[index];
}

List<T> repeat<T>(T value, int times) =>
    List.generate(times, (_) => value);

Map<K, V> zipToMap<K, V>(List<K> keys, List<V> values) {
  final result = <K, V>{};
  final len = keys.length < values.length ? keys.length : values.length;
  for (int i = 0; i < len; i++) {
    result[keys[i]] = values[i];
  }
  return result;
}

void main() {
  // safeGet
  final nums = [10, 20, 30];
  print(safeGet(nums, 1));    // 20
  print(safeGet(nums, 10));   // null

  final strs = ['a', 'b', 'c'];
  print(safeGet(strs, 0));    // a
  print(safeGet(strs, -1));   // null

  // repeat
  print(repeat(0, 5));
  print(repeat('Dart', 3));
  print(repeat(true, 4));

  // zipToMap
  final keys = ['name', 'age', 'city'];
  final values = ['太郎', 25, '東京'];
  print(zipToMap(keys, values));
}`}
          expectedOutput={`20
null
a
null
[0, 0, 0, 0, 0]
[Dart, Dart, Dart]
[true, true, true, true]
{name: 太郎, age: 25, city: 東京}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">高階ジェネリック関数</h2>
        <p className="text-gray-400 mb-4">
          ジェネリック関数と高階関数を組み合わせた強力なユーティリティを作れます。
        </p>
        <DartEditor
          defaultCode={`// 型変換を伴うmap
List<R> mapList<T, R>(List<T> list, R Function(T) fn) =>
    list.map(fn).toList();

// グループ化
Map<K, List<T>> groupBy<T, K>(List<T> list, K Function(T) keyFn) {
  final result = <K, List<T>>{};
  for (final item in list) {
    final key = keyFn(item);
    (result[key] ??= []).add(item);
  }
  return result;
}

// partition
(List<T>, List<T>) partition<T>(List<T> list, bool Function(T) pred) {
  final trueList = <T>[];
  final falseList = <T>[];
  for (final item in list) {
    (pred(item) ? trueList : falseList).add(item);
  }
  return (trueList, falseList);
}

void main() {
  final numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // mapList: int -> String
  final strs = mapList(numbers, (n) => 'item\$n');
  print(strs.take(4).toList());

  // groupBy
  final grouped = groupBy(numbers, (n) => n % 3 == 0 ? '3の倍数' : n % 2 == 0 ? '偶数' : '奇数');
  for (final e in grouped.entries) {
    print('\${e.key}: \${e.value}');
  }

  // partition
  final (evens, odds) = partition(numbers, (n) => n.isEven);
  print('偶数: \$evens');
  print('奇数: \$odds');
}`}
          expectedOutput={`[item1, item2, item3, item4]
奇数: [1, 3, 5, 7, 9]
偶数: [2, 4, 8, 10]
3の倍数: [6]
偶数: [2, 4, 6, 8, 10]
奇数: [1, 3, 5, 7, 9]`}
        />
      </section>

      <LessonCompleteButton lessonId="generic-functions" categoryId="generics" />
      <LessonNav lessons={lessons} currentId="generic-functions" basePath="/learn/generics" />
    </div>
  );
}
