import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function GuardClausesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold uppercase tracking-wide">パターンマッチング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ガード節</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-pink-300">when</strong>キーワードを使ったガード節（guard clause）は、パターンに追加条件を付けます。
            パターンがマッチした後、<code className="text-pink-300">when</code>の条件も真の場合のみ、そのケースが選ばれます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">when によるガード条件</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-pink-300">case パターン when 条件</code>でパターンに追加条件を設けます。
        </p>
        <DartEditor
          defaultCode={`String classifyTemperature(double temp) => switch (temp) {
  double t when t < -10   => '極寒 (\${t}°C)',
  double t when t < 0     => '氷点下 (\${t}°C)',
  double t when t < 10    => '寒い (\${t}°C)',
  double t when t < 25    => '快適 (\${t}°C)',
  double t when t < 35    => '暑い (\${t}°C)',
  double t                => '猛暑 (\${t}°C)',
};

String evaluateScore(int score) => switch (score) {
  int s when s < 0 || s > 100 => '無効なスコア',
  int s when s >= 90           => 'S: \$s点',
  int s when s >= 70           => 'A: \$s点',
  int s when s >= 50           => 'B: \$s点',
  int s                        => 'C: \$s点',
};

void main() {
  for (final t in [-15.0, -5.0, 5.0, 20.0, 30.0, 40.0]) {
    print(classifyTemperature(t));
  }

  print('---');

  for (final s in [95, 75, 55, 30, -1, 105]) {
    print(evaluateScore(s));
  }
}`}
          expectedOutput={`極寒 (-15.0°C)
氷点下 (-5.0°C)
寒い (5.0°C)
快適 (20.0°C)
暑い (30.0°C)
猛暑 (40.0°C)
---
S: 95点
A: 75点
B: 55点
C: 30点
無効なスコア
無効なスコア`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">構造パターンとガード節の組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          複雑な構造パターンにガード節を組み合わせることで、より精密なマッチングができます。
        </p>
        <DartEditor
          defaultCode={`typedef Point = (double x, double y);

String describePoint(Point p) => switch (p) {
  (0, 0)                          => '原点',
  (var x, 0) when x > 0          => 'x軸の正の部分 (x=\$x)',
  (var x, 0) when x < 0          => 'x軸の負の部分 (x=\$x)',
  (0, var y) when y > 0          => 'y軸の正の部分 (y=\$y)',
  (0, var y)                      => 'y軸の負の部分 (y=\$y)',
  (var x, var y) when x == y     => '対角線上 (\$x, \$y)',
  (var x, var y) when x > 0 && y > 0 => '第1象限 (\$x, \$y)',
  (var x, var y)                  => '点 (\$x, \$y)',
};

void main() {
  final points = <Point>[
    (0, 0), (3, 0), (-2, 0), (0, 4), (0, -1),
    (2, 2), (3, 4), (-1, 2),
  ];

  for (final p in points) {
    print(describePoint(p));
  }
}`}
          expectedOutput={`原点
x軸の正の部分 (x=3.0)
x軸の負の部分 (x=-2.0)
y軸の正の部分 (y=4.0)
y軸の負の部分 (y=-1.0)
対角線上 (2.0, 2.0)
第1象限 (3.0, 4.0)
点 (-1.0, 2.0)`}
        />
      </section>

      <LessonCompleteButton lessonId="guard-clauses" categoryId="patterns" />
      <LessonNav lessons={lessons} currentId="guard-clauses" basePath="/learn/patterns" />
    </div>
  );
}
