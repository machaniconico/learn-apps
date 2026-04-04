import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function EnumsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">クラス基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">列挙型（enum）</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-orange-300">enum</strong>は限定された値の集合を表す型です。
            Dart 2.17以降は拡張enumでフィールド、メソッド、コンストラクタを追加できます。
            switch文と組み合わせると全ケースの網羅チェックができます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的な enum</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">enum 型名 &#123; 値1, 値2, ... &#125;</code>で定義します。<code className="text-orange-300">.values</code>で全値を取得できます。
        </p>
        <DartEditor
          defaultCode={`enum Direction { north, south, east, west }

enum Color { red, green, blue, yellow }

void main() {
  // enumの使用
  Direction dir = Direction.north;
  print('方向: \$dir');
  print('名前: \${dir.name}');
  print('インデックス: \${dir.index}');

  // 全値の列挙
  print('全方向: \${Direction.values}');

  // switch式で全ケースを網羅
  for (var d in Direction.values) {
    String arrow = switch (d) {
      Direction.north => '↑',
      Direction.south => '↓',
      Direction.east  => '→',
      Direction.west  => '←',
    };
    print('\${d.name}: \$arrow');
  }
}`}
          expectedOutput={`方向: Direction.north
名前: north
インデックス: 0
全方向: [Direction.north, Direction.south, Direction.east, Direction.west]
north: ↑
south: ↓
east: →
west: ←`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">拡張 enum（Dart 2.17以降）</h2>
        <p className="text-gray-400 mb-4">
          拡張enumでフィールドとメソッドを追加できます。各値にデータを持たせられます。
        </p>
        <DartEditor
          defaultCode={`enum Planet {
  mercury(3.303e+23, 2.4397e6),
  venus  (4.869e+24, 6.0518e6),
  earth  (5.976e+24, 6.37814e6),
  mars   (6.421e+23, 3.3972e6);

  // フィールド
  final double mass;    // kg
  final double radius;  // m

  // constコンストラクタ
  const Planet(this.mass, this.radius);

  // メソッド
  static const double G = 6.67430e-11;

  double get surfaceGravity => G * mass / (radius * radius);
  double surfaceWeight(double otherMass) => otherMass * surfaceGravity;
}

void main() {
  double earthWeight = 75.0; // kg
  double mass = earthWeight / Planet.earth.surfaceGravity;

  for (var p in Planet.values) {
    double weight = p.surfaceWeight(mass);
    print('\${p.name}: \${weight.toStringAsFixed(2)} N');
  }
}`}
          expectedOutput={`mercury: 28.33 N
venus: 67.86 N
earth: 735.00 N
mars: 27.94 N`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">enum のメソッドと実装</h2>
        <p className="text-gray-400 mb-4">
          enumはインターフェースを実装したり、抽象メソッドを持つことができます。
        </p>
        <DartEditor
          defaultCode={`enum TrafficLight {
  red(duration: 30),
  yellow(duration: 5),
  green(duration: 25);

  final int duration; // 秒
  const TrafficLight({required this.duration});

  TrafficLight get next => switch (this) {
    TrafficLight.red    => TrafficLight.green,
    TrafficLight.green  => TrafficLight.yellow,
    TrafficLight.yellow => TrafficLight.red,
  };

  String get message => switch (this) {
    TrafficLight.red    => '止まれ',
    TrafficLight.yellow => '注意',
    TrafficLight.green  => '進め',
  };

  bool get canGo => this == TrafficLight.green;
}

void main() {
  var light = TrafficLight.red;
  for (int i = 0; i < 4; i++) {
    print('\${light.name}: \${light.message} (\${light.duration}秒) 進める: \${light.canGo}');
    light = light.next;
  }
}`}
          expectedOutput={`red: 止まれ (30秒) 進める: false
green: 進め (25秒) 進める: true
yellow: 注意 (5秒) 進める: false
red: 止まれ (30秒) 進める: false`}
        />
      </section>

      <LessonCompleteButton lessonId="enums" categoryId="classes" />
      <LessonNav lessons={lessons} currentId="enums" basePath="/learn/classes" />
    </div>
  );
}
