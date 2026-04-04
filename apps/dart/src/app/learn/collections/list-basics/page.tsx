import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function ListBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">コレクション</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">リスト</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-cyan-300">List</strong>はDartで最もよく使うコレクションで、順序付きの要素を保持します。
            同じ要素を複数持てて、インデックスでアクセスします。
            <code className="text-cyan-300">List&lt;T&gt;</code>と型を指定することで型安全に使えます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">List の作成と基本操作</h2>
        <p className="text-gray-400 mb-4">
          リテラル記法や<code className="text-cyan-300">List.generate()</code>などで作成し、<code className="text-cyan-300">add</code>・<code className="text-cyan-300">remove</code>で要素を操作します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // リストの作成
  final fruits = ['りんご', 'バナナ', 'みかん'];
  final numbers = <int>[1, 2, 3, 4, 5];
  final empty = <String>[];

  // 追加
  fruits.add('ぶどう');
  fruits.addAll(['メロン', 'スイカ']);
  fruits.insert(1, 'いちご'); // インデックス1に挿入

  print('fruits: \$fruits');
  print('長さ: \${fruits.length}');

  // アクセス
  print('最初: \${fruits.first}');
  print('最後: \${fruits.last}');
  print('インデックス2: \${fruits[2]}');

  // 削除
  fruits.remove('バナナ');
  fruits.removeAt(0);
  print('削除後: \$fruits');

  // List.generate
  final squares = List.generate(5, (i) => (i + 1) * (i + 1));
  print('二乗: \$squares');

  // List.filled
  final zeros = List.filled(4, 0);
  print('ゼロリスト: \$zeros');
}`}
          expectedOutput={`fruits: [りんご, いちご, バナナ, みかん, ぶどう, メロン, スイカ]
長さ: 7
最初: りんご
最後: スイカ
インデックス2: バナナ
削除後: [いちご, みかん, ぶどう, メロン, スイカ]
二乗: [1, 4, 9, 16, 25]
ゼロリスト: [0, 0, 0, 0]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">List の検索と変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">contains</code>・<code className="text-cyan-300">indexOf</code>・<code className="text-cyan-300">any</code>・<code className="text-cyan-300">every</code>で検索し、<code className="text-cyan-300">map</code>・<code className="text-cyan-300">toSet</code>で変換します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];

  // 検索
  print('含む(5): \${numbers.contains(5)}');
  print('インデックス(4): \${numbers.indexOf(4)}');
  print('全偶数か: \${numbers.every((n) => n % 2 == 0)}');
  print('偶数あり: \${numbers.any((n) => n % 2 == 0)}');
  print('10以上あり: \${numbers.any((n) => n >= 10)}');

  // 変換
  final doubled = numbers.map((n) => n * 2).toList();
  print('2倍: \$doubled');

  final unique = numbers.toSet().toList()..sort();
  print('重複除去: \$unique');

  // sublist
  final sub = numbers.sublist(2, 6);
  print('部分リスト: \$sub');

  // reversed
  print('逆順: \${numbers.reversed.toList()}');

  // join
  final words = ['Dart', 'is', 'awesome'];
  print(words.join(' '));
}`}
          expectedOutput={`含む(5): true
インデックス(4): 2
全偶数か: false
偶数あり: true
10以上あり: false
2倍: [6, 2, 8, 2, 10, 18, 4, 12, 10, 6]
重複除去: [1, 2, 3, 4, 5, 6, 9]
部分リスト: [4, 1, 5, 9]
逆順: [3, 5, 6, 2, 9, 5, 1, 4, 1, 3]
Dart is awesome`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">不変リストとコピー</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">List.unmodifiable()</code>で変更不可なリストを作成し、<code className="text-cyan-300">List.from()</code>でコピーを作れます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final original = [1, 2, 3, 4, 5];

  // 不変リスト
  final immutable = List.unmodifiable(original);
  print('不変リスト: \$immutable');

  try {
    immutable.add(6); // エラー
  } catch (e) {
    print('変更不可: \${e.runtimeType}');
  }

  // コピー
  final copy = List.from(original);
  copy.add(6);
  print('元: \$original');   // 変更されていない
  print('コピー: \$copy');

  // スプレッドによるコピー
  final spread = [...original, 10, 11];
  print('スプレッド: \$spread');

  // const リスト
  const constants = [1, 2, 3];
  print('const: \$constants');

  // 2次元リスト
  final matrix = List.generate(3, (i) =>
    List.generate(3, (j) => i * 3 + j + 1));
  for (final row in matrix) {
    print(row);
  }
}`}
          expectedOutput={`不変リスト: [1, 2, 3, 4, 5]
変更不可: UnsupportedError
元: [1, 2, 3, 4, 5]
コピー: [1, 2, 3, 4, 5, 6]
スプレッド: [1, 2, 3, 4, 5, 10, 11]
const: [1, 2, 3]
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]`}
        />
      </section>

      <LessonCompleteButton lessonId="list-basics" categoryId="collections" />
      <LessonNav lessons={lessons} currentId="list-basics" basePath="/learn/collections" />
    </div>
  );
}
