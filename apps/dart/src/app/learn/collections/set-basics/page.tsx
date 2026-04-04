import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function SetBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">コレクション</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">セット</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-cyan-300">Set</strong>は重複を許さないコレクションです。
            同じ値を複数追加しても一つだけ保持されます。
            要素の存在確認が高速で、集合演算（和集合・積集合・差集合）が使えます。
            順序は保証されません（LinkedHashSetは挿入順を保持）。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Set の作成と基本操作</h2>
        <p className="text-gray-400 mb-4">
          波括弧<code className="text-cyan-300">{"{}"}</code>または<code className="text-cyan-300">Set()</code>で作成します。重複は自動的に除去されます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // Setの作成
  final colors = <String>{'赤', '青', '緑'};
  final numbers = {1, 2, 3, 4, 5};

  // 重複を追加しても無視される
  colors.add('赤'); // 既に存在
  colors.add('黄');
  print('colors: \$colors');
  print('長さ: \${colors.length}');

  // 含む確認
  print('赤を含む: \${colors.contains('赤')}');
  print('紫を含む: \${colors.contains('紫')}');

  // 削除
  colors.remove('青');
  print('削除後: \$colors');

  // リストから重複を除去
  final withDupes = [1, 2, 2, 3, 3, 3, 4];
  final unique = withDupes.toSet().toList();
  print('重複除去: \$unique');

  // 空のSet（{} はMapになるので注意）
  final emptySet = <int>{};
  emptySet.addAll([10, 20, 30, 20, 10]);
  print('空から追加: \$emptySet');
}`}
          expectedOutput={`colors: {赤, 青, 緑, 黄}
長さ: 4
赤を含む: true
紫を含む: false
削除後: {赤, 緑, 黄}
重複除去: [1, 2, 3, 4]
空から追加: {10, 20, 30}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">集合演算</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">union</code>（和集合）・<code className="text-cyan-300">intersection</code>（積集合）・<code className="text-cyan-300">difference</code>（差集合）を使えます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final setA = {1, 2, 3, 4, 5};
  final setB = {3, 4, 5, 6, 7};

  // 和集合: A ∪ B（どちらかに含まれる）
  final union = setA.union(setB);
  print('和集合: \$union');

  // 積集合: A ∩ B（両方に含まれる）
  final intersection = setA.intersection(setB);
  print('積集合: \$intersection');

  // 差集合: A - B（AにあってはあってはあってはあってはあってはあってBにないもの）
  final difference = setA.difference(setB);
  print('差集合(A-B): \$difference');
  print('差集合(B-A): \${setB.difference(setA)}');

  // containsAll: 全て含まれるか
  print('AはBを含む: \${setA.containsAll(setB)}');
  print('AはBの部分集合か: \${setB.containsAll(setA)}');

  // 実用例: 共通の興味を持つユーザー
  final aliceHobbies = {'読書', 'プログラミング', '料理', '音楽'};
  final bobHobbies = {'プログラミング', 'ゲーム', '音楽', '映画'};

  final common = aliceHobbies.intersection(bobHobbies);
  final allHobbies = aliceHobbies.union(bobHobbies);
  print('共通の趣味: \$common');
  print('全趣味: \$allHobbies');
}`}
          expectedOutput={`和集合: {1, 2, 3, 4, 5, 6, 7}
積集合: {3, 4, 5}
差集合(A-B): {1, 2}
差集合(B-A): {6, 7}
AはBを含む: false
AはBの部分集合か: false
共通の趣味: {プログラミング, 音楽}
全趣味: {読書, プログラミング, 料理, 音楽, ゲーム, 映画}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Set の実用的な使い方</h2>
        <p className="text-gray-400 mb-4">
          重複チェック、ユニークなIDの管理、タグシステムなど実用的なパターンを確認します。
        </p>
        <DartEditor
          defaultCode={`class TagSystem {
  final Set<String> _allTags = {};
  final Map<String, Set<String>> _itemTags = {};

  void addTags(String item, List<String> tags) {
    _itemTags[item] = Set.from(tags);
    _allTags.addAll(tags);
  }

  Set<String> tagsFor(String item) =>
      _itemTags[item] ?? {};

  List<String> itemsWithTag(String tag) =>
      _itemTags.entries
          .where((e) => e.value.contains(tag))
          .map((e) => e.key)
          .toList();

  Set<String> get allTags => Set.unmodifiable(_allTags);
}

void main() {
  final tags = TagSystem();
  tags.addTags('記事1', ['Dart', 'Flutter', 'モバイル']);
  tags.addTags('記事2', ['Dart', 'サーバー', 'バックエンド']);
  tags.addTags('記事3', ['Flutter', 'モバイル', 'UI']);

  print('全タグ: \${tags.allTags}');
  print('記事1のタグ: \${tags.tagsFor('記事1')}');
  print('Dartを含む記事: \${tags.itemsWithTag('Dart')}');
  print('モバイルを含む記事: \${tags.itemsWithTag('モバイル')}');
}`}
          expectedOutput={`全タグ: {Dart, Flutter, モバイル, サーバー, バックエンド, UI}
記事1のタグ: {Dart, Flutter, モバイル}
Dartを含む記事: [記事1, 記事2]
モバイルを含む記事: [記事1, 記事3]`}
        />
      </section>

      <LessonCompleteButton lessonId="set-basics" categoryId="collections" />
      <LessonNav lessons={lessons} currentId="set-basics" basePath="/learn/collections" />
    </div>
  );
}
