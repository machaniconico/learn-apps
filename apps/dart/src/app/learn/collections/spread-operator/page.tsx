import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function SpreadOperatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">コレクション</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">スプレッド演算子</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-cyan-300">スプレッド演算子（...）</strong>はコレクションの全要素を別のコレクションに展開します。
            <code className="text-cyan-300">...?</code>はnullableなコレクションに使え、nullの場合は何も展開しません。
            リスト・セット・マップのリテラル内で使えます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">... スプレッド演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">...</code>でコレクションの全要素を展開して新しいコレクションを作成します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final list1 = [1, 2, 3];
  final list2 = [4, 5, 6];

  // リストの結合
  final combined = [...list1, ...list2];
  print('結合: \$combined');

  // 要素と組み合わせ
  final withExtra = [0, ...list1, 10, ...list2, 20];
  print('追加あり: \$withExtra');

  // セットのスプレッド
  final setA = {1, 2, 3};
  final setB = {3, 4, 5};
  final mergedSet = {...setA, ...setB};
  print('Set結合: \$mergedSet');

  // マップのスプレッド
  final defaults = {'color': 'blue', 'size': 'medium'};
  final overrides = {'color': 'red', 'weight': 'heavy'};
  final merged = {...defaults, ...overrides};
  print('Map結合: \$merged');

  // コピーとして使う
  final original = [1, 2, 3];
  final copy = [...original];
  copy.add(4);
  print('元: \$original');
  print('コピー: \$copy');
}`}
          expectedOutput={`結合: [1, 2, 3, 4, 5, 6]
追加あり: [0, 1, 2, 3, 10, 4, 5, 6, 20]
Set結合: {1, 2, 3, 4, 5}
Map結合: {color: red, size: medium, weight: heavy}
元: [1, 2, 3]
コピー: [1, 2, 3, 4]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">...? null スプレッド演算子</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">...?</code>はnullableなコレクションに使え、nullの場合は何も展開しません。
        </p>
        <DartEditor
          defaultCode={`List<String> buildMenu({
  List<String>? extras,
  bool includeDesert = false,
}) {
  final desserts = includeDesert ? ['ケーキ', 'アイス'] : null;

  return [
    'スープ',
    'サラダ',
    ...?extras,   // null なら何も展開しない
    'メイン料理',
    ...?desserts, // null なら何も展開しない
    'ドリンク',
  ];
}

void main() {
  // extras なし、デザートなし
  print('基本メニュー:');
  print(buildMenu());

  print('');

  // extras あり
  print('追加あり:');
  print(buildMenu(extras: ['パン', 'スープのおかわり']));

  print('');

  // デザートあり
  print('デザートあり:');
  print(buildMenu(includeDesert: true));

  print('');

  // null スプレッドの直接確認
  List<int>? maybeList;
  final result = [1, 2, ...?maybeList, 3];
  print('nullスプレッド: \$result');

  maybeList = [10, 20];
  final result2 = [1, 2, ...?maybeList, 3];
  print('非nullスプレッド: \$result2');
}`}
          expectedOutput={`基本メニュー:
[スープ, サラダ, メイン料理, ドリンク]

追加あり:
[スープ, サラダ, パン, スープのおかわり, メイン料理, ドリンク]

デザートあり:
[スープ, サラダ, メイン料理, ケーキ, アイス, ドリンク]

nullスプレッド: [1, 2, 3]
非nullスプレッド: [1, 2, 10, 20, 3]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">スプレッドの実用パターン</h2>
        <p className="text-gray-400 mb-4">
          設定のマージ、リストの合成、Mapの上書きなど実用的なパターンを確認します。
        </p>
        <DartEditor
          defaultCode={`Map<String, dynamic> mergeConfig(
  Map<String, dynamic> base,
  Map<String, dynamic> override,
) {
  return {...base, ...override};
}

List<int> flatten(List<List<int>> nested) {
  return [for (final list in nested) ...list];
}

void main() {
  // 設定のマージ
  final baseConfig = {
    'host': 'localhost',
    'port': 3000,
    'debug': false,
    'timeout': 30,
  };

  final devConfig = {
    'debug': true,
    'port': 8080,
  };

  final merged = mergeConfig(baseConfig, devConfig);
  print('マージ設定: \$merged');

  print('');

  // ネストリストの平坦化
  final nested = [[1, 2], [3, 4], [5, 6]];
  print('平坦化: \${flatten(nested)}');

  // 複数リストの選択的結合
  final fruits = ['りんご', 'バナナ'];
  final vegetables = ['にんじん', 'じゃがいも'];
  final grains = ['米', '小麦'];

  final market = [
    ...fruits,
    ...vegetables,
    ...grains,
  ];
  print('市場: \$market');
}`}
          expectedOutput={`マージ設定: {host: localhost, port: 8080, debug: true, timeout: 30}

平坦化: [1, 2, 3, 4, 5, 6]
市場: [りんご, バナナ, にんじん, じゃがいも, 米, 小麦]`}
        />
      </section>

      <LessonCompleteButton lessonId="spread-operator" categoryId="collections" />
      <LessonNav lessons={lessons} currentId="spread-operator" basePath="/learn/collections" />
    </div>
  );
}
