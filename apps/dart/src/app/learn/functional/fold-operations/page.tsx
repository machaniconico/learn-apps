import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functional");

export default function FoldOperationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数型プログラミング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">fold操作</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-purple-300">fold()</strong>はreduceの一般化で、初期値と結合関数を使ってコレクションを一つの値に集約します。
            reduceと違い空のリストでもエラーにならず、戻り値の型を入力と変えることもできます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">fold の基本と reduce との比較</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">fold(initialValue, (acc, element) =&gt; ...)</code>で任意の型への集約ができます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final numbers = [1, 2, 3, 4, 5];

  // fold で合計（初期値 0）
  final sum = numbers.fold(0, (acc, n) => acc + n);
  print('合計: \$sum');

  // fold で積（初期値 1）
  final product = numbers.fold(1, (acc, n) => acc * n);
  print('積: \$product');

  // fold で文字列変換（型が変わる）
  final str = numbers.fold('', (acc, n) => '\$acc\$n-');
  print('文字列化: \$str');

  // 空リストでもfoldはOK
  final emptySum = <int>[].fold(0, (acc, n) => acc + n);
  print('空リストの合計: \$emptySum');

  // 最大値（fold版）
  final max = numbers.fold(
    numbers.first,
    (acc, n) => n > acc ? n : acc,
  );
  print('最大値: \$max');

  // 統計情報をMapとして集約
  final stats = numbers.fold(
    {'sum': 0, 'min': numbers.first, 'max': numbers.first},
    (Map<String, int> acc, int n) => {
      'sum': acc['sum']! + n,
      'min': n < acc['min']! ? n : acc['min']!,
      'max': n > acc['max']! ? n : acc['max']!,
    },
  );
  print('統計: \$stats');
}`}
          expectedOutput={`合計: 15
積: 120
文字列化: 1-2-3-4-5-
空リストの合計: 0
最大値: 5
統計: {sum: 15, min: 1, max: 5}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">fold を使ったグループ化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-300">fold</code>でリストをMapに変換したり、グループ化したりできます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final words = ['apple', 'banana', 'avocado', 'blueberry', 'cherry', 'apricot'];

  // 先頭文字でグループ化
  final grouped = words.fold(
    <String, List<String>>{},
    (Map<String, List<String>> acc, String word) {
      final key = word[0];
      return {
        ...acc,
        key: [...(acc[key] ?? []), word],
      };
    },
  );

  for (final entry in grouped.entries..sort((a, b) => a.key.compareTo(b.key))) {
    print('\${entry.key}: \${entry.value}');
  }

  print('---');

  // 頻度カウント
  final text = 'dart flutter dart async dart flutter';
  final freq = text.split(' ').fold(
    <String, int>{},
    (Map<String, int> acc, String word) =>
        {...acc, word: (acc[word] ?? 0) + 1},
  );

  freq.entries
      .toList()
      ..sort((a, b) => b.value.compareTo(a.value))
      ..forEach((e) => print('\${e.key}: \${e.value}回'));
}`}
          expectedOutput={`a: [apple, avocado, apricot]
b: [banana, blueberry]
c: [cherry]
---
dart: 3回
flutter: 2回
async: 1回`}
        />
      </section>

      <LessonCompleteButton lessonId="fold-operations" categoryId="functional" />
      <LessonNav lessons={lessons} currentId="fold-operations" basePath="/learn/functional" />
    </div>
  );
}
