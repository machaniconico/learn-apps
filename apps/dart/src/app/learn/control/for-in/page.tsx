import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForInPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">for-inループ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">for-in</strong>ループはコレクション（List、Set、Map等）の要素を順番に処理します。
            インデックスが不要な場合はforループより簡潔に書けます。<strong className="text-green-300">Iterable</strong>を実装したものなら何でも使えます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">List の反復処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">for (var item in list)</code>でリストの各要素に順番にアクセスできます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // Listの反復
  List<String> fruits = ['りんご', 'バナナ', 'みかん', 'ぶどう'];
  for (var fruit in fruits) {
    print('フルーツ: \$fruit');
  }

  // 型を明示することもできる
  List<int> numbers = [1, 4, 9, 16, 25];
  int sum = 0;
  for (int n in numbers) {
    sum += n;
  }
  print('合計: \$sum');

  // Setの反復
  Set<String> colors = {'赤', '青', '緑', '赤'}; // 重複は無視される
  print('色（重複なし）:');
  for (var color in colors) {
    print('  \$color');
  }
}`}
          expectedOutput={`フルーツ: りんご
フルーツ: バナナ
フルーツ: みかん
フルーツ: ぶどう
合計: 55
色（重複なし）:
  赤
  青
  緑`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Map の反復処理</h2>
        <p className="text-gray-400 mb-4">
          Mapは<code className="text-green-300">entries</code>、<code className="text-green-300">keys</code>、<code className="text-green-300">values</code>を使って反復できます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  Map<String, int> scores = {
    'Alice': 92,
    'Bob': 78,
    'Carol': 88,
    'Dave': 65,
  };

  // entriesで反復（key と value を両方取得）
  print('=== 成績一覧 ===');
  for (var entry in scores.entries) {
    String grade = entry.value >= 90 ? 'A' : entry.value >= 80 ? 'B' : 'C';
    print('\${entry.key}: \${entry.value}点 (\$grade)');
  }

  // keysのみ反復
  print('受験者: \${scores.keys.join(', ')}');

  // valuesのみ反復
  int total = 0;
  for (var score in scores.values) {
    total += score;
  }
  print('平均: \${(total / scores.length).toStringAsFixed(1)}点');
}`}
          expectedOutput={`=== 成績一覧 ===
Alice: 92点 (A)
Bob: 78点 (C)
Carol: 88点 (B)
Dave: 65点 (C)
受験者: Alice, Bob, Carol, Dave
平均: 80.8点`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">インデックス付き反復</h2>
        <p className="text-gray-400 mb-4">
          インデックスが必要な場合は<code className="text-green-300">asMap()</code>や<code className="text-green-300">indexed</code>（Dart 3.2以降）を使います。
        </p>
        <DartEditor
          defaultCode={`void main() {
  List<String> items = ['アイテムA', 'アイテムB', 'アイテムC', 'アイテムD'];

  // asMap() を使ってインデックス付き反復
  for (var entry in items.asMap().entries) {
    print('\${entry.key + 1}. \${entry.value}');
  }

  // enumerate的な処理
  print('--- ランキング ---');
  List<String> ranking = ['金', '銀', '銅'];
  for (int i = 0; i < ranking.length; i++) {
    print('\${i + 1}位: \${ranking[i]}');
  }

  // forEachメソッドも使える
  print('--- forEach ---');
  ['春', '夏', '秋', '冬'].forEach((season) => print(season));
}`}
          expectedOutput={`1. アイテムA
2. アイテムB
3. アイテムC
4. アイテムD
--- ランキング ---
1位: 金
2位: 銀
3位: 銅
--- forEach ---
春
夏
秋
冬`}
        />
      </section>

      <LessonCompleteButton lessonId="for-in" categoryId="control" />
      <LessonNav lessons={lessons} currentId="for-in" basePath="/learn/control" />
    </div>
  );
}
