import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function WhereMapReducePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">コレクション</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">where・map・reduce</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-cyan-300">where</strong>・<strong className="text-cyan-300">map</strong>・<strong className="text-cyan-300">reduce</strong>は関数型プログラミングの中核メソッドです。
            これらを組み合わせることで、ループを使わずに宣言的でわかりやすいコレクション操作ができます。
            DartではIterableに定義されており、遅延評価されます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">where でフィルタリング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">where(predicate)</code>は条件を満たす要素のみのIterableを返します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final numbers = List.generate(20, (i) => i + 1);

  // 基本的な where
  final evens = numbers.where((n) => n % 2 == 0);
  print('偶数: \${evens.toList()}');

  final bigPrimes = numbers.where((n) {
    if (n < 2) return false;
    for (int i = 2; i <= n ~/ 2; i++) {
      if (n % i == 0) return false;
    }
    return n > 10; // 10より大きい素数のみ
  });
  print('10より大きい素数: \${bigPrimes.toList()}');

  // whereType: 型でフィルタリング
  final mixed = <Object>[1, 'hello', 2, 'world', 3, true, 4];
  final ints = mixed.whereType<int>().toList();
  final strings = mixed.whereType<String>().toList();
  print('整数のみ: \$ints');
  print('文字列のみ: \$strings');

  // where の遅延評価確認
  final words = ['Dart', 'Flutter', 'Go', 'Python', 'Java'];
  final longWords = words
      .where((w) => w.length > 4)
      .where((w) => w.contains('t'));
  print('4文字超かつ t を含む: \${longWords.toList()}');
}`}
          expectedOutput={`偶数: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
10より大きい素数: [11, 13, 17, 19]
整数のみ: [1, 2, 3, 4]
文字列のみ: [hello, world]
4文字超かつ t を含む: [Flutter, Python]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">map で変換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">map(transform)</code>は各要素を変換した新しいIterableを返します。異なる型への変換も可能です。
        </p>
        <DartEditor
          defaultCode={`class User {
  String name;
  int age;
  User(this.name, this.age);
  @override
  String toString() => '\$name(\$age歳)';
}

void main() {
  final numbers = [1, 2, 3, 4, 5];

  // 数値の変換
  print(numbers.map((n) => n * n).toList());
  print(numbers.map((n) => '\$n番').toList());

  // 型変換
  final strings = ['1', '2', '3', '4', '5'];
  final parsed = strings.map(int.parse).toList();
  print('int変換: \$parsed');

  // オブジェクト変換
  final users = [
    User('Alice', 30),
    User('Bob', 25),
    User('Carol', 35),
  ];

  final names = users.map((u) => u.name).toList();
  final ages = users.map((u) => u.age).toList();
  final summaries = users.map((u) => '\${u.name}: \${u.age}歳').toList();

  print('名前: \$names');
  print('年齢: \$ages');
  print('一覧: \$summaries');

  // map で JSON 変換
  final json = users.map((u) => {'name': u.name, 'age': u.age}).toList();
  print('JSON: \$json');
}`}
          expectedOutput={`[1, 4, 9, 16, 25]
[1番, 2番, 3番, 4番, 5番]
int変換: [1, 2, 3, 4, 5]
名前: [Alice, Bob, Carol]
年齢: [30, 25, 35]
一覧: [Alice: 30歳, Bob: 25歳, Carol: 35歳]
JSON: [{name: Alice, age: 30}, {name: Bob, age: 25}, {name: Carol, age: 35}]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">reduce と fold で集計</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">reduce</code>は累積演算、<code className="text-cyan-300">fold</code>は初期値ありの累積演算です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // reduce: 合計
  final sum = numbers.reduce((acc, n) => acc + n);
  print('合計: \$sum');

  // reduce: 最大値
  final max = numbers.reduce((a, b) => a > b ? a : b);
  print('最大: \$max');

  // fold: 初期値あり（空リストでも動く）
  final sumWithFold = numbers.fold(0, (acc, n) => acc + n);
  print('fold合計: \$sumWithFold');

  // fold: 文字列への集計
  final words = ['Dart', 'is', 'awesome'];
  final sentence = words.fold('', (acc, w) =>
    acc.isEmpty ? w : '\$acc \$w');
  print('文: \$sentence');

  // fold: Mapへの集計
  final fruits = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];
  final counts = fruits.fold<Map<String, int>>({}, (map, fruit) {
    map[fruit] = (map[fruit] ?? 0) + 1;
    return map;
  });
  print('カウント: \$counts');

  // メソッドチェーン
  final result = List.generate(10, (i) => i + 1)
      .where((n) => n % 2 == 0)
      .map((n) => n * n)
      .fold(0, (sum, n) => sum + n);
  print('偶数の二乗の合計: \$result');
}`}
          expectedOutput={`合計: 55
最大: 10
fold合計: 55
文: Dart is awesome
カウント: {apple: 3, banana: 2, cherry: 1}
偶数の二乗の合計: 220`}
        />
      </section>

      <LessonCompleteButton lessonId="where-map-reduce" categoryId="collections" />
      <LessonNav lessons={lessons} currentId="where-map-reduce" basePath="/learn/collections" />
    </div>
  );
}
