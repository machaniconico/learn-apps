import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function MapBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">コレクション</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">マップ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-cyan-300">Map</strong>はキーと値のペアを管理するコレクションです。
            キーは一意で、値にはキーを使ってアクセスします。
            <code className="text-cyan-300">Map&lt;K, V&gt;</code>と型を指定して型安全に使えます。
            JSONのような構造化データを扱うときに頻繁に使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Map の作成と基本操作</h2>
        <p className="text-gray-400 mb-4">
          波括弧リテラルや<code className="text-cyan-300">Map.fromEntries()</code>などで作成し、<code className="text-cyan-300">[]</code>演算子でアクセスします。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // Map の作成
  final scores = <String, int>{
    'Alice': 95,
    'Bob': 82,
    'Carol': 91,
  };

  // アクセス
  print('Alice: \${scores['Alice']}');
  print('Dave: \${scores['Dave']}'); // null（存在しない）

  // 追加・更新
  scores['Dave'] = 78;
  scores['Alice'] = 98; // 更新
  print('追加後: \$scores');

  // 削除
  scores.remove('Bob');
  print('削除後: \$scores');

  // キー・値の確認
  print('キー一覧: \${scores.keys.toList()}');
  print('値一覧: \${scores.values.toList()}');
  print('Alice存在: \${scores.containsKey('Alice')}');
  print('99点存在: \${scores.containsValue(99)}');

  // Map.fromEntries
  final pairs = [MapEntry('X', 1), MapEntry('Y', 2)];
  final fromEntries = Map.fromEntries(pairs);
  print('fromEntries: \$fromEntries');
}`}
          expectedOutput={`Alice: 95
Dave: null
追加後: {Alice: 98, Bob: 82, Carol: 91, Dave: 78}
削除後: {Alice: 98, Carol: 91, Dave: 78}
キー一覧: [Alice, Carol, Dave]
値一覧: [98, 91, 78]
Alice存在: true
99点存在: false
fromEntries: {X: 1, Y: 2}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Map の反復と変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">forEach</code>・<code className="text-cyan-300">entries</code>・<code className="text-cyan-300">map()</code>でMapを反復・変換できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final inventory = {
    'りんご': 50,
    'バナナ': 30,
    'みかん': 80,
    'ぶどう': 20,
  };

  // forEach
  print('在庫一覧:');
  inventory.forEach((item, count) {
    final status = count < 40 ? '⚠️少ない' : '✓十分';
    print('  \$item: \$count個 \$status');
  });

  // entries を使った反復
  final lowStock = inventory.entries
      .where((e) => e.value < 40)
      .map((e) => e.key)
      .toList();
  print('補充が必要: \$lowStock');

  // map() による変換
  final doubled = inventory.map(
    (k, v) => MapEntry(k, v * 2),
  );
  print('2倍: \$doubled');

  // putIfAbsent: キーがなければ追加
  inventory.putIfAbsent('メロン', () => 10);
  inventory.putIfAbsent('りんご', () => 999); // 存在するので無視
  print('putIfAbsent後: \${inventory['メロン']}, \${inventory['りんご']}');

  // update: 既存の値を更新
  inventory.update('バナナ', (v) => v + 20);
  print('バナナ更新後: \${inventory['バナナ']}');
}`}
          expectedOutput={`在庫一覧:
  りんご: 50個 ✓十分
  バナナ: 30個 ⚠️少ない
  みかん: 80個 ✓十分
  ぶどう: 20個 ⚠️少ない
補充が必要: [バナナ, ぶどう]
2倍: {りんご: 100, バナナ: 60, みかん: 160, ぶどう: 40}
putIfAbsent後: 10, 50
バナナ更新後: 50`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ネストした Map と実用例</h2>
        <p className="text-gray-400 mb-4">
          JSONライクなネストした<code className="text-cyan-300">Map</code>を使った実用的なデータ管理パターンです。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // ネストした Map
  final users = <String, Map<String, dynamic>>{
    'u001': {'name': '田中', 'age': 30, 'active': true},
    'u002': {'name': '鈴木', 'age': 25, 'active': false},
    'u003': {'name': '佐藤', 'age': 35, 'active': true},
  };

  // アクセス
  print(users['u001']?['name']);

  // アクティブユーザーのみ取得
  final active = users.entries
      .where((e) => e.value['active'] == true)
      .map((e) => e.value['name'])
      .toList();
  print('アクティブ: \$active');

  // グループ化
  final words = ['apple', 'ant', 'banana', 'bear', 'cat'];
  final grouped = <String, List<String>>{};

  for (final word in words) {
    final key = word[0];
    grouped.putIfAbsent(key, () => []).add(word);
  }
  print('グループ: \$grouped');
}`}
          expectedOutput={`田中
アクティブ: [田中, 佐藤]
グループ: {a: [apple, ant], b: [banana, bear], c: [cat]}`}
        />
      </section>

      <LessonCompleteButton lessonId="map-basics" categoryId="collections" />
      <LessonNav lessons={lessons} currentId="map-basics" basePath="/learn/collections" />
    </div>
  );
}
