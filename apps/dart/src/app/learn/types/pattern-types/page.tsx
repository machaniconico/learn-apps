import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

export default function PatternTypesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">型システム</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パターン型</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dart 3で導入された<strong className="text-teal-300">パターンマッチング</strong>は、値の構造を調べながら変数に束縛する機能です。
            <code className="text-teal-300">switch</code>式・文、<code className="text-teal-300">if-case</code>文で活用でき、
            型の絞り込みと変数の束縛を同時に行えます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">switch 式のパターンマッチ</h2>
        <p className="text-gray-400 mb-4">
          Dart 3の<code className="text-teal-300">switch</code>式で型パターンを使い、値の型に応じた処理ができます。
        </p>
        <DartEditor
          defaultCode={`sealed class Shape {}

class Circle extends Shape {
  double radius;
  Circle(this.radius);
}

class Rectangle extends Shape {
  double width, height;
  Rectangle(this.width, this.height);
}

class Triangle extends Shape {
  double base, height;
  Triangle(this.base, this.height);
}

double area(Shape shape) {
  return switch (shape) {
    Circle(radius: final r) => 3.14159 * r * r,
    Rectangle(width: final w, height: final h) => w * h,
    Triangle(base: final b, height: final h) => 0.5 * b * h,
  };
}

String describe(Shape shape) {
  return switch (shape) {
    Circle(radius: final r) when r > 10 => '大きな円（半径\$r）',
    Circle(radius: final r) => '小さな円（半径\$r）',
    Rectangle(width: final w, height: final h) => '矩形（\${w}x\${h}）',
    Triangle() => '三角形',
  };
}

void main() {
  final shapes = <Shape>[
    Circle(5.0),
    Circle(15.0),
    Rectangle(4.0, 6.0),
    Triangle(3.0, 8.0),
  ];

  for (final shape in shapes) {
    print('\${describe(shape)}: 面積=\${area(shape).toStringAsFixed(2)}');
  }
}`}
          expectedOutput={`小さな円（半径5.0）: 面積=78.54
大きな円（半径15.0）: 面積=706.86
矩形（4.0x6.0）: 面積=24.00
三角形: 面積=12.00`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">if-case とデストラクチャリング</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">if-case</code>文でパターンマッチを使い、リストやレコードを分解できます。
        </p>
        <DartEditor
          defaultCode={`void processPoint(Object point) {
  if (point case (int x, int y)) {
    print('整数座標: (\$x, \$y)');
  } else if (point case (double x, double y)) {
    print('小数座標: (\$x, \$y)');
  } else {
    print('不明な形式');
  }
}

void processResponse(Map<String, dynamic> response) {
  if (response case {'status': 'ok', 'data': final data}) {
    print('成功: \$data');
  } else if (response case {'status': 'error', 'message': final msg}) {
    print('エラー: \$msg');
  } else {
    print('不明なレスポンス');
  }
}

void main() {
  processPoint((10, 20));
  processPoint((1.5, 2.5));

  print('');

  processResponse({'status': 'ok', 'data': 'ユーザーデータ取得完了'});
  processResponse({'status': 'error', 'message': '認証エラー'});
  processResponse({'status': 'pending'});

  print('');

  // リストのパターン
  final lists = [
    <int>[],
    [1],
    [1, 2],
    [1, 2, 3, 4, 5],
  ];

  for (final list in lists) {
    final desc = switch (list) {
      [] => '空リスト',
      [final x] => '要素1つ: \$x',
      [final x, final y] => '要素2つ: \$x, \$y',
      [final x, ...] => '先頭: \$x, 他\${list.length - 1}件',
    };
    print(desc);
  }
}`}
          expectedOutput={`整数座標: (10, 20)
小数座標: (1.5, 2.5)

成功: ユーザーデータ取得完了
エラー: 認証エラー
不明なレスポンス

空リスト
要素1つ: 1
要素2つ: 1, 2
先頭: 1, 他4件`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">レコード型とパターン</h2>
        <p className="text-gray-400 mb-4">
          Dart 3の<code className="text-teal-300">Record</code>型とパターンを組み合わせて、複数の値を型安全に扱えます。
        </p>
        <DartEditor
          defaultCode={`// レコード型の定義
typedef Point = (double x, double y);
typedef NamedPoint = ({double x, double y, String label});

double distance(Point p1, Point p2) {
  final (x1, y1) = p1;
  final (x2, y2) = p2;
  final dx = x2 - x1;
  final dy = y2 - y1;
  return (dx * dx + dy * dy).abs();
}

(String, int) parseEntry(String entry) {
  final parts = entry.split(':');
  return (parts[0].trim(), int.parse(parts[1].trim()));
}

void main() {
  final p1 = (0.0, 0.0);
  final p2 = (3.0, 4.0);

  // レコードのデストラクチャリング
  final (x1, y1) = p1;
  final (x2, y2) = p2;
  print('P1: (\$x1, \$y1)');
  print('P2: (\$x2, \$y2)');
  print('距離の二乗: \${distance(p1, p2)}');

  // 名前付きフィールド
  final namedPt = (x: 5.0, y: 3.0, label: '原点A');
  print('\${namedPt.label}: (\${namedPt.x}, \${namedPt.y})');

  // 関数からのレコード返り値
  final entries = ['Alice: 95', 'Bob: 87', 'Carol: 92'];
  for (final entry in entries) {
    final (name, score) = parseEntry(entry);
    print('\$name -> \$score点');
  }
}`}
          expectedOutput={`P1: (0.0, 0.0)
P2: (3.0, 4.0)
距離の二乗: 25.0
原点A: (5.0, 3.0)
Alice -> 95点
Bob -> 87点
Carol -> 92点`}
        />
      </section>

      <LessonCompleteButton lessonId="pattern-types" categoryId="types" />
      <LessonNav lessons={lessons} currentId="pattern-types" basePath="/learn/types" />
    </div>
  );
}
