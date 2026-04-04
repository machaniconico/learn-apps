import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dart3");

export default function PatternsAdvancedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold">Dart 3新機能 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パターンマッチング応用</h1>
        <p className="text-gray-400">Dart 3の強力なパターンマッチング構文を深く学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart 3のパターン</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Dart 3ではパターンマッチングが大幅に強化されました。値の分解・型チェック・ガード条件を組み合わせて、
          複雑な条件分岐を簡潔に書けます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-violet-300">var</code>パターン: 値を変数に束縛</li>
          <li>• <code className="text-violet-300">is</code>パターン: 型チェックと束縛</li>
          <li>• <code className="text-violet-300">when</code>: ガード条件の追加</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">リストとMapのパターン分解</h2>
        <p className="text-gray-400 mb-4">
          リストとMapをパターンで分解する構文です。
        </p>
        <DartEditor
          defaultCode={`void describeList(List<int> list) {
  switch (list) {
    case []:
      print('空のリスト');
    case [var x]:
      print('要素1個: \$x');
    case [var x, var y]:
      print('要素2個: \$x, \$y');
    case [var first, ...var rest]:
      print('先頭: \$first, 残り: \${rest.length}個');
  }
}

void describeMap(Map<String, dynamic> map) {
  if (map case {'name': String name, 'age': int age}) {
    print('名前: \$name, 年齢: \$age歳');
  } else {
    print('不明な形式');
  }
}

void main() {
  describeList([]);
  describeList([42]);
  describeList([1, 2]);
  describeList([1, 2, 3, 4, 5]);

  describeMap({'name': '山田', 'age': 30});
  describeMap({'id': 123});
}`}
          expectedOutput={`空のリスト\n要素1個: 42\n要素2個: 1, 2\n先頭: 1, 残り: 4個\n名前: 山田, 年齢: 30歳\n不明な形式`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">オブジェクトパターンとガード節</h2>
        <p className="text-gray-400 mb-4">
          クラスのフィールドをパターンで分解し、<code className="text-teal-300">when</code>で条件を追加します。
        </p>
        <DartEditor
          defaultCode={`class Point {
  final int x, y;
  const Point(this.x, this.y);
}

String classifyPoint(Point p) => switch (p) {
  Point(x: 0, y: 0) => '原点',
  Point(x: var x, y: 0) => 'X軸上 (x=\$x)',
  Point(x: 0, y: var y) => 'Y軸上 (y=\$y)',
  Point(x: var x, y: var y) when x == y => '対角線上 (\$x, \$y)',
  Point(x: var x, y: var y) when x > 0 && y > 0 => '第1象限 (\$x, \$y)',
  Point(x: var x, y: var y) => 'その他 (\$x, \$y)',
};

void main() {
  final points = [
    const Point(0, 0),
    const Point(3, 0),
    const Point(0, 5),
    const Point(4, 4),
    const Point(2, 7),
    const Point(-1, 3),
  ];

  for (final p in points) {
    print(classifyPoint(p));
  }
}`}
          expectedOutput={`原点\nX軸上 (x=3)\nY軸上 (y=5)\n対角線上 (4, 4)\n第1象限 (2, 7)\nその他 (-1, 3)`}
        />
      </section>
      <LessonCompleteButton lessonId="patterns-advanced" categoryId="dart3" />
      <LessonNav lessons={lessons} currentId="patterns-advanced" basePath="/learn/dart3" />
    </div>
  );
}
